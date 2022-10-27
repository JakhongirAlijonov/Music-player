const container = document.getElementById('container')
const audio = document.getElementById('audio')
const cover = document.getElementById('cover')
const title = document.getElementById('title')
const start = document.getElementById('start')
const end = document.getElementById('end')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')
const volume = document.getElementById('volume')
    // music names

const songs = [
    'leave a light on',
    'losing interests',
    'talking to the moon',
    'violin-music',
]
let songIndex = 0;

loadSong(songs[songIndex])

function loadSong(song) {
    title.textContent = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`
}

// eventListeners

function playSong() {
    container.classList.add('play')
    playBtn.innerHTML = `<i class="fas fa-pause"</i>`
    audio.play()
}

function pauseSong() {
    container.classList.remove('play')
    playBtn.innerHTML = `<i class="fas fa-play"</i>`
    audio.pause()
}

playBtn.addEventListener('click', function() {
    const isPlaying = container.classList.contains('play')
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

// setProgress
function progres(e) {
    const currentTime = e.srcElement.currentTime
    const duration = e.srcElement.duration
    const persentgeWidth = ((currentTime / duration) * 100)
    progress.style.width = `${persentgeWidth}%`
    const endMusic = Math.floor(duration / 60)

    const endSeconds = Math.floor(duration % 60)

    // start
    const startMusic = Math.floor(currentTime / 60)

    const startSeconds = Math.floor(currentTime % 60)
    end.textContent = `${endMusic}:${endSeconds ==endSeconds<10 ? '0'+ endSeconds :endSeconds} `
    start.textContent = `${startMusic}: ${startSeconds == startSeconds < 10 ? '0'+ startSeconds :startSeconds }`
}

function setProgress(e) {
    const width = this.clientWidth
    const widthX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (widthX / width) * duration
}



function nextMusic() {
    container.classList.add('play')
    playBtn.innerHTML = `<i class="fas fa-pause"</i>`
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex])
    audio.play()
}

function changeVolume() {
    const volumeMusic = +volume.value / +volume.max
    audio.volume = volumeMusic

}


function prevMusic() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    audio.play()
    loadSong(songs[songIndex])
}
prevBtn.addEventListener('click', prevMusic)
nextBtn.addEventListener('click', nextMusic)

audio.addEventListener('timeupdate', progres)
audio.addEventListener('ended', nextMusic)
volume.addEventListener('change', changeVolume)
//some changes


progressContainer.addEventListener('click', setProgress)
