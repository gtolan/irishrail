const functions = require('firebase-functions');
const fetch = require("node-fetch");
const parseString = require("xml2js").parseString;


async function fetchData(url = "") {
    
    const response = await fetch(url, {
      method: "GET", 
    });

    return await response.text() 
}
  


exports.getCurrentTrainsXML = functions.https.onRequest((request, funRes) => {


fetchData("http://api.irishrail.ie/realtime/realtime.asmx/getCurrentTrainsXML")
  .then(resp => {
    parseString(resp, function(err, result) {
      console.log(result.ArrayOfObjTrainPositions.objTrainPositions);
      const trains = result.ArrayOfObjTrainPositions.objTrainPositions;
      funRes.send(trains);
    });
  })
  .catch(err => console.error(err));

});



exports.getTrainMovementsXML = functions.https.onRequest((request, funRes) => {


  const {trainid = 'e109', trainDate = '21 jan 2020'} = request.query;
  console.log('request.query', request.query)
  fetchData(`http://api.irishrail.ie/realtime/realtime.asmx/getTrainMovementsXML?TrainId=${trainid}&TrainDate=${trainDate}`)
    .then(resp => {
      parseString(resp, function(err, result) {
        const trainData = result.ArrayOfObjTrainMovements;
        funRes.send(trainData);
      });
    })
    .catch(err => console.error(err));
    
});


    // async function fetchData(url = "") {
    //     // Default options are marked with *
    //     const response = await fetch(url, {
    //       method: "GET", // *GET, POST, PUT, DELETE, etc.
    //       mode: "cors", // no-cors, *cors, same-origin
    //       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //       redirect: "follow", // manual, *follow, error
    //       referrerPolicy: "no-referrer" // no-referrer, *client
    //     });
        
    //     //await response.text(); 
    //     return await response.text() //Takes a Response stream and reads it to completion. It returns a promise that resolves with a USVString (text).
    //   }