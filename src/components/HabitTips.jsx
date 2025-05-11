import { useState, useEffect } from 'react';

const tips = [
  {
    id: 1,
    title: "Start Small",
    content: "Begin with tiny habits that take less than 2 minutes to complete. Small wins build momentum.",
    category: "beginner"
  },
  {
    id: 2,
    title: "Stack Habits",
    content: "Attach new habits to existing ones. For example, 'After I brush my teeth, I will meditate for 1 minute.'",
    category: "technique"
  },
  {
    id: 3,
    title: "Environment Matters",
    content: "Design your environment to make good habits easier. Put your running shoes by the door if you want to run more.",
    category: "environment"
  },
  {
    id: 4,
    title: "Track Your Progress",
    content: "The simple act of tracking a behavior can create an impulse to change it. What gets measured gets managed.",
    category: "technique"
  },
  {
    id: 5,
    title: "Two-Day Rule",
    content: "Never miss your habit two days in a row. One day is a slip-up; two becomes the start of a new pattern.",
    category: "consistency"
  },
  {
    id: 6,
    title: "Implementation Intentions",
    content: "Plan exactly when and where you'll perform your habit: 'I will [BEHAVIOR] at [TIME] in [LOCATION].'",
    category: "planning"
  },
  {
    id: 7,
    title: "Make It Enjoyable",
    content: "Pair activities you need to do with ones you want to do. Listen to favorite podcasts only while exercising.",
    category: "motivation"
  },
  {
    id: 8,
    title: "The 10-Minute Rule",
    content: "If you don't feel like doing a habit, just commit to 10 minutes. Often, you'll continue once you've started.",
    category: "motivation"
  },
  {
    id: 9,
    title: "Celebrate Small Wins",
    content: "Create a small celebration after completing your habit. This positive emotion helps wire the habit into your brain.",
    category: "psychology"
  },
  {
    id: 10,
    title: "Focus on Identity",
    content: "Instead of 'I want to run a marathon,' think 'I am becoming a runner.' Habits stick when they become part of your identity.",
    category: "psychology"
  },
  {
    id: 11,
    title: "Remove Friction",
    content: "Make good habits as easy as possible to start. Reduce the number of steps between you and the habit.",
    category: "environment"
  },
  {
    id: 12,
    title: "Visual Cues",
    content: "Use visual reminders to trigger your habits. A water bottle on your desk reminds you to stay hydrated.",
    category: "environment"
  },
  {
    id: 13,
    title: "Accountability Partner",
    content: "Share your habit goals with someone who will hold you accountable and check in on your progress.",
    category: "social"
  },
  {
    id: 14,
    title: "The 2-Minute Rule",
    content: "Scale down any habit to just 2 minutes. 'Read a book' becomes 'Read one page.' Start small, then build.",
    category: "beginner"
  },
  {
    id: 15,
    title: "Beware Decision Fatigue",
    content: "Plan your habits for when your willpower is high. Morning routines work well as willpower depletes during the day.",
    category: "planning"
  }
];

const HabitTips = ({ category, isPremium }) => {
  const [currentTip, setCurrentTip] = useState(null);
  const [tipIndex, setTipIndex] = useState(0);

  // Filter tips based on category if provided
  const filteredTips = category ? tips.filter(tip => tip.category === category) : tips;
  
  // For free users, limit to first 5 tips
  const availableTips = isPremium ? filteredTips : filteredTips.slice(0, 5);

  useEffect(() => {
    if (availableTips.length > 0) {
      setCurrentTip(availableTips[tipIndex]);
    }
  }, [tipIndex, availableTips]);

  const nextTip = () => {
    setTipIndex((prevIndex) => (prevIndex + 1) % availableTips.length);
  };

  const prevTip = () => {
    setTipIndex((prevIndex) => 
      prevIndex === 0 ? availableTips.length - 1 : prevIndex - 1
    );
  };

  if (!currentTip) return null;

  return (
    <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-blue-800">Habit Tip</h3>
        {!isPremium && (
          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
            {availableTips.length}/{tips.length} Tips
          </span>
        )}
      </div>
      
      <div className="mb-3">
        <h4 className="font-medium text-blue-700 mb-1">{currentTip.title}</h4>
        <p className="text-gray-700">{currentTip.content}</p>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500">
          Tip {tipIndex + 1} of {availableTips.length}
          {!isPremium && (
            <span className="ml-1">
              (Upgrade for {tips.length - availableTips.length} more tips)
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={prevTip}
            className="p-1 rounded hover:bg-blue-100 text-blue-600"
            aria-label="Previous tip"
          >
            ←
          </button>
          <button 
            onClick={nextTip}
            className="p-1 rounded hover:bg-blue-100 text-blue-600"
            aria-label="Next tip"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitTips;