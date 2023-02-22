var cartaBruna = {
  nome:"Giorno Giovanna",
  imagem:"https://i.pinimg.com/originals/63/09/b7/6309b75689da2870d6336c45d2665da7.png",
  atributos:{
    ataque:100,
    defesa:100,
    magia:100
  }
}

var cartaBia = {
  nome:"Saitama",
  imagem:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLtOTjWK9XMxI0EhLqgzmvGrnccj15SRQpiw&usqp=CAU",
  atributos:{
    ataque:99,
    defesa:90,
    magia:98
  }
}

var cartaGui = {
  nome:"Meliodas",
  imagem:"https://i.pinimg.com/originals/c9/f0/d0/c9f0d0b518d45348ee8f63f31a9b143b.jpg",
  atributos:{
    ataque:92,
    defesa:80,
    magia:95
  }
}

var cartaRoni = {
  nome:"All Might",
  imagem:"https://uploads.spiritfanfiction.com/fanfics/capitulos/202004/naruto-o-heroi-supremo-18996674-130420201114.jpg",
  atributos:{
  ataque:97,
  defesa:80,
  magia:92
  }
}

var cartaNaruto = {
    nome: "Naruto",
    imagem: "https://conteudo.imguol.com.br/c/entretenimento/16/2017/06/27/naruto-1498593686428_v2_450x337.png",
    atributos: {
        ataque: 80,
        defesa: 60,
        magia: 100
    }
}

var cartaArceus = {
    nome: "Arceus",
    imagem:"https://cdn.wallpapersafari.com/60/51/m1420W.png",
    atributos: {
        ataque: 96,
        defesa: 94,
        magia: 97
    }
}

var cartaLuffy = {
    nome: "Monkey D. Luffy",
    imagem: "https://1.bp.blogspot.com/-ZlnesV5Kyrg/Xx6BTJgvABI/AAAAAAAAQfw/Kb7s3odYuZQiSPy8br8CbbaJeU9DUmS2gCNcBGAsYHQ/s640/Monkey%2BD.%2BLuffy.jpg",
    atributos: {
        ataque: 95,
        defesa: 90,
        magia: 92
    }
}

var cartaMarvel = {
    nome: "Capitã Marvel",
    imagem: "https://cinepop.com.br/wp-content/uploads/2018/09/capitamarvel21.jpg",
    atributos: {
        ataque: 90,
        defesa: 80,
        magia: 88
    }
}

var cartaMaquina
var cartaJogador
var cartas = [cartaBruna, cartaBia, cartaGui, cartaRoni, cartaNaruto, cartaArceus, cartaLuffy, cartaMarvel]
//               0           1           2          3         4            5            6           7     

var pontosJoador = 0
var pontosMaquina = 0

atualizaPlacar()
atualizaQuantidadeDeCartas()

function atualizaQuantidadeDeCartas() {
  var divQuantidadeCartas = document.getElementById('quantidade-cartas')
  var html = "Quantidade de cartas no jogo " + cartas.length
  
  divQuantidadeCartas.innerHTML = html 
}

function atualizaPlacar() {
  var divPlacar = document.getElementById('placar')
  var html = "Jogador " + pontosJoador + "/" + pontosMaquina + " Máquina"
  
  divPlacar.innerHTML = html
}

function sortearCarta() {
    var numeroCartaMaquina = parseInt(Math.random() * cartas.length)
    cartaMaquina = cartas[numeroCartaMaquina]
    cartas.splice(numeroCartaMaquina, 1)

    var numeroCartaJogador = parseInt(Math.random() * cartas.length)
    cartaJogador = cartas[numeroCartaJogador]
    cartas.splice(numeroCartaJogador, 1)

    document.getElementById('btnSortear').disabled = true
    document.getElementById('btnJogar').disabled = false

    exibeCartaJogador()
}

function exibeCartaJogador() {
    var divCartaJogador = document.getElementById("carta-jogador")
    var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`
    var nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`
    var opcoesTexto = ""

    for (var atributo in cartaJogador.atributos) {
        opcoesTexto += "<input type='radio' name='atributo' value='" + atributo + "'>" + atributo + " " + cartaJogador.atributos[atributo] + "<br>"
    }

    var html = "<div id='opcoes' class='carta-status'>"

    divCartaJogador.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
}

function obtemAtributoSelecionado() {
    var radioAtributo = document.getElementsByName('atributo')
    for (var i = 0; i < radioAtributo.length; i++) {
        if (radioAtributo[i].checked) {
            return radioAtributo[i].value
        }
    }
}

function jogar() {
    var divResultado = document.getElementById("resultado")
    var atributoSelecionado = obtemAtributoSelecionado()

    if (cartaJogador.atributos[atributoSelecionado] > cartaMaquina.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Venceu</p>'
      pontosJoador++
    } else if (cartaJogador.atributos[atributoSelecionado] < cartaMaquina.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Perdeu</p>'
      pontosMaquina++
    } else {
        htmlResultado = '<p class="resultado-final">Empatou</p>'
    }
  
    if (cartas.length == 0){
      alert("Fim de jogo")
      if (pontosJoador > pontosMaquina){
        htmlResultado = '<p class="resultado-final">Venceu</p>'
      } else if (pontosMaquina > pontosJoador) {
        htmlResultado = '<p class="resultado-final">Perdeu</p>'
      } else {
        htmlResultado = '<p class="resultado-final">Empatou</p>'
      }
    } else {
      document.getElementById('btnProximaRodada').disabled = false
    }

    divResultado.innerHTML = htmlResultado
   document.getElementById('btnJogar').disabled = true
  
  atualizaPlacar()
  exibeCartaMaquina()
  atualizaQuantidadeDeCartas()
}

function exibeCartaMaquina() {
    var divCartaMaquina = document.getElementById("carta-maquina")
    var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`
    var nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`
    var opcoesTexto = ""

    for (var atributo in cartaMaquina.atributos) {
        console.log(atributo)
        opcoesTexto += "<p type='text' name='atributo' value='" + atributo + "'>" + atributo + " " + cartaMaquina.atributos[atributo] + "<br>"
    }

    var html = "<div id='opcoes' class='carta-status --spacing'>"

    divCartaMaquina.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
}

function proximaRodada() {
  var divCartas = document.getElementById('cartas')
  
  divCartas.innerHTML = `<div id="carta-jogador" class="carta"></div> <div id="carta-maquina" class="carta"></div>`
  
  document.getElementById('btnSortear').disabled = false
  document.getElementById('btnJogar').disabled = true
  document.getElementById('btnProximaRodada').disabled = true
  
  var divResultado = document.getElementById('resultado')
  divResultado.innerHTML = ""
}