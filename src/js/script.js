const sectionCards = document.getElementsByTagName('section')[0]
const ul = document.getElementsByTagName('ul')[0]
const categoriaTodos = document.getElementsByTagName('a')[0]
const inputPesquisar = document.getElementsByClassName('barra-pesquisa-input')[0]  
const botaoPesquisar = document.getElementsByClassName('barra-pesquisa-botao')[0]  
const secaoProdutosCarrinho = document.getElementsByClassName('carrinho-cheio-produtos')[0]
const qtdValor = document.getElementsByClassName('quantidade-valor')[0]
const totalValor = document.getElementsByClassName('total-valor')[0]
const carrinhoVazio = document.getElementsByClassName('carrinho-vazio')[0]
const carrinhoCheio = document.getElementsByClassName('carrinho-cheio')[0]

ul.addEventListener('click', event => checarCategoria(event))
inputPesquisar.addEventListener('input', () => pesquisarHQ())
botaoPesquisar.addEventListener('click', () => pesquisarHQ())
secaoProdutosCarrinho.addEventListener('click', (event) => removerTarefa(event))

produtos.forEach(objeto => { 
    adicionarCardsVitrine(sectionCards, objeto)   
    categoriaTodos.classList.add('ativo')

    sectionCards.addEventListener('click', (event) => adicionarProdutoCarrinho(objeto, event))
})

function pesquisarHQ() {
    sectionCards.childNodes.forEach(elemento => {
        elemento.classList.remove('inativo')
    })
    
    const inputPesquisa = document.getElementsByClassName('barra-pesquisa-input')[0]
    let conteudo = inputPesquisa.value.trim().toLowerCase()

    sectionCards.childNodes.forEach(elemento => {
        let elementosFilhos = elemento.childNodes
        let divTexto = elementosFilhos[1]
        let divTextoFilhos = divTexto.childNodes
        let titulo = divTextoFilhos[1].innerText.toLowerCase()

        if (!titulo.includes(conteudo)) {
            elemento.classList.add('inativo')
        }
    })

    return sectionCards
}


function adicionarProdutoCarrinho(obj, event) {
    let elemento = event.target.tagName
    let btnId = event.target.id

    if (btnId == obj.id - 1 && elemento == 'BUTTON') {
        carrinhoVazio.classList.add('inativo')
        carrinhoCheio.classList.remove('inativo')
        
        const articleCar = document.createElement('article')
        
        const divImgCar = document.createElement('div') 
        const imgCar = document.createElement('img')

        const divWrapperTextoCar = document.createElement('div')
        const h5 = document.createElement('h5')
        const divPrecoCar = document.createElement('div')
        const btnRemover = document.createElement('button')

        articleCar.classList.add('carrinho-produto')
        divImgCar.classList.add('carrinho-produto-img')
        
        imgCar.src = obj.img
        imgCar.alt = obj.alternativeText

        divWrapperTextoCar.classList.add('carrinho-texto')
        h5.classList.add('carrinho-produto-titulo')
        divPrecoCar.classList.add('carrinho-produto-preco')
        btnRemover.classList.add('carrinho-produto-remover')

        h5.innerText = obj.nameItem
        precoCar = String(obj.value.toFixed(2))
        divPrecoCar.innerText = `R$${precoCar.replace('.', ',')}`
        
        btnRemover.innerText = obj.removeCart

        divImgCar.append(imgCar)
        divWrapperTextoCar.append(h5, divPrecoCar, btnRemover)
        articleCar.append(divImgCar, divWrapperTextoCar)
        secaoProdutosCarrinho.append(articleCar)

        carrinhoInfo(secaoProdutosCarrinho, Number(precoCar))
    }
    return secaoProdutosCarrinho
}


let precoTotalCarrinho = []
function carrinhoInfo(secaoCarrinho, preco) {
    let qtdProdutosCarrinho = secaoCarrinho.childNodes.length
    qtdValor.innerText = qtdProdutosCarrinho

    precoTotalCarrinho.push(preco)
    let precoTotal = precoTotalCarrinho.reduce((valor1, valor2) => valor1 + valor2)
    
    totalValor.innerText = `R$${precoTotal.toFixed(2)}`
    return totalValor
}


function removerTarefa(event) {
    let elemento = event.target

    if (elemento.tagName == 'BUTTON') {
        let divWrapperTextoCar = elemento.parentElement
        let articleCar = divWrapperTextoCar.parentElement

        let precoItem = divWrapperTextoCar.childNodes[1]
        let precoItemTratado = precoItem.innerText.slice(2).replace(',', '.')

        let precoAtual = totalValor.innerText.slice(2).replace(',', '.')
        let qtdAtual = qtdValor.innerText

        articleCar.classList.add('inativo')
        totalValor.innerText = `R$${(precoAtual - precoItemTratado).toFixed(2)}`
        qtdValor.innerText =  qtdAtual - 1

        if (qtdValor.innerText == 0) {
            carrinhoVazio.classList.remove('inativo')
            carrinhoCheio.classList.add('inativo')
            precoTotalCarrinho = []
        }
        articleCar.remove()
    }

    return elemento
}


function checarCategoria(event) {
    sectionCards.childNodes.forEach(elemento => {
        elemento.classList.remove('inativo')
    })

    let categoria = event.target.innerText

    sectionCards.childNodes.forEach(elemento => {
        let elementosFilhos = elemento.childNodes
        let divTexto = elementosFilhos[1]
        let divTextoFilhos = divTexto.childNodes
        let tag = divTextoFilhos[0].innerText

        if (categoria != tag && categoria != 'Todos') {
            elemento.classList.add('inativo')
            categoriaTodos.classList.remove('ativo')

        } else if (categoria == 'Todos') {
            elemento.classList.remove('inativo')
        }
    })

    return sectionCards
}


function adicionarCardsVitrine(secao, obj) {
    const article = document.createElement('article')
    
    const divImg = document.createElement('div') 
    const img = document.createElement('img')

    const divWrapperTexto = document.createElement('div')
    const divTag = document.createElement('div')
    const h4 = document.createElement('h4')
    const p = document.createElement('p')
    const divPreco = document.createElement('div')
    const btnAdicionar = document.createElement('button')

    article.classList.add('card')

    divImg.classList.add('card-img')
    img.src = obj.img
    img.alt = obj.alternativeText

    divWrapperTexto.classList.add('card-texto')
    divTag.classList.add('card-tag')
    h4.classList.add('card-titulo')
    p.classList.add('card-descricao')
    divPreco.classList.add('card-preco')
    
    btnAdicionar.classList.add('card-adicionar-carrinho')
    btnAdicionar.id = obj.id - 1

    divTag.innerText = obj.tag[0]
    h4.innerText = obj.nameItem
    p.innerText = obj.description
    btnAdicionar.innerText = obj.addCart
    
    preco = String(obj.value.toFixed(2))
    divPreco.innerText = `R$${preco.replace('.', ',')}`

    divImg.append(img)
    divWrapperTexto.append(divTag, h4, p, divPreco, btnAdicionar)
    article.append(divImg, divWrapperTexto)
    secao.append(article)

    return secao
}