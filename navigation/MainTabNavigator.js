import React from "react";
import {createStackNavigator} from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import DataScreen from "../screens/DataScreen";

const HomeStack = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Data: {
        screen: DataScreen
    },
});

export default HomeStack