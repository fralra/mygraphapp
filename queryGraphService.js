'use strict';


const pgxConfig = require('./pgxconfig.js');
const axios = require('axios');



    function run(parameters) {
      return new Promise(async function(resolve, reject) {

        let pgxServerURL = pgxConfig.pgxUrl + '/v2/runQuery';

        try {
            let postData, postHeaders, grafo, req;

            postData = {"statements": ["SELECT  v1, ex, v2 FROM MATCH (n)(-[e]-> where e.AMOUNT>5000){1,3} (no)  ON BANK_TXNS ONE ROW PER STEP ( v1, ex, v2 ) WHERE no.ID='" + parameters.project_name + "'"],"driver": "PGQL_IN_DATABASE","formatter": "GVT","parameters": { "dynamicSampling": 2,"parallel": 0,"start": 0,"size": 100},"visualize": true};
                        
            postHeaders = { headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + parameters.token}};

            const res = await axios.post(pgxServerURL, postData, postHeaders );

            grafo = JSON.parse(res.data.results[0].result);

            resolve(grafo.graph);
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
