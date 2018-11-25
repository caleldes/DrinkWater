import React from "react";
import {Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Constants} from "expo";
import {Ionicons} from "@expo/vector-icons";
import {Entypo} from "@expo/vector-icons";


export default class DataScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: " " + navigation.getParam('cityName'),
            headerTitleStyle: {
                textAlign: "center",
                alignSelf: "center",
                width: '70%'
            }
        };
    };

    constructor(props) {
        super(props);
        const {
            navigation,
        } = props;
        const data = navigation.getParam('data');
        const viewStatus = this.calcViewStatus(data);
        const hardnessStatus = this.calcHardnessStatus(data);
        const nonorganicStatus = this.calcNonorganicStatus(data);
        const mikroStatus = this.calcMikroStatus(data);
        const status = Math.min(viewStatus.status, hardnessStatus.status, nonorganicStatus.status, mikroStatus.status);
        this.state = {
            viewStatus,
            hardnessStatus,
            nonorganicStatus,
            mikroStatus,
            status,
            data,
        };
        console.log(this.state);
    }

    calcViewStatus(data) {
        const {
            color,
            smell
        } = data;
        const colorStatus = color < 2 ? 1 : (color > 3 ? -1 : 0);
        const smellStatus = smell < 2 ? 1 : (smell > 3 ? -1 : 0);
        const viewStatus = Math.min(colorStatus, smellStatus);
        return {
            status: viewStatus,
            colorStatus,
            smellStatus,
        }
    }

    calcHardnessStatus(data){
        const {
            hardness
        } = data;
        const hardnessStatus = hardness < 400 ? 1 : (hardness > 500 ? -1 : 0);
        return {
            status: hardnessStatus,
        }
    }

    calcNonorganicStatus(data){
        const {
            iron,
            manganese,
            ammonia,
        } = data;
        const ironStatus = iron < 200 ? 1 : (iron > 210 ? -1 : 0);
        const manganeseStatus = manganese < 50 ? 1 : (manganese > 55 ? -1 : 0);
        const amoniaStatus = ammonia < 0.5 ? 1 : (ammonia > 0.55 ? -1 : 0);
        const nonorganicStatus = Math.min(ironStatus, manganeseStatus, amoniaStatus);
        return {
            status: nonorganicStatus,
            ironStatus,
            manganeseStatus,
            amoniaStatus,
        };
    }

    calcMikroStatus(data){
        const {
            bacteria,
            ecola,
        } = data;
        const bacteriaStatus = bacteria < 50 ? 1 : (bacteria > 55 ? -1 : 0);
        const ecolaStatus = ecola ? -1 : 1;
        const mikroStatus = Math.min(bacteriaStatus, ecolaStatus);
        return {
            status: mikroStatus,
            ecolaStatus,
            bacteriaStatus,
        };
    }

    statusColor(status){
        console.log("ble",status);
        if (status === 1) {
            return "#36C30A";
        }
        if (status === 0) {
            return "yellow";
        }
        if (status === -1) {
            return "red";
        }
        console.log(status);
    }

    showEmoji(status){
        if (status === 1) {
            return <Entypo name="emoji-happy" size={300} color="#36C30A" />;
        }
        if (status === 0) {
            return <Entypo name="emoji-neutral" size={300} color="yellow" />;
        }
        if (status === -1) {
            return <Entypo name="emoji-sad" size={300} color="red" />;
        }
    }

    render() {
        const {
            status,
            viewStatus,
            hardnessStatus,
            nonorganicStatus,
            mikroStatus,
        } = this.state;

        return (
            <View style={styles.container2}>
                <View style={styles.body}>
                    <View style={styles.keyList}>
                        <View style={styles.emoji}>
                            {this.showEmoji(status)}
                        </View>
                        <ScrollView>
                            <Text style={{...styles.keyValue, ...{color: this.statusColor(viewStatus.status)}}}>Organoleptyczne</Text>
                            <Text style={{...styles.keyValue, ...{color: this.statusColor(hardnessStatus.status)}}} >Twardość</Text>
                            <Text style={{...styles.keyValue, ...{color: this.statusColor(nonorganicStatus.status)}}} >Nieorganiczne</Text>
                            <Text style={{...styles.keyValue, ...{color: this.statusColor(mikroStatus.status)}}} >Mikrobiologia</Text>
                            {/*{*/}
                                {/*keys.map(key => {*/}
                                    {/*const value = data[key];*/}
                                    {/*return (*/}
                                        {/*<View*/}
                                            {/*key={key}*/}
                                        {/*>*/}
                                            {/*<Text style={styles.keyValue}>{key} {value}</Text>*/}
                                        {/*</View>*/}
                                    {/*);*/}
                                {/*})*/}
                            {/*}*/}
                        </ScrollView>
                    </View>
                </View>
            </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: 'steelblue',
    },
    container2: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: 'steelblue',
    },
    header: {
        flexDirection: 'row',
    },
    headerTitle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
    },
    image: {
        width: Dimensions.get('window').width - 180,
        height: Dimensions.get('window').width - 180,
        alignItems: 'center',
        justifyContent: 'center',
    },
    status: {
        marginBottom: 80,
        color: 'white',
        fontSize: 40,
        fontWeight: '400'
    },
    keyValue: {
        fontSize: 40,
        fontWeight: '400'
    },
    city: {
        color: 'white',
        fontSize: 40,
        fontWeight: '400',
        alignItems: 'center',
    },
    keyList: {

        width: Dimensions.get('window').width,
        justifyContent: 'center',
    },
    emoji: {
        alignItems: 'center',
        marginBottom: 20,
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: Dimensions.get('window').width - 100,
        height: Dimensions.get('window').width - 100,
        backgroundColor: 'white',
        borderRadius: 160,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonBack: {

        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 50,
    }
});
