
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { emailValidation } from './Regexvalidation.jsx';
import axios from 'axios';


const AddUser = () => {

    const navigate = useNavigate()

    const [fname, setFName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const [errorMessage, setErrorMessage] = useState('')
    const [message, setMessage] = useState('')
    const token = localStorage.getItem('token')

        const config = {
            headers:{
                token:token
            }
        }
       const handlesubmit = async(e) => {

        console.log("button click");

        console.log(fname,email,phone,address);

        e.preventDefault()

        try {

            if(!fname){
                return setErrorMessage('Name is required')
            }

            if(emailValidation(email) )
                return setErrorMessage('please Enter valid email ID')

            if(!phone){
                return setErrorMessage('Phone is required')
            }

            if (!address){
                return setErrorMessage('Address is Required')
            }

            await axios.post('http://localhost:4000/api/adduserdata',{fname,email,phone,address },config) 
            .then(res =>
                {
                    if(res.data.status === 'true'){
                        // setMessage(res.data.message)
                        alert(res.data.message)
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
            {/* <h1>ADD USER</h1> */}

            <div className='cont adduser'>

                <h3 className='title addheading'>ADD USER</h3>
                {errorMessage.length > 0 && <div style={{marginLeft:'60px',color:'red'}}>{errorMessage}</div>}


                <Form>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label className='labels'>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name='name'
                            placeholder="Enter your Name"
                            className='inpbox'
                            onChange={(e) => { setFName(e.target.value) }}
                        />
                        {message.length > 0 && (<div style={{marginLeft:'70px',marginTop:'20px',color:'red'}}>{message}</div>)}

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
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

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea3">
                        <Form.Label className='labels'>Phone Number</Form.Label>
                        <Form.Control
                            type="number"
                            name='phone'
                            placeholder="Enter your Phone Number"
                            className='inpbox'
                            onChange={(e) => { setPhone(e.target.value) }}
                        />
                        {message.length > 0 && (<div style={{marginLeft:'70px',marginTop:'20px',color:'red'}}>{message}</div>)}

                    </Form.Group>


                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea4">
                        <Form.Label className='labels'>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name='address'
                            placeholder="Enter your Address"
                            className='inpbox'
                            onChange={(e) => { setAddress(e.target.value) }}
                        />
                    </Form.Group>
                </Form>
                <div>
                    <Button
                        onClick={handlesubmit}
                        variant="primary"
                        type='submit'
                        className='button'>
                         Add 
                    </Button>
                </div>

                
            </div>

        </div>
    );
};

export default AddUser;