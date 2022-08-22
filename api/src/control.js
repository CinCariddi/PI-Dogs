const axios = require('axios');
const { Dog, Temperament } = require('./db')
const URL = `https://api.thedogapi.com/v1/breeds?api_key=ef8f8131-b8ea-428a-b120-803aa2e9bf82`;

const getApiInfo = async () => {
    try {
        const apiUrl = await axios.get(URL);
        const apiInfo = await apiUrl.data.map(e => {
            return {
                name: e.name,
                id: e.id,
                height: e.height.metric,
                weight: e.weight.metric,
                life_span: e.life_span,
                image: e.image.url,
                temperament: e.temperament
            }
        })
        return apiInfo
    } catch(error) {
        console.log(error);
    }
}

const getDbInfo = async () => {
    try {
        return await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
    }catch(error) {
        console.log(error)
    }
}

const getAllDogs = async () => {
    try{
        const apiInfo = await getApiInfo();
        const dbInfo = await getDbInfo();
        const allInfo = apiInfo.concat(dbInfo);
        return allInfo;
    }catch(error) {
        console.log(error)
    }
}

module.exports = {
    getAllDogs
}