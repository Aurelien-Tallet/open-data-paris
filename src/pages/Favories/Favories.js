import React, { useEffect, useState } from "react";
import { EventCard } from "../../components/EventCard/EventCard";
import GET_API from "../../services/utils";
import "./Favories.scss";
export const Favories = () => {
  const [favories, setFavories] = useState([]);
  useEffect(() => {
    try {
      JSON.parse(localStorage.getItem("favories")).forEach(async (id) => {
        const response = await GET_API(
          "https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/" +
            id
        );
        const event = await response.record.fields;
        const obj = { ...event, id };
        setFavories((oldArray) => [...oldArray, obj]);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="favories">
      <div className="favories__list">
        {favories &&
          favories.map((event) => (
            <EventCard eventCard={event} key={event.id} id={event.id} />
          ))}
      </div>
    </div>
  );
};
