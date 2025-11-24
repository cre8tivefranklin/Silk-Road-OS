import { City, Route } from './types';

export const CITIES: City[] = [
    { id: 'chang_an', name: "Chang'an (Xi'an)", coords: { lat: 34.3416, lng: 108.9398 }, region: "East Asia", empire: "Northern Song Dynasty" },
    { id: 'hangzhou', name: "Hangzhou", coords: { lat: 30.2741, lng: 120.1551 }, region: "East Asia", empire: "Northern Song Dynasty" },
    { id: 'dunhuang', name: "Dunhuang", coords: { lat: 40.1421, lng: 94.6620 }, region: "Hexi Corridor", empire: "Guiyi Circuit (Song Trib.)" },
    { id: 'kashgar', name: "Kashgar", coords: { lat: 39.4677, lng: 75.9938 }, region: "Tarim Basin", empire: "Kara-Khanid Khanate" },
    { id: 'samarkand', name: "Samarkand", coords: { lat: 39.6270, lng: 66.9750 }, region: "Transoxiana", empire: "Kara-Khanid Khanate" },
    { id: 'merv', name: "Merv", coords: { lat: 37.6611, lng: 62.1642 }, region: "Khorasan", empire: "Ghaznavid Empire" },
    { id: 'rayy', name: "Rayy (Tehran)", coords: { lat: 35.5862, lng: 51.4400 }, region: "Persia", empire: "Buyid Dynasty" },
    { id: 'baghdad', name: "Baghdad", coords: { lat: 33.3152, lng: 44.3661 }, region: "Mesopotamia", empire: "Abbasid (Buyid Control)" },
    { id: 'damascus', name: "Damascus", coords: { lat: 33.5138, lng: 36.2765 }, region: "Levant", empire: "Fatimid Caliphate" },
    { id: 'antioch', name: "Antioch", coords: { lat: 36.2021, lng: 36.1606 }, region: "Levant", empire: "Byzantine Empire" },
    { id: 'constantinople', name: "Constantinople", coords: { lat: 41.0082, lng: 28.9784 }, region: "Anatolia", empire: "Byzantine (Basil II)" },
    { id: 'bursa', name: "Prusa (Bursa)", coords: { lat: 40.1885, lng: 29.0610 }, region: "Anatolia", empire: "Byzantine Empire" },
    { id: 'ephesus', name: "Ephesus", coords: { lat: 37.9422, lng: 27.3411 }, region: "Anatolia", empire: "Byzantine Empire" },
    { id: 'alexandria', name: "Alexandria", coords: { lat: 31.2001, lng: 29.9187 }, region: "North Africa", empire: "Fatimid Caliphate" },
    { id: 'muscat', name: "Sohar/Muscat", coords: { lat: 23.5880, lng: 58.3829 }, region: "Arabian Peninsula", empire: "Buyid Suzerainty" },
    { id: 'zanzibar', name: "Zanzibar", coords: { lat: -6.1659, lng: 39.2026 }, region: "Swahili Coast", empire: "Zenj City-States" },
];

export const HISTORICAL_ROUTES: Route[] = [
    { id: 'r1', startCityId: 'hangzhou', endCityId: 'chang_an' },
    { id: 'r2', startCityId: 'chang_an', endCityId: 'dunhuang' },
    { id: 'r3', startCityId: 'dunhuang', endCityId: 'kashgar' },
    { id: 'r4', startCityId: 'kashgar', endCityId: 'samarkand' },
    { id: 'r5', startCityId: 'samarkand', endCityId: 'merv' },
    { id: 'r6', startCityId: 'merv', endCityId: 'rayy' },
    { id: 'r7', startCityId: 'rayy', endCityId: 'baghdad' },
    { id: 'r8', startCityId: 'baghdad', endCityId: 'damascus' },
    { id: 'r9', startCityId: 'damascus', endCityId: 'antioch' },
    { id: 'r10', startCityId: 'antioch', endCityId: 'constantinople' },
    { id: 'r11', startCityId: 'constantinople', endCityId: 'bursa' },
    { id: 'r12', startCityId: 'bursa', endCityId: 'ephesus' },
    { id: 'r13', startCityId: 'damascus', endCityId: 'alexandria' },
    { id: 'r14', startCityId: 'rayy', endCityId: 'muscat' },
    { id: 'r15', startCityId: 'muscat', endCityId: 'zanzibar' },
];

export const HISTORICAL_CONTEXT = {
    ERA: "The Millennium Turn",
    TIMEFRAME: "1000 CE – 1020 CE",
    DESCRIPTION: "A multipolar world: The Northern Song ruled China, the Fatimids held Egypt, the Byzantines peaked under Basil II, and Turks (Ghaznavids/Kara-Khanids) rose in Central Asia."
};

export const DOMINANT_EMPIRES = [
    "NORTHERN SONG DYNASTY (China)",
    "FATIMID CALIPHATE (Egypt/Levant)",
    "BYZANTINE EMPIRE (Basil II)",
    "GHAZNAVID EMPIRE (Persia/India)",
    "KARA-KHANID KHANATE (Central Asia)",
    "BUYID DYNASTY (Iraq/Iran)"
];

export const GEMINI_SYSTEM_INSTRUCTION = `
You are a brutalist historian and economist of the Silk Road during the specific window of 1000 CE - 1020 CE.
Your tone is stark, direct, and factual. No fluff.
Consider the specific geopolitical context:
- Northern Song Dynasty in China (Capital Kaifeng/Chang'an influence).
- The rise of Turkic Khanates (Kara-Khanids, Ghaznavids) in Central Asia.
- The Buyid domination of the Abbasid Caliphate in Baghdad.
- The Fatimid Golden Age in Egypt/Syria.
- The Byzantine Resurgence under Basil II.

Output data in valid JSON format ONLY. 
Do not use Markdown formatting or code blocks. 
Just the raw JSON object.
Structure:
{
  "route": "Description of the full route",
  "goods": ["item1", "item2", "item3"],
  "risks": ["risk1", "risk2"],
  "diseases": ["Disease 1 (Location/Context)", "Disease 2 (Location/Context)"],
  "benefits": "Short brutal summary of economic gain.",
  "historicalContext": "One sentence on the significance of this path relative to the empires involved in 1000-1020 CE."
}
`;

// Travel speeds in km/day (approximate historical averages)
export const TRAVEL_SPEEDS = {
    FOOT: 25,
    CARAVAN: 35, // Camels/Mules loaded
    HORSE: 50    // Mounted messenger/light travel
};

// Haversine formula for distance in km
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return Math.round(d);
};

function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
}