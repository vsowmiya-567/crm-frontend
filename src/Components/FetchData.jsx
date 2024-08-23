import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';


const FetchData = () => {

    const navigate = useNavigate()
    const [datas,setDatas] = useState([])
    const token = localStorage.getItem("token")
    console.log('token from fetch',token);

    const config = {
         headers :{
            token:token
         } 
        }

    useEffect(()=>{
      
      const getData = async()=>{

        await axios.get('https://crmbackends.onrender.com/api/getall',config)
        .then(result=>{
            console.log(result) 
          if(result.data.status === 'true'){
            setDatas(result.data.data)
          }
      })
        .catch(err=>console.log(err))
      }
        getData() 
    },([datas]))

     const handleDelete = async(id)=>{
      await axios.delete('https://crmbackends.onrender.com/api/deletedata/'+id,config)
      .then(result=> {
        console.log(result);
        alert(result.data.message)
        navigate('/fetchdata')
      })
      .catch(error=>console.log(error))
    }

    return (
        <div>
            <h1 className='fetchheading'>User Datas</h1>
            <br></br>
            <div className='buttons'>
            {/* <Link to='/adduser' className='addbtn'>ADD USER</Link> */}
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
            datas[0] ?(datas.map((item,index)=>{

              return <tr key={index}>

                <td>{index+1}</td>
                <td>{item.fname}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>
                  <Button variant="success" onClick={()=>{navigate(`/update/${item._id}`)}}>Update</Button>{' '}
                  <Button variant="danger" onClick={()=>{handleDelete(item._id)}}>Delete</Button>{' '}
                </td>
              </tr>
            })) 
            : (
              <tr>
                <td className='td' colSpan={6}>No Datas to Display</td>
              </tr>
            )
            
        }
        
         </tbody>
    </Table>

        </div>
    );
};

export default FetchData;