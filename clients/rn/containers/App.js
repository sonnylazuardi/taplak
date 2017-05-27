import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback ,
  NativeModules,
  NativeEventEmitter,
  Image,
  AsyncStorage,
  ScrollView,
  Linking,
  Clipboard,
} from 'react-native';
import {connect} from 'react-redux';
import * as appActions from '../actions/AppActions';
import Currency from '../utils/Currency';
import Base64 from '../utils/Base64';

const FloatingAndroid = NativeModules.FloatingAndroid;

class App extends React.Component {
  subscription = null;
  subscription2 = null;
  state = {
    showBalloon: true,
    clipboardText: "laptop",
    price: 0,
  }
  componentDidMount() {
    const floating = new NativeEventEmitter(FloatingAndroid);
    this.subscription = floating
    .addListener('SHOW_BALLOON', (showBalloon) => {
      console.log(`TEST: SHOW_BALLOON ${showBalloon}`);
      this.setState({
        showBalloon,
      });
    });
    this.subscription2 = floating
      .addListener('CLIPBOARD_COPY', (text) =>{
        console.log(`TEST: COPY CLIPBOARD ${text}`);
        if (!Base64.ValidURL(text)) {
            this.setState({
                      clipboardText:text,
                    })
            this.props.dispatch(appActions.fetchProducts(text));
        }
      });
    this.props.dispatch(appActions.fetchProducts(this.state.clipboardText));
  }
  componentWillUnmount() {
    this.subscription.remove();
    this.subscription2.remove();
  }
  toggleShowBalloon = () => {
    const {showBalloon} = this.state;
    this.setState({
      showBalloon: !showBalloon,
    });
  }
  onOpenLink(url) {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }
  onSearch(keyword, price) {
    const url = `https://www.bukalapak.com/products?keywords=${keyword}%20tangan&search[price_min]=${price - 100000}&&search[price_max]=${price + 100000}`;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }
  onCopy(url) {
    Clipboard.setString(url);
  }
  onCart = () => {
    const url = `https://www.bukalapak.com/cart/carts`;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }
  onCheckout = () => {
    const url = `https://www.bukalapak.com/payment/purchases/new`;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }
  onAddToCart(product) {
    ths.props.dispatch(appActions.addToCart(product));
  }
  render() {
    const {showBalloon} = this.state;
    const {loggedIn, products, carts} = this.props.app;
    return (
      <View style={styles.container}>
        {showBalloon ?
          <View style={styles.balloon}>
            <Image style={styles.imageLogo} source={require('../assets/icon.png')} />
          </View>
          :
          <View style={styles.box}>
            <Text style={styles.title}>TAPLAK</Text>
            <View style={styles.slider}>
              <ScrollView horizontal={true}>
                {products.filter((product, i) => (i <= 10)).map((product, i) => {
                  return (
                    <View style={styles.card} key={i}>
                      <TouchableNativeFeedback onPress={this.onOpenLink.bind(this, product.url)}>
                        <View>
                          <Image source={{uri: product.images[0]}} style={styles.productImage}/>
                          <View style={styles.cardInfo}>
                            <Text style={styles.productName} numberOfLines={2} ellipsizeMode={'tail'}>{product.name}</Text>
                            <Text  style={styles.productPrice}>{Currency.formatMoney(product.price, 0, ',', '.')}</Text>
                          </View>
                        </View>
                      </TouchableNativeFeedback>
                      <View style={styles.actions}>
                        <View style={{flex: 1}}>
                          <TouchableNativeFeedback onPress={this.onCopy.bind(this, product.url)}>
                            <View style={[styles.iconButton, {borderLeftWidth: 0}]}>
                              <Image source={require('../assets/copy.png')} style={[styles.icon, {tintColor: '#999'}]} />
                            </View>
                          </TouchableNativeFeedback>
                        </View>
                        <View style={{flex: 1}}>
                          <TouchableNativeFeedback onPress={this.onAddToCart.bind(this, product)}>
                            <View style={styles.iconButton}>
                              <Image source={require('../assets/addtocart.png')} style={[styles.icon, {tintColor: '#999'}]} />
                            </View>
                          </TouchableNativeFeedback>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            <TouchableNativeFeedback onPress={this.onSearch.bind(this, this.state.clipboardText, this.state.price)}>
              <View style={[styles.row, {padding: 10}]}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={styles.searchText}>{this.state.clipboardText}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Text style={styles.priceText}>{Currency.formatMoney(this.state.price, 0, ',', '.')}</Text>
                </View>
              </View>
            </TouchableNativeFeedback>
            <View style={[styles.row, {padding: 10}]}>
              <View style={{flex: 1, flexDirection: 'row', paddingRight: 5}}>
                <TouchableNativeFeedback>
                  <TouchableNativeFeedback onPress={this.onCart}>
                    <View style={styles.buttonPrimary}>
                      <Image source={require('../assets/cart.png')} style={[styles.icon, {tintColor: '#b10045', marginLeft: 0}]} />
                      <Text style={styles.buttonPrimaryText}>Keranjang ({carts.length})</Text>
                    </View>
                  </TouchableNativeFeedback>
                </TouchableNativeFeedback>
              </View>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingLeft: 5}}>
                <TouchableNativeFeedback onPress={this.onCheckout}>
                  <View style={styles.button}>
                    <Image source={require('../assets/check.png')} style={[styles.icon, {tintColor: '#fff', marginLeft: 0}]} />
                    <Text style={styles.buttonText}>Checkout</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          </View>}
      </View>
    )
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  cardInfo: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 4,
    margin: 5,
    height: 160,
    width: 100,
    elevation: 2,
  },
  hello: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#000',
  },
  balloon: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  imageLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  box: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productImage: {
    width: 100,
    height: 80,
  },
  productName: {
    fontWeight: '500',
    color: '#000',
    fontSize: 10,
  },
  productPrice: {
    fontSize: 10,
    color: '#999',
  },
  slider: {
    height: 170,
  },
  title: {
    color: '#000',
    marginTop: 10,
    marginBottom: 5,
    fontWeight: '500',
    textAlign: 'center',
  },
  searchText: {
    color: '#000',
  },
  priceText: {
    color: '#999'
  },
  button: {
    backgroundColor: '#b10045',
    paddingHorizontal: 10,
    paddingVertical: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff',
  },
  buttonPrimary: {
    backgroundColor: '#fff',
    borderColor: '#b10045',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    flexDirection: 'row',
  },
  buttonPrimaryText: {
    color: '#b10045',
  },
  icon: {
    width: 16,
    height: 16,
    marginHorizontal: 8,
  },
  iconButton: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  actions: {
    flexDirection: 'row',
    height: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  }
});

export default connect(state => ({
  app: state.app,
}))(App);
