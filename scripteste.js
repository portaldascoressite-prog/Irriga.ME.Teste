let melhorMomentoAtual = false;
let melhorMomentoAtivo = false;
let timer;

// =========================
// 🌡️ VERIFICAR CLIMA (BOTÃO)
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
    } 
    else if (umidadeSolo < 40) {
        climaDiv.style.backgroundColor = "#ef2b2b"; // vermelho
    } 
    else if (umidadeSolo < 60) {
        climaDiv.style.backgroundColor = "#f6ea05"; // amarelo
    } 
    else {
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

        // ⚠️ Pergunta se não for ideal
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
// 💧 LIGAR
// =========================
function ligarIrrigacao() {

    const switchElement = document.getElementById("toggleSwitch");
    const tempoInput = document.getElementById("tempo");

    const minutos = parseInt(tempoInput.value) || 1;
    const tempoMs = minutos * 60000;

    switchElement.checked = true;
    tempoInput.disabled = true;

    const msg = document.getElementById("mensagem");
    msg.style.display = "block";
    msg.textContent = "💧 Sistema ativo por " + minutos + " minuto(s)";

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

    // permite ligar automático de novo depois
    setTimeout(() => {
        melhorMomentoAtivo = false;
    }, 3000);
}