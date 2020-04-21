import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ModalController, ActionSheetController, AlertController } from '@ionic/angular';

import { Plugins, Capacitor } from '@capacitor/core';

import { environment } from '../../../../environments/environment';
import { MapModalComponent } from '../../map-modal/map-modal.component';

import { PlaceLocation, Coordinates } from '../../../models/location.model';



@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {

  @Output() locationPick = new EventEmitter<PlaceLocation>();
  selectedLocationImage: string;
  selectedLocationAddress: string;
  isLoading = false;

  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {}

  onPickLocation() {
    this.openMap();
    // this.actionSheetCtrl.create({
    //   header: 'Selecciona una opción',
    //   buttons: [
    //     {text: 'Ubicación actual', handler: () => {
    //       this.locateUser();
    //     }},
    //     {text: 'Buscar en mapa', handler: () => {
    //       this.openMap();
    //     }},
    //     {text: 'Cancelar', role: 'cancel'}
    //   ]
    // }).then( actionSheetEl => {
    //   actionSheetEl.present();
    // });

  }

  private locateUser() {
    if ( !Capacitor.isPluginAvailable('Geolocation') ) {
      this.showErrorAlert();
      return;
    }
    this.isLoading = true;
    console.log(this.isLoading);
    Plugins.Geolocation.getCurrentPosition()
      .then( geoPosition => {
        const coordinates: Coordinates = {
          lat: geoPosition.coords.latitude,
          lng: geoPosition.coords.longitude
        };
        this.createPlace( coordinates.lat, coordinates.lng );
        this.isLoading = false;
        console.log(this.isLoading);
      })
      .catch( err => {
        this.isLoading = false;
        this.showErrorAlert();
      });
  }

  private showErrorAlert() {
    this.alertCtrl.create({
      header: 'No se pudo encontrar la ubicación',
      message:  'Por favor utiliza el mapa para encontrar una ubicación',
      buttons: ['OK']
    }).then( alertEl => alertEl.present());
  }

  private openMap() {

    this.isLoading = true;
    console.log(this.isLoading);
    this.modalCtrl.create({component: MapModalComponent}).then( modalEl => {
      modalEl.onDidDismiss().then(modalData => {
        if ( !modalData.data ) {
          return;
        }
        const coordinates: Coordinates = {
          lat: modalData.data.lat,
          lng: modalData.data.lng
        };
        this.createPlace( coordinates.lat, coordinates.lng );
        this.isLoading = false;
        console.log(this.isLoading);
      });
      modalEl.present();
    });
  }

  private createPlace( lat: number, lng: number ) {

      const pickedLocation: PlaceLocation = {
        lat,
        lng,
        address: null,
        addressComponents: null,
        staticMapImageUrl: null,
        lastUpdated: null
      };

      this.isLoading = true;
      this.getAddress(lat, lng).pipe(switchMap( address => {
        pickedLocation.address = address.results[0].formatted_address;
        pickedLocation.addressComponents = address.results[0].address_components;
        this.selectedLocationAddress = address.results[0].formatted_address;
        return of(this.getMapImage(pickedLocation.lat, pickedLocation.lng, 14));
          })
        ).subscribe(staticMapImageUrl => {
          pickedLocation.staticMapImageUrl = staticMapImageUrl;
          this.selectedLocationImage = staticMapImageUrl;
          this.isLoading = false;
          this.locationPick.emit(pickedLocation);
        });
  }

  private getAddress(lat: number, lng: number) {
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMapsAPIKey}`)
    .pipe(map( (geoData: any) => {
      if (!geoData || !geoData.results || geoData.results.length === 0) {
        return null;
      }
      return (geoData);
    }));
  }

  private getMapImage(lat: number, lng: number, zoom: number) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=500x300&maptype=roadmap
    &markers=color:red%7Clabel:Place%7C${lat},${lng}
    &key=${environment.googleMapsAPIKey}`;
  }

}
