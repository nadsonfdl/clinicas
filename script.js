document.addEventListener('DOMContentLoaded', () => {
    const clinicSelect = $('#clinicSelect'); 
    const buscarBtn = document.getElementById('buscarBtn');
    const dashboard = document.getElementById('dashboard');
    const loadingDiv = document.getElementById('loading');
    const valorTotalDiv = document.getElementById('valorTotal');
    const valorLicencaSpan = document.getElementById('valorLicenca');

    const licencasDataContainer = document.getElementById('licencas-data-container'); // Novo contêiner para dados
    const whatsappButtonsContainer = document.querySelector('.whatsapp-buttons'); // Contêiner dos botões de WhatsApp
    const whatsappCrmBtn = document.getElementById('whatsappCrmBtn');
    const whatsappOutrasBtn = document.getElementById('whatsappOutrasBtn');

    const clinics = [
        "acaopositiva", "acaopositivagama", "acbiblico", "acolhedor", "advance", "agape",
        "aidaalvim", "aiza", "akhos", "allvida", "alpha", "amandaambrosio", "ame", "amego",
        "amesaude", "andros", "apercepcao", "aphrodite", "aptorax", "arche", "ares",
        "asas", "attuare", "aura", "ayresmed", "barbaraneffa", "bariinject", "bioaisthesis",
        "bioregenera", "blink", "bluetower", "bmh", "borduni", "brucesalles", "bsbcirurgia",
        "bsbotorrino", "cadi", "cami", "capilmed", "cardiologia", "ccddf", "ccw", "cdai",
        "cemefe", "centrodeaneurisma", "centrodigestivo", "clepp", "clifali", "climed",
        "climepo", "clinen", "clinicadacrianca", "clinicadotorax", "clinicadafluxus",
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

    // Inicializa Select2 no elemento select para um visual moderno
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

        // Esconde o dashboard, o valor total e os botões de WhatsApp, mostra o loading
        dashboard.classList.add('hidden');
        valorTotalDiv.classList.add('hidden');
        whatsappButtonsContainer.classList.add('hidden'); // Oculta os botões do WhatsApp
        loadingDiv.classList.remove('hidden');

        // Limpa apenas o contêiner de dados dinâmicos da licença
        licencasDataContainer.innerHTML = ''; 
        document.getElementById('database').innerHTML = '';
        document.getElementById('clinico').innerHTML = '';
        document.getElementById('notas').innerHTML = '';
        valorLicencaSpan.textContent = '';

        try {
            const response = await fetch(`https://${clinic}.igutclinicas.com.br/aplicativos/info`);
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();

            // --- Formatação dos Dados para Visualização ---

            // LICENÇAS ATIVAS E DADOS DO CONTRATO (Card Licenças e Contrato)
            let licencasAndContractHtml = '<h4>Quantidade de Licenças Ativas:</h4>';
            let valorTotalLicencasAtivas = 0;

            if (data.licencas) {
                licencasAndContractHtml += '<table class="data-table"><thead><tr><th>Tipo de Licença</th><th>Quantidade Ativa</th></tr></thead><tbody>';
                for (const key in data.licencas) {
                    const quantidade = parseInt(data.licencas[key]) || 0; 
                    licencasAndContractHtml += `<tr><td><strong>${key}:</strong></td><td>${quantidade}</td></tr>`;

                    if (key === 'CRM') {
                        valorTotalLicencasAtivas += quantidade * 100;
                    } else if (quantidade > 0) {
                        valorTotalLicencasAtivas += quantidade * 50;
                    }
                }
                licencasAndContractHtml += '</tbody></table>';
            } else {
                licencasAndContractHtml += '<div>Nenhuma informação de licença ativa disponível.</div>';
            }

            // Adicionando Dados do Contrato no MESMO CARD
            licencasAndContractHtml += `
                <br>
                <h4>Dados do Contrato:</h4>
                <table class="data-table">
                    <thead><tr><th>Item do Contrato</th><th>Quantidade</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Qtd. CRM Contratada:</strong></td><td>${data.contrato.qtd_licenca || 'N/A'}</td></tr>
                        <tr><td><strong>Qtd. Outras Especialidades Contratadas:</strong></td><td>${data.contrato.qtd_licenca2 || 'N/A'}</td></tr>
                        <tr><td><strong>Qtd. Senhas Contratadas:</strong></td><td>${data.contrato.qtd_senha || 'N/A'}</td></tr>
                        <tr><td><strong>Qtd. NFe Contratadas:</strong></td><td>${data.contrato.qtd_nfe || 'N/A'}</td></tr>
                    </tbody>
                </table>
            `;
            
            // Inserir o HTML gerado no contêiner de dados da licença
            licencasDataContainer.innerHTML = licencasAndContractHtml;

            // Gerar links do WhatsApp
            const phoneNumber = '556184018877'; // Sr. Jair

            const baseMessage = `Olá, Sr. Jair!%0A%0AGostaria de solicitar informações financeiras sobre a clínica *${clinic.toUpperCase()}*.%0A%0APreciso de uma solicitação de licença *[TIPO_LICENCA]*:`;
            const templateDetails = `%0A%0A*Dados para preencher:*%0AQuantidade: [Editar]%0ANome do Médico: [Editar]%0AEspecialidade: [Editar]%0ACPF: [Editar]%0A%0AAtenciosamente,`;

            const crmMessage = encodeURIComponent(baseMessage.replace('[TIPO_LICENCA]', 'CRM') + templateDetails);
            const outrasMessage = encodeURIComponent(baseMessage.replace('[TIPO_LICENCA]', 'Outras Especialidades') + templateDetails);

            whatsappCrmBtn.href = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${crmMessage}`;
            whatsappOutrasBtn.href = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${outrasMessage}`;
            
            whatsappButtonsContainer.classList.remove('hidden'); // Exibe os botões do WhatsApp


            // DADOS DO SERVIDOR (Card Servidor)
            let databaseHtml = `
                <h4>Informações do Sistema:</h4>
                <table class="data-table">
                    <tbody>
                        <tr><td><strong>Clínica:</strong></td><td>${data.clinica || 'N/A'}</td></tr>
                        <tr><td><strong>Versão do Sistema:</strong></td><td>${data.versao || 'N/A'}</td></tr>
                        <tr><td><strong>IP do Servidor:</strong></td><td>${data.ip || 'N/A'}</td></tr>
                        <tr><td><strong>Hostname:</strong></td><td>${data.hostname || 'N/A'}</td></tr>
                    </tbody>
                </table>
            `;
            document.getElementById('database').innerHTML = databaseHtml;

            // DADOS CLÍNICOS E RECEITAS (Card Dados Clínicos)
            let clinicoHtml = `
                <h4>Quantidades de Registros:</h4>
                <table class="data-table">
                    <thead><tr><th>Métrica</th><th>Valor</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Pré-Operatórios:</strong></td><td>${data.clinico.preops || 'N/A'}</td></tr>
                        <tr><td><strong>Pós-Operatórios:</strong></td><td>${data.clinico.posops || 'N/A'}</td></tr>
                        <tr><td><strong>Pacientes:</strong></td><td>${data.clinico.pacientes || 'N/A'}</td></tr>
                        <tr><td><strong>Consultas:</strong></td><td>${data.clinico.consultas || 'N/A'}</td></tr>
                    </tbody>
                </table>
                <br>
                <h4>Receitas:</h4>
                <table class="data-table">
                    <thead><tr><th>Tipo</th><th>Valor</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Pós-Operatórios:</strong></td><td>${data.receitas.posop || 'N/A'}</td></tr>
                    </tbody>
                </table>
            `;
            document.getElementById('clinico').innerHTML = clinicoHtml;

            // NOTAS EMITIDAS (Card Notas Emitidas)
            let notasHtml = `
                <h4>Quantidade de Notas Emitidas:</h4>
                <table class="data-table">
                    <thead><tr><th>Mês</th><th>Notas Emitidas</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Mês 1 (Atual):</strong></td><td>${data.notas.mes1 !== null ? data.notas.mes1 : 'N/A'}</td></tr>
                        <tr><td><strong>Mês 2 (Anterior):</strong></td><td>${data.notas.mes2 !== null ? data.notas.mes2 : 'N/A'}</td></tr>
                        <tr><td><strong>Mês 3 (Há 2 meses):</strong></td><td>${data.notas.mes3 !== null ? data.notas.mes3 : 'N/A'}</td></tr>
                    </tbody>
                </table>
            `;
            document.getElementById('notas').innerHTML = notasHtml;
            
            // VALOR TOTAL DA LICENÇA ATIVA
            valorLicencaSpan.textContent = `R$ ${valorTotalLicencasAtivas.toFixed(2).replace('.', ',')}`;
            valorTotalDiv.classList.remove('hidden');

            dashboard.classList.remove('hidden');
        } catch (err) {
            alert(`Erro ao buscar dados da clínica ${clinic}. Detalhes: ${err.message}. Por favor, verifique o console do navegador para mais informações (F12 > Console).`);
            console.error('Erro ao buscar dados da clínica:', err);
            dashboard.classList.add('hidden');
            valorTotalDiv.classList.add('hidden');
            whatsappButtonsContainer.classList.add('hidden'); // Garante que os botões fiquem ocultos em caso de erro
        } finally {
            loadingDiv.classList.add('hidden');
        }
    }

    buscarBtn.addEventListener('click', fetchData);
});
