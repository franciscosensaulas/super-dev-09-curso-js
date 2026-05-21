// Cria uma função para alternar a visibilidade da caixa
function alternarVisibilidadeBotao() {
    // Busca no HTML o elemento que possui o id "caixa-01"
    const divCaixa01 = document.getElementById("caixa-01");
    // Busca no HTML o botão que possui o id "botao-alternar-visibilidade"
    const botaoAlternarVisibilidade = document.getElementById("botao-alternar-visibilidade");

    // Verifica se a caixa está sem valor de display ou escondida
    if (divCaixa01.style.display === "" || divCaixa01.style.display === "none") {
        // Mostra a caixa na tela
        divCaixa01.style.display = "block";
        // Altera o texto do botão para indicar que a caixa pode ser ocultada
        botaoAlternarVisibilidade.innerText = "Ocultar caixa";

        // Caso a caixa já esteja visível
    } else {
        // Esconde a caixa da tela
        divCaixa01.style.display = "none";
        // Altera o texto do botão para indicar que a caixa pode ser apresentada novamente
        botaoAlternarVisibilidade.innerText = "Apresentar caixa";
    }
}

function definirCorVermelho() {
    const divCaixa01 = document.getElementById("caixa-01");
    divCaixa01.classList.remove("caixa-azul");
    divCaixa01.classList.add("caixa-vermelha");
}

function redefinirCor() {
    const divCaixa01 = document.getElementById("caixa-01");
    // Apagar todas as classes atribuídas a div
    divCaixa01.classList = [];
}

function definirCorAzul() {
    const divCaixa01 = document.getElementById("caixa-01");
    // Remove a classe 'caixa-vermelha' da div
    divCaixa01.classList.remove("caixa-vermelha");
    // Adicionar a classe 'caixa-auzl' na div
    divCaixa01.classList.add("caixa-azul");
}

function arcoIris() {
    const cores = ["vermelha", "azul", "laranja", "amarela", "verde", "anil", "violeta"];
    const divCaixa01 = document.getElementById("caixa-01");
    debugger
    for (let i = 0; i < cores.length; i++) {
        // alert(cores[i]);
        setTimeout(() => {
            const cor = `caixa-${cores[i]}`;
            divCaixa01.classList = [cor];
        }, i * 1000);
    }
}

function apresentarCamposPessoaFisica() {
    const divCamposPf = document.getElementById("campos-pf");
    divCamposPf.classList.remove("hidden");

    const divCamposPj = document.getElementById("campos-pj");
    divCamposPj.classList.add("hidden");
}

function apresentarCamposPessoaJuridica() {
    const divCamposPj = document.getElementById("campos-pj");
    divCamposPj.classList.remove("hidden");

    const divCamposPf = document.getElementById("campos-pf");
    divCamposPf.classList.add("hidden");
}

const imagemDragonBall = "https://ovicio.com.br/wp-content/uploads/dragon-ball-z-vegeta-9000-238679.png";
const imagemAbsoluteCinema = "https://lazersemfronteiras.com.br/wp-content/uploads/2025/09/Absolute-cinema-o-que-e-e-por-que-esse-meme-viralizou.jpg";
const imagemSapo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwqd6Yl7zik3g7UBl3_gM_OYK3IKpGL2fJeQ&s";

function alterarImagem(evento) {
    if (evento.key === "Enter") {
        const imagem = document.getElementsByClassName("imagem")[0]
        const campoPesquisa = document.getElementById("campo-pesquisa");
        const pesquisa = campoPesquisa.value;
        if (pesquisa === "dragon ball") {
            imagem.style.background = `url('${imagemDragonBall}')`;
        } else if (pesquisa === "absolute cinema") {
            imagem.style.background = `url('${imagemAbsoluteCinema}')`;
        } else {
            imagem.style.background = `url('${imagemSapo}')`;
        }
    }
}
