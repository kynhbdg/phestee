import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.page.html',
  styleUrls: ['./business-profile.page.scss'],
})
export class BusinessProfilePage implements OnInit {

  txnTypes = [
    'Venta',
    'Renta',
    'Donación',
    'Préstamo'
  ];

  rentPeriods = [
    'Hora',
    'Día',
    'Noche',
    'Mes'
  ]

  addItemToArray: boolean;
  itemsArrayForm: FormGroup;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.itemsArrayForm = this.formBuilder.group({
      busItems: this.formBuilder.array([])
    });

  }

  get busItemsForm() {
    return this.itemsArrayForm.get('busItems');
  }

  onEditBusiness(id: any) {
    this.router.navigate(['/', 'pages', 'tabs', 'user', 'business-settings', id]);
  }

  onAddBusItem() {
    console.log('entró?');
    (this.itemsArrayForm.get('busItems') as FormArray).push(this.addItem());
    this.addItemToArray = true;
  }

  addItem() {
    return this.formBuilder.group({
      itemTitle: new FormControl(''),
      itemDesc: new FormControl(''),
      txnType: new FormControl(''),
      rentPeriod: new FormControl(''),
      price: new FormControl(''),
      hshtgs: new FormControl(''),
      busItemRating: new FormControl(5),
      homeService: new FormControl(''),
      isMobileOffering: new FormControl(''),
      establishedBus: new FormControl(''),
      imgs: this.formBuilder.array([]),
      itemAdded: new FormControl(''),
    });
  }

  onSaveItems(id: string) {
    console.log(this.itemsArrayForm.value);
  }


}
