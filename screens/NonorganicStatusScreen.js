/**
 * Created by natal on 25.11.2018.
 */
import React from "react";
import {Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Constants} from "expo";
import {Ionicons} from "@expo/vector-icons";
import {Entypo} from "@expo/vector-icons";


export default class MikroStatusScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: " Wzkażniki Nieorganiczne",
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
        const status = navigation.getParam('status');
        this.state = {
            status,
            data,
        };
    }

    statusColor(status){
        if (status === 1) {
            return "#36C30A";
        }
        if (status === 0) {
            return "yellow";
        }
        if (status === -1) {
            return "red";
        }
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
            data
        } = this.state;

        return (
            <ImageBackground source={require('./background.jpg')} style={styles.container2}>
                <View style={styles.body}>
                    <View style={styles.keyList}>
                        <View style={styles.emoji}>
                            {this.showEmoji(status.status)}
                        </View>
                        <ScrollView contentContainerStyle={styles.scroll}>
                            <Text style={{...styles.keyValue, ...{color: this.statusColor(status.ironStatus)}}}>Żelazo {data.iron}/200</Text>
                            <Text style={{...styles.keyValue, ...{color: this.statusColor(status.manganeseStatus)}}}>Mangan {data.manganese}/50</Text>
                            <Text style={{...styles.keyValue, ...{color: this.statusColor(status.amoniaStatus)}}}>Amoniak {data.ammonia}/0.5</Text>
                        </ScrollView>
                    </View>
                </View>
            </ImageBackground>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        width: '100%',
        height: '110%',
    },
    container2: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        width: '100%',
        height: '110%',
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
    scroll: {
        alignItems: 'center',
        justifyContent: 'center',
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
        padding: 10,
        fontSize: 40,
        fontWeight: '400',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
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
    buttonKey: {
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    buttonBack: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 50,
    }
});
