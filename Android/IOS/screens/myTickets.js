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

export default class MyTickets extends React.Component {
  static navigationOptions = {
    title: 'My Tickets',
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
                  <Text style={{ fontSize: 20, color: '#aa1256' }}>
                    Boring Queue
            </Text>
                  <Image
                    source={{ uri: 'https://icons8.com/vue-static/icon/collection-favorites.png' }}
                    style={{ height: 200, width: null, flex: 1 }}
                  />
                </CardItem>
                <CardItem>
                  <Body>
                    <Text>This is the information for this Tickets</Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <View style={{ marginTop: 20, marginLeft: 10, height: 50, width: 100 }}>
                    <Button
                      onPress={() => console.log('Ask me later pressed')}
                      title="Delay"
                      color="#7aeac2" />
                  </View>
                  <View style={{ marginTop: 20, marginLeft: 120, height: 50, width: 100 }}>
                    <Button
                      onPress={() => console.log('Ask me later pressed')}
                      title="Delete"
                      color="#aa1256" />
                  </View>
                </CardItem>
              </Card>
            </Content>
          </Container>
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
