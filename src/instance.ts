import {TinyHttpClient} from 'hanif-tiny-http';

import {baseURL} from './constants';
import {getAnime, getGenreList} from './scraper';
import {getOngoingList} from './scraper/listOngoing';

import type {Genre, Anime, OngoingAnime} from './types';
import {OtakUtil} from './util';

/**
 * @description - Otakudesu Instance, here you go.
 */
export class OtakudesuInstance {
  /**
     *
     * @param {String} baseUrl - Base URL For Otakudesu site
     */
  constructor(private baseUrl: string = baseURL) {
    if (!OtakUtil.validateURL(baseUrl)) {
      throw new TypeError('Invalid Base URL URL');
    }
  };

  public request = new TinyHttpClient({
    baseURL: this.baseUrl,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });

  /**
   * @description You can use this method for getting genre list.
   * @return {Genre[]}
   */
  public listGenre(): Promise<Genre[]> {
    return getGenreList(this.request);
  }

  /**
   * @description You can use this method for getting ongoing anime list.
   * @return {OngoingAnime[]}
   */
  public listOngoing(): Promise<OngoingAnime[]> {
    return getOngoingList(this.request);
  }

  /**
   * @description You can use this method for getting anime information.
   * @param {String} anime - Fill this parameter with anime name. (Eg. Boruto)
   * @return {Anime[]}
   */
  public getAnime(anime: string): Promise<Anime[]> {
    return getAnime(this.request, anime);
  }
}
