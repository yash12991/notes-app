import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotePage from "./pages/NotePage";
import NoteForm from "./components/NoteForm";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NoteForm />} />
        <Route path="/note/:id" element={<NotePage />} />
        <Route path="/edit/:id" element={<NoteForm />} />
      </Routes>
    </Router>
  );
};

export default App;
