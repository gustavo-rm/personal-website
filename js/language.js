document.addEventListener("DOMContentLoaded", function() {
    // Função para carregar e aplicar o conteúdo do JSON baseado no idioma selecionado
    function changeLanguage(language) {
        // Caminho para o arquivo JSON com base no idioma selecionado
        const filePath = `data/${language}.json`;

        // Usando fetch para carregar o arquivo JSON
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error loading the language file');
                }
                return response.json();
            })
            .then(data => {
                // Atualizar o conteúdo da navbar
                document.getElementById('navbar-language').textContent = data.navbar.language;

                // Atualizar o conteúdo da seção banner
                document.getElementById('banner-greeting').textContent = data.banner.greeting;
                document.getElementById('banner-introduction').textContent = data.banner.introduction;
                document.getElementById('banner-profession').textContent = data.banner.profession;

                // Atualizar o conteúdo da seção about
                document.getElementById('about-title').textContent = data.about.title;
                document.getElementById('about-text-p1').textContent = data.about['text-p1'];
                document.getElementById('about-text-p2').textContent = data.about['text-p2'];
                document.getElementById('about-text-p3').textContent = data.about['text-p3'];

                //Atualizar o conteúdo da seção education
                document.getElementById('education-title').textContent = data.education.title;
                document.getElementById('education-university-1').textContent = data.education['postgraduate'].university;
                document.getElementById('education-title-1').textContent = data.education['postgraduate'].title;
                document.getElementById('education-period-1').textContent = data.education['postgraduate'].period;
                document.getElementById('education-description-1').innerHTML = data.education['postgraduate'].description;

                document.getElementById('education-university-2').textContent = data.education['master'].university;
                document.getElementById('education-title-2').textContent = data.education['master'].title;
                document.getElementById('education-period-2').textContent = data.education['master'].period;
                document.getElementById('education-description-2').textContent = data.education['master'].description;
                document.getElementById('education-description-2').innerHTML += data.education['master'].link;

                document.getElementById('education-university-3').textContent = data.education['bachelor'].university;
                document.getElementById('education-title-3').textContent = data.education['bachelor'].title;
                document.getElementById('education-period-3').textContent = data.education['bachelor'].period;
                document.getElementById('education-description-3').textContent = data.education['bachelor'].description;
                document.getElementById('education-description-3').innerHTML += data.education['bachelor'].link;

                // Atualizar o conteúdo da seção portfolio
                /*document.getElementById('project-1-title').textContent = data.portfolio['project-1'].title;
                document.getElementById('project-1-text').textContent = data.portfolio['project-1'].text;
                document.getElementById('project-1-button').textContent = data.portfolio['project-1'].button;

                document.getElementById('project-2-title').textContent = data.portfolio['project-2'].title;
                document.getElementById('project-2-text').textContent = data.portfolio['project-2'].text;
                document.getElementById('project-2-button').textContent = data.portfolio['project-2'].button;

                document.getElementById('project-3-title').textContent = data.portfolio['project-3'].title;
                document.getElementById('project-3-text').textContent = data.portfolio['project-3'].text;
                document.getElementById('project-3-button').textContent = data.portfolio['project-3'].button;

                document.getElementById('project-4-title').textContent = data.portfolio['project-4'].title;
                document.getElementById('project-4-text').textContent = data.portfolio['project-4'].text;
                document.getElementById('project-4-button').textContent = data.portfolio['project-4'].button;*/

                // Atualizar o conteúdo da seção languages
                document.getElementById('languages-title').textContent = data.languages.title;
                document.getElementById('languages-subtitle').textContent = data.languages.subtitle;

                // Atualizar o conteúdo da seção contact
                document.getElementById('contact-title').textContent = data.contact.title;
                document.getElementById('contact-subtitle').textContent = data.contact.subtitle;
                document.getElementById('contact-button').textContent = data.contact.button;

                // Atualizar o conteúdo do footer
                document.getElementById('footer-text').textContent = data.footer.text;
            })
            .catch(error => {
                console.error(error);
            });
    }

    // Carregar a página inicialmente em português
    changeLanguage('pt');

    // Manipuladores de eventos para o menu de idiomas
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); // Impede o comportamento padrão do link
            const language = this.getAttribute('onclick').match(/'(\w+)'/)[1];
            changeLanguage(language);
        });
    });
});
