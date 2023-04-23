import {  TestBed } from '@angular/core/testing';
import { StorageService } from '@services/security/storage.service';

describe('StorageService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should create', () => {
    const storageService: StorageService = new StorageService();
    expect(storageService).toBeTruthy();
  });

});
