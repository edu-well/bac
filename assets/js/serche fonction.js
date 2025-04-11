
    
    
        document.addEventListener('DOMContentLoaded', function() {
      const searchInput = document.getElementById('itinerarySearch');
      const itineraryItems = document.querySelectorAll('.itinerary-item');
    
      searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        itineraryItems.forEach(item => {
          const title = item.querySelector('.item-title').textContent.toLowerCase();
          const description = item.querySelector('.item-description').textContent.toLowerCase();
          
          if (title.includes(searchTerm) || description.includes(searchTerm)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
    
        // Adjust scrolling container after filtering
        const itemsContainer = document.querySelector('.itinerary-items');
        itemsContainer.scrollLeft = 0;
      });
    
      // Clear search when clicking the 'x' in search field (for browsers that show it)
      searchInput.addEventListener('search', function() {
        if (this.value === '') {
          itineraryItems.forEach(item => {
            item.style.display = 'block';
          });
        }
      });
    });
    
    
    
    
    
    
    
    
    
    
    