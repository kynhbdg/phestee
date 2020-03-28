export class Bus {

  constructor(
    public busName: string,
    public busProfile: string,
    public busImage?: string,
    public busRating?: number,
    public active?: boolean,
    public busType?: string,
    public licenseType?: string,
    public landline?: string,
    public mobile?: string,
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
    public certification?: {
      isCertified?: boolean,
      gvmntPermissionId?: string,
      permissionFile?: string
    },
    public busLocation?: {
      lat: number,
      len: number
    },
    public busItems?: [{
      itemTitle: string,
      itemDesc: string,
      price: number,
      busItemRating: number,
      homeService: boolean,
      isMobileOffering: boolean,
      establishedBus: boolean,
      hshtgs: string,
      type: string,
      imgs: [],
      itemAdded: boolean; // need to add this flag in bE, it has no purpose but only for UI :(
    }]
    ) {}

}
