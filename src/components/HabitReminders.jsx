import { useState, useEffect } from 'react';

const HabitReminders = ({ habits, isSubscribed }) => {
  const [reminders, setReminders] = useState(() => {
    const savedReminders = localStorage.getItem('habitReminders');
    return savedReminders ? JSON.parse(savedReminders) : {};
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('habitReminders', JSON.stringify(reminders));
  }, [reminders]);

  // Check if we should show any reminders
  useEffect(() => {
    if (!isSubscribed) return;
    
    const checkReminders = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      // Loop through all reminders and check if any should be triggered
      Object.entries(reminders).forEach(([habitId, reminderInfo]) => {
        if (!reminderInfo.enabled) return;
        
        const [reminderHour, reminderMinute] = reminderInfo.time.split(':').map(Number);
        
        // If it's within a minute of the reminder time
        if (currentHour === reminderHour && 
            Math.abs(currentMinute - reminderMinute) <= 1) {
          // Find the habit name
          const habit = habits.find(h => h.id.toString() === habitId);
          if (habit) {
            setNotificationMessage(`Reminder: Time to work on "${habit.name}"!`);
            setShowNotification(true);
            
            // Hide the notification after 5 seconds
            setTimeout(() => {
              setShowNotification(false);
            }, 5000);
          }
        }
      });
    };
    
    // Check every minute
    const intervalId = setInterval(checkReminders, 60000);
    
    // Also check immediately on component mount
    checkReminders();
    
    return () => clearInterval(intervalId);
  }, [isSubscribed, reminders, habits]);

  const setReminder = (habitId, time) => {
    setReminders(prev => ({
      ...prev,
      [habitId]: {
        time,
        enabled: true
      }
    }));
  };

  const toggleReminder = (habitId) => {
    setReminders(prev => {
      if (!prev[habitId]) return prev;
      
      return {
        ...prev,
        [habitId]: {
          ...prev[habitId],
          enabled: !prev[habitId].enabled
        }
      };
    });
  };

  const deleteReminder = (habitId) => {
    setReminders(prev => {
      const newReminders = {...prev};
      delete newReminders[habitId];
      return newReminders;
    });
  };

  // Demo notification (for testing purposes)
  const triggerDemoNotification = (habitName) => {
    setNotificationMessage(`Reminder: Time to work on "${habitName}"!`);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  if (!isSubscribed) {
    return (
      <div className="text-center p-3 bg-gray-100 rounded-lg mb-4">
        <h3 className="text-gray-600 font-medium">Daily Reminders</h3>
        <p className="text-gray-500 text-sm">Upgrade to premium to set daily habit reminders.</p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-3">Daily Habit Reminders</h3>
      
      {/* Reminders List */}
      {habits.length === 0 ? (
        <p className="text-sm text-gray-500">Add habits to set daily reminders.</p>
      ) : (
        <div className="space-y-2">
          {habits.map(habit => {
            const hasReminder = reminders[habit.id];
            const isEnabled = hasReminder && reminders[habit.id].enabled;
            
            return (
              <div key={habit.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium">{habit.name}</p>
                  {hasReminder && (
                    <p className="text-sm text-gray-600">
                      Reminder: {reminders[habit.id].time}
                      {isEnabled ? ' (Active)' : ' (Disabled)'}
                    </p>
                  )}
                </div>
                
                <div className="flex gap-2">
                  {!hasReminder ? (
                    <div className="flex gap-2">
                      <input 
                        type="time" 
                        className="input h-8 px-2 py-1 text-sm"
                        defaultValue="08:00"
                        onChange={(e) => setReminder(habit.id, e.target.value)}
                      />
                      <button 
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                        onClick={() => setReminder(habit.id, "08:00")}
                      >
                        Set
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button 
                        className={`${isEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'} px-2 py-1 rounded text-sm`}
                        onClick={() => toggleReminder(habit.id)}
                      >
                        {isEnabled ? 'On' : 'Off'}
                      </button>
                      <button 
                        className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm"
                        onClick={() => deleteReminder(habit.id)}
                      >
                        Remove
                      </button>
                      <button 
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                        onClick={() => triggerDemoNotification(habit.name)}
                      >
                        Test
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white p-3 rounded-lg shadow-lg z-50 animate-fade-in-out">
          <p className="font-medium">{notificationMessage}</p>
        </div>
      )}
      
      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>Note:</strong> Reminders work when the app is open. In a real application, reminders would work as push notifications or email reminders.
        </p>
      </div>
    </div>
  );
};

export default HabitReminders;