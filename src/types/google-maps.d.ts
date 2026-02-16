declare global {
  interface Window {
    google: {
      maps: {
        Map: new (element: HTMLElement, options: google.maps.MapOptions) => google.maps.Map;
        Marker: new (options: google.maps.MarkerOptions) => google.maps.Marker;
        Polygon: new (options: google.maps.PolygonOptions) => google.maps.Polygon;
        Size: new (width: number, height: number) => google.maps.Size;
      };
    };
  }

  namespace google.maps {
    interface MapOptions {
      center?: LatLngLiteral;
      zoom?: number;
      styles?: MapTypeStyle[];
      [key: string]: unknown;
    }
    interface MarkerOptions {
      position?: LatLngLiteral;
      map?: Map;
      [key: string]: unknown;
    }
    interface PolygonOptions {
      paths?: LatLngLiteral[];
      [key: string]: unknown;
    }
    interface LatLngLiteral {
      lat: number;
      lng: number;
    }
    interface MapTypeStyle {
      [key: string]: unknown;
    }
    interface Map {
      setCenter(latlng: LatLngLiteral): void;
      [key: string]: unknown;
    }
    interface Marker {
      setMap(map: Map | null): void;
      [key: string]: unknown;
    }
    interface Polygon {
      setMap(map: Map | null): void;
      [key: string]: unknown;
    }
    interface Size {
      width: number;
      height: number;
    }
  }
}

export {};