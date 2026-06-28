
/** Валидация ФИО */
export function validateFullName(name) {
    const nameRegex = /^[А-Яа-яЁёA-Za-z\s-]+$/;
    if (!name?.trim()) {
        return { valid: false, message: 'ФИО обязательно для заполнения' };
    }
    if (!nameRegex.test(name)) {
        return { valid: false, message: 'Можно использовать только буквы' };
    }
    const parts = name.trim().split(/\s+/);
    if (parts.length < 2) {
        return { valid: false, message: 'Введите имя и фамилию' };
    }
    return { valid: true, message: '' };
}

/** Валидация телефона */
export function validatePhone(phone) {
    const digits = phone.replace(/\D/g, '');
    if (!digits) {
        return { valid: false, message: 'Телефон обязателен' };
    }
    if (digits.length !== 11) {
        return { valid: false, message: 'Номер должен содержать 11 цифр' };
    }
    if (!digits.startsWith('7') && !digits.startsWith('8')) {
        return { valid: false, message: 'Номер должен начинаться с 7 или 8' };
    }
    return { valid: true, message: '' };
}

/** Валидация email */
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!email?.trim()) {
        return { valid: false, message: 'Email обязателен' };
    }
    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Введите корректный email' };
    }
    return { valid: true, message: '' };
}

/** Валидация даты */
export function validateDate(dateStr) {
    if (!dateStr) {
        return { valid: false, message: 'Дата обязательна' };
    }
    const selected = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
        return { valid: false, message: 'Дата не может быть раньше сегодня' };
    }
    return { valid: true, message: '' };
}

/** Разбор ФИО на фамилию, имя, отчество */
export function parseFullName(fullName) {
    const parts = fullName.trim().split(/\s+/);
    return {
        lastName: parts[0] || '',
        firstName: parts[1] || '',
        middleName: parts[2] || ''
    };
}