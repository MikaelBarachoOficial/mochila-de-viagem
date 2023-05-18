const formulario = document.getElementById('novoItem');
const lista = document.getElementById('lista')

formulario.addEventListener('submit', evento => {
    
    evento.preventDefault();
    criaElemento(evento.target.elements['nome'].value, evento.target.elements['quantidade'].value);

})

function criaElemento (nome, quantidade) {
    //<li class="item"><strong>quantidade</strong>nome</li>

    const novoItem = document.createElement('li')
    novoItem.classList.add('item')

    const numero = document.createElement('strong')
    numero.innerHTML = quantidade
    
    novoItem.appendChild(numero)
    novoItem.innerHTML += nome

    lista.appendChild(novoItem)

    console.log(novoItem)
    console.log(lista)
}