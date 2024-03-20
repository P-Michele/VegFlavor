import { TestBed } from '@angular/core/testing';

import { recipesLoader } from './recipes-loader.service';

describe('recipesLoader', () => {
  let service: recipesLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(recipesLoader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
