import axios from 'axios';

const getPokedex = async () => {

    const data = await axios({
        method:'GET',
        url:'https://pokeapi.co/api/v2/pokemon?limit=1118'
    })

    return data.data.results
}

export default getPokedex