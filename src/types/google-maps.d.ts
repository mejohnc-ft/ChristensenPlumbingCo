declare global {
  interface Window {
    google: {
      maps: {
        Map: new (element: HTMLElement, options: any) => any;
        Marker: new (options: any) => any;
        Polygon: new (options: any) => any;
        Size: new (width: number, height: number) => any;
      };
    };
  }
}

export {};