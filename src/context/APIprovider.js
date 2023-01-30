import { createContext, useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const APIContext = createContext();

function APIProvider({ children }) {
  const [objectPlanets, setObjectPlanets] = useState(null);
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

  const values = useMemo(() => ({
    objectPlanets, loading,
  }), [objectPlanets, loading]);

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
