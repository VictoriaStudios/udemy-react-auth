import { useState, useRef } from 'react';
import { apiKey } from '../../utilities/apiKey';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const submitHandler = (event) => {
    event.preventDefault()

    const email= emailInputRef.current.value
    const password= passwordInputRef.current.value

    if (isLogin) {

    }
    else {
      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
      {
        method: 'POST',
        body: JSON.stringify({
          email:email,
          password:password,
          returnToken:true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then (res => {
        if (res.ok) {
          //
        } else {
          res.json().then (data => {
            let errorMessage = 'Create User failed'
            if (data && data.error && data.error.message) errorMessage = data.error.message
            alert (errorMessage)
          })
        }
      })
    }

  }

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailInputRef} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input ref={passwordInputRef} type='password' id='password' required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
