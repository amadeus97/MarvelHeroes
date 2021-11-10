import React from 'react';
import styled from 'styled-components/native';

export type ListItemProps = {
  id: number;
  name: string;
  thumbnail: string;
  onPress?: (id: number) => void;
};

const ListItem = React.memo<ListItemProps>(({id, name, thumbnail, onPress}) => {
  return (
    <Container onPress={() => onPress && onPress(id)}>
      <Avatar style={{height: 70, width: 70}} source={{uri: thumbnail}} />
      <Label>{name}</Label>
    </Container>
  );
});

const Container = styled.TouchableOpacity`
  flex-direction: row;
  margin-horizontal: 32px;
  align-items: center;
  margin-vertical: 16px;
`;

const Avatar = styled.Image`
  border-radius: 100px;
`;

const Label = styled.Text`
  margin-left: 8px;
  color: black;
  font-size: 16px;
  font-weight: bold;
`;

export default ListItem;
