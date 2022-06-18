import { ScrollView, Text, View } from 'react-native'
import React from 'react'
import styles from './styles'
import product from '../../data/product'
import {Picker} from '@react-native-picker/picker'
import QuantitySelector from '../../components/QuantitySelector'
import Button from '../../components/Button'
import ImageCarousel from '../../components/ImageCarousel/index'


const ProductScreen = () => {
    const [selectedOption, setSelectedOption] = React.useState(product.options[0]);
    const [quantity, setQuantity] = React.useState(1)
  return (
    <ScrollView>
        {/* title */}
      <Text>{product.title}</Text>

      <ImageCarousel images={product.images}/>

      {/* option selector */}
      <Picker selectedValue={selectedOption} onValueChange={(selectedItem)=>setSelectedOption(selectedItem)}>
         {product.options.map((el,i)=>(
         <Picker.Item key={i} label={el} value={el}/>
         ))}
         
      </Picker>
       {/* price */}
      <Text style={styles.price}>from {`$${product.price}`}
          {product.oldPrice && (<Text style={styles.oldPrice}> {`$${product.oldPrice}`}</Text>)}
       </Text>
         {/* description */}
       <Text>{product.description}</Text>

       <QuantitySelector quantity={quantity} setQuantity={setQuantity}/>

       <Button text={'Add To Cart'} onPress={()=>{}}/>
       <Button text={'Buy Now'} onPress={()=>{}}/>
    </ScrollView>
  )
}

export default ProductScreen

