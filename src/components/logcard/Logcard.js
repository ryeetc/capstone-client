import "./Logcard.scss"

const Logcard = ({logex}) => {
    
    return (
        <div className="logcard">
            <div className="logcard__title--container">
                <h1 className="logcard__title">{logex.med_name}</h1>
            </div>
            <div className="logcard__content">
                <span className="logcard__content--span">{logex.dosage}</span>
                <span className="logcard__content--span">{logex.comment}</span>
                <span className="logcard__content--span">{logex.date_taken}</span>
            </div>
        </div>
    )
}

export default Logcard