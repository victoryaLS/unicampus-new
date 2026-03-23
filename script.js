// Carrinho
let carrinho = [];
const PRECO_PADRAO = 199;

function adicionarDoModal(nomeCurso, botao, idModal) {
    if (!carrinho.find(item => item.nome === nomeCurso)) {
        carrinho.push({ nome: nomeCurso, preco: PRECO_PADRAO });
        atualizarCarrinho();
        mostrarAlerta();
    }

    botao.innerText = 'Adicionado ✓';
    botao.disabled = true;
    botao.classList.add('adicionado');

    fecharModal(idModal);
}

function adicionarCarrinho(nomeCurso, botao) {
    if (carrinho.find(item => item.nome === nomeCurso)) return;

    carrinho.push({ nome: nomeCurso, preco: PRECO_PADRAO });

    botao.innerText = 'Adicionado ✓';
    botao.disabled = true;
    botao.classList.add('adicionado');

    atualizarCarrinho();
    mostrarAlerta();
}

// Remover item do carrinho

function removerItem(index) {
    const nomeCurso = carrinho[index].nome;
    carrinho.splice(index, 1);

    atualizarCarrinho();
    restaurarBotao(nomeCurso);
}

// Atualizar o Carrinho

function atualizarCarrinho() {
    const lista = document.getElementById('listaCarrinho');
    const totalTexto = document.getElementById('totalCarrinho');
    const contador = document.getElementById('contadorCarrinho');

    lista.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        total += item.preco;
        lista.innerHTML += `
            <div class="item-carrinho">
                <span>${item.nome}</span>
                <span>R$ ${item.preco}</span>
                <button onclick="removerItem(${index})">Remover</button>
            </div>
        `;
    });

    totalTexto.innerText = `Total: R$ ${total}`;
    contador.innerText = carrinho.length;
}

// Finalizar a Compra de cursos

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    alert('Matrícula realizada com sucesso!');

    carrinho = [];
    atualizarCarrinho();

    document.querySelectorAll('.card-cursos button').forEach(botao => {
        botao.innerText = 'Adicionar';
        botao.disabled = false;
        botao.classList.remove('adicionado');
    });

    fecharCarrinho();
}

// Abrir o Login
function abrirLogin() {
    document.getElementById('loginCard').style.display = 'flex';
}


// Fechar o Login
function fecharLogin() {
    document.getElementById('loginCard').style.display = 'none';
}

// Fazer o Login

function fazerLogin() {
    const id = document.getElementById('alunoId').value.trim();
    const senha = document.getElementById('alunoSenha').value.trim();

    if (id && senha) {
        alert('Login realizado com sucesso!');
        fecharLogin();
    } else {
        alert('Preencha todos os campos!');
    }
}

// Abrir Modal

function abrirModal(id) {
    document.getElementById('overlay-' + id).style.display = 'flex';
    if (id === 'cursosArray') carregarCursos();
}

// Fechar o Modal

function fecharModal(id) {
    document.getElementById('overlay-' + id).style.display = 'none';
}

// Abrir o Carrinho

function abrirCarrinho() {
    document.getElementById('carrinhoLateral').classList.add('ativo');
    document.getElementById('overlayCarrinho').classList.add('ativo');
}

// Fechar o Carrinho

function fecharCarrinho() {
    document.getElementById('carrinhoLateral').classList.remove('ativo');
    document.getElementById('overlayCarrinho').classList.remove('ativo');
}

function mostrarAlerta() {
    const alerta = document.getElementById('alertaSucesso');
    alerta.classList.add('ativo');
    setTimeout(() => alerta.classList.remove('ativo'), 2000);
}

// Cursos 

const cursosArray = [
    {
        "Curso": "Estruturas de Dados",
        "Descriçao": "Aprenda como organizar e manipular dados de forma eficiente em memória usando listas, filas, pilhas, árvores e grafos.",
        "Duração": "80 Horas",
        "Nível": "Intermediário",
        "Professor": "Roger Miller",
        "Conteúdo": "Arrays e listas encadeadas, Pilhas e filas, Árvores binárias, Tabelas hash, Grafos e algoritmos de busca "
    },

    {
        "Curso": "Modelagem de Sistemas",
        "Descriçao": "Entenda como planejar e documentar sistemas de software antes de programar, usando UML e diagramas.",
        "Duração": "60 Horas",
        "Nível": "Iniciante",
        "Professor": "Jackson",
        "Conteúdo": " Introdução à UML, Diagrama de Casos de Uso, Diagrama de Classes,Diagrama de Sequência,Modelagem de banco de dados (MER)"
    },

    {
        "Curso": "Paradigmas de Programação",
        "Descriçao": "Explore diferentes formas de pensar e desenvolver software, do imperativo ao funcional e orientado a objetos.",
        "Duração": "70 Horas",
        "Nível": "Intermediário",
        "Professor": "Marcos David",
        "Conteúdo": " Paradigma Imperativo, Orientação a Objetos, Programação Funcional, Programação Reativa, Comparativo entre linguagens"
    },

    {
        "Curso": "Banco de Dados",
        "Descriçao": "Domine tecnologias e linguagens de armazenamento de dados, do SQL básico ao NoSQL avançado.",
        "Duração": "90 Horas",
        "Nível": "Iniciante ao Avançado",
        "Professor": "Alex",
        "Conteúdo": "Modelo Relacional e MER, SQL: DDL, DML e DQL, Normalização de dados, Stored Procedures e Triggers, Introdução ao NoSQL"
    },

]


function carregarCursos() {
    const lista = document.getElementById("listaCursos");
    lista.innerHTML = "";

    cursosArray.forEach(curso => {
        const card = document.createElement("div");
        card.classList.add("card-curso-item");

        const nomeCurso = curso["Curso"];

        card.innerHTML = `
            <div class="curso-info">
                <h3>${nomeCurso}</h3>
                <p class="curso-descricao">${curso["Descriçao"]}</p>
                <div class="curso-detalhes">
                    <span> ${curso["Duração"]}</span>
                    <span> ${curso["Nível"]}</span>
                    <span> ${curso["Professor"]}</span>
                </div>
                <p class="curso-conteudo"><strong>Conteúdo:</strong> ${curso["Conteúdo"]}</p>
            </div>
        `;

        lista.appendChild(card);
    });
}

