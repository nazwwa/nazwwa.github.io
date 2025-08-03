 // DOM Elements
        const dynamicIsland = document.getElementById('dynamicIsland');
        const overlay = document.getElementById('overlay');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const playPauseIcon = document.getElementById('playPauseIcon');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const progressBar = document.getElementById('progressBar');
        const progressBarContainer = document.getElementById('progressBarContainer');
        const currentTimeDisplay = document.getElementById('currentTime');
        const durationDisplay = document.getElementById('duration');
        const volumeSlider = document.getElementById('volumeSlider');
        const volumeProgress = document.getElementById('volumeProgress');
        const songTitle = document.getElementById('songTitle');
        const songArtist = document.getElementById('songArtist');
        const albumArt = document.getElementById('albumArt');
        const audioPlayer = document.getElementById('audioPlayer');

        // Music library
        const songs = [
            {
                title: "Happy Birthday",
                artist: "Nazwa Azkiyah",
                cover: "https://files.catbox.moe/e1y2gx.jpg",
                audio: "https://files.catbox.moe/b8yqd9.mp3" // Example audio URL
            },
            // {
            //     title: "Save Your Tears",
            //     artist: "The Weeknd",
            //     cover: "https://i.scdn.co/image/ab67616d00001e026b072f6a6b2f3a2e3a9d3400",
            //     audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" // Example audio URL
            // },
            // {
            //     title: "Starboy",
            //     artist: "The Weeknd ft. Daft Punk",
            //     cover: "https://i.scdn.co/image/ab67616d00001e02a1a5ff1d6a5a638b7a8b5544",
            //     audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" // Example audio URL
            // }
        ];

        let currentSongIndex = 0;
        let isPlaying = false;
        let isExpanded = false;
        let progressInterval;

        // Load song
        function loadSong(song) {
            songTitle.textContent = song.title;
            songArtist.textContent = song.artist;
            albumArt.src = song.cover;
            audioPlayer.src = song.audio;
            
            audioPlayer.addEventListener('loadedmetadata', () => {
                durationDisplay.textContent = formatTime(audioPlayer.duration);
            });
        }

        // Play song
        function playSong() {
            audioPlayer.play();
            playPauseIcon.textContent = '❚❚';
            isPlaying = true;
            progressInterval = setInterval(updateProgress, 1000);
        }

        // Pause song
        function pauseSong() {
            audioPlayer.pause();
            playPauseIcon.textContent = '▶';
            isPlaying = false;
            clearInterval(progressInterval);
        }

        // Previous song
        function prevSong() {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            loadSong(songs[currentSongIndex]);
            if (isPlaying) playSong();
        }

        // Next song
        function nextSong() {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            loadSong(songs[currentSongIndex]);
            if (isPlaying) playSong();
        }

        // Update progress bar
        function updateProgress() {
            const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
            currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
        }

        // Format time
        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }

        // Set volume
        function setVolume(e) {
            const volumeWidth = e.currentTarget.clientWidth;
            const clickPosition = e.offsetX;
            const volume = clickPosition / volumeWidth;
            audioPlayer.volume = volume;
            volumeProgress.style.width = `${volume * 100}%`;
        }

        // Seek song
        function seekSong(e) {
            const progressBarWidth = e.currentTarget.clientWidth;
            const clickPosition = e.offsetX;
            const seekPercentage = (clickPosition / progressBarWidth);
            audioPlayer.currentTime = seekPercentage * audioPlayer.duration;
        }

        // Toggle player visibility
        function togglePlayer() {
            if (!isExpanded) {
                dynamicIsland.classList.add('active');
                overlay.classList.add('active');
                
                setTimeout(() => {
                    dynamicIsland.classList.add('expanded');
                    isExpanded = true;
                }, 300);
            }
        }

        // Close player
        function closePlayer() {
            dynamicIsland.classList.remove('expanded');
            overlay.classList.remove('active');
            
            setTimeout(() => {
                dynamicIsland.classList.remove('active');
                isExpanded = false;
            }, 300);
        }

        // Event listeners
        dynamicIsland.addEventListener('click', togglePlayer);
        overlay.addEventListener('click', closePlayer);
        playPauseBtn.addEventListener('click', () => {
            isPlaying ? pauseSong() : playSong();
        });
        prevBtn.addEventListener('click', prevSong);
        nextBtn.addEventListener('click', nextSong);
        progressBarContainer.addEventListener('click', seekSong);
        volumeSlider.addEventListener('click', setVolume);

        // Song ended
        audioPlayer.addEventListener('ended', nextSong);

        // Initialize
        loadSong(songs[currentSongIndex]);
        audioPlayer.volume = 0.7;
        volumeProgress.style.width = '70%';
