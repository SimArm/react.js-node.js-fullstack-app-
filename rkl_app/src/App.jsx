import React from 'react';
import "./App.scss";
import DataTable from './Components/DataTable/DataTable';
import NewDataForm from './Components/NewDataForm/NewDataForm';

function App() {
  return (
    <div className="App">
      < DataTable/>
      < NewDataForm/>
    </div>
  );
}

export default App;
