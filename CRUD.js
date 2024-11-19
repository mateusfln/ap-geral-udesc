const clientes = [];
let clienteEditandoIndex = -1; 

function adicionarCliente() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const endereco = document.getElementById('endereco').value.trim();

    
    if (!validarNome(nome)) {
        exibirFlashMessage("O nome não pode estar vazio", "error");
        return false;
    }

    if (!validarEmail(email)) {
        exibirFlashMessage("Por favor, insira um e-mail válido", "error");
        return false;
    }

    if (!validarTelefone(telefone)) {
        exibirFlashMessage("O telefone deve ter 10 ou 11 dígitos", "error");
        return false;
    }

    if (!validarEndereco(endereco)) {
        exibirFlashMessage("O endereço não pode estar vazio", "error");
        return false;
    }

    if (clienteEditandoIndex !== -1) {
        clientes[clienteEditandoIndex] = { nome, email, telefone, endereco };
    } else {
        const cliente = { nome, email, telefone, endereco };
        clientes.push(cliente);
    }
    exibirFlashMessage("Dados inseridos com sucesso!", "success");
    atualizarTabela();
    limparFormulario();
    return false; 
}

function validarNome(nome) {
    return nome.length > 0;
}


function validarEmail(email) {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regexEmail.test(email);
}


function validarTelefone(telefone) {
    const telefoneLimpo = telefone.replace(/\D/g, ''); 
    return telefoneLimpo.length === 10 || telefoneLimpo.length === 11;
}


function validarEndereco(endereco) {
    return endereco.length > 0;
}


function limparFormulario() {
    document.getElementById('formCadastro').reset();
    clienteEditandoIndex = -1; 
}


function atualizarTabela() {
    const tbody = document.getElementById('tabelaClientes').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; 

    
    clientes.forEach((cliente, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefone}</td>
            <td>${cliente.endereco}</td>
            <td>
                <button class="button-edit" onclick="editarCliente(${index})">Editar</button>
                <button class="button-delete" onclick="excluirCliente(${index})">Excluir</button>
            </td>
        `;
    });
}


function excluirCliente(index) {
    const confirmar = confirm("Você realmente deseja excluir este cliente?");
    if (confirmar) {
        clientes.splice(index, 1);  
        exibirFlashMessage("Cliente excluído com sucesso!", "success");
        atualizarTabela();
    }
}

function editarCliente(index) {
    const cliente = clientes[index];
    
    document.getElementById('nome').value = cliente.nome;
    document.getElementById('email').value = cliente.email;
    document.getElementById('telefone').value = cliente.telefone;
    document.getElementById('endereco').value = cliente.endereco;

    clienteEditandoIndex = index;
}

function mascaraTelefone(input) {
    let telefone = input.value.replace(/\D/g, ''); 
    if (telefone.length <= 10) {
        telefone = telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3'); 
    } else {
        telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'); 
    }
    input.value = telefone; 
}

function exibirFlashMessage(mensagem, tipo) {
    const flashMessageElement = document.getElementById('flashMessage');
    const flashIcon = document.getElementById('flashIcon');
    const flashText = document.getElementById('flashText');

    flashText.textContent = mensagem;

    flashMessageElement.classList.remove("success", "error");
    flashMessageElement.classList.add(tipo);

    if (tipo === "success") {
        flashIcon.textContent = "check_circle";
    } else {
        flashIcon.textContent = "error";
    }

    flashMessageElement.classList.add("show");

    setTimeout(() => {
        flashMessageElement.classList.remove("show");
    }, 3000);
}
