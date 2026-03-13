// Lista con los nombres EXACTOS de tus archivos subidos
const misCanciones = [
    { titulo: "Time to Pretend", artista: "MGMT", archivo: "01 MGMT - Time to Pretend.mp3" },
    { titulo: "Lady (Hear Me Tonight)", artista: "Modjo", archivo: "03 Modjo - Lady (Hear Me Tonight).mp3" },
    { titulo: "Black Hole Sun", artista: "Soundgarden", archivo: "07 Soundgarden - Black Hole Sun.mp3" }
];

const playlist = document.getElementById('playlist');
const audioPlayer = document.getElementById('audio-player');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');

// Esta función genera la lista visual en tu web
misCanciones.forEach(cancion => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${cancion.titulo}</strong> - ${cancion.artista}`;
    
    li.onclick = () => {
        // encodeURI ayuda a que los espacios en blanco no rompan el link
        audioPlayer.src = encodeURI(cancion.archivo);
        audioPlayer.play();
        
        // Actualizamos los textos de la pantalla
        trackTitle.innerText = cancion.titulo;
        trackArtist.innerText = cancion.artista;
    };
    
    playlist.appendChild(li);
});
