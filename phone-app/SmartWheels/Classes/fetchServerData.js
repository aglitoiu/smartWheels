import React, { Component } from 'react';

const Host = 'http://192.168.0.114/smartWheels/api/';
class fetchServerData extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  getRoutesData = async (req, routeID) => {
    var resp;
    const fetchServer = fetch(Host + 'index.php?req=' + req + '&id=' + routeID,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
    const Jsonpromise = fetchServer.then((response) => response.json()).then((responseJson) => {
      return responseJson;
    }).catch((error) => {
      console.error(error);
    });
    responsss = await Jsonpromise;
    return responsss;

  }
  getWeather = async () => {
    var resp;
    const fetchServer = fetch(Host + 'index.php?req=weather',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
    const Jsonpromise = fetchServer.then((response) => response.json()).then((responseJson) => {
      return responseJson;
    }).catch((error) => {
      console.error(error);
    });
    responsss = await Jsonpromise;
    return responsss;
  }
  getLocations = async (type) => {
    var resp;
    const fetchServer = fetch(Host + 'index.php?req=getlocations&type=' + type,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
    const Jsonpromise = fetchServer.then((response) => response.json()).then((responseJson) => {
      return responseJson;
    }).catch((error) => {
      console.error(error);
    });
    responsss = await Jsonpromise;
    return responsss;
  }
}
module.exports = fetchServerData;