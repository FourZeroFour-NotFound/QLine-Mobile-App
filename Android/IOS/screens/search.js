import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  AppRegistry,
  TextInput,
  InputAccessoryView,
  View,
  Button,
  Alert,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user_id : "zait"
     };
  }
  static navigationOptions = {
    header: null,
  };
  test = function (){
    storeToken = async accessToken => {
      try {
        await AsyncStorage.setItem("userID", JSON.stringify(accessToken));
      } catch (error) {
        console.warn("storeToken error:", error);
      }
    };
  }
  


  render() {
    const inputAccessoryViewID = "uniqueID";
    // const value = await AsyncStorage.getItem("userID")
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View><Text>{AsyncStorage.getItem("userID").userID}</Text></View>
          <View style={styles.welcomeContainer}>
            <Image
              source={{ uri: 'https://i.ibb.co/SN5qmhF/qline.png' }}
              style={styles.welcomeImage}
            />
          </View>
          <View>
          <Text style={{ marginLeft: 50, fontSize: 18 }}>{console.log(this.state.user_id)}Enter your ID to enjoy our service</Text>
          </View>
          <View style={{ marginTop: 20 }}>
          <TextInput
              style={{ alignItems: 'center', backgroundColor: 'white' }}
              placeholder='Your ID'
              onChange={(e)=>{console.log('e is :',e)}}
            />
          </View>
          <View style={{ marginTop: 20, marginLeft: 120, height: 50, width: 100  }}>
                <Button
                  onPress={this.test}
                  title="Enter"
                  color="#aa1256"
                />
          </View>
          
          <View>
            <Text style={{ marginLeft: 50, fontSize: 18 }}>Join to the queue by queue ID:</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <TextInput
              style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}
              // value={this.state.searchString}
              // onChangeText={(searchString) => { this.setState({ searchString }) }}
              placeholder='Search'
              keyboardType='web-search'
              // onSubmitEditing={() => { this._fetchResults() }}
              ref='searchBar'
            />
            <TouchableHighlight 
            onPress={() => Alert.alert('Hello World')}
            style={{ alignItems: 'center', justifyContent: 'center' }} 
            // onPress={() => { this._fetchResults() }} 
            underlayColor='transparent'>
              <View style={{ marginTop: 20 }}>
                <Button
                  onPress={() => console.log('Ask me later pressed')}
                  title="Search"
                  color="#aa1256"
                />
              </View>
            </TouchableHighlight>
          </View>
          <Text style={{ marginTop: 40, marginLeft: 70, fontSize: 18 }}>Scan the barcode for the queue:</Text>
          <View style={{ marginTop: 20, marginLeft: 130, height: 50, width: 100 }}>
            <Button
              onPress={() => console.log('Ask me later pressed')}
              title="Scan"
              color="#aa1256"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },


});
