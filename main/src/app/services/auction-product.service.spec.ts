import { TestBed } from '@angular/core/testing';

import { AuctionProductService } from './auction-product.service';

describe('AuctionProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuctionProductService = TestBed.get(AuctionProductService);
    expect(service).toBeTruthy();
  });
});
