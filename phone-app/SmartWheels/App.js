import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid
} from "react-native";
import {Icon} from 'react-native-elements';
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE
} from "react-native-maps";
import haversine from "haversine";
var fetchServerData = require('./Classes/fetchServerData.js');

// const LATITUDE = 29.95539;
// const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 45.656049;
const LONGITUDE = 25.602952;
var loaded=0;
class smartWheels extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {

      latitude: LATITUDE,
      longitude: LONGITUDE,
      route5Coordinates: [],
      route6Coordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0
      })
    };
    this.getData();
  }

  getData = async()=>{
    fetchSDClass=new fetchServerData();
    await fetchSDClass.getRoutesData('routes',6).then(function(resp){
      var latitude;
      var longitude;
      var tempCoordinate = {
        latitude,
        longitude
      };
      
      for(var i=0;i<resp.length ;i++){
        const { route6Coordinates } = this.state;

        this.setState({
          route6Coordinates:route6Coordinates.concat([Object({latitude:parseFloat(resp[i].latitude),longitude:parseFloat(resp[i].longitude)})])
        })
        
      }
    this.setState({
      
      loading:false
    });
  }.bind(this));

  await fetchSDClass.getRoutesData('routes',5).then(function(resp){
    var latitude;
    var longitude;

    

      this.setState({
        route5Coordinates:resp
      })
      
    
  this.setState({
    
    loading:false
  });
}.bind(this));




  }
  getBuses = async()=> {
    await fetchSDClass.getLocations().then(function(resp){
      var latitude;
      var longitude;
      var tempCoordinate = {
        latitude,
        longitude
      };
      tempCoordinate.latitude=parseFloat(resp[0].latitude);
      tempCoordinate.longitude=parseFloat(resp[0].longitude);
      this.setState({
        coordinate:tempCoordinate
      })
  }.bind(this));
  
  };
  async componentDidMount() {
    this.interval = setInterval(() => this.getBuses(), 1000);
   
  
    const { coordinate } = this.state;

    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude
        };

       

        this.setState({
          latitude,
          longitude,
           
          distanceTravelled:
            distanceTravelled + this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    navigator.geolocation.clearWatch(this.watchID);
  }

  getMapRegion = () => ({
    
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };
  

  render() {
    
    return (
      <View style={styles.container}>
        <MapView
        minZoomLevel={6}  // default => 0
        maxZoomLevel={15} // default => 20
          style={styles.map}
          provider={PROVIDER_GOOGLE}

          loadingEnabled
          
          initialRegion={this.getMapRegion()}
        >
          <Polyline strokeColor="red"  coordinates={this.state.route6Coordinates} strokeWidth={5} />
          <Polyline strokeColor="blue" coordinates={this.state.route5Coordinates} strokeWidth={5} />
          <Marker.Animated
            anchor={{ x: 0.5, y: 0.6 }}
            ref={marker => {
              this.marker = marker;
            }}
            
            coordinate={this.state.coordinate}
          >
            <Icon name="bus" reverse type="font-awesome"/>
            </Marker.Animated>
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent}>
              {parseFloat(this.state.distanceTravelled).toFixed(2)} km
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  }
});

export default smartWheels;