import "./Header.scss"
import Logo from "../../assets/images/Logo.png"
import {  NavLink } from "react-router-dom"




const Header = () => {

    const token = localStorage.getItem("authToken")


    const handleLogout = ()=>{
        localStorage.removeItem("authToken")
    }

    const renderLoggedIn = () => {
        return (
            <header className="header">
                <div className="header__left">
                    <span className="header__name">PillTrack</span>
                    <img src={Logo} alt="Logo" className="header__logo"></img>
                </div>
                <nav className="header__nav">
                    <NavLink className="nav__link" to="/profile">Profile</NavLink>
                    <NavLink className="nav__link" to="/add">Add Med</NavLink>
                    <NavLink className="nav__link" to="/" onClick={handleLogout}>Logout</NavLink>
                </nav>
            </header>
        )
    }

    const renderLoggedOut = () => {
        return (
            <header className="header">
                <div className="header__left">
                    <span className="header__name">PillTrack</span>
                    <img src={Logo} alt="Logo" className="header__logo"></img>
                </div>
                <nav className="header__nav">
                    <NavLink className="nav__link" to="/">Login</NavLink>
                    <NavLink className="nav__link" to="/register">Register</NavLink>
                </nav>
            </header>
        )
    }

 
    if(!token) {
        return renderLoggedOut()

    } else if (token) {
        return renderLoggedIn()
    }

    
}

export default Header