import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import {debounce} from 'lodash';
import {
  View,
  FlatList,
  ListRenderItemInfo,
  ActivityIndicator,
  Button,
  Alert,
} from 'react-native';

import ListItem from '../../components/ListItem';
import SearchInput from '../../components/SearchInput';

import MarvelApi from '../../services/marvelApi';
import Character from '../../types/character';
import {useAppSelector} from '../../hooks';
import {addFavorite, removeFavorite} from '../../store/actions';

const totalPerPage = 20;

const HomeScreen: React.FC<any> = props => {
  const isSearching = !!props.route?.params?.isSearching;

  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const [text, setText] = useState('');
  const [pagination, setPagination] = useState<[number, number]>([0, 0]);
  const [data, setData] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const {favorites} = useAppSelector(state => state.heroesReducer);

  const delayedQuery = useCallback(debounce(loadHeroes, 500), [text]);

  const showError = useCallback((message: string) => {
    setText('');
    setData([]);
    setIsLoading(false);
    setPagination([0, 0]);
    setHasError(true);
    Alert.alert('An error has ocurred!', message, [
      {
        text: 'Ok',
      },
    ]);
  }, []);

  async function loadHeroes(offset: number) {
    if (isLoading) return;
    setIsLoading(true);
    setHasError(false);
    setData([]);

    try {
      const response = await MarvelApi.getHeroes(offset, text);
      if (response) {
        const [heroes, total, newOffset] = response;
        setData([...heroes]);
        setPagination([total, newOffset]);
        setIsLoading(false);
      } else {
        showError('Try again later.');
      }
    } catch (e) {
      showError('Try again later.');
    }
  }

  useEffect(() => {
    if (!isSearching && !data.length) {
      loadHeroes(pagination[1]);
    }
  }, []);

  useEffect(() => {
    if (isSearching && text != '') {
      setData([]);
      setPagination([0, 0]);
      delayedQuery(0);
    }

    return delayedQuery.cancel;
  }, [text, delayedQuery]);

  const navigateToHero = useCallback(
    (hero: Character) => navigation.navigate('Details', {hero}),
    [],
  );

  const isFavorite = useCallback(
    (heroId: number) => {
      if (
        favorites.filter((item: Character) => item.id === heroId).length > 0
      ) {
        return true;
      }

      return false;
    },
    [favorites],
  );

  const addToFavoriteList = useCallback(
    (hero: Character) => dispatch(addFavorite(hero)),
    [],
  );
  const removeFromFavoriteList = useCallback(
    (hero: Character) => dispatch(removeFavorite(hero)),
    [],
  );

  const toggleFavorite = useCallback(
    (hero: Character) => {
      if (isFavorite(hero.id)) {
        removeFromFavoriteList(hero);
      } else {
        addToFavoriteList(hero);
      }
    },
    [isFavorite],
  );

  function renderItem({item}: ListRenderItemInfo<Character>) {
    return (
      <ListItem
        hero={item}
        onPress={() => navigateToHero(item)}
        isFavorite={isFavorite(item.id)}
        onFavoritePress={toggleFavorite}
      />
    );
  }

  const renderSeparator = useCallback(() => {
    return (
      <View
        style={{
          borderTopWidth: 1,
          borderColor: 'lightgrey',
          marginHorizontal: 32,
        }}
      />
    );
  }, []);

  const renderFooter = useCallback(() => {
    if (isLoading) {
      return (
        <View
          style={{
            justifyContent: 'center',
            marginTop: 30,
            marginBottom: 30,
          }}>
          <ActivityIndicator size="large" color="#438EFF" />
        </View>
      );
    }

    if (hasError) {
      return (
        <ButtonsContainer style={{justifyContent: 'center'}}>
          <Button onPress={() => loadHeroes(0)} title="Try Again" />
        </ButtonsContainer>
      );
    }

    const [total, offset] = pagination;

    const totalPages = Math.ceil(total / totalPerPage);
    const currentPage = Math.ceil((offset + data.length) / totalPerPage);

    return data.length ? (
      <ButtonsContainer>
        <Button
          disabled={offset <= 0}
          onPress={() => {
            loadHeroes(offset - totalPerPage);
          }}
          title="Previous"
        />
        <Button
          disabled={totalPages == currentPage}
          onPress={() => {
            loadHeroes(offset + totalPerPage);
          }}
          title="Next"
        />
      </ButtonsContainer>
    ) : null;
  }, [isLoading, pagination, hasError]);

  return (
    <View style={{flex: 1}}>
      {isSearching && (
        <SearchInput placeholder="Search Hero" onChange={setText} />
      )}
      <View style={{flex: 1}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item: Character) => item.id.toString()}
          ListFooterComponent={renderFooter}
          ItemSeparatorComponent={renderSeparator}
          style={{paddingBottom: 10}}
        />
      </View>
    </View>
  );
};

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 16px;
`;

export default HomeScreen;
