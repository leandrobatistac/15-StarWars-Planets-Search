import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const APIContext = createContext();

function APIProvider({ children }) {
  const columnArray = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];
  const [objectPlanets, setObjectPlanets] = useState(null);
  const [filteredObjectPlanets, setFilteredObjectPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [columnOptions, setColumnOptions] = useState([columnArray]);
  const [filterObject, setFilterObject] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then(({ results }) => {
        results.map((e) => delete e.residents);
        setColumnOptions(columnArray);
        setObjectPlanets(results);
        setFilteredObjectPlanets(results);
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
    setFilterObject([...filterObject, object]);
  };

  const handleRemoveFilter = (option) => {
    const filtersChange = filterObject.filter((filter) => filter !== option);
    setFilterObject(filtersChange);
    setColumnOptions([...columnOptions, option.column]);
    const filteredArray = objectPlanets;
    if (filtersChange.length !== 0) {
      for (let i = 0; i < filtersChange.length; i += 1) {
        filterFunction(filtersChange[i], filteredArray);
      }
    } else {
      setFilteredObjectPlanets(filteredArray);
    }
  };

  const values = {
    loading,
    nameFilter,
    columnOptions,
    objectPlanets,
    filteredObjectPlanets,
    filterObject,
    columnArray,
    handleRemoveFilter,
    setColumnOptions,
    handleButton,
    filterFunction,
    getFilteredInfos,
    setFilterObject,
    setFilteredObjectPlanets,
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
