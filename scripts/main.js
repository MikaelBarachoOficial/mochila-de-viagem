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
    //evento.preventDefault()

    var nome = evento.target.elements['nome']
    var quantidade = evento.target.elements['quantidade']
    
     const itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value
    }
    
    const existe = itens.find(elemento => elemento.nome === nome.value)
    if (existe) {
        
        existe.quantidade = parseInt(existe.quantidade) + parseInt(quantidade.value)

    } else {

        criaElemento (itemAtual)
        itens.push (itemAtual)

    }

    localStorage.setItem('itensArmazenados', JSON.stringify(itens))

    //Reiniciando área de formulário
    nome.value = ''
    quantidade.value = ''
    nome.focus()
})

function criaElemento (item) {
    
    const novoItem = document.createElement('li')
    novoItem.classList.add('item')

    const numero = document.createElement('strong')
    numero.innerHTML = item.quantidade
    novoItem.appendChild(numero)

    novoItem.innerHTML += item.nome
    lista.appendChild(novoItem)

}

limparLista.addEventListener('click', evento => {
    let limiteDeConfirmacao = 3

    if (itens.length > limiteDeConfirmacao) {

        var confirma = window.confirm('Tem certeza de que deseja excluir todos os itens da lista?') 

    }

    if (itens.length <= limiteDeConfirmacao || confirma == true) {
        
        localStorage.clear()
        lista.innerHTML = ''
        itens = []

    }
})