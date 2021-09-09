import React, { useEffect, useState } from "react";
import GET_API from "../../services/utils";
import "./Events.scss";
import parse from "html-react-parser";
export const Events = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResult] = useState([]);
  const [state, setstate] = useState(true)
  const handleInput = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  useEffect(() => {
  
  }, [])
  const handleSearch = async (e) => {
    e.preventDefault();
    const url = `https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/?search=${searchValue}`;
    const response = await GET_API(url);
    const data = await response.records;
    console.log(data);
    setSearchResult(data);
  };
  const isFav = (id)=> {
    if(localStorage.getItem("favories")) {
     return  ( JSON.parse(localStorage.getItem("favories")).indexOf(id) === -1 ? false : true)
    } else { return false}       
  }
  const addToFavories = (id) => {
      setstate(!state)
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
    <div>
      <form onSubmit={handleSearch} action="/">
        <input
          type="text"
          name="search"
          onInput={handleInput}
          placeholder="Chercher un évenements"
        />
        <button type="submit">Rechercher</button>
      </form>
      {searchResults &&
        searchResults.map((events) => (
          <article
            className="events"
            key={events.record.id}
            style={{ marginTop: "10px", border: isFav(events.record.id) ? 'solid 1px green' : 'solid 1px red'}}
            onClick={() => addToFavories(events.record.id)}
          >
            {parse(events.record.fields.description)}
          </article>
        ))}
    </div>
  );
};
