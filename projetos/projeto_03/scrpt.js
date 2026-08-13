const frases = [
    "Nem todo dia precisa ser produtivo para ter valor.",
    "Você não precisa ter tudo resolvido para continuar.",
    "Às vezes, descansar também faz parte do progresso.",
    "Faça o que estiver ao seu alcance com o que você tem hoje.",
    "Mudar de direção não significa que você fracassou.",
    "Algumas respostas só aparecem depois que você começa.",
    "Não compare o seu começo com o meio de outra pessoa.",
    "Ter dúvidas não significa que você está no caminho errado.",
    "Pequenas decisões repetidas podem mudar bastante coisa.",
    "Você pode recomeçar sem precisar justificar o que aconteceu."
]

const fraseTexto = document.querySelector(".frase")
const btnFrase = document.querySelector(".btnFrase")

function mostrarFrase() {
    let indice = Math.floor(Math.random() * frases.length)
    fraseTexto.textContent = frases[indice]
}

btnFrase.addEventListener("click", function(){
    mostrarFrase()
})