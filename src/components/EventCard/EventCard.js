import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { formatDate } from "../../services/utils";
import "./EventCard.scss";
export const EventCard = ({ eventCard, id }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/events/${id}`);
  };
  const [isFav, setIsFav] = useState(false);
  useEffect(() => {
    if (getFav()) setIsFav(true);
  }, []);
  const getFav = () => {
    if (localStorage.getItem("favories")) {
      return JSON.parse(localStorage.getItem("favories")).indexOf(id) !== -1
        ? true
        : false;
    } else {
      return false;
    }
  };

  const addToFavories = () => {
    setIsFav(!isFav);
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
    <article className="article">
        <div className={`article__price ${eventCard.price_type === 'payant' ?  'paying' : 'free'}`}><p>{eventCard.price_type}</p></div>
      <h1 className="article__title" onClick={handleClick}>
        {eventCard.title}
      </h1>
      <div className="article__content">
        <img src={eventCard.cover_url} className="article__content__cover" />
        <div className="article__content__texts">
          <p className="date">À partir du {formatDate(eventCard.date_start)}</p>
          <p className="content">{eventCard.lead_text}</p>
        </div>
      </div>
      <div className="article__like" onClick={addToFavories}>
        <svg viewBox="-2 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path
            className={`color ${isFav ? "active" : ""}`}
            d="m11.466 22.776c.141.144.333.224.534.224s.393-.08.534-.224l9.594-9.721c4.001-4.053 1.158-11.055-4.532-11.055-3.417 0-4.985 2.511-5.596 2.98-.614-.471-2.172-2.98-5.596-2.98-5.672 0-8.55 6.984-4.531 11.055z"
            fill="#f44336"
          />
        </svg>
      </div>
    </article>
  );
};
