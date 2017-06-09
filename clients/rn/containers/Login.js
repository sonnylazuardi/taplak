import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NativeModules,
  NativeEventEmitter,
  Image,
  AsyncStorage,
} from 'react-native';
import {connect} from 'react-redux';

import LoginView from '../components/Login';
import CreateProduct from './CreateProduct';
import * as appActions from '../actions/AppActions';

const FloatingAndroid = NativeModules.FloatingAndroid;
import Base64 from '../utils/Base64';

class Login extends React.Component {
  state = {
    imageUrl: null,
    isCreateProduct: false,
    imageBase64: '',
    isSeller: false,
  }
  subscription2 = null;
  subscription3 = null;
  componentDidMount() {
    const floating = new NativeEventEmitter(FloatingAndroid);
    this.props.dispatch(appActions.setLoading(false));
    this.subscription2 = floating
      .addListener('CLIPBOARD_COPY', (text) => {
        console.log(`TEST: COPY CLIPBOARD ${text}`);
        AsyncStorage.setItem('clipboard', JSON.stringify(text), () => {
          FloatingAndroid.show();
        });
      });
    this.subscription3 = floating
      .addListener('IMAGE_SEND', (imageBase64) => {
          console.log(`TEST: IMAGE SEND`);
          const {isSeller} = this.state;
          if (isSeller) {
            this.props.dispatch(appActions.createImage(imageBase64)).then(data => {
              FloatingAndroid.showMainApp();
              this.setState({
                isCreateProduct: true,
                imageBase64,
              });
            });
          } else {
            this.props.dispatch(appActions.clarifyAi(imageBase64)).then((data) => {
                let imageName = data.outputs[0].data.concepts[0].name;
                this.props.dispatch(appActions.translate(imageName, true)).then((data) => {
                  let clipboardText = data.text[0];
                  console.log('IMAGE TRANSLATE', clipboardText);
                  AsyncStorage.setItem('clipboard', JSON.stringify(clipboardText), () => {
                    FloatingAndroid.show();
                  });
                });
            });
          }
      });
      this.props.dispatch(appActions.fetchCategories())
  }
  componentWillUnmount() {
    this.subscription2.remove();
    this.subscription3.remove();
  }
  onLoggedIn = () => {
    this.props.dispatch(appActions.setLoggedIn(true));
  }
  onLoggedOut = () => {
    this.props.dispatch(appActions.setLoggedIn(false));
  }
  render() {
    const {imageUrl, isCreateProduct, isSeller, imageBase64} = this.state;
    const {loggedIn} = this.props.app;
    return (
      <View style={styles.container}>
        {imageUrl ?
          <Image source={{uri: `file://${imageUrl}`}} style={styles.image}/>
          : null}
        {loggedIn && isCreateProduct ?
          <CreateProduct
            imageBase64={imageBase64}
            onBack={() => {
              this.setState({
                isCreateProduct: false,
              });
            }}/>
          :
          <LoginView
            onLoggedIn={this.onLoggedIn}
            onLoggedOut={this.onLoggedOut}
            onCreateProduct={() => {
              this.setState({
                isCreateProduct: true,
              });
            }}
            isSeller={isSeller}
            setSeller={(isSeller) => {
              this.setState({
                isSeller,
              });
            }}
          />}
      </View>
    )
  }
  addProduct = ({categoryId, name, isNew, price, isNegotiable, weight, stock, description, images}) => {
    const product = {
        "product": {
                "category_id": categoryId,
                "name": name,
                "new": isNew,
                "price": price,
                "negotiable": isNegotiable,
                "weight": weight,
                "stock": stock,
                "description_bb": description,
              },
              "images": images,
    }
    this.props.dispatch(appActions.addProducts(product));
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 150,
    height: 150,
  }
});

export default connect(state => ({
  app: state.app,
}))(Login)
