
export const Modal = {
    modalElement: null,
    closeBtn: null,

    /** поиск элементов и назначение обработчиков */
    init() {
        this.modalElement = document.getElementById('modal');
        this.closeBtn = document.getElementById('closeModalBtn');

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.hide());
        }

        // Закрытие по клику
        window.addEventListener('click', (e) => {
            if (e.target === this.modalElement) this.hide();
        });

        // Закрытие по ескейп
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.hide();
        });
    },

    /** Отображение модалки */
    show(message) {
        const msgSpan = document.getElementById('modalMessage');
        if (msgSpan) msgSpan.textContent = message;
        if (this.modalElement) {
            this.modalElement.style.display = 'flex';
            document.body.style.overflow = 'hidden'; 
        }
    },

    /** Скрытие модалки */
    hide() {
        if (this.modalElement) {
            this.modalElement.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
};