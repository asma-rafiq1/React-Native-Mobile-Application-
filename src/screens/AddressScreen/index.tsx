import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker'
import countryList from 'country-list'
import InputElement from '../../components/InputElement'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'

const list=countryList.getData()

const AdddressScreen
 = () => {
         const [selectedCountry, setSelectedCCountry] = React.useState(list[0].code);
         const [inputDetails, setInputDetails] = React.useState({
            Full_Name:'',
               Phone_Number:null,
               Address:'',
               City:"",
               Zip_Code:null
         })

         const navigation=useNavigation()

  return (
  <>

   <View style={{backgroundColor: '#2ea3a1', width: '100%',height:50,justifyContent:'center'}}>
    <Text onPress={()=>navigation.navigate('Cart')} style={{marginLeft:20,color:'#000'}}>Cancel</Text>
   </View>
   <View style={{padding:20,paddingTop:20}}>
       
      <Text style={{color:'#000',fontSize:20}}>Add a new address</Text>
        <View style={{marginVertical:20}}>
          
         {/* validation */}
         <InputElement placeholder={'First and Last Name'}  text={'Full Name'} textChange={setInputDetails} inputDetails={inputDetails.Full_Name} />
         <InputElement placeholder={'+968'}   text={'Phone Number'} textChange={setInputDetails} inputDetails={inputDetails.Phone_Number} />
         <Text style={{color:'#000',fontSize:15,marginTop:10}}>Country</Text>
        <Picker  selectedValue={selectedCountry} onValueChange={setSelectedCCountry}>
            {list.map((country,index)=>(
                    <Picker.Item key={index} label={country.name} value={country.code}/>
            ))}
            
        </Picker>
         <InputElement placeholder={'Street Address or P.O. Box'}  text={'Address'} textChange={setInputDetails} inputDetails={inputDetails.Address} />
         <InputElement text={'City'} textChange={setInputDetails} inputDetails={inputDetails.City}  />
         <InputElement placeholder={'e.g DNS 4'}  text={'Zip Code'} textChange={setInputDetails} inputDetails={inputDetails.Zip_Code} />
         {/* 2 more checks */}
         <Button text={'Continue'} onPress={()=>{}}/>
        </View>
    </View>
 
   </>
    
  )
}

export default AdddressScreen


const styles = StyleSheet.create({})