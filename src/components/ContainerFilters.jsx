import React, { useContext, useState, useEffect } from 'react';
import { APIContext } from '../context/APIprovider';

function ContainerFilters() {
  const { handleButton, columnOptions, handleSort } = useContext(APIContext);
  const [filterColumn, setFilterColumn] = useState('population');
  const [symbolMath, setSymbolMath] = useState('maior que');
  const [filterValue, setFilterValue] = useState(0);
  const [sortColumn, setSortColumn] = useState('population');
  const [sortRadio, setSortRadio] = useState('ASC');

  useEffect(() => {
    setFilterColumn(columnOptions[0]);
  }, [setFilterColumn, columnOptions]);

  const getColumnOptions = () => (columnOptions.map((select) => (
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
          handleButton({
            column: filterColumn,
            comparison: symbolMath,
            value: filterValue,
          });
        } }
      >
        Filtrar
      </button>

      <label htmlFor="select1">
        Ordenar:
        <select
          name="column"
          id="select1"
          value={ sortColumn }
          onChange={ ({ target: { value } }) => setSortColumn(value) }
          data-testid="column-sort"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter" data-testid="option-diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <label htmlFor="radio1">
          <input
            type="radio"
            name="sort"
            value="ASC"
            onChange={ ({ target: { value } }) => setSortRadio(value) }
            data-testid="column-sort-input-asc"
          />
          Ascendente
        </label>
        <label htmlFor="radio2">
          <input
            type="radio"
            name="sort"
            value="DESC"
            onChange={ ({ target: { value } }) => setSortRadio(value) }
            data-testid="column-sort-input-desc"
          />
          Descendente
        </label>
      </label>
      <button
        type="button"
        onClick={ () => handleSort({
          column: sortColumn,
          sort: sortRadio,
        }) }
        data-testid="column-sort-button"
      >
        Ordenar
      </button>
    </form>
  );
}

export default ContainerFilters;
