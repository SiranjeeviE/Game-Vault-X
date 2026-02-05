import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
            fetchWishlist(token);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchWishlist = async (token) => {
        try {
            const res = await fetch('http://localhost:5000/api/user/profile', {
                headers: { 'x-auth-token': token }
            });
            const data = await res.json();
            setWishlist(data.wishlist || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const login = (userData, token) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        setUser(userData);
        fetchWishlist(token);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setWishlist([]);
    };

    const addToWishlist = async (gameId) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:5000/api/user/wishlist/${gameId}`, {
                method: 'POST',
                headers: { 'x-auth-token': token }
            });
            const data = await res.json();
            setWishlist(data); // Returns updated wishlist IDs
        } catch (err) {
            console.error(err);
        }
    };

    const removeFromWishlist = async (gameId) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:5000/api/user/wishlist/${gameId}`, {
                method: 'DELETE',
                headers: { 'x-auth-token': token }
            });
            const data = await res.json();
            setWishlist(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, wishlist, addToWishlist, removeFromWishlist }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
