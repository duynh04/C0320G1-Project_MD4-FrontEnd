import { TestBed } from '@angular/core/testing';

import { AuctionTopService } from './auction-top.service';

describe('AuctionTopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuctionTopService = TestBed.get(AuctionTopService);
    expect(service).toBeTruthy();
  });
});
