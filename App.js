import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  Alert,
} from 'react-native';

const BASE_URL = 'https://randomuser.me/api/?results=24';

export default function App() {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getApi = async () => {
    try {
      const res = await fetch(BASE_URL);
      const toJson = await res.json();
      setData(toJson.results);
      setIsLoaded(true);
    } catch (error) {
      setIsLoaded(false);
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  console.log('a', data);

  const itemFlatlist = ({item}) => (
    <View style={styles.parent}>
      <View style={styles.row}>
        <View>
          <Image style={styles.image} source={{uri: item.picture.thumbnail}} />
        </View>

        <View>
          <Text style={styles.name}>
            {`${item.name.title} ${item.name.first} ${item.name.last}`}
          </Text>

          <Text style={styles.userText}>{item.email}</Text>
          <Text
            style={
              styles.userText
            }>{`${item.location.street.number} ${item.location.street.name} ${item.location.city}`}</Text>
        </View>
      </View>
    </View>
  );
  return (
    <SafeAreaView>
      <View style={styles.navbar}>
        <Text style={styles.header}>User</Text>
      </View>

      <FlatList
        numColumns={2}
        data={data}
        renderItem={itemFlatlist}
        keyExtractor={item => item.email}
        style={styles.flat}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    maxWidth: 240,
    minWidth: 240,
    maxHeight: 150,
    backgroundColor: 'white',
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    borderRadius: 10,
    marginStart: 12,
    paddingVertical: 14,
    marginVertical: 8,
  },

  navbar: {
    backgroundColor: '#F1F1F1',
    padding: 10,
  },

  header: {
    fontSize: 24,
    marginStart: 6,
    fontWeight: 'bold',
    color: '#000',
  },

  flat: {
    marginBottom: 50,
  },

  parent: {
    flex: 1,
    flexDirection: 'row',
  },

  image: {
    marginStart: 80,
    width: 40,
    height: 40,
    borderRadius: 40,
  },

  userText: {
    fontSize: 13,
    textAlign: 'center',
  },

  name: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
