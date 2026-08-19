import React from 'react';
import { Star, Flame, Zap, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getFallbackSvg } from '../services/api';

const FramerHeroMarquee = ({ games = [] }) => {
    const navigate = useNavigate();

    // Double the array for seamless infinite marquee loop
    const marqueeGames = [...games, ...games];

    if (!games || games.length === 0) return null;

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            margin: '3rem 0 1rem',
            padding: '1rem 0'
        }}>
            {/* Left & Right Gradient Fades */}
            <div style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: '120px',
                background: 'linear-gradient(to right, var(--bg-canvas), transparent)',
                zIndex: 3,
                pointerEvents: 'none'
            }}></div>
            <div style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                width: '120px',
                background: 'linear-gradient(to left, var(--bg-canvas), transparent)',
                zIndex: 3,
                pointerEvents: 'none'
            }}></div>

            <div className="animate-marquee">
                {marqueeGames.map((game, i) => (
                    <div
                        key={`${game._id}-${i}`}
                        onClick={() => navigate(`/game/${game._id}`)}
                        className="glass-card"
                        style={{
                            flex: '0 0 280px',
                            marginRight: '1.25rem',
                            borderRadius: 'var(--radius-md)',
                            padding: '1rem',
                            cursor: 'pointer',
                            background: 'rgba(15, 23, 42, 0.7)',
                            border: '1px solid var(--border-subtle)',
                            display: 'flex',
                            gap: '0.85rem',
                            alignItems: 'center',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <img
                            src={game.posterImage || getFallbackSvg(game.title, game.genre)}
                            alt={game.title}
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = getFallbackSvg(game.title, game.genre);
                            }}
                            style={{
                                width: '60px',
                                height: '80px',
                                objectFit: 'cover',
                                borderRadius: 'var(--radius-xs)',
                                flexShrink: 0
                            }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.2rem' }}>
                                <span className="badge badge-emerald" style={{ fontSize: '0.6rem', padding: '0.15rem 0.45rem' }}>
                                    <Star size={10} fill="var(--text-emerald)" /> {game.metacriticScore || 90}
                                </span>
                                <span className="badge badge-dark" style={{ fontSize: '0.6rem', padding: '0.15rem 0.45rem' }}>
                                    {game.releaseYear}
                                </span>
                            </div>
                            <h4 style={{
                                fontSize: '0.95rem',
                                color: '#fff',
                                margin: 0,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                {game.title}
                            </h4>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                {game.genre}
                            </span>
                        </div>
                        <ArrowUpRight size={16} color="var(--accent-violet)" style={{ flexShrink: 0 }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FramerHeroMarquee;
