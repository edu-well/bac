import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Heart, Search, Bell, Home, PlusCircle, MessageCircle, User, ArrowLeft, MoreHorizontal } from 'lucide-react';

// Main App Component
const PetAdoptionApp = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [selectedPet, setSelectedPet] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Cats');
  const [favorites, setFavorites] = useState({});
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'adoption', message: 'Your adoption request for Max has been approved!', time: '2h ago', read: false },
    { id: 2, type: 'message', message: 'Sophia sent you a message about Amber', time: '5h ago', read: true },
    { id: 3, type: 'event', message: 'Pet meetup this weekend at Lincoln Park', time: '1d ago', read: false }
  ]);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);

  // Sample pet data
  const pets = [
    {
      id: 1,
      name: "Amber",
      type: "Cats",
      location: "Chicago",
      distance: "5km",
      sex: "Male",
      age: "1 Year",
      weight: "10 Kg",
      description: "Amber is a cat that I found on the side of the road 1 year ago. He is now cheerful and active.",
      owner: { name: "Sophia", title: "Amber Owner" }
    },
    {
      id: 2,
      name: "Kitty",
      type: "Cats",
      location: "Evanston",
      distance: "7km",
      sex: "Female",
      age: "2 Years",
      weight: "8 Kg",
      description: "Kitty is playful and loves to chase toys. She's very friendly with children.",
      owner: { name: "Mike", title: "Kitty Owner" }
    },
    {
      id: 3,
      name: "Rex",
      type: "Dogs",
      location: "Chicago",
      distance: "3km",
      sex: "Male",
      age: "3 Years",
      weight: "15 Kg",
      description: "Rex is energetic and loves outdoor activities and playing fetch.",
      owner: { name: "James", title: "Rex Owner" }
    },
  ];

  const handleScreenChange = (screen) => {
    setCurrentScreen(screen);
  };

  const toggleFavorite = (petId, e) => {
    e?.stopPropagation();
    setFavorites(prev => ({ ...prev, [petId]: !prev[petId] }));
  };

  // Screen Components
  const WelcomeScreen = () => (
    <div className="welcome-screen">
      <div className="illustration"></div>
      <h1>Find Your <span>Dream</span> Pet</h1>
      <p>Join us and discover the best pet in your location</p>
      <button onClick={() => handleScreenChange('home')}>Continue</button>
    </div>
  );

  const HomeScreen = () => (
    <div className="home-screen">
      <header>
        <div className="location">Chicago, US</div>
        <div className="icons">
          <Search size={20} />
          <Bell size={20} onClick={() => setShowNotificationPanel(true)} />
        </div>
      </header>
      <main>
        <div className="categories">
          {['Cats', 'Dogs', 'Birds', 'Fish'].map(category => (
            <button 
              key={category}
              className={activeCategory === category ? 'active' : ''}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="pet-list">
          {pets.filter(pet => pet.type === activeCategory).map(pet => (
            <div key={pet.id} className="pet-card" onClick={() => {
              setSelectedPet(pet);
              handleScreenChange('petDetail');
            }}>
              <div className="pet-image"></div>
              <Heart 
                size={16} 
                className={`heart ${favorites[pet.id] ? 'active' : ''}`} 
                onClick={(e) => toggleFavorite(pet.id, e)}
              />
              <h3>{pet.name}</h3>
              <p>📍 {pet.location} ({pet.distance})</p>
            </div>
          ))}
        </div>
      </main>
      <nav>
        <button className="active"><Home size={20} /> Home</button>
        <button><Heart size={20} /> Favorites</button>
        <button className="add-btn"><PlusCircle size={24} /></button>
        <button><MessageCircle size={20} /> Messages</button>
        <button><User size={20} /> Profile</button>
      </nav>
    </div>
  );

  const PetDetailScreen = () => (
    <div className="pet-detail-screen">
      <header>
        <ArrowLeft size={20} onClick={() => handleScreenChange('home')} />
        <MoreHorizontal size={20} />
      </header>
      <div className="pet-image-large"></div>
      <div className="pet-info">
        <h1>{selectedPet.name}</h1>
        <p>📍 {selectedPet.location} ({selectedPet.distance})</p>
        <div className="stats">
          <div><span>Sex</span>{selectedPet.sex}</div>
          <div><span>Age</span>{selectedPet.age}</div>
          <div><span>Weight</span>{selectedPet.weight}</div>
        </div>
        <p className="description">{selectedPet.description}</p>
        <button className="adopt-btn">Adopt Me</button>
      </div>
    </div>
  );

  // Render current screen
  const renderScreen = () => {
    switch(currentScreen) {
      case 'welcome': return <WelcomeScreen />;
      case 'home': return <HomeScreen />;
      case 'petDetail': return <PetDetailScreen />;
      default: return <WelcomeScreen />;
    }
  };

  return (
    <div className="app">
      {renderScreen()}
      
      {/* Notification Panel */}
      {showNotificationPanel && (
        <div className="notification-panel">
          <div className="notification-header">
            <h2>Notifications</h2>
            <button onClick={() => setShowNotificationPanel(false)}>×</button>
          </div>
          <div className="notification-list">
            {notifications.map(notification => (
              <div key={notification.id} className={`notification ${notification.read ? '' : 'unread'}`}>
                <p>{notification.message}</p>
                <span>{notification.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Styles (in same file using template literals)
const styles = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .app {
    max-width: 420px;
    margin: 0 auto;
    min-height: 100vh;
    background: #f0f8ff;
    position: relative;
    overflow: hidden;
  }

  /* Welcome Screen Styles */
  .welcome-screen {
    padding: 2rem;
    text-align: center;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, #e6f2ff, #f0f8ff);
  }

  /* Home Screen Styles */
  .home-screen {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  /* Add all other CSS styles here... */
`;

// Inject styles into the document
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

// Render the app
ReactDOM.render(<PetAdoptionApp />, document.getElementById('root'));