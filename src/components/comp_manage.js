'use strict';
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
  Text,
  View,
  Picker
} from "native-base";

// import Expo from "expo";




import db from "firebase";

export default class InlineLabelExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "orderno",
      enabled: false,
      loading: true,
      measurements: [],
      searchstring: '89',
      basicInfo: {},
      clothType: {},
      orderID: []
    };
  }

  // async UNSAFE_componentWillMount() {
  //   await Expo.Font.loadAsync({
  //     Roboto: require("native-base/Fonts/Roboto.ttf"),
  //     Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  //     Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
  //   });
  //   this.setState({ loading: false });
  // }

  UNSAFE_componentWillMount() {

  }



  async _handlepress() {
    try {

      var recentPostsRef = await db.database().ref("/orders");
      var searchquery = this.state.searchstring;
      var result = [];
      var uniqueKeys = [];
      var orderID = [];
      var basicInfo = {};

      switch (this.state.selected) {
        case 'orderno':
          // alert('in order' + this.state.searchstring);
          recentPostsRef.child(searchquery).once("value", snapshot => {
            const results = snapshot.val();
            // alert('in order' + JSON.stringify(results));

            if (results && results != null) {
              // console.log('snapshot ', results);
              for (let firstKey in results) {
                if (firstKey != 'name' && firstKey != 'gender' && firstKey != 'mobile') {
                  result.push(results[firstKey]['measurements']);
                  uniqueKeys.push(firstKey);
                  orderID.push(searchquery);
                }
              }
              // alert('result ' + JSON.stringify(result));
              // console.log('result ', result);


              this.setState({
                measurements: result,
                orderID: orderID,
                basicInfo: {
                  name: results.name,
                  gender: results.gender,
                  mobile: results.mobile
                }

              })


              this.props.navigation.push("Result", {
                measurements: this.state.measurements,
                basicInfo: this.state.basicInfo,
                uniqueKeys: uniqueKeys,
                orderID: this.state.orderID
              });


            }
            else
              alert('no record found. plz try again or add new record');

          });
          break;

        case 'name':

          recentPostsRef
            .orderByChild("name")
            .equalTo(searchquery)
            .once("value", snapshot => {
              // alert('snapshot ' + JSON.stringify(snapshot.val()))
              // console.log('snapshot ', snapshot.val());
              const results = snapshot.val();


              if (results && results != null) {
                snapshot.forEach(function (val) {
                  let measurement = val.val();
                  for (let firstKey in measurement) {
                    if (firstKey != 'name' && firstKey != 'gender' && firstKey != 'mobile') {
                      result.push(measurement[firstKey]['measurements'])
                      orderID.push(val.key);
                      uniqueKeys.push(firstKey);

                    }
                  }
                });
                basicInfo['name'] = snapshot.val()[orderID[0]]['name'];
                basicInfo['gender'] = snapshot.val()[orderID[0]]['gender'];
                basicInfo['mobile'] = snapshot.val()[orderID[0]]['mobile'];

                this.setState({
                  basicInfo: basicInfo,
                  measurements: result,
                  orderID: orderID,
                })
                // alert('basic Info' + JSON.stringify(this.state.basicInfo))
                // alert('measurements ' + JSON.stringify(this.state.measurements))


                this.props.navigation.push("Result",
                  {
                    measurements: this.state.measurements,
                    basicInfo: this.state.basicInfo,
                    uniqueKeys: uniqueKeys,
                    orderID: this.state.orderID,
                  });
              }
              else
                alert('no record found. plz try again or add new record');

            });

          break;
        case 'mobile':

          recentPostsRef
            .orderByChild("mobile")
            .equalTo(searchquery)
            .once("value", snapshot => {
              // alert('snapshot ' + JSON.stringify(snapshot.val()))
              const results = snapshot.val();
              if (results && results != null) {
                snapshot.forEach(function (val) {
                  let measurement = val.val();
                  for (let firstKey in measurement) {
                    if (firstKey != 'name' && firstKey != 'gender' && firstKey != 'mobile') {
                      result.push(measurement[firstKey]['measurements'])
                      orderID.push(val.key);
                      uniqueKeys.push(firstKey);
                    }
                  }

                });


                basicInfo['name'] = snapshot.val()[orderID[0]]['name'];
                basicInfo['gender'] = snapshot.val()[orderID[0]]['gender'];
                basicInfo['mobile'] = snapshot.val()[orderID[0]]['mobile'];

                this.setState({
                  basicInfo: basicInfo,
                  measurements: result,
                  orderID: orderID,
                })
                // alert('basic Info' + JSON.stringify(this.state.basicInfo))
                // alert('measurements ' + JSON.stringify(this.state.measurements))

                this.props.navigation.push("Result",
                  {
                    measurements: this.state.measurements,
                    basicInfo: this.state.basicInfo,
                    uniqueKeys: uniqueKeys,
                    orderID: this.state.orderID,
                  });
                // alert('measurements ' + JSON.stringify(mobileTotalresult))
              }
              else
                alert('no record found. plz try again or add new record');
            });

          break;
        default:
          alert('please enter a valid query.' + this.state.selected);
          break;
      }



    } catch (error) {
      console.log(error);
      alert('Error is ' + error);
    }
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  render() {
    // if (this.state.loading) {
    //   return <Expo.AppLoading />;
    // }
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
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={{ width: undefined }}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  <Picker.Item label="Name" value="name" />
                  <Picker.Item label="Order No" value="orderno" />
                  <Picker.Item label="Contact No" value="mobile" />
                </Picker>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Item inlineLabel>
                    <Label>Search</Label>
                    <Input
                      onChangeText={searchstring =>
                        this.setState({ searchstring: searchstring })
                      }
                      value={this.state.searchstring}
                    />
                  </Item>
                </Body>
              </CardItem>
              <Button block info onPress={this._handlepress.bind(this)}>
                <Text> Enter </Text>
              </Button>


            </Card>
          </Form>

        </Content>

      </Container>

    );
  }
}