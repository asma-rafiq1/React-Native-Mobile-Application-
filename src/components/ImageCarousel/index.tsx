import { FlatList, StyleSheet, Text, View,Image, useWindowDimensions } from 'react-native'
import React from 'react'

const ImageCarousel = ({images}:{images:string[]}) => {
    const [activeIndex, setActiveIndex] = React.useState(1)
    const widthWindow=useWindowDimensions().width;
    const onFlatlistUpdate = React.useCallback(({viewableItems}) => {
        if (viewableItems.length > 0) {
          setActiveIndex(viewableItems[0].index || 0);
        }
        console.log(viewableItems);
      }, []);
  return (
    <View>
     <FlatList showsHorizontalScrollIndicator={false}
     snapToAlignment="center"
     viewabilityConfig={{viewAreaCoveragePercentThreshold:50}}
     onViewableItemsChanged={onFlatlistUpdate}
     snapToInterval={widthWindow-20}
     decelerationRate={'fast'}
     horizontal data={images} renderItem={({item})=>(<Image style={[styles.imagewe,{width:widthWindow-40}]} source={{uri:item}}/>)}/>
    <View style={styles.dotView}>
        {images.map((i,index)=>(
            <View key={index} style={[styles.dot,{backgroundColor:index==activeIndex? '#82807f' : '#bab8b8'}]}></View>
        ))}
    </View>
    </View>

   
  )
}

export default ImageCarousel

const styles = StyleSheet.create({
    imagewe:{
        height:250,
        resizeMode:'contain',
        margin:10,
    },
    dotView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        backgroundColor:"red"
    },
    dot:{
        width:10,
        height:10,
        borderRadius:25,
        borderWidth:1,
        borderColor:"#d9d9d9",
        backgroundColor:"#bab8b8",
        marginLeft:4
    }
})