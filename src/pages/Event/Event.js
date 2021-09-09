import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import GET_API from '../../services/utils'
import './Event.scss'
export const Event = () => {
    const [event, setEvent] = useState()
    const location = useLocation().pathname.split('/')[2]
    useEffect(() => {
        (async () => {
            const response = await GET_API('https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/' + location)
            const event = await response.record.fields
            setEvent(event)
        })()
    }, [])
    return (
        <div>
            {event && <article>
                <h1>{event.title}</h1>
                <img src={event.cover_url}></img>
                <p>{event.lead_text}</p>
                <p>{event.date_start}</p>
            </article>}
        </div>
    )
}
