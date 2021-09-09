import React, { useState } from 'react'
import './Events.scss'
export const Events = () => {
    const [searchValue, setSearchValue] = useState('')
    const handleInput = (e) => {
        e.preventDefault()
        setSearchValue(e.target.value)
    }
    return (
        <div>
            <form>
                <input type="text" name="search" onInput={handleInput} placeholder="Chercher un évenements"/>
                {searchValue}
            </form>
        </div>
    )
}
