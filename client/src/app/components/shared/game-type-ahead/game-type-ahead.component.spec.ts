import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTypeAheadComponent } from './game-type-ahead.component';

describe('GameTypeAheadComponent', () => {
  let component: GameTypeAheadComponent;
  let fixture: ComponentFixture<GameTypeAheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTypeAheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTypeAheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
