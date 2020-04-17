import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { Plugins, Capacitor } from '@capacitor/core';


import { CameraService } from '../../services/camera.service';

import { Post } from '../../models/post.model';


@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.page.html',
  styleUrls: ['./post-modal.page.scss'],
})
export class PostModalPage implements OnInit {

  @ViewChild('filePicker', { static: false }) filePickerRef: ElementRef<HTMLInputElement>;

  postForm: FormGroup;
  photos: [] = [];
  isIncognitoFlag: true;
  postMaxLngth = 140;
  characterleft = this.postMaxLngth;
  userPost: Post;
  rowsInput = 1;
  useFilePicker = false;



  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    public cameraService: CameraService,
    public router: Router,
    private platform: Platform
  ) {
    this.postForm = this.formBuilder.group({
      userId: new FormControl(''),
      userImage: new FormControl(''),
      userProfile: new FormControl(''),
      incognito: new FormControl(true),
      scopeLimited: new FormControl(),
      post: new FormControl( '', [Validators.required, Validators.maxLength(this.postMaxLngth)] ),
      postImages: this.formBuilder.array([]),
      postedDate: new FormControl(''),
      isActive: new FormControl(''),
      status: new FormControl(''),
    });
   }

  ngOnInit() {

    if ( (this.platform.is('mobile') && !this.platform.is('hybrid')) || this.platform.is('desktop') ) {
      this.useFilePicker = true;
    }

    console.log('filepicker: ', this.useFilePicker);

    this.onFormChanges();

  }

  get postStringControl() {
    return this.postForm.get('post');
  }
  get postImageControl() {
    return this.postForm.get('postImages');
  }
  get isIncognitoControl() {
    return this.postForm.get('incognito');
  }

  onCharacterCount(msg: any) {
    const lengthVal = this.postMaxLngth >= msg.length ? true : false;
    this.characterleft = lengthVal ? (this.postMaxLngth) - (msg.length) : this.characterleft;
    this.userPost = !lengthVal ? msg.substr(0, msg.length - 1) : undefined;
  }

  private onFormChanges(): void {
    this.postForm.valueChanges.subscribe( () =>  {
      this.isIncognitoFlag = this.isIncognitoControl.value;
    });
  }

  onCloseModal() {
    this.modalController.dismiss();
  }

  onTakePhoto() {
    if (this.useFilePicker && !Capacitor.isPluginAvailable('Camera')) {
      this.filePickerRef.nativeElement.click();
      return;
    }

    this.cameraService.addNewPhoto();
  }

  onAddPhotoFromPc() {
    if (this.useFilePicker) {
      this.filePickerRef.nativeElement.click();
      return;
    }
  }

  onImgChosen(event: Event) {
    const pickedPhoto = (event.target as HTMLInputElement ).files[0];
    if (!pickedPhoto) {
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const photoUrl = fr.result.toString();
      this.cameraService.addPhotoArray(photoUrl);
    };
    fr.readAsDataURL(pickedPhoto);

  }

  private addImageControl(img: any) {
    return this.formBuilder.control({
      img: new FormControl(img)
    });
  }

  removePhotoCarrsl(i: number) {
    this.cameraService.removePhotoCarroussel(i);
  }

  onCreatePost() {

    for ( const photo of this.cameraService.picFiles ) {
      (this.postImageControl as FormArray).push(this.addImageControl(photo));
    }

    console.log(this.cameraService.picFiles);

    console.log(this.postForm.value);

    // add call to backend for saving Post

    this.router.navigate(['/', 'pages', 'tabs', 'experiences']);
    this.cameraService.picURL = [];
    this.postForm.reset();
    this.modalController.dismiss();
  }

}
