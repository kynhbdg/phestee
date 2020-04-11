import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

import { ActionSheetController } from '@ionic/angular';

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
  isMapLoaded = false;

  busTypes = [
    'Negocio', // 0
    'Freelancer', // 1
    'Comunidad', // 2
    'Oficio', // 3
    // 'Servicio',
  ];

  rtmModes = [
    0, // Fijo
    1, // Ambulante
    2 // Con servicio a domicilio
  ];

  citiesJal = [
    'El Salto',
    'Guadalajara',
    'Tlajomulco',
    'Tlaquepaque',
    'Tonalá',
    'Zapopan',
    'Otra'
  ];

  certificationTypes = [
    0, // 'Cédula Profesional',
    1, // 'IFE,
    2, // 'Pasaporte',
    3, // 'Licencia de conducir',
    4, // 'Permiso Gubernamental'
    5, // 'Comprobante de domicilio'
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
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {

    this.businessSettingForm = this.formBuilder.group({
      busName: new FormControl('', [ Validators.required ] ),
      busProfile: new FormControl('', [ Validators.required ]),
      busType: new FormControl(this.busTypes[0], [ Validators.required ]),
      rtmMode: new FormControl(this.rtmModes[0], [ Validators.required ]),
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
        docType: new FormControl(''),
        docID: new FormControl(''),
        docImage: new FormControl('')
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
    console.log(this.businessSettingForm.value);
  }
}
