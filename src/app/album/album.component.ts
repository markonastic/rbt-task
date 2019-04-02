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
  showAlbums = [];
  page = 1;
  totalPages: number;
  scrollSum = 0;
  inputValue = '';
  artist: string;
  search = false;
  index = 0;

  constructor(private lastfmService: LastfmService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.mbid = this.route.snapshot.paramMap.get('mbid');
    this.artist = this.route.snapshot.paramMap.get('artist');
    this.getAlbums();
  }

  getAlbums() {
    this.lastfmService.getAlbums(this.mbid, this.page).subscribe(response => {
      this.albums.push(...response.topalbums.album);
      if (this.scrollSum === 0) {
        this.addNewAlbums();
      }
    });
  }

  addNewAlbums() {
    let j = 0;
    for (let i = this.index; i < this.albums.length; i++) {
      if (this.albums[i].name !== '(null)' || this.albums[i].name !== '(no title)') {
        this.showAlbums.push(this.albums[i]);
        j++;
      }
      if (j === 10) {
        this.index = i + 1;
        this.getTracks();
        return;
      }
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

  getSearchAlbums() {
    this.showAlbums = [];
    this.lastfmService.getSearchAlbums(this.inputValue).subscribe(response => {
      this.albums = response.results.albummatches.album;
      this.addSearchAlbums();
    });
  }

  addSearchAlbums() {
    let j = 0;
    for (let i = this.index; i < this.albums.length; i++) {
      if (this.albums[i].artist.toLowerCase().indexOf(this.artist.toLowerCase()) >= 0) {
        this.showAlbums.push(this.albums[i]);
        j++;
      }
      if (j === 10 || i + 1 === this.albums.length) {
        this.index = i + 1;
        this.getTracks();
        console.log(this.showAlbums);
        return;
      }
    }
  }

  getTracks() {
    for (let i = this.scrollSum * 10; i < this.showAlbums.length; i++) {
      this.lastfmService.getAlbumInfo(
        this.artist.replace(/\s+/g, '+'),
        this.showAlbums[i].name.replace(/\s+/g, '+'))
          .subscribe((response) => {
            if (response.album) {
              this.showAlbums[i].tracks = response.album.tracks.track;
            }
          });
    }
  }

  onScroll() {
    if (this.search) {
      this.addSearchAlbums();
    } else {
      this.scrollSum++;
      if ((this.scrollSum + 2) % 5 === 0) {
      this.page++;
      this.getAlbums();
      }
      this.addNewAlbums();
    }
  }

  searchToggle() {
    this.showAlbums = [];
    this.albums = [];
    this.index = 0;
    document.querySelector('.main-content').scrollTo(0, 0);
    if (this.inputValue === '') {
      this.scrollSum = 0;
      this.search = false;
      this.page = 1;
      this.getAlbums();
      return;
    }
    this.search = true;
    this.getSearchAlbums();
  }
}
