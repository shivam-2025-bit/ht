# Habit Builder Pro

A habit tracking application with PayPal subscription integration.

## Features

- Track daily habits with streak counting
- Calculate habit formation with customizable goals
- Visual progress tracking
- PayPal subscription for premium features
- Responsive design for mobile and desktop

## PayPal Integration

This app includes two PayPal integration methods:
1. PayPal Subscription API using the React PayPal JS SDK
2. PayPal Hosted Button using the provided button ID

PayPal configuration:
- Hosted Button ID: "8UUCNXMEQAV28"
- Subscription Plan ID: "P-6H6239122C6063711NAHE4QY"

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Development

This project uses:
- React for UI components
- Vite for fast development
- Tailwind CSS for styling
- PayPal React SDK for subscription handling

## Production Build

To create a production build:

```
npm run build
```

The build files will be in the `dist` directory.