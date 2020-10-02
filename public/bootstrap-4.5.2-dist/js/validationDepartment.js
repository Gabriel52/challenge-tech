const nome = document.getElementById('nome');

form.addEventListener('submit', validation)

function validation(event){
    if(nome.value<=0){
        event.preventDefault();
        alert('Preencha os campos')
    }
}