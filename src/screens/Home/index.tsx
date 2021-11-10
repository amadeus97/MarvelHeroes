import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  ListRenderItemInfo,
  ActivityIndicator,
} from 'react-native';

import ListItem from '../../components/ListItem';

import MarvelApi from '../../services/marvelApi';
import Character from '../../types/character';

const HomeScreen = () => {
  const [data, setData] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadHeroes();
  }, []);

  async function loadHeroes() {
    try {
      setIsLoading(true);
      const heroes = await MarvelApi.getHeroes();
      setData([...data, ...heroes]);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }

  function renderItem({item}: ListRenderItemInfo<Character>) {
    return (
      <ListItem
        id={item.id}
        name={item.name}
        thumbnail={item.thumbnail.portraitSmall}
      />
    );
  }

  function renderSeparator() {
    return (
      <View
        style={{
          borderTopWidth: 1,
          borderColor: 'lightgrey',
          marginHorizontal: 32,
        }}
      />
    );
  }

  function renderFooter() {
    if (!isLoading) return null;

    return (
      <View
        style={{
          justifyContent: 'center',
          marginTop: 30,
          marginBottom: 30,
        }}>
        <ActivityIndicator size="large" color="#438EFF" />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        style={{paddingBottom: 10}}
        data={data}
        ListFooterComponent={renderFooter}
        renderItem={renderItem}
        keyExtractor={(item: Character) => item.id.toString()}
        ItemSeparatorComponent={renderSeparator}
        onEndReached={() => {
          if (data.length != 1) {
            loadHeroes();
          }
        }}
        onEndReachedThreshold={0.3}
      />
    </View>
  );
};

export default HomeScreen;
