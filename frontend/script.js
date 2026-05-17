const apiURL = 'http://localhost:3000/usuarios';
async function cadastrar() {
    const inpNome = document.getElementById('inome');
    const inpSenha = document.getElementById('isenha');

    const novoCadastro = {
        nome: inpNome.value,
        senha: inpSenha.value
    };

    await fetch(apiURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(novoCadastro)
    });
    inpNome.value = '';
    inpSenha.value = '';
}