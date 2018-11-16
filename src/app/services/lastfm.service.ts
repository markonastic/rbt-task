import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class LastfmService {

  url = 'http://ws.audioscrobbler.com/2.0/?';

  constructor(private http: Http) { }

  getArtists() {
    return this.http
      .get(this.url + 'method=tag.gettopartists&tag=rock&limit=10&api_key=ebfd69a256b9bb1359e2b0f1ae012e49&format=json')
        .pipe(map(response => response.json()));
  }

  getArtistInfo(mbid: string) {
    return this.http
      .get(this.url + 'method=artist.getinfo&mbid=' + mbid + '&api_key=ebfd69a256b9bb1359e2b0f1ae012e49&format=json')
        .pipe(map(response => response.json()));
  }

  getAlbums(mbid: string, page: number) {
    return this.http
      .get(this.url + 'method=artist.gettopalbums&mbid=' + mbid + '&api_key=ebfd69a256b9bb1359e2b0f1ae012e49&page=' + page + '&format=json')
        .pipe(map(response => response.json()));
  }

  getAlbumInfo(artist: string, album: string) {
    return this.http
      .get(this.url + 'method=album.getinfo&api_key=ebfd69a256b9bb1359e2b0f1ae012e49&artist=' + artist + '&album=' + album + '&format=json')
        .pipe(map(response => response.json()));
  }

  getSearchAlbums(album: string) {
    return this.http
      .get(this.url + 'method=album.search&api_key=ebfd69a256b9bb1359e2b0f1ae012e49&album=' + album + '&limit=1000&format=json')
        .pipe(map(response => response.json()));
  }
}
