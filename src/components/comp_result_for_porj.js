import React, { Component } from "react";

import {
  CardItem,
  Body,
  Item,
  Label,
  Input,
  Button,
  Text,
  Card,
  Icon,
  Container
} from "native-base";
import {
  Image,
  Platform,
  StyleSheet,
  View,
  ActivityIndicator
} from "react-native";

import { ImagePicker } from "expo";
// import firebase
import db from "firebase";

class ResultForPorJ extends Component {
  constructor(props) {
    super(props);
    // alert('in Result for porj ' + JSON.stringify(this.props.uniqueKey))
    this.state = {
      measurements: this.props.measurements,
      clothType: this.props.clothType,
      uniqueKey: this.props.uniqueKey,
      orderID: this.props.orderID,
      loading: false,
      image_url:
        "http://vignette1.wikia.nocookie.net/ofibty/images/5/56/Insert-Photo-Here.jpg/revision/latest?cb=20130607022022",
      result: null
    };
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true
    });

    this.setState({
      result: result
    });
  };

  savetoDB = async () => {
    console.log(this.state.uniqueKey);
    console.log("image selected");
    let uniqueKey = this.state.uniqueKey;

    this.setState({
      loading: true
    });

    if (this.state.result) {
      if (this.state.result.cancelled) {
        this.setState({
          loading: false
        });
      }
      if (!this.state.result.cancelled) {
        this.setState({ image: this.state.result.uri });

        let base64Img = `data:image/jpg;base64,${this.state.result.base64}`;
        let apiUrl = "https://api.cloudinary.com/v1_1/dixwiepue/image/upload";

        let data = {
          file: base64Img,
          upload_preset: "xvv0gosj"
        };

        console.log("image selected another");

        fetch(apiUrl, {
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json"
          },
          method: "POST"
        })
          .then(responsejson => {
            console.log("new image selected");
            let data = responsejson._bodyText;
            if (responsejson.ok) {
              responsejson.json().then(json => {
                console.log("connection success");
                let dbCon = db
                  .database()
                  .ref("/orders/" + this.state.orderID + "/" + uniqueKey);

                let obj = {};
                obj["measurements"] = this.state.measurements;
                obj["measurements"][this.state.clothType]["image_url"] =
                  json.url;

                console.log("before uploading");
                dbCon.update(obj);
                alert("Successfully uploading the data to the server");
                console.log("before successfll");

                this.setState({
                  loading: false
                });
              });
            }
          })
          .catch(err => console.log(err));
      }
    } else {
      let dbCon = db
        .database()
        .ref("/orders/" + this.state.orderID + "/" + uniqueKey);

      let obj = {};
      obj["measurements"] = this.state.measurements;
      // obj["measurements"][this.state.clothType]["image_url"] = json.url;

      console.log("before uploading");
      dbCon.update(obj);
      alert("Successfully uploading the data to the server");
      console.log("before successfll");

      this.setState({
        loading: false
      });
    }
  };

  setMesurements(key, value) {
    this.state.measurements[this.state.clothType][key] = value;
    let temp = this.state.measurements;
    this.setState({
      measurements: temp
    });
  }

  render() {
    return (
      <Card>
        <CardItem>
          <Icon name="binoculars" style={{ color: "#2980b9" }} />

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
                value={`${
                  this.state.measurements[this.state.clothType].length
                }`}
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
                value={`${this.state.measurements[this.state.clothType].waist}`}
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
                value={`${this.state.measurements[this.state.clothType].seat}`}
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
                value={`${this.state.measurements[this.state.clothType].fork}`}
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
                value={`${this.state.measurements[this.state.clothType].thigh}`}
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
                value={`${this.state.measurements[this.state.clothType].knee}`}
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
                value={`${
                  this.state.measurements[this.state.clothType].bottom
                }`}
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
                value={`${
                  this.state.measurements[this.state.clothType].backrise
                }`}
              />
            </Item>
            {this.state.measurements.pant.image_url ? (
              <Image
                style={{
                  height: 200,
                  width: 320,
                  resizeMode: "stretch"
                }}
                source={{ uri: this.state.measurements.pant.image_url }}
              />
            ) : (
              <Image
                style={{
                  height: 200,
                  width: 320,
                  resizeMode: "stretch"
                }}
                source={{ uri: this.state.measurements.jean.image_url }}
              />
            )}

            {this.state.loading && (
              <View style={styles.loading}>
                <ActivityIndicator size="large" />
              </View>
            )}

            <Button block primary onPress={this.pickImage}>
              <Text> Pick Image </Text>
            </Button>
            <Button block primary onPress={this.saveToDB}>
              <Text> Submit </Text>
            </Button>
          </Body>
        </CardItem>
      </Card>
    );
  }
}
export default ResultForPorJ;

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
