import React, { Component } from "react";

import { CardItem, Body, Item, Label, Input, Button, Text } from "native-base";
import {
  Image,
  Platform,
  StyleSheet,
  View,
  ActivityIndicator
} from "react-native";

import db from "firebase";

import { ImagePicker } from "expo";

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
        backrise: 0,
        image_url:
          "http://vignette1.wikia.nocookie.net/ofibty/images/5/56/Insert-Photo-Here.jpg/revision/latest?cb=20130607022022"
      },

      basicInfo: this.props.basicInfo,
      clothType: this.props.clothType,
      order: this.props.order,
      imageresult: null,
      loading: false
    };
  }

  setMesurements(key, value) {
    this.state.measurements[key] = value;
    this.setState({
      measurements: this.state.measurements
    });
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true
    });

    console.log("image selected");

    this.setState({
      loading: true
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });

      let base64Img = `data:image/jpg;base64,${result.base64}`;
      let apiUrl = "https://api.cloudinary.com/v1_1/dixwiepue/image/upload";

      let data = {
        file: base64Img,
        upload_preset: "xvv0gosj"
      };

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json"
        },
        method: "POST"
      })
        .then(responsejson => {
          let data = responsejson._bodyText;
          if (responsejson.ok) {
            responsejson.json().then(json => {
              // console.log(json.url);

              let orderID = this.state.order.orderID;

              let dbCon = db.database().ref("/orders/" + orderID);

              let obj = {};
              let measurementsObj = {};
              obj = this.state.basicInfo;
              let measurements = this.state.measurements;
              measurements["image_url"] = json.url;
              measurementsObj["measurements"] = {};

              measurementsObj["measurements"][
                this.state.clothType.type
              ] = measurements;
              dbCon.update(obj);
              dbCon.push(measurementsObj);

              alert("Successfully uploading the data to the server");
            });
          }
        })
        .catch(err => console.log(err));
    }
  };

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
              value={`${this.state.measurements.length}`}
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
              value={`${this.state.measurements.waist}`}
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
              value={`${this.state.measurements.seat}`}
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
              value={`${this.state.measurements.fork}`}
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
              value={`${this.state.measurements.thigh}`}
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
              value={`${this.state.measurements.knee}`}
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
              value={`${this.state.measurements.bottom}`}
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
              value={`${this.state.measurements.backrise}`}
            />
          </Item>
          <Image
            style={{
              height: 200,
              width: 320,
              resizeMode: "stretch"
            }}
            source={{ uri: this.state.measurements.image_url }}
          />
          {this.state.loading && (
            <View style={styles.loading}>
              <ActivityIndicator size="large" />
            </View>
          )}
          <Button block info onPress={this.pickImage}>
            <Text> Upload Image and Submit</Text>
          </Button>
        </Body>
      </CardItem>
    );
  }
}

export default MeasurementsForPorJ;

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});
