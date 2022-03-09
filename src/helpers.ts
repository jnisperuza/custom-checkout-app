import { INTL } from "./constants";

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

export const isMobile = () => {
    return navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i);
}