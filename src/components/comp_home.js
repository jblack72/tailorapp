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

import Expo from "expo";

export default class StackedLabelExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "key0",
      loading: true,
      Sork: true
    };
  }

  async UNSAFE_componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ loading: false });
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

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Header</Title>
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
                    <Input />
                  </Item>
                  <Item inlineLabel last>
                    <Label>Mob</Label>
                    <Input />
                  </Item>
                  <Item inlineLabel last>
                    <Label>Gender</Label>
                    <Input />
                  </Item>
                  <Item inlineLabel last>
                    <Label>Order no</Label>
                    <Input />
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
                <MeasurementsForSorK />
              ) : (
                <MeasurementsForPorJ />
              )}
            </Card>
            <Button block info>
              <Text> Upload Image </Text>
            </Button>
            <Button block primary>
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
