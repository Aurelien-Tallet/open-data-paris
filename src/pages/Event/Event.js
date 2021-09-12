import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import GET_API, { formatDate } from "../../services/utils";
import parse from "html-react-parser";
import "./Event.scss";
export const Event = () => {
  const [event, setEvent] = useState();
  const location = useLocation().pathname.split("/")[2];

  useEffect(() => {
    (async () => {
      const response = await GET_API(
        "https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/" +
          location
      );
      const event = await response.record.fields;
      setEvent(event);
      
    })();
  }, []);
  return (
    <div>
      {event && (
        <article className="single-event">
          <h1>{event.title}</h1>
          <div className="single-event__content">
            <img src={event.cover_url}></img>
            <div className="single-event__content__texts">
              <div className="description">
                <p className="label">Description de l'évenement :</p>
                <p className="content">{parse(event.description)}</p>
              </div>
              <div className="infos">
                <div className="price">
                  <p className="label">Tarifs :</p>
                  <p className="content">{event.price_detail}</p>
                  <p className="content">
                    {" "}
                    <a
                      className="buy"
                      href={event.access_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Billeterie
                    </a>{" "}
                  </p>
                </div>

                <div className="date">
                  <p className="label">Date :</p>
                  <p className="content">{formatDate(event.date_start)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="single-event__address translate">
            <p className="label">Adresse :</p>
            <p className="content">
              {event.address_city}, {event.address_name} {event.address_street},{" "}
              {event.address_zipcode}
            </p>
          </div>
          <div className="single-event__contact translate">
            <p>Prendre contact avec les organisateurs :</p>
            <div className="contact">
              <a href={event.contact_facebook} target="_blank" rel="noreferrer">
                Facebook
              </a>
              <a
                href={`tel:${event.contact_phone}`}
                target="_blank"
                rel="noreferrer"
              >
                {event.contact_phone}
              </a>
            </div>
          </div>
        </article>
      )}
    </div>
  );
};
