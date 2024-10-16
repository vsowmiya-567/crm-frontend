import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link, useNavigate } from 'react-router-dom';
import { emailValidation } from './Regexvalidation';
import axios from 'axios';

const SignUp = () => {

    const navigate = useNavigate()

    const[datas,setDatas] = useState({

        fname:'',
        phone:'',
        email:'',
        password:'',
        address:'',
        role:''
    })
    const [errorMessage,setErrorMessage] = useState('')

    const handlechange = (e)=>{

        const {name,value} = e.target

        setDatas({...datas,[name]:value})
    }
    const handleSelect = (eventKey)=>{
        setDatas({...datas,role:eventKey})
    }
       
    const handlesubmit = async (e)=>{
        try {

            e.preventDefault()

            if(datas.fname === '')return setErrorMessage('Name is Required')

            if(datas.phone === '')return setErrorMessage('Phone Number is Required')

                
                if(!emailValidation(datas.email) === '' || (datas.email) === '')
                    return setErrorMessage('Please enter valid email ID')
                
                if(datas.password === ''){
                    return setErrorMessage('Password is required')
                }
                
                if(datas.password.length < 6){
                    return setErrorMessage('Password should have 6 characters')
                }
                
                if(datas.address === '')return setErrorMessage('Address is Required')

            console.log("datas",datas);

            await axios.post('https://crmbackends.onrender.com/api/register',datas)
            .then(res => {
                if(res.data.status === 'true'){
                    alert('Registered successfully')
                    navigate('/signin')
                }else{
                    console.log(res.data.message)
                }
            })

            } catch (error) {
            console.log(error);

        }
    }

    return (

    <div className='cont'>
        
        <h3 className='title'>Sign up</h3>
        {errorMessage.length > 0 && <div style={{marginLeft:'60px',color:'red'}}>{errorMessage}</div>}

    <Form >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className='labels'>Name</Form.Label>
            <Form.Control 
            type="text" 
            name='fname' 
            value={datas.fname}
            placeholder="Enter your name"
            className='inpbox' 
            onChange={handlechange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className='labels'>Phone Number</Form.Label>
            <Form.Control 
            type="number" 
            name='phone'
            value={datas.phone}
            placeholder="Enter your Phone Number" 
            className='inpbox' 
            onChange={handlechange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
            <Form.Label className='labels'>Email</Form.Label>
            <Form.Control 
            type="email" 
            name='email' 
            value={datas.email}
            placeholder="Enter your Email" 
            className='inpbox' 
            onChange={handlechange}/>
        </Form.Group>


        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea3">
            <Form.Label className='labels'>Password</Form.Label>
            <Form.Control 
            type="password" 
            name='password' 
            value={datas.password}
            placeholder="Enter your Password"
            className='inpbox' 
            onChange={handlechange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea4">
            <Form.Label className='labels'>Address</Form.Label>
            <Form.Control 
            type="text" 
            name='address' 
            value={datas.address}
            placeholder="Enter your Address Here"
            className='inpbox' 
            onChange={handlechange} />
        </Form.Group>
    </Form>
       
            <div>
                <h6 className='types' >Type of User</h6>
                <Dropdown onSelect={handleSelect}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {datas.role || 'Select a role'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="Admin" href="#/action-1" >Admin</Dropdown.Item>
                        <Dropdown.Item eventKey="Manager" href="#/action-2">Manager</Dropdown.Item>
                        <Dropdown.Item eventKey="Employee" href="#/action-3">Employee</Dropdown.Item>
                    </ Dropdown.Menu>
                </Dropdown>
            </div>
        <br></br>
            <div>
                <Button variant="primary" type='submit' className='button' onClick={handlesubmit}>Sign Up</Button>
            </div>
            <br></br>
            <p className='haveacc signinlink'>Have an Account?</p>
            <Link to={'/signin'} className='signinlink'>Sign In</Link>
        </div>
    );
};

export default SignUp;



