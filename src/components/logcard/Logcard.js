import "./Logcard.scss"

const Logcard = ({logex}) => {

    const options = {month: 'short', weekday: 'short', year: "numeric", day: "numeric"}

    let timestamp = new Date(logex.date_taken)
    let time = timestamp.toLocaleTimeString('en-US', options)
    
    return (
        <div className="logcard">
            <div className="logcard__title--container">
                <h1 className="logcard__title">{logex.med_name}</h1>
            </div>
            <div className="logcard__content">
                <span className="logcard__content--span">Dosage: {logex.dosage}</span>
                <span className="logcard__content--span">{logex.comment}</span>
                <span className="logcard__content--span">{time}</span>
            </div>
        </div>
    )
}

export default Logcard