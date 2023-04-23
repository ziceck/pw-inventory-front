import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from '@services/core';
import { NotificationService } from '@services/notifications';

/**
 * This component is used to show a profile picture.
 * You can select a photo, also you can see the saved photo in back end.
 */
@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit, OnChanges {

  photo: any;
  @Input()
  photoId: number;
  @Output()
  sendPhoto = new EventEmitter<number>();

  constructor(
      private domSanitizer: DomSanitizer,
      private fileService: FileService,
      private notificationService: NotificationService
  ) {
    this.photo = {url: undefined, file: undefined};
  }

  ngOnInit(): void {
  }

  /**
   * Check changes in component, if photo ID has changed get the photo from back end.
   * @param changes All changes in component.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.photoId.currentValue) {
      this.getFoto(this.photoId);
    }
  }

  /**
   * This method in called when you click in the default photo and click programmatically
   * in input type file.
   */
  onClickPhoto(): void {
    document.getElementById('input-file').click();
  }

  /**
   * This method is called when you select a file from the file chooser.
   * The file selected is sent to the back end.
   * @param event Event from file chooser.
   */
  onSelectFile(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      if (file.size <= 5242880) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
          this.photo.url = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file));
          this.photo.file = file;
          this.sendFoto();
        };
      } else {
        this.notificationService.error('El tamaño del archivo debe ser menor a 5 MB');
      }
    }
  }

  /**
   * Get a photo from back end when this exists.
   * @param photoId ID photo you want to show.
   */
  private getFoto(photoId: number): void {
    if (photoId) {
      this.fileService.show(photoId).subscribe((response: any) => {
        this.download(response);
      });
    }
  }

  /**
   * Get photo from back to save it in a local url.
   * @param response Response from back end (binary file)
   */
  private download(response: any): void {
    const dataType = response.type;
    const binaryData = [];
    binaryData.push(response);
    const url = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
    this.photo.url = this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  /**
   * Send a request to save the selected file in back end.
   */
  private sendFoto(): void {
    const formData = new FormData();
    formData.append('file', this.photo.file);

    this.fileService.create(formData).subscribe(file => {
      this.sendPhoto.emit(file.id);
    });
  }

}
