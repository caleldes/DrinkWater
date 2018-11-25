import React from "react";
import {createStackNavigator} from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import DataScreen from "../screens/DataScreen";
import HardnessStatusScreen from "../screens/HardnessStatusScreen";
import MikroStatusScreen from "../screens/MikroStatusScreen";
import NonorganicStatusScreen from "../screens/NonorganicStatusScreen";
import ViewStatusScreen from "../screens/ViewStatusScreen";

const HomeStack = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Data: {
        screen: DataScreen
    },
    Hardness: {
        screen: HardnessStatusScreen
    },
    Mikro: {
        screen: MikroStatusScreen
    },
    Nonorganic: {
        screen: NonorganicStatusScreen
    },
    View: {
        screen: ViewStatusScreen
    },
});

export default HomeStack