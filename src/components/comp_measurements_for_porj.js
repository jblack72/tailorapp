import React, { Component } from "react";

import { CardItem, Body, Item, Label, Input } from "native-base";

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

export default MeasurementsForPorJ;
