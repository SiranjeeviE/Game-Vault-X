import React from 'react';
import { ArrowRight } from 'lucide-react';

const GameCard = ({ game, onClick }) => {
    return (
        <div
            className="game-card"
            onClick={() => onClick(game)}
            style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                border: '1px solid transparent'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0, 255, 157, 0.2)';
                e.currentTarget.style.borderColor = 'var(--border-accent)';
                e.currentTarget.querySelector('.view-btn').style.background = 'var(--accent-primary)';
                e.currentTarget.querySelector('.view-btn').style.color = '#000';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.querySelector('.view-btn').style.background = 'transparent';
                e.currentTarget.querySelector('.view-btn').style.color = 'var(--accent-primary)';
            }}
        >
            <div className="img-container" style={{ position: 'relative', paddingTop: '140%', overflow: 'hidden' }}>
                <img
                    src={game.posterImage}
                    alt={game.title}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                    }}
                />
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.85)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    color: 'var(--accent-primary)',
                    fontWeight: 'bold',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid var(--border-accent)'
                }}>
                    {game.releaseYear}
                </div>
            </div>

            <div className="content" style={{ padding: 'var(--space-md)', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: '800', letterSpacing: '-0.5px' }}>{game.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1, lineHeight: '1.4' }}>
                    {game.shortDescription.substring(0, 80)}...
                </p>

                <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', border: '1px solid var(--border-color)', padding: '2px 6px', borderRadius: '4px' }}>{game.genre}</span>
                    </div>

                    <button
                        className="view-btn"
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--accent-primary)',
                            background: 'transparent',
                            color: 'var(--accent-primary)',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                    >
                        View Details <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameCard;
