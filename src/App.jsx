import { useState, useEffect } from 'react';
import './App.css';
import HabitTracker from './components/HabitTracker';
import PayPalSubscription from './components/PayPalSubscription';
import HabitTips from './components/HabitTips';
import TipsCollection from './components/TipsCollection';

function App() {
  const [isSubscribed, setIsSubscribed] = useState(() => {
    return localStorage.getItem('subscribed') === 'true';
  });
  const [showTipsCollection, setShowTipsCollection] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('subscribed', isSubscribed);
  }, [isSubscribed]);

  const handleSubscriptionComplete = (status) => {
    setIsSubscribed(status);
  };

  // For demo purposes, add a way to toggle subscription manually
  const toggleSubscription = () => {
    setIsSubscribed(!isSubscribed);
  };

  // Enable Test Mode to access all premium features
  const enableTestMode = () => {
    setIsTestMode(true);
  };

  // Determine if premium features should be available (subscribed OR test mode)
  const hasPremiumAccess = isSubscribed || isTestMode;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-blue-600 mb-4 md:mb-0">Habit Builder Pro</h1>
            <div className="flex items-center space-x-2">
              {isTestMode && (
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Test Mode
                </span>
              )}
              {isSubscribed ? (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Premium
                </span>
              ) : (
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Free Trial
                </span>
              )}
              {/* This button is for demonstration only */}
              <button
                onClick={toggleSubscription}
                className="text-xs text-gray-500 underline"
              >
                (Demo: {isSubscribed ? 'Switch to Free' : 'Activate Premium'})
              </button>
            </div>
          </div>

          {!isTestMode && (
            <div className="mb-4 text-center">
              <button
                onClick={enableTestMode}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg text-sm"
              >
                Enable Test Mode (Unlock All Features)
              </button>
            </div>
          )}

          {/* HabitTips component - shows quick tips for habit formation */}
          <HabitTips isPremium={hasPremiumAccess} />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Always show the habit tracker with different capabilities based on subscription */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <HabitTracker isSubscribed={hasPremiumAccess} />
            </div>
            
            {/* Only show subscription box if not subscribed and not in test mode */}
            {!isSubscribed && !isTestMode && (
              <div className="w-full lg:w-1/2 flex justify-center">
                <PayPalSubscription onSubscriptionComplete={handleSubscriptionComplete} />
              </div>
            )}

            {/* Show premium features overview when in test mode */}
            {isTestMode && !isSubscribed && (
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="w-full max-w-md card bg-purple-50 border border-purple-200">
                  <h2 className="text-xl font-bold mb-4 text-center text-purple-800">Test Mode Active</h2>
                  <div className="mb-4">
                    <p className="mb-2">All premium features are now unlocked for testing:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Unlimited habits</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Habit formation calculator</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>All 15 habit-forming tips with detailed explanations</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Customizable streak goals</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Advanced progress tracking</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Daily habit reminders</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-600">
                    You can now explore all features without subscription. This is only for testing purposes.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8">
            <button
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              onClick={() => setShowTipsCollection(!showTipsCollection)}
            >
              {showTipsCollection ? 'Hide Tips Collection' : 'View Habit Formation Tips & Strategies'} 
              <span className="ml-2">{showTipsCollection ? '▲' : '▼'}</span>
            </button>
            
            {showTipsCollection && (
              <div className="mt-4">
                <TipsCollection isPremium={hasPremiumAccess} />
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Habit Builder Pro. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default App;