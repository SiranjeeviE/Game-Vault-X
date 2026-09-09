import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Gamepad2, Search, Sparkles, Cpu, User, Loader, Bot, Key, Zap, Flame, SlidersHorizontal } from 'lucide-react';
import { fetchGames } from './services/api';
import GameCard from './components/GameCard';
import GameDetails from './views/GameDetails';
import SpecsComparison from './components/SpecsComparison';
import Footer from './components/Footer';
import HardwareDetection from './components/HardwareDetection';

import { AuthProvider, AuthContext } from './context/AuthContext';
import { AIProvider, AIContext } from './context/AIContext';
import AISettingsModal from './components/AISettingsModal';
import VaultAIChatDrawer from './components/VaultAIChatDrawer';
import SearchModal from './components/SearchModal';
import LiveAIFetcher from './components/LiveAIFetcher';
import FramerHeroMarquee from './components/FramerHeroMarquee';
import FramerFeatureCards from './components/FramerFeatureCards';

import Login from './views/Login';
import Signup from './views/Signup';
import Profile from './views/Profile';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const {
        preferredProvider,
        hasActiveKey,
        isUsingEnvKey,
        setIsAISettingsOpen,
        setIsAIChatOpen,
        setIsSearchOpen
    } = useContext(AIContext);

    return (
        <nav style={{
            position: 'sticky', top: 0, zIndex: 100,
            background: 'rgba(3, 7, 18, 0.85)', backdropFilter: 'blur(24px)',
            borderBottom: '1px solid var(--border-subtle)', padding: '0.85rem 0'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
                    <div style={{ padding: '0.45rem', borderRadius: 'var(--radius-xs)', background: 'rgba(168, 85, 247, 0.18)', border: '1px solid rgba(168, 85, 247, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Gamepad2 color="var(--text-violet)" size={26} />
                    </div>
                    <span style={{ fontSize: '1.45rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff' }}>
                        GAMEVAULT <span style={{ color: 'var(--accent-violet)' }}>X</span>
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <button onClick={() => setIsSearchOpen(true)} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', gap: '0.6rem' }}>
                        <Search size={16} color="var(--text-violet)" />
                        <span style={{ display: 'none', mdDisplay: 'inline' }}>Search Vault</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)', padding: '1px 5px', borderRadius: '4px' }}>Ctrl K</span>
                    </button>

                    <div style={{ padding: '0.45rem 0.95rem', borderRadius: 'var(--radius-full)', background: 'rgba(168, 85, 247, 0.12)', border: '1px solid rgba(168, 85, 247, 0.35)', color: 'var(--text-violet)', fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Sparkles size={14} color="var(--accent-violet)" />
                        <span>Vault AI Engine</span>
                    </div>

                    <button onClick={() => setIsAIChatOpen(prev => !prev)} className="btn btn-primary" style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}>
                        <Bot size={16} /> <span>Vault AI</span>
                    </button>

                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span onClick={() => window.location.href = '/profile'} style={{ color: 'var(--text-violet)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                                <User size={16} /> {user.username}
                            </span>
                            <button onClick={logout} className="btn btn-ghost" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>LOGOUT</button>
                        </div>
                    ) : (
                        <button onClick={() => window.location.href = '/login'} className="btn btn-emerald" style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}>LOGIN</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

const HeroSection = ({ activeEra, setActiveEra, games = [] }) => (
    <header style={{ padding: '4.5rem 0 3rem', position: 'relative', background: 'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(168, 85, 247, 0.16), transparent 75%)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container animate-fade-in" style={{ textAlign: 'center', maxWidth: '1000px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem' }}>
                <span className="badge badge-violet"><Sparkles size={12} /> Framer Community Template Edition • Gemini & Groq</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.2rem', letterSpacing: '-0.035em' }}>
                THE NEXT-GEN GAME <span className="gradient-text-violet">INTELLIGENCE</span> VAULT
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
                Explore two decades of PC gaming evolution. Powered by internal <code>.env</code> API keys for real-time live metadata, spec benchmarks, and AI intelligence.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}><div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-violet)' }}>25+ Masterpieces</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Indexed Eras (2000-2026)</div></div>
                <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}><div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-emerald)' }}>Internal .env Keys</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Gemini & Groq Auto-Loaded</div></div>
                <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}><div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-cyan)' }}>Rig Benchmark</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Instant 1080p/1440p/4K Meter</div></div>
            </div>
            <LiveAIFetcher />
            <FramerHeroMarquee games={games} />
            <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
                {[{ id: 'ALL', label: 'All Eras' }, { id: '2023-Present', label: 'New Era (2023–Present)' }, { id: '2020-2022', label: 'Next-Gen (2020–2022)' }, { id: '2015-2019', label: 'Modern Era (2015–2019)' }, { id: '2010-2014', label: 'HD Era (2010–2014)' }, { id: '2005-2009', label: 'Golden Age (2005–2009)' }, { id: '2000-2004', label: 'Classic Era (2000–2004)' }].map(tab => (
                    <button key={tab.id} onClick={() => setActiveEra(tab.id)} style={{ padding: '0.6rem 1.25rem', borderRadius: 'var(--radius-full)', border: `1px solid ${activeEra === tab.id ? 'var(--accent-violet)' : 'var(--border-subtle)'}`, background: activeEra === tab.id ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255, 255, 255, 0.03)', color: activeEra === tab.id ? 'var(--text-violet)' : 'var(--text-secondary)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s' }}>{tab.label}</button>
                ))}
            </div>
        </div>
    </header>
);

const EraSection = ({ title, games, navigate }) => {
    if (!games || games.length === 0) return null;
    return <section style={{ marginBottom: '4.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.8rem' }}><div style={{ width: '4px', height: '28px', background: 'var(--accent-violet)', marginRight: '1rem', borderRadius: '2px' }}></div><h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>{title}</h2><span className="badge badge-dark" style={{ marginLeft: '1rem' }}>{games.length} Titles</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.8rem' }}>{games.map(game => <GameCard key={game._id} game={game} onClick={() => navigate(`/game/${game._id}`)} />)}</div>
    </section>;
};

const Home = ({ activeEra, games = [] }) => {
    const navigate = useNavigate();
    const filterByEra = (eraKey) => games.filter(g => g.yearRange === eraKey);
    return <main className="container" style={{ paddingBottom: '4rem', paddingTop: '3rem' }}>
        <FramerFeatureCards />
        <HardwareDetection />
        <div className="animate-fade-in">
            {activeEra === 'ALL' || activeEra === '2023-Present' ? <EraSection title="New Era (2023–Present)" games={filterByEra('2023-Present')} navigate={navigate} /> : null}
            {activeEra === 'ALL' || activeEra === '2020-2022' ? <EraSection title="Next-Gen (2020–2022)" games={filterByEra('2020-2022')} navigate={navigate} /> : null}
            {activeEra === 'ALL' || activeEra === '2015-2019' ? <EraSection title="Modern Era (2015–2019)" games={filterByEra('2015-2019')} navigate={navigate} /> : null}
            {activeEra === 'ALL' || activeEra === '2010-2014' ? <EraSection title="HD Era (2010–2014)" games={filterByEra('2010-2014')} navigate={navigate} /> : null}
            {activeEra === 'ALL' || activeEra === '2005-2009' ? <EraSection title="Golden Age (2005–2009)" games={filterByEra('2005-2009')} navigate={navigate} /> : null}
            {activeEra === 'ALL' || activeEra === '2000-2004' ? <EraSection title="Classic Era (2000–2004)" games={filterByEra('2000-2004')} navigate={navigate} /> : null}
        </div>
    </main>;
};

function AppContent() {
    const [activeEra, setActiveEra] = useState('ALL');
    const [allGames, setAllGames] = useState([]);

    useEffect(() => {
        fetchGames().then(data => setAllGames(data)).catch(() => {});
    }, []);

    return <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-canvas)' }}>
            <Navbar />
            <Routes>
                <Route path="/" element={<><HeroSection activeEra={activeEra} setActiveEra={setActiveEra} games={allGames} /><Home activeEra={activeEra} games={allGames} /></>} />
                <Route path="/game/:id" element={<GameDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
            <AISettingsModal />
            <VaultAIChatDrawer />
            <SearchModal allGames={allGames} />
            <Footer />
        </div>
    </Router>;
}

function App() {
    return <AuthProvider><AIProvider><AppContent /></AIProvider></AuthProvider>;
}

export default App;
