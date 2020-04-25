import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

import { Subscription } from 'rxjs';

import { UserService } from 'src/app/services/user.service';
import { BusService } from 'src/app/services/bus.service';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.page.html',
  styleUrls: ['./business-profile.page.scss'],
})
export class BusinessProfilePage implements OnInit, OnDestroy {

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

  bus: any;
  busProfileHeader: string;
  addItemToArray: boolean;
  itemsArrayForm: FormGroup;
  tokenSubs: Subscription;
  token: string;
  busId: string;

  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public _userService: UserService,
    public busService: BusService
  ) { }

  ngOnInit() {

    this.itemsArrayForm = this.formBuilder.group({
      busItems: this.formBuilder.array([])
    });

    this.tokenSubs = this._userService.token.subscribe( tokenId => {
      this.token = tokenId;
    }, error => console.log('Error: ' + error));

    this.activeRoute.params.subscribe( bus => {
      this.busId = bus.id;
    }, error => console.log('Error: ' + error));

    this.getBusById();

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

  ngOnDestroy() {
    this.tokenSubs.unsubscribe();
  }


}
