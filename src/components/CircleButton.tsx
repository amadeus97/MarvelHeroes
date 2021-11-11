import React from 'react';
import {ColorValue} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  iconName?: string;
  iconColor?: ColorValue;
  color?: ColorValue;
  isLarge?: boolean;
  onPress?: () => void;
};

const CircleButton: React.FC<Props> = props => {
  const size = props.isLarge ? 60 : 40;

  return (
    <ButtonContainer
      style={{
        backgroundColor: props.color || 'lightgray',
        height: size,
        width: size,
      }}
      onPress={props.onPress}>
      <Icon
        name={props.iconName || 'bookmark'}
        color={props.iconColor || '#64676D'}
        size={24}
      />
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding: 2px;
  background-color: lightgray;
  border-radius: 60px;
  align-items: center;
  justify-content: center;
`;

export default CircleButton;
