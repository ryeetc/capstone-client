import "./Register.scss"
import Logo from "../../assets/images/Logo.png"
import Header from "../../components/header/Header"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Register = () => {

    const navigate = useNavigate()

    const handleRegisterClick = (e) => {

        e.preventDefault()
    
        const first_name = e.target.first_name.value
        const last_name = e.target.last_name.value
        const password = e.target.password.value
        const confirm = e.target.confirm.value
        const email = e.target.email.value

        if (password !== confirm) {
            const passEl = document.getElementsByClassName("pass")
            passEl[0].classList.add("error")
            passEl[1].classList.add("error")
            return
        }

        axios.post(`http://localhost:8080/register`,{
            "first_name": first_name,
            "last_name": last_name,
            "password": password,
            "email": email
        } )
            .then((response)=>{
                navigate(`/`)
            })


    }
    return (
        <div>
            <Header />
            <main className="register">
                <div className="register__top">
                    <img className="register__logo" src={Logo} alt="Logo"></img>
                    <h1 className="register__welcome">Register</h1>
                    <p className="register__intro">MedTrack is your virtual pillbox</p>
                </div>
                <form className="register__form" onSubmit={handleRegisterClick}>
                    <label className="register__form--label"> Enter Your Email
                        <input name="email" className="register__form--input" placeholder="Enter email"></input>
                    </label>
                    <label className="register__form--label"> Enter Your First Name
                        <input name="first_name" className="register__form--input" placeholder="Enter First Name"></input>
                    </label>
                    <label className="register__form--label"> Enter Your Last Name
                        <input name="last_name" className="register__form--input" placeholder="Enter Last Name"></input>
                    </label>
                    <label className="register__form--label"> Enter Your Password
                        <input type="password" name="password" className="register__form--input pass" placeholder="Enter password"></input>
                    </label>
                    <label className="register__form--label"> Confirm Your Password
                        <input type="password" name="confirm" className="register__form--input pass" placeholder="Confirm password"></input>
                    </label>
                    <button className="register__form--button" >Register</button>
                </form>
            </main>
        </div>
    )
}

export default Register