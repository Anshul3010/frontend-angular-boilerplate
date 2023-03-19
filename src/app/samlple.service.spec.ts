import { TestBed } from '@angular/core/testing';

import { SamlpleService } from './samlple.service';

describe('SamlpleService', () => {
  let service: SamlpleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SamlpleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
