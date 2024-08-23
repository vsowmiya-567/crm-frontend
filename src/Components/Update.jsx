
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { emailValidation } from './Regexvalidation.jsx';
import axios from 'axios';


const Update = () => {

    const navigate = useNavigate()
    const id = useParams()
    // console.log('id',id);
    const [fname, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const [errorMessage, setErrorMessage] = useState('')
    const [message, setMessage] = useState('')

    const token = localStorage.getItem('token')

    // console.log('token from update',token);

    const config = {
        headers :{
           token:token
        } 
       }

        useEffect(() => {
                        
        axios.get(`https://crmbackends.onrender.com/api/getby/${id.id}`,config)
            .then(result => {
                console.log(result);
                setName(result.data.data.fname)
                setEmail(result.data.data.email)
                setPhone(result.data.data.phone)
                setAddress(result.data.data.address)
            })
            .catch(err => console.log(err))
    }, [])

    const handlesubmit = async (e) => {
        // console.log("button click");
        e.preventDefault()
        try {

            if (!fname) {
                return setErrorMessage('Name is required')
            }

            if (emailValidation(email) || !email)
                return setErrorMessage('please Enter valid email ID')

            if (!phone) {
                return setErrorMessage('Phone is required')
            }

            if (!address) {
                return setErrorMessage('Address is Required')
            }

            console.log(fname, email, phone, address);

            await axios.put(`https://crmbackends.onrender.com/api/update/${id.id}`, { fname, email, phone, address }, config)
                .then(result => {
                    console.log('result',result);
                    if (result.data.status === 'true') {
                        // setMessage(result.data.message)
                        alert(result.data.message)
                        navigate('/fetchdata')
                    }
                }
                )
                .catch(err => {

                    setMessage(err.res.data.message)
                })


        } catch (error) {

            console.log(error);
        }
    }

    return (
        <div>

            <div className='cont adduser'>

                <h3 className='title addheading'>UPDATE USER</h3>
                {errorMessage.length > 0 && <div style={{ marginLeft: '60px', color: 'red' }}>{errorMessage}</div>}

                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label className='labels'>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name='name'
                            placeholder="Enter your Name"
                            className='inpbox'
                            value={fname}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                        {message.length > 0 && (<div style={{ marginLeft: '70px', marginTop: '20px', color: 'red' }}>{message}</div>)}

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
                        <Form.Label className='labels'>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name='email'
                            placeholder="Enter your Email"
                            className='inpbox'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        {message.length > 0 && (<div style={{ marginLeft: '70px', marginTop: '20px', color: 'red' }}>{message}</div>)}

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea3">
                        <Form.Label className='labels'>Phone Number</Form.Label>
                        <Form.Control
                            type="number"
                            name='phone'
                            placeholder="Enter your Phone Number"
                            className='inpbox'
                            value={phone}
                            onChange={(e) => { setPhone(e.target.value) }}
                        />
                        {message.length > 0 && (<div style={{ marginLeft: '70px', marginTop: '20px', color: 'red' }}>{message}</div>)}

                    </Form.Group>


                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea4">
                        <Form.Label className='labels'>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name='address'
                            placeholder="Enter your Address"
                            className='inpbox'
                            value={address}
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