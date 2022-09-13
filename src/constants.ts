import COUNTRY_DATA from "./country/COL";

export const INTL = {
    code: 'es-CO',
    currency: 'COP'
};

export const COUNTRY_DATA_MAPPED = Object.keys(COUNTRY_DATA).map((state: string) => {
    return {
        name: state,
        cities: Object.keys(COUNTRY_DATA[state]).map(city => ({
            name: city,
            code: COUNTRY_DATA[state][city]
        }))
    } as CountryItem
});