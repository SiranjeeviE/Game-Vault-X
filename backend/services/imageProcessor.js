/**
 * Backend Image Processor Service
 * Securely handles fetching real game images and removing background noise using server-side API keys.
 * API keys are stored exclusively in process.env and NEVER sent to the client.
 */

const https = require('https');
const http = require('http');

/**
 * Generates a clean SVG data URI as fallback image when external image loading fails
 */
function getFallbackSvg(title = 'Game Title', genre = 'Action') {
    const safeTitle = String(title).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const safeGenre = String(genre).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
        <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0f172a"/>
                <stop offset="50%" stop-color="#1e1b4b"/>
                <stop offset="100%" stop-color="#090d16"/>
            </linearGradient>
            <radialGradient id="glow" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stop-color="#a855f7" stop-opacity="0.35"/>
                <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
            </radialGradient>
        </defs>
        <rect width="600" height="800" fill="url(#bg)"/>
        <circle cx="300" cy="350" r="220" fill="url(#glow)"/>
        <g transform="translate(300, 320)" text-anchor="middle">
            <rect x="-80" y="-80" width="160" height="160" rx="32" fill="#a855f7" fill-opacity="0.15" stroke="#a855f7" stroke-width="2"/>
            <path d="M-30,-20 L30,-20 L40,30 L-40,30 Z" fill="none" stroke="#c084fc" stroke-width="6" stroke-linejoin="round"/>
            <circle cx="-15" cy="5" r="7" fill="#38bdf8"/>
            <circle cx="15" cy="5" r="7" fill="#4ade80"/>
        </g>
        <text x="300" y="520" text-anchor="middle" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="34" letter-spacing="-0.5">${safeTitle}</text>
        <rect x="220" y="560" width="160" height="32" rx="16" fill="#a855f7" fill-opacity="0.25" stroke="#a855f7" stroke-opacity="0.4"/>
        <text x="300" y="581" text-anchor="middle" fill="#e9d5ff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="14" letter-spacing="1">${safeGenre.toUpperCase()}</text>
    </svg>`;
    
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Uses backend API key (RAWG_API_KEY / GAME_IMAGE_API_KEY) if available to search real game image URL
 */
async function fetchGameImageUrl(gameTitle) {
    const apiKey = process.env.RAWG_API_KEY || process.env.GAME_IMAGE_API_KEY;
    if (!apiKey) return null;

    return new Promise((resolve) => {
        const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(gameTitle)}&page_size=1`;
        
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.results && json.results.length > 0 && json.results[0].background_image) {
                        resolve(json.results[0].background_image);
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    resolve(null);
                }
            });
        }).on('error', () => resolve(null));
    });
}

/**
 * Removes background using REMOVE_BG_API_KEY or GAME_IMAGE_API_KEY if configured
 */
async function removeImageBackground(imageUrl) {
    const apiKey = process.env.REMOVE_BG_API_KEY || process.env.GAME_IMAGE_API_KEY;
    if (!apiKey || !imageUrl) return null;

    return new Promise((resolve) => {
        const postData = JSON.stringify({
            image_url: imageUrl,
            size: 'auto'
        });

        const req = https.request({
            hostname: 'api.remove.bg',
            port: 443,
            path: '/v1.0/removebg',
            method: 'POST',
            headers: {
                'X-Api-Key': apiKey,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        }, (res) => {
            if (res.statusCode === 200) {
                const chunks = [];
                res.on('data', chunk => chunks.push(chunk));
                res.on('end', () => {
                    const buffer = Buffer.concat(chunks);
                    const base64 = buffer.toString('base64');
                    resolve(`data:image/png;base64,${base64}`);
                });
            } else {
                resolve(null);
            }
        });

        req.on('error', () => resolve(null));
        req.write(postData);
        req.end();
    });
}

module.exports = {
    getFallbackSvg,
    fetchGameImageUrl,
    removeImageBackground
};
