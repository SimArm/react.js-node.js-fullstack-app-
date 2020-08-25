const setData = (dataVar) => {
    localStorage.setItem('Consultation', JSON.stringify(dataVar));
}

export default setData;