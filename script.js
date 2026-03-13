const fileInput = document.getElementById('file-input');
const audioPlayer = document.getElementById('audio-player');
const playlist = document.getElementById('playlist');
const cover = document.getElementById('cover');
const titleTag = document.getElementById('track-title');
const artistTag = document.getElementById('track-artist');

fileInput.addEventListener('change', function(e) {
    const files = e.target.files;
    playlist.innerHTML = ""; 

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const li = document.createElement('li');
        li.innerText = file.name;
        
        li.addEventListener('click', function() {
            const url = URL.createObjectURL(file);
            audioPlayer.src = url;
            audioPlayer.play();
            
            // --- LEER METADATOS ---
            jsmediatags.read(file, {
                onSuccess: function(tag) {
                    titleTag.innerText = tag.tags.title || file.name;
                    artistTag.innerText = tag.tags.artist || "Artista Desconocido";
                    
                    if (tag.tags.picture) {
                        const { data, format } = tag.tags.picture;
                        let base64String = "";
                        for (let i = 0; i < data.length; i++) {
                            base64String += String.fromCharCode(data[i]);
                        }
                        cover.src = `data:${format};base64,${window.btoa(base64String)}`;
                    } else {
                        cover.src = "https://via.placeholder.com/150";
                    }
                }
            });
        });
        playlist.appendChild(li);
    }
});