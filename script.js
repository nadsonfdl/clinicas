document.addEventListener('DOMContentLoaded', () => {
    const clinicSelect = $('#clinicSelect'); // Usando jQuery para Select2
    const buscarBtn = document.getElementById('buscarBtn');
    const dashboard = document.getElementById('dashboard');
    const loadingDiv = document.getElementById('loading');
    const valorTotalDiv = document.getElementById('valorTotal');
    const valorLicencaSpan = document.getElementById('valorLicenca');

    // Lista completa de clínicas (mantida como antes)
    const clinics = [
        "acaopositiva", "acaopositivagama", "acbiblico", "acolhedor", "advance", "agape",
        "aidaalvim", "aiza", "akhos", "allvida", "alpha", "amandaambrosio", "ame", "amego",
        "amesaude", "andros", "apercepcao", "aphrodite", "aptorax", "arche", "ares",
        "asas", "attuare", "aura", "ayresmed", "barbaraneffa", "bariinject", "bioaisthesis",
        "bioregenera", "blink", "bluetower", "bmh", "borduni", "brucesalles", "bsbcirurgia",
        "bsbotorrino", "cadi", "cami", "capilmed", "cardiologia", "ccddf", "ccw", "cdai",
        "cemefe", "centrodeaneurisma", "centrodigestivo", "clepp", "clifali", "climed",
        "climepo", "clinen", "clinicadacrianca", "clinicadotorax", "clinicafluxus",
        "clinicagrisolia", "clinicamedlago", "clinicapopular", "clinicarehgio", "clinicaseg",
        "clinicasingular", "clinos", "cliu", "coisadepele", "conexaonucleo", "conferemed",
        "corpore", "costasouza", "csma", "curare", "darealvim", "darlaneoliver", "demo",
        "dermaavancada", "dermacapelli", "dermattoconceito", "dfneuro", "dordogama",
        "dralexandre", "dramonica", "dranatalia", "drci", "drfabio", "drleonardo", "drpaulo",
        "elevee", "eliformiga", "ellaclinique", "endoeforma", "endolight",
        "endometriosebrasilia", "espacophysio", "essenciaplena", "estivalet", "etca",
        "eterna", "faesa", "fakhouri", "falareouvir", "fasciani", "fauve", "fenestra",
        "ferrara", "fisioclin", "fisiocorpore", "fisioterape", "florescer", "fluir",
        "fluxusjmv", "fonoclin", "gastrocentro", "gastrosul", "gc", "gedab", "ginemasto",
        "grupoelas", "grutorax", "guerir", "gustavogouveia", "gustavosela", "hairdoc",
        "hairsp", "hairuberaba", "hairuberlandia", "hineni", "homecor", "humanita", "ibes",
        "ibrafisio", "icbari", "ilitia", "imovbsb", "info", "inspcor", "inspirarotorrino",
        "inspire", "inspireal", "institutocorha", "institutodofigado", "institutoreluz",
        "institutosanches", "intertorax", "interv", "intf", "inthorax", "intorax",
        "invideo", "jaevelly", "jdrb", "jf", "leblanc", "lessence", "leticiaoba",
        "leticiapaulino", "lifevision", "liliane", "links", "live", "llp", "lovit", "lovitls",
        "majestic", "mamaecegonha", "mastershape", "medar", "medco", "medigastro",
        "medinutri", "medlago", "melaredo", "meraki", "miletto", "montblanc", "multicei",
        "neootorrino", "neurodor", "neuromed", "neurosinapse", "nfegc", "norteortopedia",
        "nubiagoulart", "nubiasantana", "otocap", "otocare", "otocatedral", "otoclinica",
        "otoclinicabrasilia", "otomedbh", "otoplus", "otorrinobrasilia", "otorrinodf",
        "otorrinoms", "otorrinopatos", "otorrinopatosimac", "ouvir", "oxyclin", "pacientes",
        "painel", "pantheon", "pectus", "pellevitta", "perfectclinic", "perinato", "philos",
        "plenitude", "pleniture", "plexus", "pneumologia", "policlinica", "primafattura",
        "primapelle", "proctoclinica", "producao", "psimelissa", "pulsional", "reability",
        "rededay", "reggia", "renassance", "renovare", "resiliencia", "respiraral",
        "respirardf", "revigore", "revita", "rfpediatria", "ruah", "sanar", "sanity",
        "santabarbara", "saocamilo", "sartore", "selectasaude", "selectavie", "sense",
        "serhumano", "slim", "solarea", "soniaferri", "soul", "steniomeirelles",
        "studioschwerz", "sublime", "thaisteles", "thorax", "tivolly", "toracicaalagoas",
        "toraxlinea", "travessia", "triangeli", "unicakids", "unidadedosonobsb", "uniprocto",
        "uniq", "urocentro", "urogama", "urogin", "urology", "uros", "vathos",
        "ventteclinic", "veridium", "viavitae", "voxvita", "walfisio", "wandahorta", "woori"
    ];

    // Popula o select com as clínicas
    clinics.forEach(clinic => {
        const option = new Option(clinic, clinic);
        clinicSelect.append(option);
    });

    // Inicializa Select2 no elemento select
    clinicSelect.select2({
        placeholder: "-- Escolha uma clínica --",
        allowClear: true // Permite limpar a seleção
    });

    // Função para buscar e exibir os dados
    async function fetchData() {
        const clinic = clinicSelect.val(); // Usa .val() do jQuery para Select2
        
        if (!clinic) {
            alert('Por favor, selecione uma clínica.');
            return;
        }

        // Esconde o dashboard e o valor total, mostra o loading
        dashboard.classList.add('hidden');
        valorTotalDiv.classList.add('hidden');
        loadingDiv.classList.remove('hidden');

        // Limpa os campos antes de carregar novos dados
        document.getElementById('licencas').innerHTML = '';
        document.getElementById('database').innerHTML = '';
        document.getElementById('clinico').innerHTML = '';
        document.getElementById('notas').innerHTML = '';
        valorLicencaSpan.textContent = '';

        try {
            const response = await fetch(`https://${clinic}.igutclinicas.com.br/aplicativos/info`);
            if (!response.ok) {
                // Se a resposta não for OK, mas o erro for de CORS, o status será 0 ou a requisição falhará antes.
                // Aqui estamos tratando erros HTTP como 404, 500, etc.
                throw new Error(`Erro HTTP! Status: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();

            // --- Formatação dos Dados para Visualização ---

            // LICENÇAS ATIVAS (Card Licenças Ativas)
            let licencasHtml = '<h4>Quantidade de Licenças Ativas:</h4>';
            let valorTotalLicencasAtivas = 0;

            if (data.licencas) {
                for (const key in data.licencas) {
                    // Converte a quantidade para número, usando 0 se não for um número válido
                    const quantidade = parseInt(data.licencas[key]) || 0; 
                    licencasHtml += `<div><strong>${key}:</strong> ${quantidade}</div>`;

                    // Cálculo do valor monetário das licenças ativas
                    if (key === 'CRM') {
                        valorTotalLicencasAtivas += quantidade * 100; // R$100,00 por CRM
                    } else if (quantidade > 0) { // Demais tipos com R$50,00, se a quantidade for maior que zero
                        valorTotalLicencasAtivas += quantidade * 50;
                    }
                }
            } else {
                licencasHtml += '<div>Nenhuma informação de licença ativa disponível.</div>';
            }
            document.getElementById('licencas').innerHTML = licencasHtml;

            // DADOS DO SERVIDOR E CONTRATO (Card Servidor e Contrato)
            let databaseHtml = `
                <h4>Informações do Sistema:</h4>
                <div><strong>Clínica:</strong> ${data.clinica || 'N/A'}</div>
                <div><strong>Versão do Sistema:</strong> ${data.versao || 'N/A'}</div>
                <div><strong>IP do Servidor:</strong> ${data.ip || 'N/A'}</div>
                <div><strong>Hostname:</strong> ${data.hostname || 'N/A'}</div>
                <br>
                <h4>Dados do Contrato:</h4>
                <div><strong>Qtd. CRM Contratada:</strong> ${data.contrato.qtd_licenca || 'N/A'}</div>
                <div><strong>Qtd. Outras Especialidades Contratadas:</strong> ${data.contrato.qtd_licenca2 || 'N/A'}</div>
                <div><strong>Qtd. Senhas Contratadas:</strong> ${data.contrato.qtd_senha || 'N/A'}</div>
                <div><strong>Qtd. NFe Contratadas:</strong> ${data.contrato.qtd_nfe || 'N/A'}</div>
            `;
            document.getElementById('database').innerHTML = databaseHtml;

            // DADOS CLÍNICOS E RECEITAS (Card Dados Clínicos)
            let clinicoHtml = `
                <h4>Quantidades de Registros:</h4>
                <div><strong>Pré-Operatórios:</strong> ${data.clinico.preops || 'N/A'}</div>
                <div><strong>Pós-Operatórios:</strong> ${data.clinico.posops || 'N/A'}</div>
                <div><strong>Pacientes:</strong> ${data.clinico.pacientes || 'N/A'}</div>
                <div><strong>Consultas:</strong> ${data.clinico.consultas || 'N/A'}</div>
                <br>
                <h4>Receitas:</h4>
                <div><strong>Pós-Operatórios:</strong> ${data.receitas.posop || 'N/A'}</div>
            `;
            document.getElementById('clinico').innerHTML = clinicoHtml;

            // NOTAS EMITIDAS (Card Notas Emitidas)
            let notasHtml = `
                <h4>Quantidade de Notas Emitidas:</h4>
                <div><strong>Mês 1 (Atual):</strong> ${data.notas.mes1 !== null ? data.notas.mes1 : 'N/A'}</div>
                <div><strong>Mês 2 (Anterior):</strong> ${data.notas.mes2 !== null ? data.notas.mes2 : 'N/A'}</div>
                <div><strong>Mês 3 (Há 2 meses):</strong> ${data.notas.mes3 !== null ? data.notas.mes3 : 'N/A'}</div>
            `;
            document.getElementById('notas').innerHTML = notasHtml;
            
            // VALOR TOTAL DA LICENÇA ATIVA (Seção abaixo dos cards)
            // Exibe o valor calculado com base nas licenças ativas e seus custos
            valorLicencaSpan.textContent = `R$ ${valorTotalLicencasAtivas.toFixed(2).replace('.', ',')}`; // Formata para 2 casas decimais e usa vírgula
            valorTotalDiv.classList.remove('hidden'); // Mostra a seção do valor total

            dashboard.classList.remove('hidden'); // Mostra o dashboard completo
        } catch (err) {
            // Mensagem de erro mais detalhada para o usuário
            alert(`Erro ao buscar dados da clínica ${clinic}. Detalhes: ${err.message}. Por favor, verifique o console do navegador para mais informações (F12 > Console).`);
            console.error('Erro ao buscar dados da clínica:', err); // Loga o erro completo no console
            dashboard.classList.add('hidden'); // Oculta o dashboard em caso de erro
            valorTotalDiv.classList.add('hidden'); // Oculta a seção do valor total em caso de erro
        } finally {
            loadingDiv.classList.add('hidden'); // Esconde o indicador de carregamento
        }
    }

    // Evento de clique no botão "Buscar"
    buscarBtn.addEventListener('click', fetchData);
});
