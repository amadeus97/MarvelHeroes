import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {View, FlatList, ListRenderItemInfo} from 'react-native';

import ListItem from '../../components/ListItem';

import Character from '../../types/character';
import {useAppSelector} from '../../hooks';
import {removeFavorite} from '../../store/actions';

const FavoriteHeroes = () => {
  const dispatch = useDispatch();
  const {favorites} = useAppSelector(state => state.heroesReducer);

  const navigation = useNavigation<any>();

  const removeFromFavoriteList = (hero: Character) =>
    dispatch(removeFavorite(hero));

  const navigateToHero = (hero: Character) =>
    navigation.navigate('Details', {hero});

  function renderItem({item}: ListRenderItemInfo<Character>) {
    return (
      <ListItem
        hero={item}
        isFavorite={true}
        onPress={() => navigateToHero(item)}
        onFavoritePress={removeFromFavoriteList}
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

  return (
    <View style={{flex: 1}}>
      <FlatList
        style={{paddingBottom: 10}}
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item: Character) => item.id.toString()}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};

export default FavoriteHeroes;
