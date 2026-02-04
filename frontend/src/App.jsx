import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Gamepad2, Search, ShoppingCart, Loader } from 'lucide-react';
import { fetchGames } from './services/api';
import GameCard from './components/GameCard';
import GameDetails from './views/GameDetails';

import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { User } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav style={{ padding: '20px 0', borderBottom: '1px solid var(--border-color)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10, 10, 12, 0.95)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-0.5px', cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
                    <Gamepad2 color="var(--accent-primary)" size={32} />
                    <span>GAMEVAULT <span style={{ color: 'var(--accent-primary)' }}>X</span></span>
                </div>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <button className="btn btn-outline" style={{ padding: '8px' }}><Search size={20} /></button>

                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <span
                                onClick={() => window.location.href = '/profile'}
                                style={{ color: 'var(--accent-primary)', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                            >
                                <User size={18} /> {user.username}
                            </span>
                            <button onClick={logout} className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>LOGOUT</button>
                        </div>
                    ) : (
                        <button onClick={() => window.location.href = '/login'} className="btn btn-primary" style={{ padding: '8px 16px', display: 'flex', gap: '8px' }}>
                            LOGIN / JOIN
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

const Hero = () => (
    <header style={{ padding: '80px 0', textAlign: 'center', background: 'radial-gradient(circle at center, #1a2a22 0%, var(--bg-primary) 70%)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container fade-in">
            <h1 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-2px', textShadow: '0 0 20px rgba(0,255,157,0.2)' }}>
                UNLOCK THE <span style={{ color: 'var(--accent-primary)' }}>VAULT</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem' }}>
                Explore the evolution of PC gaming. From classic masterpieces to next-gen ray-traced wonders.
            </p>
        </div>
    </header>
);

const EraSection = ({ title, games, navigate }) => {
    if (!games || games.length === 0) return null;

    return (
        <section style={{ marginBottom: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                <div style={{ width: '8px', height: '32px', background: 'var(--accent-primary)', marginRight: '15px' }}></div>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold', letterSpacing: '-1px' }}>{title}</h2>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '30px'
            }}>
                {games.map(game => (
                    <GameCard key={game._id} game={game} onClick={() => navigate(`/game/${game._id}`)} />
                ))}
            </div>
        </section>
    );
};

const Home = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadGames = async () => {
            setLoading(true);
            try {
                const data = await fetchGames();
                console.log("Fetched games:", data);
                setGames(data);
            } catch (error) {
                console.error("Failed to load games", error);
            } finally {
                setLoading(false);
            }
        };
        loadGames();
    }, []);

    const era2023 = games.filter(g => g.yearRange === '2023-Present');
    const era2020 = games.filter(g => g.yearRange === '2020-2022');
    const era2015 = games.filter(g => g.yearRange === '2015-2019');
    const era2010 = games.filter(g => g.yearRange === '2010-2014');
    const era2005 = games.filter(g => g.yearRange === '2005-2009');
    const era2000 = games.filter(g => g.yearRange === '2000-2004');

    return (
        <main className="container" style={{ paddingBottom: '4rem', paddingTop: '4rem' }}>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '100px', color: 'var(--accent-primary)' }}>
                    <Loader size={48} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                </div>
            ) : (
                <div className="fade-in">
                    <EraSection title="New Era (2023–Present)" games={era2023} navigate={navigate} />
                    <EraSection title="Next-Gen (2020–2022)" games={era2020} navigate={navigate} />
                    <EraSection title="Modern Era (2015–2019)" games={era2015} navigate={navigate} />
                    <EraSection title="HD Era (2010–2014)" games={era2010} navigate={navigate} />
                    <EraSection title="Golden Age (2005–2009)" games={era2005} navigate={navigate} />
                    <EraSection title="Classic Era (2000–2004)" games={era2000} navigate={navigate} />
                </div>
            )}
        </main>
    );
};

import { AuthProvider } from './context/AuthContext';
import Login from './views/Login';
import Signup from './views/Signup';
import Profile from './views/Profile';
import Footer from './components/Footer';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Navbar />
                    <Hero />
                    <div style={{ flex: 1 }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/game/:id" element={<GameDetails />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
