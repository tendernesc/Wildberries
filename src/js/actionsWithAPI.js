//Функция для получения данных 
export async function getCards() {
    const response = await fetch('https://65c28052f7e6ea59682b76ff.mockapi.io/id/Wildberies');
    const result = await response.json();
    return result;
}