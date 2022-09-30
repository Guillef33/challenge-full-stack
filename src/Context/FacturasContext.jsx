import React, { useState, createContext, useEffect } from "react";

export const FacturasContext = createContext(null);

const FacturasProvider = (props) => {

  // Advanced Search
  const [quantity, setQuantity] = useState(0);
  const [errorQuantity, setErrorQuantity] = useState(false);
  const [country, setCountry] = useState("dk");
  const [searchResults, setSearchResults] = useState([]);
  const [showCustom, setShowCustom] = useState(false);

//   useEffect(() => {
//     fetch("https://randomuser.me/api/?results=21")
//       .then((res) => res.json())
//       .then((json) => {
//         setUsers(json.results);
//       });
//   }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = users.filter((user) =>
        user.name.first
          .toLocaleLowerCase()
          .includes(searchInput.toLocaleLowerCase())
      );
      setFilteredResults(filteredData);
      setShowUsers(false);
      setshowResults(true);
    } else {
      setFilteredResults(users);
    }
  };

  const selectCountry = (e) => {
    setCountry(e.target.value);
  };

  const getCustomRequest = (event) => {
    event.preventDefault();
    fetch(`https://randomuser.me/api/?results=${quantity}&nat=${country}`)
      .then((res) => res.json())
      .then((json) => setSearchResults(json.results))
      .catch((error) => {
        console.log("Error", error);
      });
    setShowCustom(!showCustom);
  };

  return (
    <UserContext.Provider
      value={{
         searchItems,
        showUsers,
        setShowUsers,
        showResults,
        filteredResults,
        selectCountry,
        getCustomRequest,
        country,
        errorQuantity,
        setQuantity,
        searchResults,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default FacturasProvider;
