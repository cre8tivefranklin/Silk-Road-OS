import React, { useState, useCallback, useEffect } from 'react';
import SilkRoadMap from './components/SilkRoadMap';
import InfoPanel from './components/InfoPanel';
import { AppMode, TradeAnalysis, TravelLogistics } from './types';
import { analyzeTradeRoute } from './services/geminiService';
import { CITIES, calculateDistance, TRAVEL_SPEEDS } from './constants';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.EXPLORE);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<TradeAnalysis | null>(null);
  const [logistics, setLogistics] = useState<TravelLogistics | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with empty slots for Plot Mode if empty
  useEffect(() => {
    if (mode === AppMode.PLOT_ROUTE && selectedCities.length === 0) {
        setSelectedCities(['', '']); // Start with two empty slots
    }
  }, [mode, selectedCities.length]);

  const calculateLogistics = useCallback((cityIds: string[]) => {
    const validCities = cityIds
        .map(id => CITIES.find(c => c.id === id))
        .filter(c => c !== undefined);
    
    if (validCities.length < 2) {
        setLogistics(null);
        return;
    }

    let totalDist = 0;
    for (let i = 0; i < validCities.length - 1; i++) {
        const start = validCities[i]!;
        const end = validCities[i+1]!;
        totalDist += calculateDistance(start.coords.lat, start.coords.lng, end.coords.lat, end.coords.lng);
    }

    setLogistics({
        totalDistanceKm: totalDist,
        daysByFoot: Math.ceil(totalDist / TRAVEL_SPEEDS.FOOT),
        daysByCaravan: Math.ceil(totalDist / TRAVEL_SPEEDS.CARAVAN),
        daysByHorse: Math.ceil(totalDist / TRAVEL_SPEEDS.HORSE)
    });
  }, []);

  // Update logistics whenever valid path changes
  useEffect(() => {
      if (mode === AppMode.PLOT_ROUTE) {
        const filledCities = selectedCities.filter(c => c !== '');
        if (filledCities.length >= 2) {
            calculateLogistics(filledCities);
        } else {
            setLogistics(null);
        }
      }
  }, [selectedCities, mode, calculateLogistics]);


  const handleCityClick = useCallback((cityId: string) => {
    if (mode === AppMode.EXPLORE) {
      setSelectedCities([cityId]);
      setAnalysis(null);
      setLogistics(null);
    } else if (mode === AppMode.PLOT_ROUTE) {
      // Logic: Find first empty slot and fill it. If full, append if < 5.
      setSelectedCities(prev => {
        const newSelection = [...prev];
        const firstEmptyIndex = newSelection.indexOf('');
        
        if (firstEmptyIndex !== -1) {
            newSelection[firstEmptyIndex] = cityId;
        } else if (newSelection.length < 5) {
            newSelection.push(cityId);
        } else {
            // If full (5), maybe replace last? Or just do nothing. Let's replace last for usability.
            newSelection[newSelection.length - 1] = cityId;
        }
        return newSelection;
      });
      setAnalysis(null); // Invalidate previous analysis
    }
  }, [mode]);

  const handleManualSelect = (index: number, cityId: string) => {
    setAnalysis(null);
    setSelectedCities(prev => {
      const newSelection = [...prev];
      newSelection[index] = cityId;
      return newSelection;
    });
  };

  const handleAddStop = () => {
      if (selectedCities.length < 5) {
          setSelectedCities(prev => [...prev, '']);
          setAnalysis(null);
      }
  };

  const handleRemoveStop = (index: number) => {
      setSelectedCities(prev => {
          const newSelection = prev.filter((_, i) => i !== index);
          // Ensure at least 2 slots remain if possible, or just let it shrink
          if (newSelection.length < 2) {
              while (newSelection.length < 2) {
                  newSelection.push('');
              }
          }
          return newSelection;
      });
      setAnalysis(null);
  };

  const handlePlotRoute = async () => {
    const validCities = selectedCities.filter(id => id !== '');
    if (validCities.length < 2) return;

    setIsLoading(true);
    setAnalysis(null);

    const cityNames = validCities.map(id => CITIES.find(c => c.id === id)?.name || 'Unknown');

    const result = await analyzeTradeRoute(cityNames);
    
    setAnalysis(result);
    setIsLoading(false);
  };

  const resetSelection = () => {
    setSelectedCities([]);
    setAnalysis(null);
    setLogistics(null);
  };

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row bg-[#f0f0f0] p-2 md:p-6 gap-4 overflow-hidden">
      {/* Left Column: Map */}
      <div className="flex-1 h-1/2 md:h-full min-h-[300px] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
        <SilkRoadMap 
            selectedCities={selectedCities.filter(c => c !== '')} 
            onCityClick={handleCityClick}
            mode={mode}
        />
      </div>

      {/* Right Column: Controls */}
      <div className="w-full md:w-[400px] h-1/2 md:h-full shrink-0">
        <InfoPanel 
            mode={mode}
            setMode={setMode}
            selectedCities={selectedCities}
            resetSelection={resetSelection}
            analysis={analysis}
            logistics={logistics}
            isLoading={isLoading}
            onPlotRoute={handlePlotRoute}
            onManualSelect={handleManualSelect}
            onAddStop={handleAddStop}
            onRemoveStop={handleRemoveStop}
        />
      </div>
    </div>
  );
};

export default App;