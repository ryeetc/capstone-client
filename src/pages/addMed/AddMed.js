import "./AddMed.scss"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"
import Header from "../../components/header/Header"


const AddMed = () => {

    document.title = "VirtuPill Add"

    const navigate = useNavigate()
    const token = localStorage.authToken

    useEffect(()=>{
        if(!token) {
            navigate("/")
        }
    })


    const addMedSubmit = (e) => {
        e.preventDefault()
    
        const name = e.target.medname.value
        const dosage = e.target.dosage.value
        const period = e.target.select.value
        const number = e.target.number.value
        const interval = `Every ${number} ${period}`
        const amount = e.target.amount.value

        axios.post(`http://localhost:8080/add`,{
            "name": name,
            "amount": amount,
            "dosage": dosage,
            "time_interval": interval
        }, { headers: {
            Authorization: `Bearer ${token}`
        },})
            .then((response)=>{
                navigate(`/profile`)
            })
    
    }
    
    return (
        <div>
            <Header />
            <main className="add">
                <div className="add__title">
                    <h1 className="add__title--label">Add New Medication</h1>
                </div>
                <form className="add__form" onSubmit={addMedSubmit}>
                    <label className="add__form--label"> Medication Name
                        <input required autoComplete="off" name="medname" className="add__form--input" placeholder="Enter medication name"></input>
                    </label>
                    <label className="add__form--label"> Dosage
                        <input required autoComplete="off" name="dosage" className="add__form--input" placeholder="Enter dosage"></input>
                    </label>
                    <label className="add__form--label interval"> Interval
                        <div className="add__form--container">
                            <label className="interval__label">Every
                                <input required autoComplete="off" type="number" name="number" className="interval__option"></input>
                            </label>
                            <select className="interval__select" name="select">
                                <option className="select__option" value="Hour(s)">Hour(s)</option>
                                <option className="select__option" value="Day(s)">Day(s)</option>
                                <option className="select__option" value="Week(s)">Week(s)</option>
                            </select>
                        </div>
                    </label>
                    <label className="add__form--label"> Amount
                        <input required autoComplete="off" name="amount" type="number" className="add__form--input" placeholder="Enter prescription amount"></input>
                    </label>
                    <button className="add__form--submit">Add Medication</button>
                </form>
            </main>
        </div>
    )
}

export default AddMed