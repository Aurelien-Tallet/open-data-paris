import React, { useEffect, useState } from 'react'
import { EventCard } from '../../components/EventCard/EventCard'
import GET_API from '../../services/utils'
import './Home.scss'
export const Home = () => {
    const url = 'https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?order_by=updated_at%20desc&limit=1&pretty=false&timezone=UTC'
    const [lastEvent, setLastEvent] = useState()
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

    return (
        <div className="container" >
            <h1 className="title">Dernière actualité à Paris : </h1>

            {lastEvent && id && <EventCard eventCard={lastEvent} id={id}></EventCard>}
        </div>
    )
}
