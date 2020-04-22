import { Component, OnInit, NgZone, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { Plugins, Capacitor } from '@capacitor/core';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/services/user.service';
import { CameraService } from '../../services/camera.service';

import { Post } from '../../models/post.model';
import { User } from 'src/app/models/user.model';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.page.html',
  styleUrls: ['./post-modal.page.scss'],
})
export class PostModalPage implements OnInit, OnDestroy {

  @ViewChild('filePicker', { static: false }) filePickerRef: ElementRef<HTMLInputElement>;

  postForm: FormGroup;
  user: User;
  userPost: Post;
  userSubs: Subscription;
  tokenSubs: Subscription;
  isIncognitoFlag: true;
  token: string;
  postMaxLngth = 140;
  characterleft = this.postMaxLngth;
  useFilePicker = false;



  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    public cameraService: CameraService,
    public _userService: UserService,
    public _postService: PostService,
    public router: Router,
    private platform: Platform
  ) {  }

  ngOnInit() {

    this.postForm = this.formBuilder.group({
      userId: new FormControl(''),
      userImage: new FormControl(''),
      userName: new FormControl(''),
      incognito: new FormControl(true),
      scopeLimited: new FormControl(''),
      post: new FormControl( '', [Validators.required, Validators.maxLength(this.postMaxLngth)] ),
      postImages: this.formBuilder.array([]),
      postedDate: new FormControl(''),
      isActive: new FormControl(''),
      status: new FormControl(''),
    });

    this.userSubs =  this._userService.user.subscribe( userData => {
      this.user = userData;
      this.postForm.get('userId').setValue(userData._id);
      this.postForm.get('userImage').setValue(userData.userImage);
      this.postForm.get('userName').setValue(userData.userName);
    });

    this.tokenSubs = this._userService.tokenId.subscribe( tokenId => {
      this.token = tokenId;
    });

    if ( (this.platform.is('mobile') && !this.platform.is('hybrid')) || this.platform.is('desktop') ) {
      this.useFilePicker = true;
    }


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
    this.cameraService.picFiles = [];
    this.cameraService.picUrl = [];
    this.userSubs.unsubscribe();
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

  removePhotoCarrsl(i: number) {
    this.cameraService.removePhotoCarroussel(i);
  }

  onCreatePost() {
    const postBody: any =  this.postForm.value;
    const picArray: Array<File> = [];

    for ( const photo of this.cameraService.picFiles ) {
        picArray.push(photo);
    }

    this._postService.createPost('postUser', postBody, this.user._id, this.token, picArray ).subscribe( res => {
      console.log(res);
      this.router.navigate(['/', 'pages', 'tabs', 'experiences']);
    }, error => console.log('Error: ' + error));

    this.cameraService.picFiles = [];
    this.cameraService.picUrl = [];
    this.postForm.reset();
    this.modalController.dismiss();
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
    this.tokenSubs.unsubscribe();
  }

}
