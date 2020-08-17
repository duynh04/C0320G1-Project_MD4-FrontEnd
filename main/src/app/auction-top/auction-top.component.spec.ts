import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionTopComponent } from './auction-top.component';

describe('AuctionTopComponent', () => {
  let component: AuctionTopComponent;
  let fixture: ComponentFixture<AuctionTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
