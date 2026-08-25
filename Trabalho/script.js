
const palavraCorreta = "CASAS";

const tabuleiro = document.querySelector(".jmTermo");
const inputText = document.querySelector(".jmInput");
const btnEnviar = document.querySelector(".jmBtnEnviar");
const contador = document.querySelector(".jmH1");

let tentativaAtual = 0;


function criarTabuleiro() {
    const antigo = document.querySelector(".jmQuadrado");
    if (antigo) antigo.remove();

    const quadrado = document.createElement("div");
    quadrado.classList.add("jmQuadrado");

    for (let i = 0; i < 6; i++) {
        const linha = document.createElement("div");
        linha.classList.add("linhaTabuleiro");
        for (let j = 0; j < 5; j++) {
            const casa = document.createElement("div");
            casa.classList.add("casa");
            linha.appendChild(casa);
        }
        quadrado.appendChild(linha);
    }
    tabuleiro.appendChild(quadrado);
}
criarTabuleiro();


btnEnviar.addEventListener("click", verificarPalavra);
inputText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") verificarPalavra();
});


function verificarPalavra() {
    const palavra = inputText.value.trim().toUpperCase();

    if (palavra.length !== 5) {
        alert("Digite uma palavra com 5 letras!");
        return;
    }
    if (tentativaAtual >= 6) {
        alert("Você acabou as tentativas!");
        return;
    }

    const linhas = document.querySelectorAll(".linhaTabuleiro");
    const linhaAtual = linhas[tentativaAtual];
    const casas = linhaAtual.children;

    for (let i = 0; i < 5; i++) {
        casas[i].textContent = palavra[i];

        if (palavra[i] === palavraCorreta[i]) {
            casas[i].classList.add("certo");
        } else if (palavraCorreta.includes(palavra[i])) {
            casas[i].classList.add("presente");
        } else {
            casas[i].classList.add("erro");
        }
    }

    tentativaAtual++;

    contador.innerHTML = `<span class="jmGreen">${tentativaAtual}</span>/6`;

    inputText.value = "";
    inputText.focus();

    if (palavra === palavraCorreta) {
        alert("Parabéns! Você acertou!");
        finalizarJogo();
    } else if (tentativaAtual === 6) {
        alert(`Acabaram as tentativas! A palavra era ${palavraCorreta}`);
        finalizarJogo();
    }
}

function finalizarJogo() {
    btnEnviar.disabled = true;
    inputText.disabled = true;
    btnEnviar.style.opacity = "0.5";
    inputText.style.opacity = "0.5";
}