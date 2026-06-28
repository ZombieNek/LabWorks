
import { Modal } from './Modal.js';

export class ContactForm {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = null;
        this.today = new Date().toISOString().split('T')[0];
    }

    render() {
        this.container = document.getElementById(this.containerId);
        if (!this.container) {
            console.error(`Контейнер "${this.containerId}" не найден`);
            return;
        }

        this.container.innerHTML = `
            <form id="contact-form" class="contact-form">
                <div class="form-group">
                    <label for="fio">ФИО (только буквы)</label>
                    <input type="text" id="fio" placeholder="Иванов Иван Иванович" required>
                    <span class="error-message" id="fio-error"></span>
                </div>

                <div class="form-group">
                    <label for="phone">Номер телефона</label>
                    <input type="tel" id="phone" placeholder="+7 (___) ___-__-__" required>
                    <span class="error-message" id="phone-error"></span>
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" placeholder="example@mail.com" required>
                    <span class="error-message" id="email-error"></span>
                </div>

                <div class="form-group">
                    <label for="contactDate">Желаемая дата связи</label>
                    <input type="date" id="contactDate" min="${this.today}" required>
                    <span class="error-message" id="date-error"></span>
                </div>

                <div class="form-group">
                    <label for="photo">Ваше фото</label>
                    <input type="file" id="photo" accept="image/*">
                    <div id="photoPreview" style="margin-top: 0.5rem;"></div>
                </div>

                <div class="form-group">
                    <label for="message">Сообщение</label>
                    <textarea id="message" rows="4" placeholder="Ваше сообщение..."></textarea>
                </div>

                <button type="submit" class="btn" style="width: 100%;">📨 Отправить</button>
            </form>

            <div id="userInfoBlock" style="display: none; margin-top: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: var(--border-radius);">
                <h3>Информация о пользователе</h3>
                <p><strong>Фамилия:</strong> <span id="lastName"></span></p>
                <p><strong>Имя:</strong> <span id="firstName"></span></p>
                <p><strong>Отчество:</strong> <span id="middleName"></span></p>
            </div>
        `;

        this.bindElements();
        this.initValidation();
        this.initPhotoPreview();
        this.initSubmit();
    }

    bindElements() {
        this.form = document.getElementById('contact-form');
        this.fioInput = document.getElementById('fio');
        this.phoneInput = document.getElementById('phone');
        this.emailInput = document.getElementById('email');
        this.dateInput = document.getElementById('contactDate');
        this.photoInput = document.getElementById('photo');
        this.messageInput = document.getElementById('message');
        this.userInfoBlock = document.getElementById('userInfoBlock');
        this.photoPreview = document.getElementById('photoPreview');
    }

    /** Валидация полей */
    initValidation() {
        // ФИО: только буквы
        this.fioInput?.addEventListener('input', () => {
            this.fioInput.value = this.fioInput.value.replace(/[^а-яА-ЯёЁa-zA-Z\s-]/g, '');
        });

        // Телефон: только цифры
        this.phoneInput?.addEventListener('input', () => {
            this.phoneInput.value = this.phoneInput.value.replace(/\D/g, '');
        });

        // Дата: проверка в реальном времени
        this.dateInput?.addEventListener('change', () => {
            const selected = new Date(this.dateInput.value);
            const today = new Date(this.today);
            if (selected < today) {
                document.getElementById('date-error').textContent = 'Дата не может быть раньше сегодня';
                this.dateInput.classList.add('invalid-field');
            } else {
                document.getElementById('date-error').textContent = '';
                this.dateInput.classList.remove('invalid-field');
                this.dateInput.classList.add('valid-field');
            }
        });
    }

    /** Предпросмотр загруженного фото */
    initPhotoPreview() {
        this.photoInput?.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) {
                this.photoPreview.innerHTML = '';
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                alert('Размер файла не должен превышать 5 МБ');
                this.photoInput.value = '';
                return;
            }
            const reader = new FileReader();
            reader.onload = (ev) => {
                this.photoPreview.innerHTML = `<img src="${ev.target.result}" style="max-width: 100px; border-radius: 8px;">`;
            };
            reader.readAsDataURL(file);
        });
    }

    /** Обработка отправки формы */
    initSubmit() {
        this.form?.addEventListener('submit', (e) => {
            e.preventDefault();

            const fio = this.fioInput.value.trim();
            const phone = this.phoneInput.value.trim();
            const email = this.emailInput.value.trim();
            const date = this.dateInput.value;

            let errors = [];

            // Валидация ФИО
            if (!fio) errors.push('ФИО обязательно');
            else if (fio.split(/\s+/).length < 2) errors.push('Введите имя и фамилию');

            // Валидация телефона
            if (!phone) errors.push('Телефон обязателен');
            else if (phone.length !== 11) errors.push('Телефон должен содержать 11 цифр');

            // Валидация email
            if (!email) errors.push('Email обязателен');
            else if (!/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email)) errors.push('Введите корректный email');

            // Валидация даты
            if (!date) errors.push('Дата обязательна');

            if (errors.length > 0) {
                Modal.show('❌ Ошибки в форме:\n' + errors.join('\n'));
                return;
            }

            // Разбор ФИО
            const parts = fio.split(/\s+/);
            document.getElementById('lastName').textContent = parts[0] || '—';
            document.getElementById('firstName').textContent = parts[1] || '—';
            document.getElementById('middleName').textContent = parts[2] || '—';
            this.userInfoBlock.style.display = 'block';

            Modal.show(' Форма успешно отправлена! Спасибо за обращение!');
            this.form.reset();
            this.photoPreview.innerHTML = '';
            this.userInfoBlock.style.display = 'none';
        });
    }
}