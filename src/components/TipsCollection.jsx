import { useState } from 'react';

const tipCategories = [
  { id: 'all', name: 'All Tips' },
  { id: 'beginner', name: 'For Beginners' },
  { id: 'technique', name: 'Techniques' },
  { id: 'motivation', name: 'Motivation' },
  { id: 'environment', name: 'Environment' },
  { id: 'psychology', name: 'Psychology' },
  { id: 'planning', name: 'Planning' },
  { id: 'consistency', name: 'Consistency' },
  { id: 'social', name: 'Social Support' }
];

const allTips = [
  {
    id: 1,
    title: "Start Small",
    content: "Begin with tiny habits that take less than 2 minutes to complete. Small wins build momentum.",
    category: "beginner",
    detail: "The key to building lasting habits is starting with tiny behaviors that are easy to do. Make it so easy you can't say no. If you want to establish a habit of reading every day, start with reading just one page per day. Once the habit is established, you can scale up."
  },
  {
    id: 2,
    title: "Stack Habits",
    content: "Attach new habits to existing ones. For example, 'After I brush my teeth, I will meditate for 1 minute.'",
    category: "technique",
    detail: "Habit stacking is one of the best ways to build new habits. The formula is: 'After [CURRENT HABIT], I will [NEW HABIT].' By using the connectedness of behavior, you can leverage your existing habits to build new ones. Current habits are already embedded in your brain, so connect your new habits to them."
  },
  {
    id: 3,
    title: "Environment Matters",
    content: "Design your environment to make good habits easier. Put your running shoes by the door if you want to run more.",
    category: "environment",
    detail: "Your environment has an incredible impact on your behavior. Small changes to your surroundings can make good habits easier and bad habits harder. Want to eat healthier? Make healthy foods visible and unhealthy foods invisible. Want to be more productive? Remove distractions from your workspace."
  },
  {
    id: 4,
    title: "Track Your Progress",
    content: "The simple act of tracking a behavior can create an impulse to change it. What gets measured gets managed.",
    category: "technique",
    detail: "Tracking your habits creates a visual cue that reminds you to act, is motivating because you see the progress you're making, and feels satisfying. You can use a calendar, journal, or app like this one to track your habits. Don't break the chain of successful days!"
  },
  {
    id: 5,
    title: "Two-Day Rule",
    content: "Never miss your habit two days in a row. One day is a slip-up; two becomes the start of a new pattern.",
    category: "consistency",
    detail: "Life happens, and sometimes you'll miss a day. That's okay. The key is to avoid missing twice in a row. Missing once is an accident; missing twice is the start of a new habit. When you miss once, it's critical to get back on track immediately."
  },
  {
    id: 6,
    title: "Implementation Intentions",
    content: "Plan exactly when and where you'll perform your habit: 'I will [BEHAVIOR] at [TIME] in [LOCATION].'",
    category: "planning",
    detail: "People who make a specific plan for when and where they will perform a new habit are more likely to follow through. Being specific about what you want and how you will achieve it helps you say no to distractions and stay focused on your goals."
  },
  {
    id: 7,
    title: "Make It Enjoyable",
    content: "Pair activities you need to do with ones you want to do. Listen to favorite podcasts only while exercising.",
    category: "motivation",
    detail: "The cardinal rule of behavior change: What is rewarded is repeated. What is punished is avoided. You're more likely to repeat a behavior when the experience is enjoyable. Find ways to add immediate rewards to habits that pay off in the long run."
  },
  {
    id: 8,
    title: "The 10-Minute Rule",
    content: "If you don't feel like doing a habit, just commit to 10 minutes. Often, you'll continue once you've started.",
    category: "motivation",
    detail: "When you don't feel motivated, lowering the bar to entry helps you get started. Inertia works both ways - objects at rest stay at rest, but objects in motion stay in motion. It's easier to keep going once you've started, so make getting started as easy as possible."
  },
  {
    id: 9,
    title: "Celebrate Small Wins",
    content: "Create a small celebration after completing your habit. This positive emotion helps wire the habit into your brain.",
    category: "psychology",
    detail: "Celebration is the best way to reinforce your habits. When you feel successful, your brain remembers and wants to repeat the experience. It can be as simple as saying 'I did it!' or doing a small fist pump. The key is to generate positive emotions right after completing your habit."
  },
  {
    id: 10,
    title: "Focus on Identity",
    content: "Instead of 'I want to run a marathon,' think 'I am becoming a runner.' Habits stick when they become part of your identity.",
    category: "psychology",
    detail: "The most effective way to change your habits is to focus on who you wish to become, not what you want to achieve. Behind every system of actions is a system of beliefs. The goal is not to read a book, but to become a reader. Not to run a marathon, but to become a runner."
  },
  {
    id: 11,
    title: "Remove Friction",
    content: "Make good habits as easy as possible to start. Reduce the number of steps between you and the habit.",
    category: "environment",
    detail: "The less friction you face, the more likely you'll perform the habit. Want to eat healthier? Chop veggies in advance. Want to exercise? Sleep in your workout clothes. Every bit of friction makes the habit less likely, so remove as many steps as possible."
  },
  {
    id: 12,
    title: "Visual Cues",
    content: "Use visual reminders to trigger your habits. A water bottle on your desk reminds you to stay hydrated.",
    category: "environment",
    detail: "We often choose our behaviors based on what we notice. Make your cues obvious to trigger your habits. If you want to take your vitamins each morning, put the bottle next to your coffee maker. Want to practice guitar more? Leave it on a stand in the middle of the living room."
  },
  {
    id: 13,
    title: "Accountability Partner",
    content: "Share your habit goals with someone who will hold you accountable and check in on your progress.",
    category: "social",
    detail: "We care deeply about what others think of us, and we'd rather not let them down. The expectations of others can drive our habits. Find someone with similar goals or someone you respect who will hold you accountable. Regular check-ins dramatically increase follow-through."
  },
  {
    id: 14,
    title: "The 2-Minute Rule",
    content: "Scale down any habit to just 2 minutes. 'Read a book' becomes 'Read one page.' Start small, then build.",
    category: "beginner",
    detail: "A new habit should take less than two minutes to complete. This might seem too easy, but that's the point. You need to standardize a habit before you can optimize it. You need to establish the behavior first, then you can improve upon it."
  },
  {
    id: 15,
    title: "Beware Decision Fatigue",
    content: "Plan your habits for when your willpower is high. Morning routines work well as willpower depletes during the day.",
    category: "planning",
    detail: "Your willpower and decision-making abilities diminish throughout the day. This is why you're more likely to give in to temptations in the evening. Plan important habits for the morning when your mind is fresh and your willpower is strong."
  }
];

const TipsCollection = ({ isPremium }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedTip, setExpandedTip] = useState(null);

  // For free users, only show first 5 tips
  const displayTips = isPremium 
    ? allTips 
    : allTips.slice(0, 5);

  const filteredTips = selectedCategory === 'all' 
    ? displayTips 
    : displayTips.filter(tip => tip.category === selectedCategory);

  const toggleTip = (tipId) => {
    if (expandedTip === tipId) {
      setExpandedTip(null);
    } else {
      setExpandedTip(tipId);
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Habit Formation Tips</h2>
      
      {!isPremium && (
        <div className="mb-4 p-3 bg-amber-100 text-amber-800 rounded-lg text-sm">
          <p className="font-medium">Free version: 5 of {allTips.length} tips available</p>
          <p>Upgrade to premium to unlock all habit formation tips and strategies!</p>
        </div>
      )}
      
      <div className="mb-4 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {tipCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-3">
        {filteredTips.map(tip => (
          <div 
            key={tip.id} 
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <div 
              onClick={() => toggleTip(tip.id)}
              className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50"
            >
              <div>
                <h3 className="font-medium text-blue-700">{tip.title}</h3>
                <p className="text-gray-600">{tip.content}</p>
              </div>
              <div className="text-blue-500 ml-3">
                {expandedTip === tip.id ? '−' : '+'}
              </div>
            </div>
            
            {expandedTip === tip.id && (
              <div className="p-3 bg-blue-50 border-t border-blue-100">
                <p className="text-gray-700">{tip.detail}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {!isPremium && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <p className="font-medium text-blue-800 mb-2">Want more habit-forming tips?</p>
          <p className="text-sm text-blue-600 mb-3">
            Unlock all {allTips.length} tips and detailed strategies with premium.
          </p>
        </div>
      )}
    </div>
  );
};

export default TipsCollection;