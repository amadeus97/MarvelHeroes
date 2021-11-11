import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {debounce} from 'lodash';
import {
  View,
  FlatList,
  ListRenderItemInfo,
  ActivityIndicator,
} from 'react-native';

import ListItem from '../../components/ListItem';
import SearchInput from '../../components/SearchInput';

import MarvelApi from '../../services/marvelApi';
import Character from '../../types/character';
import {useAppSelector} from '../../hooks';
import {addFavorite, removeFavorite} from '../../store/actions';

const HomeScreen: React.FC<any> = props => {
  const isSearching = !!props.route?.params?.isSearching;

  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const [text, setText] = useState('');
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {favorites} = useAppSelector(state => state.heroesReducer);

  const delayedQuery = useCallback(debounce(loadHeroes, 500), [text]);

  async function loadHeroes() {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const [heroes, count] = await MarvelApi.getHeroes(offset, text);
      setData([...data, ...heroes]);
      setOffset(offset + count);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (!isSearching) {
      loadHeroes();
    }
  }, []);

  useEffect(() => {
    if (isSearching && text != '') {
      setData([]);
      setOffset(0);
      delayedQuery();
    }

    return delayedQuery.cancel;
  }, [text, delayedQuery]);

  const navigateToHero = (hero: Character) =>
    navigation.navigate('Details', {hero});

  const isFavorite = (heroId: number) => {
    if (favorites.filter((item: Character) => item.id === heroId).length > 0) {
      return true;
    }

    return false;
  };

  const addToFavoriteList = (hero: Character) => dispatch(addFavorite(hero));
  const removeFromFavoriteList = (hero: Character) =>
    dispatch(removeFavorite(hero));

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
      {isSearching && (
        <SearchInput placeholder="Search Hero" onChange={setText} />
      )}
      <View>
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
    </View>
  );
};

export default HomeScreen;
