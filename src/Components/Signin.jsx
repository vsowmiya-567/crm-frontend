// import React from 'react';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { emailValidation } from './Regexvalidation.jsx';
import axios from 'axios';


const SignIn = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState('')
    const [message, setMessage] = useState('')

    const handlesubmit = async(e) => {
        // console.log("button click");
        e.preventDefault()
        try {

            if(!emailValidation(email) || email === '')
                return setErrorMessage('please Enter valid email ID')

            if(password === ''){
                return setErrorMessage('password is required')
            }

            if (password.length < 6){
                return setErrorMessage('password should have minimun 6 characters')
            }

            console.log(email);
            console.log(password);

            await axios.post('http://localhost:4000/api/login',{ email, password }) 
            .then(res =>
                {
                    if(res.data.status === 'true'){
                        alert("login successfully")
                        navigate('/fetchdata')
                    }
                }
            )
            .catch(err =>{

                setMessage(err.res.data.message)
            })


        } catch (error) {

            console.log(error);
        }
    }

    return (
        <div>
            {/* <h1>Sign In</h1> */}

            <div className='cont signin'>

                <h3 className='title signintitle'>Sign In</h3>
                {errorMessage.length > 0 && <div style={{marginLeft:'60px',color:'red'}}>{errorMessage}</div>}


                <Form>


                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label className='labels'>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name='email'
                            placeholder="Enter your Email"
                            className='inpbox'
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        {message.length > 0 && (<div style={{marginLeft:'70px',marginTop:'20px',color:'red'}}>{message}</div>)}

                    </Form.Group>


                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
                        <Form.Label className='labels'>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name='password'
                            placeholder="Enter your Password"
                            className='inpbox'
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </Form.Group>
                </Form>
                <div>
                    <Button
                        onClick={handlesubmit}
                        variant="primary"
                        type='submit'
                        className='button'>
                        Sign In
                    </Button>
                </div>

                <br></br>

                <Link to={'/forgetpass'} className='haveacc signinlink'>Forget Password?</Link>
                <Link to={'/signup'} className='signinlink'>Sign Up</Link>
            </div>

        </div>
    );
};

export default SignIn;