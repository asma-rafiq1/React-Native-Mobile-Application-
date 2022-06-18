import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {Divider, Image, Rating} from 'react-native-elements';
import {SliderBox} from 'react-native-image-slider-box';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRoute} from '@react-navigation/native';
import cart from '../../context/index'

export default function ProductDetailScreen() {
  const [index, setIndex] = useState(0);
  const [seeMore, setseeMore] = useState(false)
  const cartFunc = useContext(cart)
  const route = useRoute();
  const item = route.params.item;
  const images = item.variety[index].images;
  const color = item.variety[index].colorName;
  let des = item.description;
  des.toString();
  return (
    <ScrollView style={{backgroundColor:'#fff'}}>
      <View style={{padding: 10, backgroundColor: '#fff'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 13, color: '#000'}}>
            Brand:{item.brandName}
          </Text>
          <Rating
            imageSize={14}
            ratingCount={5}
            readOnly
            startingValue={item.overallRating}
            ratingColor="#4494bd"
          />
        </View>
        <Text style={{fontSize: 13, color: '#000'}}>
          {item.productShortDescription}
        </Text>
      </View>

      <View
        style={{
          position: 'relative',
          marginVertical: 10,
          backgroundColor: '#fff',
        }}>
        <SliderBox
          sliderBoxHeight={300}
          resizeMethod={'resize'}
          resizeMode={'contain'}
          images={images}
        />
        <View style={{position: 'absolute', backgroundColor: 'black'}}>
          <View
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              width: 35,
              height: 35,
              backgroundColor: '#a61111',
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#fff', textAlign: 'center', fontSize: 10}}>
              {item.discountPercent}% off
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              top: 255,
              left: 10,
              width: 35,
              height: 35,
              backgroundColor: '#fff',
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome size={20} name="heart-o" color={'#a6a2a2'} />
          </View>
          <View
            style={{
              position: 'absolute',
              left: 340,
              top: 10,
              width: 35,
              height: 35,
              backgroundColor: '#fff',
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome name="share-alt" size={20} color={'#a6a2a2'} />
          </View>
        </View>
      </View>
      <View style={{width: '100%', backgroundColor: '#fff'}}>
        <Text style={{color: '#000', marginLeft: 20, marginTop: 10}}>
          Color Name: {color}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          {item.variety.map((image, index) => {
            return (
              
                <View key={image.images[0]} style={{backgroundColor: '#fff', padding: 10}}>
                  <Pressable onPress={() => setIndex(index)}>
                    <Image
                      style={{
                        width: 65,
                        height: 65,
                        resizeMode: 'cover',
                        borderWidth: 0.5,
                        borderColor: '#a6a2a2',
                        borderRadius: 50,

                        //pic not sahi on contain not fully shown not covering parent
                        //Description quotes and  format
                        //discount calculation
                        //see more
                        //top bar with different section
                        //last pic probelm undefined not an object
                        //options on card
                      }}
                      source={{uri:image.images[0]}}
                    />
                  </Pressable>
                </View>
              
            );
          })}
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#fff',
          borderWidth: 0.3,
          borderColor: '#a6a2a2',
          height: 30,
        }}></View>

      <View style={{backgroundColor: '#fff', padding: 10}}>
        <Text style={{fontSize: 35, color: '#000'}}>
          <Text style={{color: '#a61111', fontSize: 20}}>
            -{item.discountPercent}
          </Text>{' '}
          $399
        </Text>
        <Text style={{color: '#000'}}>
          M.R.P.:
          <Text style={{textDecorationLine: 'line-through', color: '#000'}}>
            ${item.actualPrice}.00
          </Text>
        </Text>
        <Text
          style={{
            textDecorationStyle: 'double',
            fontWeight: '800',
            color: '#000',
          }}>
          Inclusive of all taxes
        </Text>
      </View>

      <View
        style={{
          padding: 10,
          justifyContent: 'space-around',
          backgroundColor: '#fff',
          marginVertical: 7,
        }}>
        <Text style={{color: '#000'}}>
          Free delivery: Wednesday, April 27 Details
        </Text>
        <Text style={{color: '#0d1c0d', fontWeight: '800',color:'green'}}>
          {item.stockDetail}.
        </Text>
        {/* qty */}
        <LinearGradient
          colors={['#F3CF76', '#F0C457', '#EEB933']}
          style={styles.pressable}>
          <Pressable style={{paddingHorizontal: 20}}>
            <Text style={{fontSize: 15, color: '#000'}}>Buy Now</Text>
          </Pressable>
        </LinearGradient>
        <LinearGradient
          colors={['#F3CF76', '#F0C457', '#EEB933']}
          style={styles.pressable}>
          <Pressable style={{paddingHorizontal: 20}} onPress={()=>cartFunc.addToCart(item)}>
            <Text style={{fontSize: 15, color: '#000'}}>Add to Cart</Text>
          </Pressable>
        </LinearGradient>

        <Text style={{color: '#4494bd'}}>
          <FontAwesome name="lock" size={20} />
          Secure transaction
        </Text>
        <Text style={{color: '#000'}}>
          Sold by {item.ownerName} and Delivered by Amazon
        </Text>
        <Text style={{color: '#4494bd'}}>ADD TO WISH LIST</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexBasis: 70,
          }}>
          <MaterialCommunityIcons name="gift" size={30} color={'#4494bd'} />
          <Text style={{color: '#4494bd', fontSize: 10}}>
            30 days returns & exchange
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexBasis: 70,
          }}>
          <MaterialCommunityIcons
            name="truck-delivery"
            size={30}
            color={'#4494bd'}
          />
          <Text style={{color: '#4494bd', fontSize: 10}}>Amazon Delivered</Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexBasis: 70,
          }}>
          <MaterialCommunityIcons
            name="door-closed"
            size={30}
            color={'#4494bd'}
          />
          <Text style={{fontSize: 10, color: '#4494bd'}}>
            No-Contact Delivery
          </Text>
        </View>
      </View>

      <View style={{marginTop: 10, backgroundColor: '#fff'}}>
        <View
          style={{
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#a6a2a2',
            height: 30,
          }}></View>
        <View style={{padding: 10}}>
          <Text style={{fontSize: 17, fontWeight: '400'}}>Product Details</Text>
          <Text style={{fontSize: 12, fontWeight: '900', marginTop: 5}}>
            Care Instructions
          </Text>
          <Text>{item.careOfInstruction}</Text>
          <Text style={{fontSize: 12, fontWeight: '900', marginTop: 5}}>
            Country of Origin
          </Text>
          <Text>{item.countryOfOrigin}</Text>
        </View>
    {
      seeMore ? (
        <>
        <Divider width={0.5} color={'#a6a2a2'} style={{marginHorizontal: 16}} />
        <View style={{padding: 10}}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: '400',
              textTransform: 'capitalize',
            }}>
            ABOUT THIS ITEM
          </Text>
          <View>
            {item.aboutItem.map(item => {
              return (
                <View>
                  <Text style={{fontSize: 12, fontWeight: '500', marginTop: 5}}>
                    * {item}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={{padding: 10}}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: '400',
              textTransform: 'capitalize',
            }}>
            Description
          </Text>
          <Text></Text>
        </View>

        <Divider width={0.5} color={'#a6a2a2'} style={{marginHorizontal: 16}} />

        <View style={{padding: 10}}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: '400',
              textTransform: 'capitalize',
              marginVertical: 10,
            }}>
            Additional Information
          </Text>

          <View>
            <Text style={{fontSize: 12, fontWeight: '900', marginTop: 5}}>
              Manufacturer
            </Text>
            <Text>{item.addInformation.Manufacturer}</Text>
          </View>

          <View>
            <Text style={{fontSize: 12, fontWeight: '900', marginTop: 5}}>
              Packer
            </Text>
            <Text>{item.addInformation.Packer}</Text>
          </View>

          <View>
            <Text style={{fontSize: 12, fontWeight: '900', marginTop: 5}}>
              Item Weight
            </Text>
            <Text>{item.addInformation.itemWeight}</Text>
          </View>

          <View>
            <Text style={{fontSize: 12, fontWeight: '900', marginTop: 5}}>
              Item Dimension LxWxH
            </Text>
            <Text>{item.addInformation.itemDimensionLxWxH}</Text>
          </View>

          <View>
            <Text style={{fontSize: 12, fontWeight: '900', marginTop: 5}}>
              Net Quantity
            </Text>
            <Text>{item.addInformation.netQuantity}</Text>
          </View>
        </View>
        <Pressable onPress={()=>setseeMore(false)}><Text>See Less</Text></Pressable>
        
    
        </>
      ) : (<Pressable onPress={()=>setseeMore(true)}><Text>See More</Text></Pressable>)
    }
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: '#F0C457',
    height: 38,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#b5562d',
    borderWidth: 0.7,
    marginVertical: 8,
    borderBottomColor: '#000',
    marginHorizontal: 10,
  },
});
