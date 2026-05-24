const apiURL = 'http://localhost:3000/usuarios';

async function cadastrar() {
    const inpEmail = document.getElementById('iemail');
    const inpNome = document.getElementById('inome');
    const inpSenha = document.getElementById('isenha');
    const msg = document.getElementById('msg');

    if (!inpEmail.checkValidity()) {
        msg.innerHTML = "Por favor, insira um e-mail válido.";
        msg.style.display = 'block';
        return;
    }

    if (inpSenha.validity.tooShort) {
    msg.innerHTML = `A senha deve ter no mínimo ${inpSenha.minLength} caracteres.`;
    msg.style.display = 'block';
    return; 
    }


const novoCadastro = {
        email: inpEmail.value,
        nome: inpNome.value,
        senha: inpSenha.value
    };

const response = await fetch(apiURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(novoCadastro)
    });
    

const resultado = await response.json();

    if (response.status === 400) {

        alert(resultado.mensagem); 

    } else if (response.status === 201) {
        alert("Usuário cadastrado com sucesso!");

        localStorage.setItem('nomeGuardado', inpNome.value);

        inpEmail.value = '';
        inpNome.value = '';
        inpSenha.value = '';
        if(msg) msg.style.display = 'none';

        setTimeout(() => {
        window.location.replace('telaPrincipal.html');
    }, 500);
} else{
        alert("Erro interno no servidor.");
    }

}  

    

async function logar() {
    const response = await fetch(apiURL);
    const usuarios = await response.json();

    const nome = document.getElementById('inome');
    const senha = document.getElementById('isenha');
    const msg = document.getElementById('msg');

    if (senha.validity.tooShort) {
    msg.innerHTML = `A senha deve ter no mínimo ${senha.minLength} caracteres.`;
    msg.style.display = 'block';
    return; 
}

    const achou = usuarios.find(u => u.nome == nome.value && u.senha == senha.value);

    if(achou){
        msg.innerHTML = 'Login efetuado com sucesso!';
        msg.style.color = 'green';     
        msg.style.display = 'block';

        localStorage.setItem('nomeGuardado', achou.nome);
            if(achou.funcao == "usuario"){
                setTimeout(() => {
                window.location.replace('telaPrincipal.html');
                }, 1500); 
            }else{
                setTimeout(() => {
                window.location.replace('listarUsuarios.html');
                }, 1500); 
            }

        }else {
        msg.innerHTML = 'Dados incorretos';
        msg.style.color = 'red';      
        msg.style.display = 'block';      
    }
}