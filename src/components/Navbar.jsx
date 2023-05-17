import logo from '../img/logo.png';

function Navbar() {
    return (
      <div className="App">
       <div className='img-logo'><img src={logo} alt="Logo" /></div>
       <div className='containerBtn'>
       <button className='btnHome'>Home</button>
       <button className='btnPictureOfTheDay'>Astronomy Picture of the Day</button>
       </div>
      </div>
    );
  }
  
  export default Navbar;