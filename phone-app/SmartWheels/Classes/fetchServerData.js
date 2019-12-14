import React, { Component } from 'react';

const Host = 'http://192.168.0.114/smartWheels/api/';
class fetchServerData extends React.Component {
  constructor() {
    super();
    this.state = {};

  }
  getRoutesData = async (req,routeID) => {


    var resp;
    const fetchServer = fetch(Host + 'index.php?req=' + req+'&id='+routeID,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        /* body: JSON.stringify({
        
           email: UserEmail,
        
           password: UserPassword
        
         })*/

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
  getLocations = async (type) => {


    var resp;
    const fetchServer = fetch(Host + 'index.php?req=getlocations&type='+type,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        /* body: JSON.stringify({
        
           email: UserEmail,
        
           password: UserPassword
        
         })*/

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
  loginUser = async (user,pass) => {
   


    var resp;
    const fetchServer = fetch(Host + 'index.php?req=login',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
         body: JSON.stringify({
        
           user: user,
        
           pass: pass
        
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
  registerUser = async (user,email,pass,name,region,phone,age,weight,height) => {
    if(user==''||email==''||pass==''||name==''||region==''||phone==''||age==''||weight==''||height==''){
      return false;
    }

    var resp;
    const fetchServer = fetch(Host + 'index.php?req=register',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json', 
        },
         body: JSON.stringify({
        
           user: user,
        
           pass: pass,
           email:email,
           name:name,
           region:region,
           phone:phone,
           age:age,
           weight:weight,
           height:height,
        
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
  sendRunningStats = async (nickname,sponsor,email,runningDist,stepsCount) => {
    if(nickname==''||email==''||sponsor==''||runningDist==''||stepsCount==''){
      return false;
    }

    var resp;
    const fetchServer = fetch(Host + 'index.php?req=sendstats',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json', 
        },
         body: JSON.stringify({
        
           nickname: nickname,
           sponsor: sponsor,
           email:email,
           runningDist:runningDist,
           stepsCount:stepsCount,
           
        
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
module.exports = fetchServerData;