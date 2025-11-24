import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { City, Route, AppMode } from '../types';
import { CITIES, HISTORICAL_ROUTES } from '../constants';
import { createBrutalistIcon } from './MapIcons';

interface SilkRoadMapProps {
    selectedCities: string[];
    onCityClick: (cityId: string) => void;
    mode: AppMode;
}

// Helper to fit bounds
const MapController: React.FC<{ selectedCities: string[] }> = ({ selectedCities }) => {
    const map = useMap();
    
    useEffect(() => {
        if (selectedCities.length === 0) return;

        const selectedCoords = CITIES.filter(c => selectedCities.includes(c.id)).map(c => [c.coords.lat, c.coords.lng] as [number, number]);
        
        if (selectedCoords.length > 0) {
            const bounds = L.latLngBounds(selectedCoords);
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 6 });
        }
    }, [selectedCities, map]);

    return null;
};

const SilkRoadMap: React.FC<SilkRoadMapProps> = ({ selectedCities, onCityClick, mode }) => {
    
    const renderHistoricalRoutes = () => {
        return HISTORICAL_ROUTES.map(route => {
            const start = CITIES.find(c => c.id === route.startCityId);
            const end = CITIES.find(c => c.id === route.endCityId);
            if (!start || !end) return null;

            return (
                <Polyline 
                    key={route.id}
                    positions={[
                        [start.coords.lat, start.coords.lng], 
                        [end.coords.lat, end.coords.lng]
                    ]}
                    pathOptions={{ 
                        color: 'black', 
                        weight: 2, 
                        opacity: 0.3,
                        dashArray: '5, 10'
                    }}
                />
            );
        });
    };

    const renderUserRoute = () => {
        if (selectedCities.length < 2) return null;
        
        // Get coordinates for all selected cities in order
        const routeCoords: [number, number][] = selectedCities
            .map(id => CITIES.find(c => c.id === id))
            .filter((c): c is City => !!c)
            .map(c => [c.coords.lat, c.coords.lng]);

        return (
            <Polyline 
                positions={routeCoords}
                pathOptions={{ 
                    color: '#ff0000', 
                    weight: 4, 
                    opacity: 1 
                }}
            />
        );
    }

    return (
        <div className="h-full w-full border-4 border-black bg-gray-200 relative overflow-hidden">
            <MapContainer 
                center={[35.0, 65.0]} 
                zoom={4} 
                className="h-full w-full z-0"
                zoomControl={false}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <MapController selectedCities={selectedCities} />

                {renderHistoricalRoutes()}
                {renderUserRoute()}

                {CITIES.map(city => {
                    const isSelected = selectedCities.includes(city.id);
                    const selectionIndex = selectedCities.indexOf(city.id);
                    
                    return (
                        <Marker 
                            key={city.id} 
                            position={[city.coords.lat, city.coords.lng]}
                            icon={createBrutalistIcon(isSelected)}
                            eventHandlers={{
                                click: () => onCityClick(city.id)
                            }}
                        >
                            <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false} className="font-mono text-xs font-bold uppercase border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                {mode === AppMode.PLOT_ROUTE && isSelected ? `${selectionIndex + 1}. ` : ''}{city.name}
                            </Tooltip>
                        </Marker>
                    );
                })}
            </MapContainer>
            
            {/* Brutalist Overlay Label */}
            <div className="absolute bottom-4 left-4 z-[1000] pointer-events-none">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-white border-4 border-black p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    SILK_ROAD_OS
                </h1>
            </div>
        </div>
    );
};

export default SilkRoadMap;