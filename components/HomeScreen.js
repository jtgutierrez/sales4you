import React, { Component } from "react";
import { Text, View, Button, Provider, Image } from "react-native";
import MapView, { Marker, MapContainer } from "react-native-maps";
import { connect } from "react-redux";
import { getClosestCompanies } from "./store/companies";
import { getDistanceThunkCreator } from "./store/distance";
import styles from "../styles";
import Header from "./header";
const items = [
  "shoes",
  "button-down shirts",
  "dresses",
  "designer bags",
  "sweaters",
  "hoodies",
  "shorts",
  "suits",
  "underwear"
];

class DisconnectedHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null
    };

    this.handlePress = this.handlePress.bind(this);
  }
  static navigationOptions = {
    headerTitle: <Header />
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      this.props.getClosest({
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
    if (this.props.companies.loading) {
      return (
        <Image
          style={styles.loading}
          source={{
            uri:
              "https://1.bp.blogspot.com/-tM8Z7VPNn5Q/WMkr9sb6qyI/AAAAAAAAA9s/IjGPg8VFOkc41UWeaWuGY7eyJeCCEb82gCLcB/s1600/earth%2B.gif"
          }}
        />
      );
    } else {
      const data = this.props.companies;
      return (
        <View style={styles.mainBackground}>
          <Text style={styles.header}>
            Distance: {this.props.distance.miles} Walk:{" "}
            {this.props.distance.time}
          </Text>
          <MapView
            style={{ flex: 1 }}
            provider="google"
            initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.04,
              longitudeDelta: 0.04
            }}
            showsUserLocation={true}
            followsUserLocation={true}
          >
            {data.companies.map((location, idx) => {
              const latitude = location.latitude;
              const longitude = location.longitude;
              const name = location.name;
              return (
                <Marker
                  key={idx}
                  title={name}
                  description={`${Math.floor(
                    Math.random() * Math.floor(30)
                  )}% OFF ${items[
                    Math.floor(Math.random() * items.length)
                  ].toUpperCase()}`}
                  coordinate={{ latitude, longitude }}
                  onPress={evt => this.handlePress(evt)}
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
}
const mapState = state => {
  return {
    companies: state.companies,
    distance: state.distance
  };
};

const mapDispatch = dispatch => ({
  getClosest: myLocation => dispatch(getClosestCompanies(myLocation)),
  getDistance: (marker, myLocation) =>
    dispatch(getDistanceThunkCreator(marker, myLocation))
});

const HomeScreen = connect(
  mapState,
  mapDispatch
)(DisconnectedHomeScreen);
export default HomeScreen;
