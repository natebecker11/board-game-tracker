import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { GameServiceService } from 'src/app/api/game-service.service';

@Component({
  selector: 'app-game-type-ahead',
  templateUrl: './game-type-ahead.component.html',
  styleUrls: ['./game-type-ahead.component.css']
})
export class GameTypeAheadComponent implements OnInit {

  constructor(
    private _gameApi: GameServiceService
  ) { }

  ngOnInit() {
    this.OnGameChange = new EventEmitter<any>();
  }

  public SearchControl: FormControl = new FormControl();
  // public GameSearchFunction: (searchText: string) => Observable<any>;
  public SearchText: string;

  @Output() public OnGameChange: EventEmitter<any>;

  public OnClickGameChange(game: any): void {
    this.OnGameChange.emit({
      Data: game
    })
  };

  public GameSearchFunction(searchText: string): void {
    //todo: build this, configure httpclient
    console.log("sending")
    this._gameApi.ListByName(searchText).subscribe(response => {
      console.log("resp", response)
    })
  }

  public DisplayGame(game: any): string {
    let displayVal = "";

    if (game) {
      displayVal = "Testo"
    }

    return displayVal;
  }

}
