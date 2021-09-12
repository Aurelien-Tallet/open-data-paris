const GET_API = async ( URL ) => {

    try {
        const response = await fetch(URL)
        const data = await response.json()
        return data
    } catch (err) {
        console.log(err)
    }
}

export const formatDate = (date) => {
    const time = new Date(date);
    let day = `0${time.getDay()}`.slice(-2);
    let month = `0${time.getMonth()}`.slice(-2);
    let year = time.getFullYear();
    return `${day}.${month}.${year}`;
};
export default GET_API 