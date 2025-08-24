$(document).ready(function() {
    // Lista fixa de clínicas para a dashboard do EBA
    const clinicList = [
      "acolhedor", "anesprime", "anestesia", "anestesil", "anesthesio", "anextesia", "aqui", 
      "astesis", "bi", "bmw", "brunopaiva", "cacib", "care", "cliag", "clian", "clianest", 
      "clin", "coc", "coopanestce", "danielaagra", "dasa", "demo", "desenvolvimento", 
      "devices", "epm", "flug", "gaap", "gat", "guci", "hac", "hub", "kora", "koraanchieta", 
      "koracariacica", "korapalmas", "lessence", "modelo", "naianamelo", "novoebatest", 
      "oftalmonest", "painel", "patrof", "pedrotestee", "pfc", "producao", "prosafe", 
      "research", "riscos", "sab", "sael", "sagg", "saitg", "sanesth", "secan", "sedaa", 
      "sedazione", "sisb", "teste", "tk", "unianest", "vital", "wmc"
    ];

    // Simula uma base de dados local para preencher o dashboard
    // Você pode expandir ou alterar esses dados para cada clínica
    const localDashboardData = {
        "acolhedor": {
            "clinica": "acolhedor",
            "tipoContrato": "Anual",
            "validadeContrato": "2026-12-31",
            "numLicencas": "25",
            "licencasAtivas": "22",
            "valorTotal": "12500,00",
            "ip": "10.0.0.1",
            "hostname": "srv-acolhedor",
            "versaoBanco": "PostgreSQL 12.5",
            "ultimoBackup": "2025-08-22",
            "ultimaSincronizacao": "2025-08-23",
            "ultimaNota": "2025-08-20"
        },
        "anesprime": {
            "clinica": "anesprime",
            "tipoContrato": "Mensal",
            "validadeContrato": "2025-09-30",
            "numLicencas": "15",
            "licencasAtivas": "15",
            "valorTotal": "7500,00",
            "ip": "10.0.0.2",
            "hostname": "srv-anesprime",
            "versaoBanco": "MySQL 8.0",
            "ultimoBackup": "2025-08-21",
            "ultimaSincronizacao": "2025-08-23",
            "ultimaNota": "2025-08-23"
        }
        // Adicione mais clínicas aqui com seus dados correspondentes
    };

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

        const clinicData = localDashboardData[selectedClinic];
        
        if (clinicData) {
            displayDashboard(clinicData);
        } else {
            alert('Dados não encontrados para a clínica selecionada. Por favor, adicione os dados no arquivo eba_script.js.');
            hideDashboard();
        }
    });

    // Função para exibir o dashboard com os dados da clínica
    const displayDashboard = (data) => {
        // Mostra a área de loading
        $('#loading').removeClass('hidden');
        $('#dashboard').addClass('hidden');

        // Simula um atraso para dar tempo de ver a animação de loading
        setTimeout(() => {
            // Preencha as seções com os dados da linha correspondente
            $('#licencas .card-content').html(formatData(data, 'licencas'));
            $('#database').html(formatData(data, 'servidor'));
            $('#clinico').html(formatData(data, 'clinico'));
            $('#notas').html(formatData(data, 'notas'));

            // Mostra o dashboard e esconde o loading
            $('#loading').addClass('hidden');
            $('#dashboard').removeClass('hidden');

            // Exibe a seção total-valor
            if (data.valorTotal) {
                $('#valorLicenca').text(`R$ ${data.valorTotal}`);
                $('#valorTotal').removeClass('hidden');
            } else {
                $('#valorTotal').addClass('hidden');
            }
        }, 1000); // 1 segundo de atraso
    };

    // Função para formatar os dados de cada seção
    const formatData = (data, section) => {
        let content = '';
        if (section === 'licencas') {
            content += '<h4>Licenças</h4>';
            content += `<p><strong>Tipo de Contrato:</strong> ${data.tipoContrato}</p>`;
            content += `<p><strong>Validade do Contrato:</strong> ${data.validadeContrato}</p>`;
            content += `<p><strong>Número de Licenças:</strong> ${data.numLicencas}</p>`;
            content += `<p><strong>Licenças Ativas:</strong> ${data.licencasAtivas}</p>`;
        } else if (section === 'servidor') {
            content += '<h4>Servidor</h4>';
            content += `<p><strong>IP:</strong> ${data.ip}</p>`;
            content += `<p><strong>Hostname:</strong> ${data.hostname}</p>`;
            content += `<p><strong>Versão do Banco de Dados:</strong> ${data.versaoBanco}</p>`;
        } else if (section === 'clinico') {
            content += '<h4>Dados Clínicos</h4>';
            content += `<p><strong>Último Backup:</strong> ${data.ultimoBackup}</p>`;
            content += `<p><strong>Data da Última Sincronização:</strong> ${data.ultimaSincronizacao}</p>`;
        } else if (section === 'notas') {
            content += '<h4>Notas Emitidas</h4>';
            content += `<p><strong>Última Nota Fiscal:</strong> ${data.ultimaNota}</p>`;
        }
        return content;
    };
    
    const hideDashboard = () => {
        $('#loading').addClass('hidden');
        $('#dashboard').addClass('hidden');
        $('#valorTotal').addClass('hidden');
    };

    // Inicia a busca dos dados ao carregar a página
    populateSelect(clinicList);
});