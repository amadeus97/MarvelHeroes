import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  SafeAreaView,
  FlatList,
  Share,
  Alert,
  ListRenderItemInfo,
} from 'react-native';

import ListItem from '../../components/ListItem';

import Character from '../../types/character';
import {useAppSelector} from '../../hooks';
import {removeFavorite} from '../../store/actions';
import CircleButton from '../../components/CircleButton';

const FavoriteHeroes = () => {
  const dispatch = useDispatch();
  const {favorites} = useAppSelector(state => state.heroesReducer);

  const navigation = useNavigation<any>();

  const removeFromFavoriteList = (hero: Character) =>
    dispatch(removeFavorite(hero));

  const showErrorAlert = (message: string) => {
    Alert.alert('An error has ocurred!', message, [
      {
        text: 'Ok',
      },
    ]);
  };

  const handleShare = async () => {
    try {
      if ((favorites as any[]).length) {
        const mappedHeores = (favorites as Character[])
          .map(hero => hero.name)
          .reduce((acc, cur) => `${acc}\n${cur}`);

        await Share.share({
          message: `Hey, these are my favorite heroes:\n\n${mappedHeores}`,
        });
      } else {
        showErrorAlert("You don't have any heroes marked as favorite.");
      }
    } catch (error: any) {
      showErrorAlert('Try again later.');
    }
  };

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
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        style={{paddingBottom: 10}}
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item: Character) => item.id.toString()}
        ItemSeparatorComponent={renderSeparator}
      />
      <View style={{position: 'absolute', bottom: 16, right: 16}}>
        <CircleButton isLarge iconName="share-variant" onPress={handleShare} />
      </View>
    </SafeAreaView>
  );
};

export default FavoriteHeroes;
