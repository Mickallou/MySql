import './App.css';
import Loader from './Loader';
import NavBar from './NavBar';
import Router from './Router';
import { createContext, useState } from 'react';

export const GeneralContext = createContext()

function App() {
  const [loading, setLoading] = useState(false)

  return (
    <GeneralContext.Provider value={{setLoading}}>
      <div className="App">
        <NavBar />
        <Router />
        {loading && <Loader />}
      </div>
    </GeneralContext.Provider>
  );
}

export default App;
