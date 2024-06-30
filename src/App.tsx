import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.scss';
import Select from './Select';

function App() {
  const [dataList, setDataList] = useState<any[]>([]);
  const [values, setValues] = useState<string>('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedOptionValue, setSelectedOptionValue] = useState<any>(null);
  
  useEffect(() => {
    fetch('https://retoolapi.dev/67OKjS/user')
    .then(response => response.json())
    .then(data => setDataList(data))
  }, [])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues(event.target.value);
  }

  const handleOptionSelected = (option: any) => {
    setValues(`${option.id} - ${option.user}`);
    setSelectedId(option.id);
    setSelectedOptionValue(option)
  }

  const renderOption = (option: any) => (
    <><b>{option.id} -</b> {option.user}</>
  )

  const filterOptions = (Option: any, value: string) => {
    return Option.id.toString().includes(value) || Option.user.includes(value);
  }
  
  return (
    <div className="App">
      <div>
        <p>Valor Id: <span>{selectedId}</span></p>
      </div>
      <Select
        options={dataList}
        Value={values}
        OnChange={handleInputChange}
        renderOption={renderOption}
        filter={filterOptions}
        selectedOption={handleOptionSelected}
        selectedOptionValue={selectedOptionValue}
      />
    </div>
  );
}

export default App;
