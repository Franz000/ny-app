import { TestBed, async, inject } from '@angular/core/testing';

import { AutenticarGuard } from './autenticar.guard';

describe('AutenticarGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutenticarGuard]
    });
  });

  it('should ...', inject([AutenticarGuard], (guard: AutenticarGuard) => {
    expect(guard).toBeTruthy();
  }));
});
