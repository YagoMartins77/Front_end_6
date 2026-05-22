// ================================================================
// app.js - Arquivo JavaScript da Pizzaria Fatec
// Manipula o carrinho, calcula totais, atualiza DOM, Modal e LocalStorage
// ================================================================

// CRITÉRIO DE AVALIAÇÃO: Uso de getItem e JSON.parse()
// REQUISITO: Ao carregar a página, reconstruir o carrinho a partir dos dados salvos.
// Tenta ler "carrinho-fatec". Se existir, converte de texto para array (parse). Se não, inicia vazio [].
let carrinho = JSON.parse(localStorage.getItem("carrinho-fatec")) || [];

// Seletores dos botões e do carrinho na tela principal
const botoes = document.querySelectorAll(".botao-pedir");
const listaCarrinho = document.getElementById("lista-carrinho");
const totalCarrinho = document.getElementById("total");

// Seletores do Modal
const modalContainer = document.getElementById("modal-container");
const modalListaPizzas = document.getElementById("modal-lista-pizzas");
const modalQtdTotal = document.getElementById("modal-qtd-total");
const modalSomaFinal = document.getElementById("modal-soma-final");

// ================================================================
// FUNÇÃO DE PERSISTÊNCIA (LocalStorage)
// ================================================================

// CRITÉRIO DE AVALIAÇÃO: Uso de setItem e JSON.stringify()
function salvarNoLocalStorage() {
    // Converte o array de objetos em uma string de texto (stringify) e salva no navegador
    localStorage.setItem("carrinho-fatec", JSON.stringify(carrinho));
}

// ================================================================
// Função: atualizarCarrinho()
// Atualiza a tela, recalcula o total e salva o estado.
// ================================================================
function atualizarCarrinho() {
    listaCarrinho.innerHTML = "";  
    let soma = 0;

    carrinho.forEach((item, index) => {
        soma += item.preco;

        const li = document.createElement("li");
        li.classList.add("item-carrinho");
        
        li.innerHTML = `
            <span>${item.sabor} — R$ ${item.preco.toFixed(2)}</span>
            <button class="btn-remover" onclick="removerItem(${index})">Remover</button>
        `;
        
        listaCarrinho.appendChild(li);
    });

    // REQUISITO: O total deve ser recalculado com base nos dados recuperados
    totalCarrinho.textContent = `Total: R$ ${soma.toFixed(2)}`;
    
    // REQUISITO: Ao adicionar/remover itens, salvar o estado no localStorage
    // Como a atualizarCarrinho() é chamada sempre que algo muda, colocamos o salvamento aqui.
    salvarNoLocalStorage();
}

// ================================================================
// Função: removerItem(index)
// ================================================================
function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho(); // Redesenha a tela e salva a exclusão no localStorage
}

// ================================================================
// FUNÇÕES DO MODAL
// ================================================================
function abrirModal() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! Adicione pelo menos uma pizza.");
        return;
    }

    modalListaPizzas.innerHTML = "";
    let somaTotal = 0;

    carrinho.forEach(item => {
        somaTotal += item.preco;
        
        const li = document.createElement("li");
        li.textContent = `${item.sabor} — R$ ${item.preco.toFixed(2)}`;
        modalListaPizzas.appendChild(li);
    });

    modalQtdTotal.textContent = carrinho.length;
    modalSomaFinal.textContent = `R$ ${somaTotal.toFixed(2)}`;
    modalContainer.style.display = "flex";
}

function fecharModal() {
    modalContainer.style.display = "none";
}

function confirmarPedido() {
    alert("Pedido confirmado com sucesso! Suas pizzas já estão indo para o forno. 🍕🔥");
    
    // Esvazia o carrinho
    carrinho = [];
    atualizarCarrinho(); // Atualiza a tela e salva o carrinho vazio no localStorage
    
    fecharModal();
}

// ================================================================
// EVENTO: ao clicar em "Pedir Agora"
// ================================================================
botoes.forEach(botao => {
    botao.addEventListener("click", function(event) {
        event.preventDefault(); 

        let sabor = this.dataset.sabor;
        let preco = Number(this.dataset.preco);
        let pedido = { sabor, preco };

        carrinho.push(pedido);
        atualizarCarrinho(); // Atualiza a tela e salva a adição no localStorage
    });
});

// CRITÉRIO DE AVALIAÇÃO: Carrinho persistente após F5
// Quando a página é recarregada, chamamos a função para desenhar os itens salvos na tela.
atualizarCarrinho();
// ================================================================
// ATIVIDADE 4 - VALIDAÇÃO DO FORMULÁRIO DE CONTATO
// ================================================================

const formContato = document.getElementById("form-contato");

// Verifica se o formulário existe na página antes de adicionar o evento
if (formContato) {
    formContato.addEventListener("submit", function(event) {
        
        // CRITÉRIO DE AVALIAÇÃO: Bloqueio de envio funcionando
        // Interrompe o recarregamento automático da página
        event.preventDefault(); 

        // Captura os valores digitados retirando os espaços em branco nas pontas (.trim)
        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        // Captura os campos onde vamos imprimir as mensagens de erro
        const erroNome = document.getElementById("erro-nome");
        const erroEmail = document.getElementById("erro-email");
        const erroMensagem = document.getElementById("erro-mensagem");

        // Captura os inputs para pintar a borda de vermelho (UX)
        const inputNome = document.getElementById("nome");
        const inputEmail = document.getElementById("email");
        const inputMensagem = document.getElementById("mensagem");

        // Reseta todos os erros para o estado limpo antes de testar
        erroNome.textContent = "";
        erroEmail.textContent = "";
        erroMensagem.textContent = "";
        inputNome.classList.remove("input-erro");
        inputEmail.classList.remove("input-erro");
        inputMensagem.classList.remove("input-erro");

        // Variável de controle: se virar false, o formulário não é enviado
        let formularioValido = true;

        // REQUISITO: Impedir envio se o campo Nome estiver vazio
        if (nome === "") {
            erroNome.textContent = "Por favor, preencha o seu nome.";
            inputNome.classList.add("input-erro");
            formularioValido = false;
        }

        // REQUISITO: O e-mail for inválido (regex simples)
        // A Expressão Regular abaixo exige caracteres, um '@', caracteres, um '.', e mais caracteres.
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === "") {
            erroEmail.textContent = "O campo e-mail é obrigatório.";
            inputEmail.classList.add("input-erro");
            formularioValido = false;
        } else if (!regexEmail.test(email)) {
            erroEmail.textContent = "Digite um e-mail válido (ex: seu_nome@email.com).";
            inputEmail.classList.add("input-erro");
            formularioValido = false;
        }

        // REQUISITO: A mensagem tiver menos de 10 caracteres
        if (mensagem === "") {
            erroMensagem.textContent = "Por favor, escreva uma mensagem.";
            inputMensagem.classList.add("input-erro");
            formularioValido = false;
        } else if (mensagem.length < 10) {
            erroMensagem.textContent = "Sua mensagem precisa ter pelo menos 10 caracteres.";
            inputMensagem.classList.add("input-erro");
            formularioValido = false;
        }

        // Se passar por todas as validações, a variável continua 'true'
        if (formularioValido) {
            alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
            formContato.reset(); // CRITÉRIO UX: Esvazia os campos após enviar com sucesso
        }
    });
}