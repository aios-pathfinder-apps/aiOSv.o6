import React, { useState, useEffect, useRef } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import 'particles.js/particles';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './Home.css';
import './App.css';
import { Conflict, Psychaid, ChildCare, ElderCare, AIOS_AGENT, FEEDBACK } from './global';

const particlesJS = window.particlesJS;

const App = () => {
  useEffect(() => {
    particlesJS.load('particles-js', 'particles.json', function () {
      console.log('callback - particles.js config loaded');
    });
  }, []);

  // Function to handle API calls
  const handleApiCall = async (apiEndpoint) => {
    try {
      const response = await axios.get(apiEndpoint);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid homepage">
      <h1>
        <span>AiOS LifeSolutions</span>
      </h1>
      <h2 className="mb-5">
        Personal solutions for life's challenges
      </h2>
      <div className="row">
        <div className="col-md-6 research col-width">
          <a className="project" href={Psychaid}>MindSoothe</a>
        </div>
        <div className="col-sm-6 imagine col-width">
          <a className="project" href={Conflict}>UnitySeeker</a>
        </div>
        <div className="col-sm-6 remember col-width">
          <a className="project" href={ChildCare} >Child Care</a>
        </div>
        <div className="col-sm-6 build col-width">
          <a className="project" href={ElderCare} >Senior Care</a>
        </div>
      </div>

      <footer className="home_footer">
        <p>Copyright 2023 AfterFlea. All rights reserved</p>
      </footer>
    </div>
  );
};

export default App;
