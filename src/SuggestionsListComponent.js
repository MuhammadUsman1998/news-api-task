export const SuggestionsListComponent = (props) => {
  return props.filteredSuggestions.length ? (
    <ul className="suggestions">
      {props.filteredSuggestions.map((suggestion, index) => {
        let className;
        // Flag the active suggestion with a class
        if (index === props.activeSuggestionIndex) {
          className = "suggestion-active";
        }

        return (
          <li
            onClick={(e) => {
              props.clickHandler(e, suggestion);
              props.submitHandler(e, suggestion);
            }}
            // {props.submitHandler}
            className={className}
            key={suggestion}
          >
            {suggestion}
          </li>
        );
      })}
    </ul>
  ) : (
    <div className="no-suggestions">
      {/* <em>No suggestions, you're on your own!</em> */}
    </div>
  );
};
