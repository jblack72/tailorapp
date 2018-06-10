import React, { Component } from "react";

import { CardItem, Body, Item, Label, Input, Button, Text } from "native-base";

import db from "firebase";

class MeasurementsForPorJ extends Component {
  constructor(props) {
    super(props);

    this.state = {
      measurements: {
        length: 0,
        waist: 0,
        seat: 0,
        fork: 0,
        thigh: 0,
        knee: 0,
        bottom: 0,
        backrise: 0
      },
      imageUrl: "",
      basicInfo: this.props.basicInfo,
      clothType: this.props.clothType
    };
  }

  setMesurements(key, value) {
    this.state.measurements[key] = value;
    console.log("basic info ", this.state.basicInfo);
    console.log("measurements ", this.state.measurements);
    console.log("Cloth type ", this.state.clothType);
  }

  saveToDB() {
    let dbCon = db.database().ref("/orders");

    let obj = {};
    obj["1"] = this.state.basicInfo;
    obj["1"]["measurements"] = {};
    obj["1"]["measurements"][
      this.state.clothType.type
    ] = this.state.measurements;
    obj["1"]["image_url"] = this.state.imageUrl;
    dbCon.set(obj);
    console.log("obj info ", obj);
  }
  uploadImage() {
    let dbCon = db.storage.ref("/");
    dbCon = dbCon.child("login.png");
    var file = "../assests/login.png";
    dbCon.put(file).then(function(snapshot) {});
    // '../assests/login.png'
  }

  render() {
    return (
      <CardItem bordered>
        <Body>
          <Item inlineLabel>
            <Label>Length</Label>
            <Input
              returnKeyType={"next"}
              onSubmitEditing={() => {
                this.TextInput2._root.focus();
              }}
              keyboardType="numeric"
              onChangeText={length => this.setMesurements("length", length)}
            />
          </Item>
          <Item inlineLabel>
            <Label>Waist</Label>
            <Input
              returnKeyType={"next"}
              ref={input => {
                this.TextInput2 = input;
              }}
              onSubmitEditing={() => {
                this.TextInput3._root.focus();
              }}
              keyboardType="numeric"
              onChangeText={waist => this.setMesurements("waist", waist)}
            />
          </Item>
          <Item inlineLabel>
            <Label>Seat</Label>
            <Input
              returnKeyType={"next"}
              ref={input => {
                this.TextInput3 = input;
              }}
              onSubmitEditing={() => {
                this.TextInput4._root.focus();
              }}
              keyboardType="numeric"
              onChangeText={seat => this.setMesurements("seat", seat)}
            />
          </Item>
          <Item inlineLabel>
            <Label>Fork</Label>
            <Input
              returnKeyType={"next"}
              ref={input => {
                this.TextInput4 = input;
              }}
              onSubmitEditing={() => {
                this.TextInput5._root.focus();
              }}
              keyboardType="numeric"
              onChangeText={fork => this.setMesurements("fork", fork)}
            />
          </Item>
          <Item inlineLabel>
            <Label>Thigh</Label>
            <Input
              returnKeyType={"next"}
              ref={input => {
                this.TextInput5 = input;
              }}
              onSubmitEditing={() => {
                this.TextInput6._root.focus();
              }}
              keyboardType="numeric"
              onChangeText={thigh => this.setMesurements("thigh", thigh)}
            />
          </Item>
          <Item inlineLabel>
            <Label>Knee</Label>
            <Input
              returnKeyType={"next"}
              ref={input => {
                this.TextInput6 = input;
              }}
              onSubmitEditing={() => {
                this.TextInput7._root.focus();
              }}
              keyboardType="numeric"
              onChangeText={knee => this.setMesurements("knee", knee)}
            />
          </Item>
          <Item inlineLabel>
            <Label>Bottom</Label>
            <Input
              returnKeyType={"next"}
              ref={input => {
                this.TextInput7 = input;
              }}
              onSubmitEditing={() => {
                this.TextInput8._root.focus();
              }}
              keyboardType="numeric"
              onChangeText={bottom => this.setMesurements("bottom", bottom)}
            />
          </Item>
          <Item inlineLabel>
            <Label>Back Rise</Label>
            <Input
              ref={input => {
                this.TextInput8 = input;
              }}
              keyboardType="numeric"
              onChangeText={backrise =>
                this.setMesurements("backrise", backrise)
              }
            />
          </Item>
          <Button block info>
            <Text> Upload Image </Text>
          </Button>
          <Button block primary onPress={this.saveToDB.bind(this)}>
            <Text> Submit </Text>
          </Button>
        </Body>
      </CardItem>
    );
  }
}

export default MeasurementsForPorJ;
