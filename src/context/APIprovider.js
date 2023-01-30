import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const APIContext = createContext();

function APIProvider({ children }) {
  const [objectPlanets, setObjectPlanets] = useState(null);
  const [filteredObjectPlanets, setFilteredObjectPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [columnOptions, setColumnOptions] = useState([]);

  const columnArray = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];

  useEffect(() => {
    setLoading(true);
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then(({ results }) => {
        results.map((e) => delete e.residents);
        setObjectPlanets(results);
        setFilteredObjectPlanets(results);
        setLoading(false);
        setColumnOptions(columnArray);
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

  const filterFunction = ({ column, comparison, value }, array) => {
    if (comparison === 'maior que') {
      const filteredArray = array
        .filter((planet) => planet[column] > Number(value));
      setFilteredObjectPlanets(filteredArray);
    }

    if (comparison === 'menor que') {
      const filteredArray = array
        .filter((planet) => planet[column] < Number(value));
      setFilteredObjectPlanets(filteredArray);
    }

    if (comparison === 'igual a') {
      const filteredArray = array
        .filter((planet) => planet[column] === (value));
      setFilteredObjectPlanets(filteredArray);
    }
  };

  const handleButton = (object) => {
    filterFunction(object, filteredObjectPlanets);
    const newOptions = columnOptions.filter((option) => option !== object.column);
    setColumnOptions(newOptions);
  };

  const values = {
    loading,
    nameFilter,
    columnOptions,
    objectPlanets,
    filteredObjectPlanets,
    handleButton,
    filterFunction,
    getFilteredInfos,
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
