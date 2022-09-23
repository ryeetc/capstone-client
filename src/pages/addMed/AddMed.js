import "./AddMed.scss"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useRef } from "react"

const AddMed = () => {
    
    const {userid} = useParams()
    const navigate = useNavigate()
    const token = localStorage.authToken
    const selectRef = useRef()
    const [isWeekly, setIsWeekly] = useState(false)
    const [status, setStatus ] = useState(false)

    const handleChangeClick = () => {
        setStatus(true)
    }

    const addMedSubmit = (e) => {
        e.preventDefault()
    
        const name = e.target.medname.value
        const dosage = e.target.dosage.value
        const interval = e.target.interval.value
        const amount = e.target.amount.value

        axios.post(`http://localhost:8080/${userid}/add`,{
            "name": name,
            "amount": amount,
            "dosage": dosage,
            "id": userid,
            "interval": interval
        }, { headers: {
            Authorization: `Bearer ${token}`
        },})
            .then((response)=>{
                navigate(`/${userid}`)
            })
    
    }



   
    
    return (
        <main className="add">
            <div className="add__title">
                <h1 className="add__title--label">Add New Medication</h1>
            </div>
            <form ref={selectRef} className="add__form" onSubmit={addMedSubmit}>
                <label className="add__form--label"> Medication Name
                    <input name="medname" className="add__form--input" placeholder="Enter medication name"></input>
                </label>
                <label className="add__form--label"> Dosage
                    <input name="dosage" className="add__form--input" placeholder="Enter dosage"></input>
                </label>
                <label className="add__form--label interval"> Interval
                    <input onChange={handleChangeClick} type="radio" id="Hourly" className="add__form--input" name="interval" value="Hourly"></input>
                    <label htmlFor="Hourly">Hourly</label>
                    <input type="radio" id="Daily" className="add__form--input" name="interval" value="Daily"></input>
                    <label htmlFor="Daily">Daily</label>
                    <input type="radio" id="Weekly" className="add__form--input" name="interval" value="Weekly"></input>
                    <label htmlFor="Weekly">Weekly</label>
                </label>
                <label className="add__form--label">If weekly, how many weeks between doses?
                    <input type="number" className="add__form--input"></input>
                </label>
                <label className="add__form--label"> Amount (optional)
                    <input name="amount" className="add__form--input" placeholder="Enter the current prescription amount"></input>
                </label>
                <button className="add__form--submit">Add Medication</button>
            </form>
        </main>
    )
}

export default AddMed