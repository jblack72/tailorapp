import React, { Component } from "react";

import { CardItem, Body, Item, Label, Input, Button, Text } from "native-base";
import { Image, Platform ,StyleSheet,View, ActivityIndicator} from "react-native";
// import firebase
import db from "firebase";

import { ImagePicker } from "expo";

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
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/tailorapp-fd888.appspot.com/o/29.jpg?alt=media&token=dc54b3ce-e05d-4340-b5aa-c1e8c8c9aa02",
      basicInfo: this.props.basicInfo,
      clothType: this.props.clothType,
      order: this.props.order,
      imageresult: null,
      loading:false
    };
  }

  setMesurements(key, value) {
    this.state.measurements[key] = value;
    console.log("order ", this.state.order);
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true
    });

    console.log("image selected");

    this.setState({
      loading: true
    })

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
              console.log(json.url);

              this.setState({
                imageUrl:json.url
              })

              let orderID = this.state.order.orderID;

              let dbCon = db.database().ref("/orders/" + orderID);

              let obj = {};
              obj = this.state.basicInfo;
              obj["measurements"] = {};
              obj["measurements"][
                this.state.clothType.type
              ] = this.state.measurements;
              obj["image_url"] = json.url;
              dbCon.set(obj);

              this.setState({
                loading: false
              })

            });
          }
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    console.log("image url ", this.state.imageUrl);

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
              value={`${this.state.measurements.shoulder}`}
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
              value={`${this.state.measurements.sleeves}`}
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
              value={`${this.state.measurements.chest}`}
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
              value={`${this.state.measurements.stomach}`}
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
              value={`${this.state.measurements.seat}`}
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
              value={`${this.state.measurements.frontfix}`}
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
              value={`${this.state.measurements.collom}`}
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
              value={`${this.state.measurements.cuff}`}
            />
          </Item>
          <Image
            style={{
              height: 200,
              width: 320,
              resizeMode: "stretch"
            }}
            source={{ uri: this.state.imageUrl }}
          />

          {this.state.loading &&
            <View style={styles.loading}>
              <ActivityIndicator size='large' />
            </View>
          }

          <Button block info onPress={this.pickImage}>
            <Text> Upload Image and Submit </Text>
          </Button>
        </Body>
      </CardItem>
    );
  }
}
export default MeasurementsForSorK;

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
