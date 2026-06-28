
import { BasePage } from './BasePage.js';
import { getProjects, filterProjects, getUniqueTechnologies } from '../data/projects.js';

export class PortfolioPage extends BasePage {
    constructor() {
        super();
        this.projects = getProjects();
        this.currentFilter = 'all';
    }

    render() {
        const container = document.getElementById('page-content');
        if (!container) return;

        // Генерация кнопок фильтров
        const techs = getUniqueTechnologies();
        const filterButtons = techs.map(tech =>
            `<button class="filter-btn ${tech === 'all' ? 'active' : ''}" data-tech="${tech}">
                ${tech === 'all' ? 'Все' : tech}
            </button>`
        ).join('');

        container.innerHTML = `
            <h1>Мои проекты</h1>
            <div class="filter-bar" id="filter-bar">${filterButtons}</div>
            <div id="projects-grid" class="projects-grid"></div>
        `;

        this.renderProjects(this.projects);
        this.initFilterHandlers();
    }

    /** Отрисовка карточек проектов */
    renderProjects(projects) {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;

        grid.innerHTML = projects.map(project => `
            <div class="project-card">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="flex" style="margin: 1rem 0;">
                    ${project.technologies.map(tech =>
            `<span style="background: var(--primary); padding: 0.25rem 0.75rem; border-radius: 2rem; font-size: 0.75rem;">${tech}</span>`
        ).join('')}
                </div>
                <div class="flex">
                    ${project.demoLink && project.demoLink !== '#' ?
                `<a href="${project.demoLink}" target="_blank" class="btn" style="padding: 0.5rem 1rem;">🔍 Демо</a>` : ''}
                    ${project.githubLink && project.githubLink !== '#' ?
                `<a href="${project.githubLink}" target="_blank" class="btn" style="padding: 0.5rem 1rem;">💻 GitHub</a>` : ''}
                </div>
            </div>
        `).join('');
    }

    /** Инициализация фильтрации */
    initFilterHandlers() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const tech = btn.dataset.tech;
                const filtered = tech === 'all' ? this.projects : filterProjects(tech);
                this.renderProjects(filtered);
            });
        });
    }
}