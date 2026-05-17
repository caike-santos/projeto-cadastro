const apiURL = 'http://localhost:3000/usuarios';

async function cadastrar() {
    const inpNome = document.getElementById('inome');
    const inpSenha = document.getElementById('isenha');

    if (inpSenha.validity.tooShort) {
    msg.innerHTML = `A senha deve ter no mínimo ${inpSenha.minLength} caracteres.`;
    msg.style.display = 'block';
    return; 
}

    const novoCadastro = {
        nome: inpNome.value,
        senha: inpSenha.value
    };

    await fetch(apiURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(novoCadastro)
    });
    localStorage.setItem('nomeGuardado', inpNome.value);
    inpNome.value = '';
    inpSenha.value = '';

    

    setTimeout(() => {
        window.location.replace('telaPrincipal.html');
    }, 500);
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
        setTimeout(() => {
            window.location.replace('telaPrincipal.html');
        }, 1500);
    }else {
        msg.innerHTML = 'Dados incorretos';
        msg.style.color = 'red';      
        msg.style.display = 'block';      
    }
}