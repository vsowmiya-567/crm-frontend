// import React from 'react';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { emailValidation } from './Regexvalidation';
import axios from 'axios';


const Forgetpassword = () => {

    const initial = {email:''}

    const[email,setEmail] = useState('')
    const[id,setId] = useState('')
    const[token,setToken] = useState('')
    const[errorMsg,setErrorMsg] = useState('')
    const[message,setMessage] =   useState('')

       const handlesubmit = async(e)=>{
        
        try {
            e.preventDefault()

            if(email === ''){
                return setErrorMsg('Email is required')
            }
            else if(emailValidation(email)){
                return setErrorMsg('Please enter valid Email ID')
            }

            await axios.post('http://localhost:4000/api/forget-password',{email})
            .then(res =>{
                    console.log(res);
                    localStorage.setItem('token',token)
                if(res.data.status === 'true'){
                    setId(res.data.id)
                    setToken(res.data.token)
                    alert(res.data.message)
                    setEmail(initial)
                }
            })
            console.log('id-----',id,'token-----',token);
        } catch (error) {
            console.log(error);
            setMessage(error.res.data.message)
        }
    }

     return (
        <div>
            {/* <h1>Forget password</h1> */}

         <div className='cont forgetcon'>

                <h3 className='title signintitle'>Forget Password</h3>

                <Form>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label className='labels'>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter your Email" 
                            className='inpbox'
                            name='email' 
                            value={email} 
                            onChange={(e)=>{setEmail(e.target.value)}} />
                             {message.length > 0 && (<div style={{marginLeft:'70px',marginTop:'8px',color:'red'}}>{message}</div>)}
                             {errorMsg.length > 0 && (<div style={{marginLeft:'70px',marginBottom:'15px',color:'red'}}>{errorMsg}</div>)}
                    </Form.Group>
                </Form>
                <div>
                    <Button variant="primary" className='button' type='submit' onClick={handlesubmit}>Reset Password</Button>
                </div>

                <br></br>

                </div>

        </div>
    
       
    );
};

export default Forgetpassword;