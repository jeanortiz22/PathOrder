import { TestBed } from '@angular/core/testing';

import { RegistrarAdminService } from './registrar-admin.service';

describe('RegistrarAdminService', () => {
  let service: RegistrarAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrarAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
