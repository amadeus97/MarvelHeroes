import React from 'react';
import {ColorValue} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  iconName?: string;
  iconColor?: ColorValue;
  color?: ColorValue;
  onPress?: () => void;
};

const CircleButton: React.FC<Props> = props => {
  return (
    <ButtonContainer
      style={{backgroundColor: props.color || 'lightgray'}}
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
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
`;

export default CircleButton;
