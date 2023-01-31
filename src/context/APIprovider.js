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
  const [order, setOrder] = useState('');

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

  const sortByPopulationASC = (a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    const ONE_NEGATIVE = -1;
    const ONE_POSITIVE = 1;
    if (nameA < nameB) return ONE_NEGATIVE;
    if (nameA > nameB) return ONE_POSITIVE;
    return 0;
  };

  const getFilteredInfos = (nameFiltered) => {
    if (nameFiltered !== nameFilter) {
      setNameFilter(nameFiltered);
      const filteredArray = objectPlanets
        .filter(({ name }) => name.toLowerCase().includes(nameFiltered.toLowerCase()))
        .sort(sortByPopulationASC);
      setFilteredObjectPlanets(filteredArray);
    }
  };

  const saveOrder = (order1) => {
    setOrdem(order1);
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
    const filtersChange = filterObject.filter((filter) => filter !== option)
      .sort(sortByPopulationASC);
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

  const orderDataFilterBySort = (arrayString, arrayNumber, { column, sort }) => {
    switch (sort) {
    case 'ASC':
      return [
        ...arrayString,
        ...arrayNumber.sort((a, b) => a[column] - b[column]),
      ];
    default:
      return [
        ...arrayNumber.sort((a, b) => b[column] - a[column]),
        ...arrayString,
      ];
    }
  };

  const splitDataWithUnknown = (column) => [...filteredObjectPlanets]
    .reduce((acc, curr) => {
      if (curr[column] === 'unknown') {
        acc.arrayString.push(curr);
        return acc;
      }
      acc.arrayNumber.push(curr);
      return acc;
    }, {
      arrayNumber: [],
      arrayString: [],
    });

  const handleSort = (object) => {
    setOrder(object);
    const { column } = object;
    const { arrayString, arrayNumber } = splitDataWithUnknown(column);
    const sortedArrayData = orderDataFilterBySort(arrayString, arrayNumber, object);
    const unknownColumn = sortedArrayData.filter((e) => e[column] === 'unknown');
    const knownColumn = sortedArrayData.filter((e) => e[column] !== 'unknown');
    setFilteredObjectPlanets([...knownColumn, ...unknownColumn]);
  };

  const values = {
    loading,
    nameFilter,
    columnOptions,
    objectPlanets,
    filteredObjectPlanets,
    filterObject,
    columnArray,
    order,
    handleSort,
    handleRemoveFilter,
    setColumnOptions,
    handleButton,
    filterFunction,
    getFilteredInfos,
    setFilterObject,
    setFilteredObjectPlanets,
    saveOrder,
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
