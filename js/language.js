$(document).ready(function() {
    // Função para carregar e aplicar o conteúdo do JSON baseado no idioma selecionado
    function changeLanguage(language) {
        // Caminho para o arquivo JSON com base no idioma selecionado
        const filePath = `data/${language}.json`;

        // Usando jQuery para carregar o arquivo JSON
        $.getJSON(filePath, function(data) {
            // Atualizar o conteúdo da seção banner
            $('#banner-greeting').text(data.banner.greeting);
            $('#banner-introduction').text(data.banner.introduction);
            $('#banner-profession').text(data.banner.profession);

            // Atualizar o conteúdo da seção about
            $('#about-title').text(data.about.title);
            $('#about-text-p1').text(data.about['text-p1']);
            $('#about-text-p2').text(data.about['text-p2']);
            $('#about-text-p3').text(data.about['text-p3']);

            // Atualizar o conteúdo da seção portfolio
            $('#project-1-title').text(data.portfolio['project-1'].title);
            $('#project-1-text').text(data.portfolio['project-1'].text);
            $('#project-1-button').text(data.portfolio['project-1'].button);

            $('#project-2-title').text(data.portfolio['project-2'].title);
            $('#project-2-text').text(data.portfolio['project-2'].text);
            $('#project-2-button').text(data.portfolio['project-2'].button);

            $('#project-3-title').text(data.portfolio['project-3'].title);
            $('#project-3-text').text(data.portfolio['project-3'].text);
            $('#project-3-button').text(data.portfolio['project-3'].button);

            $('#project-4-title').text(data.portfolio['project-4'].title);
            $('#project-4-text').text(data.portfolio['project-4'].text);
            $('#project-4-button').text(data.portfolio['project-4'].button);

            // Atualizar o conteúdo da seção languages
            $('#languages-title').text(data.languages.title);
            $('#languages-subtitle').text(data.languages.subtitle);

            // Atualizar o conteúdo da seção contact
            $('#contact-title').text(data.contact.title);
            $('#contact-subtitle').text(data.contact.subtitle);
            $('#contact-button').text(data.contact.button);

            // Atualizar o conteúdo do footer
            $('#footer-text').text(data.footer.text);
        }).fail(function() {
            console.error('Error loading the language file');
        });
    }

    // Carregar a página inicialmente em português
    changeLanguage('pt');

    // Manipuladores de eventos para o menu de idiomas
    $('.dropdown-item').click(function(e) {
        e.preventDefault(); // Impede o comportamento padrão do link
        const language = $(this).attr('onclick').match(/'(\w+)'/)[1];
        changeLanguage(language);
    });
});
