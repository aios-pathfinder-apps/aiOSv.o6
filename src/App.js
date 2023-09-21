import React, { useState, useEffect, useRef } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import 'particles.js/particles';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './Home.css';
import './App.css';
import { Dashboard, Smart_Employee, Tinder_app, TRANSLATOR, AIOS_AGENT, FEEDBACK } from './global';

const particlesJS = window.particlesJS;

const App = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [auth, setAuth] = useState(false)

  const logOut = () => {
    googleLogout();
    localStorage.clear()
    setAuth(false)
    setProfile(null);
  };



  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      localStorage.setItem("accessToken", codeResponse.access_token)
      setAuth(true)
      setUser(codeResponse)
    },
    onError: (error) => console.log('Login Failed:', error)
  });


  useEffect(() => {
    const isAuth = typeof localStorage.getItem("accessToken") === "string"
    if (!isAuth) return
    setAuth(true)
  }, [])

  useEffect(
    () => {
      if (user) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            setProfile("profile");
            console.log(profile);
          })
          .catch(error => {
            console.error('Error:', error);
            setProfile(null)
          });
      }
    },
    [user]
  );

  useEffect(() => {
    particlesJS.load('particles-js', 'particles.json', function () {
      console.log('callback - particles.js config loaded');
    });
  }, []);

  // Function to handle API calls
  const handleApiCall = async (apiEndpoint) => {
    try {
      const response = await axios.get(apiEndpoint);
      // Handle the response here (e.g., update state with the fetched data)
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // log out function to log the user out of google and set the profile array to null




  return (
    <div>
      {/* Remove "profile" and replace with "true" to bypass login page */}
      {auth ? (
        <div className="container-fluid homepage">
          <h1>
            <span>aiOS</span><span>v0.6</span>
          </h1>
          <h2 className="mb-5">
            The conversational AI OS
          </h2>
          <div className="row">
            <div className="col-md-6 research col-width">
              <a className="project" href={Smart_Employee}>AI Smart Employee
              </a>
            </div>
            <div className="col-sm-6 imagine col-width">
              <a className="project" href={Dashboard}>AI Employee Dashboard</a>
            </div>
            <div className="col-sm-6 remember col-width">
              <a className="project" href={Tinder_app} >AiOS Niue Chat</a>
            </div>
            <div className="col-sm-6 build col-width">
              <a className="project" href={TRANSLATOR} >+</a>
            </div>
          
            <div className="col-sm-4 my-5 feedback col-width">
              <button className='btn_feedback mt-2' onClick={logOut}>Log out</button>
            </div>


          </div>

          <footer className="home_footer">
            <p>Copyright 2023 AfterFlea. All rights reserved</p>
          </footer>
        </div>
      ) : (
        <div className="container login_body">
          <h1>
            <span>aiOS</span><span>v0.6</span>
          </h1>
          <h2 className="mb-5">
            The conversational AI OS
          </h2>
          <div className="box">
            <h3>Login</h3>
            <button onClick={() => login()}>Register</button>
            <button onClick={() => login()}>Login</button>
          </div>
          <footer>
            <p>Copyright 2023 AfterFlea. All rights reserved</p>
          </footer>
        </div>
      )}
    </div>
  );
};

export default App;
