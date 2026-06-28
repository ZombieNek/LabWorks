
/** Определение времени и приветствие */
export function getGreeting() {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) return '🌅 Доброе утро!';
    if (hours >= 12 && hours < 18) return '☀️ Добрый день!';
    if (hours >= 18 && hours < 23) return '🌆 Добрый вечер!';
    return '🌙 Доброй ночи!';
}

/** Отображение приветствия */
export function showGreeting(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = `${getGreeting()} Рад вас видеть на моем сайте!`;
    }
}

/** Запрос имени пользователя (только 1 раз) */
export function showWelcomePrompt() {
    const hasShown = localStorage.getItem('welcomePromptShown');
    if (hasShown === 'true') return null;

    const name = prompt('👋 Добро пожаловать! Как вас зовут?');
    if (name?.trim()) {
        localStorage.setItem('welcomePromptShown', 'true');
        localStorage.setItem('userName', name.trim());
        return name.trim();
    }
    return null;
}

/** Получение имени пользователя из localStorage */
export function getUserName() {
    return localStorage.getItem('userName') || 'гость';
}

/** Обновление статистики посещений */
export function updateVisitsStats() {
    let visits = parseInt(localStorage.getItem('siteVisits') || '0');
    let totalTime = parseInt(localStorage.getItem('totalTime') || '0');
    let startTime = localStorage.getItem('startTime');
    const currentTime = Date.now();

    if (!startTime) {
        startTime = currentTime;
        localStorage.setItem('startTime', startTime);
        visits++;
        localStorage.setItem('siteVisits', visits);
    }

    const visitsCount = visits;
    const timeSpent = Math.floor((currentTime - parseInt(startTime)) / 1000);
    const avgTime = visitsCount > 0 ? Math.floor((totalTime + timeSpent) / visitsCount) : 0;

    const visitsInfo = document.getElementById('visitsInfo');
    if (visitsInfo) {
        visitsInfo.innerHTML = `
            <p>📅 Вы посетили сайт: ${visitsCount} раз(а)</p>
            <p>⏱️ Время на этой странице: ${Math.floor(timeSpent / 60)} мин ${timeSpent % 60} сек</p>
            <p>📊 Среднее время на сайте: ${Math.floor(avgTime / 60)} мин ${avgTime % 60} сек</p>
        `;
    }
}

/** Сохранение времени сессии при закрытии страницы */
export function saveVisitsStats() {
    const startTime = localStorage.getItem('startTime');
    if (startTime) {
        const timeSpent = Math.floor((Date.now() - parseInt(startTime)) / 1000);
        const totalTime = parseInt(localStorage.getItem('totalTime') || '0') + timeSpent;
        localStorage.setItem('totalTime', totalTime);
        localStorage.removeItem('startTime');
    }
}

window.addEventListener('beforeunload', saveVisitsStats);