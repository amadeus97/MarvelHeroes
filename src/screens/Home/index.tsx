import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  FlatList,
  View,
  ListRenderItemInfo,
  ActivityIndicator,
} from 'react-native';

import ListItem from '../../components/ListItem';

import MarvelApi from '../../services/marvelApi';
import Character from '../../types/character';
import {useAppSelector} from '../../hooks';
import {addFavorite, removeFavorite} from '../../store/actions';

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [data, setData] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadHeroes();
  }, []);

  const dispatch = useDispatch();
  const {favorites} = useAppSelector(state => state.heroesReducer);

  const addToFavoriteList = (hero: Character) => dispatch(addFavorite(hero));
  const removeFromFavoriteList = (hero: Character) =>
    dispatch(removeFavorite(hero));

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

  const navigateToHero = (hero: Character) =>
    navigation.navigate('Details', {hero});

  const isFavorite = (heroId: number) => {
    if (favorites.filter((item: Character) => item.id === heroId).length > 0) {
      return true;
    }

    return false;
  };

  const toggleFavorite = (hero: Character) => {
    if (isFavorite(hero.id)) {
      removeFromFavoriteList(hero);
    } else {
      addToFavoriteList(hero);
    }
  };

  function renderItem({item}: ListRenderItemInfo<Character>) {
    return (
      <ListItem
        hero={item}
        onPress={() => navigateToHero(item)}
        isFavorite={isFavorite(item.id)}
        onFavoritePress={toggleFavorite}
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
