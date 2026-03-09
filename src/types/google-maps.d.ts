
// Type definitions for Google Maps JavaScript API

declare global {
  interface Window {
    initMap: () => void;
    google: {
      maps: {
        Map: new (element: HTMLElement, options: google.maps.MapOptions) => google.maps.Map;
        Marker: new (options: google.maps.MarkerOptions) => google.maps.Marker;
        InfoWindow: new (options?: google.maps.InfoWindowOptions) => google.maps.InfoWindow;
        Animation: {
          DROP: number;
          BOUNCE: number;
        };
        LatLng: new (lat: number, lng: number) => google.maps.LatLng;
      };
    };
  }
}

declare namespace google.maps {
  interface MapOptions {
    center: LatLngLiteral | LatLng;
    zoom: number;
    styles?: StyleMap[];
    mapTypeId?: string;
    disableDefaultUI?: boolean;
    [key: string]: any;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface LatLng {
    lat(): number;
    lng(): number;
    toJSON(): LatLngLiteral;
    toString(): string;
    equals(other: LatLng): boolean;
  }

  class Map {
    setCenter(latLng: LatLng | LatLngLiteral): void;
    setZoom(zoom: number): void;
    panTo(latLng: LatLng | LatLngLiteral): void;
    setOptions(options: MapOptions): void;
    addListener(event: string, handler: Function): MapsEventListener;
  }

  interface MapsEventListener {
    remove(): void;
  }

  interface Marker {
    setPosition(latLng: LatLng | LatLngLiteral): void;
    setMap(map: Map | null): void;
    setAnimation(animation: number | null): void;
    addListener(event: string, handler: Function): MapsEventListener;
    getPosition(): LatLng;
  }

  interface MarkerOptions {
    position: LatLng | LatLngLiteral;
    map?: Map;
    title?: string;
    animation?: number;
    icon?: string | Icon;
    draggable?: boolean;
    [key: string]: any;
  }

  interface InfoWindow {
    open(map: Map, marker?: Marker): void;
    close(): void;
    setContent(content: string | Node): void;
  }

  interface InfoWindowOptions {
    content?: string | Node;
    position?: LatLng | LatLngLiteral;
    maxWidth?: number;
    pixelOffset?: Size;
    [key: string]: any;
  }

  interface Icon {
    url: string;
    size?: Size;
    origin?: Point;
    anchor?: Point;
    scaledSize?: Size;
  }

  interface Size {
    width: number;
    height: number;
    equals(other: Size): boolean;
  }

  interface Point {
    x: number;
    y: number;
    equals(other: Point): boolean;
  }
  
  interface StyleMap {
    featureType: string;
    elementType: string;
    stylers: StyleRule[];
  }
  
  interface StyleRule {
    [key: string]: string | number;
  }
}

export {};
