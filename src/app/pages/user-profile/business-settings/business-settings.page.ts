import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

import { ActionSheetController } from '@ionic/angular';

import { Bus } from 'src/app/models/bus.model';
import { BusinessProfilePageModule } from '../business-profile/business-profile.module';

@Component({
  selector: 'app-business-settings',
  templateUrl: './business-settings.page.html',
  styleUrls: ['./business-settings.page.scss'],
})
export class BusinessSettingsPage implements OnInit {

  businessSettingForm: FormGroup;
  business: Bus;

  busTypes = [
    0, // 'Negocio',
    1, // 'Freelancer',
    2, // 'Comunidad',
    3, // 'Oficio',
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
      address: new FormGroup({
        streetName: new FormControl(''),
        streetNum: new FormControl(''),
        additional: new FormControl(''),
        zipCode: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl({ value: 'Jalisco', disabled: true }),
        country: new FormControl({ value: 'México', disabled: true }),
        neighborhood: new FormControl('')
      }),
      certification: new FormGroup({
        isCertified: new FormControl(false),
        docType: new FormControl(''),
        docID: new FormControl(''),
        docImage: new FormControl('')
      }),
      busLocation: new FormGroup({
        lat: new FormControl(''),
        len: new FormControl('')
      }),

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
