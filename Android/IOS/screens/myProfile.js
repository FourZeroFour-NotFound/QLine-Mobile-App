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
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Icon,
  Left,
  Body,
  Right,
  Title
}
  from 'native-base';

export default class MyProfile extends React.Component {
  static navigationOptions = {
    title: 'My Profile',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.welcomeContainer}>
            <Image
              source={{ uri: 'https://i.ibb.co/SN5qmhF/qline.png' }}
              style={styles.welcomeImage}
            />
          </View>
          <Container>
            <Content>
              <Card>
                <CardItem cardBody >
                  <Image
                    source={{ uri: 'https://i.ibb.co/SN5qmhF/qline.png' }}
                    style={{ height: 150, width: null, flex: 1 }}
                  />
                </CardItem>
                <CardItem>
                  <Body>
                    <Text>First Name: Esraa</Text>
                    <Text>Last Name: Zaitoun</Text>
                    <Text>Email: eng.esraaz1991@gmail.com</Text>
                    <Text>Phone Number: 0790782785</Text>
                  </Body>
                </CardItem>
              </Card>
            </Content>
          </Container>
        </ScrollView>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});
