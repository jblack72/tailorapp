import React, { Component } from "react";

import { CardItem, Body, Item, Label, Input, Button, Text, Card, Icon, Container } from "native-base";
import { Image, Platform } from "react-native";
// import firebase
import db from "firebase";

class ResultForSork extends Component {

    constructor(props) {
        super(props)
        // alert('in Result for sork ' + JSON.stringify(this.props.uniqueKeys))
        this.state = {
            measurements: this.props.measurements,
            clothType: this.props.clothType,
            uniqueKey: this.props.uniqueKey,
            orderID: this.props.orderID,

        }
        // alert('imageURL ' + JSON.stringify(this.state.imageURL))
    }

    saveToDB() {
        let orderID = this.state.orderID;
        let uniqueKey = this.state.uniqueKey;
        // alert("orderIDError is " + JSON.stringify(this.state.order));

        try {
            this.setState(
                {

                },
                () => {
                    let dbCon = db.database().ref("/orders/" + orderID + '/' + uniqueKey);

                    // alert('measurements ' + JSON.stringify(this.state.measurements))
                    // let obj = this.state.measurements;

                    let obj = {};

                    // obj = this.state.
                    obj["measurements"] = this.state.measurements;
                    // obj["image_url"] = 'success';

                    dbCon.update(obj);
                    alert("Successfully uploading the data to the server");
                }
            );
        } catch (error) {
            alert(
                "Check your internet connection or give me permission to internet access " +
                error
            );
        }


    }

    setMesurements(key, value) {

        this.state.measurements[this.state.clothType][key] = value;
        let temp = this.state.measurements;
        this.setState({
            measurements: temp
        })
        // console.log("order ", this.state.order);
        // alert('measurements ' + JSON.stringify(this.state.measurements))
    }


    render() {
        return (
            <Card>

                <CardItem>
                    <Icon name="heart" style={{ color: '#ED4A6A' }} />

                    <Text>{this.state.clothType}</Text>
                </CardItem>
                <CardItem bordered>
                    <Body>
                        <CardItem>
                            <Text>Order ID {this.state.orderID}</Text>
                        </CardItem>
                        <Item inlineLabel>
                            <Label>Length</Label>
                            <Input
                                returnKeyType={"next"}
                                onSubmitEditing={() => {
                                    this.TextInput2._root.focus();
                                }}
                                keyboardType="numeric"
                                onChangeText={length => this.setMesurements("length", length)}
                                value={`${this.state.measurements[this.state.clothType].length}`}

                            />
                        </Item>
                        <Item inlineLabel>
                            <Label>Shoulder</Label>
                            <Input
                                returnKeyType={"next"}
                                ref={input => {
                                    this.TextInput2 = input;
                                }}
                                onSubmitEditing={() => {
                                    this.TextInput3._root.focus();
                                }}
                                keyboardType="numeric"
                                onChangeText={shoulder =>
                                    this.setMesurements("shoulder", shoulder)
                                }
                                value={`${this.state.measurements[this.state.clothType].shoulder}`}
                            />
                        </Item>
                        <Item inlineLabel>
                            <Label>Sleeves</Label>
                            <Input
                                returnKeyType={"next"}
                                ref={input => {
                                    this.TextInput3 = input;
                                }}
                                onSubmitEditing={() => {
                                    this.TextInput4._root.focus();
                                }}
                                keyboardType="numeric"
                                onChangeText={sleeves => this.setMesurements("sleeves", sleeves)}
                                value={`${this.state.measurements[this.state.clothType].sleeves}`}
                            />
                        </Item>
                        <Item inlineLabel>
                            <Label>Chest</Label>
                            <Input
                                returnKeyType={"next"}
                                ref={input => {
                                    this.TextInput4 = input;
                                }}
                                onSubmitEditing={() => {
                                    this.TextInput5._root.focus();
                                }}
                                keyboardType="numeric"
                                onChangeText={chest => this.setMesurements("chest", chest)}
                                value={`${this.state.measurements[this.state.clothType].chest}`}
                            />
                        </Item>
                        <Item inlineLabel>
                            <Label>Stomach</Label>
                            <Input
                                returnKeyType={"next"}
                                ref={input => {
                                    this.TextInput5 = input;
                                }}
                                onSubmitEditing={() => {
                                    this.TextInput6._root.focus();
                                }}
                                keyboardType="numeric"
                                onChangeText={stomach => this.setMesurements("stomach", stomach)}
                                value={`${this.state.measurements[this.state.clothType].stomach}`}
                            />
                        </Item>
                        <Item inlineLabel>
                            <Label>Seat</Label>
                            <Input
                                returnKeyType={"next"}
                                ref={input => {
                                    this.TextInput6 = input;
                                }}
                                onSubmitEditing={() => {
                                    this.TextInput7._root.focus();
                                }}
                                keyboardType="numeric"
                                onChangeText={seat => this.setMesurements("seat", seat)}
                                value={`${this.state.measurements[this.state.clothType].seat}`}
                            />
                        </Item>
                        <Item inlineLabel>
                            <Label>Frontfix</Label>
                            <Input
                                returnKeyType={"next"}
                                ref={input => {
                                    this.TextInput7 = input;
                                }}
                                onSubmitEditing={() => {
                                    this.TextInput8._root.focus();
                                }}
                                keyboardType="numeric"
                                onChangeText={frontfix =>
                                    this.setMesurements("frontfix", frontfix)
                                }
                                value={`${this.state.measurements[this.state.clothType].frontfix}`}
                            />
                        </Item>
                        <Item inlineLabel>
                            <Label>Collom</Label>
                            <Input
                                returnKeyType={"next"}
                                ref={input => {
                                    this.TextInput8 = input;
                                }}
                                onSubmitEditing={() => {
                                    this.TextInput9._root.focus();
                                }}
                                keyboardType="numeric"
                                onChangeText={collom => this.setMesurements("collom", collom)}
                                value={`${this.state.measurements[this.state.clothType].collom}`}
                            />
                        </Item>
                        <Item inlineLabel>
                            <Label>Cuff</Label>
                            <Input
                                ref={input => {
                                    this.TextInput9 = input;
                                }}
                                keyboardType="numeric"
                                onChangeText={cuff => this.setMesurements("cuff", cuff)}
                                value={`${this.state.measurements[this.state.clothType].cuff}`}
                            />
                        </Item>
                        <CardItem>
                            <Image
                                style={{
                                    height: 200,
                                    width: 320,
                                    resizeMode: "stretch"
                                }}
                                source={{ uri: this.state.measurements.image_url }}
                            />
                        </CardItem>
                        <Button block info onPress={() => this.pickImage()}>
                            <Text> Upload Image </Text>
                        </Button>
                        <Button block primary onPress={() => this.saveToDB()}>
                            <Text> Submit </Text>
                        </Button>
                    </Body>
                </CardItem>
            </Card>
        )
    }

}
export default ResultForSork;