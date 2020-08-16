const axios = require('axios');

const UppercaseProxy = async (clientMessage) => {
    // requesting data from server
    const response = await axios.post('/web-service-url', { data: clientMessage });
    return response.data.toUpperCase();
};

module.exports = UppercaseProxy;
