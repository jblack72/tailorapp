import React, { Component } from "react";
import { Constants } from "expo";
import {
  Container,
  Header,
  Button,
  Text,
  Body,
  Form,
  Item as FormItem,
  Input,
  Label,
  Title,
  Left
} from "native-base";

import { Image, View } from "react-native";

export default class FormLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "MaxTailor",
      textpass: "",
      actualpass: "admin123"
    };
  }

  processlogin() {
    if (this.state.textpass == this.state.actualpass) {
      this.props.navigation.navigate("Manage");
    }
  }

  render() {
    return (
      <Container style={{ paddingTop: Constants.statusBarHeight,backgroundColor:"#5dade2" }}>
        <Header>
          <Left />
          <Body>
            <Title>MaxTailor</Title>
          </Body>
        </Header>
        <Form
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <FormItem inlineLabel>
            <Label>Username</Label>
            <Input value={`${this.state.username}`} />
          </FormItem>
          <FormItem inlineLabel last>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              onChangeText={textpass => this.setState({ textpass })}
            />
          </FormItem>

          <Button
            full
            primary
            style={{ paddingBottom: 4 }}
            onPress={this.processlogin.bind(this)}
          >
            <Text> Login </Text>
          </Button>
        </Form>
      </Container>
    );
  }
}
