import React, { useEffect, useState } from "react";
import GET_API from "../../services/utils";
import "./Events.scss";
import { EventCard } from "../../components/EventCard/EventCard";
export const Events = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResult] = useState([]);
  const [noResults, setNoResult] = useState(false);
  const handleInput = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };
  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {}, [noResults]);
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    const url = `https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/?search=${searchValue}`;
    const response = await GET_API(url);
    const data = await response.records;
    setSearchResult(data);
    setNoResult(false);
    if (data.length <= 0) setNoResult(true);
  };

  return (
    <div className="search">
      <form onSubmit={handleSearch} action="/" className="search__form">
        <input
          type="text"
          name="search"
          onInput={handleInput}
          placeholder="Chercher des évenements..."
          className="search__form__input"
        />
        <button type="submit" className="search__form__cta">
          Rechercher
        </button>
      </form>
      <div className="search__list">
        {noResults && <p className="no-result">Aucun résultat trouvé</p>}
        {searchResults &&
          searchResults.map((events) => (
            <EventCard
              eventCard={events.record.fields}
              key={events.record.id}
              id={events.record.id}
            />
          ))}
      </div>
    </div>
  );
};
