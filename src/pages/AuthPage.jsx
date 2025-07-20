

import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import "../css/auth.css";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-tabs">
          <button
            className={`tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`tab ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => setActiveTab("signup")}
          >
            Signup
          </button>
        </div>

        <div className="auth-form">
          {activeTab === "login" ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
}
/*import React from "react";
import { Link } from "react-router-dom";
import "../css/AuthPage.css"; // optional, for styling

function AuthPage() {
  return (
    <div className="auth-page">
      <h1>🎬 Welcome to byananya</h1>
      <p>Please login or signup to continue</p>
      <div className="auth-buttons">
        <Link to="/login" className="auth-btn">Login</Link>
        <Link to="/signup" className="auth-btn">Signup</Link>
      </div>
    </div>
  );
}

export default AuthPage;
*/


/*import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import "../css/AuthPage.css"; // Optional: style the switch buttons

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page">
      <div className="auth-toggle">
        <button
          onClick={() => setIsLogin(true)}
          className={isLogin ? "active" : ""}
        >
          Log In
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={!isLogin ? "active" : ""}
        >
          Sign Up
        </button>
      </div>

      {isLogin ? <Login /> : <Signup />}
    </div>
  );
}*/