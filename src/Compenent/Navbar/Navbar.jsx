import React from 'react'
import image from '../images/logo.png'
import "./Navbar.css"
import { Link,useNavigate} from 'react-router-dom'
export default function Navbar() {
  let token= localStorage.getItem("token");
  
    
    let navigate = useNavigate();
    function update() {
        
        localStorage.clear();
        navigate('/login')
    }
  return <>
  
  <nav className="navbar navbar-expand-lg navbar-dark shadow-sm text-white fixed-top back ">
  <div className="container">
    
    <img src={image} alt="logo" className='logo' />
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {
        token?<><ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="allgames">All</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Platforms
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/platforms/pc"> Pc</Link></li>
            <li><Link className="dropdown-item" to="/platforms/browser">browser</Link></li>

          </ul>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            sort-by
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/sort-by/release-date"> release-date</Link></li>
            <li><Link className="dropdown-item" to="/sort-by/popularity">popularity</Link></li>
            <li><Link className="dropdown-item" to="/sort-by/alphabetical"> alphabetical</Link></li>
            <li><Link className="dropdown-item" to="/sort-by/relevance">relevance</Link></li>
           
          </ul>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Categories
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/category/shooter">Shooter</Link></li>
            <li><Link className="dropdown-item" to="/category/racing">Racing</Link></li>
            <li><Link className="dropdown-item" to="/category/sports">Sports</Link></li>
            <li><Link className="dropdown-item" to="/category/social">Social</Link></li>
            <li><Link className="dropdown-item" to="/category/open-World">Open World</Link></li>
            <li><Link className="dropdown-item" to="/category/zombie">Zombie</Link></li>
            <li><Link className="dropdown-item" to="/category/fantasy">Fantasy</Link></li>
            <li><Link className="dropdown-item" to="/category/action-rpg">Action Rpg</Link></li>
            <li><Link className="dropdown-item" to="/category/action">Action</Link></li>
            <li><Link className="dropdown-item" to="/category/flight">Flight</Link></li>
            <li><Link className="dropdown-item" to="/category/battle-royale">Battle Royale</Link></li>
          
          </ul>
        </li>
      </ul></>:""
      }
      
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {
                token?<><li className="nav-item">
                <span className="nav-link btn nav-button mx-2" onClick={()=>{update()}} >Log out</span>
              </li></>:<>
              <li className="nav-item">
                <Link className="nav-link btn nav-button" to="login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn btn-outline-primary nav-button mx-2 text-white" to="register">Join Free</Link>
              </li>
              </>
              }
              
              
          </ul>
    </div>
  </div>
</nav>
  
  </>
}
