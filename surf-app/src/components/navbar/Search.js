import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import './Search.css'

export default function Search({ onSubmit, onChange }) {

  const [searchQuery, setSearchQuery] = useState('');

  function handleFormSubmit(e) {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(searchQuery);
    }
    return;
  }

  return (
    <div className="search-container-root">
      <form className="search-form-root"
        onSubmit={handleFormSubmit}>

        <input className="search-input"
          type="text"
          name="search"
          placeholder="Find your Gnar"
          onChange={(e) => {
            setSearchQuery(e.target.value)
            onChange(e.target.value)
          }}
        />

        <button type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </div>
  )
}