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

// import for SorK and PorJ
import MeasurementsForSorK from "./comp_measurements_for_sork";
import MeasurementsForPorJ from "./comp_measurements_for_porj";

export default class StackedLabelExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "Shirt",
      loading: true,
      Sork: true,
      basicInfo: {},
      clothType: {},
      order: {}
    };
  }

  UNSAFE_componentWillMount() {
    this.setState({
      basicInfo: {
        name: "",
        mobile: "",
        gender: ""
      },
      clothType: {
        type: "shirt"
      },
      order: {
        orderID: 0
      }
    });
  }

  onValueChange(currentValue) {
    let temp = null;

    console.log("current Value is ", currentValue);

    if (currentValue == "shirt" || currentValue == "kurta") {
      temp = true;
    } else {
      temp = false;
    }

    this.setState({
      selected: currentValue,
      Sork: temp
    });

    this.setBasicInfo("clothType", currentValue);
  }

  setBasicInfo(key, value) {
    switch (key) {
      case "clothType":
        this.state.clothType.type = value;
        // console.log("in switch ", this.state.clothType);
        break;
      case "orderID":
        this.state.order.orderID = value;
        break;

      default:
        this.state.basicInfo[key] = value;
        break;
    }

    console.log(this.state.basicInfo);
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
                      returnKeyType={"next"}
                      onSubmitEditing={() => {
                        this.TextInput2._root.focus();
                      }}
                      onChangeText={name => this.setBasicInfo("name", name)}
                      // value={this.state.name}
                    />
                  </Item>
                  <Item inlineLabel last>
                    <Label>Mob</Label>
                    <Input
                      returnKeyType={"next"}
                      ref={input => {
                        this.TextInput2 = input;
                      }}
                      onSubmitEditing={() => {
                        this.TextInput3._root.focus();
                      }}
                      keyboardType="numeric"
                      onChangeText={mobile =>
                        this.setBasicInfo("mobile", mobile)
                      }
                    />
                  </Item>
                  <Item inlineLabel last>
                    <Label>Gender</Label>
                    <Input
                      returnKeyType={"next"}
                      ref={input => {
                        this.TextInput3 = input;
                      }}
                      onSubmitEditing={() => {
                        this.TextInput4._root.focus();
                      }}
                      onChangeText={gender =>
                        this.setBasicInfo("gender", gender)
                      }
                    />
                  </Item>
                  <Item inlineLabel last>
                    <Label>Order no</Label>
                    <Input
                      ref={input => {
                        this.TextInput4 = input;
                      }}
                      keyboardType="numeric"
                      onChangeText={orderID =>
                        this.setBasicInfo("orderID", orderID)
                      }
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
                  <Picker.Item label="Shirt" value="shirt" />
                  <Picker.Item label="Pant" value="pant" />
                  <Picker.Item label="Jean" value="jean" />
                  <Picker.Item label="Kurta" value="kurta" />
                </Picker>
              </CardItem>
              <CardItem header bordered>
                <Text>Measurements</Text>
              </CardItem>
              {this.state.Sork ? (
                <MeasurementsForSorK
                  basicInfo={this.state.basicInfo}
                  clothType={this.state.clothType}
                  order={this.state.order}
                />
              ) : (
                <MeasurementsForPorJ
                  basicInfo={this.state.basicInfo}
                  clothType={this.state.clothType}
                  order={this.state.order}
                />
              )}
            </Card>
          </Form>
        </Content>
      </Container>
    );
  }
}
