const formulario = document.getElementById('novoItem')
const lista = document.getElementById('lista')
const limparLista = document.getElementById('limparLista')
const itensArmazenados = JSON.parse(localStorage.getItem('itensArmazenados'))
var itens = []

if (itensArmazenados != null) {
    for (let i = 0; i < itensArmazenados.length; i++) {
        
        const itemArmazenado = {
            'nome': itensArmazenados[i].nome,
            'quantidade': itensArmazenados[i].quantidade
        }

        itens.push(itemArmazenado)
        criaElemento(itemArmazenado)

    }
}

formulario.addEventListener('submit', evento => {
    evento.preventDefault()

    var nome = evento.target.elements['nome']
    var quantidade = evento.target.elements['quantidade']

    const ultimoItem = itens[itens.length - 1]
    const ultimoId = ultimoItem ? ultimoItem.id : 0
    const novoId = ultimoId + 1
    
     const itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value,
        'id': novoId
    }
    console.log(itemAtual.id)
    const existe = itens.find(elemento => elemento.nome === nome.value)
    if (existe) {
        
        existe.quantidade = quantidade.value
        atualizaElemento(existe.id, itemAtual)


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
    
    var novoItem = document.createElement('li')
    novoItem.classList.add('item')

    const numero = document.createElement('strong')
    numero.innerHTML = item.quantidade
    novoItem.appendChild(numero)

    numero.dataset.quantidade = item.id

    novoItem.innerHTML += item.nome
    lista.appendChild(novoItem)

    const botaoDelete = document.createElement('button')
    botaoDelete.innerHTML = 'X'
    botaoDelete.style.cursor = 'pointer'

    botaoDelete.addEventListener('click', function () {
        this.parentNode.remove()
        itens.splice(itens.findIndex(elemento => elemento.id === item.id), 1)
        localStorage.setItem('itensArmazenados', JSON.stringify(itens))
    })

    novoItem.appendChild(botaoDelete)


}

function atualizaElemento (identificacao, item) {
    lista.querySelector(`[data-quantidade="${identificacao}"]`).innerHTML = item.quantidade
}

limparLista.addEventListener('click', () => {
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