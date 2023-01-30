import React, { useContext, useState } from 'react';
import { APIContext } from '../context/APIprovider';

function ContainerFilters() {
  const { handleButtonFilter } = useContext(APIContext);
  const [filterColumn, setFilterColumn] = useState('population');
  const [symbolMath, setSymbolMath] = useState('maior que');
  const [filterValue, setFilterValue] = useState(0);

  const columnArray = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];

  const getColumnOptions = () => (columnArray.map((select) => (
    <option value={ select } key={ select }>
      { select }
    </option>
  )));

  return (
    <form>
      <label htmlFor="columnFilter">
        <select
          data-testid="column-filter"
          value={ filterColumn }
          name="columnFilter"
          id="columnFilter"
          onChange={ ({ target: { value } }) => setFilterColumn(value) }
        >
          { getColumnOptions() }
        </select>
      </label>

      <label htmlFor="symbolMath">
        <select
          data-testid="comparison-filter"
          value={ symbolMath }
          name="symbolMath"
          id="symbolMath"
          onChange={ ({ target: { value } }) => setSymbolMath(value) }
        >
          <option value="maior que">maior que</option>
          <option value="igual a">igual a</option>
          <option value="menor que">menor que</option>
        </select>
      </label>

      <label htmlFor="filterValue">
        <input
          type="number"
          data-testid="value-filter"
          value={ filterValue }
          id="filterValue"
          onChange={ ({ target: { value } }) => setFilterValue(value) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          handleButtonFilter({
            column: filterColumn,
            comparison: symbolMath,
            value: filterValue,
          });
        } }
      >
        Filtrar
      </button>
    </form>
  );
}

export default ContainerFilters;
