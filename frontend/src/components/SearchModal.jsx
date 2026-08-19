import React, { useState, useContext, useEffect } from 'react';
import { Search, X, Sparkles, ArrowRight, Gamepad2, Loader } from 'lucide-react';
import { AIContext } from '../context/AIContext';
import { fetchLiveGameDataAI } from '../services/aiService';
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ allGames = [] }) => {
    const {
        isSearchOpen,
        setIsSearchOpen,
        geminiApiKey,
        groqApiKey,
        preferredProvider,
        setLiveSearchResult
    } = useContext(AIContext);

    const [query, setQuery] = useState('');
    const [loadingAI, setLoadingAI] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setIsSearchOpen(prev => !prev);
            }
            if (e.key === 'Escape' && isSearchOpen) {
                setIsSearchOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSearchOpen, setIsSearchOpen]);

    if (!isSearchOpen) return null;

    const filteredGames = query.trim()
        ? allGames.filter(g => g.title.toLowerCase().includes(query.toLowerCase()) || g.genre.toLowerCase().includes(query.toLowerCase()))
        : allGames.slice(0, 6);

    const handleAIFetch = async (gameTitle) => {
        setLoadingAI(true);
        try {
            const aiGame = await fetchLiveGameDataAI({
                gameTitle: gameTitle || query,
                geminiKey: geminiApiKey,
                groqKey: groqApiKey,
                preferredProvider: preferredProvider
            });
            setLiveSearchResult(aiGame);
            setIsSearchOpen(false);
            navigate(`/game/${aiGame._id || 'ai-search-result'}`);
        } catch (e) {
            console.error("Failed AI search", e);
        } finally {
            setLoadingAI(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(5, 6, 8, 0.85)',
            backdropFilter: 'blur(16px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '10vh',
            paddingLeft: '1rem',
            paddingRight: '1rem'
        }} className="animate-fade-in" onClick={() => setIsSearchOpen(false)}>
            
            <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-lg)',
                maxWidth: '680px',
                width: '100%',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 50px rgba(0, 255, 157, 0.15)'
            }} onClick={e => e.stopPropagation()} className="animate-slide-up">

                {/* Input Bar */}
                <div style={{
                    padding: '1.2rem 1.5rem',
                    borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    background: 'rgba(5, 6, 8, 0.5)'
                }}>
                    <Search size={22} color="var(--accent-emerald)" />
                    <input
                        type="text"
                        placeholder="Search games, genres... or type any game name for AI fetch"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                        style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: '#fff',
                            fontSize: '1.1rem',
                            fontFamily: 'var(--font-body)'
                        }}
                    />
                    {query && (
                        <button onClick={() => setQuery('')} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                            <X size={18} />
                        </button>
                    )}
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)', padding: '2px 8px', borderRadius: '4px' }}>
                        ESC
                    </span>
                </div>

                {/* AI Search Action Banner */}
                {query.trim() && (
                    <div style={{
                        padding: '0.85rem 1.5rem',
                        background: 'radial-gradient(ellipse at left, rgba(0, 255, 157, 0.15), transparent 70%)',
                        borderBottom: '1px solid var(--border-subtle)',
                        display: 'flex',
                        justify: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#fff' }}>
                            <Sparkles size={16} color="var(--accent-emerald)" />
                            <span>Fetch live real-time data for <strong>"{query}"</strong> via {preferredProvider === 'gemini' ? 'Gemini' : 'Groq'} AI</span>
                        </div>
                        <button
                            onClick={() => handleAIFetch(query)}
                            disabled={loadingAI}
                            className="btn btn-primary"
                            style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}
                        >
                            {loadingAI ? <Loader size={14} className="spin" /> : <>Fetch AI Data <ArrowRight size={14} /></>}
                        </button>
                    </div>
                )}

                {/* Results List */}
                <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '0.75rem' }}>
                    {filteredGames.length > 0 ? (
                        filteredGames.map(game => (
                            <div
                                key={game._id}
                                onClick={() => {
                                    setIsSearchOpen(false);
                                    navigate(`/game/${game._id}`);
                                }}
                                style={{
                                    padding: '0.85rem 1rem',
                                    borderRadius: 'var(--radius-sm)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease',
                                    marginBottom: '0.25rem'
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                                <img
                                    src={game.posterImage}
                                    alt={game.title}
                                    style={{ width: '48px', height: '64px', objectFit: 'cover', borderRadius: 'var(--radius-xs)' }}
                                />
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: 0, fontSize: '1rem', color: '#fff' }}>{game.title}</h4>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{game.genre} • {game.releaseYear}</p>
                                </div>
                                <span className="badge badge-dark">{game.developer}</span>
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            No local matches found. Click "Fetch AI Data" above to query real-time data for <strong>"{query}"</strong>!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
