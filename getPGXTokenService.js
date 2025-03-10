'use strict';


const pgxConfig = require('./pgxconfig.js');
const axios = require('axios');

let token = null;


function run(key) {
  return new Promise(async function (resolve, reject) {



    let pgxServerURL = pgxConfig.pgxUrl + '/auth/token';

    try {

      if (token) {
        // existing token found
        token = await refreshToken();

      } else {
        // request new token
        token = await getToken()
       
      }

      resolve(JSON.stringify(token.data));
    }
    catch (err) {
      console.error(err);
      reject("error");
    }
    finally {

    }

  });
}


async function getToken() {

  let pgxServerURL = pgxConfig.pgxUrl + '/auth/token';
  let postData, req;
  let token = null;

  try {
    postData = { "username": pgxConfig.user, "password": pgxConfig.password, "createSession": true, "source": "nodejs", "sessionId": "" };

    token = await axios.post(pgxServerURL, postData);
  } catch (err) {
    console.error(err);
  }
  finally {
    return token;
  }

}


async function refreshToken() {
  let postData;
  let pgxServerURL = pgxConfig.pgxUrl + '/auth/token';

  try {
    postData = { "token": token.data.access_token };
    const res = await axios.put(pgxServerURL, postData);
  }
  catch (err) {
    // some error happened
    console.error(err);
    // try to get a fresh token
    token = await getToken();
  }
  finally {
    return token;
  }

}



module.exports = {
  run: run
};
