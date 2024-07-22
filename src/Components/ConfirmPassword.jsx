import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
// import '../Components/Forgetpassword.css'
import { useNavigate, useParams } from 'react-router-dom';

const ConfirmPassword = () => {

    const navigate = useNavigate()

    const [newPassword, SetNewPassword] = useState('')
    // const [tokens, SetTokens] = useState(props.token)
    const [data, setData] = useState('')
    const [errormsg, setErrorMsg] = useState('')
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
            { newPassword })
            .then(res =>{
            
                if(res.data.status === 'true'){
                    alert("password updated")
                    navigate('/signin')
                }
            } 
            )
            .catch(err => console.log(err))
            
        }
        return (
            <div className='box1'>
                <form className='form'>
                    <h3 className='title'>Confirm Password</h3>
                    <div className='mb-2'>
                        <label htmlFor="password" className='content'>Newpassword</label>
    
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
    
                    </div>
    
                    <div>
                        <Button onClick = {(e)=>handleSubmit(e)}
                            type='submit' variant="primary" className='btn'><b>Set Password</b>
                        </Button>
                    </div>
                </form>
            </div>
        );
    };
    
    export default ConfirmPassword;

                
                

