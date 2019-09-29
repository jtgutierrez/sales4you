import React, { Component } from "react";
import { Text, View, Button, Provider, Image } from "react-native";
import MapView, { Marker, MapContainer } from "react-native-maps";
import { connect } from "react-redux";
import { getClosestCompanies } from "./store/companies";
import { getDistanceThunkCreator } from "./store/distance";
import styles from "../styles";
import Title from "./Title";

class DisconnectedHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.location = {
      latitude: 0,
      longitude: 0,
      error: null
    };
    this.store = {};

    this.handlePress = this.handlePress.bind(this);
  }
  static navigationOptions = {
    headerTitle: <Title />
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

    for (let i = 0; i < this.props.companies.companies.length; i++) {
      let company = this.props.companies.companies[i];
      if (company.latitude === latitude && company.longitude === longitude) {
        this.store = company;
      }
    }
    console.log("STTOOOOOOOREEEEE---------", this.store);
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
              const address = location.address;
              return (
                <Marker
                  key={idx}
                  title={name}
                  description={address}
                  coordinate={{ latitude, longitude }}
                  onPress={evt => this.handlePress(evt)}
                />
              );
            })}
          </MapView>

          <View style={styles.header}>
            <Button
              title="Add Your Deals"
              color="white"
              onPress={() => {
                navigate("AddCompany");
              }}
            />
            <Button
              title="Discounts"
              color="white"
              onPress={() => {
                navigate("Discounts", this.store);
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
