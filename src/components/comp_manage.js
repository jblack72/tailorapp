import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Right,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Card,
  CardItem,
  Text
} from "native-base";
export default class InlineLabelExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: false
    };
  }

  enablefields() {
    this.setState({
      enabled: true
    });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Manage</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Card>
              <CardItem header bordered>
                <Text>Search By:-</Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Item inlineLabel>
                    <Label>Name</Label>
                    <Input />
                  </Item>
                  <Item inlineLabel last>
                    <Label>Order No</Label>
                    <Input />
                  </Item>
                  <Item inlineLabel last>
                    <Label>Contact No</Label>
                    <Input />
                  </Item>
                </Body>
              </CardItem>
              <Button block info>
                <Text> Search </Text>
              </Button>
              <CardItem header bordered>
                <Text>Customer Details:-</Text>
              </CardItem>

              <CardItem bordered>
                <Button block primary onPress={this.enablefields.bind(this)}>
                  <Text> Enable Editing </Text>
                </Button>
              </CardItem>

              {this.state.enabled ? (
                <EnabledMeasurements />
              ) : (
                <DisabledMeasurements />
              )}

              <Button block info>
                <Text> Save </Text>
              </Button>
            </Card>
          </Form>
        </Content>
      </Container>
    );
  }
}

class EnabledMeasurements extends Component {
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

class DisabledMeasurements extends Component {
  render() {
    return (
      <CardItem bordered>
        <Body>
          <Item inlineLabel>
            <Label>Length</Label>
            <Input disabled />
          </Item>
          <Item inlineLabel>
            <Label>Waist</Label>
            <Input disabled />
          </Item>
          <Item inlineLabel>
            <Label>Seat</Label>
            <Input disabled />
          </Item>
          <Item inlineLabel>
            <Label>Fork</Label>
            <Input disabled />
          </Item>
          <Item inlineLabel>
            <Label>Thigh</Label>
            <Input disabled />
          </Item>
          <Item inlineLabel>
            <Label>Knee</Label>
            <Input disabled />
          </Item>
          <Item inlineLabel>
            <Label>Bottom</Label>
            <Input disabled />
          </Item>
          <Item inlineLabel>
            <Label>Back Rise</Label>
            <Input disabled />
          </Item>
        </Body>
      </CardItem>
    );
  }
}
