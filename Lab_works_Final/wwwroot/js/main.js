
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { HomePage } from './pages/HomePage.js';
import { AboutPage } from './pages/AboutPage.js';
import { SkillsPage } from './pages/SkillsPage.js';
import { PortfolioPage } from './pages/PortfolioPage.js';
import { ContactsPage } from './pages/ContactsPage.js';
import { HobbiesPage } from './pages/HobbiesPage.js';
import { JSTasksPage } from './pages/JSTasksPage.js';

document.addEventListener('DOMContentLoaded', () => {
    // Определение страницы
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Выбор и инициализация соответствующего объекта
    switch (currentPage) {
        case 'index.html':
            new HomePage().init();
            break;
        case 'about.html':
            new AboutPage().init();
            break;
        case 'skills.html':
            new SkillsPage().init();
            break;
        case 'portfolio.html':
            new PortfolioPage().init();
            break;
        case 'contacts.html':
            new ContactsPage().init();
            break;
        case 'hobbies.html':
            new HobbiesPage().init();
            break;
        case 'js-tasks.html':
            new JSTasksPage().init();
            break;
        default:
            new Header('header').init();
            new Footer('footer').init();
            break;
    }
});