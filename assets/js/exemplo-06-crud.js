// Pega o botão de salvar na página usando a classe "botao-salvar".
const botaoSalvar = document.getElementsByClassName("botao-salvar")[0];

// Adiciona o evento de clique no botão de salvar.
botaoSalvar.addEventListener("click", salvarCategoria);

// Pega o campo de texto onde o usuário digita o nome da categoria.
const campoNome = document.getElementById("campo-nome");

// Pega o tbody da tabela onde as categorias serão adicionadas.
const corpoTabela = document.getElementById("categorias");

// Guarda a URL base do back-end responsável pelas categorias.
const urlBase = "https://api.franciscosensaulas.com/api/v1/biblioteca/categorias";

// Cria a variável que guarda o id da categoria que está sendo editada.
// Quando o valor for -1, significa que o sistema está em modo de cadastro.
let idParaEditar = -1;

// Cria a função responsável por salvar uma categoria.
function salvarCategoria(evento) {
    // Impede que o formulário recarregue a página ao ser enviado.
    evento.preventDefault();

    // Mostra no console o evento recebido pela função.
    console.log(evento);

    // Pega o valor digitado no campo e remove espaços no começo e no fim.
    const nome = campoNome.value.trim();

    // Verifica se o nome possui menos de 4 caracteres.
    if(nome.length < 4){
        // Mostra uma mensagem de validação para o usuário.
        alert("Categoria deve conter no mínimo 4 caracteres");

        // Encerra a execução da função.
        return;
    }

    // Verifica se não existe categoria em edição.
    if (idParaEditar === -1) {
        // Chama a função para cadastrar uma nova categoria.
        cadastrarCategoria(nome);
    } else {
        // Chama a função para editar a categoria existente.
        editarCategoria(nome);
    }
}

// Cria a função responsável por limpar os campos do formulário.
function limparCampos() {
    // Limpa o valor do campo de nome.
    campoNome.value = "";

    // Reseta o idParaEditar para permitir um novo cadastro.
    idParaEditar = -1;
}

// Cria a função responsável por cadastrar uma categoria.
function cadastrarCategoria(nomeCategoria) {
    // Cria o objeto que será enviado no corpo da requisição.
    const dados = {
        // Define o nome da categoria dentro do objeto.
        nome: nomeCategoria
    }

    // Faz a requisição para o back-end.
    fetch(urlBase, {
        // Define o método HTTP POST, usado para cadastrar.
        method: "POST",

        // Define os cabeçalhos da requisição.
        headers: {
            // Informa que os dados enviados estão no formato JSON.
            "Content-Type": "application/json"
        },

        // Converte o objeto dados para JSON em formato de texto.
        body: JSON.stringify(dados)
    })
        // Executa quando o back-end responde a requisição.
        .then(response => {
            // Mostra no console o status HTTP da resposta.
            console.log(response.status);

            // Verifica se o status é 201, que indica cadastro criado com sucesso.
            if (response.status === 201) {
                // Mostra mensagem de sucesso para o usuário.
                alert("Categoria cadastrada com sucesso");

                // Limpa os campos do formulário.
                limparCampos();

                // Atualiza a listagem de categorias.
                listarCategorias();
            } else {
                // Mostra no console a resposta recebida do back-end.
                console.log(response);

                // Mostra mensagem de erro para o usuário.
                alert("Não foi possível cadastrar a categoria");
            }
        })
        // Executa quando ocorre erro na requisição, como falha de conexão ou servidor indisponível.
        .catch(error => {
            // Mostra o erro no console para ajudar na identificação do problema.
            console.error("Erro ao cadastrar categoria: " + error);

            // Mostra mensagem de erro para o usuário.
            alert("Ocorreu um erro ao tentar cadastrar a categoria");
        })
}

// Cria a função responsável por editar uma categoria.
function editarCategoria(nomeParaEditar) {
    // Monta a URL usando a URL base e o id da categoria que será editada.
    const url = `${urlBase}/${idParaEditar}`;

    // Cria o objeto que será enviado no corpo da requisição.
    const dados = {
        // Define o novo nome da categoria.
        nome: nomeParaEditar
    }

    // Faz a requisição para editar a categoria no back-end.
    fetch(url, {
        // Define o método HTTP PUT, usado para editar.
        method: "PUT",

        // Define os cabeçalhos da requisição.
        headers: {
            // Informa que os dados enviados estão no formato JSON.
            "Content-Type": "application/json"
        },

        // Converte o objeto dados para JSON em formato de texto.
        body: JSON.stringify(dados)
    })
        // Executa quando o back-end responde a requisição.
        .then(response => {
            // Verifica se o status é 204, que indica alteração realizada sem conteúdo de retorno.
            if (response.status === 204) {
                // Mostra mensagem de sucesso para o usuário.
                alert("Categoria alterada com sucesso");

                // Limpa os campos do formulário.
                limparCampos();

                // Atualiza a listagem de categorias.
                listarCategorias();
            } else if (response.status === 404) {
                // Mostra mensagem quando a categoria não é encontrada.
                alert("Não foi possível encontrar a categoria");
            } else {
                // Mostra mensagem para outros erros de alteração.
                alert("Não foi possível alterar a categoria");
            }
        })
        // Executa quando ocorre erro na requisição, como falha de conexão ou servidor indisponível.
        .catch(error => {
            // Mostra o erro no console para ajudar na identificação do problema.
            console.error("Erro ao editar categoria: " + error);

            // Mostra mensagem de erro para o usuário.
            alert("Ocorreu um erro ao tentar alterar a categoria");
        })
}

// Cria a função responsável por listar as categorias.
function listarCategorias() {
    // Limpa o conteúdo atual da tabela.
    corpoTabela.innerHTML = "";

    // Faz a requisição para buscar as categorias no back-end.
    fetch(urlBase)
        // Converte a resposta do back-end de JSON em texto para objeto JavaScript.
        .then(response => response.json())

        // Executa quando a lista de categorias já foi convertida.
        .then(categorias => {
            // Percorre todas as categorias retornadas pelo back-end.
            for (let i = 0; i < categorias.length; i++) {
                // Pega a categoria da posição atual do array.
                const categoria = categorias[i];

                // Cria uma linha na tabela para a categoria atual.
                criarLinha(categoria);
            }

            // Adiciona os eventos de clique nos botões criados dentro da tabela.
            adicionarCliqueBotoesLinhas();
        })
        // Executa quando ocorre erro na requisição, como falha de conexão ou servidor indisponível.
        .catch(error => {
            // Mostra o erro no console para ajudar na identificação do problema.
            console.error("Erro ao listar categorias: " + error);

            // Mostra mensagem de erro para o usuário.
            alert("Ocorreu um erro ao tentar listar as categorias");
        })
}

// Cria a função responsável por montar uma linha da tabela.
function criarLinha(categoria) {
    // Cria o HTML da linha da tabela usando os dados da categoria.
    const linha = `<tr>
        <td>${categoria.id}</td>
        <td>${categoria.nome}</td>
        <td>
            <button class="botao-editar" data-id="${categoria.id}">
                <i class="fa-solid fa-pencil"></i> Editar
            </button>
            <button class="botao-apagar" data-id="${categoria.id}">
                <i class="fa-solid fa-trash"></i> Apagar
            </button>
        </td>
    </tr>`

    // Adiciona a nova linha ao conteúdo atual da tabela.
    corpoTabela.innerHTML = corpoTabela.innerHTML + linha;
}

// Cria a função responsável por adicionar clique nos botões da tabela.
function adicionarCliqueBotoesLinhas() {
    // Pega todos os botões de apagar existentes na tabela.
    const botoesApagar = document.getElementsByClassName("botao-apagar");

    // Percorre todos os botões de apagar.
    for (let i = 0; i < botoesApagar.length; i++) {
        // Pega o botão de apagar da posição atual.
        const botaoApagar = botoesApagar[i];

        // Adiciona o evento de clique no botão de apagar.
        botaoApagar.addEventListener("click", apagarCategoria);
    }

    // Pega todos os botões de editar existentes na tabela.
    const botoesEditar = document.getElementsByClassName("botao-editar");

    // Percorre todos os botões de editar.
    for (let i = 0; i < botoesEditar.length; i++) {
        // Pega o botão de editar da posição atual.
        const botaoEditar = botoesEditar[i];

        // Adiciona o evento de clique no botão de editar.
        botaoEditar.addEventListener("click", preencherCamposParaEditar);
    }
}

// Cria a função responsável por apagar uma categoria.
function apagarCategoria(evento) {
    // Pega o elemento que recebeu o clique.
    const botaoApagar = evento.target;

    // Pega o id da categoria que está no atributo data-id do botão.
    const idParaApagar = botaoApagar.getAttribute("data-id");

    // Mostra uma confirmação para o usuário antes de apagar.
    const confirmacaoApagar = confirm("Deseja realmente apagar?");

    // Verifica se o usuário não confirmou a exclusão.
    if(confirmacaoApagar !== true){
        // Encerra a função sem apagar a categoria.
        return;
    }

    // Monta a URL usando a URL base e o id da categoria que será apagada.
    const url = `${urlBase}/${idParaApagar}`

    // Faz a requisição para apagar a categoria no back-end.
    fetch(url, {
        // Define o método HTTP DELETE, usado para apagar.
        method: "DELETE"
    })
        // Executa quando o back-end responde a requisição.
        .then(response => {
            // Verifica se o status é 204, que indica exclusão realizada sem conteúdo de retorno.
            if (response.status === 204) {
                // Mostra mensagem de sucesso para o usuário.
                alert("Categoria apagada com sucesso");

                // Atualiza a listagem de categorias.
                listarCategorias();
            } else {
                // Mostra mensagem caso a categoria não consiga ser apagada.
                alert("Não foi possível apagar a categoria");
            }
        })
        // Executa quando ocorre erro na requisição, como falha de conexão ou servidor indisponível.
        .catch(error => {
            // Mostra o erro no console para ajudar na identificação do problema.
            console.error("Erro ao apagar categoria: " + error);

            // Mostra mensagem de erro para o usuário.
            alert("Ocorreu um erro ao tentar apagar a categoria");
        })
}

// Cria a função responsável por preencher o formulário para edição.
function preencherCamposParaEditar(evento) {
    // Pega o elemento que recebeu o clique.
    const botaoEditar = evento.target;

    // Pega o id da categoria no atributo data-id e guarda na variável de edição.
    idParaEditar = botaoEditar.getAttribute("data-id");

    // Monta a URL usando a URL base e o id da categoria que será buscada.
    const url = `${urlBase}/${idParaEditar}`;

    // Faz a requisição para buscar os dados da categoria no back-end.
    fetch(url)
        // Converte a resposta do back-end de JSON em texto para objeto JavaScript.
        .then(response => response.json())

        // Executa quando a categoria já foi convertida.
        .then(categoria => {
            // Coloca o nome da categoria dentro do campo de texto.
            campoNome.value = categoria.nome;
        })
        // Executa quando ocorre erro na requisição, como falha de conexão ou servidor indisponível.
        .catch(error => {
            // Mostra o erro no console para ajudar na identificação do problema.
            console.error("Erro ao buscar categoria para edição: " + error);

            // Mostra mensagem de erro para o usuário.
            alert("Ocorreu um erro ao tentar buscar a categoria");
        })
}

// Carrega as categorias quando a página é inicializada.
listarCategorias();