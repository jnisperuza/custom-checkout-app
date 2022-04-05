import { COUNTRY_DATA_MAPPED, INTL } from "./constants";

declare let vtexjs: any;

export const getHash = () => {
    if (typeof window !== "undefined") {
        return window.location.hash;
    }
}

export const triggerEvent = (eventName: string, detail: any) => {
    if (typeof window !== "undefined") {
        const evt = new CustomEvent(eventName, { detail });
        window.dispatchEvent(evt);
    }
}

export const currencyFormat = (money: number, fractionDigits = 0) => {
    if (money === undefined || money === null) return;
    return new Intl.NumberFormat(INTL.code,
        {
            style: 'currency',
            currency: INTL.currency,
            maximumFractionDigits: fractionDigits,
            minimumFractionDigits: fractionDigits,
        }
    ).format(money);
}

export const numberFormat = (number: number, fractionDigits = 0) => {
    if (number === undefined || number === null) return;
    return new Intl.NumberFormat(INTL.code,
        {
            maximumFractionDigits: fractionDigits,
            minimumFractionDigits: fractionDigits,
        }
    ).format(number);
}

export const setStyle = (element: HTMLElement | string, style: { [key: string]: string | number }) => {
    if (!element || !style) return;

    const selector = (typeof element === 'string' ? document.querySelector(element as string) : element) as HTMLElement;
    if (selector) {
        Object.assign(selector.style, style);
    }
}

export const getQueryParam = (name: string) => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop as string),
    });
    return params?.[name];
}

export const getCustomFieldValue = async (appId: string, fieldName: string) => {
    if (!appId || !fieldName || !window['vtexjs']) return new Promise(null);

    const orderForm = await vtexjs.checkout.getOrderForm();
    const appFound = orderForm.customData?.customApps.find((app: CustomApp) => app.id === appId);

    return new Promise((resolve) => {
        if (appFound) {
            resolve(appFound.fields[fieldName]);
        } else {
            resolve(null);
        }
    });
}

export const isMobile = () => {
    return navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i);
}

/**
 * 
 * @param text {string}
 * @returns {string} returns a text string without accents and without punctuation marks.
 */
export const cleanString = (text: string): string => {
    if (!text) return;
    return text.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9 ]/g, '');
}

export const getLongestPartOfText = (text: string): string => {
    const chunks = text.split(' ');
    return chunks.reduce(function (prev, current) {
        return (prev.length > current.length) ? prev : current
    });
}

export const getState = (stateName: string) => {
    if (!stateName) return;

    const keyword = getLongestPartOfText(stateName);
    return COUNTRY_DATA_MAPPED.find(
        item => cleanString(item.state).toLowerCase().includes(cleanString(keyword).toLowerCase())
    );
}

export const getCity = (cities: CountryItemCity[], cityName: string) => {
    if (!cities || !cityName) return;

    const keyword = getLongestPartOfText(cityName);
    return cities.find(
        item => cleanString(item.city).toLowerCase().includes(cleanString(keyword).toLowerCase())
    )
}

export const getLocationByCity = (cityName: string) => {
    if (!cityName) return;

    const keyword = getLongestPartOfText(cityName);
    return COUNTRY_DATA_MAPPED.find(
        item => item.cities.find(_item => cleanString(_item.city).toLowerCase().includes(cleanString(keyword).toLowerCase()))
    );
}

export const getLocation = (stateName: string, cityName: string) => {
    const state = getState(stateName);

    if (state) {
        const city = getCity(state.cities, cityName);
        return { state, city }
    }
}

export const getPostalCode = (stateName: string, cityName: string) => {
    return getLocation(stateName, cityName)?.city?.code;
}