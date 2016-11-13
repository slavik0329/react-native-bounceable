'use strict';

import React, {Component} from "react";
import {Animated, PanResponder, View} from "react-native";

const moveTolerance = 30; // Amount of movement before it is no longer a press

class Bounceable extends Component {
  static propTypes = {
    onPress: React.PropTypes.func, //Optional function to be excecuted after succesful press
    level: React.PropTypes.number // Maximum scale of animation
  };

  static defaultProps = {
      level: 1.1
  };

  constructor (props) {
    super( props);

    this.state = {
      scale: new Animated.Value(1)
    };
  }

  panResponder = {};

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderTerminate: (evt, gestureState) => {
      },

      onPanResponderGrant: (evt, gestureState) => {
        Animated.timing(
          this.state.scale,
          {
            toValue: this.props.level,
            friction: 1,
            duration: 200
          },
        ).start();
      },

      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > moveTolerance || gestureState.dy < (-moveTolerance) || gestureState.dx > moveTolerance || gestureState.dx < (-moveTolerance)) {
          // Do nothing 
        } else {
          setTimeout(() => { // 50ms delay makes press response more natural
            Animated.spring(
              this.state.scale,
              {
                toValue: 1,
                friction: 1,
                duration: 200
              },
            ).start();

            if (this.props.onPress) {
              this.props.onPress();
            }
          }, 50);
        }
      }
    });
  }

  render () {
    return (
      <Animated.View
        style={[{
          transform: [
            {
              scale: this.state.scale
            }
          ]
        }, this.props.style
        ]}>
        <View
          {...this._panResponder.panHandlers}>
          <View>
            {this.props.children}
          </View>
        </View>
      </Animated.View>
    );
  }
}

module.exports = Bounceable;