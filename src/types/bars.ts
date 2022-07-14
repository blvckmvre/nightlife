export interface IBarFetchParams {
    lat: number;
    lon: number;
}

export interface IBarLocation {
    city: string;
    address1: string;
}

export interface IBar {
    rating: number;
    id: string;
    name: string;
    image_url: string;
    location: IBarLocation;
    users: number;
    distance: number;
}

interface IOpenHours {
    start: string;
    end: string;
    day: number;
}

export interface IHours {
    open: IOpenHours[];
    is_open_now: boolean;
}

export interface IBarDetailed {
    rating: number;
    id: string;
    name: string;
    location: IBarLocation;
    is_closed: boolean;
    display_phone: string;
    photos: string[];
    price: string;
    users?: string[];
    hours: IHours[];
}

export interface IBarsResponse {
    total: number;
    businesses: IBar[];
}

export interface IBarUser {
    bar_id: string;
    username: string;
}