
import { BasePage } from './BasePage.js';
import { contactInfo, workSchedule } from '../data/contacts.js';
import { ContactForm } from '../components/ContactForm.js';

export class ContactsPage extends BasePage {
    render() {
        const container = document.getElementById('page-content');
        if (!container) return;

        // Генерация строк таблицы 
        const scheduleRows = workSchedule.map(item =>
            `<tr>
                <td style="padding: 10px; text-align: center;">${item.day}</td>
                <td style="padding: 10px; text-align: center;">${item.hours}</td>
            </tr>`
        ).join('');

        container.innerHTML = `
            <div class="container">
                <div class="card">
                    <h2>📞 Контактная информация</h2>
                    <p>📧 Email: ${contactInfo.email}</p>
                    <p>📞 Телефон: ${contactInfo.phone}</p>
                    <p>📍 Адрес: ${contactInfo.address}</p>
                    <p>💬 Telegram: ${contactInfo.telegram}</p>
                    <p>💻 GitHub: ${contactInfo.github}</p>
                </div>

                <div class="card">
                    <h2>📝 Напишите мне</h2>
                    <div id="contact-form-container"></div>
                </div>
            </div>

            <div class="card">
                <h2>📅 Режим работы</h2>
                <table style="width: 100%; border-collapse: collapse; text-align: center;">
                    <thead>
                        <tr style="background: var(--primary); color: white;">
                            <th style="padding: 12px; text-align: center;">День недели</th>
                            <th style="padding: 12px; text-align: center;">Часы работы</th>
                        </tr>
                    </thead>
                    <tbody>${scheduleRows}</tbody>
                </table>
            </div>
        `;

        const form = new ContactForm('contact-form-container');
        form.render();
    }
}