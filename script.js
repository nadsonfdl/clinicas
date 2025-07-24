:root {
    --primary-blue: #2196F3; /* Azul primário */
    --light-blue: #E3F2FD; /* Azul muito claro para fundo */
    --dark-blue: #1976D2;  /* Azul escuro para títulos/ícones */
    --accent-blue: #42A5F5; /* Azul para destaque, botões */
    --text-color: #333;
    --card-bg: #FFFFFF;
    --shadow-color: rgba(0,0,0,0.1);
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: var(--light-blue);
    color: var(--text-color);
    margin: 0;
    padding: 0;
    line-height: 1.6;
}

header {
    background-color: var(--dark-blue);
    color: white;
    padding: 1.5rem 0;
    text-align: center;
    box-shadow: 0 2px 10px var(--shadow-color);
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.logo-container {
    margin-bottom: 15px;
}

/* NOVO ESTILO: Para a logo do IGUT */
.igut-logo {
    max-width: 180px; /* Ajuste o tamanho máximo do logotipo conforme necessário */
    height: auto;
    display: block;
    border-radius: 8px; /* Mantém o arredondamento, se aplicável ao design da logo */
}

header h1 {
    margin: 0;
    font-size: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

header h1 .fas {
    font-size: 2rem;
}

.container {
    width: 90%;
    max-width: 1000px;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, 0.95);
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 20px var(--shadow-color);
}

.select-clinic {
    text-align: center;
    margin-bottom: 2rem;
    padding: 15px;
    background-color: #f0f8ff;
    border-radius: 8px;
    border: 1px solid var(--primary-blue);
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
}

.select-clinic label {
    font-size: 1.1rem;
    color: var(--dark-blue);
    font-weight: bold;
    margin-bottom: 10px;
    display: block;
}

/* Estilo para Select2 */
.select2-container {
    display: block;
    margin: 15px auto;
    max-width: 400px;
}

.select2-container .select2-selection--single {
    height: 40px;
    border: 2px solid var(--primary-blue) !important;
    border-radius: 5px;
    font-size: 1rem;
    line-height: 36px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.select2-container .select2-selection--single .select2-selection__rendered {
    color: var(--text-color);
    line-height: 36px;
    padding-left: 15px;
}

.select2-container .select2-selection--single .select2-selection__arrow {
    height: 38px;
    width: 30px;
}

.select2-container--default .select2-selection--single .select2-selection__clear {
    margin-right: 10px;
    font-size: 1.2rem;
    color: var(--dark-blue);
}

/* Estilo do dropdown do Select2 */
.select2-dropdown {
    border: 2px solid var(--primary-blue) !important;
    border-radius: 5px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.select2-container--default .select2-results__option--highlighted.select2-results__option--selectable {
    background-color: var(--accent-blue) !important;
    color: white;
}

.select2-container--default .select2-search--dropdown .select2-search__field {
    border: 1px solid var(--primary-blue);
    border-radius: 4px;
    padding: 8px;
    font-size: 0.95rem;
}

#buscarBtn {
    background-color: var(--primary-blue);
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    margin-top: 15px;
    box-shadow: 0 3px 8px rgba(0,0,0,0.15);
}

#buscarBtn:hover {
    background-color: var(--dark-blue);
    transform: translateY(-2px);
}

.loading {
    text-align: center;
    font-size: 1.2rem;
    color: var(--dark-blue);
    margin: 2rem 0;
}

.loading .fas {
    margin-right: 10px;
    color: var(--accent-blue);
}

.dashboard {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.8rem;
    margin-top: 2rem;
}

.card {
    background: var(--card-bg);
    border-radius: 10px;
    box-shadow: 0 4px 15px var(--shadow-color);
    padding: 1.8rem;
    text-align: center;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

.card h3 {
    color: var(--dark-blue);
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.card .fas {
    color: var(--primary-blue);
    margin-right: 0.8rem;
    font-size: 2.2rem;
    margin-bottom: 10px;
}

/* Ajustes para o conteúdo interno dos cards */
.card-content {
    font-size: 0.95rem;
    color: #555;
    text-align: left;
    width: 100%;
    overflow-x: auto;
    background-color: #f9f9f9;
    padding: 12px;
    border-radius: 5px;
    border: 1px solid #eee;
    min-height: 80px;
}

.card-content > div {
    margin-bottom: 5px;
    word-break: break-word;
    line-height: 1.4;
}

.card-content h4 {
    margin-top: 15px;
    margin-bottom: 8px;
    color: var(--dark-blue);
    font-size: 1.1rem;
    border-bottom: 1px solid #ddd;
    padding-bottom: 5px;
    font-weight: bold;
}

/* Estilos para as tabelas dentro dos cards */
.card-content .data-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.card-content .data-table th,
.card-content .data-table td {
    padding: 10px 12px;
    border: 1px solid #eee;
    text-align: left;
    font-size: 0.9em;
}

.card-content .data-table th {
    background-color: var(--primary-blue);
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.85em;
    padding: 12px 12px;
}

.card-content .data-table tr:nth-child(even) {
    background-color: #f6f6f6;
}

.card-content .data-table tr:hover {
    background-color: #eef;
}

.card-content .data-table td strong {
    color: var(--dark-blue);
}

.total-valor {
    text-align: center;
    margin-top: 2.5rem;
    padding: 1.2rem;
    background-color: #BBDEFB;
    color: var(--dark-blue);
    font-size: 1.3rem;
    font-weight: bold;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.total-valor .fas {
    font-size: 1.5rem;
    color: var(--primary-blue);
}

.hidden {
    display: none;
}

/* Responsividade */
@media (max-width: 768px) {
    header h1 {
        font-size: 1.8rem;
    }
    header h1 .fas {
        font-size: 1.6rem;
    }
    .container {
        padding: 15px;
    }
    .select-clinic {
        padding: 10px;
    }
    .select-clinic label {
        font-size: 1rem;
    }
    #buscarBtn {
        font-size: 1rem;
        padding: 8px 20px;
    }
    .dashboard {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    .card {
        padding: 1.2rem;
    }
    .card h3 {
        font-size: 1.3rem;
    }
    .card .fas {
        font-size: 1.8rem;
    }
    .card-content {
        font-size: 0.9rem;
    }
    .total-valor {
        font-size: 1.1rem;
        padding: 1rem;
    }
    /* Estilo da nova logo em telas menores */
    .igut-logo {
        max-width: 150px;
    }
}
