import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { BrowserRouter as Router, Switch, Route, Routes, useNavigate, useLocation } from "react-router-dom";

import Link from '@mui/material/Link';

import Button from '@mui/material/Button';

import { Divider } from '@mui/material';

const top = ["GrahamCampbell","fabpot","weierophinney","rkh","josh"];





const App = () => {

 return (

  <>

  <Router>

    <NavBar />

    <Routes>

      

      <Route path='/' element={<Home />} />

      <Route path='/User' element={<User />} />

      

    </Routes>

   </Router>

  </>

 );

}



const Home = () => {

 const navigate = useNavigate();

 const selectUser = (user) =>{

  navigate(`/User`, {state:user});

 }

 return (

   <div style={{display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>  

	<h1>Top 5 Github Users</h1>

	<span>Tap the username to see more information</span>

    { top && top.map((user)=>{

     return(

       

       <Button style={{margin:'0.2em'}} variant="contained" onClick={()=>selectUser(user)}>{user}</Button>

       

      )

    })

    }

   </div>

  )

}



const User = () => {

 const location = useLocation();

 const [user_, setUser_] = useState('')

 useEffect(() => {

  getUser(location.state)

 }, []);



 const getUser =async(user)=> {

  await axios.get(`https://api.github.com/users/${user}`)

  .then(res => {console.log(res);setUser_(res.data)})

 }



 return(

   user_ &&

   <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>  

	<div>

    <div style={{display:'flex', flexDirection: 'row', paddingTop: '1em'}}>

      <img style={{borderRadius:'%50', width: '60px', height:'60px', paddingTop: '1em'}} src={user_.avatar_url}></img>

      <div style={{display:'flex', flexDirection: 'column', padding:'0.3em'}}>

       <h2>{user_.name}</h2>

       <span style={{color: 'grey'}}>{user_.location}</span>

      </div>

	</div>

	 <Divider style={{width:'50vh'}}/>

    </div>

   </div>

  )

}



const NavBar =() =>{

 return(

   <div style={{backgroundColor: '#282828', color:'white', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

    Home

   </div>

  )

}



export default App;
