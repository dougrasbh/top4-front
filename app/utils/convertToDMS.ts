interface Coordinates {
  latitude: number;
  longitude: number;
}

export function convertToDMS(latitude: number, longitude: number): string {
  const toDMS = (coord: number, direction: string) => {
    const absolute = coord;
    const degrees = absolute;
    return `${degrees.toFixed(2)}° ${direction}`;
  };

  const latitudeDMS = toDMS(latitude, latitude < 0 ? 'S' : 'N');
  const longitudeDMS = toDMS(longitude, longitude < 0 ? 'W' : 'E');

  return `${latitudeDMS}, ${longitudeDMS}`;
}