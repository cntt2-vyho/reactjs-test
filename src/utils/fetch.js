export const getDataAsync = async (string) => {
    let response = await fetch(string);
    let data = await response.json();
    return data;
}