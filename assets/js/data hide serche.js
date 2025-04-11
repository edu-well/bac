
    
    
    
    
    'use strict';
    
    // ===== ENHANCED ITINERARY POPUPS WITH HIDDEN DATA =====
    const initItineraryPopups = () => {
      const items = document.querySelectorAll('.itinerary-item');
      if (!items.length) return;
    
      // Create popup element with additional sections
      const popup = document.createElement('div');
      popup.className = 'itinerary-popup';
      popup.innerHTML = `
        <div class="popup-content">
          <button class="popup-close">&times;</button>
          <h3 class="popup-title"></h3>
          <div class="popup-meta">
            <span class="popup-date"></span>
            <span class="popup-rating"></span>
          </div>
          <p class="popup-description"></p>
          <div class="popup-additional">
            <h4>Additional Information</h4>
            <p class="popup-extra"></p>
          </div>
          <p class="popup-location"></p>
        </div>
      `;
      document.body.appendChild(popup);
    
      // Database of additional information (can be fetched from API instead)
      const itemDatabase = {
        "East Side Gallery": {
          date: "May 15, 2023",
          rating: "★★★★☆",
          extra: "The longest remaining section of the Berlin Wall, now an open-air gallery featuring 105 murals by artists from around the world.",
          hiddenNote: "Best visited in the morning to avoid crowds."
        },
        "Da Giuseppe Pizzeria": {
          date: "June 2, 2023",
          rating: "★★★★★",
          extra: "Authentic Neapolitan pizza cooked in a wood-fired oven imported from Italy. Try their signature 'Margherita Extra'.",
          hiddenNote: "Ask for Luigi - he makes the best pizzas!"
        },
        "Rex de Diego": {
          date: "June 10, 2023",
          rating: "★★★☆☆",
          extra: "Vibrant cocktail bar with flamenco shows every Friday night. Their sangria is made with a secret family recipe.",
          hiddenNote: "Happy hour from 5-7pm with 50% off tapas."
        }
        // Add more items as needed
      };
    
      // Click handler for items
      items.forEach(item => {
        item.addEventListener('click', () => {
          const title = item.querySelector('.item-title').textContent;
          const visibleDesc = item.querySelector('.item-description').textContent;
          const loc = item.querySelector('.item-meta').textContent;
          
          // Get additional data from our database
          const additionalData = itemDatabase[title] || {
            date: "Not specified",
            rating: "Not rated",
            extra: "No additional information available",
            hiddenNote: ""
          };
    
          // Populate popup
          popup.querySelector('.popup-title').textContent = title;
          popup.querySelector('.popup-date').textContent = additionalData.date;
          popup.querySelector('.popup-rating').textContent = additionalData.rating;
          popup.querySelector('.popup-description').textContent = visibleDesc;
          popup.querySelector('.popup-extra').textContent = additionalData.extra;
          popup.querySelector('.popup-location').textContent = `📍 ${loc}`;
          
          // Add hidden note as data attribute (can be used for analytics)
          popup.dataset.hiddenNote = additionalData.hiddenNote;
          
          popup.classList.add('active');
        });
      });
    
      // Close handlers
      popup.querySelector('.popup-close').addEventListener('click', () => {
        popup.classList.remove('active');
      });
      
      popup.addEventListener('click', (e) => {
        if (e.target === popup) popup.classList.remove('active');
      });
    };
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
      initItineraryPopups();
      
      // Your other initialization code (search, scrolling etc.)
      // initSearch();
      // initMobileScrolling();
    });
    