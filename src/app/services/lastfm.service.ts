import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class LastfmService {

  constructor(private http: Http) { }

  getArtists() {
    return this.http
      .get('http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=ebfd69a256b9bb1359e2b0f1ae012e49&limit=10&format=json')
        .pipe(map(response => response.json()));
  }

  getArtistInfo(mbid: string) {
    return this.http
      .get('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&mbid=' + mbid + '&api_key=ebfd69a256b9bb1359e2b0f1ae012e49&format=json')
        .pipe(map(response => response.json()));
  }
}
