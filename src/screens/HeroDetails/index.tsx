import React from 'react';
import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import styled from 'styled-components/native';

import {RootNavigatorParamList} from '../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootNavigatorParamList, 'Details'>;

const HeroDetailsScreen: React.FC<Props> = props => {
  const hero = props.route.params.hero;

  return (
    <View>
      <HeroCoverImage source={{uri: hero.thumbnail.landscapeMedium}} />
      <Content>
        <Title>{hero.name}</Title>
        <Text>{hero.description || 'This character has no description'}</Text>
      </Content>
    </View>
  );
};

const HeroCoverImage = styled.Image`
  width: 100%;
  aspect-ratio: ${120 / 60};
`;

const Content = styled.View`
  padding-horizontal: 16px;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  margin-top: 4px;
  margin-bottom: 8px;
`;

export default HeroDetailsScreen;
