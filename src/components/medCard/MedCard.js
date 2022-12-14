import "./MedCard.scss"
import Logo from "../../assets/images/Logo.png"
import axios from "axios"
import { useState, useEffect } from "react"
import edit from "../../assets/images/icons8-edit.svg"
import del from "../../assets/images/icons8-delete.svg"

const MedCard = ({med, handleDeleteClick, handleEditClick}) => {
    const dosage = med.dosage
    const token = localStorage.authToken
    const medname = med.med_name
    const interval = med.time_interval
    const med_id = med.id
    let amount = med.amount
    const intervalArray = interval.split(" ")
    const timeperiod = intervalArray[1]
    const period = intervalArray[2] 
    const [countdownDate, setCountdownDate] = useState(null)
    const [days, setDays] = useState(null)
    const [hours, setHours] = useState(null)
    const [minutes, setMinutes] = useState(null)
    const [seconds, setSeconds] = useState(null)
    const [isLow, setIsLow] = useState(false)

   
    let int = 0
    if (period === "Day(s)") {
        int = timeperiod * 24 * 60 * 60 * 1000
    } else if (period === "Hour(s)") {
        int = timeperiod * 1 * 60 * 60 * 1000
    } else if (period === "Week(s)") {
        int = timeperiod * 168 * 60 * 60 * 1000
    }

    const handleTaken = (e) => {
        e.preventDefault()
        if(amount === 0) {
            amount = 0
        } else if (amount > 0) {
            amount = amount - 1
        }

        let comm = e.target.comment.value
        if (comm === undefined) {
            comm = ""
        }
    
        axios.post(`https://pilltrack.herokuapp.com/log/post`,{
            "comment": comm,
            "medid": med_id,
            "dosage": dosage,
            "med_name": medname
        }, { headers: {
            Authorization: `Bearer ${token}`
        }, })
        
        axios.patch("https://pilltrack.herokuapp.com/edit/amt", {
            "amount": amount
        }, { headers: {
            Authorization: `Bearer ${token}`,
            id: med_id
        }, } )
            
        axios.get(`https://pilltrack.herokuapp.com/log`,{ headers: {
            Authorization: `Bearer ${token}`
        }, } )
            .then ((response)=>{
                const medications = response.data
                let medArray = []
                medications.forEach((med)=>{
                    if (med.med_id === med_id) {
                        medArray.push(med)
                    }
                })
                window.location.reload()
                       
            })
    }
   
    useEffect(()=>{
        
        axios.get(`https://pilltrack.herokuapp.com/log`,{ headers: {
        Authorization: `Bearer ${token}`
        }, } )
        .then ((response)=>{
            const medications = response.data
            let medArray = []
            medications.forEach((med)=>{
                if (med.med_id === med_id) {
                    medArray.push(med)
                }
            })
            if (amount <= 5) {
                setIsLow(true)
            }

            setCountdownDate(new Date(medArray[medArray.length-1].date_taken).getTime() + int)
            
            setInterval(()=>{
                if (!countdownDate){
                    return
                }
                
                let now = new Date().getTime()
                let distance = countdownDate - now
                setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
                setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
                setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
                setSeconds(Math.floor((distance % (1000 * 60)) / 1000));  
                
            }, 1000)
             
        })
        .catch((error)=>{
            console.log(error)
        })

    },[setSeconds, countdownDate, amount, int, med_id, token])

   


    if (!countdownDate || seconds === null) {
        return (
        <main className="med">
            <div className="med__image--holder">
                <img src={Logo} alt="pill" className="med__image"></img>
            </div>
            <div className="med__div">
                <h3 className="med__name">{medname}</h3>
            </div>
            <form className="med__form" onSubmit={handleTaken}>
                <div className="med__comment">
                    <textarea  name="comment" className="med__comment--input" placeholder="Enter your comment here (max 250 chars)"></textarea>
                </div>
                <div className="med__button--holder">
                    <button className="med__button">Take Pill</button>
                </div>
            </form>
        </main>
        )
    }
   
    return (
        <main className="med">
            <div className="med__top">
                <div className="med__title">
                    <div className="med__image--holder">
                        <img src={Logo} alt="pill" className="med__image"></img>
                    </div>
                    <div className="med__div">
                        <h3 className="med__name">{medname}</h3>
                    </div>
                </div>
            </div>
            <div className="med__info--cont">
                <div className="med__amt">
                    <span className={`med_span ${!isLow ? "" : "red"}`}>{amount} Remaining</span>
                </div>
                <div className="med__info">
                    <span className="med__span">{`${days}D ${hours}H ${minutes}M ${seconds}S`}</span>
                </div>
            </div>
            <form className="med__form" onSubmit={handleTaken}>
                <div className="med__comment">
                    <textarea  name="comment" className="med__comment--input" placeholder="Enter your comment here (max 250 chars)"></textarea>
                </div>
                <div className="med__button--holder">
                    <button className="med__button">Take Pill</button>
                </div>
            </form>
            <div className="edit__delete">
                <img src={edit} alt="edit" onClick={()=>{handleEditClick(med)}} className="edit__button"></img>
                <img src={del} alt="delete" onClick={()=>{handleDeleteClick(med_id)}} className="delete__button"></img>
            </div>
        </main>

    )
}

export default MedCard