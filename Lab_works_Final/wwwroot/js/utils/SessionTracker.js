
export class SessionTracker {
    constructor(startTime) {
        this.startTime = startTime;
    }

    /** Запуск трекера */
    start() {
        window.addEventListener('beforeunload', () => {
            const sessionTime = Math.floor((Date.now() - this.startTime) / 1000);
            const currentTotal = parseInt(localStorage.getItem('totalTime') || '0');
            localStorage.setItem('totalTime', currentTotal + sessionTime);
        });
    }
}