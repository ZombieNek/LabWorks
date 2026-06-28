
export const ThemeSwitcher = {
    /** восстановление темы и навешивание обработчиков */
    init() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.documentElement.classList.add('light-theme');
            this.updateButtons('light');
        } else {
            document.documentElement.classList.remove('light-theme');
            this.updateButtons('dark');
        }

        const darkBtn = document.querySelector('.theme-dark');
        const lightBtn = document.querySelector('.theme-light');

        if (darkBtn) {
            darkBtn.addEventListener('click', () => {
                document.documentElement.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
                this.updateButtons('dark');
            });
        }

        if (lightBtn) {
            lightBtn.addEventListener('click', () => {
                document.documentElement.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
                this.updateButtons('light');
            });
        }
    },

    /** Обновление активной кнопки  */
    updateButtons(active) {
        const darkBtn = document.querySelector('.theme-dark');
        const lightBtn = document.querySelector('.theme-light');
        if (darkBtn && lightBtn) {
            darkBtn.classList.toggle('active', active === 'dark');
            lightBtn.classList.toggle('active', active === 'light');
        }
    }
};