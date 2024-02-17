import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { preventUnsvaedChangesGuard } from './prevent-unsvaed-changes.guard';

describe('preventUnsvaedChangesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => preventUnsvaedChangesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
