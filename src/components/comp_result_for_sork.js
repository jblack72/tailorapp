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

class ResultForSork extends Component {
  constructor(props) {
    super(props);
    // alert('in Result for sork ' + JSON.stringify(this.props.uniqueKeys))
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
    // alert('imageURL ' + JSON.stringify(this.state.imageURL))
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

    if (result.cancelled) {
      this.setState({
        loading: false
      });
    }
    if (!result.cancelled) {
      this.setState({ image: result.uri });

      let base64Img = `data:image/jpg;base64,${result.base64}`;
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
              obj["measurements"][this.state.clothType]["image_url"] = json.url;

              console.log("before uploading ", obj);

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
  };

  setMesurements(key, value) {
    this.state.measurements[this.state.clothType][key] = value;
    let temp = this.state.measurements;
    this.setState({
      measurements: temp
    });
    // console.log("order ", this.state.order);
    // alert('measurements ' + JSON.stringify(this.state.measurements))
  }

  render() {
    return (
      <Card>
        <CardItem>
          <Icon name="ios-shirt-outline" style={{ color: "#45b39d" }} />

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
                value={`${
                  this.state.measurements[this.state.clothType].shoulder
                }`}
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
                onChangeText={sleeves =>
                  this.setMesurements("sleeves", sleeves)
                }
                value={`${
                  this.state.measurements[this.state.clothType].sleeves
                }`}
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
                onChangeText={stomach =>
                  this.setMesurements("stomach", stomach)
                }
                value={`${
                  this.state.measurements[this.state.clothType].stomach
                }`}
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
                value={`${
                  this.state.measurements[this.state.clothType].frontfix
                }`}
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
                value={`${
                  this.state.measurements[this.state.clothType].collom
                }`}
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
              {this.state.measurements.shirt.image_url ? (
                <Image
                  style={{
                    height: 200,
                    width: 320,
                    resizeMode: "stretch"
                  }}
                  source={{ uri: this.state.measurements.shirt.image_url }}
                />
              ) : (
                <Image
                  style={{
                    height: 200,
                    width: 320,
                    resizeMode: "stretch"
                  }}
                  source={{ uri: this.state.measurements.kurta.image_url }}
                />
              )}
            </CardItem>
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
export default ResultForSork;

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
