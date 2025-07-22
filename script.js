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

$(document).ready(function () {
    $('#clinicSelect').select2({
        placeholder: "Digite para buscar uma clínica...",
        allowClear: true
    });
});

const clinicSelect = document.getElementById('clinicSelect');
const buscarBtn = document.getElementById('buscarBtn');
const loading = document.getElementById('loading');
const dashboard = document.getElementById('dashboard');
const valorTotal = document.getElementById('valorTotal');
const valorLicenca = document.getElementById('valorLicenca');

clinics.forEach(clinic => {
    const option = document.createElement('option');
    option.value = clinic;
    option.textContent = clinic;
    clinicSelect.appendChild(option);
});

buscarBtn.addEventListener('click', () => {
    const selectedClinic = clinicSelect.value;
    if (!selectedClinic) {
        alert("Selecione uma clínica antes de buscar.");
        return;
    }
    loading.classList.remove('hidden');
    dashboard.classList.add('hidden');
    valorTotal.classList.add('hidden');

    fetch(`https://${selectedClinic}.igutclinicas.com.br/aplicativos/info`)
        .then(res => {
            if (!res.ok) throw new Error("Erro ao buscar dados");
            return res.json();
        })
        .then(data => {
            document.getElementById('licencas').innerHTML = JSON.stringify(data.licencas, null, 2);
            document.getElementById('database').innerHTML = `IP: ${data.ip}<br>Hostname: ${data.hostname}`;
            document.getElementById('clinico').innerHTML = JSON.stringify(data.clinico, null, 2);
            document.getElementById('notas').innerHTML = JSON.stringify


$(document).ready(function () {
    $('#clinicSelect').select2({
        placeholder: "Digite para buscar uma clínica...",
        allowClear: true
    });
});

const clinicSelect = document.getElementById('clinicSelect');
const buscarBtn = document.getElementById('buscarBtn');
const loading = document.getElementById('loading');
const dashboard = document.getElementById('dashboard');
const valorTotal = document.getElementById('valorTotal');
const valorLicenca = document.getElementById('valorLicenca');

clinics.forEach(clinic => {
    const option = document.createElement('option');
    option.value = clinic;
    option.textContent = clinic;
    clinicSelect.appendChild(option);
});

buscarBtn.addEventListener('click', () => {
    const selectedClinic = clinicSelect.value;
    if (!selectedClinic) {
        alert("Selecione uma clínica antes de buscar.");
        return;
    }
    loading.classList.remove('hidden');
    dashboard.classList.add('hidden');
    valorTotal.classList.add('hidden');

    fetch(`https://${selectedClinic}.igutclinicas.com.br/aplicativos/info`)
        .then(res => {
            if (!res.ok) throw new Error("Erro ao buscar dados");
            return res.json();
        })
        .then(data => {
            document.getElementById('licencas').innerHTML = JSON.stringify(data.licencas, null, 2);
            document.getElementById('database').innerHTML = `IP: ${data.ip}<br>Hostname: ${data.hostname}`;
            document.getElementById('clinico').innerHTML = JSON.stringify(data.clinico, null, 2);
            document.getElementById('notas').innerHTML = JSON.stringify(data.notas, null, 2);

            const crm = parseInt(data.licencas.CRM) || 0;
            let outros = 0;
            const outrosKeys = ['COREN', 'CRFA', 'CRP', 'SEM'];
            outrosKeys.forEach(key => {
                outros += parseInt(data.licencas[key]) || 0;
            });
            const valor = crm * 100 + outros * 50;
            valorLicenca.textContent = `R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

            loading.classList.add('hidden');
            dashboard.classList.remove('hidden');
            valorTotal.classList.remove('hidden');
        })
        .catch(err => {
            loading.classList.add('hidden');
            alert("Erro ao buscar dados da clínica.");
            console.error(err);
        });
});
