const setConsiliumData = (dataVar) => {
    localStorage.setItem('Consilium', JSON.stringify(dataVar));
}

export default setConsiliumData;