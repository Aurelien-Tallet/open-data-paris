import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import GET_API from '../../services/utils'
import './Home.scss'
export const Home = () => {
    const url = 'https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/'
    const [lastEvent, setLastEvent] = useState()
    const history = useHistory()
    const [id, setId] = useState()
    useEffect(() => {
        (async () => {
            try {
                const data = await GET_API(url)
                const record = await data.records[0].record
                const fields = record.fields
                const id = record.id
                setLastEvent(fields)
                setId(id)

            } catch (err) {
                console.log(err)
            }
        })()
    }, [])
    const handleClick = () => {
        history.push(`/events/${id}`)
    }
    return (
        <div onClick={handleClick}>
            {lastEvent && <article>
                <h1>{lastEvent.title}</h1>
                <img src={lastEvent.cover_url}></img>
                <p>{lastEvent.lead_text}</p>
                <p>{lastEvent.date_start}</p>
            </article>}
        </div>
    )
}
