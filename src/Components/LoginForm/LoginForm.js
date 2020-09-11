import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig/firebaseConfig';

firebase.initializeApp(firebaseConfig)

const LoginForm = () => {

    const [signUp, SetSignUp] = useState(false)

    const [user, setUser] = useState({
        userName: '',
        email: '',
        password: '',
        success: false,
        error: ''
    })
    const handleSubmit = (event) => {
        if (user.email && user.password) {

            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(data => {
                    let newUser = { ...user }
                    newUser.success = true
                    newUser.error = ''
                    setUser(newUser)
                })
                .catch(error => {
                    let newUser = { ...user }
                    newUser.success = false
                    newUser.error = error.message
                    setUser(newUser)
                });
        }

        event.preventDefault()
    }
    const handleBlur = (event) => {
        let name = event.target.name
        let value = event.target.value

        let checkedData

        if (name === 'userName') {
            //Name Should be UpperCase Or LowerCase && length should be 5 to 8 
            let namePattern = /^([a-zA-Z]){5,8}$/;
            checkedData = namePattern.test(value)
        }

        if (name === 'email') {
            //Name Should be UpperCase Or LowerCase && length should be 5 to 8 
            let emailPattern = /\S+@\S+\.\S+/;
            checkedData = emailPattern.test(value)
        }

        if (name === 'password') {
            //Should be UpperCase, LowerCase, Number && length should be 6 to 12
            let pwdPattern = /^(?=.*[0-9])(?=(?:[^A-Z]*[A-Z]){1})(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/;
            checkedData = pwdPattern.test(value)
        }
        console.log(checkedData)
        if (checkedData) {
            let newUser = { ...user }
            newUser[name] = value
            setUser(newUser)
        }

    }
    return (
        <div className='container'>
            <h1 className='jumbotron text-center text-success display-4 py-4'>Simple Login With Regular Expression</h1>
            {user.success && <h4 className='text-center text-success'>User Added Successfully</h4>}
            {user.error && <h4 className='text-center text-danger'>{user.error}</h4>}
            <form>
                <div className='form-group col-md-4 mx-auto'>
                        <input onChange={()=> SetSignUp(!signUp)} className="form-check-input" type='checkbox' id='checkData'></input>
                        <label for ='checkData' className='text-secondary'>Sign Up</label>
                        {signUp && <input onBlur={handleBlur} name='userName' type='text' className='form-control ' placeholder='Enter Username'></input>}
                        <input onBlur={handleBlur} name='email' type='email' className='form-control mt-2' placeholder='Enter Email'></input>
                        <input onBlur={handleBlur} name='password' type='password' className='form-control mt-2' placeholder='Enter Password'></input>
                        <input onClick={handleSubmit} className=' btn btn-success rounded mt-3 btn-lg' type='submit' value='Sign Up'></input>
                    </div>
            </form>
        </div>
    );
};

export default LoginForm;