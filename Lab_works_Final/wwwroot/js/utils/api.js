
const API_URL = 'https://api.thecatapi.com/v1/breeds';

/** Загрузка первых 20 пород */
export async function loadCatBreeds() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Ошибка загрузки');
        const data = await response.json();
        return data.slice(0, 20);
    } catch (error) {
        console.error('API Error:', error);
        return [];
    }
}

/** Фильтрация по названию или стране */
export function filterCatBreeds(breeds, searchTerm) {
    if (!searchTerm) return breeds;
    const term = searchTerm.toLowerCase();
    return breeds.filter(breed =>
        breed.name.toLowerCase().includes(term) ||
        (breed.origin && breed.origin.toLowerCase().includes(term))
    );
}

/** Сортировка по указанному полю */
export function sortCatBreeds(breeds, sortBy, order = 'asc') {
    const sorted = [...breeds];
    sorted.sort((a, b) => {
        let aVal = a[sortBy] || '';
        let bVal = b[sortBy] || '';
        if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
        }
        if (aVal < bVal) return order === 'asc' ? -1 : 1;
        if (aVal > bVal) return order === 'asc' ? 1 : -1;
        return 0;
    });
    return sorted;
}