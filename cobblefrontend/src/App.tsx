import React from 'react';
import Navbar from './components/NavBar';
import FooterBar from './components/FooterBar';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar/>
      <div className='middle-part'></div>
      <FooterBar/>
    </div>
  );
};

export default App;

