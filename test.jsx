import React, { useState, useEffect } from 'react';
import { Heart, Search, Bell, Home, BookOpen, PlusCircle, MessageCircle, User, ArrowLeft, MoreHorizontal } from 'lucide-react';

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
  const [pageTransition, setPageTransition] = useState('fade');

  useEffect(() => {
    // Check if user has visited before (could use localStorage in a real app)
    const hasVisitedBefore = false;
    if (hasVisitedBefore) {
      setCurrentScreen('home');
    }
  }, []);

  const handleScreenChange = (screen, transition = 'fade') => {
    setPageTransition(transition);
    setCurrentScreen(screen);
  };

  const handleContinue = () => {
    handleScreenChange('home', 'slide-up');
  };

  const handlePetSelect = (pet) => {
    setSelectedPet(pet);
    handleScreenChange('petDetail', 'slide-left');
  };

  const handleBackToHome = () => {
    handleScreenChange('home', 'slide-right');
  };

  const toggleFavorite = (petId, event) => {
    if (event) {
      event.stopPropagation();
    }
    setFavorites(prev => ({
      ...prev,
      [petId]: !prev[petId]
    }));
  };

  const toggleNotificationPanel = () => {
    setShowNotificationPanel(!showNotificationPanel);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(note => 
        note.id === id ? {...note, read: true} : note
      )
    );
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Render the appropriate screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onContinue={handleContinue} />;
      case 'home':
        return <HomeScreen 
          onPetSelect={handlePetSelect} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onNavigate={handleScreenChange}
          notifications={notifications}
          toggleNotificationPanel={toggleNotificationPanel}
          unreadNotificationsCount={unreadNotificationsCount}
        />;
      case 'petDetail':
        return <PetDetailScreen 
          pet={selectedPet} 
          onBack={handleBackToHome} 
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />;
      case 'favorites':
        return <FavoritesScreen 
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onPetSelect={handlePetSelect}
          onBack={() => handleScreenChange('home', 'slide-right')}
          onNavigate={handleScreenChange}
        />;
      case 'profile':
        return <ProfileScreen 
          onBack={() => handleScreenChange('home', 'slide-right')}
          onNavigate={handleScreenChange}
        />;
      default:
        return <WelcomeScreen onContinue={handleContinue} />;
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 font-sans overflow-hidden">
      <div className={`transition-all duration-300 ${pageTransition === 'slide-left' ? 'translate-x-[-100%]' : 
                          pageTransition === 'slide-right' ? 'translate-x-[100%]' : 
                          pageTransition === 'slide-up' ? 'translate-y-[-100%]' : ''}`}>
        {renderScreen()}
      </div>
      
      {/* Notification Panel */}
      {showNotificationPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={toggleNotificationPanel}>
          <div 
            className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-lg p-4 animate-slide-in-right"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Notifications</h2>
              <button className="text-gray-500">Mark all as read</button>
            </div>
            
            <div className="overflow-y-auto max-h-[90vh]">
              {notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`p-3 mb-2 rounded-lg border-l-4 ${
                    notification.read ? 'bg-gray-50 border-gray-300' : 'bg-blue-50 border-blue-500'
                  }`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{notification.type === 'adoption' ? '🐾' : 
                                                   notification.type === 'message' ? '💬' : '🎉'} 
                      {notification.message}
                    </span>
                    {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                  </div>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Welcome Screen Component
const WelcomeScreen = ({ onContinue }) => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6 bg-gradient-to-b from-blue-100 to-blue-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-blue-200 opacity-30"
            style={{
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 5 + 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <div 
            key={`paw-${i}`} 
            className="absolute bg-yellow-100 opacity-20"
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        ))}
        {[...Array(4)].map((_, i) => (
          <div 
            key={`cloud-${i}`} 
            className="absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 40 + 20}px`,
              top: `${Math.random() * 30}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center w-full max-w-sm mt-8">
        {/* Illustration Container */}
        <div className="bg-yellow-100 rounded-full w-64 h-64 flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 bg-yellow-200 opacity-30 rounded-full" 
               style={{
                 backgroundImage: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(255,184,76,0.2) 60%)',
                 backgroundSize: '24px 24px'
               }}>
          </div>
          <div className="w-48 h-48 bg-yellow-50 rounded-full flex items-end justify-center overflow-hidden">
            <div className="h-40 w-32 bg-red-400 rounded-t-full relative">
              {/* This would be the woman illustration */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white rounded-full">
                {/* This would be the cat */}
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2 text-center">
          Find Your <span className="text-blue-500">Dream</span><br />
          Pet Here
        </h1>
        
        <p className="text-gray-600 mb-12 text-center">
          Join us and discover the best<br />
          pet in your location
        </p>
        
        <button 
          onClick={onContinue}
          className="bg-blue-500 text-white py-3 px-8 rounded-full shadow-md hover:bg-blue-600 transition-all transform hover:scale-105 w-full max-w-xs"
        >
          Continue
        </button>
        
        {/* Pagination Dots */}
        <div className="flex mt-8">
          <div className="w-8 h-2 bg-blue-500 rounded-full mx-1"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full mx-1"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full mx-1"></div>
        </div>
      </div>
      
      <div className="h-8"></div> {/* Bottom spacer */}
    </div>
  );
};

// Home Screen Component
const HomeScreen = ({ onPetSelect, activeCategory, setActiveCategory, favorites, toggleFavorite }) => {
  // Sample pet data
  const pets = [
    {
      id: 1,
      name: "Amber",
      type: "Cats",
      location: "Chicago",
      distance: "5km",
      image: "amber",
      sex: "Male",
      age: "1 Years",
      weight: "10 Kg",
      description: "Amber is a cat that I have found on the side of the road 1 year ago. He is now a cheerful and active cat.",
      owner: {
        name: "Sophia",
        title: "Amber Owner",
        image: "sophia"
      }
    },
    {
      id: 2,
      name: "Kitty",
      type: "Cats",
      location: "Evanston",
      distance: "7km",
      image: "kitty",
      sex: "Female",
      age: "2 Years",
      weight: "8 Kg",
      description: "Kitty is a playful cat who loves to chase toys and cuddle on the couch. She's very friendly with children.",
      owner: {
        name: "Mike",
        title: "Kitty Owner",
        image: "mike"
      }
    },
    {
      id: 3,
      name: "Rex",
      type: "Dogs",
      location: "Chicago",
      distance: "3km",
      image: "rex",
      sex: "Male",
      age: "3 Years",
      weight: "15 Kg",
      description: "Rex is an energetic dog who loves outdoor activities and playing fetch in the park.",
      owner: {
        name: "James",
        title: "Rex Owner",
        image: "james"
      }
    },
  ];

  const filteredPets = pets.filter(pet => pet.type === activeCategory);
  
  const categories = ["Cats", "Dogs", "Birds", "Fish"];

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      {/* Header */}
      <header className="p-4 bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-gray-400 text-xs mr-1">Location</span>
            <span className="font-semibold">Chicago, US</span>
          </div>
          <div className="flex">
            <button className="p-2 mr-2">
              <Search size={20} className="text-gray-700" />
            </button>
            <button className="p-2">
              <Bell size={20} className="text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        {/* Community Banner */}
        <div className="bg-blue-100 rounded-lg p-4 mb-6 flex items-center">
          <div className="flex-1">
            <h3 className="font-bold text-blue-900">Join Our Animal Lovers Community!</h3>
            <button className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm mt-2">
              Join Now
            </button>
          </div>
          <div className="w-16 h-16 bg-orange-200 rounded-full ml-2 flex items-center justify-center">
            {/* This would be the fox/dog icon */}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-gray-800">Categories</h2>
            <a href="#" className="text-xs text-yellow-500">View all</a>
          </div>
          
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {categories.map(category => (
              <button 
                key={category}
                className={`px-6 py-2 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                  category === activeCategory 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-600'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Adopt Pet Section */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-gray-800">Adopt Pet</h2>
            <a href="#" className="text-xs text-yellow-500">View all</a>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {filteredPets.map(pet => (
              <div 
                key={pet.id}
                className="bg-yellow-50 rounded-xl p-3 w-40 flex-shrink-0 cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => onPetSelect(pet)}
              >
                <div className="relative h-32 bg-yellow-100 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                  {/* This would be the pet image */}
                  <div className={`absolute w-full h-full ${pet.type === 'Cats' ? 'bg-gray-700' : 'bg-orange-300'} opacity-20`}></div>
                  
                  <button 
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(pet.id);
                    }}
                  >
                    <Heart size={16} className={favorites[pet.id] ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
                  </button>
                </div>
                
                <h3 className="font-bold">{pet.name}</h3>
                <div className="flex items-center text-gray-500 text-xs">
                  <span>📍</span>
                  <span>{pet.location} ({pet.distance})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white py-2 px-6 flex justify-between items-center shadow-lg rounded-t-xl sticky bottom-0">
        <button 
          className="flex flex-col items-center"
          onClick={() => onNavigate('home')}
        >
          <div className="relative">
            <Home size={20} className="text-blue-500" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
          </div>
          <span className="text-xs text-blue-500 mt-1">Home</span>
        </button>
        <button 
          className="flex flex-col items-center"
          onClick={() => onNavigate('favorites', 'slide-left')}
        >
          <Heart size={20} className="text-gray-400" />
          <span className="text-xs text-gray-400 mt-1">Favorites</span>
        </button>
        <button 
          className="flex flex-col items-center relative"
          onClick={() => alert('Add Pet feature coming soon!')}
        >
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center absolute -top-5">
            <PlusCircle size={24} className="text-white" />
          </div>
          <span className="text-xs text-gray-400 mt-8">Add</span>
        </button>
        <button 
          className="flex flex-col items-center"
          onClick={() => alert('Messages feature coming soon!')}
        >
          <div className="relative">
            <MessageCircle size={20} className="text-gray-400" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-[10px]">2</span>
            </span>
          </div>
          <span className="text-xs text-gray-400 mt-1">Messages</span>
        </button>
        <button 
          className="flex flex-col items-center"
          onClick={() => onNavigate('profile', 'slide-left')}
        >
          <User size={20} className="text-gray-400" />
          <span className="text-xs text-gray-400 mt-1">Profile</span>
        </button>
      </nav>
    </div>
  );
};

// Pet Detail Screen Component
const PetDetailScreen = ({ pet, onBack, favorites, toggleFavorite }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  if (!pet) return null;
  
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Header with Back Button */}
      <header className="p-4 flex justify-between items-center">
        <button onClick={onBack} className="p-2 rounded-full bg-white shadow-sm">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <button className="p-2 rounded-full bg-white shadow-sm">
          <MoreHorizontal size={20} className="text-gray-700" />
        </button>
      </header>
      
      {/* Pet Image */}
      <div className="px-4 py-2">
        <div className="relative h-72 bg-yellow-100 rounded-3xl mb-4 flex items-center justify-center overflow-hidden">
          {/* This would be the pet image */}
          <div className={`absolute w-full h-full ${pet.type === 'Cats' ? 'bg-gray-700' : 'bg-orange-300'} opacity-20`}></div>
          
          <button 
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md"
            onClick={() => toggleFavorite(pet.id)}
          >
            <Heart size={20} className={favorites[pet.id] ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
          </button>
        </div>
      </div>
      
      {/* Pet Details */}
      <div className="flex-1 bg-white rounded-t-3xl p-6">
        <h1 className="text-2xl font-bold mb-1">{pet.name}</h1>
        <div className="flex items-center text-gray-500 text-sm mb-6">
          <span>📍</span>
          <span>{pet.location} ({pet.distance})</span>
        </div>
        
        {/* Pet Info Tags */}
        <div className="flex space-x-3 mb-6">
          <div className="bg-blue-100 rounded-xl py-2 px-4 flex-1 flex flex-col items-center">
            <span className="text-sm text-gray-500">Sex</span>
            <span className="font-semibold">{pet.sex}</span>
          </div>
          <div className="bg-yellow-100 rounded-xl py-2 px-4 flex-1 flex flex-col items-center">
            <span className="text-sm text-gray-500">Age</span>
            <span className="font-semibold">{pet.age}</span>
          </div>
          <div className="bg-blue-100 rounded-xl py-2 px-4 flex-1 flex flex-col items-center">
            <span className="text-sm text-gray-500">Weight</span>
            <span className="font-semibold">{pet.weight}</span>
          </div>
        </div>
        
        {/* Owner Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-200 rounded-full mr-3">
              {/* Owner image would go here */}
            </div>
            <div>
              <h3 className="font-semibold">{pet.owner.name}</h3>
              <p className="text-sm text-gray-500">{pet.owner.title}</p>
            </div>
          </div>
          <div className="flex">
            <button className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
              <MessageCircle size={16} className="text-blue-500" />
            </button>
            <button className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
          </div>
        </div>
        
        {/* Description */}
        <div className="mb-10">
          <p className="text-gray-600">
            {showFullDescription ? pet.description : `${pet.description.substring(0, 60)}...`}
            <button 
              className="text-yellow-500 ml-1"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? 'See Less' : 'See More'}
            </button>
          </p>
        </div>
        
        {/* Adopt Button */}
        <button className="bg-blue-500 text-white py-3 rounded-xl w-full font-semibold shadow-md hover:bg-blue-600 transition-all transform hover:scale-105 animate-pulse">
          Adopt Me
        </button>
      </div>
    </div>
  );
};

// Add global keyframe animations
const GlobalStyle = () => {
  return (
    <style jsx global>{`
      @keyframes float {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-20px);
        }
      }
      
      @keyframes pulse {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.8;
          transform: scale(0.98);
        }
      }
    `}</style>
  );
};

// Complete App with Styles
export default function App() {
  return (
    <>
      <GlobalStyle />
      <div className="font-sans text-gray-900">
        <PetAdoptionApp />
      </div>
    </>
  );
}