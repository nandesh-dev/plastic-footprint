import React from 'react';
import ReactDOM from 'react-dom/client';
import { MobileLayout, DesktopLayout } from './layouts';
import { App, Info } from "./screens"
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {
      window.innerHeight > window.innerWidth ? 
        <MobileLayout>
          <App/>
        </MobileLayout> :
        <DesktopLayout>
          <App/>
          <Info/>
        </DesktopLayout>
    }
  </React.StrictMode>
);