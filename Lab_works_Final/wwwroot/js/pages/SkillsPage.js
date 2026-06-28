
import { BasePage } from './BasePage.js';
import { skillsData, goalsList } from '../data/skills.js';
import { Calculator } from '../components/Calculator.js';

export class SkillsPage extends BasePage {
    render() {
        const container = document.getElementById('page-content');
        if (!container) return;

        // Генерация строк таблицы
        const tableRows = skillsData.map(skill => `
            <tr>
                <td style="padding: 0.5rem;">${skill.name}</td>
                <td style="padding: 0.5rem;">${skill.level}</td>
                <td style="padding: 0.5rem;">${skill.years}</td>
            </tr>
        `).join('');

        // Генерация целей
        const goalsItems = goalsList.map(goal => `<li>${goal}</li>`).join('');

        container.innerHTML = `
            <div class="card">
                <h1>Мои навыки и компетенции</h1>
                <table style="width: 100%; margin: 1rem 0;">
                    <thead>
                        <tr style="background: var(--primary); color: white;">
                            <th style="padding: 0.75rem;">Навык</th>
                            <th style="padding: 0.75rem;">Уровень</th>
                            <th style="padding: 0.75rem;">Годы опыта</th>
                        </tr>
                    </thead>
                    <tbody>${tableRows}</tbody>
                </table>

                <h2>Мои цели на ближайшие 2 года:</h2>
                <ol style="margin-left: 1.5rem;">${goalsItems}</ol>
            </div>

            <div id="calculator-container"></div>
        `;
        const calculator = new Calculator('calculator-container');
        calculator.render();
    }
}