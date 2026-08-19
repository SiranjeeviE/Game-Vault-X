import API_BASE_URL from '../config';

const API_URL = `${API_BASE_URL}/games`;

const defaultSysReq = {
    minimum: { os: "Windows 10 64-bit", cpu: "Intel Core i5-8400 / AMD Ryzen 5 2600", gpu: "NVIDIA GeForce GTX 1060 / AMD Radeon RX 580", ram: "12GB", storage: "70GB SSD" },
    recommended: { os: "Windows 11 64-bit", cpu: "Intel Core i7-10700K / AMD Ryzen 7 3700X", gpu: "NVIDIA GeForce RTX 3070 / AMD Radeon RX 6800", ram: "16GB", storage: "70GB NVMe SSD" }
};

/**
 * Generate a clean SVG fallback image URI for missing images or API failures
 */
export const getFallbackSvg = (title = 'Game', genre = 'Action') => {
    const safeTitle = String(title).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const safeGenre = String(genre).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
        <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0b0f19"/>
                <stop offset="50%" stop-color="#1e1b4b"/>
                <stop offset="100%" stop-color="#030712"/>
            </linearGradient>
            <radialGradient id="glow" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stop-color="#a855f7" stop-opacity="0.4"/>
                <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
            </radialGradient>
        </defs>
        <rect width="600" height="800" fill="url(#bg)"/>
        <circle cx="300" cy="360" r="220" fill="url(#glow)"/>
        <g transform="translate(300, 320)" text-anchor="middle">
            <rect x="-70" y="-70" width="140" height="140" rx="28" fill="#a855f7" fill-opacity="0.15" stroke="#a855f7" stroke-width="2"/>
            <path d="M-25,-15 L25,-15 L35,25 L-35,25 Z" fill="none" stroke="#c084fc" stroke-width="5" stroke-linejoin="round"/>
            <circle cx="-12" cy="5" r="6" fill="#38bdf8"/>
            <circle cx="12" cy="5" r="6" fill="#4ade80"/>
        </g>
        <text x="300" y="520" text-anchor="middle" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="32" letter-spacing="-0.5">${safeTitle}</text>
        <rect x="220" y="560" width="160" height="32" rx="16" fill="#a855f7" fill-opacity="0.25" stroke="#a855f7" stroke-opacity="0.4"/>
        <text x="300" y="581" text-anchor="middle" fill="#e9d5ff" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="13" letter-spacing="1">${safeGenre.toUpperCase()}</text>
    </svg>`;
    
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// Verified individual real game images dataset
export const FALLBACK_GAMES = [
    // 2023-Present
    {
        _id: "g-wukong",
        title: "Black Myth: Wukong",
        shortDescription: "Action RPG rooted in Chinese mythology based on Journey to the West.",
        description: "Set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend.",
        story: "Experience the myth of the Sun Wukong, wielding the magical staff to defeat formidable mythological demons.",
        features: ["Unreal Engine 5 Graphics", "72 Transformations", "Fast-Paced Martial Arts", "Rich Mythological Bosses"],
        genre: "Action RPG",
        developer: "Game Science",
        publisher: "Game Science",
        releaseYear: 2024,
        yearRange: "2023-Present",
        metacriticScore: 82,
        posterImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/library_hero.jpg",
        systemRequirements: defaultSysReq,
        providers: [{ name: "Steam", url: "https://store.steampowered.com/app/2358720/", price: 3599 }]
    },
    {
        _id: "g-cyberpunk2077",
        title: "Cyberpunk 2077: Phantom Liberty",
        shortDescription: "Freedom always comes at a price. High-stakes spy-thriller expansion set in Night City.",
        description: "As mercenary V, take on a secret agent mission to rescue the NUSA President in Dogtown. Featuring overhaul mechanics, ray tracing overdrive, and intense action.",
        story: "In Dogtown, a ruined walled-off enclave run by a trigger-happy militia, V must navigate espionage and betrayal to save President Rosalind Myers.",
        features: ["Ray Tracing Overdrive", "NVIDIA DLSS 3.5", "Dogtown Open District", "Dynamic Combat Perks"],
        genre: "Cyberpunk Action RPG",
        developer: "CD PROJEKT RED",
        publisher: "CD PROJEKT RED",
        releaseYear: 2023,
        yearRange: "2023-Present",
        metacriticScore: 89,
        posterImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/library_hero.jpg",
        systemRequirements: defaultSysReq,
        providers: [{ name: "Steam", url: "https://store.steampowered.com/app/1091500/", price: 2999 }]
    },
    {
        _id: "g-eldenring",
        title: "Elden Ring: Shadow of the Erdtree",
        shortDescription: "Winner of Game of the Year. Step into the Land of Shadow to uncover dark secrets.",
        description: "Guided by Miquella, explore a realm obscured by the Erdtree where Marika first set foot. Face terrifying demigods and discover brand new weapon types.",
        story: "Follow Miquella's footsteps into the shadow realm, unearthing the dark origins of Marika's ascension.",
        features: ["Massive Open World Expansion", "100+ New Weapons", "Epic Boss Battles", "Deep Lore"],
        genre: "Action RPG",
        developer: "FromSoftware",
        publisher: "Bandai Namco",
        releaseYear: 2024,
        yearRange: "2023-Present",
        metacriticScore: 95,
        posterImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/library_hero.jpg",
        systemRequirements: defaultSysReq,
        providers: [{ name: "Steam", url: "https://store.steampowered.com/app/1245620/", price: 3499 }]
    },
    {
        _id: "g-baldursgate3",
        title: "Baldur's Gate 3",
        shortDescription: "Next-gen D&D RPG with unrivaled freedom of choice and cinematic storytelling.",
        description: "Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival, and the lure of absolute power.",
        story: "Abducted by Mind Flayers, you have a tadpole in your brain that grants dark power—and threatens to turn you into a monster.",
        features: ["Turn-based Tactical Combat", "170+ Hours of Story", "Co-op Multiplayer", "D&D 5e Ruleset"],
        genre: "Tactical RPG",
        developer: "Larian Studios",
        publisher: "Larian Studios",
        releaseYear: 2023,
        yearRange: "2023-Present",
        metacriticScore: 96,
        posterImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/library_hero.jpg",
        systemRequirements: defaultSysReq,
        providers: [{ name: "Steam", url: "https://store.steampowered.com/app/1086940/", price: 2999 }]
    },
    {
        _id: "g-gow-ragnarok",
        title: "God of War Ragnarök",
        shortDescription: "Fimbulwinter is underway. Kratos and Atreus journey to each of the Nine Realms.",
        description: "Journey to each of the Nine Realms in search of answers as Asgardian forces prepare for a prophesied battle that will end the world.",
        story: "The saga continues with epic Norse mythological encounters.",
        features: ["Leviathan Axe", "Blades of Chaos", "Nine Realms"],
        genre: "Action Adventure",
        developer: "Santa Monica Studio",
        publisher: "PlayStation Publishing",
        releaseYear: 2024,
        yearRange: "2023-Present",
        metacriticScore: 94,
        posterImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2322010/library_hero.jpg",
        systemRequirements: defaultSysReq,
        providers: [{ name: "Steam", url: "https://store.steampowered.com/app/2322010/", price: 3999 }]
    },

    // 2020-2022
    {
        _id: "g-godofwar",
        title: "God of War (PC)",
        shortDescription: "Kratos returns in a realm of Norse gods and monsters.",
        description: "His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and Monsters.",
        story: "Kratos and his son Atreus journey to the highest peak in the nine realms to fulfill a deeply personal vow.",
        features: ["4K Resolution Unlocked", "NVIDIA Reflex", "Ultra-wide Support", "Leviathan Axe Combat"],
        genre: "Action Adventure",
        developer: "Santa Monica Studio",
        publisher: "PlayStation Publishing",
        releaseYear: 2022,
        yearRange: "2020-2022",
        metacriticScore: 93,
        posterImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1593500/library_hero.jpg",
        systemRequirements: defaultSysReq,
        providers: [{ name: "Steam", url: "https://store.steampowered.com/app/1593500/", price: 3299 }]
    },
    {
        _id: "g-spiderman",
        title: "Marvel's Spider-Man Remastered",
        shortDescription: "Swing through vibrant New York as an experienced Peter Parker.",
        description: "Play as Peter Parker fighting big crime and iconic villains in Marvel's New York. Swing through vibrant neighborhoods and defeat villains.",
        story: "Spider-Man must balance his chaotic personal life and career while the fate of Marvel's New York rests upon his shoulders.",
        features: ["Ray-Traced Reflections", "DualSense Controller Support", "Unlocked Framerate", "DLSS & DLAA"],
        genre: "Action Adventure",
        developer: "Insomniac Games",
        publisher: "PlayStation Publishing",
        releaseYear: 2022,
        yearRange: "2020-2022",
        metacriticScore: 87,
        posterImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1817070/library_hero.jpg",
        systemRequirements: defaultSysReq,
        providers: [{ name: "Steam", url: "https://store.steampowered.com/app/1817070/", price: 3999 }]
    },

    // 2015-2019
    {
        _id: "g-rdr2",
        title: "Red Dead Redemption 2",
        shortDescription: "America, 1899. The end of the wild west era has begun.",
        description: "Winner of over 175 Game of the Year Awards, RDR2 is an epic tale of honor and loyalty at the dawn of the modern age.",
        story: "Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents on their heels, the gang must rob, steal and fight.",
        features: ["Photorealistic Open World", "Deep Physics", "Red Dead Online", "Ultra HD Graphics"],
        genre: "Open World Action",
        developer: "Rockstar Games",
        publisher: "Rockstar Games",
        releaseYear: 2019,
        yearRange: "2015-2019",
        metacriticScore: 97,
        posterImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/library_hero.jpg",
        systemRequirements: defaultSysReq,
        providers: [{ name: "Steam", url: "https://store.steampowered.com/app/1174180/", price: 3199 }]
    },
    {
        _id: "g-witcher3",
        title: "The Witcher 3: Wild Hunt",
        shortDescription: "Become a monster slayer for hire and search for the child of prophecy.",
        description: "You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will.",
        story: "Track down Ciri, the Child of Prophecy, a living weapon that can alter the shape of the world.",
        features: ["Massive Open World", "Next-Gen Update", "Ray Tracing", "Gwent Card Game"],
        genre: "RPG",
        developer: "CD PROJEKT RED",
        publisher: "CD PROJEKT RED",
        releaseYear: 2015,
        yearRange: "2015-2019",
        metacriticScore: 93,
        posterImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/library_hero.jpg",
        systemRequirements: defaultSysReq,
        providers: [{ name: "Steam", url: "https://store.steampowered.com/app/292030/", price: 899 }]
    },

    // 2010-2014
    {
        _id: "g-skyrim",
        title: "The Elder Scrolls V: Skyrim",
        shortDescription: "EPIC FANTASY REIMAGINED. The dragons, long lost to the passages of the Elder Scrolls, have returned.",
        description: "Play any type of character you can imagine, and do whatever you want; the legendary freedom of choice, storytelling, and adventure of The Elder Scrolls.",
        story: "As the Dragonborn, prophesied hero born with the soul of a dragon, defeat Alduin the World-Eater.",
        features: ["Infinite Replayability", "Creation Club Mods", "Dragon Shouts", "Archery & Magic"],
        genre: "Open World RPG",
        developer: "Bethesda Game Studios",
        publisher: "Bethesda Softworks",
        releaseYear: 2011,
        yearRange: "2010-2014",
        metacriticScore: 94,
        posterImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/489830/library_hero.jpg",
        systemRequirements: defaultSysReq,
        providers: [{ name: "Steam", url: "https://store.steampowered.com/app/489830/", price: 1799 }]
    },

    // 2005-2009
    {
        _id: "g-hl2",
        title: "Half-Life 2",
        shortDescription: "Physics-based masterpiece defined modern first-person shooters.",
        description: "Taking up the crowbar of research scientist Gordon Freeman, you find yourself on an alien-infested Earth being picked to the bone.",
        story: "Lead the human resistance against the tyrannical interdimensional Combine in City 17.",
        features: ["Gravity Gun Physics", "Source Engine Classic", "Facial Animation System", "Iconic Storyline"],
        genre: "FPS",
        developer: "Valve",
        publisher: "Valve",
        releaseYear: 2004,
        yearRange: "2005-2009",
        metacriticScore: 96,
        posterImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/220/library_hero.jpg",
        systemRequirements: defaultSysReq,
        providers: [{ name: "Steam", url: "https://store.steampowered.com/app/220/", price: 480 }]
    },

    // 2000-2004
    {
        _id: "g-cs16",
        title: "Counter-Strike 1.6",
        shortDescription: "The world's #1 tactical action shooter.",
        description: "Engage in an incredibly realistic brand of counter-terrorist warfare in this wildly popular team-based game.",
        story: "Terrorists vs Counter-Terrorists in high-stakes tactical bomb defusal and hostage rescue operations.",
        features: ["Tactical Teamwork", "Competitive Esports Legend", "Custom Server Mods"],
        genre: "Tactical FPS",
        developer: "Valve",
        publisher: "Valve",
        releaseYear: 2000,
        yearRange: "2000-2004",
        metacriticScore: 88,
        posterImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/10/library_hero.jpg",
        systemRequirements: defaultSysReq,
        providers: [{ name: "Steam", url: "https://store.steampowered.com/app/10/", price: 480 }]
    }
];

export const fetchGames = async (era) => {
    try {
        let url = API_URL;
        if (era) {
            url += `?era=${era}`;
        }
        const response = await fetch(url, { signal: AbortSignal.timeout(3000) });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data && data.length > 0) return data;
    } catch (error) {
        console.warn("Backend API unavailable, using fallback rich game dataset:", error.message);
    }

    // Return filtered fallback games
    if (era) {
        return FALLBACK_GAMES.filter(g => g.yearRange === era);
    }
    return FALLBACK_GAMES;
};

export const fetchGameById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { signal: AbortSignal.timeout(3000) });
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.warn("Backend API unavailable for ID, checking fallback set:", error.message);
    }

    const found = FALLBACK_GAMES.find(g => g._id === id || g.title.toLowerCase().includes(id.toLowerCase()));
    if (found) return found;
    return FALLBACK_GAMES[0];
};
