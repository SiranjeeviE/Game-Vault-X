import API_BASE_URL from '../config';

const API_URL = `${API_BASE_URL}/games`;

export const fetchGames = async (era) => {
    try {
        let url = API_URL;
        if (era) {
            url += `?era=${era}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching games:", error);
        throw error;
    }
};

export const fetchGameById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching game:", error);
        throw error;
    }
}
