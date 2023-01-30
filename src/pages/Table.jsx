import React, { useContext } from 'react';
import { APIContext } from '../context/APIprovider';

function Table() {
  const { loading, filteredObjectPlanets } = useContext(APIContext);

  return (
    <div>
      { loading && <p>Carregando...</p> }
      { !loading && (
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
      )}
    </div>
  );
}

export default Table;
