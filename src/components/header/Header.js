import "./Header.scss"
import Logo from "../../assets/images/Logo.png"
import { NavLink } from "react-router-dom"



const Header = () => {
    return (
        <header className="header">
            <div className="header__left">
                <span className="header__name">MedTrack</span>
                <img src={Logo} alt="Logo" className="header__logo"></img>
            </div>
            <div className="header__profile">
                <span className="header__welcome">Welcome back, User</span>
            </div>
            <nav className="header__nav">
                <NavLink>Profile</NavLink>
                <NavLink>Add Medication</NavLink>
                <NavLink>Settings</NavLink>
            </nav>
        </header>
    )
}

export default Header