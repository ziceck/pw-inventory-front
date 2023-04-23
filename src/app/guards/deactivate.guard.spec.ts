import { TestBed } from '@angular/core/testing';

import { CanComponentDeactivate, DeactivateGuard } from './deactivate.guard';

describe('DeactivateGuard', () => {
  let guard: DeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DeactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('canDeactivate', () => {
    const can = guard.canDeactivate(new MockDeactivate(true), null, null, null);
    expect(can).toBeTrue();
    /* can = guard.canDeactivate(new MockDeactivate(false), null, null, null);
    expect(can).toBeTruthy(); */
  });
});

class MockDeactivate implements CanComponentDeactivate {
  constructor(private can: boolean) {
  }

  canDeactivate(): boolean {
    return this.can;
  }
}
