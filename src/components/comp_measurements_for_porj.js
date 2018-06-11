import React, { Component } from "react";

import { CardItem, Body, Item, Label, Input, Button, Text } from "native-base";
import { Image, Platform } from "react-native";

import db from "firebase";

import RNFetchBlob from "react-native-fetch-blob";

// var ImagePicker = require("react-native-image-picker");
import ImagePicker from "react-native-image-picker";

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;

const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

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
      imageUrl:
        "http://vignette1.wikia.nocookie.net/ofibty/images/5/56/Insert-Photo-Here.jpg/revision/latest?cb=20130607022022",
      basicInfo: this.props.basicInfo,
      clothType: this.props.clothType,
      order: this.props.order
    };
  }

  setMesurements(key, value) {
    this.state.measurements[key] = value;
    // console.log("basic info ", this.state.basicInfo);
    // console.log("measurements ", this.state.measurements);
    // console.log("order ", this.state.order);
  }

  saveToDB() {
    let orderID = this.state.order.orderID;

    this.uploadImage(uri, orderID)
      .then(success => {
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
        .ref("images/")
        .child(imageName);

      fs.readFile(uploadUri, "base64")
        .then(data => {
          return Blob.build(data, { type: `${mime};BASE64` });
        })
        .then(blob => {
          uploadBlob = blob;

          console.log("upload image upload ", uploadBlob);
          return imageRef.put(blob, { contentType: mime });
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

export default MeasurementsForPorJ;
