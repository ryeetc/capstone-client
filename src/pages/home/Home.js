import "./Home.scss"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import MedCard from "../../components/medCard/MedCard"

const Home = () => {
    const navigate = useNavigate()
    const {userid} = useParams()
    const token = localStorage.authToken
    const [meds, setMeds] = useState(null)

    const handleAddClick = ()=>{
        navigate(`/add`)
    }
    

    useEffect(()=>{
        const user = axios.get(`http://localhost:8080/meds`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        user
            .then((response)=>{
                console.log(response.data)
                setMeds(response.data)
                console.log(meds)
            })
    }, [])

    if(!meds) {
        return (
            <h1>Loading . . .</h1>
        )
    }

   
    return (
           <div className="home">
                {meds.map((med)=>{
                    return (
                        <MedCard key={med.id} medname={med.med_name} med={med} />
                    )
                })}
                <div className="home__add">
                    <span className="home__add--label">Click here to add a new medication</span>
                    <button className="home__add--button" onClick={handleAddClick}>+</button>
                </div>
           </div>
    )


}

export default Home