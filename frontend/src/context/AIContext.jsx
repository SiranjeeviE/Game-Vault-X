import React, { createContext, useState, useEffect } from 'react';

export const AIContext = createContext();

export const AIProvider = ({ children }) => {
    // Environment defaults
    const envGeminiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    const envGroqKey = import.meta.env.VITE_GROQ_API_KEY || '';
    const envDefaultProvider = import.meta.env.VITE_DEFAULT_AI_PROVIDER || 'gemini';

    // State initialized from localStorage if present, else fallback to env keys
    const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem('gv_gemini_key') || envGeminiKey);
    const [groqApiKey, setGroqApiKey] = useState(() => localStorage.getItem('gv_groq_key') || envGroqKey);
    const [preferredProvider, setPreferredProvider] = useState(() => localStorage.getItem('gv_preferred_provider') || envDefaultProvider);
    
    const [isAISettingsOpen, setIsAISettingsOpen] = useState(false);
    const [isAIChatOpen, setIsAIChatOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [liveSearchResult, setLiveSearchResult] = useState(null);

    // Sync to localStorage
    useEffect(() => {
        if (geminiApiKey) localStorage.setItem('gv_gemini_key', geminiApiKey);
        else localStorage.removeItem('gv_gemini_key');
    }, [geminiApiKey]);

    useEffect(() => {
        if (groqApiKey) localStorage.setItem('gv_groq_key', groqApiKey);
        else localStorage.removeItem('gv_groq_key');
    }, [groqApiKey]);

    useEffect(() => {
        localStorage.setItem('gv_preferred_provider', preferredProvider);
    }, [preferredProvider]);

    // Check effective key (either user custom or internal env key)
    const effectiveGeminiKey = geminiApiKey || envGeminiKey;
    const effectiveGroqKey = groqApiKey || envGroqKey;
    const activeKey = preferredProvider === 'gemini' ? effectiveGeminiKey : effectiveGroqKey;
    const hasActiveKey = Boolean(activeKey && activeKey.trim().length > 5);
    const isUsingEnvKey = hasActiveKey && ((preferredProvider === 'gemini' && !localStorage.getItem('gv_gemini_key') && envGeminiKey) || (preferredProvider === 'groq' && !localStorage.getItem('gv_groq_key') && envGroqKey));

    const testConnection = async (provider, key) => {
        const keyToTest = key || (provider === 'gemini' ? effectiveGeminiKey : effectiveGroqKey);
        if (!keyToTest || keyToTest.trim().length < 5) return { success: false, message: 'No valid API Key found. Add key to .env file or settings.' };
        
        try {
            if (provider === 'gemini') {
                const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${keyToTest}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contents: [{ parts: [{ text: "Hello" }] }] })
                });
                if (res.ok) return { success: true, message: 'Gemini API Key Verified Successfully!' };
                const err = await res.json().catch(() => ({}));
                return { success: false, message: err.error?.message || 'Gemini API Key rejected' };
            } else {
                const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${keyToTest}`
                    },
                    body: JSON.stringify({
                        model: "llama-3.3-70b-versatile",
                        messages: [{ role: "user", content: "Hi" }]
                    })
                });
                if (res.ok) return { success: true, message: 'Groq API Key Verified Successfully!' };
                const err = await res.json().catch(() => ({}));
                return { success: false, message: err.error?.message || 'Groq API Key rejected' };
            }
        } catch (e) {
            return { success: false, message: e.message || 'Network error while testing key' };
        }
    };

    return (
        <AIContext.Provider value={{
            geminiApiKey: effectiveGeminiKey,
            setGeminiApiKey,
            groqApiKey: effectiveGroqKey,
            setGroqApiKey,
            preferredProvider,
            setPreferredProvider,
            hasActiveKey,
            activeKey,
            isUsingEnvKey,
            isAISettingsOpen,
            setIsAISettingsOpen,
            isAIChatOpen,
            setIsAIChatOpen,
            isSearchOpen,
            setIsSearchOpen,
            liveSearchResult,
            setLiveSearchResult,
            testConnection
        }}>
            {children}
        </AIContext.Provider>
    );
};
