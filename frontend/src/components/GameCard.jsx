import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { getFallbackSvg } from '../services/api';

const GameCard = ({ game, onClick }) => {
    if (!game) return null;

    const metacritic = game.metacriticScore || 88;
    const lowestPrice = game.providers && game.providers.length > 0 ? game.providers[0].price : null;
    const imgSrc = game.posterImage || getFallbackSvg(game.title, game.genre);

    return (
        <div
            className="glass-card"
            onClick={() => onClick(game)}
            style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflow: 'hidden',
                cursor: 'pointer',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
        >
            {/* Showcase Image Stage Container */}
            <div style={{
                position: 'relative',
                paddingTop: '125%',
                overflow: 'hidden',
                background: 'radial-gradient(circle at 50% 45%, rgba(168, 85, 247, 0.18) 0%, rgba(15, 23, 42, 0.95) 75%)'
            }}>
                <img
                    src={imgSrc}
                    alt={game.title}
                    loading="lazy"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = getFallbackSvg(game.title, game.genre);
                    }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.6))',
                        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.06)';
                        e.currentTarget.style.filter = 'drop-shadow(0 16px 30px rgba(168, 85, 247, 0.35))';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.filter = 'drop-shadow(0 12px 20px rgba(0,0,0,0.6))';
                    }}
                />

                {/* Top Gradient Shadow Overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '70px',
                    background: 'linear-gradient(to bottom, rgba(5,6,8,0.75), transparent)',
                    pointerEvents: 'none'
                }}></div>

                {/* Bottom Gradient Showcase Overlay */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '90px',
                    background: 'linear-gradient(to top, rgba(10,12,16,0.95) 0%, transparent 100%)',
                    pointerEvents: 'none'
                }}></div>

                {/* Release Year Tag (Top Right) */}
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    zIndex: 2
                }}>
                    <span className="badge badge-dark" style={{ backdropFilter: 'blur(8px)', background: 'rgba(3, 7, 18, 0.75)' }}>
                        {game.releaseYear}
                    </span>
                </div>

                {/* Metacritic Pill (Top Left) */}
                {metacritic && (
                    <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        zIndex: 2
                    }}>
                        <span className="badge badge-emerald" style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', backdropFilter: 'blur(8px)' }}>
                            <Star size={12} fill="var(--accent-emerald)" /> {metacritic}
                        </span>
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div style={{
                padding: '1.2rem',
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.75rem'
            }}>
                <div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                        <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>{game.genre}</span>
                    </div>

                    <h3 style={{
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: '#fff',
                        lineHeight: 1.3,
                        marginBottom: '0.4rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        {game.title}
                    </h3>

                    <p style={{
                        fontSize: '0.825rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        {game.shortDescription}
                    </p>
                </div>

                {/* Card Footer Actions */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-subtle)'
                }}>
                    {lowestPrice !== null ? (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Store Price</span>
                            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>₹{lowestPrice}</span>
                        </div>
                    ) : (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{game.developer}</span>
                    )}

                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: 'var(--accent-emerald)',
                        transition: 'gap 0.2s'
                    }}>
                        <span>Details</span>
                        <ArrowRight size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameCard;
