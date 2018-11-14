import { LastfmService } from './../services/lastfm.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  mbid: string;
  albums = [];
  showAlbums = null;
  page = 1;
  totalPages: number;
  scrollSum = 0;
  inputValue = '';

  constructor(private lastfmService: LastfmService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.mbid = this.route.snapshot.paramMap.get('mbid');
    this.lastfmService.getAlbums(this.mbid, this.page).subscribe(response => {
      this.totalPages = response.topalbums['@attr'].totalPages;
      this.showAlbums = [];
      this.albums.push(...this.checkAlbums(response.topalbums.album));
      this.addNewAlbums();
    });
  }

  getAlbums() {
    this.lastfmService.getAlbums(this.mbid, this.page).subscribe(response => {
      this.albums.push(...this.checkAlbums(response.topalbums.album));
    });
  }

  addNewAlbums() {
    this.showAlbums.push(...this.albums.slice(this.scrollSum * 10, this.scrollSum * 10 + 10));
    this.getTracks();
  }

  getTracks() {
    for (let i = this.scrollSum * 10; i < this.showAlbums.length; i++) {
      this.lastfmService.getAlbumInfo(
        this.showAlbums[i].artist.name.replace(/\s+/g, '+'),
        this.showAlbums[i].name.replace(/\s+/g, '+'))
          .subscribe((response) => {
            console.log(response);
            this.showAlbums[i].tracks = response.album.tracks.track;
          });
    }
  }

  checkAlbums(newAlbums: Array<any>) {
    for (let i = newAlbums.length - 1; i >= 0; i--) {
      if (newAlbums[i].name === '(null)' || newAlbums[i].name === '(no title)') {
        newAlbums.splice(i, 1);
      }
    }
    return newAlbums;
  }

  onScroll() {
    this.scrollSum++;
    if (this.page === this.totalPages) {
      return;
    }
    if ((this.scrollSum + 1) % 5 === 0) {
      this.page++;
      this.getAlbums();
    }
    this.addNewAlbums();
  }
}
