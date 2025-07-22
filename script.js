const clinics = [
    "acaopositiva","acaopositivagama","acbiblico","acolhedor","advance","agape",
    "aidaalvim","aiza","akhos","allvida","alpha","amandaambrosio","ame","amego",
    "amesaude","andros","apercepcao","aphrodite","aptorax","arche","ares",
    // ... adicione todas as outras clínicas aqui
];

$(document).ready(function () {
    $('#clinicSelect').select2({
        placeholder: "Digite para buscar uma clínica...",
        allowClear: true
    });
});

const clinicSelect = document.getElementById('clinicSelect');
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

clinicSelect.addEventListener('change', () => {
    const selectedClinic = clinicSelect.value;
    if (!selectedClinic) {
        dashboard.classList.add('hidden');
        valorTotal.classList.add('hidden');
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

            // Calcula valor total
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
