import React, { Component } from 'react';

const Host = 'http://192.168.0.114/smartWheels/api/';
class serverClass extends React.Component {
  constructor() {
    super();
    this.state = {};

  }
  sendLocation = async (vehId,lineType,latitude,longitude) => {


    var resp;

    console.log(latitude);
    console.log(longitude);
    const fetchServer = fetch(Host + 'index.php?req=updateveh',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
       body: JSON.stringify({
      
         latitude: latitude,
         lineType: lineType,
         longitude: longitude,
         vehId:vehId,
      
       })

    });
 
    const Jsonpromise = fetchServer.then((response) => response.json()).then((responseJson) => {
    

        console.log(responseJson);
      // If server response message same as Data Matched
      return responseJson;



    }).catch((error) => {
      console.error(error);
    });




    responsss = await Jsonpromise;
    return responsss;

  }
  loginUser = async (user,pass) => {
   


    var resp;
    const fetchServer = fetch(Host + 'index.php?req=updatebus',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
         body: JSON.stringify({
        
           latit: latitude,
        
           longit: longitude
        
         })

      });
    const Jsonpromise = fetchServer.then((response) => response.json()).then((responseJson) => {



      // If server response message same as Data Matched
      return responseJson;



    }).catch((error) => {
      console.error(error);
    });




    responsss = await Jsonpromise;
    return responsss;

  }
 
  
}
module.exports = serverClass;