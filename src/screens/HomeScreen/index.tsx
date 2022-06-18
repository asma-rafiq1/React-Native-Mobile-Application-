import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import {Image} from 'react-native-elements';
import categories from '../../data/categories';
import '../../assets/images/amazonpay.jpg';
import Entypo from 'react-native-vector-icons/Entypo';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import img from '../../assets/images/img.png';
import imga from '../../assets/images/imga.png';
import three from '../../assets/images/three.png';
import four from '../../assets/images/four.png';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import {db} from '../../../firebase-config';
import productdetail from '../../data/productdetail';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const images = [
  'data:image/jpeg;base64,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',
  'https://img.freepik.com/free-photo/online-shopping-delivery-concept-product-package-boxes-cart-laptop_38716-162.jpg',
  'https://www.mobiledekho.com/wp-content/uploads/2018/01/952x501-3-5.jpg',
];

const offers = [
  {
    url: three,
  },
  {
    url: img,
  },
  {url: imga},{
    url:four
  }
];
const HomeScreen = ({}) => {
  const navigation = useNavigation();
  let [starterProducts, setstarterProducts] = useState();
  const [filteredP, setfilteredP] = useState();
  const [index, setIndex] = useState(0);
  const [reference, setReference] = useState({});

  const productList = async category => {
    try {
      // const product=await setDoc(doc(db,'Fashion','Fashion'),{productdetail});

      let product = await getDoc(doc(db, category, category));
      product = product.data();
      navigation.navigate('ProductsScreen', {category: product.productdetail});
    } catch (error) {
      console.log(error);
    }
  };

  const startingDeals = async () => {
    try {
      let products = await getDocs(query(collection(db, 'Fashion')));
      products.forEach((doc, i) => {
        setstarterProducts(doc.data());
        // doc.data() is never undefined for query doc snapshots
      });
    } catch (e) {
      console.log(e);
    }
  };

  let filteredPro;
  if (starterProducts) {
    filteredPro = starterProducts.productdetail.filter(i => {
      return Number(i.variety[0].price) < 100;
    });
  }

  React.useEffect(() => {
    startingDeals();
  }, []);

  const slides = inde => {
    setIndex(inde);
    reference.scrollToIndex({animated: true, index: index});
  };
  return (
    <View>
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View
          style={{
            height: 45,
            backgroundColor: '#77c9c8',
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Entypo name="location-pin" size={20} style={{marginLeft: 10}} />
          <Text style={{marginLeft: 10, color: '#000', alignItems: 'center'}}>
            Select delivery location
          </Text>
        </View>
        <View>
          <FlatList
            horizontal
            keyExtractor={item => item.nameCategory}
            data={categories}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <>
                <Pressable
                  style={{
                    backgroundColor: '#fff',
                    padding: 5,
                    marginVertical: 10,
                  }}
                  onPress={() => productList(item.nameCategory)}>
                  <Image
                    source={{uri: item.imageCategory}}
                    style={{width: 80, height: 70}}
                  />

                  <Text
                    style={{
                      color: '#000',
                      textAlign: 'center',
                      fontWeight: '600',
                    }}>
                    {item.nameCategory}
                  </Text>
                </Pressable>
              </>
            )}
          />
        </View>
        <View>
          <SliderBox
            dotStyle={{width: 0, height: 0, borderRadius: 0}}
            style={{height: 200, marginTop: 5, resizeMode: 'contain'}}
            autoplay={true}
            circeLoop={true}
            imageLoadingColor="#2196F3"
            images={images}
          />
        </View>
     
        <View style={{backgroundColor: '#ebe9e6'}}>
          <FlatList
            horizontal
            keyExtractor={(item, index) => index}
            data={offers}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <>
                <View
                  style={{
                    marginHorizontal: 6,
                    marginVertical: 6,
                    elevation: 20,
                  }}>
                  <Image
                    source={item.url}
                    style={{
                      width: 150,
                      height: 190,
                      resizeMode: 'cover',
                      borderRadius: 2,
                    }}
                  />
                </View>
              </>
            )}
          />
        </View>
        <View>
          <Image
            source={require('../../assets/images/amazonpay.jpg')}
            style={{width: '100%', height: 40, marginTop: 15}}
          />
        </View>
        <View>
          <View
            style={{
              backgroundColor: '#fff',
              marginVertical: 15,
              borderColor: '#ebe9e6',
              borderWidth: 1,
              marginHorizontal: 10,
              borderRadius: 6,
              padding: 10,
            }}>
            <View>
              <View style={{width: '100%'}}>
                <Text style={{color: '#000', padding: 10, fontSize: 19}}>
                  Below 100 OMR | Deals on fashion,beauty,kitchen & more
                </Text>
              </View>
              <FlatList
                snapToAlignment="center"
                snapToInterval={width}
                decelerationRate={'fast'}
                showsHorizontalScrollIndicator={false}
                ref={ref => setReference(ref)}
                horizontal
                data={filteredPro}
                renderItem={({item}) => (
                  <>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('ProductsScreen', {category: item})
                      }>
                      <Image
                        source={{uri: item.variety[0].images[0]}}
                        style={{
                          width: width,
                          height: 200,
                          resizeMode: 'contain',
                        }}
                      />
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 20,
                          marginLeft: 20,
                          marginVertical: 10,
                          fontWeight: '800',
                        }}>
                        OMR {item.variety[0].price}
                      </Text>
                    </Pressable>
                  </>
                )}
              />
            </View>
            <View>
              <ScrollView horizontal>
                {filteredPro &&
                  filteredPro.map((item, index) => (
                    <Pressable key={index} onPress={() => slides(index)}>
                      <Image
                        source={{uri: item.variety[0].images[0]}}
                        style={{
                          width: 100,
                          height: 100,
                          marginHorizontal: 5,
                          resizeMode: 'contain',
                        }}
                      />
                    </Pressable>
                  ))}
              </ScrollView>
            </View>
            <Text
              style={{
                marginVertical: 10,
                fontSize: 15,
                marginLeft: 10,
                color: '#000',
              }}>
              See all deals
            </Text>
          </View>
        </View>

        {/* <Pressable
          onPress={async () => {
            const q = query(collection(db, 'Fashion'), limit(1));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(doc => {
              // console.log(doc.productdetail)
              // doc.data() is never undefined for query doc snapshots
              // console.log(doc.id, " => ", doc.data());
              const productss = doc.data();
              const newp = productss.productdetail.filter(item => {
                return item.actualPrice >= 500;
              });
              navigation.navigate('ProductsScreen', {category: newp});
            });
          }}>
          <Text>Under $500</Text>
        </Pressable> */}
      </ScrollView>
      {/* <FlatList data={products} keyExtractor={(item)=>item.id} renderItem={({item})=><ProductItem item={item}/>}/> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
