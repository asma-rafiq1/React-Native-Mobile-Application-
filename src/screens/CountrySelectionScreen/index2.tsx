import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';
import {Divider} from 'react-native-elements';

const LanguageChange = ({SelectedItem, setSelectedItem}) => {
  const route = useRoute();

  const title = route.params.title;

  const [id, setId] = React.useState(SelectedItem.selectedLang);

  return (
    <View style={styles.root}>
      <View style={styles.main}>
        <Text style={{...styles.mainItem, fontWeight: '900'}}>{title}</Text>
        <Text
          style={
            styles.mainItem
          }>{`${title} available in ${SelectedItem.name}`}</Text>

        <FlatList
          keyExtractor={i => i}
          showsVerticalScrollIndicator={false}
          data={SelectedItem.languages}
          renderItem={({item}) => (
            <>
              <Pressable style={styles.radioMain}>
                <Divider orientation="vertical" width={3} />
                <View style={styles.radioMain1}>
                  <View style={styles.radioMain11}>
                    <Text style={styles.flag}>{}</Text>
                    <View style={styles.counBlock}>
                      <Text>{item}</Text>
                    </View>
                  </View>
                  <View>
                    <RadioButton
                      value={item}
                      status={id === item ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setSelectedItem({...SelectedItem, selectedLang: item});
                        setId(item);
                      }}
                      color={'#0a216e'}
                      theme={{colors: {text: '#83848a'}}}
                    />
                  </View>
                </View>
              </Pressable>
            </>
          )}
        />
      </View>
    </View>
  );
};

export default LanguageChange;

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
