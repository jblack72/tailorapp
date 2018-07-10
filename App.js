import React, { Component } from "react";

import { createStackNavigator } from "react-navigation";

import Home from "./src/components/comp_home";
import Manage from "./src/components/comp_manage";
import Result from './src/components/comp_result';

import db from "firebase";

const config = {
  apiKey: "AIzaSyCbxz1wsoDqPPrCzcKjPsjO5GREP6dXmgo",
  authDomain: "tailorapp-fd888.firebaseapp.com",
  databaseURL: "https://tailorapp-fd888.firebaseio.com",
  projectId: "tailorapp-fd888",
  storageBucket: "tailorapp-fd888.appspot.com",
  messagingSenderId: "324041981378"
};

db.initializeApp(config);

//Handle Firebase warning
console.ignoredYellowBox = [
  "Setting a timer for a long period of time",
  "Possible Unhandled Promise Rejection"
];


const RootStack = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Manage: {
      screen: Manage
    },
    Result: {
      screen: Result
    }
  },
  {
    initialRouteName: "Manage",
    headerMode: "none"
  }
);
export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
