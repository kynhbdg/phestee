import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.page.html',
  styleUrls: ['./business-profile.page.scss'],
})
export class BusinessProfilePage implements OnInit {

  busTypes = [
    'Negocio',
    'Freelancer',
    'Servicio',
    'Oficio',
    'Comunidad',
  ];

  busMode = [
    'Fijo con Servicio a Dom',
    'Fijo',
    'Móvil',
  ];

  txnType = [
    'Venta',
    'Renta',
    'Donación'
  ]

  constructor() { }

  ngOnInit() {
  }

}
