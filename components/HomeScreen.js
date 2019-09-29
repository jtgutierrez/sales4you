import React, { Component } from "react";
import { Text, View, Button, Provider, Image } from "react-native";
import MapView, { Marker, MapContainer } from "react-native-maps";
import { connect } from "react-redux";
import { getClosestCompanies } from "./store/companies";
import { getDistanceThunkCreator } from "./store/distance";
import styles from "../styles";
import Header from "./Header";
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
    this.location = {
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
      this.location.latitude = position.coords.latitude;
      this.location.longitude = position.coords.longitude;
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
          latitude: this.location.latitude,
          longitude: this.location.longitude
        }
      }
    );
  }
  updateLocation(evt) {
    const { latitude, longitude } = evt.nativeEvent.coordinate;
    this.location.latitude = latitude;
    this.location.longitude = longitude;
    console.log(this.location);
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
          <View style={styles.header}>
            <Text style={{ color: "whitesmoke" }}>
              Distance: {this.props.distance.miles}
            </Text>
            <Text style={{ color: "whitesmoke" }}>
              Walk: {this.props.distance.time}
            </Text>
          </View>
          <MapView
            style={{ flex: 1 }}
            provider="google"
            initialRegion={{
              latitude: this.location.latitude,
              longitude: this.location.longitude,
              latitudeDelta: 0.04,
              longitudeDelta: 0.04
            }}
            showsUserLocation={true}
            followsUserLocation={true}
            onUserLocationChange={evt => this.updateLocation(evt)}
          >
            {data.companies.map((location, idx) => {
              const latitude = location.latitude;
              const longitude = location.longitude;
              const name = location.name;
              const discount = `${Math.floor(
                Math.random() * Math.floor(30)
              )}% OFF ${items[
                Math.floor(Math.random() * items.length)
              ].toUpperCase()}`;
              return (
                <Marker
                  key={idx}
                  title={name}
                  description={discount}
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
