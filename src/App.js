import React from 'react';
import './App.css';
import ContainerFilters from './components/ContainerFilters';
import NameFilter from './components/NameFilter';
import Table from './pages/Table';

function App() {
  return (
    <div>
      <NameFilter />
      <ContainerFilters />
      <Table />
    </div>
  );
}

export default App;
