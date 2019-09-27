import React, { Component } from "react";
import { Text, View, Button, Provider } from "react-native";
import MapView, { Marker, MapContainer } from "react-native-maps";
import { connect } from "react-redux";
import { getClosestCompanies } from "./store/companies";
import { getDistanceThunkCreator } from "./store/distance";
import styles from "../styles";
const DATA = require("../DATA");

class DisconnectedHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      distance: null
    };

    this.handlePress = this.handlePress.bind(this);
  }
  static navigationOptions = {
    title: "SALES4YOU"
  };
  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }),
      error => this.setState({ error: error }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 };
  }
  handlePress(evt) {
    const { latitude, longitude } = evt.nativeEvent.coordinate;
    this.props.getDistance(
      { latitude, longitude },
      {
        myLocation: {
          latitude: this.state.latitude,
          longitude: this.state.longitude
        }
      }
    );
  }

  render() {
    const { navigate, setParams } = this.props.navigation;
    return (
      <View style={styles.mainBackground}>
        <Text style={styles.header}>Distance</Text>
        <MapView
          style={{ flex: 1 }}
          provider="google"
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04
          }}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          {DATA.map((location, idx) => {
            const latitude = location["Lattitude"];
            const longitude = location["Longitude"];
            const name = location["Company"];
            return (
              <Marker
                key={idx}
                title={name}
                coordinate={{ latitude, longitude }}
                onPress={this.handlePress}
              />
            );
          })}
        </MapView>

        <View style={styles.footer}>
          <Button
            title="Add Your Company"
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
const mapState = state => {
  return {
    companies: state.companies,
    distance: state.distance
  };
};

const mapDispatch = dispatch => ({
  getClosest: () => dispatch(getClosestCompanies()),
  getDistance: (marker, myLocation) =>
    dispatch(getDistanceThunkCreator(marker, myLocation))
});

const HomeScreen = connect(
  mapState,
  mapDispatch
)(DisconnectedHomeScreen);
export default HomeScreen;
