import L from 'leaflet';

export const createBrutalistIcon = (isSelected: boolean) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div style="
        background-color: ${isSelected ? '#ff0000' : '#000000'};
        width: 16px;
        height: 16px;
        border: 2px solid #ffffff;
        box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.5);
        transition: all 0.2s ease;
      "></div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};