import React, { useState, useContext, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, Cpu, RefreshCw } from 'lucide-react';
import { AIContext } from '../context/AIContext';
import { askVaultAIChat } from '../services/aiService';

const VaultAIChatDrawer = () => {
    const {
        isAIChatOpen,
        setIsAIChatOpen,
        geminiApiKey,
        groqApiKey,
        preferredProvider,
        setIsAISettingsOpen,
        hasActiveKey
    } = useContext(AIContext);

    const [messages, setMessages] = useState([
        {
            role: 'bot',
            text: 'Welcome to Vault AI! I am your real-time gaming strategist powered by Gemini and Groq. Ask me about system performance, game recommendations, lore, or release dates!'
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    if (!isAIChatOpen) return null;

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setLoading(true);

        try {
            const aiReply = await askVaultAIChat({
                query: userMsg,
                history: messages,
                geminiKey: geminiApiKey,
                groqKey: groqApiKey,
                preferredProvider: preferredProvider
            });

            setMessages(prev => [...prev, { role: 'bot', text: aiReply }]);
        } catch (err) {
            console.error("AI Chat Error:", err);
            setMessages(prev => [...prev, { role: 'bot', text: "⚠️ Unable to fetch response. Please check your API key settings." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '420px',
            maxWidth: '100vw',
            background: 'var(--bg-secondary)',
            borderLeft: '1px solid var(--border-light)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-20px 0 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 255, 157, 0.1)',
            backdropFilter: 'blur(16px)'
        }} className="animate-slide-up">
            
            {/* Header */}
            <div style={{
                padding: '1.2rem 1.5rem',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
                background: 'radial-gradient(ellipse at top right, rgba(0, 255, 157, 0.1), transparent 70%)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-xs)',
                        background: preferredProvider === 'gemini' ? 'rgba(0, 255, 157, 0.15)' : 'rgba(0, 184, 255, 0.15)',
                        color: preferredProvider === 'gemini' ? 'var(--accent-emerald)' : 'var(--accent-cyan)'
                    }}>
                        {preferredProvider === 'gemini' ? <Sparkles size={20} /> : <Cpu size={20} />}
                    </div>
                    <div>
                        <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>Vault AI Assistant</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            <span style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: hasActiveKey ? 'var(--accent-emerald)' : 'var(--accent-amber)'
                            }}></span>
                            {hasActiveKey ? `${preferredProvider === 'gemini' ? 'Gemini 1.5 Flash' : 'Groq Llama 3.3'} Active` : 'Demo Engine Active'}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <button
                        onClick={() => setIsAISettingsOpen(true)}
                        style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-secondary)',
                            padding: '0.35rem 0.6rem',
                            borderRadius: 'var(--radius-xs)',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            fontWeight: 600
                        }}
                    >
                        Keys
                    </button>
                    <button
                        onClick={() => setIsAIChatOpen(false)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer',
                            padding: '0.35rem'
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Messages Scroll Area */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1.2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                {messages.map((m, idx) => (
                    <div key={idx} style={{
                        display: 'flex',
                        gap: '0.6rem',
                        alignItems: 'flex-start',
                        flexDirection: m.role === 'user' ? 'row-reverse' : 'row'
                    }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: m.role === 'user' ? 'rgba(0, 184, 255, 0.2)' : 'rgba(0, 255, 157, 0.2)',
                            color: m.role === 'user' ? 'var(--accent-cyan)' : 'var(--accent-emerald)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            border: `1px solid ${m.role === 'user' ? 'rgba(0, 184, 255, 0.3)' : 'rgba(0, 255, 157, 0.3)'}`
                        }}>
                            {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div style={{
                            maxWidth: '80%',
                            padding: '0.85rem 1.1rem',
                            borderRadius: m.role === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                            background: m.role === 'user' ? 'rgba(0, 184, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                            border: `1px solid ${m.role === 'user' ? 'rgba(0, 184, 255, 0.25)' : 'var(--border-subtle)'}`,
                            color: '#fff',
                            fontSize: '0.9rem',
                            lineHeight: '1.5',
                            whiteSpace: 'pre-wrap'
                        }}>
                            {m.text}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'rgba(0, 255, 157, 0.2)',
                            color: 'var(--accent-emerald)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <RefreshCw size={16} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Vault AI is typing...</div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} style={{
                padding: '1rem',
                borderTop: '1px solid var(--border-subtle)',
                background: 'rgba(5, 6, 8, 0.9)',
                display: 'flex',
                gap: '0.5rem'
            }}>
                <input
                    type="text"
                    placeholder="Ask about FPS, specs, lore, or recommendations..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{
                        flex: 1,
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--border-subtle)',
                        color: '#fff',
                        fontSize: '0.9rem',
                        outline: 'none'
                    }}
                />
                <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="btn btn-primary"
                    style={{ padding: '0.75rem 1rem' }}
                >
                    <Send size={16} />
                </button>
            </form>

            <style>{`
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default VaultAIChatDrawer;
