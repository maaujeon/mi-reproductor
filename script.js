const misCanciones = [
    { titulo: "Time to Pretend", artista: "MGMT", archivo: "01 MGMT - Time to Pretend.mp3" },
    { titulo: "Lady (Hear Me Tonight)", artista: "Modjo", archivo: "03 Modjo - Lady (Hear Me Tonight).mp3" },
    { titulo: "Black Hole Sun", artista: "Soundgarden", archivo: "07 Soundgarden - Black Hole Sun.mp3" }
];

let indiceActual = 0;
let esAleatorio = false;

const audio = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const progress = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const shuffleBtn = document.getElementById('shuffle-btn');

// Cargar canción
function cargarCancion(index) {
    indiceActual = index;
    const cancion = misCanciones[indiceActual];
    audio.src = encodeURI(cancion.archivo);
    document.getElementById('track-title').innerText = cancion.titulo;
    document.getElementById('track-artist').innerText = cancion.artista;
}

// Play / Pausa
playPauseBtn.onclick = () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerText = "⏸";
    } else {
        audio.pause();
        playPauseBtn.innerText = "▶️";
    }
};

// Siguiente / Anterior
document.getElementById('next-btn').onclick = () => {
    if (esAleatorio) {
        indiceActual = Math.floor(Math.random() * misCanciones.length);
    } else {
        indiceActual = (indiceActual + 1) % misCanciones.length;
    }
    cargarCancion(indiceActual);
    audio.play();
};

document.getElementById('prev-btn').onclick = () => {
    indiceActual = (indiceActual - 1 + misCanciones.length) % misCanciones.length;
    cargarCancion(indiceActual);
    audio.play();
};

// Modo Aleatorio
shuffleBtn.onclick = () => {
    esAleatorio = !esAleatorio;
    shuffleBtn.classList.toggle('active');
};

// Actualizar barra de progreso
audio.ontimeupdate = (e) => {
    const { duration, currentTime } = e.srcElement;
    const porcentaje = (currentTime / duration) * 100;
    progress.style.width = `${porcentaje}%`;
    
    // Actualizar números de tiempo
    document.getElementById('current-time').innerText = formatearTiempo(currentTime);
    if (duration) document.getElementById('duration').innerText = formatearTiempo(duration);
};

// Click en la barra para saltar a un punto
progressContainer.onclick = (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
};

function formatearTiempo(segundos) {
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return `${min}:${seg < 10 ? '0' : ''}${seg}`;
}

// Iniciar cargando la primera
cargarCancion(0);
