import React, { useContext } from 'react';
import { APIContext } from '../context/APIprovider';

function Table() {
  const { loading,
    filteredObjectPlanets,
    filterObject,
    setFilterObject,
    setColumnOptions,
    setFilteredObjectPlanets,
    objectPlanets,
    columnArray,
    handleRemoveFilter,
  } = useContext(APIContext);

  // const handleClickDel = ({ target }) => {
  //   const nonDeletedFilters = filterObject
  //     .filter((filter) => filter.column !== target.id);
  //   const coluna = filterObject
  //     .filter((filter) => filter.column === target.id);
  //   setFilterObject(nonDeletedFilters);
  //   setColumnOptions([coluna[0].column, ...columnOptions]);
  // };

  const removeAll = () => {
    setFilteredObjectPlanets(objectPlanets);
    setColumnOptions(columnArray);
    setFilterObject([]);
  };

  return (
    <div>
      { loading && <p>Carregando...</p> }
      { !loading && (
        <div>
          <div>
            { filterObject.map((filter, index) => (
              <div data-testid="filter" key={ index }>
                <span>{`Filtro ${index + 1}: `}</span>
                <span>{ `${filter.column} ${filter.comparison} ${filter.value}` }</span>
                <button
                  id={ filter.column }
                  onClick={ () => handleRemoveFilter(filter) }
                >
                  X
                </button>
              </div>
            )) }
            <button
              data-testid="button-remove-filters"
              onClick={ removeAll }
            >
              Remover Filtragens
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>climate</th>
                <th>created</th>
                <th>diameter</th>
                <th>edited</th>
                <th>gravity</th>
                <th>orbital_period</th>
                <th>population</th>
                <th>rotation_period</th>
                <th>surface_water</th>
                <th>terrain</th>
                <th>url</th>
                <th>films</th>
              </tr>
            </thead>

            <tbody>
              { filteredObjectPlanets.map((e) => (
                <tr key={ e.name }>
                  <th>{ e.name }</th>
                  <th>{ e.climate }</th>
                  <th>{ e.created }</th>
                  <th>{ e.diameter }</th>
                  <th>{ e.edited }</th>
                  <th>{ e.gravity }</th>
                  <th>{ e.orbital_period }</th>
                  <th>{ e.population }</th>
                  <th>{ e.rotation_period }</th>
                  <th>{ e.surface_water }</th>
                  <th>{ e.terrain }</th>
                  <th>{ e.url }</th>
                  <th>{ e.films }</th>
                </tr>
              )) }
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}

export default Table;
