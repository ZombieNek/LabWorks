
import { BasePage } from './BasePage.js';
import { SessionTracker } from '../utils/SessionTracker.js';
import { Modal } from '../components/Modal.js';

export class HomePage extends BasePage {
    constructor() {
        super();
        this.startTime = Date.now();
        this.sessionTracker = new SessionTracker(this.startTime);
    }

    /** Рендер главной страницы */
    render() {
        const container = document.getElementById('page-content');
        if (!container) return;

        container.innerHTML = `
            <div class="card">
                <h1>Привет, я Никита!</h1>
                <p class="first-paragraph">
                    <strong>Добро пожаловать</strong> на мой персональный сайт. Здесь вы найдете информацию обо мне, моих навыках и проектах.
                </p>
                <p>
                    Я увлекаюсь веб-разработкой и создаю <em>интересные и полезные</em> проекты. Этот сайт — моя визитная карточка в мире IT.
                </p>
                <button class="btn" id="welcomeBtn">Узнать больше обо мне</button>
            </div>

            <div class="container">
                <div class="card">
                    <h2>Мое фото</h2>
                    <figure>
                        <img src="static/фото/фото.jpg" alt="Моё фото" style="max-width: 100%; border-radius: var(--border-radius);">
                        <figcaption>Это я</figcaption>
                    </figure>
                </div>

                <div class="card">
                    <h2>Мои интересы</h2>
                    <h3>Навыки:</h3>
                    <ul id="skills-list-preview">
                        <li><strong>HTML & CSS</strong> — средний уровень</li>
                        <li><strong>JavaScript</strong> — минимальный уровень</li>
                        <li><strong>React</strong> — навыки отсутствуют</li>
                        <li><strong>Python</strong> — предбазовый уровень</li>
                        <li><strong>XAML & C#</strong> — средний уровень</li>
                    </ul>
                    <a href="skills.html" class="btn" style="display: inline-block; margin-top: 0.5rem;">Подробнее о навыках →</a>

                    <h3 style="margin-top: 1rem;">Хобби:</h3>
                    <ol id="hobbies-list-preview">
                        <li>Чтение книг</li>
                        <li>Путешествия</li>
                        <li>Игра на гитаре</li>
                        <li>Страйкбол</li>
                    </ol>
                    <a href="hobbies.html" class="btn" style="display: inline-block; margin-top: 0.5rem;">Подробнее о хобби →</a>
                </div>
            </div>

            <div class="text-center mt-2">
                <a href="https://deepseek.com" target="_blank" class="btn">Мой любимый сайт для поиска информации</a>
            </div>
        `;

        // Инициализация обработчиков 
        this.initHandlers();
        this.sessionTracker.start();
    }

    /** Инициализация обработчиков событий */
    initHandlers() {
        const welcomeBtn = document.getElementById('welcomeBtn');
        if (welcomeBtn) {
            welcomeBtn.addEventListener('click', () => {
                window.location.href = 'about.html';
            });
        }
    }
}