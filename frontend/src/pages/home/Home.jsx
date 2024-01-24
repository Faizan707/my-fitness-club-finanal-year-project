import { Link } from 'react-router-dom';
import './homestyle.css';

function Home() {

  return (
    <>
      <nav className='home-navbar'>
        <h1>Fitness Club</h1>
        <li><Link to={"/services"}>Services</Link></li>

        <div className='home-link-style'>
          <ul>
            <li><Link to={"/manager-signin"}>Login as Manager</Link></li>
            <li><Link to={"/customer-signin"}>Customer Signin</Link></li>
            <li><Link to={"/assistant-manager-signin"}>Assistant Signin</Link></li>
            
            
          </ul>
        </div>
      </nav>

      <div className='home-background-image'>
      <div className='welcome-message animated fadeIn'>
      <h2>Welcome to Fitness Club</h2>
    </div>        
      </div>
    </>
  );
}

export default Home;
