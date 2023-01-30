import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const APIContext = createContext();

function APIProvider({ children }) {
  const [objectPlanets, setObjectPlanets] = useState(null);
  const [filteredObjectPlanets, setFilteredObjectPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then(({ results }) => {
        results.map((e) => delete e.residents);
        setObjectPlanets(results);
        setLoading(false);
      });
  }, []);

  const getFilteredInfos = async (nameFiltered) => {
    if (nameFiltered !== nameFilter) {
      setNameFilter(nameFiltered);
      const filteredArray = objectPlanets
        .filter(({ name }) => name.toLowerCase().includes(nameFiltered.toLowerCase()));
      setFilteredObjectPlanets(filteredArray);
    }
  };

  const values = {
    objectPlanets, loading, nameFilter, getFilteredInfos, filteredObjectPlanets,
  };

  return (
    <APIContext.Provider value={ values }>
      { children }
    </APIContext.Provider>
  );
}

APIProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default APIProvider;
