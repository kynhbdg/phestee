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
    0, // 'Venta'
    1, // 'Renta',
    2, // 'Donación',
    3 // 'Préstamo'
  ];

  rentPeriods = [
    0, // 'Hora',
    1, // 'Día',
    2, // 'Noche',
    3, // 'Semana',
    4, // 'Mes'
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
      usagePeriod: new FormControl(''),
      price: new FormControl(''),
      busItemRating: new FormControl(5),
      hshtgs: this.formBuilder.array([]),
      imgs: this.formBuilder.array([]),
    });
  }

  onSaveItems(id: string) {
    console.log(this.itemsArrayForm.value);
  }


}
