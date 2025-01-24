import React, { useState } from 'react';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import Final from './Final';
import {Route,Routes} from "react-router-dom"
import Home from './Home';
function App() {

  return (
    <>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/page1" element={<Page1/>}/>
    <Route path="/page2" element={<Page2/>}/>
    <Route path="/page3" element={<Page3/>}/>
    <Route path="/page4" element={<Page4/>}/>
    <Route path="/page5" element={<Page5/>}/>
    <Route path="/final" element={<Final/>}/>
    </Routes>
         
    </>
  )
}

export default App