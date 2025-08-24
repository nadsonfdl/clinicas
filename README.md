# Dashboards de Monitoramento IGUT & EBA

Este repositório contém dashboards interativos para o monitoramento de dados de clínicas que utilizam as plataformas IGUT e EBA. A aplicação permite visualizar informações essenciais sobre licenças, servidores, dados clínicos e integrações, oferecendo uma visão centralizada e eficiente para a gestão e tomada de decisões.

---

### 💻 Funcionalidades

* **Hub Central**: Uma página inicial para fácil navegação entre os diferentes dashboards.
* **Dashboard IGUT**: Visualize dados sobre licenças, status do servidor, indicadores clínicos e notas emitidas.
* **Dashboard EBA**: Monitore informações financeiras, relatórios e, principalmente, as **integrações** da clínica, com um botão dedicado para essa funcionalidade.
* **Busca Dinâmica**: Pesquise dados de clínicas específicas de forma rápida, conectando-se a endpoints de API para buscar informações em tempo real.
* **Interface Moderna**: Design limpo, intuitivo e responsivo, adaptando-se a diferentes tamanhos de tela.

---

### 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido usando as seguintes tecnologias e bibliotecas:

* **HTML5**: Para a estrutura das páginas.
* **CSS3**: Para estilização e layout, utilizando variáveis para cores e facilitando a manutenção.
* **JavaScript (ES6+)**: Para a lógica de busca de dados e interatividade.
* **jQuery**: Biblioteca JavaScript para manipulação do DOM e requisições AJAX.
* **Select2**: Biblioteca para criar um seletor de clínicas moderno e pesquisável.
* **Font Awesome**: Para os ícones da interface.

---

### 🛠️ Como Usar

Para testar a aplicação localmente, siga os passos abaixo:

1.  **Clone o repositório**:
    ```bash
    git clone [https://github.com/nadsonfdl/clinicas.git](https://github.com/nadsonfdl/clinicas.git)
    ```

2.  **Navegue até a pasta do projeto**:
    ```bash
    cd clinicas
    ```

3.  **Abra o arquivo principal**:
    Basta abrir o arquivo `hub.html` no seu navegador de internet preferido. A aplicação é totalmente estática e não necessita de um servidor web para funcionar.

---

### 📂 Estrutura do Projeto

A estrutura de arquivos do projeto é organizada da seguinte forma:

.
├── hub.html              # Página inicial (Hub)
├── hub_styles.css        # Estilos para o Hub
├── igut_dashboard.html   # Dashboard IGUT
├── igut_styles.css       # Estilos para o Dashboard IGUT
├── igut_script.js        # Lógica para o Dashboard IGUT
├── eba_dashboard.html    # Dashboard EBA
├── eba_styles.css        # Estilos para o Dashboard EBA
├── eba_script.js         # Lógica para o Dashboard EBA
└── README.md             # Este arquivo

---

### 🧑‍💻 Créditos

Desenvolvido por **Nadson Fernandes**

---

### 📄 Licença

Este projeto está licenciado sob a Licença MIT.
