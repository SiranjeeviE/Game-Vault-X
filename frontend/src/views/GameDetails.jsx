import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, ExternalLink, Heart, Sparkles, Star, ShieldCheck, Zap, Bot, MessageSquare } from 'lucide-react';
import { fetchGameById, getFallbackSvg } from '../services/api';
import SpecsComparison from '../components/SpecsComparison';
import { AuthContext } from '../context/AuthContext';
import { AIContext } from '../context/AIContext';

const GameDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, wishlist, addToWishlist, removeFromWishlist } = useContext(AuthContext);
    const { liveSearchResult, setIsAIChatOpen, setIsAISettingsOpen, hasActiveKey, preferredProvider } = useContext(AIContext);

    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    const isWishlisted = game ? wishlist.includes(game._id) : false;

    const toggleWishlist = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (isWishlisted) {
            removeFromWishlist(game._id);
        } else {
            addToWishlist(game._id);
        }
    };

    useEffect(() => {
        const loadGame = async () => {
            setLoading(true);
            try {
                if (liveSearchResult && (liveSearchResult._id === id || id === 'ai-search-result')) {
                    setGame(liveSearchResult);
                    setLoading(false);
                    return;
                }
                const data = await fetchGameById(id);
                setGame(data);
            } catch (error) {
                console.error("Error loading game details", error);
            } finally {
                setLoading(false);
            }
        };
        loadGame();
    }, [id, liveSearchResult]);

    if (loading) {
        return (
            <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Sparkles size={24} className="spin" /> Loading Real-Time Game Intelligence...
                </div>
            </div>
        );
    }

    if (!game) {
        return (
            <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
                <h2>Game Not Found</h2>
                <button onClick={() => navigate('/')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Back to Vault
                </button>
            </div>
        );
    }

    const metacritic = game.metacriticScore || 90;

    return (
        <div className="animate-slide-up" style={{ position: 'relative', paddingBottom: '5rem' }}>
            
            {/* Cinematic Full-Bleed Hero Section */}
            <div style={{
                position: 'relative',
                minHeight: '520px',
                width: '100%',
                overflow: 'hidden',
                background: 'var(--bg-canvas)',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center'
            }}>
                {/* Full-bleed Background Game Image Layer */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 0
                }}>
                    <img
                        src={game.posterImage || getFallbackSvg(game.title, game.genre)}
                        alt={game.title}
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = getFallbackSvg(game.title, game.genre);
                        }}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center 20%',
                            filter: 'brightness(0.4) contrast(1.1) blur(2px)',
                            transform: 'scale(1.05)',
                            transition: 'all 0.5s ease'
                        }}
                    />
                    {/* Multi-stage Dark Gradient Overlays for perfect text readability */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to right, rgba(3, 7, 18, 0.96) 0%, rgba(3, 7, 18, 0.75) 45%, rgba(3, 7, 18, 0.92) 100%)'
                    }}></div>
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(ellipse 80% 80% at 50% 30%, rgba(168, 85, 247, 0.25), transparent 75%)'
                    }}></div>
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '140px',
                        background: 'linear-gradient(to top, var(--bg-canvas) 0%, transparent 100%)'
                    }}></div>
                </div>

                <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '3rem', paddingBottom: '3rem' }}>
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-outline"
                        style={{
                            marginBottom: '2rem',
                            padding: '0.5rem 1.2rem',
                            fontSize: '0.85rem',
                            background: 'rgba(3, 7, 18, 0.65)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255, 255, 255, 0.15)'
                        }}
                    >
                        <ArrowLeft size={16} /> BACK TO VAULT
                    </button>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 1fr) 340px',
                        gap: '3rem',
                        alignItems: 'center'
                    }}>
                        {/* Game Header Metadata & Overview */}
                        <div>
                            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                <span className="badge badge-emerald" style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}>{game.genre}</span>
                                <span className="badge badge-dark" style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}>{game.releaseYear}</span>
                                <span className="badge badge-cyan" style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}>{game.developer}</span>
                                {game.publisher && (
                                    <span className="badge badge-violet" style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}>{game.publisher}</span>
                                )}
                            </div>

                            <h1 style={{
                                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                                fontWeight: 900,
                                color: '#fff',
                                margin: '0 0 1.2rem',
                                lineHeight: 1.1,
                                letterSpacing: '-0.03em',
                                textShadow: '0 4px 20px rgba(0,0,0,0.8)'
                            }}>
                                {game.title}
                            </h1>

                            <p style={{
                                fontSize: '1.15rem',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.65,
                                maxWidth: '650px',
                                margin: '0 0 1.8rem',
                                textShadow: '0 2px 10px rgba(0,0,0,0.9)'
                            }}>
                                {game.shortDescription}
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                <button
                                    onClick={toggleWishlist}
                                    className={`btn ${isWishlisted ? 'btn-emerald' : 'btn-primary'}`}
                                    style={{ padding: '0.75rem 1.6rem', fontSize: '0.9rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                                >
                                    <Heart size={18} fill={isWishlisted ? '#fff' : 'none'} />
                                    <span>{isWishlisted ? 'IN WISHLIST' : 'ADD TO WISHLIST'}</span>
                                </button>

                                <button
                                    onClick={() => setIsAIChatOpen(true)}
                                    className="btn btn-outline"
                                    style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem', background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(12px)' }}
                                >
                                    <Bot size={18} color="var(--accent-violet)" /> ASK VAULT AI
                                </button>
                            </div>
                        </div>

                        {/* Large High-Impact Game Poster Card */}
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                maxWidth: '320px',
                                height: '440px',
                                borderRadius: 'var(--radius-lg)',
                                overflow: 'hidden',
                                background: '#0a0c10',
                                border: '1px solid rgba(168, 85, 247, 0.4)',
                                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 40px rgba(168, 85, 247, 0.35)',
                                transform: 'perspective(1000px) rotateY(-4deg)',
                                transition: 'all 0.4s ease'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) scale(1.03)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'perspective(1000px) rotateY(-4deg) scale(1)'}
                            >
                                <img
                                    src={game.posterImage || getFallbackSvg(game.title, game.genre)}
                                    alt={game.title}
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = getFallbackSvg(game.title, game.genre);
                                    }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center top'
                                    }}
                                />

                                {/* Poster Gloss & Glass Gradient */}
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(10,12,16,0.85) 0%, transparent 50%), linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%)',
                                    pointerEvents: 'none'
                                }}></div>

                                {/* Metacritic Score Badge inside Poster */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '16px',
                                    left: '16px',
                                    zIndex: 3
                                }}>
                                    <span className="badge badge-emerald" style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem', backdropFilter: 'blur(10px)', background: 'rgba(16, 185, 129, 0.25)', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                                        <Star size={14} fill="var(--accent-emerald)" /> Metacritic {metacritic}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* Main Layout Grid */}
            <div className="container" style={{ marginTop: '2rem' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1fr) 340px',
                    gap: '2.5rem'
                }}>
                    
                    {/* Left Column: Details & Specs */}
                    <div>
                        {/* Short Description Glass Panel */}
                        <div className="glass-panel" style={{ padding: '1.8rem', marginBottom: '2rem', background: 'var(--bg-card)' }}>
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-emerald)', marginTop: 0, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Zap size={18} /> Executive Summary
                            </h3>
                            <p style={{ fontSize: '1.05rem', color: '#fff', lineHeight: 1.7, margin: 0 }}>
                                {game.shortDescription}
                            </p>
                        </div>

                        {/* Story & Gameplay */}
                        {(game.story || game.description) && (
                            <div className="glass-panel" style={{ padding: '1.8rem', marginBottom: '2rem' }}>
                                {game.story && (
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <h3 style={{ fontSize: '1.2rem', color: '#fff', marginTop: 0, marginBottom: '0.6rem' }}>The Narrative Premise</h3>
                                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{game.story}</p>
                                    </div>
                                )}
                                {game.description && (
                                    <div>
                                        <h3 style={{ fontSize: '1.2rem', color: '#fff', marginTop: 0, marginBottom: '0.6rem' }}>About the Game</h3>
                                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{game.description}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Key Features */}
                        {game.features && game.features.length > 0 && (
                            <div style={{ marginBottom: '2.5rem' }}>
                                <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <ShieldCheck color="var(--accent-emerald)" size={20} /> Key Features & Innovations
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                                    {game.features.map((feat, idx) => (
                                        <div key={idx} className="glass-panel" style={{ padding: '1rem 1.2rem', borderLeft: '3px solid var(--accent-emerald)' }}>
                                            <span style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* System Requirements Component */}
                        <SpecsComparison
                            minimal={game.systemRequirements?.minimum}
                            recommended={game.systemRequirements?.recommended}
                            gameTitle={game.title}
                        />
                    </div>

                    {/* Right Column: Store Links & AI Intelligence Widget */}
                    <div>
                        <div style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                            {/* Wishlist & Purchase Box */}
                            <div className="glass-panel" style={{ padding: '1.8rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <div>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Metacritic Score</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                                            <Star size={18} fill="var(--accent-emerald)" color="var(--accent-emerald)" />
                                            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{metacritic}</span>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>/ 100</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={toggleWishlist}
                                        style={{
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid var(--border-subtle)',
                                            padding: '0.6rem',
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                                    >
                                        <Heart
                                            size={22}
                                            color={isWishlisted ? "var(--accent-rose)" : "var(--text-secondary)"}
                                            fill={isWishlisted ? "var(--accent-rose)" : "transparent"}
                                        />
                                    </button>
                                </div>

                                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
                                    Available Stores & Pricing
                                </h4>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                    {game.providers?.map((provider, i) => (
                                        <a
                                            key={i}
                                            href={provider.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                padding: '0.9rem 1.1rem',
                                                borderRadius: 'var(--radius-sm)',
                                                border: '1px solid var(--border-subtle)',
                                                background: 'rgba(255,255,255,0.02)',
                                                display: 'flex',
                                                justify: 'space-between',
                                                alignItems: 'center',
                                                color: '#fff',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-emerald)'}
                                            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                                        >
                                            <span style={{ fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                {provider.name} <ExternalLink size={12} color="var(--text-secondary)" />
                                            </span>
                                            <span style={{ color: 'var(--accent-emerald)', fontWeight: 800 }}>₹{provider.price}</span>
                                        </a>
                                    ))}
                                </div>

                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        setCopied(true);
                                        setTimeout(() => setCopied(false), 2000);
                                    }}
                                    className="btn btn-outline"
                                    style={{ width: '100%', padding: '0.75rem', fontSize: '0.85rem' }}
                                >
                                    <Share2 size={16} /> {copied ? 'Link Copied!' : 'Share Game Vault Link'}
                                </button>
                            </div>

                            {/* Ask AI Widget */}
                            <div className="glass-panel" style={{
                                padding: '1.5rem',
                                background: 'radial-gradient(ellipse at top left, rgba(0, 255, 157, 0.1), transparent 70%), var(--bg-card)',
                                border: '1px solid var(--border-emerald)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                                    <Bot size={20} color="var(--accent-emerald)" />
                                    <h4 style={{ margin: 0, fontSize: '1rem', color: '#fff' }}>Ask Vault AI About This Game</h4>
                                </div>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                                    Want walkthrough strategies, lore explanations, or graphic setting tips for {game.title}?
                                </p>
                                <button
                                    onClick={() => setIsAIChatOpen(true)}
                                    className="btn btn-primary"
                                    style={{ width: '100%', padding: '0.7rem', fontSize: '0.85rem' }}
                                >
                                    <MessageSquare size={16} /> Chat with Vault AI
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default GameDetails;
