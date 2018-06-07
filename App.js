import React, { Component } from "react";
import {} from "react-native";

import { createStackNavigator } from "react-navigation";

import Home from "./src/components/comp_home";
import Manage from "./src/components/comp_manage";
import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCbxz1wsoDqPPrCzcKjPsjO5GREP6dXmgo",
  authDomain: "tailorapp-fd888.firebaseapp.com",
  databaseURL: "https://tailorapp-fd888.firebaseio.com",
  projectId: "tailorapp-fd888",
  storageBucket: "tailorapp-fd888.appspot.com",
  messagingSenderId: "324041981378"
};

firebase.initializeApp(config);

const RootStack = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Manage: {
      screen: Manage
    }
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);
export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
