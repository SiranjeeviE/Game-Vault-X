import API_BASE_URL from '../config';

const HARDWARE_API_URL = `${API_BASE_URL}/hardware`;

export const detectHardware = async () => {
    const response = await fetch(`${HARDWARE_API_URL}/detect`);

    if (!response.ok) {
        let message = 'Hardware detection failed.';

        try {
            const error = await response.json();
            message = error.message || message;
        } catch {
            // Keep the default error message when the response is not JSON.
        }

        throw new Error(message);
    }

    return response.json();
};
