import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { CameraService } from '../../services/camera.service';

import { Post } from '../../models/post.model';


@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.page.html',
  styleUrls: ['./post-modal.page.scss'],
})
export class PostModalPage implements OnInit {

  postForm: FormGroup;
  isIncognitoFlag: true;
  postMaxLngth = 250;
  characterleft = this.postMaxLngth;
  userPost: Post;
  rowsInput = 1;



  constructor(
    private modalController: ModalController,
    public cameraService: CameraService,
    public router: Router
  ) {
    this.postForm = new FormGroup({
      postString: new FormControl( '', [Validators.required, Validators.maxLength(210)] ),
      // postImage: new FormControl(),
      // postWhere: new FormControl(),
      postWhen: new FormControl(),
      isIncognito: new FormControl(true),
      isProf: new FormControl(true),
      isCommunity: new FormControl(false)
    });
   }

  ngOnInit() {

    this.onFormChanges();

  }

  get postStringControl() {
    return this.postForm.get('postString');
  }
  get postImageControl() {
    return this.postForm.get('postImage');
  }
  get postWhereControl() {
    return this.postForm.get('postWhere');
  }
  get postWhenControl() {
    return this.postForm.get('postWhen');
  }
  get isIncognitoControl() {
    return this.postForm.get('isIncognito');
  }
  get isProfControl() {
    return this.postForm.get('isProf');
  }
  get isCommunityControl() {
    return this.postForm.get('isCommunity');
  }

  onFormChanges(): void {
    this.postForm.valueChanges.subscribe( () =>  {
      this.isIncognitoFlag = this.isIncognitoControl.value;
    });

  }

  onCharacterCount(msg: any) {
    const lengthVal = this.postMaxLngth >= msg.length ? true : false;
    this.characterleft = lengthVal ? (this.postMaxLngth) - (msg.length) : this.characterleft;
    this.userPost = !lengthVal ? msg.substr(0, msg.length - 1) : undefined;
  }

  onCloseModal() {
    this.modalController.dismiss();
  }

  onTakePhoto() {
    this.cameraService.addNewToGallery();
  }

  removePhotoCarrsl(i: number) {
    this.cameraService.removePhotoCarroussel(i);
  }

  onCreatePost() {
    console.log(this.cameraService.photos);
    console.log(this.postForm.value);

    // add call to backend for saving Post

    this.cameraService.photos = [];
    this.router.navigate(['/', 'pages', 'tabs', 'experiences']);
    this.modalController.dismiss();
  }

}
