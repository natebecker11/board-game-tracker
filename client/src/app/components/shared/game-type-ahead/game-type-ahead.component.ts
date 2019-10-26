import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-type-ahead',
  templateUrl: './game-type-ahead.component.html',
  styleUrls: ['./game-type-ahead.component.css']
})
export class GameTypeAheadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if (this.OnGameChange = null) {
      this.OnGameChange = (game: any) => {
        // parse that
      }
    }
  }

  public SearchControl: FormControl = new FormControl();
  public GameSearchFunction: (searchText: string) => Observable<any>;
  public SearchText: string;

  @Input() OnGameChange: (game: any) => void = null;

  public DisplayGame(game: any): string {
    let displayVal = "";

    if (game) {
      displayVal = "Testo"
    }

    return displayVal;
  }

}
