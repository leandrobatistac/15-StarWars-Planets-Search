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
              <th>Nome</th>
              <th>Período de Rotação</th>
              <th>Período Orbital</th>
              <th>Diametro</th>
              <th>Clima</th>
              <th>Gravidade</th>
              <th>Terrain</th>
              <th>Surface Water</th>
              <th>População</th>
              <th>Films</th>
              <th>Created</th>
              <th>Edited</th>
              <th>URL</th>
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
