const axiosRequest = require('axios');
// import axiosRequest from 'axios';

/**
 * This is an example of a promise
 * 
 */
async function getActivity() {
    try {
        let response = await axiosRequest.get('https://www.boredapi.com/api/activity');

        console.log(response.data.activity);
    }
    catch (error) {
        console.log(error);
    }
}

/**
 * This is an example of a promise with an error
 * 
 */
async function getActivityError() {
    try {
        let response = await axiosRequest.get('https://httpstat.us/404');

        console.log(response.data.activity);
    }
    catch (error) {
        console.log(error.response.status);
    }
}

getActivity();
getActivityError();

console.log('This is the last line of the script');
