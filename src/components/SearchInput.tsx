import {placeholder} from '@babel/types';
import React, {useState} from 'react';
import styled from 'styled-components/native';

type Props = {
  placeholder?: string;
  onChange?: (text: string) => void;
};

const SearchInput: React.FC<Props> = props => {
  return (
    <Input placeholder={props.placeholder} onChangeText={props.onChange} />
  );
};

const Input = styled.TextInput`
  height: 45px;
  font-size: 16px;
  background-color: lightgray;
  border-radius: 16px;
  margin: 12px;
  padding: 10px;
`;

export default SearchInput;
