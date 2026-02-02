// ===============================
// QUESTÕES (5 vídeos .mov)
// ===============================

const questoes = [
  "video/R1.mov",
  "video/R2.mov",
  "video/R3.mov",
  "video/R4.mov",
  "video/R5.mov",
];

// (troque os textos depois como quiser)
const respostas = {
  "video/R1.mov": "Resposta da questão 1.",
  "video/R2.mov": "Resposta da questão 2.",
  "video/R3.mov": "Resposta da questão 3.",
  "video/R4.mov": "Resposta da questão 4.",
  "video/R5.mov": "Resposta da questão 5.",
};

// ===============================
// ELEMENTOS
// ===============================

const videoEl = document.getElementById("videoQuestao");
const timerEl = document.getElementById("timer");

const respostaBtn = document.getElementById("respostaBtn");
const proximaBtn = document.getElementById("proximaBtn");

const respostaBox = document.getElementById("respostaBox");
const respostaTexto = document.getElementById("respostaTexto");

// ===============================
// CONTROLE
// ===============================

let questaoAtual = null;
let tempoRestante = 300; // 5 minutos
let intervalo = null;

// ===============================
// FUNÇÕES
// ===============================

function formatarTempo(segundos) {
  const m = String(Math.floor(segundos / 60)).padStart(2, "0");
  const s = String(segundos % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function atualizarTimerUI() {
  timerEl.textContent = formatarTempo(tempoRestante);
}

function pararTimer() {
  if (intervalo) clearInterval(intervalo);
  intervalo = null;
}

function iniciarTimer() {
  pararTimer();
  atualizarTimerUI();

  intervalo = setInterval(() => {
    tempoRestante--;
    atualizarTimerUI();

    if (tempoRestante <= 0) {
      pararTimer();
      sortearQuestao();
    }
  }, 1000);
}

function tocarVideo(src) {
  videoEl.src = src;
  videoEl.muted = true;
  videoEl.playsInline = true;
  videoEl.autoplay = true;
  videoEl.controls = false;

  videoEl.load();
  videoEl.play().catch(() => {
    // se o navegador barrar autoplay por algum motivo
    // (em geral, com muted, funciona)
  });
}

function esconderResposta() {
  respostaTexto.textContent = "";
  respostaBox.classList.add("hidden");
}

function mostrarResposta() {
  const texto = respostas[questaoAtual] || "Resposta não cadastrada.";
  respostaTexto.textContent = texto;
  respostaBox.classList.remove("hidden");
}

function sortearQuestao() {
  // escolhe aleatória
  const sorteada = questoes[Math.floor(Math.random() * questoes.length)];
  questaoAtual = sorteada;

  // atualiza vídeo
  tocarVideo(questaoAtual);

  // reseta resposta
  esconderResposta();

  // reinicia timer
  tempoRestante = 300;
  iniciarTimer();
}

// ===============================
// EVENTOS
// ===============================

respostaBtn.addEventListener("click", () => {
  pararTimer();      // pausa timer
  mostrarResposta(); // mostra resposta na tela
});

proximaBtn.addEventListener("click", () => {
  sortearQuestao();  // sorteia outra e reinicia tudo
});

// ===============================
// INÍCIO
// ===============================

atualizarTimerUI();
sortearQuestao();
