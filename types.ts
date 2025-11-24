export interface Coordinate {
    lat: number;
    lng: number;
}

export interface City {
    id: string;
    name: string;
    coords: Coordinate;
    region: string;
    empire: string;
}

export interface Route {
    id: string;
    startCityId: string;
    endCityId: string;
    distance?: number; // approximate relative distance
}

export interface TradeAnalysis {
    route: string;
    goods: string[];
    risks: string[];
    diseases: string[];
    benefits: string;
    historicalContext: string;
}

export interface TravelLogistics {
    totalDistanceKm: number;
    daysByFoot: number;
    daysByCaravan: number;
    daysByHorse: number;
}

export enum AppMode {
    EXPLORE = 'EXPLORE',
    PLOT_ROUTE = 'PLOT_ROUTE'
}