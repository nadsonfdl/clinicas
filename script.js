
document.getElementById('clinicSelect').addEventListener('change', function () {
    const clinic = this.value;
    if (!clinic) {
        document.getElementById('dashboard').classList.add('hidden');
        return;
    }
    fetch(`https://${clinic}.igutclinicas.com.br/aplicativos/info`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('licencas').innerHTML = JSON.stringify(data.licencas, null, 2);
            document.getElementById('database').innerHTML = `IP: ${data.ip}<br>Hostname: ${data.hostname}`;
            document.getElementById('clinico').innerHTML = JSON.stringify(data.clinico, null, 2);
            document.getElementById('notas').innerHTML = JSON.stringify(data.notas, null, 2);
            document.getElementById('dashboard').classList.remove('hidden');
        })
        .catch(err => {
            alert('Erro ao buscar dados da clínica.');
            console.error(err);
        });
});
