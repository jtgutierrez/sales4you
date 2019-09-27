import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./components/HomeScreen";
import AddCompanyScreen from "./components/AddCompanyScreen";
import { Provider } from "react-redux";
import store from "./components/store";

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  AddCompany: { screen: AddCompanyScreen }
});

const App = createAppContainer(MainNavigator);

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
