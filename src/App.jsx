import React from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import Ballpit from "./components/home/Background"
function App() {

  return (
    <>
      <div className="App">
        {/* <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1 // Put it behind all content
        }}>
          <Ballpit
            count={20}
            gravity={0.7}
            friction={0.8}
            wallBounce={0.95}
            followCursor={true}
          />        
        </div> */}
        <div className="AppContent">
        <Router>
          <Routes>
            <Route exact path="/" element={<HomePage />}></Route>
          </Routes>
        </Router>
        </div>
      </div>
    </>
  )
}

export default App
