import React, { Component } from "react";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Icon,
  Header,
  Left,
  Right,
  Body,
  Title,
  Button,
  Card,
  CardItem,
  Text
} from "native-base";

// import firebase
import db from "firebase";
// import Expo from "expo";

export default class StackedLabelExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "Shirt",
      loading: true,
      Sork: true,
      order: {}
    };
  }

  async UNSAFE_componentWillMount() {
    // await Expo.Font.loadAsync({
    //   Roboto: require("native-base/Fonts/Roboto.ttf"),
    //   Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    //   Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    // });
    // this.setState({ loading: false });
  }

  componentDidMount() {
    this.setState({
      order: {
        Shirt: {
          length: 0,
          shoulder: 0,
          sleeves: 0,
          chest: 0,
          stomach: 0,
          seat: 0,
          fontFix: 0,
          collom: 0,
          cuff: 0
        },
        name: "",
        mobile: "",
        gender: ""
      }
    });
  }

  onValueChange(previousValue, currentValue) {
    let temp = null;

    if (currentValue == "Shirt" || currentValue == "Kurta") {
      temp = true;
    } else {
      temp = false;
    }

    this.setState({
      selected: currentValue,
      Sork: temp
    });

    this.genericSetState(previousValue, currentValue);
  }

  saveToDB() {
    let dbCon = db.database().ref("/orders");
    console.log("DB Con is ", this.state.order);

    let obj = {};
    obj["1"] = this.state.order;
    dbCon.set(obj);
  }

  genericSetState(keyName1, value, keyName2 = "") {
    if (keyName2 == "") {
      if (
        keyName1 == "Shirt" ||
        keyName1 == "Pant" ||
        keyName1 == "Jean" ||
        keyName1 == "Kurta"
      ) {
        let obj = JSON.stringify(this.state.order);
        obj = obj.replace(keyName1, value);
        this.state.order = JSON.parse(obj);
      } else {
        this.state.order[keyName1] = value;
      }
    } else {
      this.state.order.clothtype[keyName2] = value;
    }
  }

  render() {
    if (this.state.loading) {
      // return <Expo.AppLoading />;
    }
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Home</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Manage")}
            >
              <Icon name="arrow-forward" />
            </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            <Card>
              <CardItem header bordered>
                <Text>Basic Info</Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Item inlineLabel>
                    <Label>Name</Label>
                    <Input
                      onChangeText={name => this.genericSetState("name", name)}
                      value={this.state.name}
                    />
                  </Item>
                  <Item inlineLabel last>
                    <Label>Mob</Label>
                    <Input
                      onChangeText={mobile =>
                        this.genericSetState("mobile", mobile)
                      }
                      value={this.state.mobile}
                    />
                  </Item>
                  <Item inlineLabel last>
                    <Label>Gender</Label>
                    <Input
                      onChangeText={gender =>
                        this.genericSetState("gender", gender)
                      }
                      value={this.state.gender}
                    />
                  </Item>
                  <Item inlineLabel last>
                    <Label>Order no</Label>
                    <Input editable={false} value={this.state.order.orderID} />
                  </Item>
                </Body>
              </CardItem>
              <CardItem header bordered>
                <Text>Select Clothing Type</Text>
              </CardItem>
              <CardItem bordered>
                <Picker
                  mode="dropdown"
                  iosHeader="Select your SIM"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={{ width: undefined }}
                  selectedValue={this.state.selected}
                  onValueChange={currentValue =>
                    this.onValueChange(this.state.selected, currentValue)
                  }
                >
                  <Picker.Item label="Shirt" value="Shirt" />
                  <Picker.Item label="Pant" value="Pant" />
                  <Picker.Item label="Jean" value="Jean" />
                  <Picker.Item label="Kurta" value="Kurta" />
                </Picker>
              </CardItem>
              <CardItem header bordered>
                <Text>Measurements</Text>
              </CardItem>
              {this.state.Sork ? (
                <MeasurementsForPorJ />
              ) : (
                <MeasurementsForSorK />
              )}
            </Card>
            <Button block info>
              <Text> Upload Image </Text>
            </Button>
            <Button block primary onPress={this.saveToDB.bind(this)}>
              <Text> Submit </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

class MeasurementsForSorK extends Component {
  render() {
    return (
      <CardItem bordered>
        <Body>
          <Item inlineLabel>
            <Label>Length</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label>Waist</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label>Seat</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label>Fork</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label>Thigh</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label>Knee</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label>Bottom</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label>Back Rise</Label>
            <Input />
          </Item>
        </Body>
      </CardItem>
    );
  }
}

class MeasurementsForPorJ extends Component {
  render() {
    return (
      <CardItem bordered>
        <Body>
          <Item inlineLabel>
            <Label>Length</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label>Shoulder</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label>Sleeves</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label>Chest</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label>Stomach</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label>Seat</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label>Frontfix</Label>
            <Input />
            <Input />
            <Input />
          </Item>
          <Item inlineLabel>
            <Label>Collom</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label>Cuff</Label>
            <Input />
          </Item>
        </Body>
      </CardItem>
    );
  }
}
