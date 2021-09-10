import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import './EventCard.scss'
export const EventCard = ({ eventCard, id }) => {
    const history = useHistory()
    const handleClick = () => {
        history.push(`/events/${id}`)
    }
    const [isFav, setIsFav] = useState(false)
    useEffect(() => {
        if(getFav()) setIsFav(true)
    }, [])
    const getFav = () => {
        if (localStorage.getItem("favories")) {
            return (JSON.parse(localStorage.getItem("favories")).indexOf(id) === -1 ? false : true)
        } else { return false }
    }
    const addToFavories = () => {
        setIsFav(!isFav)
        if (localStorage.getItem("favories")) {
            if (JSON.parse(localStorage.getItem("favories")).indexOf(id) === -1) {
                const getTab = [
                    ...JSON.parse(localStorage.getItem("favories")),
                    id.toString(),
                ];
                localStorage.setItem("favories", JSON.stringify(getTab));
            } else {
                const getTab = [...JSON.parse(localStorage.getItem("favories"))].filter(
                    (el) => el !== id
                );
                localStorage.setItem("favories", JSON.stringify(getTab));
            }
        } else {
            localStorage.setItem("favories", JSON.stringify([id.toString()]));
        }
    };
    return (
        <article className={`article ${isFav ? 'active' : ''}`} onClick={addToFavories} >
            <h1 className="article__title" onClick={handleClick}>{eventCard.title}</h1>
            <div className="article__content">

                <img src={eventCard.cover_url} className="article__content__cover" />
                <div className="article__content__texts">

                    <p className="date">{eventCard.date_start}</p>
                    <p>{eventCard.lead_text}</p>
                </div>
            </div>
        </article>
    )
}
