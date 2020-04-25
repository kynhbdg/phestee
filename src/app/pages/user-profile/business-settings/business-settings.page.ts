import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Bus } from '../../..//models/bus.model';
import { User } from 'src/app/models/user.model';

import { PlaceLocation } from '../../../models/location.model';

import { UserService } from 'src/app/services/user.service';
import { BusService } from 'src/app/services/bus.service';


@Component({
  selector: 'app-business-settings',
  templateUrl: './business-settings.page.html',
  styleUrls: ['./business-settings.page.scss'],
})
export class BusinessSettingsPage implements OnInit, OnDestroy {

  businessSettingForm: FormGroup;
  busBody: Bus;
  busId: string;
  bus: any;
  user: User;
  busProfileHeader: string;
  token: string;
  isMapLoaded = false;
  showCertifcationForm = false;
  addressDisabled = false;
  userSubs: Subscription;
  tokenSubs: Subscription;



  busTypesArray = [
    'Negocio', // 0
    'Freelancer', // 1
    'Comunidad', // 2
    'Oficio', // 3
    // 'Servicio',
  ];

  rtmModesArray = [
    'Fijo', // 0
    'Ambulante', // 1
    'Con servicio a domicilio' //  2
  ];


  certificationTypesArray = [
    'Cédula Profesional', // 0
    'IFE', // 1
    'Pasaporte', // 2
    'Licencia de conducir', // 3
    'Permiso Gubernamental', // 4
    'Comprobante de domicilio' // 5
  ];

  // this is for the items
  // txnTypes = [
  //   'Venta',
  //   'Renta',
  //   'Donación',
  //   'Préstamo'
  // ];

  constructor(
    private formBuilder: FormBuilder,
    public actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    public _userService: UserService,
    public busService: BusService,
    public activeRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {

    this.activeRoute.params.subscribe( bus => {
      this.busId = bus.id;
    }, error => console.log('Error: ' + error));

    this.businessSettingForm = this.formBuilder.group({
      busName: new FormControl('', [ Validators.required ] ),
      busProfile: new FormControl('', [ Validators.required ]),
      busType: new FormControl(this.busTypesArray[0], [ Validators.required ]),
      rtmMode: new FormControl(this.rtmModesArray[0], [ Validators.required ]),
      busImage: new FormControl(''),
      busRating: new FormControl(5),
      active: new FormControl(true),
      licencetype: new FormControl(''),
      landaline: new FormControl('', [ Validators.minLength(10), Validators.maxLength(10) ]),
      cellphone: new FormControl('',  [ Validators.minLength(10), Validators.maxLength(10) ]),
      email: new FormControl('', [ Validators.email ]),
      delegatedUsers: new FormControl(''),
      isheadBusiness: new FormControl(false),
      branches: this.formBuilder.array([]),
      instagram: new FormControl(''),
      facebook: new FormControl(''),
      linkedin: new FormControl(''),
      website: new FormControl(''),
      certification: new FormGroup({
        isCertified: new FormControl(false),
        documents: this.formBuilder.array([])
      }),
      busLocation: new FormGroup({
        lat: new FormControl(''),
        lng: new FormControl(''),
        address: new FormControl(''),
        addressComponents: new FormGroup({
          streetNum: new FormControl(''),
          streetName: new FormControl({value: '', disabled: this.addressDisabled }),
          neighborhood: new FormControl({value: '', disabled: this.addressDisabled }),
          additional: new FormControl(''),
          city: new FormControl({value: '', disabled: this.addressDisabled }),
          state: new FormControl({value: '', disabled: this.addressDisabled }),
          country: new FormControl({value: '', disabled: this.addressDisabled }),
          zipCode: new FormControl({value: '', disabled: this.addressDisabled }),
        }),
        staticMapImageUrl: new FormControl(''),
        lastUpdated: new FormControl('')
      })

    });

    this.userSubs =  this._userService.user.subscribe( userData => {
      this.user = userData;
    }, error => console.log('Error: ' + error));

    this.tokenSubs = this._userService.token.subscribe( tokenId => {
      this.token = tokenId;
    }, error => console.log('Error: ' + error));

    if ( this.busId ) {
      this.getBusById();
    }

    this.onFormChanges();

  }

  getBusById() {
    this.busService.getBusById(this.busId, this.token).subscribe( (res: any) => {
      this.bus = res.bus[0];
      this.curateBusAttr();
    }, error => console.log('Error: ' + error));

  }

  curateBusAttr() {
    const curatedBus = this.bus;

    if (!curatedBus) { return; }
    if (curatedBus.busType === 0) {curatedBus.busType = 'Negocio'; }
    if (curatedBus.busType === 1) {curatedBus.busType = 'Freelancer'; }
    if (curatedBus.busType === 2) {curatedBus.busType = 'Comunidad'; }
    if (curatedBus.busType === 3) {curatedBus.busType = 'Oficio'; }
    if (curatedBus.rtmMode === 0) {curatedBus.rtmMode = 'Fijo'; }
    if (curatedBus.rtmMode === 1) {curatedBus.rtmMode = 'Ambulante'; }
    if (curatedBus.rtmMode === 2) {curatedBus.rtmMode = 'Con servicio a domicilio'; }

    this.bus = curatedBus;
    this.busProfileHeader = this.bus.busProfile;
    this.businessSettingForm.patchValue(this.bus);
    console.log(this.businessSettingForm.value);

  }

  onFormChanges() {
    this.busLocationForm.valueChanges.subscribe( hasMap => {
      this.isMapLoaded = hasMap ? true : false;
    }, error => console.log('Error: ' + error));
  }

  onLocationPicked(location: PlaceLocation) {

    this.busLocationForm.patchValue({
      lat: location.lat,
      lng: location.lng,
      address: location.address,
      addressComponents: {
        streetNum: location.addressComponents[0].long_name,
        streetName: location.addressComponents[1].long_name,
        neighborhood: location.addressComponents[2].long_name,
        additional: '',
        city: location.addressComponents[3].long_name,
        state: location.addressComponents[4].long_name,
        country: location.addressComponents[5].long_name,
        zipCode: location.addressComponents[6].long_name
      },
      staticMapImageUrl: location.staticMapImageUrl,
      lastUpdated: new Date(Date.now())
    });
    this.addressDisabled = !!this.busLocationForm.get('addressComponents').value;
  }

  get busNameForm() {
    return this.businessSettingForm.get('busName');
  }
  get busProfileForm() {
    return this.businessSettingForm.get('busProfile');
  }
  get busTypeForm() {
    return this.businessSettingForm.get('busType');
  }
  get rtmModeForm() {
    return this.businessSettingForm.get('rtmMode');
  }
  get landalineForm() {
    return this.businessSettingForm.get('landaline');
  }
  get cellphoneForm() {
    return this.businessSettingForm.get('cellphone');
  }
  get emailForm() {
    return this.businessSettingForm.get('email');
  }
  get busLocationForm() {
    return this.businessSettingForm.get('busLocation');
  }
  get busLocationAddressForm() {
    return this.businessSettingForm.get('busLocation').get('address');
  }
  get busLocationMapForm() {
    return this.businessSettingForm.get('busLocation').get('staticMapImageUrl');
  }
  get busCertificationForm() {
    return this.businessSettingForm.get('certification');
  }
  get busCertDocsForm() {
    return this.businessSettingForm.get('certification').get('documents');
  }


  onAddCertDoc() {
    if ( this.busCertDocsForm.value.length > 5 ) {
      this.presentAlertDocs();
      return;
    }
    console.log(this.busCertDocsForm.value.length);
    this.showCertifcationForm = true;
    (this.busCertDocsForm as FormArray).push(this.pushCertDocToForm());

  }

  private pushCertDocToForm() {

    return this.formBuilder.group({
      docType: new FormControl(''),
      docID: new FormControl(''),
      docImage: new FormControl('')
    });
  }

  async presentAlertDocs() {
    this.alertCtrl.create({
      header: 'Certificación',
      message: 'Solo puedes agregar máximo 6 documentos a tu certificación',
      buttons: [ 'Ok']
    }).then( alertEl => alertEl.present());
  }


  onBusUpdate() {

    if (this.businessSettingForm.invalid) {
      return;
    }
    const curatedBus = this.businessSettingForm.value;

    if ( curatedBus.busProfile ) {
      curatedBus.busProfile = curatedBus.busProfile.trim().replace(/ /g, '');
      this.busBody =  { ...curatedBus };
    }

    if ( curatedBus.busType ) {
      curatedBus.busType = this.busTypesArray.indexOf(curatedBus.busType);
      this.busBody =  { ...curatedBus };
    }

    if ( curatedBus.rtmMode ) {
      curatedBus.rtmMode = this.rtmModesArray.indexOf(curatedBus.rtmMode);
      this.busBody =  { ...curatedBus };
    }

    for ( const obj of curatedBus.certification.documents ) {
      if ( obj.docType ) {
        obj.docType = this.certificationTypesArray.indexOf(obj.docType);
        this.busBody = { ...curatedBus };
      }
    }

    console.log(this.busBody);

    this._userService.updateBus('busUpdate', this.busBody, this.user._id, this.token, this.busId).subscribe( res => {
      console.log(res);
    }, error => console.log('Error: ' + error));

    this.router.navigate(['/', 'pages', 'tabs', 'user']);
    this.businessSettingForm.reset();

  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
    this.tokenSubs.unsubscribe();
  }

}
