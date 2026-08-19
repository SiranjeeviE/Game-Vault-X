import React, { useContext } from 'react';
import { X, Sparkles, ShieldCheck, Cpu } from 'lucide-react';
import { AIContext } from '../context/AIContext';

const AISettingsModal = () => {
    const { isAISettingsOpen, setIsAISettingsOpen } = useContext(AIContext);

    if (!isAISettingsOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(3, 7, 18, 0.85)',
            backdropFilter: 'blur(16px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
        }} className="animate-fade-in" onClick={() => setIsAISettingsOpen(false)}>
            <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-lg)',
                maxWidth: '520px',
                width: '100%',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 50px rgba(168, 85, 247, 0.2)',
                position: 'relative'
            }} onClick={(e) => e.stopPropagation()} className="animate-slide-up">

                {/* Modal Header */}
                <div style={{
                    padding: '1.5rem 1.8rem',
                    borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    background: 'radial-gradient(ellipse at top left, rgba(168, 85, 247, 0.15), transparent 70%)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            padding: '0.6rem',
                            borderRadius: 'var(--radius-sm)',
                            background: 'rgba(168, 85, 247, 0.15)',
                            color: 'var(--text-violet)',
                            border: '1px solid rgba(168, 85, 247, 0.3)'
                        }}>
                            <Sparkles size={22} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', margin: 0, color: '#fff' }}>Vault AI Engine Active</h3>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Automated Server-Side Processing</p>
                        </div>
                    </div>

                    <button onClick={() => setIsAISettingsOpen(false)} style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        padding: '0.4rem',
                        borderRadius: 'var(--radius-xs)',
                        transition: 'all 0.2s'
                    }} onMouseEnter={e => e.currentTarget.style.color = '#fff'}>
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{
                        padding: '1rem 1.2rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(16, 185, 129, 0.12)',
                        border: '1px solid rgba(16, 185, 129, 0.35)',
                        color: 'var(--text-emerald)',
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <ShieldCheck size={22} style={{ flexShrink: 0 }} />
                        <div>
                            <strong style={{ display: 'block', color: '#fff', marginBottom: '2px' }}>Secure Backend Pipeline</strong>
                            <span>Game images and AI intelligence are processed automatically via secure server-side credentials.</span>
                        </div>
                    </div>

                    <div style={{
                        padding: '1.2rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-violet)', fontWeight: 700, fontSize: '0.9rem' }}>
                            <Cpu size={18} /> Features Enabled
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                            <li>Real game image fetching for every individual title</li>
                            <li>Automated background removal & clean showcase styling</li>
                            <li>Hardware spec benchmarking & FPS calculations</li>
                            <li>Vault AI companion chat assistant</li>
                        </ul>
                    </div>
                </div>

                {/* Footer Actions */}
                <div style={{
                    padding: '1.2rem 1.8rem',
                    borderTop: '1px solid var(--border-subtle)',
                    background: 'rgba(9, 13, 22, 0.9)',
                    display: 'flex',
                    justify: 'flex-end'
                }}>
                    <button
                        onClick={() => setIsAISettingsOpen(false)}
                        className="btn btn-primary"
                        style={{ fontSize: '0.85rem', padding: '0.6rem 1.4rem' }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AISettingsModal;
