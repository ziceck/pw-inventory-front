/* tslint:disable:no-string-literal */
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { PhotoComponent } from './photo.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FileService } from '@services/core';
import { MaterialModule } from '@material/material.module';
import { of } from 'rxjs';

describe('PhotoComponent', () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;
  let fileService: FileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoComponent],
      providers: [FileService, HttpClient],
      imports: [HttpClientModule, MaterialModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fileService = TestBed.inject(FileService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSelectFile', () => {
    const inputFile = document.getElementById('input-file');
    const spy = spyOn(inputFile, 'click');
    component.onClickPhoto();
    expect(spy).toHaveBeenCalled();
  });

  it('onSelectFile', () => {
    const event = {
      target: {
        files: [new File(['sfljd'], 'sldfj')]
      }
    };
    component.onSelectFile(event);
    expect(event.target.files.length > 0).toBeTrue();
  });

  it('getPhoto', () => {
    const spyFileService = spyOn(fileService, 'show').and.returnValue(of({}));
    component['getFoto'](2);
    expect(spyFileService).toHaveBeenCalled();
  });

});
