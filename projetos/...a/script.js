const listaPalavras = [
    "CASAS",
    "CARRO",
    "MORAR",
    "FELIZ",
    "AMIGO",
    "BEBER",
    "COMER",
    "JOGAR",
    "PULAR",
    "SABOR"
];

const tabuleiro = document.querySelector(".jmTermo");
const inputText = document.querySelector(".jmInput");
const btnEnviar = document.querySelector(".jmBtnEnviar");
const contador = document.querySelector(".jmH1");
const modalVitoria = document.getElementById("modalVitoria");
const modalDerrota = document.getElementById("modalDerrota");
const palavraRevelada = document.getElementById("palavraRevelada");

let tentativaAtual = 0;
let palavraCorreta = "";

function iniciarJogo() {
    palavraCorreta = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
    tentativaAtual = 0;
    contador.innerHTML = `<span class="jmGreen">0</span>/6`;

    btnEnviar.disabled = false;
    inputText.disabled = false;
    btnEnviar.style.opacity = "1";
    inputText.style.opacity = "1";

    inputText.value = "";
    inputText.focus();

    criarTabuleiro();

    modalVitoria.classList.remove("is-active");
    modalDerrota.classList.remove("is-active");
}

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

btnEnviar.addEventListener("click", verificarPalavra);
inputText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") verificarPalavra();
});

document.querySelectorAll(".btnFechar").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        iniciarJogo();
    });
});

function verificarPalavra() {
    const palavra = inputText.value.trim().toUpperCase();

    if (palavra.length !== 5) {
        alert("Digite uma palavra com 5 letras!");
        return;
    }
    if (tentativaAtual >= 6) {
        alert("Você já usou todas as tentativas!");
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
        modalVitoria.classList.add("is-active");
        finalizarJogo();
    } else if (tentativaAtual === 6) {
        palavraRevelada.textContent = palavraCorreta;
        modalDerrota.classList.add("is-active");
        finalizarJogo();
    }
}

function finalizarJogo() {
    btnEnviar.disabled = true;
    inputText.disabled = true;
    btnEnviar.style.opacity = "0.5";
    inputText.style.opacity = "0.5";
}

iniciarJogo();