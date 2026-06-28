
import { BasePage } from './BasePage.js';
import { hobbiesData, hobbiesGoals } from '../data/hobbies.js';

export class HobbiesPage extends BasePage {
    render() {
        const container = document.getElementById('page-content');
        if (!container) return;

        // Генерация карточек хобби
        const hobbyCards = hobbiesData.map(hobby => `
            <div class="card">
                <h2>${hobby.name}</h2>
                <p>${hobby.description}</p>
                <p>${hobby.details}</p>
            </div>
        `).join('');

        // Генерация списка целей
        const goalsItems = hobbiesGoals.map(goal => `<li>${goal}</li>`).join('');

        container.innerHTML = `
            <div class="card">
                <h1>Мои хобби и увлечения</h1>
                <p class="first-paragraph">
                    В свободное время я занимаюсь разными интересными делами. Вот подробнее о моих увлечениях:
                </p>
            </div>

            ${hobbyCards}

            <div class="card">
                <h2> Мои цели в хобби на будущее:</h2>
                <ol style="margin-left: 1.5rem;">${goalsItems}</ol>
            </div>
        `;
    }
}