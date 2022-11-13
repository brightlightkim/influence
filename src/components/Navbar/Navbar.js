import './navbar.css'

export default function Navbar(){
    const logo =  require("../../static/logo1.png")

    return (

        <div className="header">
            <a className='logo_container' href='/'>
                <img className='logo' src={logo} alt="Logo" />
            </a>
            <div className='menu'>
                <a href="/about">About</a>
                <a href="/contact">Contact Us</a>                    
            </div>
        </div>

    )
}