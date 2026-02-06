import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import GameCard from '../components/GameCard';
import { Gamepad2, User, Heart } from 'lucide-react';

const Profile = () => {
    const { user, loading, logout } = useContext(AuthContext);
    const [wishlistGames, setWishlistGames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    useEffect(() => {
        const fetchProfileData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await fetch('http://localhost:5000/api/user/profile', {
                        headers: { 'x-auth-token': token }
                    });
                    const data = await res.json();
                    setWishlistGames(data.wishlist || []);
                } catch (err) {
                    console.error("Failed to load wishlist details");
                }
            }
        };
        fetchProfileData();
    }, [user]);

    if (loading || !user) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading...</div>;

    return (
        <div className="container fade-in" style={{ padding: '60px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '50%', border: '2px solid var(--accent-primary)' }}>
                    <User size={40} color="var(--accent-primary)" />
                </div>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '5px' }}>{user.username}</h1>
                    <div style={{ color: 'var(--text-secondary)' }}>{user.email}</div>
                </div>
                <button onClick={logout} className="btn btn-outline" style={{ marginLeft: 'auto' }}>LOGOUT</button>
            </div>

            <h2 style={{ fontSize: '2rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Heart fill="var(--accent-danger)" color="var(--accent-danger)" /> My Wishlist
            </h2>

            {wishlistGames.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)' }}>
                    <Gamepad2 size={48} style={{ opacity: 0.5, marginBottom: '20px' }} />
                    <h3>Your vault is empty.</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>Go verify some games and add them to your collection.</p>
                    <button onClick={() => navigate('/')} className="btn btn-primary">BROWSE GAMES</button>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '30px'
                }}>
                    {wishlistGames.map(game => (
                        <GameCard key={game._id} game={game} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Profile;
