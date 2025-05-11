import { useState, useEffect } from 'react';

const DetailedTracking = ({ habit, isSubscribed }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [weeklyData, setWeeklyData] = useState([]);
  
  useEffect(() => {
    if (!habit || !isSubscribed) return;
    
    // Generate some mock data for weekly progress
    const generateWeeklyData = () => {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const today = new Date();
      const dayOfWeek = today.getDay();
      
      return days.map((day, index) => {
        // For days that have passed this week, generate random completion status
        // For today and future days, mark as not completed yet
        const isPastDay = index < dayOfWeek;
        const isToday = index === dayOfWeek;
        const completed = isPastDay ? Math.random() > 0.3 : false;
        
        return {
          day,
          completed,
          isToday
        };
      });
    };
    
    setWeeklyData(generateWeeklyData());
  }, [habit, isSubscribed]);
  
  if (!isSubscribed) {
    return (
      <div className="mt-2 mb-1">
        <button 
          className="text-xs text-gray-500 underline cursor-not-allowed opacity-70"
          onClick={() => {}}
        >
          View detailed tracking (Premium)
        </button>
      </div>
    );
  }
  
  return (
    <div className="mt-2">
      <button 
        className="text-xs text-blue-600 hover:text-blue-800 underline"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'Hide details' : 'View detailed tracking'}
      </button>
      
      {showDetails && (
        <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium mb-2">Weekly Progress</h4>
          
          <div className="flex justify-between mb-3">
            {weeklyData.map((data, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center ${data.isToday ? 'bg-blue-50 p-1 rounded' : ''}`}
              >
                <div className="text-xs text-gray-500 mb-1">{data.day.substring(0, 3)}</div>
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center
                    ${data.completed 
                      ? 'bg-green-500 text-white' 
                      : data.isToday 
                        ? 'bg-blue-100 border border-blue-300' 
                        : 'bg-gray-200'}`}
                >
                  {data.completed && '✓'}
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            <div>
              <h4 className="text-sm font-medium">Streak Analysis</h4>
              <div className="text-xs text-gray-600 mt-1">
                <div className="flex justify-between">
                  <span>Current streak:</span>
                  <span className="font-medium">{habit.streak} days</span>
                </div>
                <div className="flex justify-between">
                  <span>Longest streak:</span>
                  <span className="font-medium">{Math.max(habit.streak, Math.floor(Math.random() * 30))} days</span>
                </div>
                <div className="flex justify-between">
                  <span>Consistency rate:</span>
                  <span className="font-medium">{Math.floor(65 + Math.random() * 25)}%</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium">Habit Forecast</h4>
              <div className="text-xs text-gray-600 mt-1">
                <div className="flex justify-between">
                  <span>Estimated completion:</span>
                  <span className="font-medium">
                    {
                      habit.streak >= habit.streakGoal 
                      ? 'Complete!' 
                      : `${Math.ceil((habit.streakGoal - habit.streak) * 1.2)} days`
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Success probability:</span>
                  <span className="font-medium">
                    {habit.streak > 10 ? '85%' : habit.streak > 5 ? '65%' : '45%'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-xs text-blue-600 italic mt-1">
              Premium feature: Track your progress in detail and get insights to increase your success rate.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedTracking;