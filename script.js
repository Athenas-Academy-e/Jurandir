const linkarquivo = "https://athenasacademy.com.br/dkweb/jurandir"
const dados = {
  luana: {
    nome: "Luana — Perícia Digital",
    crime: "Manipulação de registros",
    status: "desconhecida",
    img: linkarquivo + "/img/luana.jpg" || "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
    desc: "Responsável pela análise dos sistemas que monitoravam o boneco Jurandir. Detectou inconsistências nos logs de horário e possíveis alterações manuais nos registros do experimento.",
    videos: [
      linkarquivo + "/videos/video1.mp4",
      linkarquivo + "/videos/video5.mp4"
    ]
  },
  benicio: {
    nome: "Benicio — Engenharia Forense",
    crime: "Falha estrutural suspeita",
    status: "detido",
    img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39" || linkarquivo + "/img/benicio.jpg",
    desc: "Analisou o suporte onde o boneco Jurandir estava fixado. Os cálculos indicam que o colapso não foi causado por desgaste natural, sugerindo intervenção externa.",
    videos: [
      linkarquivo + "/videos/video2.mp4",
      linkarquivo + "/videos/video6.mp4",
    ]
  },
  cristiane: {
    nome: "Cristiane - Investigação de Cena de Crime",
    crime: "Comprometimento da cena do crime",
    status: "detida",
    img: linkarquivo + "/img/cris.jpg" || "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    desc: "Foi a primeira a chegar ao local onde Jurandir foi encontrado danificado. Alguns vestígios foram removidos antes do registro oficial, levantando dúvidas sobre a preservação da cena.",
    videos: [
      linkarquivo + "/videos/video3.mp4",
    ]
  },
  jardel: {
    nome: "Jardel — Investigação Tecnológica",
    crime: "Supressão de dados",
    status: "live",
    img: linkarquivo + "/img/jardel.png" || "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
    desc: "Teve acesso direto aos sensores e dispositivos do experimento. Parte dos dados críticos foi apagada minutos antes da perícia oficial.",
    videos: [
      linkarquivo + "/videos/video4.mp4",
    ]
  }
};

function abrir(id) {
  localStorage.setItem("suspeito", id);
  window.location = "suspeito.html";
}

if (document.getElementById("perfil")) {
  const s = dados[localStorage.getItem("suspeito")];
  document.getElementById("perfil").innerHTML = `
    <img src="${s.img}">
    <div>
      <div class="status ${s.status}">${s.status.toUpperCase()}</div>
      <h2>${s.nome}</h2>
      <p><b>Crime:</b> ${s.crime}</p>
      <p>${s.desc}</p>
      <button onclick="window.history.back()" class="button">Voltar</button>
    </div>
  `;
}


const lista = document.getElementById("lista-suspeitos");

if (lista) {
  Object.entries(dados).forEach(([id, s]) => {
    lista.innerHTML += `
      <div class="card" onclick="abrir('${id}')">
        <div class="status ${s.status}">
          ${s.status.toUpperCase()}
        </div>
        <img src="${s.img}" alt="${s.nome}">
        <h3>${s.nome}</h3>
        <span>${s.crime}</span>
      </div>
    `;
  });
}

const listaVideos = document.getElementById("lista-videos");

if (listaVideos) {
  let contadorEvidencias = 1;

  Object.values(dados).forEach(suspeito => {
    suspeito.videos.forEach(video => {
      listaVideos.innerHTML += `
        <div class="video-card" onclick="abrirVideo('${video}')">
          <video preload="metadata" muted>
            <source src="${video}" type="video/mp4">
          </video>

          <div class="play">▶</div>

          <div class="video-overlay">
            <span>EVIDÊNCIA ${contadorEvidencias}</span>
          </div>
        </div>
      `;
      contadorEvidencias++;
    });
  });
}
if (document.getElementById("total-evidencias")) {
  const total = Object.values(dados)
    .reduce((acc, s) => acc + s.videos.length, 0);

  document.getElementById("total-evidencias").innerText =
    `${total} evidências coletadas`;
}

const modal = document.getElementById("modal");
const player = document.getElementById("videoPlayer");

function abrirVideo(src) {
  modal.style.display = "flex";
  player.src = src;
  player.muted = true;
  player.currentTime = 0;
  player.play();
}

function fecharVideo() {
  player.pause();
  player.src = "";
  modal.style.display = "none";
}

modal.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

player.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});