import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('map', {static: true}) mapElementRef: ElementRef;
  clickListener: any;
  googleMaps: any;

  constructor(
    private modalCtrl: ModalController,
    private renderer: Renderer2
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {

    this.getGoogleMaps().then( googleMaps => {
      this.googleMaps = googleMaps;
      const mapEl = this.mapElementRef.nativeElement;
      const map = new googleMaps.Map(mapEl, {
        center: {lat: 20.6668205, lng: -103.3918228},
        zoom: 16
      });

      this.googleMaps.event.addListenerOnce( map, 'idle', () => {
        this.renderer.addClass(mapEl, 'map-visible');
      });

      this.clickListener =  map.addListener('click', event => {
        const selectedCoords = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        };
        this.modalCtrl.dismiss(selectedCoords);
      })

    }).catch( err => {
      console.log(err);
      // qué será bueno mostrar aquì?
    });

  }

  onCancelModal() {
    this.modalCtrl.dismiss();
  }

  ngOnDestroy() {
    this.googleMaps.event.removeListener(this.clickListener);
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;

    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      // googleMapsAPIKey globally setup in environments.ts
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + environment.googleMapsAPIKey;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if ( loadedGoogleModule && loadedGoogleModule.maps ) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google Maps not available');
        }
      };
    });

  }

}
