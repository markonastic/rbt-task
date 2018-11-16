import { LastfmService } from './../services/lastfm.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  artists = null;

  constructor(private lastfmService: LastfmService) { }

  ngOnInit() {
    this.lastfmService.getArtists().subscribe(response => {
      this.artists = response.topartists.artist;
      for (let i = 0; i < 10; i++) {
        this.lastfmService.getArtistInfo(this.artists[i].mbid).subscribe(response1 => {
          this.artists[i].summary = response1.artist.bio.summary.substring(0, 300);
        });
      }
    });
  }
}
