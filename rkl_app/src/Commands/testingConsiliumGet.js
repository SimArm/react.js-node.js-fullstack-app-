const getConsiliumData = () => {
    const data = JSON.parse(localStorage.getItem('Consilium'));
    return data;
}

export default getConsiliumData;