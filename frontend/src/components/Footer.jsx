import React from 'react';
import { Gamepad2, Sparkles, Cpu, ShieldCheck, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-subtle)',
            position: 'relative',
            marginTop: '5rem',
            padding: '4rem 0 2rem'
        }}>
            {/* Top Glow Border */}
            <div style={{
                position: 'absolute',
                top: '-1px',
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, var(--accent-emerald), var(--accent-cyan), transparent)'
            }}></div>

            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '3rem',
                    marginBottom: '3rem'
                }}>
                    {/* Brand Col */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
                            <Gamepad2 color="var(--accent-emerald)" size={28} />
                            <span>GAMEVAULT <span style={{ color: 'var(--accent-emerald)' }}>X</span></span>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                            Next-generation PC gaming discovery platform. Empowered with real-time AI intelligence, live game specs, and deal benchmarks.
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <span className="badge badge-emerald"><Sparkles size={12} /> Gemini 1.5</span>
                            <span className="badge badge-cyan"><Cpu size={12} /> Groq Llama 3</span>
                        </div>
                    </div>

                    {/* Quick Eras */}
                    <div>
                        <h4 style={{ fontSize: '0.9rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.2rem' }}>
                            Gaming Eras
                        </h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            <li><a href="#era-2023" style={{ transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--accent-emerald)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>New Era (2023–Present)</a></li>
                            <li><a href="#era-2020" style={{ transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--accent-emerald)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>Next-Gen (2020–2022)</a></li>
                            <li><a href="#era-2015" style={{ transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--accent-emerald)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>Modern Era (2015–2019)</a></li>
                            <li><a href="#era-2010" style={{ transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--accent-emerald)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>HD Era (2010–2014)</a></li>
                        </ul>
                    </div>

                    {/* System Status & Key Links */}
                    <div>
                        <h4 style={{ fontSize: '0.9rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.2rem' }}>
                            Engine Status
                        </h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--accent-emerald)' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-emerald)', boxShadow: '0 0 10px var(--accent-emerald)' }}></span>
                            AI Vault API Engine Operational
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                            Connect your free Gemini or Groq API keys directly from the top navigation bar to unlock live game data fetching.
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    paddingTop: '2rem',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)'
                }}>
                    <div>
                        © {new Date().getFullYear()} GameVault X. Built with React, Vite & AI Intelligence.
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        Crafted for gamers & hardware enthusiasts
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
