import { PlaceLocation } from './location.model';

export class Bus {

  constructor(
    public busName: string,
    public busProfile: string,
    public busType: string,
    public rtmMode: string, // BC: added it 04/05, this is for servicio a dom, fijo, móvil a nivel de header
    public busImage?: string,
    public busRating?: number,
    public active?: boolean,
    public licenseType?: string, // BC: can this be replaced by certification.docType?
    public landline?: string,
    public cellphone?: string,
    public email?: string,
    public delegatedUsers?: boolean,
    public isHeadBusiness?: string,
    public branches?: [{}],
    public instagram?: string,
    public facebook?: string,
    public linkedin?: string,
    public website?: string,
    public address?: {
      streetName: string,
      streetNum: string,
      additional: string,
      zipCode: number,
      city: string,
      state: string,
      country: string,
      neighborhood: string,
      lastUpdated: string,
    },
    public certification?: [{
      isCertified?: boolean,
      documents: [{
        docId?: string,
        docImage?: string
        docType?: number;
      }]
    }],
    public busLocation?: PlaceLocation,
    public busItems?: [{
      itemTitle: string,
      itemDesc: string,
      txnType: string,
      usagePeriod: string,
      price: number,
      busItemRating: number,
      hshtgs: string,
      // homeService: boolean, // agreed to remove and leave RTM at header level
      // isMobileOffering: boolean, // agreed to remove and leave RTM at header level
      // establishedBus: boolean,// agreed to remove and leave RTM at header level
      imgs: []
    }]
    ) {}

}
