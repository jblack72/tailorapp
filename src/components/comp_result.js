import React, { Component } from "react";
import {
    Container,
    Header,
    View,
    DeckSwiper,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Left,
    Body,
    Icon,
    Button,
    Item,
    Label,
    Input
} from "native-base";
import { Image, FlatList } from 'react-native';
import ResultForSork from './comp_result_for_sork';
import ResultForPorJ from './comp_result_for_porj';

const cards = [
    // {
    //     text: 'Card One',
    //     name: 'One',
    //     image: require('../assests/login.png'),
    // },
    // {
    //     text: 'Card One',
    //     name: 'One',
    //     image: require('../assests/login.png'),
    // },

];
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
            orderID: []

        }
    }
    componentWillMount() {
        const { navigation } = this.props;
        const measurement = navigation.getParam('measurements', 'NO-measurements');
        const info = navigation.getParam('basicInfo', { name: 'error', gender: 'error', mobile: 'error' })
        const images = navigation.getParam('imageURL', [{ 'image_url': 'http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg' }])
        const orderID = navigation.getParam('orderID', ['no orderID']);

        // alert('basic info result' + JSON.stringify(info))
        alert('measurements ' + JSON.stringify(measurement))

        // alert('images result' + JSON.stringify(images))




        this.state.measurements = measurement

        this.state.measurements.forEach((element, index) => {
            for (var key in element) {
                this.state.measurementsType.push(key)
            }
        });

        this.setState({
            imageURL: images,
            orderID: orderID
        })
        this.state.basicInfo = info;
    }
    componentDidMount() {

    }

    render() {
        // console.log('in render measurements ', this.state.measurements);
        // alert('in render measurements ' + JSON.stringify(this.state.basicInfo.name))


        return (

            < Container >
                <Header />

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
                                        imageURL={this.state.imageURL[index]}
                                        orderID={this.state.orderID[index]}
                                        basicInfo={this.state.basicInfo}
                                    />

                                ) : this.state.measurementsType[index] == 'kurta' ? (
                                    <ResultForSork
                                        measurements={item}
                                        clothType={this.state.measurementsType[index]}
                                        imageURL={this.state.imageURL[index]}
                                        orderID={this.state.orderID[index]}
                                        basicInfo={this.state.basicInfo}
                                    />

                                ) : (
                                            <ResultForPorJ
                                                measurements={item}
                                                clothType={this.state.measurementsType[index]}
                                                imageURL={this.state.imageURL[index]}
                                                orderID={this.state.orderID[index]}
                                                basicInfo={this.state.basicInfo}
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