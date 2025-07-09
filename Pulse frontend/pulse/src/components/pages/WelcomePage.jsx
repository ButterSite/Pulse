import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const WelcomePage = () => {


    return (
        <div className="welcome-container center-div full-width-div">
            <div>
            <img src="/photos/welcomeLogo.png"></img>
            </div>
            <div>
                <p className="welcome-text">See what's happening</p>
                <p className="typewriter">Join Pulse Today</p>
                <div className="welcome-buttons-container">
                    <button className="welcome-button">Sign Up</button>
                    <Link to={`/login`}><p><b>Have an account?</b></p></Link>
               
                </div>

            </div>
        </div>
    )
}


export default WelcomePage