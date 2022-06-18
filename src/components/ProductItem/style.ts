import { StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    outerContainer:{
        padding:10,
    },
    innerContainer:{
        borderColor:"#d1d1d1",
        borderRadius:3,
        borderWidth:1,
        backgroundColor:"#fff",
        flexDirection:'row'
    },
    image:{
        height:150,
        width:150,
        resizeMode:"contain",
        flex:2
    },
    iconContainer:{
        flexDirection:"row",
        marginVertical:6,
        alignItems:"center",
        justifyContent:"space-between",
        width:165,
    },
    rightContainer:{
        padding:15,
        flex:3
    },
    title:{
        fontSize:17
    },
    price:{
        fontWeight:"bold",
        fontSize:18
    },
    oldPrice:{
        fontWeight:"normal",
        textDecorationLine:"line-through",
        fontSize:12
    }


})

export default styles;