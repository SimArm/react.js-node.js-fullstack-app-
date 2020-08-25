const getData = () => {
    const data = JSON.parse(localStorage.getItem('Consultation'));
    return data;
}

export default getData;