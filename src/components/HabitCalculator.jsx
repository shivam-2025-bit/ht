import { useState, useEffect } from 'react';

const HabitCalculator = ({ isSubscribed }) => {
  const [habitDifficulty, setHabitDifficulty] = useState('medium');
  const [consistency, setConsistency] = useState(80);
  const [previousAttempts, setPreviousAttempts] = useState(0);
  const [estimatedDays, setEstimatedDays] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  // Calculate estimated days to form habit
  useEffect(() => {
    if (!isSubscribed) return;
    
    // Base days according to research (average 66 days)
    let baseDays = 0;
    
    switch(habitDifficulty) {
      case 'easy':
        baseDays = 21;
        break;
      case 'medium':
        baseDays = 42;
        break;
      case 'hard':
        baseDays = 66;
        break;
      case 'veryHard':
        baseDays = 90;
        break;
      default:
        baseDays = 42;
    }
    
    // Adjust based on consistency (lower consistency = longer time)
    const consistencyFactor = (100 / consistency);
    
    // Adjust based on previous failed attempts (more attempts = slightly easier)
    const previousAttemptsFactor = Math.max(0.8, 1 - (previousAttempts * 0.05));
    
    // Calculate final estimation
    const calculated = Math.round(baseDays * consistencyFactor * previousAttemptsFactor);
    
    setEstimatedDays(calculated);
  }, [habitDifficulty, consistency, previousAttempts, isSubscribed]);

  if (!isSubscribed) {
    return (
      <div className="card mb-6">
        <div className="p-3 bg-blue-50 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">Habit Formation Calculator</h3>
          <p className="text-sm text-blue-600">Premium feature: Unlock to calculate how long it will take to form your specific habits.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Habit Formation Calculator</h3>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          {showInfo ? 'Hide Info' : 'What is this?'}
        </button>
      </div>
      
      {showInfo && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            This calculator estimates how long it might take you to form a habit based on scientific research.
            While the common myth is that it takes 21 days to form a habit, research shows it can take anywhere
            from 18 to 254 days, with 66 days being the average. Use this calculator to get a personalized estimate.
          </p>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Habit Difficulty:
          </label>
          <select
            value={habitDifficulty}
            onChange={(e) => setHabitDifficulty(e.target.value)}
            className="input w-full"
          >
            <option value="easy">Easy (e.g., drinking more water)</option>
            <option value="medium">Medium (e.g., daily exercise)</option>
            <option value="hard">Hard (e.g., meditating daily)</option>
            <option value="veryHard">Very Hard (e.g., completely new skill)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Expected Consistency (how often you'll stick to it):
          </label>
          <div className="flex items-center">
            <input
              type="range"
              min="50"
              max="100"
              value={consistency}
              onChange={(e) => setConsistency(e.target.value)}
              className="w-full mr-2"
            />
            <span className="text-sm font-medium w-10">{consistency}%</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Previous Failed Attempts:
          </label>
          <input
            type="number"
            min="0"
            max="10"
            value={previousAttempts}
            onChange={(e) => setPreviousAttempts(Math.max(0, parseInt(e.target.value) || 0))}
            className="input w-full"
          />
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg text-center">
        <p className="text-sm text-green-800 mb-1">Estimated time to form this habit:</p>
        <p className="text-xl font-bold text-green-700">{estimatedDays} days</p>
        <p className="text-xs text-green-600 mt-1">
          {estimatedDays <= 21 ? 'This habit should form relatively quickly!' : 
           estimatedDays <= 42 ? 'Keep consistent! This habit requires moderate effort.' :
           estimatedDays <= 66 ? 'This will take dedication. Stay focused!' :
           'This is a challenging habit that requires long-term commitment.'}
        </p>
      </div>
    </div>
  );
};

export default HabitCalculator;