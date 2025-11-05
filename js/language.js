const config = {
    paths: {
        language: 'data/',
        cv: 'data/cv/'
    },
    languages: ['en', 'es', 'pt']
};

let currentLanguage = 'en';

function updateElement(id, property, value) {
    const element = document.getElementById(id);
    if (element) {
        element[property] = value;
    }
}

function updateCVPath(language) {
    const cvPath = `${config.paths.cv}${language}-cv.pdf`;
    const downloadButton = document.getElementById('download-cv');
    if (downloadButton) {
        downloadButton.setAttribute('href', cvPath);
    }
}

function updateSelectedLanguageUI(language) {
    document.querySelectorAll('.dropdown-menu li').forEach(item => {
        item.style.backgroundColor = '';
    });

    const selectedItem = document.querySelector(`.dropdown-item[onclick="changeLanguage('${language}')"]`);
    if (selectedItem) {
        selectedItem.closest('li').style.backgroundColor = 'var(--bg-light)';
    }
}

function updatePageContent(data) {
    // Navbar
    for (const key in data.navbar) {
        updateElement(`navbar-${key}`, 'textContent', data.navbar[key]);
    }

    // Banner
    for (const key in data.banner) {
        updateElement(`banner-${key}`, 'textContent', data.banner[key]);
    }

    // About
    updateElement('about-title', 'textContent', data.about.title);
    updateElement('about-text-p1', 'textContent', data.about['text-p1']);
    updateElement('about-text-p2', 'textContent', data.about['text-p2']);
    updateElement('about-text-p3', 'textContent', data.about['text-p3']);

    // Education
    updateElement('education-title', 'textContent', data.education.title);
    ['postgraduate', 'master', 'bachelor'].forEach((level, index) => {
        const education = data.education[level];
        const i = index + 1;
        updateElement(`education-university-${i}`, 'textContent', education.university);
        updateElement(`education-title-${i}`, 'textContent', education.title);
        updateElement(`education-period-${i}`, 'textContent', education.period);
        updateElement(`education-description-${i}`, 'innerHTML', education.description + (education.link || ''));
    });

    // Portfolio
    updateElement('portfolio-title', 'textContent', data.portfolio.title);
    updateElement('portfolio-subtitle', 'textContent', data.portfolio.subtitle);
    for (let i = 1; i <= 9; i++) {
        const project = data.portfolio[`project-${i}`];
        updateElement(`project-${i}-title`, 'textContent', project.title);
        updateElement(`project-${i}-text`, 'textContent', project.text);
        updateElement(`project-${i}-button`, 'textContent', project.button);
    }

    // Languages
    updateElement('languages-title', 'textContent', data.languages.title);
    updateElement('languages-subtitle', 'textContent', data.languages.subtitle);

    // Contact
    updateElement('contact-title', 'textContent', data.contact.title);
    updateElement('contact-subtitle', 'textContent', data.contact.subtitle);
    updateElement('contact-button', 'textContent', data.contact.button);

    // Footer
    updateElement('footer-text', 'textContent', data.footer.text);
}

function changeLanguage(language) {
    currentLanguage = language;
    const filePath = `${config.paths.language}${language}.json`;

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error loading the language file');
            }
            return response.json();
        })
        .then(data => {
            updatePageContent(data);
            updateCVPath(language);
            updateSelectedLanguageUI(language);
        })
        .catch(error => {
            console.error(error);
        });
}

function downloadCV() {
    const filePath = `${config.paths.cv}${currentLanguage}-cv.pdf`;
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.addEventListener("DOMContentLoaded", () => {
    const userLanguage = navigator.language || navigator.userLanguage;
    let initialLanguage = 'en';
    if (userLanguage.startsWith("es")) {
        initialLanguage = 'es';
    } else if (userLanguage.startsWith("pt")) {
        initialLanguage = 'pt';
    }
    changeLanguage(initialLanguage);

    const downloadButton = document.getElementById('download-cv');
    if(downloadButton) {
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
