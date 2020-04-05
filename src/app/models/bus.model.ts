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
    public socialNetworks?: {
      instagram?: string,
      facebook?: string,
      linkedin?: string,
      website?: string,
    },
    public certification?: {
      isCertified?: boolean,
      docType?: string;
      docID?: string,
      permissionFile?: string
    },
    public busLocation?: {
      lat: number,
      len: number
    },
    public busItems?: [{
      itemTitle: string,
      itemDesc: string,
      txnType: string,
      rentPeriod: string,
      price: number,
      hshtgs: string,
      busItemRating: number,
      homeService: boolean,
      isMobileOffering: boolean,
      establishedBus: boolean,
      imgs: [],
      itemAdded: boolean
    }]
    ) {}

}
