import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class LastfmService {

  constructor(private http: Http) { }

  getArtists() {
    return this.http
      // tslint:disable-next-line:max-line-length
      .get('http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=rock&limit=10&api_key=ebfd69a256b9bb1359e2b0f1ae012e49&format=json')
        .pipe(map(response => response.json()));
  }

  getArtistInfo(mbid: string) {
    return this.http
      .get('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&mbid=' + mbid + '&api_key=ebfd69a256b9bb1359e2b0f1ae012e49&format=json')
        .pipe(map(response => response.json()));
  }

  getAlbums(mbid: string, page: number) {
    return this.http
      // tslint:disable-next-line:max-line-length
      .get('http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&mbid=' + mbid + '&api_key=ebfd69a256b9bb1359e2b0f1ae012e49&page=' + page + '&format=json')
        .pipe(map(response => response.json()));
  }

  getAlbumInfo(artist: string, album: string) {
    return this.http
      // tslint:disable-next-line:max-line-length
      .get('http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=ebfd69a256b9bb1359e2b0f1ae012e49&artist=' + artist + '&album=' + album + '&format=json')
        .pipe(map(response => response.json()));
  }

}
