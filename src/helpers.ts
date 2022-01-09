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