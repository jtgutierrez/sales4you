import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styles from "../styles";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null
    };
  }
  static navigationOptions = {
    title: "SALES"
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }),
      error => this.setState({ error: error }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 };
  }

  render() {
    const { navigate, setParams } = this.props.navigation;
    return (
      <View style={styles.mainBackground}>
        <MapView
          style={{ flex: 1 }}
          provider="google"
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          <Marker coordinate={this.state} />
        </MapView>
        <View style={styles.footer}>
          <Button
            title="Company"
            color="white"
            onPress={() => {
              navigate("AddCompany");
            }}
          />
        </View>
      </View>
    );
  }
}

export default HomeScreen;
