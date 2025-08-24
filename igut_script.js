$(document).ready(function() {
    // Lista fixa de clínicas para a dashboard do IGUT
    const clinicList = [
      "acaopositiva", "acaopositivagama", "acbiblico", "acolhedor", "advance", "agape", 
      "aidaalvim", "aiza", "akhos", "allvida", "alpha", "amandaambrosio", "ame", "amego", 
      "amesaude", "andreabretz", "andros", "apercepcao", "aphrodite", "aptorax", "arche", 
      "ares", "asas", "attuare", "aura", "ayresmed", "barbaraneffa", "bariinject", 
      "bioaisthesis", "bioregenera", "blink", "bluetower", "bmh", "borduni", "brucesalles", 
      "bsbcirurgia", "bsbotorrino", "cadi", "cami", "capilmed", "cardiologia", "ccddf", 
      "ccw", "cdai", "cemefe", "centrodeaneurisma", "centrodigestivo", "clepp", "clifali", 
      "climed", "climepo", "clinen", "clinicadacrianca", "clinicadotorax", "clinicafluxus", 
      "clinicagrisolia", "clinicamedlago", "clinicapopular", "clinicarehgio", "clinicaseg", 
      "clinicasingular", "clinos", "cliu", "coisadepele", "conexaonucleo", "conferemed", 
      "corpore", "costasouza", "csma", "curare", "darealvim", "darlaneoliver", "demo", 
      "dermaavancada", "dermacapelli", "dermattoconceito", "dfneuro", "dordogama", 
      "dralexandre", "dramonica", "dranatalia", "drci", "drfabio", "drleonardo", 
      "drpaulo", "dualiter", "elevee", "eliformiga", "ellaclinique", "endoeforma", 
      "endolight", "endometriosebrasilia", "espacophysio", "essenciaplena", "estivalet", 
      "etca", "eterna", "evviva", "faesa", "fakhouri", "falareouvir", "fasciani", 
      "fauve", "fenestra", "ferrara", "fisioclin", "fisiocorpore", "fisioterape", 
      "florescer", "fluir", "fluxusjmv", "fonoclin", "gastrocentro", "gastrolem", 
      "gastrosul", "gc", "gedab", "ginemasto", "grupoelas", "grutorax", "guerir", 
      "gustavogouveia", "gustavosela", "hairdoc", "hairsp", "hairuberaba", "hairuberlandia", 
      "hineni", "homecor", "hospitalsertao", "humanita", "ibes", "ibrafisio", "icbari", 
      "ilitia", "imovbsb", "info", "inovapsi", "inspcor", "inspirarotorrino", "inspire", 
      "inspireal", "institutocorha", "institutodofigado", "institutoreluz", "institutosanches", 
      "intertorax", "interv", "intf", "inthorax", "intorax", "invideo", "jaevelly", "jdrb", 
      "jf", "leblanc", "lessence", "leticiaoba", "leticiapaulino", "lifevision", "liliane", 
      "links", "live", "llp", "lovit", "lovitls", "majestic", "mamaecegonha", "mastershape", 
      "maternoinfantil", "medar", "medco", "medigastro", "medinutri", "medlago", "melaredo", 
      "meraki", "miletto", "montblanc", "multicei", "neootorrino", "neurodor", "neuromed", 
      "neurosinapse", "nfegc", "norteortopedia", "nubiagoulart", "nubiasantana", 
      "oftalmocenter", "ortonibra", "ortonibralimao", "otocap", "otocare", "otocatedral", 
      "otoclinica", "otoclinicabrasilia", "otomedbh", "otoplus", "otorrinobrasilia", 
      "otorrinodf", "otorrinoms", "otorrinopatos", "otorrinopatosimac", "ouvir", "oxyclin", 
      "pacientes", "painel", "pantheon", "pectus", "pellevitta", "perfectclinic", 
      "perinato", "philos", "plenitude", "pleniture", "plexus", "pneumologia", "policlinica", 
      "primafattura", "primapelle", "proctoclinica", "producao", "psimelissa", "pulsional", 
      "reability", "rebilitare", "rededay", "reggia", "renassance", "renovare", 
      "resiliencia", "respiraral", "respirardf", "revigore", "revita", "rfpediatria", 
      "ruah", "sanar", "sanity", "santabarbara", "saocamilo", "sartore", "selectasaude", 
      "selectavie", "sense", "serhumano", "slim", "solarea", "soniaferri", "soul", 
      "steniomeirelles", "studioschwerz", "sublime", "thaisteles", "thorax", "tivolly", 
      "toracicaalagoas", "toraxlinea", "travessia", "triangeli", "unicakids", 
      "unidadedosonobsb", "uniprocto", "uniq", "urocentro", "urogama", "urogin", 
      "urology", "uros", "vathos", "ventteclinic", "veridium", "viavitae", "virtus", 
      "voxvita", "walfisio", "wandahorta", "woori"
    ];
    
    // Inicializa o Select2
    $('#clinicSelect').select2({
        placeholder: '-- Escolha uma clínica --',
        allowClear: true
    });
    
    // Função para popular o campo select com os nomes das clínicas
    const populateSelect = (data) => {
        const select = $('#clinicSelect');
        select.empty().append('<option></option>');
        
        data.forEach(item => {
            select.append(new Option(item, item));
        });
    };
    
    // Evento de clique no botão de buscar
    $('#buscarBtn').on('click', function() {
        const selectedClinic = $('#clinicSelect').val();
        if (!selectedClinic) {
            alert('Por favor, selecione uma clínica.');
            return;
        }

        // Mostra a área de loading
        $('#loading').removeClass('hidden');
        $('#dashboard').addClass('hidden');

        // URL para a busca de dados dinâmicos
        const dataUrl = `https://${selectedClinic}.igutclinicas.com.br/aplicativos/info`;

        // Faz a requisição AJAX para buscar os dados
        $.getJSON(dataUrl)
            .done(function(clinicData) {
                // Simula um atraso para dar tempo de ver a animação de loading
                setTimeout(() => {
                    if (clinicData && Object.keys(clinicData).length > 0) {
                        displayDashboard(clinicData);
                    } else {
                        alert('Dados não encontrados para a clínica selecionada.');
                        hideDashboard();
                    }
                }, 1000); // 1 segundo de atraso
            })
            .fail(function() {
                alert('Erro ao buscar os dados da clínica. Verifique a conexão ou se a URL está correta.');
                hideDashboard();
            });
    });

    // Função para exibir o dashboard com os dados da clínica
    const displayDashboard = (data) => {
        // Preenche as seções com os dados do objeto correspondente
        $('#licencas .card-content').html(formatLicencas(data.licencas));
        $('#servidor .card-content').html(formatServidor(data.servidor));
        $('#clinico .card-content').html(formatClinico(data.clinico));
        $('#notas .card-content').html(formatNotas(data.notas));
        
        // Exibe o valor total
        if (data.licencas && data.licencas.valor_total) {
            $('#valorLicenca').text(`R$ ${data.licencas.valor_total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
            $('#valorTotal').removeClass('hidden');
        } else {
            $('#valorTotal').addClass('hidden');
        }

        // Mostra o dashboard e esconde o loading
        $('#loading').addClass('hidden');
        $('#dashboard').removeClass('hidden');
        showSection('licencas-section');
    };

    // Funções de formatação para cada seção
    const formatLicencas = (data) => {
        if (!data) return 'Dados de licenças não disponíveis.';
        let html = '<h4>Licenças Ativas</h4>';
        html += `<table class="data-table"><thead><tr><th>Licença</th><th>Ativadas</th></tr></thead><tbody>`;
        html += `<tr><td>CRM</td><td>${data.crm}</td></tr>`;
        html += `<tr><td>Outras Licenças</td><td>${data.outras}</td></tr>`;
        html += `</tbody></table>`;
        html += `<div class="whatsapp-buttons">
                    <a id="whatsappCrmBtn" class="whatsapp-btn" href="https://wa.me/NUMERO_WHATSAPP?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20uma%20licen%C3%A7a%20de%20CRM%20para%20a%20cl%C3%ADnica%20${$('#clinicSelect').val()}." target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-whatsapp"></i> Solicitar Licença CRM
                    </a>
                    <a id="whatsappOutrasBtn" class="whatsapp-btn" href="https://wa.me/NUMERO_WHATSAPP?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20licen%C3%A7as%20adicionais%20para%20a%20cl%C3%ADnica%20${$('#clinicSelect').val()}." target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-whatsapp"></i> Solicitar Outras Licenças
                    </a>
                </div>`;
        return html;
    };

    const formatServidor = (data) => {
        if (!data) return 'Dados do servidor não disponíveis.';
        let html = `<div><strong>Status do Servidor:</strong> <strong style="color: ${data.status === 'Online' ? 'green' : 'red'};">${data.status}</strong></div>`;
        html += `<div><strong>Última Atualização:</strong> ${data.ultima_atualizacao}</div>`;
        html += `<div><strong>IP:</strong> ${data.ip}</div>`;
        return html;
    };

    const formatClinico = (data) => {
        if (!data) return 'Dados clínicos não disponíveis.';
        let html = `<div><strong>Total de Pacientes:</strong> ${data.pacientes}</div>`;
        html += `<div><strong>Qtd. Agendamentos (Hoje):</strong> ${data.agendamentos_hoje}</div>`;
        html += `<div><strong>Qtd. Atendimentos (Hoje):</strong> ${data.atendimentos_hoje}</div>`;
        return html;
    };

    const formatNotas = (data) => {
        if (!data) return 'Dados de notas não disponíveis.';
        let html = `<div><strong>Notas Emitidas (Último Mês):</strong> ${data.ultimo_mes}</div>`;
        html += `<div><strong>Notas Canceladas (Último Mês):</strong> ${data.canceladas_ultimo_mes}</div>`;
        html += `<div><strong>Média de Notas/Dia:</strong> ${data.media_dia}</div>`;
        return html;
    };

    const showSection = (sectionId) => {
        const sections = document.querySelectorAll('.dashboard-section');
        sections.forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(sectionId).classList.remove('hidden');
    };

    const hideDashboard = () => {
        $('#loading').addClass('hidden');
        $('#dashboard').addClass('hidden');
        $('#valorTotal').addClass('hidden');
    };

    // Gerencia os cliques no menu de navegação
    $('.dashboard-nav .nav-item').on('click', function(e) {
        e.preventDefault();
        $('.dashboard-nav .nav-item').removeClass('active');
        $(this).addClass('active');
        const sectionId = $(this).attr('href').substring(1) + '-section';
        showSection(sectionId);
    });

    // Inicia a busca dos dados ao carregar a página
    populateSelect(clinicList);
});