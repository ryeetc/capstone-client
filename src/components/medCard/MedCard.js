import "./MedCard.scss"
import Logo from "../../assets/images/Logo.png"

const MedCard = ({med}) => {
    const medname = med.med_name
    const meddose = med.dosage
    const amount = med.amount
    const interval = med.interval
    console.log(medname)
   
    return (
        <main className="med">
            <div className="med__image--holder">
                <img src={Logo} alt="pill" className="med__image"></img>
            </div>
            <div className="med__div">
                <h3 className="med__name">{medname}</h3>
            </div>
            <div className="med__info">
                <span className="med__span">{meddose}</span>
                <span className="med__span">{amount}</span>
                <span className="med__span">{interval}</span>
            </div>
            <div className="med__button--holder">
                <button className="med__button">Taken</button>
            </div>
        </main>

    )
}

export default MedCard