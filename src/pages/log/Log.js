import "./Log.scss"
import Header from "../../components/header/Header"
import { useEffect, useState } from "react"
import axios from "axios"
import Logcard from "../../components/logcard/Logcard"
import { v4 as uuid } from 'uuid';


const Log = () => {

    document.title = "Pillable Log"

    const token = localStorage.getItem("authToken")

    const [log, setLog] = useState(null)

    useEffect(()=>{
        axios.get("https://pilltrack.herokuapp.com/log", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response)=>{
            setLog(response.data)
        })
    }, [token])


    if (!log) {
        return <h1>Loading . . .</h1>
    }

    const logReverse = (array) => {
        const newArray = []
       
        array.forEach((item)=>{
            newArray.unshift(item)
        })
        return newArray
    }

    const reverso = logReverse(log)

    
    return (
        <div>
            <Header />
            <main className="log">
                <h1>History</h1>
                {reverso.map((logex)=>{
                    return (
                        <Logcard key={uuid()} logex={logex} />
                    )
                })}
            </main>
        </div>
    )
}

export default Log