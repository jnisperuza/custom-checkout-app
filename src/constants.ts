import COUNTRY_DATA from "./country/COL";
import { CountryItem } from "./types/orderForm";

export const INTL = {
    code: 'es-CO',
    currency: 'COP'
};

export const COUNTRY_DATA_MAPPED = Object.keys(COUNTRY_DATA).map((state: string) => {
    return {
        state,
        cities: Object.keys(COUNTRY_DATA[state]).map(city => ({
            city,
            code: COUNTRY_DATA[state][city]
        }))
    } as CountryItem
});