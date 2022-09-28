import axios from "axios"
import "./EditModal.scss"
import { useNavigate, useParams } from "react-router-dom"
import Header from "../header/Header"
import { useState } from "react"

const EditModal = () => {

    document.title = "VirtuPill Edit"

    const {id} = useParams()
    const [error, setIsError] = useState(false)
    const navigate = useNavigate()
    const token = localStorage.getItem("authToken")
    const medid = id

    const handleCancel = () => {
        navigate("/profile")
    }

    const handleEditSubmit = (e) => {
        e.preventDefault()
        const name = e.target.medname.value
        const dose = e.target.dosage.value
        const number = e.target.number.value
        const per = e.target.select.value
        let amt = e.target.amount.value
        const int = `Every ${number} ${per}`
        if (!name || !dose || !number) {
            setIsError(true)
            return
        }

        if (amt === "") {
            amt = 0
        }
        axios.patch("http://localhost:8080/edit", {
            "amount": amt,
            "med_name": name,
            "dosage": dose,
            "time_interval": int
        }, { headers: {
            Authorization: `Bearer ${token}`,
            id: medid
        }, } )
        navigate("/profile")

    }

    if (error) {
        return (
            <div className="edit-modal">
                <Header />
                <main className="edit">
                    <div className="edit__title--holder">
                        <h1 className="edit__title">Edit Medication Info</h1>
                    </div>
                    <form className="edit__form" onSubmit={handleEditSubmit}>
                        <label className="edit__form--label"> Medication Name
                            <input required autoComplete="off" name="medname" className="edit__form--input alert" ></input>
                        </label>
                        <label className="edit__form--label"> Dosage
                            <input required autoComplete="off" name="dosage" className="edit__form--input alert" ></input>
                        </label>
                        <label className="edit__form--label edit-interval"> Interval
                            <div className="edit-interval__container">
                                <label className="edit-interval__label">Every
                                    <input required autoComplete="off" type="number" name="number" className="edit-interval__option alert" ></input>
                                </label>
                                <select className="edit-interval__select" name="select">
                                    <option className="select__option hour" value="Hour(s)">Hour(s)</option>
                                    <option className="select__option day" value="Day(s)">Day(s)</option>
                                    <option className="select__option week" value="Week(s)">Week(s)</option>
                                </select>
                            </div>
                        </label>
                        <label className="edit__form--label"> Amount (optional)
                            <input required autoComplete="off" name="amount" type="number" className="add__form--input " ></input>
                        </label>
                        <button className="edit__form--submit">Confirm Edit</button>
                    </form>
                    <button className="edit__form--cancel" onClick={handleCancel}>Cancel Edit</button>
                </main>
            </div>
        )
    }
    return (
        <div className="edit-modal">
            <Header />
            <main className="edit">
                <div className="edit__title--holder">
                    <h1 className="edit__title">Edit Medication Info</h1>
                </div>
                <form className="edit__form" onSubmit={handleEditSubmit}>
                    <label className="edit__form--label"> Medication Name
                        <input required autoComplete="off" name="medname" className="edit__form--input " ></input>
                    </label>
                    <label className="edit__form--label"> Dosage
                        <input required autoComplete="off" name="dosage" className="edit__form--input " ></input>
                    </label>
                    <label className="edit__form--label edit-interval"> Interval
                        <div className="edit-interval__container">
                            <label className="edit-interval__label">Every
                                <input required autoComplete="off" type="number" name="number" className="edit-interval__option " ></input>
                            </label>
                            <select className="edit-interval__select" name="select">
                                <option className="select__option hour" value="Hour(s)">Hour(s)</option>
                                <option className="select__option day" value="Day(s)">Day(s)</option>
                                <option className="select__option week" value="Week(s)">Week(s)</option>
                            </select>
                        </div>
                    </label>
                    <label className="edit__form--label"> Amount
                        <input required autoComplete="off" name="amount" type="number" className="add__form--input " ></input>
                    </label>
                    <button className="edit__form--submit">Confirm Edit</button>
                </form>
                <button className="edit__form--cancel" onClick={handleCancel}>Cancel Edit</button>
            </main>
        </div>
    )
}

export default EditModal