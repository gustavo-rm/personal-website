const config = {
    paths: {
        language: 'data/',
        cv: 'data/cv/'
    },
    languages: ['en', 'es', 'pt']
};

let currentLanguage = 'en';

// --- Função utilitária para obter valores multilíngues com fallback ---
function getLocalizedValue(allData, lang, keyPath, fallbackLangs = config.languages) {
    const keys = keyPath.split('.');

    const getValue = (obj, keys) => keys.reduce((acc, k) => acc && acc[k], obj);

    let value = getValue(allData[lang], keys);
    if (value !== undefined && value !== null) return value;

    for (const fbLang of fallbackLangs) {
        if (fbLang === lang) continue;
        value = getValue(allData[fbLang], keys);
        if (value !== undefined && value !== null) return value;
    }

    return null;
}

// --- Atualiza elementos da página ---
function updateElement(id, property, value) {
    const element = document.getElementById(id);
    if (!element || value === null || value === undefined) return;

    if (property.startsWith('data-')) {
        element.setAttribute(property, value);
    } else if (property === 'class' || property === 'className') {
        element.className = value;
    } else {
        element[property] = value;
    }
}

// --- Atualiza link do CV ---
function updateCVPath(language) {
    const cvPath = `${config.paths.cv}${language}-cv.pdf`;
    const downloadButton = document.getElementById('download-cv');
    if (downloadButton) downloadButton.setAttribute('href', cvPath);
}

// --- Destaca idioma selecionado ---
function updateSelectedLanguageUI(language) {
    document.querySelectorAll('.dropdown-menu li').forEach(item => {
        item.style.backgroundColor = '';
    });

    const selectedItem = document.querySelector(`.dropdown-item[onclick="changeLanguage('${language}')"]`);
    if (selectedItem) {
        selectedItem.closest('li').style.backgroundColor = 'var(--bg-light)';
    }
}

// --- Atualiza conteúdo completo da página ---
function updatePageContent(allData, lang) {
    const data = allData[lang] || {};

    // Navbar
    for (const key in data.navbar || {}) {
        updateElement(`navbar-${key}`, 'textContent', getLocalizedValue(allData, lang, `navbar.${key}`));
    }

    // Banner
    for (const key in data.banner || {}) {
        updateElement(`banner-${key}`, 'textContent', getLocalizedValue(allData, lang, `banner.${key}`));
    }

    // About
    ['title', 'text-p1', 'text-p2', 'text-p3'].forEach(key => {
        updateElement(`about-${key}`, 'textContent', getLocalizedValue(allData, lang, `about.${key}`));
    });

    // Education
    updateElement('education-title', 'textContent', getLocalizedValue(allData, lang, 'education.title'));
    ['postgraduate', 'master', 'bachelor'].forEach((level, index) => {
        const i = index + 1;
        ['university', 'title', 'period', 'description', 'link'].forEach(field => {
            const value = getLocalizedValue(allData, lang, `education.${level}.${field}`);
            updateElement(`education-${field}-${i}`, field === 'description' ? 'innerHTML' : 'textContent', value);
        });
    });

    // Portfolio
    updateElement('portfolio-title', 'textContent', getLocalizedValue(allData, lang, 'portfolio.title'));
    updateElement('portfolio-subtitle', 'textContent', getLocalizedValue(allData, lang, 'portfolio.subtitle'));
    for (let i = 1; i <= 9; i++) {
        const base = `portfolio.project-${i}`;
        updateElement(`project-${i}-icon`, 'class', getLocalizedValue(allData, lang, `${base}.icon`));
        updateElement(`project-${i}-title`, 'textContent', getLocalizedValue(allData, lang, `${base}.title`));
        updateElement(`project-${i}-text`, 'textContent', getLocalizedValue(allData, lang, `${base}.text`));
        updateElement(`project-${i}-button`, 'textContent', getLocalizedValue(allData, lang, `${base}.button`));
        updateElement(`project-${i}-button`, 'data-image', getLocalizedValue(allData, lang, `${base}.image`));
    }

    // Languages
    updateElement('languages-title', 'textContent', getLocalizedValue(allData, lang, 'languages.title'));
    updateElement('languages-subtitle', 'textContent', getLocalizedValue(allData, lang, 'languages.subtitle'));

    // Contact
    ['title', 'subtitle', 'button'].forEach(key => {
        updateElement(`contact-${key}`, 'textContent', getLocalizedValue(allData, lang, `contact.${key}`));
    });

    // Footer
    updateElement('footer-text', 'textContent', getLocalizedValue(allData, lang, 'footer.text'));
}

// --- Troca de idioma ---
function changeLanguage(language) {
    currentLanguage = language;

    // Carrega todos os JSONs de idiomas de uma só vez
    Promise.all(config.languages.map(lang =>
        fetch(`${config.paths.language}${lang}.json`).then(res => res.json())
    ))
        .then(responses => {
            const allData = Object.fromEntries(config.languages.map((lang, i) => [lang, responses[i]]));
            updatePageContent(allData, language);
            updateCVPath(language);
            updateSelectedLanguageUI(language);
        })
        .catch(error => console.error(error));
}

// --- Download de CV ---
function downloadCV() {
    const filePath = `${config.paths.cv}${currentLanguage}-cv.pdf`;
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// --- Inicialização ---
document.addEventListener("DOMContentLoaded", () => {
    const userLanguage = navigator.language || navigator.userLanguage;
    let initialLanguage = 'en';
    if (userLanguage.startsWith("es")) initialLanguage = 'es';
    else if (userLanguage.startsWith("pt")) initialLanguage = 'pt';

    changeLanguage(initialLanguage);

    const downloadButton = document.getElementById('download-cv');
    if (downloadButton) {
        downloadButton.addEventListener('click', (event) => {
            event.preventDefault();
            downloadCV();
        });
    }

    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const language = this.getAttribute('onclick').match(/'(\w+)'/)[1];
            changeLanguage(language);
        });
    });
});
