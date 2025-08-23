document.addEventListener('DOMContentLoaded', () => {

    // Elementos da interface
    const clinicSelect = $('#clinic-select');
    const searchButton = document.getElementById('search-button');
    const loadingDiv = document.querySelector('.loading');
    const dashboardDiv = document.getElementById('dashboard');
    const systemSelection = document.getElementById('system-selection');
    const mainContainer = document.querySelector('.container');
    const selectClinicSection = document.querySelector('.select-clinic');
    const dashboardEba = document.getElementById('dashboard-eba');
    const igutCard = document.getElementById('igut-card');
    const ebaCard = document.getElementById('eba-card');
    const body = document.body;

    // Adiciona o tema padrão IGUT ao carregar a página
    body.classList.add('theme-igut');

    // Mapeamento de clínicas (substitua com dados reais)
    const clinics = [
        { id: 1, text: "Clínica A", nome_clinica: "Clínica A" },
        { id: 2, text: "Clínica B", nome_clinica: "Clínica B" },
        // Adicione mais clínicas aqui
    ];

    // Inicializa o Select2
    clinicSelect.select2({
        data: clinics,
        placeholder: "Selecione uma clínica...",
        allowClear: true
    });

    // Evento de clique no card do IGUT
    igutCard.addEventListener('click', (e) => {
        e.preventDefault();
        body.classList.remove('theme-eba');
        body.classList.add('theme-igut');
        systemSelection.classList.add('hidden');
        mainContainer.classList.remove('hidden');
        selectClinicSection.classList.remove('hidden');
        dashboardDiv.classList.add('hidden');
        dashboardEba.classList.add('hidden');
    });

    // Evento de clique no card do EBA
    ebaCard.addEventListener('click', (e) => {
        e.preventDefault();
        body.classList.remove('theme-igut');
        body.classList.add('theme-eba');
        systemSelection.classList.add('hidden');
        mainContainer.classList.remove('hidden');
        selectClinicSection.classList.add('hidden');
        dashboardDiv.classList.add('hidden');
        dashboardEba.classList.remove('hidden');
        fetchEbaData();
    });

    // Evento de clique no botão de busca
    searchButton.addEventListener('click', async () => {
        const selectedClinic = clinicSelect.val();
        if (!selectedClinic) {
            alert('Por favor, selecione uma clínica.');
            return;
        }
        
        // Esconde o select e mostra o loading
        selectClinicSection.classList.add('hidden');
        loadingDiv.classList.remove('hidden');
        dashboardDiv.classList.add('hidden');

        try {
            // Requisição para a API do IGUT
            const response = await fetch(`https://api.igutclinicas.com.br/clinica?id=${selectedClinic}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar dados da clínica.');
            }
            const data = await response.json();
            
            // Preenche os cards com os dados recebidos
            document.getElementById('nome-clinica').textContent = data.nome_clinica;
            document.getElementById('total-licencas').textContent = data.licencas.total_licencas_ativas;
            document.getElementById('licencas-crm').textContent = data.licencas.licencas_crm;
            document.getElementById('outras-licencas').textContent = data.licencas.outras_licencas;
            document.getElementById('valor-licencas').textContent = formatCurrency(data.licencas.valor_estimado);
            document.getElementById('qtd-licencas-contrato').textContent = data.licencas.qtd_licencas_contratadas;
            document.getElementById('crm-contratado').textContent = data.licencas.licencas_crm_contratadas;
            document.getElementById('especialidades-contratadas').textContent = data.licencas.licencas_especialidades_contratadas;
            
            document.getElementById('versao').textContent = data.servidor.versao;
            document.getElementById('ip-servidor').textContent = data.servidor.ip;
            document.getElementById('hostname').textContent = data.servidor.hostname;
            
            document.getElementById('pacientes').textContent = data.dados_clinicos.pacientes;
            document.getElementById('consultas').textContent = data.dados_clinicos.consultas;
            document.getElementById('pre-operatorios').textContent = data.dados_clinicos.pre_operatorios;
            document.getElementById('pos-operatorios').textContent = data.dados_clinicos.pos_operatorios;
            document.getElementById('receita-pos').textContent = formatCurrency(data.dados_clinicos.receita_pos_operatorios);
            
            document.getElementById('notas-emitidas').textContent = data.notas.notas_emitidas;
            
            // Ativa os links do WhatsApp
            const crmMessage = `Olá, gostaria de solicitar uma licença CRM para a clínica ${data.nome_clinica}.`;
            const specialityMessage = `Olá, gostaria de solicitar uma licença de outra especialidade para a clínica ${data.nome_clinica}.`;
            
            document.getElementById('btn-whatsapp-crm').href = `https://wa.me/5599999999999?text=${encodeURIComponent(crmMessage)}`;
            document.getElementById('btn-whatsapp-especialidade').href = `https://wa.me/5599999999999?text=${encodeURIComponent(specialityMessage)}`;

            loadingDiv.classList.add('hidden');
            dashboardDiv.classList.remove('hidden');

        } catch (error) {
            loadingDiv.classList.add('hidden');
            alert(`Erro: ${error.message}`);
            console.error('Erro:', error);
            selectClinicSection.classList.remove('hidden');
        }
    });

    // Função de formatação de moeda
    function formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }
    
    // Esqueleto da função para buscar dados do EBA
    async function fetchEbaData() {
        loadingDiv.classList.remove('hidden');
        dashboardEba.classList.add('hidden');

        try {
            // Subsitua com a sua lógica de requisição para a API do EBA
            const response = await fetch('https://api.eba-system.com/data');
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do EBA.');
            }
            const data = await response.json();
            
            // Lógica para preencher os cards do EBA com os dados
            // document.getElementById('eba-finance').innerHTML = `...`;

            loadingDiv.classList.add('hidden');
            dashboardEba.classList.remove('hidden');

        } catch (error) {
            alert(`Erro: ${error.message}`);
            console.error('Erro ao buscar dados do EBA:', error);
            loadingDiv.classList.add('hidden');
        }
    }
});
