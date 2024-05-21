
// utils/distanceCalculator.ts
export const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): String => {
    const toRadians = (degrees: number): number => {
      return degrees * (Math.PI / 180);
    };
  
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    const d = distance < 1 ? parseFloat(distance.toFixed(2)) * 1000 + " م " : parseFloat(distance.toFixed(2)) + "كم";
    return String(d); // Return distance with only two digits after the decimal point
  };