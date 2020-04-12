import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

import { ActionSheetController, AlertController } from '@ionic/angular';

import { BusinessProfilePageModule } from '../business-profile/business-profile.module';

import { Bus } from '../../..//models/bus.model';
import { PlaceLocation } from '../../../models/location.model';


@Component({
  selector: 'app-business-settings',
  templateUrl: './business-settings.page.html',
  styleUrls: ['./business-settings.page.scss'],
})
export class BusinessSettingsPage implements OnInit {

  businessSettingForm: FormGroup;
  business: Bus;
  busToSend = {};
  isMapLoaded = false;
  showCertifcationForm = false;



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

  // citiesJal = [
  //   'El Salto',
  //   'Guadalajara',
  //   'Tlajomulco',
  //   'Tlaquepaque',
  //   'Tonalá',
  //   'Zapopan',
  //   'Otra'
  // ];

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
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {

    this.businessSettingForm = this.formBuilder.group({
      busName: new FormControl('', [ Validators.required ] ),
      busProfile: new FormControl('', [ Validators.required ]),
      busType: new FormControl(this.busTypesArray[0], [ Validators.required ]),
      rtmMode: new FormControl(this.rtmModesArray[0], [ Validators.required ]),
      busImage: new FormControl(''),
      busRating: new FormControl(''),
      active: new FormControl(''),
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
          streetName: new FormControl({ value: '', disabled: true }),
          neighborhood: new FormControl({ value: '', disabled: true }),
          additional: new FormControl(''),
          city: new FormControl({ value: '', disabled: true }),
          state: new FormControl({ value: '', disabled: true }),
          country: new FormControl({ value: '', disabled: true }),
          zipCode: new FormControl({ value: '', disabled: true }),
        }),
        staticMapImageUrl: new FormControl(''),
        lastUpdated: new FormControl('')
      })

    });

    this.onFormChanges();

  }

  onFormChanges() {
    this.busLocationForm.valueChanges.subscribe( hasMap => {
      this.isMapLoaded = hasMap ? true : false;
    });
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
      lastUpdated: Date.now()
    });
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

  async presentPhotoOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actualizar foto de perfil',
      buttons: [{
        text: 'Tomar foto',
        icon: 'camera-outline',
        handler: () => {
          console.log('abrir camara');
          }
        },
        {
          text: 'Abrir galeria',
          icon: 'images-outline',
          handler: () => {
            console.log('abrir galeria');
          }
        },
        {
          text: 'Cancelar',
          role: 'destructive',
          icon: 'close-circle-outline',
          handler: () => {
            console.log('abrir galeria');
          }
        }
      ]
    });

    await actionSheet.present();

  }

  onBusUpdate(id?: any) {

    if (this.businessSettingForm.invalid) {
      return;
    }
    const curatedBus = this.businessSettingForm.value;

    if ( curatedBus.busType ) {
      curatedBus.busType = this.busTypesArray.indexOf(curatedBus.busType);
      this.busToSend =  { ...curatedBus };
    }

    if ( curatedBus.rtmMode ) {
      curatedBus.rtmMode = this.rtmModesArray.indexOf(curatedBus.rtmMode);
      this.busToSend =  { ...curatedBus };
    }

    for ( const obj of curatedBus.certification.documents ) {
      if ( obj.docType ) {
        obj.docType = this.certificationTypesArray.indexOf(obj.docType);
        this.busToSend = { ...curatedBus };
      }
    }

    console.log(this.busToSend);

  }
}
