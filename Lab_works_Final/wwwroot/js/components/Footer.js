
import { FOOTER_INFO, SOCIAL_LINKS } from '../data/constants.js';

export class Footer {
    constructor(containerId = 'footer') {
        this.container = document.getElementById(containerId);
    }

    /** Генерация HTML-разметки подвала */
    render() {
        const socialLinksHTML = SOCIAL_LINKS.map(({ url, icon, name }) =>
            `<a href="${url}" target="_blank" class="social-link" title="${name}">${icon}</a>`
        ).join('');

        return `
            <footer class="footer">
                <div class="footer-contacts">
                    <p>${FOOTER_INFO.phone}</p>
                </div>
                <div class="footer-social">
                    ${socialLinksHTML}
                </div>
                <div class="footer-copyright">
                    <p>&copy; ${new Date().getFullYear()} Все права защищены</p>
                </div>
            </footer>
        `;
    }

    init() {
        if (this.container) {
            this.container.innerHTML = this.render();
        }
    }
}