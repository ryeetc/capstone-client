import "./Landing.scss"
import Logo from "../../assets/images/Logo.png"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import Header from "../../components/header/Header"
import { useEffect, useState } from "react"

const Landing = () => {

    document.title = "Pillable"

    const [logFail, setLogFail] = useState(false)

    

    const navigate = useNavigate()

    useEffect(()=>{
        if (localStorage.authToken) {
            navigate("/profile")
        }
    }, [navigate])

    

    const toSignup = () => {
        navigate("/register")
    }

    const handleLoginClick = (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const pass = event.target.password.value
        axios.post("https://pilltrack.herokuapp.com/login", {
            email: email,
            password: pass
        })
            .then((response)=>{
                if (response.data === {}) {
                    setLogFail(true)
                }
                if (response.data.token.length > 20) {
                    localStorage.authToken = response.data.token
                    navigate(`/profile`)
                } 
    
            })
            .catch((error)=>{
                setLogFail(true)
               
            })
    }

    return (
        <div>
            <Header />
            <main className="landing">
                <div className="landing__top">
                    <img className="landing__logo rotate" src={Logo} alt="Logo"></img>
                    <h1 className="landing__welcome">Welcome to Pillable</h1>
                    <p className="landing__intro">Your virtual pillbox</p>
                </div>
                <form className="landing__form" onSubmit={handleLoginClick}>
                    <label className="landing__form--label"> Enter Your Email
                        <input required autoComplete="off" type="email" name="email" className={`landing__form--input ${!logFail ? "" : "fail-log"}`} placeholder="Enter email"></input>
                    </label>
                    <label className="landing__form--label"> Enter Your Password
                        <input required autoComplete="off" name="password" type="password" className={`landing__form--input ${!logFail ? "" : "fail-log"}`} placeholder="Enter password"></input>
                    </label>
                    <span className={`error-msg ${!logFail ? "" : "error-msg-show"}`}>Email or Password is Incorrect</span>
                    <button className="landing__form--button" >Login</button>
                </form>
                <div className="landing__cta" onClick={toSignup}>
                    <span className="landing__cta--label">No account?</span>
                    <span className="landing__cta--label">Sign up here</span>
                </div>
            </main>
        </div>
    )
}

export default Landing