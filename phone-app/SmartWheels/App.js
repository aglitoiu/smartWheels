import React from "react";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid
} from "react-native";
import { Icon, Button } from 'react-native-elements';
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE
} from "react-native-maps";
import haversine from "haversine";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
var meteoScreen = require('./Classes/Activities/meteoScreen.js');
var fetchServerData = require('./Classes/fetchServerData.js');

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 45.656049;
const LONGITUDE = 25.602952;

class smartWheels extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      latitude: LATITUDE,
      longitude: LONGITUDE,
      route5Coordinates: [],
      route6Coordinates: [],
      busCoordinates: [],
      trainCoordinates: [],
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
  static navigationOptions = {
    header: null
  }
  getData = async () => {
    fetchSDClass = new fetchServerData();
    await fetchSDClass.getRoutesData('routes', 6).then(function (resp) {
      this.setState({
        route6Coordinates: resp
      })
    }.bind(this));

    await fetchSDClass.getRoutesData('routes', 5).then(function (resp) {
      this.setState({
        route5Coordinates: resp
      })
    }.bind(this));

    await fetchSDClass.getRoutesData('routes', 'bvct').then(function (resp) {
      this.setState({
        routeBvCtCoordinates: resp
      })
    }.bind(this));
    await fetchSDClass.getRoutesData('routes', 'bvsb').then(function (resp) {
      this.setState({
        routeBvSbCoordinates: resp
      })
      this.setState({
        loading: false
      });
    }.bind(this));




  }
  getBuses = async () => {
    await fetchSDClass.getLocations("Buses").then(function (resp) {
      this.setState({
        busCoordinates: resp
      })
    }.bind(this));
    await fetchSDClass.getLocations("Trains").then(function (resp) {
      this.setState({
        trainCoordinates: resp
      })
    }.bind(this));
  };
  async componentDidMount() {
    this.interval = setInterval(() => this.getBuses(), 1000);
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
  showDetails = (line) => {
    this.props.navigation.navigate("Meteo");
  }
  renderRoutes = () => {
    var busStrokeColorOpaque = "rgba(255, 13, 1,1)";
    var trainStrokeColorOpaque = "rgba(148, 0, 211,1)";
    var busStrokeColorTransp = "rgba(255, 13, 1,0.3)";
    var trainStrokeColorTransp = "rgba(148, 0, 211,0.3)";
    return (
      <View>
        <Polyline strokeColor={this.state.selectedLine == 6 ? busStrokeColorOpaque : busStrokeColorTransp} coordinates={this.state.route6Coordinates} strokeWidth={this.state.selectedLine == 6 ? 10 : 5} />
        <Polyline strokeColor={this.state.selectedLine == 5 ? busStrokeColorOpaque : busStrokeColorTransp} coordinates={this.state.route5Coordinates} strokeWidth={this.state.selectedLine == 5 ? 10 : 5} />
        <Polyline strokeColor={this.state.selectedLine == 'IR01746' ? trainStrokeColorOpaque : trainStrokeColorTransp} coordinates={this.state.routeBvCtCoordinates} strokeWidth={this.state.selectedLine == 'IR01746' ? 10 : 5} />
        <Polyline strokeColor={this.state.selectedLine == 'IR1623' ? trainStrokeColorOpaque : trainStrokeColorTransp} coordinates={this.state.routeBvSbCoordinates} strokeWidth={this.state.selectedLine == 'IR1623' ? 10 : 5} />
      </View>
    )
  }
  render() {
    var latitude;
    var longitude;
    var tempCoordinate = {
      latitude,
      longitude
    };

    return (
      <View style={styles.container}>
        <MapView
          minZoomLevel={6}  // default => 0
          maxZoomLevel={18} // default => 20
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          loadingEnabled
          initialRegion={this.getMapRegion()}
        >

          {!this.state.loading ? this.renderRoutes() : null}
          {this.state.busCoordinates.map(marker => (

            <Marker.Animated
              key={marker.id}
              anchor={{ x: 0.5, y: 0.6 }}
              ref={marker => {
                this.marker = marker;
              }}
              onPress={() => { this.setState({ selectedLine: marker.line }) }}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}

            >
              <Text style={{ fontWeight: 'bold', color: 'rgb(255, 13, 0)', alignContent: 'center', textAlign: 'center' }}>Linia {marker.line}</Text>
              <Icon color="rgb(255, 13, 0)" name="bus" reverse type="font-awesome" />
            </Marker.Animated>
          ))}
          {this.state.trainCoordinates.map(marker => (

            <Marker.Animated
              key={marker.id}
              anchor={{ x: 0.5, y: 0.6 }}
              ref={marker => {
                this.marker = marker;
              }}

              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              onPress={() => { this.setState({ selectedLine: marker.route }) }}
            >
              <Text style={{ fontWeight: 'bold', color: 'rgb(148, 0, 211)', alignContent: 'center', textAlign: 'center' }}>{marker.route}</Text>
              <Icon color="rgb(148, 0, 211)" name="train" reverse type="font-awesome" />

            </Marker.Animated>
          ))}
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent}>
              {this.state.selectedLine == undefined ? "Click pe o ruta" : "Linia " + this.state.selectedLine}
            </Text>

          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.showDetails(this.state.selectedLine)}
            style={[styles.bubbleMeteo, styles.button]}>
            <Text style={styles.bottomBarContent}>
              Meteo
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
  },
  bubbleMeteo: {
    flex: 1,
    backgroundColor: "rgba(	255, 165, 0,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
});
const AppNavigator = createStackNavigator({
  Home: {
    screen: smartWheels,
  },
  Meteo: {
    screen: meteoScreen,
  },
});

export default createAppContainer(AppNavigator);

