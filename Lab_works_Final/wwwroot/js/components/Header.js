
import { NAVIGATION_LINKS } from '../data/constants.js';

export class Header {
    constructor(containerId = 'header') {
        this.container = document.getElementById(containerId);
        // Определение текущей страницы
        const pathParts = window.location.pathname.split('/');
        this.currentPage = pathParts.pop() || 'index.html';
        if (!this.currentPage.endsWith('.html')) {
            this.currentPage = 'index.html';
        }
    }

    /** Генерация HTML-разметки шапки */
    render() {
        const isGitHubPages = window.location.hostname.includes('github.io');
        const repoName = isGitHubPages ? `/${window.location.pathname.split('/')[1]}/` : '/';

        const navItemsHTML = NAVIGATION_LINKS.map(({ href, title }) => {
            const fileName = href.replace('./', '');
            const correctHref = `${repoName}${fileName}`;
            const isActive = this.currentPage === fileName ? 'class="active"' : '';
            return `<li><a href="${correctHref}" ${isActive}>${title}</a></li>`;
        }).join('');

        return `
            <header class="header">
                <div class="nav-container">
                    <div class="logo">NK Dev</div>
                    <input type="checkbox" id="menuToggle">
                    <label for="menuToggle" class="burger-btn">
                        <span></span><span></span><span></span>
                    </label>
                    <ul class="nav-menu">${navItemsHTML}</ul>
                    <div class="theme-switch" id="themeSwitch">
                        <button class="theme-dark active">🌙</button>
                        <button class="theme-light">☀️</button>
                    </div>
                </div>
            </header>
        `;
    }

    init() {
        if (this.container) {
            this.container.innerHTML = this.render();
        }
    }
}