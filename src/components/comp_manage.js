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
      selected: "name",
      enabled: false,
      loading: true,
      Sork: true,
      measurements: null,
      name: null,
      orderno: null,
      contactno: null,
      searchstring: 'q',
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

  _setstatenull() {
    this.setState({
      name: null,
      orderno: null,
      contactno: null
    });
  }

  async _handlepress() {
    try {

      var recentPostsRef = await db.database().ref("/orders");


      var searchquery = null;
      switch (this.state.selected) {


        case 'orderno':

          alert('in order' + this.state.searchstring);
          searchquery = this.state.searchstring;
          recentPostsRef.child(searchquery).once("value", snapshot => {

            // console.log(snapshot.val());
            let result = [];
            let orderImageURL = [];
            result.push(snapshot.val().measurements);
            orderImageURL.push(snapshot.val().image_url);
            const results = snapshot.val();
            // alert('result ' + JSON.stringify(result))
            if (result && result != null) {
              this.setState(
                { measurements: result },

              );
              this.setState(prevState => (
                { orderID: [...prevState.orderID, searchquery] }
              ))

              this.setState({
                basicInfo: {
                  name: results.name,
                  gender: results.gender,
                  mobile: results.mobile
                }
              })



              // alert('orderID ' + JSON.stringify(this.state.orderID))
              this._setstatenull();
              this.props.navigation.push("Result", {
                measurements: this.state.measurements,
                basicInfo: this.state.basicInfo,
                imageURL: orderImageURL,
                orderID: this.state.orderID
              });

            }


          });


          break;
        case 'name':


          searchquery = this.state.searchstring;

          let totalresult = [];

          let basicInfo = {};
          let nameImageURL = [];
          let nameOrderID = [];

          recentPostsRef
            .orderByChild("name")
            .equalTo(searchquery)
            .once("value", snapshot => {
              // alert('snapshot ' + JSON.stringify(snapshot.val()))
              snapshot.forEach(function (val) {
                // console.log(child.key);
                // result = val.key;
                totalresult.push(val.child('measurements').val());
                nameImageURL.push(val.child('image_url').val());
                nameOrderID.push(val.key);

              });
              snapshot.forEach(function (val) {
                // console.log(child.key);
                // result = val.key;
                // totalresult.push(val.child('measurements'));
                basicInfo['name'] = val.child('name').val();
                basicInfo['gender'] = val.child('gender').val();
                basicInfo['mobile'] = val.child('mobile').val();
                // break;

              });
              this.setState({
                basicInfo: basicInfo,
                measurements: totalresult,

              })
              // alert('basic Info' + JSON.stringify(this.state.basicInfo))
              // alert('measurements ' + JSON.stringify(this.state.measurements))

              this._setstatenull();
              this.props.navigation.push("Result",
                {
                  measurements: this.state.measurements,
                  basicInfo: this.state.basicInfo,
                  imageURL: nameImageURL,
                  orderID: nameOrderID
                });

              // alert('measurements ' + JSON.stringify(totalresult))

            });




          break;
        case 'mobile':




          searchquery = this.state.searchstring;

          let mobileTotalresult = [];

          let mobileBasicInfo = {};
          let mobileImageURL = [];
          let mobileOrderID = [];

          recentPostsRef
            .orderByChild("mobile")
            .equalTo(searchquery)
            .once("value", snapshot => {
              // alert('snapshot ' + JSON.stringify(snapshot.val()))
              snapshot.forEach(function (val) {
                // console.log(child.key);
                // result = val.key;
                mobileTotalresult.push(val.child('measurements').val());
                mobileImageURL.push(val.child('image_url').val());
                mobileOrderID.push(val.key);
              });
              snapshot.forEach(function (val) {
                // console.log(child.key);
                // result = val.key;
                // mobileTotalresult.push(val.child('measurements'));
                mobileBasicInfo['name'] = val.child('name').val();
                mobileBasicInfo['gender'] = val.child('gender').val();
                mobileBasicInfo['mobile'] = val.child('mobile').val();
                // break;

              });
              this.setState({
                basicInfo: mobileBasicInfo,
                measurements: mobileTotalresult
              })
              // alert('basic Info' + JSON.stringify(this.state.basicInfo))
              // alert('measurements ' + JSON.stringify(this.state.measurements))

              this._setstatenull();
              this.props.navigation.push("Result",
                {
                  measurements: this.state.measurements,
                  basicInfo: this.state.basicInfo,
                  imageURL: mobileImageURL,
                  orderID: mobileOrderID
                });

              // alert('measurements ' + JSON.stringify(mobileTotalresult))

            });


          // searchquery = this.state.searchstring;
          // var resultmob = null;

          // recentPostsRef
          //   .orderByChild("mobile")
          //   .limitToFirst(1)
          //   .equalTo(searchquery)
          //   .on("value", snapshot => {
          //     snapshot.forEach(function (child) {
          //       console.log(child.key);
          //       resultmob = child.key;
          //     });
          //   });
          // recentPostsRef.child(resultmob).on("value", snapshot => {
          //   this.setState({ measurements: snapshot.val() });
          //   console.log(snapshot.val());

          //   snapshot.forEach(function (data) {
          //     // console.log(data.key);
          //   });

          //   if (
          //     snapshot.child("measurements/shirt").exists() ||
          //     snapshot.child("measurements/kurta").exists()
          //   ) {
          //     this.setState({
          //       sork: true
          //     });
          //   } else {
          //     this.setState({
          //       sork: false
          //     });
          //   }
          //   this.setState({
          //     enabled: true
          //   });

          //   this._setstatenull();
          //   this.props.navigation.navigate("Results", this.state);
          // });



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