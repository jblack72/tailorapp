import React, { Component } from "react";

import { CardItem, Body, Item, Label, Input, Button, Text } from "native-base";
import { Image, Platform } from "react-native";
// import firebase
import db from "firebase";

import RNFetchBlob from "react-native-fetch-blob";

// var ImagePicker = require("react-native-image-picker");
import ImagePicker from "react-native-image-picker";

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;

const fs = RNFetchBlob.fs;
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
// window.Blob = Blob;
// const contentsource = [
//   {
//     image: require("https://firebasestorage.googleapis.com/v0/b/tailorapp-fd888.appspot.com/o/images%2F1?alt=media&token=9557f62a-feac-4117-be2a-c107985cf806")
//   }
// ];
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
      order: this.props.order
    };
  }


  componentDidMount() {

  }

  setMesurements(key, value) {
    this.state.measurements[key] = value;
    console.log("order ", this.state.order);
  }

  saveToDB() {
    let orderID = this.state.order.orderID;

    let orderIDError = this.state.order.orderIDError;

    // alert("orderIDError is " + JSON.stringify(this.state.order));
    console.log("Order status ", this.state.order);

    if (orderIDError == true) {
      this.uploadImage(uri, orderID)
        .then(success => {
          alert('success ' + success)
          console.log("success  ", success);
          try {
            this.setState(
              {
                imageUrl: success
              },
              () => {
                let dbCon = db.database().ref("/orders/" + orderID);

                let obj = {};
                obj = this.state.basicInfo;
                obj["measurements"] = {};
                obj["measurements"][
                  this.state.clothType.type
                ] = this.state.measurements;
                obj["image_url"] = success;
                dbCon.set(obj);
                // console.log("obj info ", obj);
                alert("Successfully uploading the data to the server");
              }
            );
          } catch (error) {
            alert(
              "Check your internet connection or give me permission to internet access " +
              error
            );
          }
        })
        .catch(error => {
          alert(
            "Check your internet connection or give me permission to internet access " +
            JSON.stringify(error)
          );
        });
    } else {
      alert("Order ID has already been used!");
    }
  }
  pickImage() {
    // More info on all the options is below in the README...just some common use cases shown here
    var options = {
      title: "Pic image",

      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        uri = `file://${response.path}`;
        this.setState({
          imageUrl: uri
        });
      }
    });
  }

  uploadImage = (uri, imageName, mime = "image/jpg") => {
    console.log("upload image ");

    return new Promise((resolve, reject) => {
      const uploadUri =
        Platform.OS === "ios" ? uri.replace("file://", "") : uri;
      let uploadBlob = null;
      const imageRef = db
        .storage()
        .ref("/")
        .child(`${imageName}.jpg`);

      fs.readFile(uploadUri, "base64")
        .then(data => {
          return Blob.build(data, { type: `${mime};BASE64` });
        })
        .then(blob => {
          uploadBlob = blob;

          console.log("upload image upload ", uploadBlob);
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close();

          console.log("upload image download url ", uploadBlob.close());
          return imageRef.getDownloadURL();
        })
        .then(url => {
          resolve(url);
        })
        .catch(error => {
          reject(error);
        });
    });
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
          <Button block info onPress={this.pickImage.bind(this)}>
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
