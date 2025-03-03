'use strict';


const pgxConfig = require('./pgxconfig.js');
const axios = require('axios');



    function run(key) {
      return new Promise(async function(resolve, reject) {
        let pgxServerURL = pgxConfig.pgxUrl + '/auth/token';

        try {
            let postData, req;

            postData = { "username": pgxConfig.user, "password": pgxConfig.password, "createSession": true, "source": "nodejs","sessionId": ""};

            const res = await axios.post(pgxServerURL, postData);

            resolve(JSON.stringify(res.data));
        }
        catch (err) {
          console.error(err);
          reject("error");
        }
        finally {

        }
});
}

module.exports = {
  run: run
};
