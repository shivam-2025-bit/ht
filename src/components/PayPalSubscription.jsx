import { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const PayPalSubscription = ({ onSubscriptionComplete }) => {
  const [error, setError] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('');

  // PayPal configuration
  const paypalOptions = {
    'client-id': 'test', // Replace with your client ID in production
    currency: 'USD',
    intent: 'subscription',
  };

  // PayPal Button configuration for subscriptions
  const buttonOptions = {
    style: {
      shape: 'rect',
      color: 'blue',
      layout: 'vertical',
      label: 'subscribe',
    },
    createSubscription: (data, actions) => {
      setError('');
      setSubscriptionStatus('Processing...');
      
      return actions.subscription
        .create({
          plan_id: 'P-6H6239122C6063711NAHE4QY', // Your provided plan ID
        })
        .then((orderId) => {
          setSubscriptionStatus('Subscription created! Processing payment...');
          return orderId;
        })
        .catch((err) => {
          setError('Failed to create subscription. Please try again.');
          console.error('Subscription creation error:', err);
        });
    },
    onApprove: (data, actions) => {
      setSubscriptionStatus('Payment approved! Finalizing subscription...');
      
      // Call your backend to confirm subscription if needed
      // This is where you would typically validate with your server
      
      // Then inform the parent component about the successful subscription
      onSubscriptionComplete(true);
      setSubscriptionStatus('Subscription active! Enjoy tracking your habits.');
      
      return actions.subscription.get();
    },
    onError: (err) => {
      setError('Payment failed. Please try again.');
      console.error('PayPal error:', err);
      setSubscriptionStatus('');
    },
    onCancel: () => {
      setSubscriptionStatus('Subscription canceled.');
    },
  };

  return (
    <div className="w-full max-w-md card">
      <h2 className="text-xl font-bold mb-4 text-center">Upgrade to Premium</h2>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Premium Features:</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span><strong>Unlimited</strong> habits (vs. 3 in free plan)</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Habit formation calculator</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Detailed progress tracking</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Daily habit reminders</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>15 premium habit formation tips & strategies</span>
          </li>
        </ul>
      </div>
      
      <div className="mb-3 text-center font-medium">$5.99/month</div>
      
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
      
      {subscriptionStatus && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded-lg">{subscriptionStatus}</div>
      )}
      
      <PayPalScriptProvider options={paypalOptions}>
        <PayPalButtons {...buttonOptions} />
      </PayPalScriptProvider>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Or use our hosted PayPal button:
        </p>
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" className="mt-2">
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value="8UUCNXMEQAV28" />
          <input
            type="image"
            src="https://www.paypalobjects.com/en_US/i/btn/btn_subscribeCC_LG.gif"
            border="0"
            name="submit"
            alt="PayPal - The safer, easier way to pay online!"
          />
          <img
            alt=""
            border="0"
            src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
            width="1"
            height="1"
          />
        </form>
      </div>
    </div>
  );
};

export default PayPalSubscription;