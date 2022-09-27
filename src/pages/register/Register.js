import "./Register.scss"
import Logo from "../../assets/images/Logo.png"
import Header from "../../components/header/Header"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"


const Register = () => {

    document.title = "VirtuPill Register"

    const [failed, setFailed] = useState(false)
    const [failMatch, setFailMatch] = useState(false)
    const [unique, setUnique] = useState(false)

    const navigate = useNavigate()

    const handleRegisterClick = (e) => {

        e.preventDefault()
    
        const first_name = e.target.first_name.value
        const last_name = e.target.last_name.value
        const password = e.target.password.value
        const confirm = e.target.confirm.value
        const email = e.target.email.value

        if (!first_name || !last_name || !password || !confirm || !email ) {
            setFailed(true)
            return
        }

        if (password !== confirm) {
            const passEl = document.getElementsByClassName("pass")
            passEl[0].classList.add("error")
            passEl[1].classList.add("error")
            setFailed(false)
            setFailMatch(true)
            return
        }

        axios.post(`https://pilltrack.herokuapp.com/register`,{
            "confirm": confirm,
            "first_name": first_name,
            "last_name": last_name,
            "password": password,
            "email": email
        } )
            .then((response)=>{
                navigate(`/`)
            })
            .catch ((error)=>{
                setUnique(true)
            })


    }
    return (
        <div>
            <Header />
            <main className="register">
                <div className="register__top">
                    <img className="register__logo rotate" src={Logo} alt="Logo"></img>
                    <h1 className="register__welcome">Register for VirtuPill</h1>
                </div>
                <form className="register__form" onSubmit={handleRegisterClick}>
                    
                    <label className="register__form--label"> Enter Email
                        <span className={`error-msg ${!unique ? "" : "error-msg-show"}`}>User already exists</span>
                        <span className={`error-msg ${!failed ? "" : "error-msg-show"}`}>Please enter valid inputs</span>
                        <input required autoComplete="off" name="email" type="email" className={`register__form--input  ${!failed ? "" : "error"}`} placeholder="Enter email"></input>
                    </label>
                    <label className="register__form--label"> Enter First Name
                        <input required autoComplete="off" name="first_name" className={`register__form--input  ${!failed ? "" : "error"}`} placeholder="Enter First Name"></input>
                    </label>
                    <label className="register__form--label"> Enter Last Name
                        <input required autoComplete="off" name="last_name" className={`register__form--input  ${!failed ? "" : "error"}`} placeholder="Enter Last Name"></input>
                    </label>
                    <div className="error-container">
                        <span className={`error-msg ${!failMatch ? "" : "error-msg-show reg-error"}`}>Passwords don't match</span>
                        <label className="register__form--label"> Enter Password
                            <input required autoComplete="off" type="password" name="password" className={`register__form--input pass ${!failed ? "" : "error"} ${!failMatch ? "" : "error"}`} placeholder="Enter password"></input>
                        </label>
                        <label className="register__form--label"> Confirm Password
                            <input required autoComplete="off" type="password" name="confirm" className={`register__form--input pass ${!failed ? "" : "error"} ${!failMatch ? "" : "error"}`} placeholder="Confirm password"></input>
                        </label>
                    </div>
                    <button className="register__form--button" >Register</button>
                </form>
            </main>
        </div>
    )
}

export default Register