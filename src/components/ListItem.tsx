import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';

import CircleButton from './CircleButton';

import Character, {getPortraitSmall} from '../types/character';

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
          source={{uri: getPortraitSmall(hero.thumbnail)}}
        />
        <View>
          <Label>{hero.name}</Label>
          <CircleButton
            color={isFavorite ? '#438EFF' : 'lightgrey'}
            iconName={isFavorite ? 'bookmark-outline' : 'bookmark'}
            iconColor={isFavorite ? 'white' : '#64676D'}
            onPress={() => onFavoritePress && onFavoritePress(hero)}
          />
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

export default ListItem;
