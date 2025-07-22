document.addEventListener('DOMContentLoaded', () => {
    const clinicSelect = $('#clinicSelect'); // Usando jQuery para Select2
    const buscarBtn = document.getElementById('buscarBtn');
    const dashboard = document.getElementById('dashboard');
    const loadingDiv = document.getElementById('loading');
    const valorTotalDiv = document.getElementById('valorTotal');
    const valorLicencaSpan = document.getElementById('valorLicenca');

    // Lista completa de clínicas
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
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }
            const data = await response.json();

            // Usar textContent para evitar problemas de segurança e garantir formatação em <pre>
            document.getElementById('licencas').textContent = JSON.stringify(data.licencas, null, 2);
            // Usar \n para quebra de linha em <p>
            document.getElementById('database').textContent = `IP: ${data.ip}\nHostname: ${data.hostname}`; 
            document.getElementById('clinico').textContent = JSON.stringify(data.clinico, null, 2);
            document.getElementById('notas').textContent = JSON.stringify(data.notas, null, 2);
            
            // Exibir valor total da licença se existir
            if (data.licencas && typeof data.licencas.valorTotal !== 'undefined') {
                valorLicencaSpan.textContent = `R$ ${parseFloat(data.licencas.valorTotal).toFixed(2).replace('.', ',')}`;
                valorTotalDiv.classList.remove('hidden');
            } else {
                valorTotalDiv.classList.add('hidden');
            }

            dashboard.classList.remove('hidden');
        } catch (err) {
            alert(`Erro ao buscar dados da clínica ${clinic}: ${err.message}. Por favor, tente novamente.`);
            console.error('Erro ao buscar dados da clínica:', err);
            dashboard.classList.add('hidden'); // Oculta o dashboard em caso de erro
            valorTotalDiv.classList.add('hidden');
        } finally {
            loadingDiv.classList.add('hidden'); // Esconde o loading
        }
    }

    // Evento de clique no botão "Buscar"
    buscarBtn.addEventListener('click', fetchData);
});
