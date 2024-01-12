import { useState } from "react";
import About from "./components/About";
import Contactus from "./components/Contactus";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [focusedPage, setFocusedPage] = useState("homepage");

  return (
      <div> 
        <BrowserRouter>
          <Navbar focusedPage={focusedPage} setFocusedPage={setFocusedPage} />
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact-us" element={<Contactus />} />
          </Routes>
        </BrowserRouter>
      </div> 
  )
}

export default App;
