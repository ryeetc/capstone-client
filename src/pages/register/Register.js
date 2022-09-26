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
                    <img className="register__logo rotate" src={Logo} alt="Logo"></img>
                    <h1 className="register__welcome">Register for MedTrack</h1>
                </div>
                <form className="register__form" onSubmit={handleRegisterClick}>
                    <label className="register__form--label"> Enter Your Email
                        <input autoComplete="off" name="email" type="email" className="register__form--input" placeholder="Enter email"></input>
                    </label>
                    <label className="register__form--label"> Enter Your First Name
                        <input autoComplete="off" name="first_name" className="register__form--input" placeholder="Enter First Name"></input>
                    </label>
                    <label className="register__form--label"> Enter Your Last Name
                        <input autoComplete="off" name="last_name" className="register__form--input" placeholder="Enter Last Name"></input>
                    </label>
                    <label className="register__form--label"> Enter Your Password
                        <input autoComplete="off" type="password" name="password" className="register__form--input pass" placeholder="Enter password"></input>
                    </label>
                    <label className="register__form--label"> Confirm Your Password
                        <input autoComplete="off" type="password" name="confirm" className="register__form--input pass" placeholder="Confirm password"></input>
                    </label>
                    <button className="register__form--button" >Register</button>
                </form>
            </main>
        </div>
    )
}

export default Register