import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Character from '../types/character';

export type ListItemProps = {
  hero: Character;
  isFavorite: boolean;
  onPress?: (id: number) => void;
  onFavoritePress?: (hero: Character) => void;
};

const ListItem = React.memo<ListItemProps>(
  ({hero, onPress, isFavorite, onFavoritePress}) => {
    return (
      <Container onPress={() => onPress && onPress(hero.id)}>
        <Avatar
          style={{height: 70, width: 70}}
          source={{uri: hero.thumbnail.portraitSmall}}
        />
        <View>
          <Label>{hero.name}</Label>
          <ButtonContainer
            style={{backgroundColor: isFavorite ? '#438EFF' : 'lightgrey'}}
            onPress={() => onFavoritePress && onFavoritePress(hero)}>
            <Icon
              name={isFavorite ? 'bookmark-outline' : 'bookmark'}
              color={isFavorite ? 'white' : '#64676D'}
              size={24}
            />
          </ButtonContainer>
        </View>
      </Container>
    );
  },
);

const Container = styled.TouchableOpacity`
  flex-direction: row;
  margin-horizontal: 32px;
  align-items: center;
  margin-vertical: 16px;
`;

const Avatar = styled.Image`
  border-radius: 100px;
  margin-right: 8px;
`;

const Label = styled.Text`
  color: black;
  font-size: 16px;
  font-weight: bold;
`;

const ButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding: 2px;
  background-color: lightgray;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
`;

export default ListItem;
