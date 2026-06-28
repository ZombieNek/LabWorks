
import { BasePage } from './BasePage.js';
import { getGreeting, updateVisitsStats } from '../utils/helpers.js';
import { getExchangeRates } from '../utils/storage.js';
import { loadCatBreeds, filterCatBreeds, sortCatBreeds } from '../utils/api.js';
import { Modal } from '../components/Modal.js';

export class JSTasksPage extends BasePage {
    async render() {
        const container = document.getElementById('page-content');
        if (!container) return;

        container.innerHTML = `
            <div class="card">
                <h2>🌞 Приветствие</h2>
                <div id="greetingBlock" class="greeting"></div>
            </div>

            <div class="card">
                <h2>💱 Конвертер валют</h2>
                <div class="flex" style="gap: 1rem; align-items: center; flex-wrap: wrap;">
                    <input type="number" id="amount" value="100" style="flex: 1; padding: 0.5rem;">
                    <select id="fromCurrency" style="padding: 0.5rem;">
                        <option value="RUB">🇷🇺 RUB</option>
                        <option value="USD">🇺🇸 USD</option>
                        <option value="EUR">🇪🇺 EUR</option>
                        <option value="CNY">🇨🇳 CNY</option>
                    </select>
                    <span>→</span>
                    <select id="toCurrency" style="padding: 0.5rem;">
                        <option value="RUB">🇷🇺 RUB</option>
                        <option value="USD" selected>🇺🇸 USD</option>
                        <option value="EUR">🇪🇺 EUR</option>
                        <option value="CNY">🇨🇳 CNY</option>
                    </select>
                    <button id="convertBtn" class="btn">Конвертировать</button>
                </div>
                <div id="conversionResult" class="result" style="margin-top: 1rem;"></div>
            </div>

            <div class="card">
                <h2>📊 Статистика посещений</h2>
                <div id="visitsInfo"></div>
            </div>

            <div class="card">
                <h2>🐱 Породы кошек (API)</h2>
                <p>Данные загружаются через TheCatAPI</p>
                <div class="table-filters">
                    <input type="text" id="cat-search" class="table-search" placeholder="🔍 Поиск по названию или стране...">
                </div>
                <div id="cat-table-container" style="overflow-x: auto;">
                    <table class="cat-table" style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr>
                                <th data-sort="name" style="cursor: pointer; padding: 10px; background: var(--primary); color: white;">🐾 Порода</th>
                                <th data-sort="origin" style="cursor: pointer; padding: 10px; background: var(--primary); color: white;">🌍 Страна</th>
                                <th data-sort="temperament" style="cursor: pointer; padding: 10px; background: var(--primary); color: white;">😺 Характер</th>
                                <th data-sort="life_span" style="cursor: pointer; padding: 10px; background: var(--primary); color: white;">📅 Лет жизни</th>
                            </tr>
                        </thead>
                        <tbody id="cat-table-body">
                            <tr><td colspan="4" style="text-align: center;">Загрузка... <span class="loader"></span></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        this.initGreeting();
        this.initCurrencyConverter();
        updateVisitsStats();
        await this.initCatBreedsTable();
    }

    /** Инициализация приветствия по времени */
    initGreeting() {
        const greetingBlock = document.getElementById('greetingBlock');
        if (greetingBlock) {
            greetingBlock.textContent = `${getGreeting()} Рад вас видеть!`;
        }
    }

    /** Инициализация конвертера */
    initCurrencyConverter() {
        const rates = getExchangeRates();
        const convertBtn = document.getElementById('convertBtn');
        const amountInput = document.getElementById('amount');
        const fromSelect = document.getElementById('fromCurrency');
        const toSelect = document.getElementById('toCurrency');
        const resultDiv = document.getElementById('conversionResult');

        const convertCurrency = () => {
            const amount = parseFloat(amountInput.value);
            const from = fromSelect.value;
            const to = toSelect.value;
            if (isNaN(amount)) {
                resultDiv.innerHTML = '❌ Введите корректную сумму';
                return;
            }
            const result = amount * rates[from][to];
            resultDiv.innerHTML = `${amount.toFixed(2)} ${from} = ${result.toFixed(2)} ${to}`;
        };

        convertBtn?.addEventListener('click', convertCurrency);
        convertCurrency();
    }

    /** Инициализация API-таблицы */
    async initCatBreedsTable() {
        const container = document.getElementById('cat-table-container');
        if (!container) return;

        const breeds = await loadCatBreeds();
        if (!breeds || breeds.length === 0) {
            document.getElementById('cat-table-body').innerHTML =
                '<tr><td colspan="4" style="text-align: center;">❌ Ошибка загрузки данных</td></tr>';
            return;
        }

        this.renderCatTable(breeds, breeds);

        // Поиск
        const searchInput = document.getElementById('cat-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const filtered = filterCatBreeds(breeds, e.target.value);
                this.renderCatTable(breeds, filtered);
            });
        }

        // Сортировка
        document.querySelectorAll('.cat-table th').forEach(th => {
            th.addEventListener('click', () => {
                const sortBy = th.dataset.sort;
                const searchTerm = document.getElementById('cat-search')?.value || '';
                const filtered = filterCatBreeds(breeds, searchTerm);
                const sorted = sortCatBreeds(filtered, sortBy);
                this.renderCatTable(breeds, sorted);
            });
        });
    }

    /** Отрисовка таблицы кошек */
    renderCatTable(allBreeds, filteredBreeds) {
        const tbody = document.getElementById('cat-table-body');
        if (!tbody) return;

        if (filteredBreeds.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">❌ Ничего не найдено</td></tr>';
            return;
        }

        tbody.innerHTML = filteredBreeds.map(breed => `
            <tr style="border-bottom: 1px solid var(--border);">
                <td style="padding: 10px;"><strong>${breed.name}</strong></td>
                <td style="padding: 10px;">${breed.origin || '—'}</td>
                <td style="padding: 10px;">${breed.temperament || '—'}</td>
                <td style="padding: 10px;">${breed.life_span || '—'} лет</td>
            </tr>
        `).join('');
    }
}