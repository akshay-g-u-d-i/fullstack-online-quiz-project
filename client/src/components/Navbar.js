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

    <div>
      <nav className="navbar fixed-top navbar-light bg-warning py-4 shadow-lg">
        <div className="container-fluid">

          {

            (auth !== null) ?
              (role === 'admin') ?
                <Link to='/' className='navbar-brand ms-5 text-dark '>eLitmus- Admin</Link> :
                <Link to='/' className='navbar-brand ms-5 text-danger'> eLitmus</Link> :
              <Link to='/' className="navbar-brand ms-5 text-danger">eLitmus</Link>
          }


          <div className="d-flex">

            {
              (localStorage.getItem('authTkn') === null)
                ?

                <div>
                  <Link to='/signup' className='btn text-dark me-2'>Sign up</Link>
                  <Link to='/login' className='btn btn-success rounded rounded-3 text-white me-5'>Login</Link>
                </div>

                :

                <div>
                  <div className="btn btn-success rounded text-white me-3 bg-dark">Welcome {localStorage.getItem('username')}</div>
                  <div className='btn btn-danger rounded rounded-3 text-white me-5' onClick={handlelogout}>Log Out</div>
                </div>

            }



          </div>
        </div>
      </nav>
    </div>


  )
}
