import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';


const FetchData = () => {

    const navigate = useNavigate()

    const [datas,setDatas] = useState([])
    const [token,setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjliYTYwMzE4OTE1MTQxY2Y3Y2Q4MWYiLCJpYXQiOjE3MjE0NzY2NzJ9.sxppInfl9Z9cN9kdaQBDm1PNrIo7mBsylgrmYwu6bOM')

    const headers = {
         Authorization : token,
        'Accept': 'application/json',
        'content-Type':'application/json'
    }

    useEffect(()=>{
         axios.get('http://localhost:4000/api/getall',{headers:headers})
        .then(res=>{
          if(res.data.status === 'true'){
            setDatas(res.data.data)
          }
          console.log(res)
        })
        .catch(err=>console.log(err))

    },[])
    return (
        <div>
            <h1 className='fetchheading'>Fetch Data</h1>
            <br></br>
            <div className='buttons'>
            <Link to='adduser' className='addbtn'>ADD USER</Link>
            <Button variant="primary" onClick={()=>{navigate('/adduser')}}>ADD USER</Button>{' '}
            <Button variant="primary" onClick={()=>{navigate('/')}}>Go to Home</Button>{' '}
              
            </div>
            <Table striped bordered hover className='table'>
      <thead>
        <tr>
          <th>S.NO</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
            datas.map((item,index)=>{
                return <tr key={index}>
                <td>{index+1}</td>
                <td>{item.fname}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>
                  <Button variant="success" onClick={()=>{navigate('/update/${item._id}')}}>Update</Button>{' '}
                  <Button variant="danger" onClick={()=>{('http://localhost:4000/api/deletedata/:id')}}>Delete</Button>{' '}
                </td>
              </tr>
            })
        }
        
         </tbody>
    </Table>

        </div>
    );
};

export default FetchData;