import "./AddMed.scss"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useRef } from "react"

const AddMed = () => {
    
    const navigate = useNavigate()
    const token = localStorage.authToken

    const addMedSubmit = (e) => {
        e.preventDefault()
    
        const name = e.target.medname.value
        const dosage = e.target.dosage.value
        const interval = e.target.select.value
        const amount = e.target.amount.value

        axios.post(`http://localhost:8080/add`,{
            "name": name,
            "amount": amount,
            "dosage": dosage,
            "interval": interval
        }, { headers: {
            Authorization: `Bearer ${token}`
        },})
            .then((response)=>{
                navigate(`/profile`)
            })
    
    }



   
    
    return (
        <main className="add">
            <div className="add__title">
                <h1 className="add__title--label">Add New Medication</h1>
            </div>
            <form className="add__form" onSubmit={addMedSubmit}>
                <label className="add__form--label"> Medication Name
                    <input name="medname" className="add__form--input" placeholder="Enter medication name"></input>
                </label>
                <label className="add__form--label"> Dosage
                    <input name="dosage" className="add__form--input" placeholder="Enter dosage"></input>
                </label>
                <label className="add__form--label interval"> Interval
                    <label className="interval__label">Every
                        <input type="number" className="interval__option"></input>
                    </label>
                    <select className="interval__select" name="select">
                        <option className="select__option" value="Hour(s)">Hour(s)</option>
                        <option className="select__option" value="Day(s)">Day(s)</option>
                        <option className="select__option" value="Week(s)">Week(s)</option>
                    </select>
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