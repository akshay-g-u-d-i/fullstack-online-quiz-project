import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate, Link } from 'react-router-dom'
import Carousel from '../components/Carousel'
import { backendlink } from '../helper'
import LoadingSpinner from '../components/LoadingSpinner'

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



  // const tkn = localStorage.getItem('authTkn')

  return (

      <div className=' mt-5 pt-5' >

        <div><Navbar getdata={(data) => { }} /></div>

        {(spin===false)?
        <div>

          <div className="row">

            <div className="col-8 rounded ms-4 mt-4">
              <Carousel />
            </div>

            <div className="col-3 shadow-lg rounded ms-5 " style={{ maxHeight: "430px", marginTop: "50px" }}>

              <h5 className='text-dark ps-4 pt-4'>Login</h5>
              <form className='p-4'>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-success">Email address</label>
                  <input type="email" className="form-control" id="email" value={user.email} onChange={handlechange} />
                  {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-success">Password</label>
                  <input type={passtype} className="form-control" id="password" value={user.password} onChange={handlechange} />
                </div>

                <div className='btn btn-danger mb-3' onClick={handlepasskey}>
                  {
                    (passtype === "password" ? <div>Show password</div> : <div>Hide password</div>)
                  }

                </div>



                <div type="submit" className="btn btn-success mt-3 d-block" onClick={handlesubmit}>Login</div>
                <div className='d-block text-center text-decoration-none mt-3 text-dark'>
                  Don't have an account? <Link to='/signup'  >Sign up here</Link>
                </div>
              </form>

            </div>

          </div>

        </div>: 

        <div> <LoadingSpinner /></div>

        }

        <div><Footer /></div>


      </div >

  )
}



