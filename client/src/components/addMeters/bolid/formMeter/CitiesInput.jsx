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

export default CitiesInput;