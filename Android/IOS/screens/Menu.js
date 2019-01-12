import React, { Component } from "react";
import { Animated, View, Modal, Text, FlatList, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { material } from "react-native-typography";
import { Ionicons } from "@expo/vector-icons";

export default class Menu extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.node.isRequired,
      onPress: PropTypes.func.isRequired,
      title: PropTypes.string.isRequired,
      showAsAction: PropTypes.string.isRequired
    })).isRequired,
    onRequestClose: PropTypes.func.isRequired
  };

  anim = new Animated.Value(0);
  state = {
    offset: 0
  };

  setOffset = offset => {
    this.setState({ offset });
    this.showMe();
  }

  showMe = () => Animated.timing(this.anim, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true
  }).start();

  hideMe = callback => Animated.timing(this.anim, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true
  }).start(callback);

  render = () => {
    const { visible, position, items, onRequestClose } = this.props;
    const { offset } = this.state;
    
    const translateX = this.anim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [offset / 2, offset / 2, 0],
      extrapolate: "clamp"
    });
    const scaleY = this.anim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 1],
      extrapolate: "clamp"
    });
    const scaleX = this.anim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.1, 0.1, 1],
      extrapolate: "clamp"
    });
    const opacity = this.anim.interpolate({
      inputRange: [0, 0.3, 1],
      outputRange: [0, 1, 1],
      extrapolate: "clamp"
    });

    const animation = {
      opacity,
      transform: [{
        translateX
      }, {
        scaleX
      }, {
        scaleY
      }]
    };

    return (
      <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onRequestClose}>
        <TouchableWithoutFeedback onPress={() => this.hideMe(onRequestClose)}>
          <View style={styles.backCover}>
            <Animated.View onLayout={e => this.setOffset(e.nativeEvent.layout.width - 8)} 
                          style={[styles.container, { top: position.y + 5, left: position.x - offset }, animation]}>
              <FlatList
                data={items}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => this.hideMe(() => {
                    item.onPress();
                    onRequestClose();
                  })}>
                    <View style={styles.listItem}>
                      {item.icon}
                      <Text style={[material.body1, { marginLeft: 8 }]}>{item.title}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item._id}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  backCover: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent"
  },
  container: {
    position: "absolute",
    elevation: 8,
    flexShrink: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 2
  },
  listItem: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  }
});