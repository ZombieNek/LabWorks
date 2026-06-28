
export class Calculator {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = null;
        this.firstNumInput = null;
        this.operationSelect = null;
        this.secondNumInput = null;
        this.resultDisplay = null;
        this.hasFocus = false;
    }

    /** Рендеринг HTML-разметки */
    render() {
        this.container = document.getElementById(this.containerId);
        if (!this.container) {
            console.error(`Контейнер "${this.containerId}" не найден`);
            return;
        }

        this.container.innerHTML = `
            <div class="card">
                <h2> Калькулятор</h2>
                <div class="calculator">
                    <div class="calc-inputs">
                        <div class="input-group">
                            <label>Первое число</label>
                            <input type="text" id="calc-first-num" placeholder="0">
                        </div>
                        <div class="input-group">
                            <label>Операция</label>
                            <select id="calc-operation">
                                <option value="+">+</option>
                                <option value="-">−</option>
                                <option value="*">×</option>
                                <option value="/">÷</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <label>Второе число</label>
                            <input type="text" id="calc-second-num" placeholder="0">
                        </div>
                    </div>

                    <div class="calc-result">
                        <label>Результат</label>
                        <div id="calc-final-result" class="result-display" style="font-size: 2rem;">0</div>
                    </div>

                    <div class="calc-actions" style="display: flex; gap: 1rem;">
                        <button class="btn" id="calc-calculate" style="flex: 1;">Вычислить</button>
                        <button class="btn" id="calc-clear" style="flex: 1; background: #ef4444;">Очистить</button>
                    </div>
                </div>
            </div>
        `;

        this.bindElements();
        this.attachEvents();
    }

    bindElements() {
        this.firstNumInput = document.getElementById('calc-first-num');
        this.operationSelect = document.getElementById('calc-operation');
        this.secondNumInput = document.getElementById('calc-second-num');
        this.resultDisplay = document.getElementById('calc-final-result');
    }

    attachEvents() {
        const calculateBtn = document.getElementById('calc-calculate');
        const clearBtn = document.getElementById('calc-clear');

        calculateBtn?.addEventListener('click', () => this.calculate());
        clearBtn?.addEventListener('click', () => this.clear());

        // Обработка ввода
        [this.firstNumInput, this.secondNumInput].forEach(input => {
            input.addEventListener('keydown', (e) => {
                if (!/[\d.,]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                    e.preventDefault();
                }
            });

            input.addEventListener('focus', () => { this.hasFocus = true; });
            input.addEventListener('blur', () => { this.hasFocus = false; });
        });

        // Быстрые клавиши
        document.addEventListener('keydown', (e) => {
            if (!this.hasFocus) return;
            if (['+', '-', '*', '/'].includes(e.key)) {
                e.preventDefault();
                this.operationSelect.value = e.key;
            }
            if (e.key === 'Enter') {
                e.preventDefault();
                this.calculate();
            }
            if (e.key === 'Escape') {
                e.preventDefault();
                this.clear();
            }
        });
    }

    /** Вычисления */
    calculate() {
        const num1 = parseFloat(this.firstNumInput.value);
        const num2 = parseFloat(this.secondNumInput.value);

        if (isNaN(num1) || isNaN(num2)) {
            this.resultDisplay.textContent = '⚠️ Введите числа';
            return;
        }

        const operation = this.operationSelect.value;
        let result;

        switch (operation) {
            case '+': result = num1 + num2; break;
            case '-': result = num1 - num2; break;
            case '*': result = num1 * num2; break;
            case '/':
                if (num2 === 0) {
                    this.resultDisplay.textContent = '❌ На ноль делить нельзя';
                    return;
                }
                result = num1 / num2;
                break;
            default:
                return;
        }

        this.resultDisplay.textContent = Number.isInteger(result) ? result : result.toFixed(4);
    }

    /** очистка полей */
    clear() {
        this.firstNumInput.value = '';
        this.secondNumInput.value = '';
        this.resultDisplay.textContent = '0';
        this.firstNumInput.focus();
    }
}