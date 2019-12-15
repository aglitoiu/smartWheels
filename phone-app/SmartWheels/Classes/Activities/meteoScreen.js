import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
var fetchServerData = require('../../Classes/fetchServerData.js');
class meteoScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
    
        this.state = {
          temp:0,
         
        };
        this.getData();
      }
      getData = async () => {
        fetchSDClass = new fetchServerData();
        await fetchSDClass.getWeather().then(function (resp) {
    
        }.bind(this));
    }
    render() {
        var backgroundColorVar;
        if(this.state.temp<10){
            backgroundColorVar='#4d85ea';
        }
        else{
            backgroundColorVar='#f7b733';
        }
        return (
            <View style={{flex:1,backgroundColor:backgroundColorVar}}>
                <View style={styles.headerContainer}>
                    
                    <Text style={styles.tempText}>{this.state.temp}˚</Text>
                </View>
                <View style={styles.bodyContainer}>
                    <Text style={styles.title}>{this.state.temp<10?"Frig!":"Cald!"}</Text>
                    <Text style={styles.subtitle}>{this.state.temp<10?"Imbraca-te bine!":"O zi calduroasa!"}</Text>
                </View>
            </View>
        );
    };
}
const styles = StyleSheet.create({
    weatherContainer: {
        flex: 1,
        backgroundColor: '#f7b733'
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent:'center',
    },
    tempText: {
        fontSize: 48,
        color: '#fff'
    },
    bodyContainer: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: 25,
        marginBottom: 40
    },
    title: {
        fontSize: 48,
        color: '#fff'
    },
    subtitle: {
        fontSize: 24,
        color: '#fff'
    }
});

module.exports = meteoScreen;