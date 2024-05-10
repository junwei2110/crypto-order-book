import axios from 'axios';


export async function getOrderBook(url: string, params: Record<string, string>) {

    let data = {};
    try {
        data = await axios.get(url, {
            headers: {
                Accept: 'application/json'
            },
            
            params,
            
        }).then((response) => response.data);

    } catch (e) {
        console.log(e.message);
    } 

    return data;

}