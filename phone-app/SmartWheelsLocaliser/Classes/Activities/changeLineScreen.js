import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class changeLineScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);

        this.state = {
            temp: 0,
            passInput: '',

        };

    }

    render() {


        backgroundColorVar = '#f7b733';
        var disabledVar = this.state.passInput != "parola";
        console.log(disabledVar);
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>

                <TextInput
                    style={{ margin: 20 }}
                    label='Parola'
                    value={this.state.passInput}
                    onChangeText={text => this.setState({ passInput: text })}
                />
                <Button icon={

                    <Icon color="rgb(255, 13, 0)" name="bus" reverse type="font-awesome" />
                }
                    disabled={disabledVar}
                    onPress={()=>{
                        this.props.navigation.replace('Home',{
                            vehId:1,
                            lineType:'bus',
                          });
                    }}
                    buttonStyle={{ margin: 20, height: 60 }} title="Linia 5" />
                <Button icon={
                    <Icon color="rgb(255, 13, 0)" name="bus" reverse type="font-awesome" />
                }
                onPress={()=>{
                    this.props.navigation.replace('Home',{
                        vehId:2,
                        lineType:'bus',
                      });
                }}
                    disabled={disabledVar}
                    buttonStyle={{ margin: 20, height: 60 }} title="Linia 6" />
                <Button icon={
                    <Icon color="rgb(148, 0, 211)" name="train" reverse type="font-awesome" />
                }
                onPress={()=>{
                    this.props.navigation.replace('Home',{
                        vehId:1,
                        lineType:'train',
                      });
                }}
                    disabled={disabledVar}
                    buttonStyle={{ margin: 20, height: 60 }} title="IR01746" />
                <Button
                    icon={
                        <Icon color="rgb(148, 0, 211)" name="train" reverse type="font-awesome" />
                    }
                    onPress={()=>{
                        this.props.navigation.replace('Home',{
                            vehId:2,
                            lineType:'train',
                          });
                    }}
                    disabled={disabledVar}
                    buttonStyle={{ margin: 20, height: 60 }} title="IR1623" />

            </View>
        );
    };
}
const styles = StyleSheet.create({

});

module.exports = changeLineScreen;