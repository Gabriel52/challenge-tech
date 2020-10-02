//#### variaveis com os valores dos componentes #######
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const telefone = document.getElementById('telefone');
const cpf = document.getElementById('cpf');
const departamento = document.getElementById('departamento')
const form = document.querySelector('form')

//## escutador ####
form.addEventListener('submit', validation)

//##### função para validar os campos
function validation(event){
    if(nome.value<=0 || email.value <=0 || telefone.value <=0 || cpf.value <=0 ){
        event.preventDefault();
        alert('Preencha os campos')
    }
}