import React, { useState, useContext } from 'react';
import { Sparkles, ArrowRight, Loader, Cpu, CheckCircle2, Zap } from 'lucide-react';
import { AIContext } from '../context/AIContext';
import { fetchLiveGameDataAI } from '../services/aiService';
import { useNavigate } from 'react-router-dom';

const LiveAIFetcher = () => {
    const {
        geminiApiKey,
        groqApiKey,
        preferredProvider,
        setLiveSearchResult,
        setIsAISettingsOpen,
        hasActiveKey
    } = useContext(AIContext);

    const [gameName, setGameName] = useState('');
    const [loading, setLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');
    const navigate = useNavigate();

    const handleFetch = async (e) => {
        e?.preventDefault();
        if (!gameName.trim() || loading) return;

        setLoading(true);
        setStatusMsg(`Querying real-time data using ${preferredProvider === 'gemini' ? 'Gemini 1.5 Flash' : 'Groq Llama 3.3'}...`);

        try {
            const result = await fetchLiveGameDataAI({
                gameTitle: gameName.trim(),
                geminiKey: geminiApiKey,
                groqKey: groqApiKey,
                preferredProvider: preferredProvider
            });

            setLiveSearchResult(result);
            setStatusMsg('Success! Opening real-time AI game card...');
            setTimeout(() => {
                navigate(`/game/${result._id || 'ai-search-result'}`);
            }, 400);
        } catch (error) {
            console.error("Failed to fetch live AI game data:", error);
            setStatusMsg('Failed to connect to AI API. Using high-quality offline demo generator.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.8rem',
            position: 'relative',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 255, 157, 0.1)',
            overflow: 'hidden'
        }}>
            {/* Ambient Top Line */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, var(--accent-emerald), var(--accent-cyan), transparent)'
            }}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span className="badge badge-emerald">
                        <Zap size={14} /> Real-Time AI Search Engine
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        Powered by <strong>{preferredProvider === 'gemini' ? 'Google Gemini AI' : 'Groq Llama 3.3'}</strong>
                    </span>
                </div>

                <button
                    onClick={() => setIsAISettingsOpen(true)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--accent-cyan)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                    }}
                >
                    {hasActiveKey ? <CheckCircle2 size={14} color="var(--accent-emerald)" /> : <Cpu size={14} />}
                    {hasActiveKey ? 'API Key Active' : 'Set API Keys (Free)'}
                </button>
            </div>

            <form onSubmit={handleFetch} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 300px', position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Enter ANY game title (e.g. GTA VI, Elden Ring, Black Myth Wukong, Cyberpunk 2077)..."
                        value={gameName}
                        onChange={(e) => setGameName(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.9rem 1.2rem',
                            borderRadius: 'var(--radius-sm)',
                            background: 'rgba(5, 6, 8, 0.8)',
                            border: '1px solid var(--border-light)',
                            color: '#fff',
                            fontSize: '0.95rem',
                            outline: 'none',
                            transition: 'all 0.2s ease'
                        }}
                        onFocus={e => e.target.style.borderColor = 'var(--accent-emerald)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border-light)'}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || !gameName.trim()}
                    className="btn btn-primary"
                    style={{ padding: '0.9rem 1.8rem', flexShrink: 0 }}
                >
                    {loading ? (
                        <>
                            <Loader size={18} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                            <span>Fetching Real-Time Data...</span>
                        </>
                    ) : (
                        <>
                            <Sparkles size={18} />
                            <span>Generate Live AI Specs & Data</span>
                        </>
                    )}
                </button>
            </form>

            {statusMsg && (
                <div style={{ marginTop: '0.85rem', fontSize: '0.85rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Sparkles size={14} /> {statusMsg}
                </div>
            )}
        </div>
    );
};

export default LiveAIFetcher;
