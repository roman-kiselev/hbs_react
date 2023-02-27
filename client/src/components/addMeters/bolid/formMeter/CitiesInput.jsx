/*
import React from "react";

const CitiesInput = ({ cities, onChange }) => {

    const [inputText, setInputText] = React.useState('');
    const [suggestions, setSuggestions] = React.useState(cities);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputText(value);
        const filteredSuggestions = cities.filter(
            city => city.toLowerCase().startsWith(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    const handleSuggestionSelect = (event) => {
        setInputText(event.target.innerText);
        setSuggestions([]);
    };

    return (
        <>
            <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
            />
            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map(suggestion => (
                        <li key={suggestion} onClick={handleSuggestionSelect}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default CitiesInput;*/
import React, { useState } from 'react';

const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];

function CityInput() {
    const [inputText, setInputText] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex =  new RegExp(`^${value}`, 'i');
            suggestions = cities.sort().filter(v => regex.test(v));
        }
        setInputText(value);
        setSuggestions(suggestions);
    }

    const handleSelect = (e) => {
        setInputText(e.target.innerText);
        setSuggestions([]);
    }

    const renderSuggestions = () => {
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item, index) => <li key={index} onClick={handleSelect}>{item}</li>)}
            </ul>
        );
    }

    return (
        <div>
            <input type="text" value={inputText} onChange={handleChange} />
            {renderSuggestions()}
        </div>
    );
}

export default CityInput;
