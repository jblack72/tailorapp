import React, { Component } from "react";

import { CardItem, Body, Item, Label, Input, Button, Text } from "native-base";
// import firebase
import db from "firebase";

class MeasurementsForSorK extends Component {
  constructor(props) {
    super(props);

    this.state = {
      measurements: {
        length: 0,
        shoulder: 0,
        sleeves: 0,
        chest: 0,
        stomach: 0,
        seat: 0,
        frontfix: 0,
        collom: 0,
        cuff: 0
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
              onChangeText={length => this.setMesurements("length", length)}
            />
          </Item>
          <Item inlineLabel>
            <Label>Shoulder</Label>
            <Input
              onChangeText={shoulder =>
                this.setMesurements("shoulder", shoulder)
              }
            />
          </Item>
          <Item inlineLabel>
            <Label>Sleeves</Label>
            <Input
              onChangeText={sleeves => this.setMesurements("sleeves", sleeves)}
            />
          </Item>
          <Item inlineLabel>
            <Label>Chest</Label>
            <Input
              onChangeText={chest => this.setMesurements("chest", chest)}
            />
          </Item>
          <Item inlineLabel>
            <Label>Stomach</Label>
            <Input
              onChangeText={stomach => this.setMesurements("stomach", stomach)}
            />
          </Item>
          <Item inlineLabel>
            <Label>Seat</Label>
            <Input onChangeText={seat => this.setMesurements("seat", seat)} />
          </Item>
          <Item inlineLabel>
            <Label>Frontfix</Label>
            <Input
              onChangeText={frontfix =>
                this.setMesurements("frontfix", frontfix)
              }
            />
          </Item>
          <Item inlineLabel>
            <Label>Collom</Label>
            <Input
              onChangeText={collom => this.setMesurements("collom", collom)}
            />
          </Item>
          <Item inlineLabel>
            <Label>Cuff</Label>
            <Input onChangeText={cuff => this.setMesurements("cuff", cuff)} />
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
export default MeasurementsForSorK;
