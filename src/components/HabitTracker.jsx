import { useState, useEffect } from 'react';
import HabitReminders from './HabitReminders';
import DetailedTracking from './DetailedTracking';

const HabitTracker = ({ isSubscribed }) => {
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem('habits');
    return savedHabits ? JSON.parse(savedHabits) : [];
  });
  const [newHabit, setNewHabit] = useState('');
  const [streakGoal, setStreakGoal] = useState(21);
  const [showCalculator, setShowCalculator] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [habitCategory, setHabitCategory] = useState('');
  const [habitPriority, setHabitPriority] = useState('medium');

  // Max habits for free users
  const MAX_FREE_HABITS = 3;

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (newHabit.trim() === '') return;
    
    // Check if free user has reached limit
    if (!isSubscribed && habits.length >= MAX_FREE_HABITS) {
      alert(`Free users can track up to ${MAX_FREE_HABITS} habits. Subscribe to track unlimited habits!`);
      return;
    }
    
    setHabits([
      ...habits,
      {
        id: Date.now(),
        name: newHabit,
        streak: 0,
        lastChecked: null,
        completed: false,
        category: habitCategory || 'general',
        priority: habitPriority,
        streakGoal: streakGoal,
        history: [],
      },
    ]);
    setNewHabit('');
    setHabitCategory('');
    setHabitPriority('medium');
  };

  const updateHabit = () => {
    if (!editingHabit || editingHabit.name.trim() === '') return;
    
    setHabits(
      habits.map((habit) => 
        habit.id === editingHabit.id ? {
          ...habit,
          name: editingHabit.name,
          category: editingHabit.category || habit.category,
          priority: editingHabit.priority || habit.priority,
          streakGoal: editingHabit.streakGoal || habit.streakGoal,
        } : habit
      )
    );
    
    setEditingHabit(null);
  };

  const toggleHabit = (id) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const today = new Date().toDateString();
          const isToday = habit.lastChecked === today;
          const newStreak = isToday ? habit.streak - 1 : habit.streak + 1;
          const newHistory = [...(habit.history || [])];
          
          // Add to history if this is a completion (not an undo)
          if (!isToday) {
            newHistory.push({
              date: today,
              completed: true
            });
          } else {
            // If undoing, find and remove the last history entry if it's from today
            const todayIndex = newHistory.findIndex(h => h.date === today);
            if (todayIndex !== -1) {
              newHistory.splice(todayIndex, 1);
            }
          }
          
          return {
            ...habit,
            streak: newStreak,
            lastChecked: isToday ? null : today,
            completed: newStreak >= (habit.streakGoal || streakGoal),
            history: newHistory,
          };
        }
        return habit;
      })
    );
  };

  const removeHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const calculateProgress = (habit) => {
    const habitGoal = habit.streakGoal || streakGoal;
    return Math.min((habit.streak / habitGoal) * 100, 100);
  };

  // Show free version with limitations instead of blocking access
  const showSubscribePrompt = !isSubscribed && habits.length >= MAX_FREE_HABITS;

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Habit Tracker</h2>
        {isSubscribed && (
          <button
            className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
            onClick={() => setShowCalculator(!showCalculator)}
          >
            {showCalculator ? 'Hide Calculator' : 'Show Calculator'}
          </button>
        )}
      </div>

      {!isSubscribed && (
        <div className="mb-4 p-3 bg-amber-100 text-amber-800 rounded-lg text-sm">
          <p className="font-medium">You're using the free version</p>
          <p>Track up to {MAX_FREE_HABITS} habits. Subscribe or enable test mode for unlimited habits and premium features!</p>
        </div>
      )}

      {/* Habit Reminders Component - Premium Feature */}
      {isSubscribed && (
        <HabitReminders habits={habits} isSubscribed={isSubscribed} />
      )}

      <div className="flex mb-4">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Add a new habit..."
          className="input flex-grow mr-2"
        />
        <button onClick={addHabit} className="btn">
          Add
        </button>
      </div>

      {isSubscribed && (
        <div className="mb-4 grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium mb-1">Category:</label>
            <select
              value={habitCategory}
              onChange={(e) => setHabitCategory(e.target.value)}
              className="input w-full text-sm"
            >
              <option value="">Select category</option>
              <option value="health">Health</option>
              <option value="productivity">Productivity</option>
              <option value="personal">Personal</option>
              <option value="learning">Learning</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Priority:</label>
            <select
              value={habitPriority}
              onChange={(e) => setHabitPriority(e.target.value)}
              className="input w-full text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {habits.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            No habits yet. Add one to get started!
          </p>
        ) : (
          habits.map((habit) => (
            <div
              key={habit.id}
              className={`card relative ${
                habit.completed ? 'border-green-500 border-2' : 
                habit.priority === 'high' ? 'border-red-200' :
                habit.priority === 'medium' ? 'border-yellow-200' : ''
              }`}
            >
              {isSubscribed && habit.category && (
                <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  {habit.category}
                </span>
              )}
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{habit.name}</h3>
                  <div className="text-sm text-gray-600">
                    Streak: {habit.streak} / {isSubscribed ? (habit.streakGoal || streakGoal) : 21} days
                    {habit.completed && (
                      <span className="ml-2 text-green-600 font-semibold">
                        Habit Formed!
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => toggleHabit(habit.id)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                      habit.lastChecked === new Date().toDateString()
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    {habit.lastChecked === new Date().toDateString() ? '✓' : ''}
                  </button>
                  
                  {isSubscribed && (
                    <button
                      onClick={() => setEditingHabit(habit)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                  )}
                  
                  <button
                    onClick={() => removeHabit(habit.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full ${
                    habit.completed ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${calculateProgress(habit)}%` }}
                ></div>
              </div>
              
              {/* Detailed tracking for premium users */}
              <DetailedTracking habit={habit} isSubscribed={isSubscribed} />
            </div>
          ))
        )}
      </div>

      {editingHabit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
            <h3 className="text-lg font-bold mb-4">Edit Habit</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name:</label>
                <input
                  type="text"
                  value={editingHabit.name}
                  onChange={(e) => setEditingHabit({...editingHabit, name: e.target.value})}
                  className="input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Category:</label>
                <select
                  value={editingHabit.category || ''}
                  onChange={(e) => setEditingHabit({...editingHabit, category: e.target.value})}
                  className="input w-full"
                >
                  <option value="">Select category</option>
                  <option value="health">Health</option>
                  <option value="productivity">Productivity</option>
                  <option value="personal">Personal</option>
                  <option value="learning">Learning</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Priority:</label>
                <select
                  value={editingHabit.priority || 'medium'}
                  onChange={(e) => setEditingHabit({...editingHabit, priority: e.target.value})}
                  className="input w-full"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Streak Goal:</label>
                <input
                  type="number"
                  value={editingHabit.streakGoal || streakGoal}
                  onChange={(e) => setEditingHabit({...editingHabit, streakGoal: parseInt(e.target.value) || streakGoal})}
                  className="input w-full"
                  min="1"
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-6 gap-2">
              <button
                onClick={() => setEditingHabit(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={updateHabit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {showSubscribePrompt && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <p className="font-medium text-blue-800 mb-2">Want more habits?</p>
          <p className="text-sm text-blue-600 mb-3">Unlock unlimited habits and premium features with a subscription or enable test mode.</p>
        </div>
      )}
    </div>
  );
};

export default HabitTracker;