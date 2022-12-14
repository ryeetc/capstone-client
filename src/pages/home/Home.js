import "./Home.scss"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import MedCard from "../../components/medCard/MedCard"
import Header from "../../components/header/Header"
import { v4 as uuid } from 'uuid';

const Home = () => {

    document.title = "Pillable Home"

    let refresh = uuid()
    const navigate = useNavigate()
    const token = localStorage.authToken
    const [meds, setMeds] = useState(null)

    const handleDeleteClick = (id) => {
        axios.delete("https://pilltrack.herokuapp.com/delete/med", { headers: {
            Authorization: `Bearer ${token}`,
            id: id
        }, }) 
        window.location.reload()
        
    }

    const handleAddClick = ()=>{
        navigate(`/add`)
    }

    const handleLogClick = ()=>{
        navigate("/log")
    }
    
    useEffect(()=>{

        document.body.style.zoom = "100%";


        if(!token) {
            navigate("/")
        }
        const user = axios.get(`https://pilltrack.herokuapp.com/meds`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        user
            .then((response)=>{
                setMeds(response.data)
                
            })
    }, [token, navigate])

    if(!meds) {
        return (
            <div>
                <Header />
                <h1>Loading . . .</h1>
            </div>
        )
    }

    const handleEditClick = (med) => {
        navigate(`/edit/${med.id}`)
        
    }
   
    return (
        <div key={refresh}>
            <Header />
            <div className="home">
                <div className="home__card">
                    {meds.map((med)=>{
                        return (
                            <MedCard key={med.id} handleEditClick={handleEditClick} medname={med.med_name} med={med} handleDeleteClick={handleDeleteClick} />
                        )
                    })}
                </div>
                <div className="home__add">
                    <button className="home__add--button" onClick={handleAddClick}>Add a Medication</button>
                </div>
                <div className="home__log">
                    <button className="home__log--button" onClick={handleLogClick}>View Log</button>
                </div>
           </div>
        </div>
    )


}

export default Home