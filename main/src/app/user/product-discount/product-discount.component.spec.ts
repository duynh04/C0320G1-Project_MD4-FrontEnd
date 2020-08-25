import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDiscountComponent } from './product-discount.component';

describe('ProductDiscountComponent', () => {
  let component: ProductDiscountComponent;
  let fixture: ComponentFixture<ProductDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
