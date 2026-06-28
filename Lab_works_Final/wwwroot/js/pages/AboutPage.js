
import { BasePage } from './BasePage.js';

export class AboutPage extends BasePage {
    render() {
        const container = document.getElementById('page-content');
        if (!container) return;

        container.innerHTML = `
            <div class="card">
                <h1>Моя биография</h1>
                <p class="first-paragraph">
                    <strong>Привет!</strong> Меня зовут Никита, и я начинающий веб-разработчик и программист.
                </p>
                <p>
                    Я с детства увлекался <em>технологиями и программированием</em>. После школы поступил в университет на специальность "Информационные системы и технологии".
                </p>
                <p>
                    <strong>Мой профессиональный путь</strong> начался с изучения C++ и C#. Постепенно я освоил HTML и CSS и начал создавать интерактивные веб-приложения.
                </p>
                <p>
                    Сейчас я активно развиваюсь в направлении <em>frontend-разработки</em> и планирую изучать React и Vue.js. Моя цель — стать fullstack-разработчиком.
                </p>
            </div>

            <div class="card">
                <blockquote style="border-left: 4px solid var(--primary); padding: 1rem; margin: 0;">
                    <p>"Единственный способ сделать великую работу — любить то, что ты делаешь"</p>
                    <footer>— Стив Джобс</footer>
                </blockquote>
            </div>

            <div class="card text-center">
                <a href="static/resume.pdf" download class="btn">📄 Скачать резюме в формате PDF</a>
            </div>
        `;
    }
}