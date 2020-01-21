import React from 'react';

import Routes from "./routes"
import { ToastProvider } from "react-toast-notifications";

const App = () => (
    <div className="App">
      <ToastProvider>
        <Routes/>
      </ToastProvider>
    </div>
);  

export default App;
