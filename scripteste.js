let melhorMomentoAtual = false;
let melhorMomentoAtivo = false;
let timer;

// =========================
// 🌡️ VERIFICAR CLIMA
// =========================
function verificarClima() {
    const temperatura = parseFloat(document.getElementById("temperatura").value);
    const umidadeSolo = parseFloat(document.getElementById("umidade").value);
    const climaDiv = document.querySelector(".dados-clima");

    if (isNaN(temperatura) || isNaN(umidadeSolo)) {
        alert("⚠️ Preencha os valores!");
        return;
    }

    const melhorMomento = temperatura >= 16 && temperatura <= 25 && umidadeSolo < 40;
    melhorMomentoAtual = melhorMomento;

    // 🎨 CORES
    if (melhorMomento) {
        climaDiv.style.backgroundColor = "#42d6d6"; // azul
    } else if (umidadeSolo < 40) {
        climaDiv.style.backgroundColor = "#ef2b2b"; // vermelho
    } else if (umidadeSolo < 60) {
        climaDiv.style.backgroundColor = "#f6ea05"; // amarelo
    } else {
        climaDiv.style.backgroundColor = "#28ed81"; // verde
    }

    document.getElementById("melhorMomento").textContent =
        "Melhor Momento de Irrigação: " + (melhorMomento ? "Sim" : "Não");

    // ⚡ LIGA AUTOMATICAMENTE
    if (melhorMomento && !melhorMomentoAtivo) {
        melhorMomentoAtivo = true;
        ligarIrrigacao();
    }
}

// =========================
// 🔘 SWITCH
// =========================
document.getElementById("toggleSwitch").addEventListener("change", function () {
    if (this.checked) {
        if (!melhorMomentoAtual) {
            let confirmar = confirm("⚠️ Não é o melhor momento.\nDeseja ligar mesmo assim?");
            if (!confirmar) {
                this.checked = false;
                return;
            }
        }
        ligarIrrigacao();
    } else {
        desligarIrrigacao();
    }
});

// =========================
// 💧 LIGAR (AGORA COM DECIMAIS)
// =========================
function ligarIrrigacao() {
    const switchElement = document.getElementById("toggleSwitch");
    const tempoInput = document.getElementById("tempo");

    // 🟢 MUDANÇA AQUI: parseFloat permite 0.05
    const minutos = parseFloat(tempoInput.value) || 0.1; 
    const tempoMs = minutos * 60000;

    switchElement.checked = true;
    tempoInput.disabled = true;

    const msg = document.getElementById("mensagem");
    msg.style.display = "block";

    // Lógica para exibir segundos se for valor baixo
    if (minutos < 1) {
        const segundos = Math.round(minutos * 60);
        msg.textContent = `💧 Sistema ativo por ${segundos} segundo(s)`;
    } else {
        msg.textContent = `💧 Sistema ativo por ${minutos} minuto(s)`;
    }

    clearTimeout(timer);

    timer = setTimeout(() => {
        desligarIrrigacao();
    }, tempoMs);
}

// =========================
// ❌ DESLIGAR
// =========================
function desligarIrrigacao() {
    clearTimeout(timer);

    document.getElementById("toggleSwitch").checked = false;
    document.getElementById("tempo").disabled = false;
    document.getElementById("mensagem").style.display = "none";

    // permite ligar automático de novo depois de um pequeno intervalo
    setTimeout(() => {
        melhorMomentoAtivo = false;
    }, 3000);
}

// Lógica do Modal (opcional, para garantir que funcione)
const modal = document.getElementById("modalSistema");
const btn = document.getElementById("botaoSistema");
const span = document.getElementsByClassName("fechar")[0];

if(btn) btn.onclick = () => modal.style.display = "block";
if(span) span.onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; }
