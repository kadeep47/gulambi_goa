// import Message from "./Message";

import Navbar from "./components/Navbar";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Goa from "./components/Goa";
import Villa from "./components/Villa";
import Restaurants from "./components/Restaurants";
import PostExperience from "./components/PostYourExp";
import ThingsToDo from "./components/THingsToDo";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  return (
    <div style={styles.appContainer}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Goa />} /> {/* Default route */}
          <Route path="/goa" element={<Goa />} />
          <Route path="/villa" element={<Villa />} />
          <Route path="/things-to-do" element={<ThingsToDo />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/postExperience" element={<PostExperience />} />
          <Route path="/SignUp" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}
const styles = {
  appContainer: {
    backgroundColor: "#f8f5fc", // Set the background color for all pages
    minHeight: "100vh", // Ensure the background spans the entire viewport height
    padding: "0",
    margin: "0",
    fontFamily: "Arial, sans-serif",
  },
};
export default App;

// Purpose of <Router>:
// The <BrowserRouter> (aliased here as Router) wraps your entire application (or parts of it) to enable the use of routing features like <Routes> and <Link> for navigation.
