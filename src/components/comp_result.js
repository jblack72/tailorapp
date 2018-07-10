import React, { Component } from "react";
import {
    Container,
    Header,
    View,
    Button,

    CardItem,

    Text,
    Left,
    Body,
    Icon,
    Title,
    Right,
} from "native-base";
import { FlatList } from 'react-native';
import ResultForSork from './comp_result_for_sork';
import ResultForPorJ from './comp_result_for_porj';


export default class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            basicInfo: {},
            measurements: [
                {
                    shirt: {
                        chest: 100,
                        collom: 100,
                        cuff: 100,
                        frontfix: 100,
                        length: 100,
                        seat: 100,
                        shoulder: 100,
                        sleeves: 100,
                        stomach: 100,
                    }
                }
            ],
            measurementsType: [],
            imageURL: [],
            orderID: [],
            uniqueKeys: []
        }
    }
    componentWillMount() {
        const { navigation } = this.props;
        const measurement = navigation.getParam('measurements', 'NO-measurements');
        const info = navigation.getParam('basicInfo', { name: 'error', gender: 'error', mobile: 'error' })
        const uniqueKeys = navigation.getParam('uniqueKeys', ['no keys'])
        const orderID = navigation.getParam('orderID', ['no orderID']);

        // alert('basic info result' + JSON.stringify(info))
        // alert('measurements ' + JSON.stringify(measurement))

        // alert('images result' + JSON.stringify(images))
        // alert('unique Keys' + JSON.stringify(uniqueKeys));



        this.state.measurements = measurement

        this.state.measurements.forEach((element, index) => {
            for (var key in element) {
                this.state.measurementsType.push(key)
            }
        });

        this.setState({
            // imageURL: images,
            orderID: orderID,
            basicInfo: info,
            uniqueKeys: uniqueKeys
        })
        // this.state.basicInfo = info;
    }
    componentDidMount() {

    }

    render() {
        // console.log('in render measurements ', this.state.measurements);
        // alert('in render measurements ' + JSON.stringify(this.state.basicInfo.name))

        // alert('basic info ' + JSON.stringify(this.state.basicInfo))
        return (

            < Container >
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Result</Title>
                    </Body>
                    <Right>
                        <Button onPress={
                            () => this.props.navigation.push("Home", {
                                basicInfo: this.state.basicInfo,
                                orderID: this.state.orderID
                            })
                        } success>
                            {/* <Icon name='arrow-back' /> */}
                            <Text>New/Modify</Text>
                        </Button>
                    </Right>
                </Header>

                <CardItem>
                    <Left>
                        {/* <Thumbnail source={item.image} /> */}
                        <Body>
                            <Text>{this.state.basicInfo.name}</Text>
                            <Text note>{this.state.basicInfo.gender}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    {/* <Image style={{ height: 300, flex: 1 }} source={item.image} /> */}
                </CardItem>
                <CardItem>
                    <Icon name="call" style={{ color: '#ED4A6A' }} />
                    <Text>{this.state.basicInfo.mobile}</Text>
                </CardItem>
                <FlatList
                    data={this.state.measurements}
                    renderItem={({ item, index }) =>
                        <View >

                            {

                                this.state.measurementsType[index] == 'shirt' ? (
                                    <ResultForSork
                                        measurements={item}
                                        clothType={this.state.measurementsType[index]}
                                        uniqueKey={this.state.uniqueKeys[index]}
                                        orderID={this.state.orderID[index]}

                                    />

                                ) : this.state.measurementsType[index] == 'kurta' ? (
                                    <ResultForSork
                                        measurements={item}
                                        clothType={this.state.measurementsType[index]}
                                        uniqueKey={this.state.uniqueKeys[index]}
                                        orderID={this.state.orderID[index]}

                                    />

                                ) : (
                                            <ResultForPorJ
                                                measurements={item}
                                                clothType={this.state.measurementsType[index]}
                                                uniqueKey={this.state.uniqueKeys[index]}
                                                orderID={this.state.orderID[index]}

                                            />
                                        )
                            }
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />

            </Container >
        );
    }
}