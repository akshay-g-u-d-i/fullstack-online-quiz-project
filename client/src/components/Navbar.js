import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../index.css'
// import { userdata } from '../screens/Login'

//NavLinks pending



export default function Navbar(props) {

  let navigate = useNavigate();

  const handlelogout = () => {

    if (window.confirm('Are you sure to log out?')) {
      localStorage.removeItem("authTkn");
      localStorage.clear();
      props.getdata(null)
      navigate('/')
    }
  }

  const role = localStorage.getItem('userrole')
  const auth = localStorage.getItem('authTkn')

  // localStorage.removeItem('authTkn')

  // console.log(role)


  return (


    <nav className="navbar fixed-top shadow-lg py-3" style={{ backgroundColor:  "#022451"  }}>
      <div className="container-fluid">

        {

          (auth !== null) ?
            (role === 'admin') ?
              <Link to='/' className='navbar-brand ms-5 text-warning '><b>iTest-Admin</b></Link> :
              <>
                <Link to='/' className="navbar-brand ms-5 text-warning"><b>iTest</b></Link>
                <img className='ms-3' src={localStorage.getItem('userpicture')} alt="" width={"2.5%"} style={{borderRadius:"25%"}}/>
                <div className=" me-auto p-2  text-white">    Hi, {localStorage.getItem('username')}! </div>
              </> :
            <Link to='/' className='navbar-brand ms-5 text-warning'><b>iTest</b> </Link>
        }


        <div className="d-flex">

          {
            (localStorage.getItem('authTkn') === null)
              ?


              <div>
                <Link to='/signup' className='text-white me-5' style={{ textDecoration: "none" }}><b>Sign up</b></Link>
                <Link to='/login' className='text-white me-5' style={{ textDecoration: "none" }}><b>Login</b></Link>
              </div>

              :
              <>

                <div className='p-2 text-white d-inline' >
                  <span className='ms-auto  text-danger text-decoration-underline me-5' onClick={handlelogout} style={{ cursor: "pointer" }}><b>Logout</b></span>
                </div>
              </>

          }



        </div>
      </div>
    </nav>



  )
}
