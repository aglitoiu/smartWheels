import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid
} from "react-native";
import { Button } from 'react-native-elements';
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE
} from "react-native-maps";
import * as Permissions from "expo-permissions";
import haversine from "haversine";
var serverClass = require('./Classes/serverClass.js');
var changeLineScreen = require('./Classes/Activities/changeLineScreen.js');
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// const LATITUDE = 29.95539;
// const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
var vehId;
class smartWheelsLocaliser extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      vehId:0,
      latitude: LATITUDE,
      longitude: LONGITUDE,
      lineType:'',
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0
      })
    };



  }
  static navigationOptions = {
    header: null
}
 


  getLocationAsync() {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    Permissions.askAsync(Permissions.LOCATION).then((promise) => {
      if (promise.status === 'granted') {
        this.setState({ permGranted: true });
        //this.loadMapData();
        return 'yes';
      } else {
        this.setState({ permGranted: false });
        throw new Error('Location permission not granted');
      }
    });
  }
  sendLocation = async(vehId,lineType,latitude,longitude)=>{
    sendToServer=new serverClass();
    await sendToServer.sendLocation(vehId,lineType,latitude,longitude).then(function(resp){
      
    }.bind(this));
  }
  componentDidMount() {
    if(this.props.navigation.getParam("vehId")!=undefined){
    this.setState({vehId:this.props.navigation.getParam("vehId"),lineType:this.props.navigation.getParam("lineType")});
    console.log(this.state.lineType);
    }
    else{
      this.setState({
        vehId:1,
        lineType:'bus',
      })
    }
    this.getLocationAsync();
    const { coordinate } = this.state;

    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude
        };

      
          coordinate.timing(newCoordinate).start();

        this.sendLocation(this.state.vehId,this.state.lineType,newCoordinate.latitude,newCoordinate.longitude);
        

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
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.getMapRegion()}
        >
         
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
          />
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
<Button
  title="Schimba Linia"
  type="clear"
  onPress={()=>{this.props.navigation.replace("changeLineScreen")}}
/>
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
const AppNavigator = createStackNavigator({
  Home: {
    screen: smartWheelsLocaliser,
  },
  changeLineScreen: {
    screen: changeLineScreen,
  },
});
export default createAppContainer(AppNavigator);