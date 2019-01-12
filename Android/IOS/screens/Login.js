import React from 'react';
import { Alert, Button, Image, TextInput, View, StyleSheet } from 'react-native';
import AnimateLoadingButton from 'react-native-animate-loading-button';





export default class Login extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
    this.buttonPress = this.buttonPress.bind(this);
    this._onPressHandler = this._onPressHandler.bind(this)
  }
  
//   onLogin() {
//     const { username, password } = this.state;
//     Alert.alert('Credentials', `${username} + ${password}`);

//   }

_onPressHandler() {
    this.loadingButton.showLoading(true);
    setTimeout(() => {
        this.loadingButton.showLoading(false);
      }, 4000);
    }

buttonPress() {
        this._onPressHandler();
        setTimeout (() => {
        console.log('called');
        this.props.navigation.navigate('Search');
        }, 5000)
    }
    
  render() {
    return (
      
      <View style={styles.container}>
            <Image
              source={{ uri: 'https://i.ibb.co/SN5qmhF/qline.png' }}
              style={styles.welcomeImage}
            />
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        <AnimateLoadingButton
          ref={c => (this.loadingButton = c)}
          width={150}
          height={50}
          title="Login"
          titleFontSize={16}
          titleColor="rgb(255,255,255)"
          backgroundColor="#7aeac2"
          borderRadius={4}
          onPress={this.buttonPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    backgroundColor: '#e33e2a',
    color: "black"
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
});

