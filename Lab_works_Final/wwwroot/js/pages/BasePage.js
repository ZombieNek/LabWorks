
import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import { Modal } from '../components/Modal.js';
import { ThemeSwitcher } from '../components/ThemeSwitcher.js';

export class BasePage {
    constructor() {
        this.header = new Header('header');
        this.footer = new Footer('footer');
        this.modal = Modal;
        this.themeSwitcher = ThemeSwitcher;
    }

    /** Инициализация компонентов */
    init() {
        this.header.init();
        this.footer.init();
        this.modal.init();
        this.themeSwitcher.init();
        this.render();
    }

    render() {
        const container = document.getElementById('page-content');
        if (container) {
            container.innerHTML = '<p>Страница в разработке</p>';
        }
    }
}