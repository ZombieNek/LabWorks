
/** Сохранение данных */
export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/** Загрузка данных */
export function getFromLocalStorage(key, defaultValue = null) {
    const data = localStorage.getItem(key);
    if (data) {
        try {
            return JSON.parse(data);
        } catch {
            return data;
        }
    }
    return defaultValue;
}

/** Удаление данных */
export function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}

/** Курсы валют по умолчанию */
const DEFAULT_RATES = {
    RUB: { RUB: 1, USD: 0.011, EUR: 0.0095, CNY: 0.079 },
    USD: { RUB: 92.5, USD: 1, EUR: 0.92, CNY: 7.25 },
    EUR: { RUB: 100.5, USD: 1.09, EUR: 1, CNY: 7.85 },
    CNY: { RUB: 12.8, USD: 0.138, EUR: 0.127, CNY: 1 }
};

/** Загрузка курсов валют из localStorage или стандартных */
export function getExchangeRates() {
    const saved = getFromLocalStorage('exchangeRates');
    return saved || DEFAULT_RATES;
}

/** Сохранение курсов валют */
export function saveExchangeRates(rates) {
    saveToLocalStorage('exchangeRates', rates);
}