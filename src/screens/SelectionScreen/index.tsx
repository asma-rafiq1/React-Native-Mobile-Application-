import {StyleSheet, Text, View, Pressable, FlatList} from 'react-native';
import React from 'react';
import {Divider} from 'react-native-elements';
import {RadioButton} from 'react-native-paper';
import {getEmojiFlag} from 'countries-list';
import {useRoute} from '@react-navigation/native';

const SelectionScreen = ({setSelectedItem, SelectedItem, CountriesInfo}) => {
  const route = useRoute();

  const title = route.params.title;

  const [id, setId] = React.useState(SelectedItem.code);

  return (
    <View style={styles.root}>
      <View style={styles.main}>
        <Text style={{...styles.mainItem, fontWeight: '900'}}>
          {route.params.title}
        </Text>
        <Text
          style={
            styles.mainItem
          }>{`${route.params.title} available in ${SelectedItem.name}`}</Text>

        <FlatList
          keyExtractor={i => i.code}
          showsVerticalScrollIndicator={false}
          data={CountriesInfo}
          renderItem={({item}) => (
            <View>
              <RadioSelect
                heading={title}
                setSelectedItem={setSelectedItem}
                setId={setId}
                id={id}
                item={item}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default SelectionScreen;

const RadioSelect = ({
  item,
  id,
  setId,
  setSelectedItem,
  heading,
}) => {
  const flag = getEmojiFlag(item.code);

  return (
    <Pressable style={styles.radioMain}>
      <Divider orientation="vertical" width={3} />
      <View style={styles.radioMain1}>
        <View style={styles.radioMain11}>
          <Text style={styles.flag}>{flag}</Text>
          <View style={styles.counBlock}>
            <Text>{item.name}</Text>
            <Text>{item.native}</Text>
          </View>
        </View>
        <View>
          <RadioButton
            value={item.name}
            status={id === item.code ? 'checked' : 'unchecked'}
            onPress={() => {
              setId(item.code);
              setSelectedItem(item);
            }}
            color={'#0a216e'}
            theme={{colors: {text: '#83848a'}}}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  main: {
    height: '100%',
  },
  mainItem: {
    marginVertical: 7,
    fontSize: 14,
  },
  radioMain: {},
  radioMain1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 15,
    alignItems: 'center',
  },
  radioMain11: {
    flexDirection: 'row',
    flex: 1,
  },
  counBlock: {
    justifyContent: 'space-around',
    height: 35,
    marginLeft: 10,
  },
  flag: {
    alignSelf: 'center',
  },
});
