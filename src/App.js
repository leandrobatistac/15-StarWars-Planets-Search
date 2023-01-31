import React from 'react';
import './App.css';
import ContainerFilters from './components/ContainerFilters';
import NameFilter from './components/NameFilter';
import Table from './pages/Table';
import APIProvider from './context/APIprovider';

function App() {
  return (
    <div>
      <APIProvider>
        <NameFilter />
        <ContainerFilters />
        <Table />
      </APIProvider>

    </div>
  );
}

export default App;
