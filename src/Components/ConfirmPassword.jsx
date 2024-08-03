import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
// import '../Components/Forgetpassword.css'
import { useNavigate, useParams } from 'react-router-dom';

const ConfirmPassword = () => {

    const navigate = useNavigate()

    const [newPassword, SetNewPassword] = useState('')
    const [data, setData] = useState('')
    const [errormsg, setErrorMsg] = useState('')
    const [message,setMessage] = useState('')
    const { id, token } = useParams()


    const handleSubmit = (e) => {

        e.preventDefault()
        if (!newPassword) {
            return setErrorMsg('Password Required')
        }
        else if (newPassword.length < 6) {
            return setErrorMsg('password should have minimun 6 characters')
            
        }

        axios.post(`http://localhost:4000/api/reset-passwords/${id}/${token}`,
            {newPassword} )
            .then(res =>{
                console.log(res);
                if(res.data.status === 'true'){
                    setMessage(res.data.message)
                    alert("password updated")
                    navigate('/signin')
                }
            } 
            )
            .catch(err => console.log(err))
            console.log('from confirm','id',id,'------','token',token);
        }
        return (
            <div className='cont confirmcont'>
                <form className='form'>
                    <h3 className='title confirmtitle'>Confirm Password</h3>
                    <div className='mb-2'>
                        <label htmlFor="password" className='labels'>Newpassword</label>
    
                        <input type="email"
                            placeholder='Enter Your Password' className='form-control inpbox'
                            onChange={(e) => SetNewPassword(e.target.value)}
                            value={newPassword.newPassword}
                        />
                        {errormsg.length > 0 && (
                            <div style={{ marginLeft: '70px', marginBottom: '10px', color: 'red' }}>
                                {errormsg}
                            </div>
                        )}
                        {message.length > 0 && (
                            <div style={{ marginLeft: '70px', marginBottom: '10px', color: 'red' }}>
                                {message}
                            </div>
                        )}
    
                    </div>
    
                    <div>
                        <Button onClick = {(e)=>handleSubmit(e)}
                            type='submit' variant="primary" className='button'><b>Set Password</b>
                        </Button>
                    </div>
                </form>
            </div>
        );
    };
    
    export default ConfirmPassword;

                
                

