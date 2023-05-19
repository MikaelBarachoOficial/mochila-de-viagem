const formulario = document.getElementById('novoItem')
const lista = document.getElementById('lista')
const limparLista = document.getElementById('limparLista')
const itensArmazenados = JSON.parse(localStorage.getItem('itensArmazenados'))
var itens = []

if (itensArmazenados != null) {
    for (let i = 0; i < itensArmazenados.length; i++) {
        lista.innerHTML += `<li class="item"><strong>${itensArmazenados[i].quantidade}</strong>${itensArmazenados[i].nome}</li>`
        const itemArmazenado = {
            'nome': itensArmazenados[i].nome,
            'quantidade': itensArmazenados[i].quantidade
        }

        itens.push(itemArmazenado)
    }
}

formulario.addEventListener('submit', evento => {
    evento.preventDefault()

    var nome = evento.target.elements['nome']
    var quantidade = evento.target.elements['quantidade']
    
    criaElemento (nome.value, quantidade.value)

    nome.value = ''
    quantidade.value = ''
    nome.focus()
})

function criaElemento (nome , quantidade) {
    
    const item = document.createElement('li')
    item.classList.add('item')

    const numero = document.createElement('strong')
    numero.innerHTML = quantidade
    item.appendChild(numero)

    item.innerHTML += nome
    lista.appendChild(item)

    //LOCAL STORAGE

    const armazenaItens = {
        'nome': nome,
        'quantidade': quantidade
    }
    itens.push(armazenaItens) 
    localStorage.setItem('itensArmazenados', JSON.stringify(itens))
}

limparLista.addEventListener('click', evento => {
    if (itens.length > 3) {

        var confirma = window.confirm('Tem certeza de que deseja excluir todos os itens da lista?') 

    }

    if (itens.length <= 3 || confirma == true) {
        
        localStorage.clear()
        lista.innerHTML = ''
        itens = []

    }
})