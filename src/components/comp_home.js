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
      selected: "key0",
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
        "cloth type": {
          measurements: {
            length: 0,
            shoulder: 0,
            sleeves: 0,
            chest: 0,
            stomach: 0,
            seat: 0,
            fontFix: 0,
            collom: 0,
            cuff: 0
          }
        },
        name: "",
        mobile: "",
        gender: ""
      }
    });
  }

  onValueChange(value) {
    let temp = null;

    if (value == "key0" || value == "key3") {
      temp = true;
    } else {
      temp = false;
    }

    this.setState({
      selected: value,
      Sork: temp
    });
  }

  saveToDB() {
    // this.setState(
    //   {
    //     order: {
    //       "cloth type": {
    //         measurements: {
    //           length: 0,
    //           shoulder: 0,
    //           sleeves: 0,
    //           chest: 0,
    //           stomach: 0,
    //           seat: 0,
    //           fontFix: 0,
    //           collom: 0,
    //           cuff: 0
    //         }
    //       },

    //       mobile: "",
    //       gender: ""
    //     }
    //   },
    // () => {
    let dbCon = db.database().ref("/order");
    console.log("DB Con is ", this.state.order);

    let obj = {};
    obj["1"] = this.state.order;
    dbCon.set(obj);
    // }
    // );
  }

  genericSetState(keyName, value) {
    console.log("keyName is ", keyName, "Value is ", value);

    this.state.order[keyName] = value;
    console.log("order value is ", this.state.order);
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
                    <Input
                      onChangeText={order =>
                        this.genericSetState("order", order)
                      }
                      value={this.state.order}
                    />
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
                  onValueChange={this.onValueChange.bind(this)}
                >
                  <Picker.Item label="Shirts" value="key0" />
                  <Picker.Item label="Pants" value="key1" />
                  <Picker.Item label="Jeans" value="key2" />
                  <Picker.Item label="kurta" value="key3" />
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
