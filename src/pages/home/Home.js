import "./Home.scss"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import MedCard from "../../components/medCard/MedCard"
import Header from "../../components/header/Header"

const Home = () => {
    const navigate = useNavigate()
    const token = localStorage.authToken
    const [meds, setMeds] = useState(null)

    const handleDeleteClick = (id) => {
        axios.delete("http://localhost:8080/delete/med", { headers: {
            Authorization: `Bearer ${token}`,
            id: id
        }, }) 
        .then(()=>{
            window.location.reload()
        })
        
    }

    const handleAddClick = ()=>{
        navigate(`/add`)
    }

    const handleLogClick = ()=>{
        navigate("/log")
    }
    

    useEffect(()=>{
        if(!token) {
            navigate("/")
        }
        const user = axios.get(`http://localhost:8080/meds`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        user
            .then((response)=>{
                setMeds(response.data)
            })
    }, [token])

    if(!meds) {
        return (
            <div>
                <Header />
                <h1>Loading . . .</h1>
            </div>
        )
    }

   
    return (
        <div>
            <Header />
            <div className="home">
                {meds.map((med)=>{
                    return (
                        <MedCard key={med.id} medname={med.med_name} med={med} handleDeleteClick={handleDeleteClick} />
                    )
                })}
                <div className="home__add">
                    <span className="home__add--label">Click here to add a new medication</span>
                    <button className="home__add--button" onClick={handleAddClick}>+</button>
                </div>
                <div className="home__log">
                    <span className="home__log--label">Click here to view your log</span>
                    <button className="home__log--button" onClick={handleLogClick}>+</button>
                </div>
           </div>
        </div>
    )


}

export default Home