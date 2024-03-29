import { ReactNode } from "react";
import ReactDOM from "react-dom";
import { COUNTRY_DATA_MAPPED, INTL } from "./constants";
import ProviderContext from "./HOC/ProviderContext";

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

/**
 * 
 * @param text string
 * @returns string
 */
export const getLongestPartOfText = (text: string): string => {
    const chunks = text.split(' ');
    return chunks.reduce(function (prev, current) {
        return (prev.length > current.length) ? prev : current
    });
}

/**
 * 
 * @param stateName string
 * @returns CountryItem
 */
export const getState = (stateName: string): CountryItem => {
    if (!stateName) return;

    const keyword = getLongestPartOfText(stateName);
    const stateList = COUNTRY_DATA_MAPPED.filter(
        item => cleanString(item.name).toLowerCase().includes(cleanString(keyword).toLowerCase())
    );
    return stateList.reduce(function (a, b) {
        return a.name.indexOf(keyword) <= b.name.indexOf(keyword) ? a : b;
    });
}

/**
 * 
 * @param cities CountryItemCity[]
 * @param cityName string
 * @returns CountryItemCity
 */
export const getCity = (cities: CountryItemCity[], cityName: string): CountryItemCity => {
    if (!cities || !cityName) return;

    const keyword = getLongestPartOfText(cityName);
    const cityList = cities.filter(
        item => cleanString(item.name).toLowerCase().includes(cleanString(keyword).toLowerCase())
    );
    return cityList.reduce(function (a, b) {
        return a.name.indexOf(keyword) <= b.name.indexOf(keyword) ? a : b;
    });
}

/**
 * 
 * @param cityName string
 * @description Returns a list of states containing at least one city name as a param
 * @returns CountryLocation[]
 */
export const getLocationByCity = (cityName: string): CountryLocation[] => {
    if (!cityName) return;

    const keyword = getLongestPartOfText(cityName);
    return COUNTRY_DATA_MAPPED.filter(
        item => {
            const cityList = item.cities.filter(
                _item => cleanString(_item.name).toLowerCase().includes(cleanString(keyword).toLowerCase())
            );
            return cityList.length && cityList.reduce(function (a, b) {
                return a.name.indexOf(keyword) <= b.name.indexOf(keyword) ? a : b;
            });
        }
    ).map((item: CountryItem) => ({
        state: item,
        city: item.cities.find(
            _item => cleanString(_item.name).toLowerCase().includes(cleanString(keyword).toLowerCase())
        )
    }));
}

/**
 * 
 * @param stateName string
 * @param cityName string
 * @returns CountryLocation
 */
export const getLocation = (stateName: string, cityName: string): CountryLocation => {
    const state = getState(stateName);

    if (state) {
        const city = getCity(state.cities, cityName);
        return { state, city }
    }
}

/**
 * 
 * @param stateName string
 * @param cityName string
 * @returns string
 */
export const getPostalCode = (stateName: string, cityName: string): string => {
    return getLocation(stateName, cityName)?.city?.code;
}

/**
 * @name renderComponent
 * @param component ReactNode
 * @param container HTML Element
 * @description Is used to inject our React code into the DOM for rendering with providers context
 */
export const renderComponent = (component: ReactNode, container: Element) => {
    if (container && component) {
        ReactDOM.render(
            <ProviderContext>
                {component}
            </ProviderContext>,
            container
        );
    }
}

/**
 * 
 * @param {string} selector It refer to the method how selector will found (#id, .class, pseudo-selector...)
 * @description In charge to observe until the prefer element was added to the DOM
 * @returns Promise
 */
export const isAdded = (selector: string, options: MutationObserverInit = { childList: true, subtree: true }) => {
    if (!selector) return new Promise(() => { });

    return new Promise((resolve) => {
        const elementToObserve = document.querySelector("body");
        const observer = new MutationObserver(() => {
            const target = document.querySelector(selector);
            if (target) {
                resolve(target);
                observer.disconnect();
            }
        });

        observer.observe(elementToObserve, options);
    });
}