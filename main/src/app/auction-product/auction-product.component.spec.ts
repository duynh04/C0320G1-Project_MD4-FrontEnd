import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionProductComponent } from './auction-product.component';

describe('AuctionProductComponent', () => {
  let component: AuctionProductComponent;
  let fixture: ComponentFixture<AuctionProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
