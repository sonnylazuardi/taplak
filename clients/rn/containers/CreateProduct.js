import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  NativeModules,
  NativeEventEmitter,
  ActivityIndicator,
  Image,
  AsyncStorage,
  ScrollView,
  TextInput,
  Picker,
} from 'react-native';
import {connect} from 'react-redux';

import * as appActions from '../actions/AppActions';

class CreateProduct extends React.Component {
  state = {
    name: '',
    price: '',
    stock: '',
    weight: '',
    description_bb: '',
    category_id: '',
    images: this.props.app.imageId,
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (this.props.app.imageId != nextProps.app.imageId) {
      this.setState({
        images: nextProps.app.imageId,
      });
    }
  }
  onBack = () => {
    this.props.onBack && this.props.onBack();
  }
  onCreateProduct = () => {
    const {category_id, name, price, weight, stock, description_bb, images} = this.state;
    const product = {
      "product": {
        "category_id": category_id,
        "name": name,
        "price": price,
        "weight": weight,
        "stock": stock,
        "description_bb": description_bb,
      },
      "images": images,
    }
    this.props.dispatch(appActions.addProducts(product)).then(result => {
      if (result) {
        this.props.onBack && this.props.onBack();
      }
    })
  }
  render() {
    const {imageUrl} = this.state;
    const {
      name,
      price,
      stock,
      weight,
      description_bb,
      category_id
    } = this.state;
    const {
      categories,
      loading,
    } = this.props.app;
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 15}}>
            <TouchableNativeFeedback onPress={this.onBack}>
              <Image source={require('../assets/arrowback.png')} style={{width: 28, height: 28}} tintColor={'#fff'}/>
            </TouchableNativeFeedback>
            <Text style={[styles.title, {marginLeft: 15}]}>Tambah Produk</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.body}>
          <TextInput
            value={name}
            ref="name"
            style={styles.input}
            placeholder={'Nama Produk'}
            returnKeyType={'next'}
            onSubmitEditing={() => {
              this.refs.price.focus();
            }}
            onChangeText={(name) => {
              this.setState({name})
            }}/>
          <TextInput
            value={price}
            ref="price"
            style={styles.input}
            placeholder={'Harga'}
            returnKeyType={'next'}
            onSubmitEditing={() => {
              this.refs.stock.focus();
            }}
            onChangeText={(price) => {
              this.setState({price})
            }}/>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              value={stock}
              ref="stock"
              style={styles.inputRow}
              placeholder={'Stok'}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                this.refs.weight.focus();
              }}
              onChangeText={(stock) => {
                this.setState({stock})
              }}/>
            <TextInput
              value={weight}
              ref="weight"
              style={styles.inputRow}
              placeholder={'Berat'}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                this.refs.description_bb.focus();
              }}
              onChangeText={(weight) => {
                this.setState({weight})
              }}/>
          </View>
          <TextInput
            value={description_bb}
            ref="description_bb"
            style={[styles.input, {height: 90, textAlignVertical: 'top'}]}
            placeholder={'Deskripsi Barang'}
            returnKeyType={'next'}
            multiline={true}
            onChangeText={(description_bb) => {
              this.setState({description_bb})
            }}/>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{marginRight: 15}}>Kategori</Text>
            <Picker
              style={{width: 200, height: 60}}
              selectedValue={category_id}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({category_id: itemValue})
              }}>
              {categories.map((category, i) => {
                return (
                  <Picker.Item key={i} label={category.name} value={category.id} />
                )
              })}
            </Picker>
          </View>
          <Image style={{width: 100, height: 100}} source={{uri: `data:image/png;base64,${this.props.imageBase64}`}} />
          <TouchableNativeFeedback onPress={loading ? () => {} : this.onCreateProduct}>
            <View style={styles.button}>
              {loading ?
                <ActivityIndicator />
                :
                <Text style={styles.buttonText}>
                  Buat Produk
                </Text>}
            </View>
          </TouchableNativeFeedback>
        </ScrollView>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#fff',
  },
  toolbar: {
    backgroundColor: '#cb0051',
  },
  body: {
    padding: 15,
  },
  actions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  input: {
    marginBottom: 15,
  },
  inputRow: {
    marginBottom: 15,
    flex: 1,
    marginRight: 10,
  },
  button: {
    padding: 15,
    backgroundColor: '#cb0051',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});

export default connect(state => ({
  app: state.app,
}))(CreateProduct)
