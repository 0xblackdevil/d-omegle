import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MetaMaskProvider } from 'metamask-react';

import { HuddleClient, HuddleProvider } from '@huddle01/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

const huddleClient = new HuddleClient({
  projectId: process.env.HUDDLE_PROJECT_ID,
  options: {
    activeSpeakers: {
      size: 2,
    },
  },
});

root.render(
  <React.StrictMode>
    <MetaMaskProvider>
      <HuddleProvider key="huddle01-provider" client={huddleClient}>
        <App />
      </HuddleProvider>
    </MetaMaskProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
