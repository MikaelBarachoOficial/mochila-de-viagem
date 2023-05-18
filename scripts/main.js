const formulario = document.getElementById('novoItem');
const lista = document.querySelector('.lista')
var itens = []

const itensSalvos = JSON.parse(localStorage.getItem('itensArmazenados'))

if (itensSalvos != null) {
    for (let i = 0; i < itensSalvos.length; i++){
        lista.innerHTML += `<li class="item"><strong>${itensSalvos[i].quantidade}</strong>${itensSalvos[i].nome}</li>`
        
        const itemSalvo = {
            'nome': itensSalvos[i].nome,
            'quantidade': itensSalvos[i].quantidade
        }

        itens.push(itemSalvo)
    }
    
}

formulario.addEventListener('submit', evento => {
    evento.preventDefault();
    
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    criaElemento (nome.value, quantidade.value)
    nome.value = ''
    quantidade.value = ''
    document.getElementById('nome').focus();

   
})

function criaElemento (nome, quantidade) {

    lista.innerHTML += `<li class="item"><strong>${quantidade}</strong>${nome}</li>`
    
    const itemAtual = {
        'nome': nome,
        'quantidade': quantidade
    }

    itens.push(itemAtual)

    localStorage.setItem('itensArmazenados', JSON.stringify(itens)) 
    
}