import React from 'react';
import {View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import styled from 'styled-components/native';

import CircleButton from '../../components/CircleButton';

import {useAppSelector} from '../../hooks';
import Character, {getLandscapeMedium} from '../../types/character';
import {RootNavigatorParamList} from '../../navigation/RootNavigator';
import {addFavorite, removeFavorite} from '../../store/actions';

type Props = NativeStackScreenProps<RootNavigatorParamList, 'Details'>;

const HeroDetailsScreen: React.FC<Props> = props => {
  const hero = props.route.params.hero;

  const dispatch = useDispatch();
  const {favorites} = useAppSelector(state => state.heroesReducer);

  const addToFavoriteList = (hero: Character) => dispatch(addFavorite(hero));
  const removeFromFavoriteList = (hero: Character) =>
    dispatch(removeFavorite(hero));

  const isFavorite =
    favorites.filter((item: Character) => item.id === hero.id).length > 0;

  const toggleFavorite = (hero: Character) => {
    if (isFavorite) {
      removeFromFavoriteList(hero);
    } else {
      addToFavoriteList(hero);
    }
  };

  return (
    <View>
      <HeroCoverImage source={{uri: getLandscapeMedium(hero.thumbnail)}} />

      <TitleContainer>
        <CircleButton
          color={isFavorite ? '#438EFF' : 'lightgrey'}
          iconName={isFavorite ? 'bookmark-outline' : 'bookmark'}
          iconColor={isFavorite ? 'white' : '#64676D'}
          onPress={() => toggleFavorite(hero)}
        />
        <Title>{hero.name}</Title>
      </TitleContainer>

      <Content>
        <Text>{hero.description || 'This character has no description'}</Text>
      </Content>
    </View>
  );
};

const HeroCoverImage = styled.Image`
  width: 100%;
  aspect-ratio: ${120 / 60};
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 16px;
`;

const Content = styled.View`
  margin-top: 8px;
  padding-horizontal: 16px;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  margin-left: 16px;
  margin-top: 4px;
  margin-bottom: 8px;
`;

export default HeroDetailsScreen;
