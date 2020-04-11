export interface Coordinates {
    lat: number;
    lng: number;
}

export interface PlaceLocation extends Coordinates {
    address: string;
    addressComponents: {
        streetName: string,
        streetNum: string,
        additional: string,
        zipCode: number,
        city: string,
        state: string,
        country: string,
        neighborhood: string,
    };
    staticMapImageUrl: string;
    lastUpdated: Date; // string?
}