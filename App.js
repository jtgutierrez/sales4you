import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./components/HomeScreen";
import AddCompanyScreen from "./components/AddCompanyScreen";

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  AddCompany: { screen: AddCompanyScreen }
});

const App = createAppContainer(MainNavigator);
export default App;
