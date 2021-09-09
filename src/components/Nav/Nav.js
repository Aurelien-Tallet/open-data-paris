import React from 'react'
import './Nav.scss'
import {
    NavLink
} from "react-router-dom";

export const Nav = () => {
    return (

            <nav>
                <ul>
                    <li>
                        <NavLink exact to="/" activeClassName='selected'>Accueil</NavLink>
                    </li>
                    <li>
                        <NavLink to="/events" activeClassName='selected'>Listes des évements</NavLink>
                    </li>
                    <li>
                        <NavLink to="/favories" activeClassName='selected'>Favoris</NavLink>
                    </li>
                </ul>
            </nav>

    )
}
