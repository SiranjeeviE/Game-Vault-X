import React from 'react';
import { Gamepad2, Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-color)',
            padding: '60px 0 30px',
            marginTop: 'auto'
        }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '40px' }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                            <Gamepad2 color="var(--accent-primary)" size={28} />
                            <span>GAMEVAULT <span style={{ color: 'var(--accent-primary)' }}>X</span></span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            The ultimate destination for PC gaming history. Explore, compare, and simulate your dream library.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '1.2rem', fontWeight: 'bold' }}>EXPLORE</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-secondary)' }}>
                            <li style={{ cursor: 'pointer', transition: 'color 0.2s' }} className="hover-accent">New Releases</li>
                            <li style={{ cursor: 'pointer', transition: 'color 0.2s' }} className="hover-accent">Classic Hits</li>
                            <li style={{ cursor: 'pointer', transition: 'color 0.2s' }} className="hover-accent">Coming Soon</li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '1.2rem', fontWeight: 'bold' }}>CONNECT</h4>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div className="social-icon"><Github size={20} /></div>
                            <div className="social-icon"><Twitter size={20} /></div>
                            <div className="social-icon"><Instagram size={20} /></div>
                        </div>
                    </div>
                </div>

                <div style={{
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '30px',
                    textAlign: 'center',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem'
                }}>
                    &copy; {new Date().getFullYear()} GameVault X. All rights reserved. Designed for Gamers.
                </div>
            </div>
            <style>{`
                .hover-accent:hover { color: var(--accent-primary) !important; }
                .social-icon {
                    width: 40px; height: 40px;
                    border-radius: 50%;
                    background: var(--bg-card);
                    display: flex; align-items: center; justify-content: center;
                    border: 1px solid var(--border-color);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .social-icon:hover {
                    border-color: var(--accent-primary);
                    color: var(--accent-primary);
                    transform: translateY(-3px);
                }
            `}</style>
        </footer>
    );
};

export default Footer;
