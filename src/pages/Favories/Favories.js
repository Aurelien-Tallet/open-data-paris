import React, { useEffect, useState } from "react";
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
        console.log(event)
        setFavories((oldArray) => [...oldArray, event]);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return  <div>
    {favories &&
      favories.map((events) => (
        <article
          className="events"
          key={events.id}
          style={{ marginTop: "10px" }}
        >   
          {events.title}
        </article>
      ))}
  </div>

};
