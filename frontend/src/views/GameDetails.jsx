import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, ExternalLink, Heart } from 'lucide-react';
import { fetchGameById } from '../services/api';
import SpecsComparison from '../components/SpecsComparison';
import { AuthContext } from '../context/AuthContext';

const GameDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, wishlist, addToWishlist, removeFromWishlist } = useContext(AuthContext);
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    const isWishlisted = wishlist.includes(id);

    const toggleWishlist = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (isWishlisted) {
            removeFromWishlist(id);
        } else {
            addToWishlist(id);
        }
    };

    useEffect(() => {
        const loadGame = async () => {
            try {
                const data = await fetchGameById(id);
                setGame(data);
            } catch (error) {
                console.error("Error loading game details", error);
            } finally {
                setLoading(false);
            }
        };
        loadGame();
    }, [id]);

    if (loading) return <div style={{ padding: '100px', textAlign: 'center', color: 'var(--accent-primary)' }}>Loading details...</div>;
    if (!game) return <div style={{ padding: '100px', textAlign: 'center' }}>Game not found</div>;

    return (
        <div className="game-details slide-up" style={{ padding: '40px 0' }}>
            <div className="container">
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-outline"
                    style={{ marginBottom: '20px', padding: '8px 16px', display: 'flex', gap: '8px' }}
                >
                    <ArrowLeft size={18} /> BACK TO VAULT
                </button>

                <div className="details-layout">
                    <style>{`
                        .details-layout {
                            display: grid;
                            grid-template-columns: 1fr;
                            gap: 40px;
                        }
                        @media (min-width: 968px) {
                            .details-layout {
                                grid-template-columns: 1fr 350px;
                            }
                        }
                    `}</style>
                    {/* Main Content */}
                    <div style={{ minWidth: 0 }}>
                        <img
                            src={game.posterImage}
                            alt={game.title}
                            style={{
                                width: '100%',
                                maxHeight: '500px',
                                objectFit: 'cover',
                                borderRadius: 'var(--radius-lg)',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                                marginBottom: '2rem',
                                border: '1px solid var(--border-color)'
                            }}
                        />

                        <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '1rem' }}>{game.title}</h1>

                        <div style={{ display: 'flex', gap: '15px', marginBottom: '2rem' }}>
                            <span className="badge" style={{ background: 'var(--accent-primary)', color: '#000', padding: '4px 12px', borderRadius: '4px', fontWeight: 'bold' }}>{game.genre}</span>
                            <span className="badge" style={{ border: '1px solid var(--border-color)', padding: '4px 12px', borderRadius: '4px' }}>{game.releaseYear}</span>
                            <span className="badge" style={{ border: '1px solid var(--border-color)', padding: '4px 12px', borderRadius: '4px' }}>{game.developer}</span>
                        </div>

                        <p style={{ fontSize: '1.2rem', color: 'var(--text-primary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                            {game.shortDescription}
                        </p>

                        <div className="rich-content" style={{ marginBottom: '3rem' }}>
                            {game.story && (
                                <div style={{ marginBottom: '2rem' }}>
                                    <h2 style={{ fontSize: '1.8rem', color: 'var(--accent-primary)', marginBottom: '1rem' }}>The Story</h2>
                                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                        {game.story}
                                    </p>
                                </div>
                            )}

                            {game.description && (
                                <div style={{ marginBottom: '2rem' }}>
                                    <h2 style={{ fontSize: '1.8rem', color: 'var(--accent-primary)', marginBottom: '1rem' }}>About the Game</h2>
                                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                        {game.description}
                                    </p>
                                </div>
                            )}

                            {game.features && game.features.length > 0 && (
                                <div style={{ marginBottom: '2rem' }}>
                                    <h2 style={{ fontSize: '1.8rem', color: 'var(--accent-primary)', marginBottom: '1rem' }}>Key Features</h2>
                                    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                                        {game.features.map((feature, index) => (
                                            <li key={index} style={{
                                                background: 'rgba(255,255,255,0.03)',
                                                padding: '15px',
                                                borderRadius: '8px',
                                                borderLeft: '3px solid var(--accent-primary)',
                                                color: 'var(--text-secondary)'
                                            }}>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <SpecsComparison minimal={game.systemRequirements.minimum} recommended={game.systemRequirements.recommended} />
                    </div>

                    {/* Sidebar Purchase */}
                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'sticky', top: '100px', background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-accent)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Available On</h3>
                                <button
                                    onClick={toggleWishlist}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s',
                                        padding: '5px'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                                >
                                    <Heart
                                        size={28}
                                        color={isWishlisted ? "var(--accent-danger)" : "var(--text-secondary)"}
                                        fill={isWishlisted ? "var(--accent-danger)" : "transparent"}
                                    />
                                </button>
                            </div>

                            <div className="providers" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '2rem' }}>
                                {game.providers?.map(provider => (
                                    <a
                                        key={provider.name}
                                        href={provider.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            padding: '1.2rem',
                                            borderRadius: 'var(--radius-md)',
                                            border: '1px solid var(--border-color)',
                                            background: 'var(--bg-secondary)',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            textDecoration: 'none',
                                            color: '#fff',
                                            transition: 'all 0.3s ease'
                                        }}
                                        className="provider-link"
                                    >
                                        <span style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {provider.name} <ExternalLink size={14} color="var(--text-secondary)" />
                                        </span>
                                        <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>₹{provider.price}</span>
                                    </a>
                                ))}
                                {(!game.providers || game.providers.length === 0) && (
                                    <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No stores available yet.</div>
                                )}
                            </div>

                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert('Link copied to clipboard!');
                                }}
                                className="btn btn-outline"
                                style={{ width: '100%', padding: '15px', display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <Share2 size={20} /> SHARE THIS GAME
                            </button>

                            <style>{`
                                .provider-link:hover {
                                    border-color: var(--accent-primary);
                                    background: rgba(0, 255, 157, 0.05);
                                    transform: translateX(5px);
                                }
                            `}</style>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDetails;
