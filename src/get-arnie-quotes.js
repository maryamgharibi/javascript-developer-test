const { httpGet } = require('./mock-http-interface');
 
const getArnieQuotes = async (urls) => {
  let result = [];
 
  try {
    //It needs to wait until the response returns back from httpGet for each url
    //If no await is present the execution is not pauses and code will be executed in a non-blocking manner
    //We need to block each item of urls to get the result
    //Note: I prefer to use Promise with allSettled as 'promise.all' reject as soon as one of the Promises in the array rejects.Promise.allSettled will never reject,
    // it will resolve once all Promises in the array have either rejected or resolved.
    await Promise.allSettled(urls.map(async (url) => {
        var response =  await httpGet(url);
        if (response && response.body )
        {
          if (response.status == 200)
          {
             result.push({"Arnie Quote":(JSON.parse(response.body)).message});
          }
          else
          {
            result.push({"FAILURE": (JSON.parse(response.body)).message});
          }
        }
    })); 
  } catch (error) {
    //any errors in calling promise
    console.log(error);
  }
  return result;
};


 
module.exports = {
  getArnieQuotes,
};
