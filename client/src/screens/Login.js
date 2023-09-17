import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate, Link } from 'react-router-dom'
import Carousel from '../components/Carousel'
import { backendlink } from '../helper'
import LoadingSpinner from '../components/LoadingSpinner'
import { GoogleLogin } from '@react-oauth/google';

//Component embedding pending
//Backend integration pending



export default function Login() {

  const [spin, setspin] = useState(false)

  // useEffect(() => {
  //   global.userdata = null

  //   return () => {

  //   }
  // }, [])


  const [passtype, setpasstype] = useState("password")
  const [user, setuser] = useState({ email: "", password: "" })
  let navigate = useNavigate();

  function handlepasskey() {
    passtype === "password" ? setpasstype("text") : setpasstype("password");
  }

  const handlesubmit = async (event) => {
    event.preventDefault();
    setspin(true)

    const req = await fetch(backendlink + "/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ email: user.email, password: user.password })

    })


    const res = await req.json();
    // console.log(res);

    if (!res.success) {
      if (res.email) {

        alert("Invalid password. Try again.")
        setspin(false)
      }
      else {

        alert("Invalid email. Sign up on the website.")
        setspin(false)
        navigate("/signup")


      }
    }

    else {
      // console.log("User logged in successfully!");
      localStorage.setItem("authTkn", res.authTkn);
      // console.log(localStorage.getItem("authTkn"));
      localStorage.setItem('userrole', res.userdata.role)
      // global.userdata = res.userdata
      localStorage.setItem('username', res.userdata.name)
      localStorage.setItem('useremail', res.userdata.email)
      // console.log(res.userdata.email)
      setspin(false)
      navigate("/");
    }
  }

  const handlechange = (label) => {
    setuser({
      ...user,
      [label.target.id]: label.target.value
    })
  }

  const loginuser = async (credentials) => {
    console.log("Login succedd")
    console.log(credentials)
    setspin(true)

    const req = await fetch(backendlink + "/api/loginuserwithgoogle", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ credentials: credentials })
    })


    const res = await req.json();
    // console.log(res);

    if (!res.success) {

      alert("Internal server error. Please try again.")
      setspin(false)
      navigate("/")
    }

    else {
      // console.log("User logged in successfully!");
      localStorage.setItem("authTkn", res.authTkn);
      // console.log(localStorage.getItem("authTkn"));
      localStorage.setItem('userrole', res.userdata.role)
      // global.userdata = res.userdata
      localStorage.setItem('username', res.userdata.name)
      localStorage.setItem('useremail', res.userdata.email)
      localStorage.setItem('userpicture', res.userdata.picture);
      // console.log(res.userdata.email)
      setspin(false)
      navigate("/");
    }
  }

  const loginfail = () => {
    console.log("gaya")
  }



  // const tkn = localStorage.getItem('authTkn')

  return (

    <div className='mt-5 pt-5' >

      <div><Navbar getdata={(data) => { }} /></div>

      {(spin === false) ?
        <div>

          <div className="row">

            <div className="col-xl-8 col-lg-8 col-sm-12 rounded ms-4 ">
              <Carousel />
            </div>

            <div className="col-xl-3 col-lg-3 col-sm-12 shadow-lg rounded ms-5 " style={{ maxHeight: "600px" }}>

              <h5 className='text-dark ps-4 pt-4'>Login</h5>

              <div className=' border-bottom m-4 pb-4'><GoogleLogin onSuccess={loginuser} onError={loginfail} /></div>

              <form className='px-4'>
                <div className="mb-2">
                  <label htmlFor="email" className="form-label text-success">Email address</label>
                  <input type="email" className="form-control" id="email" value={user.email} onChange={handlechange} />

                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-success">Password</label>
                  <input type={passtype} className="form-control" id="password" value={user.password} onChange={handlechange} />
                </div>

                <div className='text-primary underline' onClick={handlepasskey} style={{ cursor: "pointer", textDecoration: "underline" }}>
                  {
                    (passtype === "password" ? <div>Show password</div> : <div>Hide password</div>)
                  }

                </div>

                <div type="submit" className="btn btn-success mt-3 d-block" onClick={handlesubmit}>Login</div>

              </form>




            </div>

          </div>

        </div> :
        <LoadingSpinner />
      }

      <div><Footer /></div>


    </div >

  )
}



