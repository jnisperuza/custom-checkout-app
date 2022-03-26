import DANE_CODES from "./dane.json";

export const INTL = {
    code: 'es-CO',
    currency: 'COP'
};

export const DANE_CODES_MAPPED = Object.keys(DANE_CODES).map((state: string) => {
    return {
        state,
        cities: Object.keys(DANE_CODES[state]).map(city => ({
            city,
            code: DANE_CODES[state][city]
        }))
    }
});