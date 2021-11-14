import {MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY} from 'dotenv';
import axios from 'axios';
import md5 from 'md5';

import Character from '../types/character';

type Total = number;
type Offset = number;
type HeoresResponse = [Character[], Total, Offset] | undefined;

export default class MarvelApi {
  private static _client = axios.create({
    baseURL: 'https://gateway.marvel.com/v1/public',
  });

  private static _getHash(): [number, string] {
    const timestamp = Date.now();
    const encodedString = md5(
      `${timestamp}${MARVEL_PRIVATE_KEY}${MARVEL_PUBLIC_KEY}`,
    );

    return [timestamp, encodedString];
  }

  private static _buildUrl(path: string) {
    const [ts, hash] = this._getHash();
    return `${path}?ts=${ts}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}`;
  }

  static async getHeroes(
    offset?: number,
    searchTerm?: string,
  ): Promise<HeoresResponse> {
    let url = this._buildUrl('characters');
    if (searchTerm) {
      url += `&nameStartsWith=${searchTerm}`;
    }
    const result = await this._client.get(
      `${url}&limit=20&offset=${offset || 0}`,
    );

    if (result.status == 200) {
      const data = result.data.data;
      const heroes = (data.results as any[]).map(item =>
        Character.fromJson(item),
      );

      return [heroes, data.total, data.offset];
    }
  }
}
