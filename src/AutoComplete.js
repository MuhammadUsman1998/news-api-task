import { useState, useEffect } from "react";
import { SuggestionsListComponent } from "./SuggestionsListComponent";
import useLocalStorage from "./useLocalStorage";
const AutoComplete = ({ submitHandler, suggestions }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useLocalStorage("input", "");
  const onChange = (e) => {
    const userInput = e.target.value;

    const unLinked = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    setInput(userInput);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };

  const clickHandler = (e) => {
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setActiveSuggestionIndex(2);
    setShowSuggestions(false);
    // setInput("");
  };
  useEffect(() => {
    localStorage.setItem("input", JSON.stringify(input));
  }, [input]);
  return (
    <>
      <div className="AutoComplete">
        <input type="text" onChange={onChange} value={input} />
        {showSuggestions && input && (
          <SuggestionsListComponent
            clickHandler={clickHandler}
            submitHandler={submitHandler}
            filteredSuggestions={filteredSuggestions}
            activeSuggestionIndex={activeSuggestionIndex}
          />
        )}
      </div>
    </>
  );
};
export default AutoComplete;
