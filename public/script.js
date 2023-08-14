const API_KEY = '';
const PLAYLIST_ID = 'PLWtaU96FyQrLFQmUxxRwSn0ClIUmrLx__';

let player;
let playlistItems = [];
let currentTrackIndex = 0;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    fetchPlaylistItems();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        playNextTrack();  // If the song ends, play the next one
    }
}

function fetchPlaylistItems() {
    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            playlistItems = data.items;
            shuffleArray(playlistItems);  // Shuffle the playlist
            playTrack(currentTrackIndex);
        })
        .catch(error => console.error("Error fetching tracks:", error));
}

function playTrack(index) {
    if (!playlistItems[index]) return;
    const videoId = playlistItems[index].snippet.resourceId.videoId;
    const thumbnailURL = playlistItems[index].snippet.thumbnails.medium.url;

    document.getElementById('thumbnail').src = thumbnailURL;  // Show the thumbnail
    player.loadVideoById(videoId);
    player.playVideo(); // Start playing
    adjustVolume(30);  // Set default volume to 30%
}

function playNextTrack() {
    currentTrackIndex++;
    playTrack(currentTrackIndex);
}

function adjustVolume(value) {
    player.setVolume(value);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
