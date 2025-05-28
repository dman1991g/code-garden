// Collapsible nav menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});

// YouTube player setup
const API_KEY = 'AIzaSyBYoYakgN_QlpFRXlkUB3q5gRg9h7IGqd0'; // Replace with your key
const PLAYLIST_ID = 'PL5B8BW6JuITredBRdo6kkrO2yDeD2SUDg'; // Replace with your playlist ID
let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '450',
    videoId: '', // will set this later
    events: {
      'onReady': loadPlaylistVideos
    }
  });
}

function loadPlaylistVideos() {
  fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${PLAYLIST_ID}&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const list = document.getElementById('video-list');
      list.innerHTML = '';
      const firstVideo = data.items[0]?.snippet.resourceId.videoId;
      if (firstVideo) {
        player.loadVideoById(firstVideo);
      }

      data.items.forEach(item => {
        const videoId = item.snippet.resourceId.videoId;
        const title = item.snippet.title;

        const li = document.createElement('li');
        li.textContent = title;
        li.style.cursor = 'pointer';
        li.onclick = () => player.loadVideoById(videoId);
        list.appendChild(li);
      });
    })
    .catch(err => console.error('Failed to load videos:', err));
}