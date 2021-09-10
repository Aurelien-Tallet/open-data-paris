import React, { useEffect, useState } from "react";
import GET_API from "../../services/utils";
import "./Events.scss";
import parse from "html-react-parser";
import { EventCard } from "../../components/EventCard/EventCard";
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
                    <EventCard eventCard={events.record.fields} key={events.record.id} id={events.record.id} />
                ))}
        </div>
    );
};
