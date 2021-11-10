import {MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY} from 'dotenv';
import axios from 'axios';
import md5 from 'md5';

import Character from '../types/character';

export default class MarvelApi {
  private static _client = axios.create({
    baseURL: 'http://gateway.marvel.com/v1/public',
  });

  private static _offset = 0;

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

  static async getHeroes(): Promise<Character[]> {
    const url = this._buildUrl('characters');
    const result = await this._client.get(
      `${url}&limit=20&offset=${this._offset}`,
    );

    if (result.status == 200) {
      const data = result.data.data;
      this._offset += data.count;
      return (data.results as any[]).map(item => Character.fromJson(item));
    }
    return [];
  }
}
