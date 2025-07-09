import WelcomePage from "./components/pages/WelcomePage"
import { SignInForm } from "./components/form/SignInForm";
import { SignUpForm } from "./components/form/SignUpForm";
import { HomePage } from "./components/pages/HomePage";
import { Routes, Route } from 'react-router-dom';
import { Header } from "./components/navigation/headers/Header";
import { useState } from "react";
import { Posts } from "./components/pages/PostsPage";
import { ErrorAlert } from "./components/ErrorAlert";
function App() {
  return (
    <div className="App">
      <Header></Header>
      {/* <ErrorAlert error={`Error with signing in`}></ErrorAlert> */}
      <Routes>
        <Route path="/login" element={<SignInForm />}></Route>
        <Route path="/signup" element={<SignUpForm />}></Route>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/posts/hashtags/:hashtag" element={<Posts></Posts>}></Route>
        
      </Routes>
    </div>
  );
}

export default App;
