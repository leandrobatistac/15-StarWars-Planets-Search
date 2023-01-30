import React, { useContext, useEffect, useState } from 'react';
import { APIContext } from '../context/APIprovider';

function NameFilter() {
  const { getFilteredInfos } = useContext(APIContext);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    getFilteredInfos(inputValue);
  }, [inputValue, getFilteredInfos]);

  return (
    <form>
      <label htmlFor="nameFilter">
        <input
          type="text"
          data-testid="name-filter"
          value={ inputValue }
          id="nameFilter"
          onChange={ ({ target: { value } }) => setInputValue(value) }
        />
      </label>
    </form>
  );
}

export default NameFilter;
