import React, { useState, useContext } from 'react';
import { Cpu, HardDrive, Monitor, Zap, Sparkles, CheckCircle2, Loader, BarChart3 } from 'lucide-react';
import { AIContext } from '../context/AIContext';
import { analyzePCSpecsAI } from '../services/aiService';

const SpecList = ({ title, specs, accentColor, badgeText }) => {
    if (!specs) return null;

    return (
        <div className="glass-panel" style={{
            flex: 1,
            padding: '1.5rem',
            borderTop: `3px solid ${accentColor}`,
            minWidth: '280px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                <h4 style={{ fontSize: '1.1rem', margin: 0, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {title}
                </h4>
                <span className="badge" style={{ background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}40` }}>
                    {badgeText}
                </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.6rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Monitor size={13} color={accentColor} /> Operating System
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', marginTop: '0.2rem' }}>{specs.os}</div>
                </div>

                <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.6rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Cpu size={13} color={accentColor} /> Processor (CPU)
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', marginTop: '0.2rem' }}>{specs.cpu}</div>
                </div>

                <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.6rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Zap size={13} color={accentColor} /> Graphics Card (GPU)
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', marginTop: '0.2rem' }}>{specs.gpu}</div>
                </div>

                <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.6rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <BarChart3 size={13} color={accentColor} /> System RAM
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', marginTop: '0.2rem' }}>{specs.ram}</div>
                </div>

                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <HardDrive size={13} color={accentColor} /> Storage Requirement
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', marginTop: '0.2rem' }}>{specs.storage}</div>
                </div>
            </div>
        </div>
    );
};

const SpecsComparison = ({ minimal, recommended, gameTitle }) => {
    const { geminiApiKey, groqApiKey, preferredProvider } = useContext(AIContext);

    const [userCpu, setUserCpu] = useState('');
    const [userGpu, setUserGpu] = useState('');
    const [userRam, setUserRam] = useState('16GB');
    const [analyzing, setAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleAnalyze = async (e) => {
        e.preventDefault();
        setAnalyzing(true);
        try {
            const res = await analyzePCSpecsAI({
                userCpu,
                userGpu,
                userRam,
                gameTitle: gameTitle || 'Target Game',
                gameSpecs: { minimum: minimal, recommended },
                geminiKey: geminiApiKey,
                groqKey: groqApiKey,
                preferredProvider
            });
            setAnalysisResult(res);
        } catch (err) {
            console.error("Analysis failed", err);
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div style={{ marginTop: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0, color: '#fff' }}>
                    <span style={{ width: '4px', height: '28px', background: 'var(--accent-emerald)', borderRadius: '2px' }}></span>
                    SYSTEM REQUIREMENTS & RIG BENCHMARK
                </h3>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <SpecList
                    title="Minimum Specifications"
                    specs={minimal}
                    accentColor="var(--text-secondary)"
                    badgeText="1080p 30 FPS"
                />
                <SpecList
                    title="Recommended Specifications"
                    specs={recommended}
                    accentColor="var(--accent-emerald)"
                    badgeText="1440p 60+ FPS"
                />
            </div>

            {/* AI Rig Performance Benchmark Tool */}
            <div className="glass-panel" style={{
                padding: '1.8rem',
                background: 'radial-gradient(ellipse at top right, rgba(0, 184, 255, 0.08), transparent 70%), var(--bg-card)',
                border: '1px solid var(--border-cyan)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                    <Sparkles size={20} color="var(--accent-cyan)" />
                    <h4 style={{ margin: 0, fontSize: '1.2rem', color: '#fff' }}>Can My PC Run This? (AI Spec Benchmark)</h4>
                </div>

                <form onSubmit={handleAnalyze} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.2rem' }}>
                    <div>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>YOUR GPU</label>
                        <input
                            type="text"
                            placeholder="e.g. RTX 3060, GTX 1660 Super"
                            value={userGpu}
                            onChange={e => setUserGpu(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.65rem 0.85rem',
                                borderRadius: 'var(--radius-xs)',
                                background: 'rgba(5, 6, 8, 0.8)',
                                border: '1px solid var(--border-subtle)',
                                color: '#fff',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>YOUR CPU</label>
                        <input
                            type="text"
                            placeholder="e.g. Ryzen 5 5600X, i5-12400"
                            value={userCpu}
                            onChange={e => setUserCpu(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.65rem 0.85rem',
                                borderRadius: 'var(--radius-xs)',
                                background: 'rgba(5, 6, 8, 0.8)',
                                border: '1px solid var(--border-subtle)',
                                color: '#fff',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>YOUR RAM</label>
                        <select
                            value={userRam}
                            onChange={e => setUserRam(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.65rem 0.85rem',
                                borderRadius: 'var(--radius-xs)',
                                background: 'rgba(5, 6, 8, 0.8)',
                                border: '1px solid var(--border-subtle)',
                                color: '#fff',
                                outline: 'none'
                            }}
                        >
                            <option value="8GB">8GB RAM</option>
                            <option value="16GB">16GB RAM</option>
                            <option value="32GB">32GB RAM</option>
                            <option value="64GB">64GB RAM</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <button
                            type="submit"
                            disabled={analyzing}
                            className="btn btn-cyan"
                            style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.85rem' }}
                        >
                            {analyzing ? <Loader size={16} className="spin" /> : 'Run AI Spec Benchmark'}
                        </button>
                    </div>
                </form>

                {/* Analysis Output */}
                {analysisResult && (
                    <div style={{
                        padding: '1.2rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(0, 184, 255, 0.3)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.85rem'
                    }} className="animate-fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div>
                                <h5 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--accent-cyan)' }}>Verdict: {analysisResult.verdict}</h5>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Bottleneck: {analysisResult.bottleneck}</span>
                            </div>
                            <div className="badge badge-emerald" style={{ fontSize: '0.9rem', padding: '0.35rem 0.85rem' }}>
                                Score: {analysisResult.compatibilityScore} / 100
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem', margin: '0.5rem 0' }}>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.6rem', borderRadius: '4px', textAlign: 'center' }}>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>1080p FPS</div>
                                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{analysisResult.expectedFps1080p}</div>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.6rem', borderRadius: '4px', textAlign: 'center' }}>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>1440p FPS</div>
                                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{analysisResult.expectedFps1440p}</div>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.6rem', borderRadius: '4px', textAlign: 'center' }}>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>4K FPS</div>
                                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-violet)' }}>{analysisResult.expectedFps4k}</div>
                            </div>
                        </div>

                        {analysisResult.optimizationTips && (
                            <div>
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>OPTIMIZATION TIPS:</div>
                                <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                                    {analysisResult.optimizationTips.map((tip, idx) => (
                                        <li key={idx} style={{ marginBottom: '0.2rem' }}>{tip}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpecsComparison;
