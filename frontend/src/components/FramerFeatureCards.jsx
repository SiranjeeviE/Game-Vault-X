import React, { useContext } from 'react';
import { Sparkles, Cpu, Bot, Zap, ShieldCheck, BarChart3, ArrowRight } from 'lucide-react';
import { AIContext } from '../context/AIContext';

const FramerFeatureCards = () => {
    const { setIsAISettingsOpen, setIsAIChatOpen } = useContext(AIContext);

    return (
        <section style={{ margin: '4rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <span className="badge badge-violet" style={{ marginBottom: '0.75rem' }}>
                    <Sparkles size={12} /> Framer Community Features
                </span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#fff', margin: 0 }}>
                    POWERED BY <span className="gradient-text-violet">ADVANCED AI INTELLIGENCE</span>
                </h2>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem'
            }}>
                {/* Feature 1 */}
                <div className="glass-card" style={{
                    padding: '2rem',
                    background: 'radial-gradient(ellipse at top left, rgba(168, 85, 247, 0.15), transparent 70%), var(--bg-card)',
                    border: '1px solid var(--border-violet)',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between'
                }}>
                    <div>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: 'var(--radius-sm)',
                            background: 'rgba(168, 85, 247, 0.15)',
                            color: 'var(--text-violet)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.2rem',
                            border: '1px solid rgba(168, 85, 247, 0.3)'
                        }}>
                            <Sparkles size={24} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem' }}>
                            Real-Time Gemini & Groq Engine
                        </h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            Powered by secure server-side API processing. Every game is indexed with real-time metadata, high-definition cover art, and store deals.
                        </p>
                    </div>
                    <div style={{
                        color: 'var(--text-violet)',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        marginTop: '1.5rem'
                    }}>
                        <ShieldCheck size={16} /> Automated Showcase
                    </div>
                </div>


                {/* Feature 2 */}
                <div className="glass-card" style={{
                    padding: '2rem',
                    background: 'radial-gradient(ellipse at top right, rgba(6, 182, 212, 0.15), transparent 70%), var(--bg-card)',
                    border: '1px solid var(--border-cyan)',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between'
                }}>
                    <div>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: 'var(--radius-sm)',
                            background: 'rgba(6, 182, 212, 0.15)',
                            color: 'var(--text-cyan)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.2rem',
                            border: '1px solid rgba(6, 182, 212, 0.3)'
                        }}>
                            <BarChart3 size={24} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem' }}>
                            AI PC Rig Spec Benchmark
                        </h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            Instant performance calculation for your hardware. Evaluates CPU, GPU, and RAM for expected 1080p, 1440p, and 4K FPS ratings.
                        </p>
                    </div>
                    <a
                        href="#spec-benchmark"
                        style={{
                            color: 'var(--text-cyan)',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            marginTop: '1.5rem'
                        }}
                    >
                        Test Hardware <ArrowRight size={14} />
                    </a>
                </div>

                {/* Feature 3 */}
                <div className="glass-card" style={{
                    padding: '2rem',
                    background: 'radial-gradient(ellipse at bottom left, rgba(16, 185, 129, 0.15), transparent 70%), var(--bg-card)',
                    border: '1px solid var(--border-emerald)',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between'
                }}>
                    <div>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: 'var(--radius-sm)',
                            background: 'rgba(16, 185, 129, 0.15)',
                            color: 'var(--text-emerald)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.2rem',
                            border: '1px solid rgba(16, 185, 129, 0.3)'
                        }}>
                            <Bot size={24} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem' }}>
                            Vault AI Companion Chat
                        </h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            Ask questions about game lore, graphic setting optimizations, strategy guides, and recommendations anywhere in the app.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsAIChatOpen(true)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-emerald)',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            marginTop: '1.5rem',
                            cursor: 'pointer'
                        }}
                    >
                        Launch Vault AI <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FramerFeatureCards;
