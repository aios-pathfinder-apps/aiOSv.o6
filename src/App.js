import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './Home.css';
import './App.css';
import { AGENT_SUPERVISOR, AGENT_MANAGER, DIGITAL_BRAIN, TRANSLATOR, AIOS_AGENT, FEEDBACK } from './global';
function App() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
      googleLogout();
      setProfile(null);
    };
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

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
    [ user ]
);



  return (
    <div>
      {profile ? (
        <div className="container-fluid homepage">
          <h1>
            <span>aiOS</span><span>v0.6</span>
          </h1>
          <h2 className="mb-5">
            The conversational AI OS
          </h2>
          <div className="row">
            <div className="col-md-6 research">
              <a className="project" href={AGENT_SUPERVISOR}>Research</a>
            </div>
            <div className="col-sm-6 imagine">
              <a className="project" href={AGENT_MANAGER}>Imagine</a>
            </div>
            <div className="col-sm-6 remember">
              <a className="project" href={DIGITAL_BRAIN}>Remember</a>
            </div>
            <div className="col-sm-6 build">
              <a className="project" href={TRANSLATOR}>Build</a>
            </div>
            <div className="col-sm-6 summarize">
              <a className="project" href={AIOS_AGENT}>Summarize</a>
            </div>
            <div className="col-sm-6 plus">
              <a className="project" href="#">+</a>
            </div>
            <div className='col-sm-4'></div>
            <div className="col-sm-4 my-5 feedback">
              <a className="project btn_feedback" href={FEEDBACK}>Feedback</a>
              <button className='btn_feedback mt-2' onClick={logOut}>Log out</button>
            </div>
            <div className='col-sm-4'></div>


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
}
export default App;
