
export const projectsData = [
    {
        id: 1,
        title: 'Интерактивный список покупок',
        description: 'Удобный мобильный список покупок с современным дизайном',
        technologies: ['C#', 'XAML', '.NET'],
        demoLink: '#',
        githubLink: 'https://github.com/ZombieNek/ListFlow'
    },
    {
        id: 2,
        title: 'Веб-сайт для приложения',
        description: 'Сайт с описанием функций и ссылками на скачивание',
        technologies: ['JavaScript', 'CSS', 'HTML'],
        demoLink: 'https://корзина.space',
        githubLink: 'https://github.com/ZombieNek/ListFlowWebSit'
    },
    {
        id: 3,
        title: 'JedBerry',
        description: 'Сайт-портфолио с описанием навыков и формой обратной связи',
        technologies: ['JavaScript', 'CSS', 'HTML'],
        demoLink: 'https://jadberry.ru',
        githubLink: 'https://github.com/ZombieNek/JadBerry.-Web-Site'
    },
    {
        id: 4,
        title: 'RentSport',
        description: 'Приложение для аренды спорт инвентаря',
        technologies: ['JavaScript', 'API', 'CSS Grid', 'HTML'],
        demoLink: '#',
        githubLink: 'https://github.com/ZombieNek/RentSport'
    }
];

export function getProjects() {
    return projectsData;
}

/** Фильтрация проектов по названию */
export function filterProjects(tech) {
    if (tech === 'all') return projectsData;
    return projectsData.filter(project =>
        project.technologies.some(t => t.toLowerCase().includes(tech.toLowerCase()))
    );
}

export function getUniqueTechnologies() {
    const techs = new Set();
    projectsData.forEach(project => {
        project.technologies.forEach(tech => techs.add(tech));
    });
    return ['all', ...Array.from(techs)];
}