
document.addEventListener('DOMContentLoaded', function() {
    const playlistItems = document.querySelectorAll('.playlist-item');
    const mainVideo = document.getElementById('main-video');
    const videoTitle = document.getElementById('video-title');
    const videoDescription = document.getElementById('video-description');
    const likeBtn = document.querySelector('.action-btn.like');
    
    // Handle playlist item clicks
    playlistItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            playlistItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get video data from data attributes
            const videoId = this.getAttribute('data-video-id');
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            
            // Update video player
            mainVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;
            videoTitle.textContent = title;
            videoDescription.textContent = description.replace(/&#10;/g, '\n');
            
            // Scroll to top of video section
            document.querySelector('.pro-video-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Like button functionality
    likeBtn.addEventListener('click', function() {
        this.classList.toggle('active');
    });
    
    // Initialize with first video
    const firstVideo = document.querySelector('.playlist-item.active');
    if (firstVideo) {
        const videoId = firstVideo.getAttribute('data-video-id');
        const title = firstVideo.getAttribute('data-title');
        const description = firstVideo.getAttribute('data-description');
        
        mainVideo.src = `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`;
        videoTitle.textContent = title;
        videoDescription.textContent = description.replace(/&#10;/g, '\n');
    }
});


