const isBrowser = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const readStore = (key, fallback) => {
    if (!isBrowser()) {
        return fallback;
    }

    try {
        const raw = window.localStorage.getItem(key);
        if (!raw) {
            return fallback;
        }
        return JSON.parse(raw);
    } catch (error) {
        console.warn(`readStore failed for key: ${key}`, error);
        return fallback;
    }
};

export const writeStore = (key, value) => {
    if (!isBrowser()) {
        return;
    }

    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn(`writeStore failed for key: ${key}`, error);
    }
};

