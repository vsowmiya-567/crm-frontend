
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { emailValidation } from './Regexvalidation.jsx';
import axios from 'axios';


const Update = () => {

    const navigate = useNavigate()
    const id = useParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const [errorMessage, setErrorMessage] = useState('')
    const [message, setMessage] = useState('')
    const [token,setToken]      = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjliYTYwMzE4OTE1MTQxY2Y3Y2Q4MWYiLCJpYXQiOjE3MjE0NzY2NzJ9.sxppInfl9Z9cN9kdaQBDm1PNrIo7mBsylgrmYwu6bOM')

    const headers = {
        Authorization : token,
       'Accept': 'application/json',
       'content-Type':'application/json'
   }

    useEffect(()=>{
        axios.get('http://localhost:4000/api/getby/'+id,{headers:headers})
        .then(res=>{
            console.log(res);
        })
        .catch(err=> console.log(err))
    },[])

    const handlesubmit = async(e) => {
        console.log("button click");
        e.preventDefault()
        try {

            if(name === ''){
                return setErrorMessage('Name is required')
            }

            if(!emailValidation(email) )
                return setErrorMessage('please Enter valid email ID')

            if(phone === ''){
                return setErrorMessage('Phone is required')
            }

            if (address === ''){
                return setErrorMessage('Address is Required')
            }

            console.log(name,email,phone,address);

            await axios.post('http://localhost:4000/api/update/:id',{name,email,phone,address },{headers:headers}) 
            .then(res =>
                {
                    if(res.data.status === 'true'){
                        setMessage(res.data.data)
                        alert("User Added successfully")
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

                <h3 className='title addheading'>UPDATE USER</h3>
                {errorMessage.length > 0 && <div style={{marginLeft:'60px',color:'red'}}>{errorMessage}</div>}


                <Form>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label className='labels'>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name='name'
                            placeholder="Enter your Name"
                            className='inpbox'
                            onChange={(e) => { setName(e.target.value) }}
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
                         Update 
                    </Button>
                </div>

                
            </div>

        </div>
    );
};

export default Update;