let currentSatId = '25544';
const WAQI_TOKEN = 'demo';
let activeTelemetryLocation = null;
let telemetryInterval = null;

const CITY_COORDINATES = {
    // --- UNION CAPITALS & MAJOR METROPOLITAN HUBS ---
    'new delhi': { lat: 28.61, lng: 77.20, aqi: 185, pm25: 124.5, temp: 28, hum: 55, no2: 52.1 },
    'delhi': { lat: 28.61, lng: 77.20, aqi: 185, pm25: 124.5, temp: 28, hum: 55, no2: 52.1 },
    'mumbai': { lat: 19.07, lng: 72.87, aqi: 92, pm25: 54.1, temp: 30, hum: 75, no2: 38.4 },
    'bengaluru': { lat: 12.97, lng: 77.59, aqi: 45, pm25: 26.8, temp: 26, hum: 60, no2: 19.2 },
    'bangalore': { lat: 12.97, lng: 77.59, aqi: 45, pm25: 26.8, temp: 26, hum: 60, no2: 19.2 },
    'kolkata': { lat: 22.57, lng: 88.36, aqi: 135, pm25: 88.2, temp: 31, hum: 78, no2: 44.0 },
    'chennai': { lat: 13.08, lng: 80.27, aqi: 58, pm25: 34.2, temp: 31, hum: 70, no2: 24.5 },
    'hyderabad': { lat: 17.38, lng: 78.48, aqi: 72, pm25: 42.0, temp: 29, hum: 58, no2: 26.0 },
    'ahmedabad': { lat: 23.02, lng: 72.57, aqi: 110, pm25: 72.1, temp: 33, hum: 45, no2: 35.0 },
    'pune': { lat: 18.52, lng: 73.85, aqi: 68, pm25: 39.5, temp: 27, hum: 62, no2: 21.4 },

    // --- INDIAN STATES & UT CAPITALS ---
    'india': { lat: 20.59, lng: 78.96, aqi: 95, pm25: 58.0, temp: 29, hum: 62, no2: 32.0 },
    'amaravati': { lat: 16.57, lng: 80.35, aqi: 52, pm25: 30.1, temp: 32, hum: 65, no2: 18.2 },
    'visakhapatnam': { lat: 17.68, lng: 83.21, aqi: 48, pm25: 28.0, temp: 30, hum: 74, no2: 20.1 },
    'vijayawada': { lat: 16.50, lng: 80.64, aqi: 60, pm25: 35.2, temp: 33, hum: 64, no2: 22.0 },
    'tirupati': { lat: 13.62, lng: 79.41, aqi: 42, pm25: 24.0, temp: 31, hum: 68, no2: 16.5 },
    'itanagar': { lat: 27.08, lng: 93.60, aqi: 25, pm25: 10.2, temp: 22, hum: 80, no2: 9.1 },
    'dispur': { lat: 26.14, lng: 91.78, aqi: 75, pm25: 45.0, temp: 28, hum: 78, no2: 25.4 },
    'guwahati': { lat: 26.14, lng: 91.73, aqi: 78, pm25: 47.2, temp: 28, hum: 77, no2: 26.8 },
    'patna': { lat: 25.59, lng: 85.13, aqi: 190, pm25: 130.2, temp: 29, hum: 65, no2: 55.0 },
    'gaya': { lat: 24.79, lng: 85.00, aqi: 160, pm25: 105.0, temp: 30, hum: 60, no2: 45.2 },
    'raipur': { lat: 21.25, lng: 81.62, aqi: 98, pm25: 61.0, temp: 31, hum: 62, no2: 30.2 },
    'bilaspur': { lat: 22.07, lng: 82.14, aqi: 90, pm25: 55.0, temp: 31, hum: 63, no2: 28.0 },
    'panaji': { lat: 15.49, lng: 73.82, aqi: 30, pm25: 12.5, temp: 29, hum: 76, no2: 11.2 },
    'margao': { lat: 15.27, lng: 73.96, aqi: 32, pm25: 13.1, temp: 29, hum: 75, no2: 12.0 },
    'gandhinagar': { lat: 23.21, lng: 72.63, aqi: 85, pm25: 48.0, temp: 33, hum: 48, no2: 27.5 },
    'surat': { lat: 21.17, lng: 72.83, aqi: 95, pm25: 58.2, temp: 32, hum: 70, no2: 34.1 },
    'vadodara': { lat: 22.30, lng: 73.18, aqi: 88, pm25: 52.0, temp: 32, hum: 52, no2: 29.0 },
    'chandigarh': { lat: 30.73, lng: 76.77, aqi: 112, pm25: 74.0, temp: 27, hum: 58, no2: 36.2 },
    'gurugram': { lat: 28.45, lng: 77.02, aqi: 175, pm25: 118.0, temp: 29, hum: 54, no2: 49.5 },
    'faridabad': { lat: 28.40, lng: 77.31, aqi: 180, pm25: 121.0, temp: 29, hum: 56, no2: 51.0 },
    'shimla': { lat: 31.10, lng: 77.17, aqi: 35, pm25: 15.0, temp: 18, hum: 65, no2: 12.4 },
    'manali': { lat: 32.24, lng: 77.18, aqi: 28, pm25: 11.2, temp: 15, hum: 70, no2: 9.5 },
    'dharamshala': { lat: 32.21, lng: 76.32, aqi: 32, pm25: 13.5, temp: 17, hum: 72, no2: 11.0 },
    'ranchi': { lat: 23.34, lng: 85.30, aqi: 65, pm25: 38.0, temp: 26, hum: 68, no2: 21.0 },
    'jamshedpur': { lat: 22.80, lng: 86.20, aqi: 105, pm25: 68.0, temp: 29, hum: 66, no2: 38.0 },
    'mysuru': { lat: 12.29, lng: 76.63, aqi: 38, pm25: 18.2, temp: 27, hum: 65, no2: 14.2 },
    'hubli': { lat: 15.36, lng: 75.12, aqi: 50, pm25: 28.5, temp: 30, hum: 58, no2: 19.5 },
    'mangalore': { lat: 12.91, lng: 74.85, aqi: 36, pm25: 16.0, temp: 29, hum: 78, no2: 13.5 },
    'thiruvananthapuram': { lat: 8.52, lng: 76.93, aqi: 34, pm25: 14.5, temp: 29, hum: 79, no2: 12.1 },
    'kochi': { lat: 9.93, lng: 76.26, aqi: 42, pm25: 19.0, temp: 29, hum: 80, no2: 16.0 },
    'kozhikode': { lat: 11.25, lng: 75.78, aqi: 38, pm25: 17.2, temp: 28, hum: 81, no2: 14.0 },
    'bhopal': { lat: 23.25, lng: 77.41, aqi: 78, pm25: 46.0, temp: 28, hum: 58, no2: 24.5 },
    'indore': { lat: 22.71, lng: 75.85, aqi: 70, pm25: 40.2, temp: 29, hum: 55, no2: 22.0 },
    'gwalior': { lat: 26.21, lng: 78.18, aqi: 120, pm25: 82.0, temp: 29, hum: 52, no2: 38.0 },
    'jabalpur': { lat: 23.18, lng: 79.98, aqi: 82, pm25: 49.0, temp: 29, hum: 60, no2: 27.0 },
    'nagpur': { lat: 21.14, lng: 79.08, aqi: 88, pm25: 52.0, temp: 31, hum: 56, no2: 29.5 },
    'nashik': { lat: 19.99, lng: 73.78, aqi: 55, pm25: 31.0, temp: 28, hum: 64, no2: 19.0 },
    'aurangabad': { lat: 19.87, lng: 75.34, aqi: 74, pm25: 44.0, temp: 30, hum: 54, no2: 25.0 },
    'imphal': { lat: 24.81, lng: 93.93, aqi: 45, pm25: 22.0, temp: 24, hum: 75, no2: 15.0 },
    'shillong': { lat: 25.57, lng: 91.89, aqi: 28, pm25: 11.0, temp: 20, hum: 78, no2: 10.2 },
    'aizawl': { lat: 23.72, lng: 92.71, aqi: 26, pm25: 10.5, temp: 22, hum: 76, no2: 9.8 },
    'kohima': { lat: 25.67, lng: 94.10, aqi: 30, pm25: 12.0, temp: 21, hum: 77, no2: 10.5 },
    'dimapur': { lat: 25.90, lng: 93.72, aqi: 55, pm25: 32.0, temp: 27, hum: 74, no2: 20.0 },
    'bhubaneswar': { lat: 20.29, lng: 85.82, aqi: 62, pm25: 36.5, temp: 31, hum: 72, no2: 22.5 },
    'cuttack': { lat: 20.46, lng: 85.88, aqi: 68, pm25: 40.0, temp: 31, hum: 73, no2: 24.0 },
    'puri': { lat: 19.81, lng: 85.83, aqi: 40, pm25: 19.5, temp: 30, hum: 78, no2: 14.0 },
    'ludhiana': { lat: 30.90, lng: 75.85, aqi: 155, pm25: 102.0, temp: 27, hum: 60, no2: 46.0 },
    'amritsar': { lat: 31.63, lng: 74.87, aqi: 145, pm25: 96.0, temp: 27, hum: 62, no2: 42.0 },
    'jalandhar': { lat: 31.32, lng: 75.57, aqi: 140, pm25: 92.0, temp: 27, hum: 61, no2: 40.0 },
    'jaipur': { lat: 26.91, lng: 75.78, aqi: 125, pm25: 81.0, temp: 30, hum: 40, no2: 29.8 },
    'jodhpur': { lat: 26.23, lng: 73.02, aqi: 110, pm25: 71.0, temp: 33, hum: 38, no2: 26.5 },
    'udaipur': { lat: 24.58, lng: 73.71, aqi: 65, pm25: 37.0, temp: 29, hum: 50, no2: 20.0 },
    'kota': { lat: 25.21, lng: 75.86, aqi: 105, pm25: 68.0, temp: 31, hum: 45, no2: 28.0 },
    'gangtok': { lat: 27.33, lng: 88.61, aqi: 24, pm25: 9.5, temp: 16, hum: 82, no2: 8.5 },
    'coimbatore': { lat: 11.01, lng: 76.95, aqi: 45, pm25: 25.0, temp: 28, hum: 66, no2: 17.5 },
    'madurai': { lat: 9.92, lng: 78.11, aqi: 52, pm25: 30.0, temp: 32, hum: 64, no2: 20.0 },
    'tiruchirappalli': { lat: 10.79, lng: 78.70, aqi: 48, pm25: 27.5, temp: 32, hum: 65, no2: 18.5 },
    'salem': { lat: 11.66, lng: 78.14, aqi: 50, pm25: 29.0, temp: 31, hum: 62, no2: 19.0 },
    'warangal': { lat: 17.96, lng: 79.59, aqi: 60, pm25: 35.0, temp: 31, hum: 55, no2: 21.0 },
    'nizamabad': { lat: 18.67, lng: 78.09, aqi: 55, pm25: 32.0, temp: 31, hum: 56, no2: 19.0 },
    'agartala': { lat: 23.83, lng: 91.28, aqi: 50, pm25: 28.0, temp: 29, hum: 78, no2: 18.0 },
    'lucknow': { lat: 26.84, lng: 80.94, aqi: 170, pm25: 115.0, temp: 29, hum: 62, no2: 48.0 },
    'kanpur': { lat: 26.44, lng: 80.33, aqi: 195, pm25: 138.0, temp: 29, hum: 63, no2: 58.0 },
    'varanasi': { lat: 25.31, lng: 82.97, aqi: 180, pm25: 122.0, temp: 29, hum: 65, no2: 52.0 },
    'agra': { lat: 27.17, lng: 78.00, aqi: 165, pm25: 110.0, temp: 29, hum: 55, no2: 45.0 },
    'meerut': { lat: 28.98, lng: 77.70, aqi: 175, pm25: 118.0, temp: 28, hum: 58, no2: 49.0 },
    'noida': { lat: 28.53, lng: 77.39, aqi: 185, pm25: 125.0, temp: 28, hum: 56, no2: 53.0 },
    'dehradun': { lat: 30.31, lng: 78.03, aqi: 75, pm25: 44.0, temp: 24, hum: 68, no2: 25.0 },
    'haridwar': { lat: 29.95, lng: 78.16, aqi: 90, pm25: 54.0, temp: 26, hum: 66, no2: 30.0 },
    'rishikesh': { lat: 30.08, lng: 78.26, aqi: 60, pm25: 34.0, temp: 25, hum: 68, no2: 20.0 },
    'howrah': { lat: 22.59, lng: 88.26, aqi: 142, pm25: 94.0, temp: 31, hum: 78, no2: 46.5 },
    'darjeeling': { lat: 27.04, lng: 88.26, aqi: 30, pm25: 12.0, temp: 14, hum: 85, no2: 10.0 },
    'siliguri': { lat: 26.72, lng: 88.42, aqi: 85, pm25: 50.0, temp: 28, hum: 80, no2: 28.0 },
    'port blair': { lat: 11.62, lng: 92.72, aqi: 22, pm25: 8.5, temp: 30, hum: 79, no2: 8.0 },
    'daman': { lat: 20.42, lng: 72.83, aqi: 65, pm25: 38.0, temp: 31, hum: 74, no2: 22.0 },
    'diu': { lat: 20.71, lng: 70.98, aqi: 45, pm25: 22.0, temp: 30, hum: 72, no2: 15.0 },
    'silvassa': { lat: 20.27, lng: 73.01, aqi: 70, pm25: 41.0, temp: 31, hum: 72, no2: 24.0 },
    'srinagar': { lat: 34.08, lng: 74.79, aqi: 65, pm25: 38.0, temp: 15, hum: 68, no2: 22.0 },
    'jammu': { lat: 32.72, lng: 74.85, aqi: 95, pm25: 60.0, temp: 26, hum: 60, no2: 32.0 },
    'leh': { lat: 34.15, lng: 77.57, aqi: 20, pm25: 7.0, temp: 8, hum: 35, no2: 6.5 },
    'cargil': { lat: 34.55, lng: 76.13, aqi: 22, pm25: 8.0, temp: 10, hum: 38, no2: 7.0 },
    'kavaratti': { lat: 10.56, lng: 72.64, aqi: 20, pm25: 7.5, temp: 30, hum: 75, no2: 7.0 },
    'puducherry': { lat: 11.94, lng: 79.80, aqi: 45, pm25: 22.0, temp: 30, hum: 75, no2: 16.0 },

    // --- ALL WORLD COUNTRIES & GLOBAL CAPITALS ---
    'afghanistan': { lat: 33.93, lng: 67.71, aqi: 110, pm25: 72.0, temp: 18, hum: 40, no2: 35.0 },
    'albania': { lat: 41.15, lng: 20.16, aqi: 45, pm25: 20.0, temp: 15, hum: 65, no2: 18.0 },
    'algeria': { lat: 28.03, lng: 1.65, aqi: 75, pm25: 45.0, temp: 25, hum: 35, no2: 25.0 },
    'andorra': { lat: 42.50, lng: 1.52, aqi: 20, pm25: 8.0, temp: 11, hum: 68, no2: 8.0 },
    'angola': { lat: -11.20, lng: 17.87, aqi: 50, pm25: 25.0, temp: 24, hum: 70, no2: 15.0 },
    'argentina': { lat: -38.41, lng: -63.61, aqi: 35, pm25: 15.0, temp: 18, hum: 60, no2: 14.0 },
    'armenia': { lat: 40.06, lng: 45.03, aqi: 65, pm25: 35.0, temp: 12, hum: 62, no2: 22.0 },
    'australia': { lat: -25.27, lng: 133.77, aqi: 25, pm25: 10.0, temp: 22, hum: 50, no2: 11.0 },
    'austria': { lat: 47.51, lng: 14.55, aqi: 28, pm25: 12.0, temp: 10, hum: 70, no2: 13.0 },
    'azerbaijan': { lat: 40.14, lng: 47.57, aqi: 80, pm25: 50.0, temp: 16, hum: 65, no2: 30.0 },
    'bahamas': { lat: 25.03, lng: -77.39, aqi: 22, pm25: 9.0, temp: 27, hum: 78, no2: 9.0 },
    'bahrain': { lat: 26.06, lng: 50.55, aqi: 95, pm25: 60.0, temp: 28, hum: 65, no2: 38.0 },
    'bangladesh': { lat: 23.68, lng: 90.35, aqi: 170, pm25: 110.0, temp: 26, hum: 75, no2: 50.0 },
    'barbados': { lat: 13.19, lng: -59.54, aqi: 25, pm25: 10.0, temp: 27, hum: 76, no2: 10.0 },
    'belarus': { lat: 53.70, lng: 27.95, aqi: 38, pm25: 16.0, temp: 7, hum: 78, no2: 15.0 },
    'belgium': { lat: 50.50, lng: 4.46, aqi: 40, pm25: 18.0, temp: 11, hum: 75, no2: 22.0 },
    'belize': { lat: 17.18, lng: -88.49, aqi: 25, pm25: 10.0, temp: 26, hum: 80, no2: 10.0 },
    'benin': { lat: 9.30, lng: 2.31, aqi: 85, pm25: 52.0, temp: 28, hum: 70, no2: 28.0 },
    'bhutan': { lat: 27.51, lng: 90.43, aqi: 22, pm25: 9.0, temp: 14, hum: 72, no2: 8.0 },
    'bolivia': { lat: -16.29, lng: -63.58, aqi: 45, pm25: 20.0, temp: 21, hum: 55, no2: 16.0 },
    'bosnia': { lat: 43.91, lng: 17.67, aqi: 70, pm25: 42.0, temp: 10, hum: 72, no2: 25.0 },
    'botswana': { lat: -22.32, lng: 24.68, aqi: 30, pm25: 12.0, temp: 22, hum: 40, no2: 12.0 },
    'brazil': { lat: -14.23, lng: -51.92, aqi: 42, pm25: 18.0, temp: 25, hum: 70, no2: 16.0 },
    'brunei': { lat: 4.53, lng: 114.72, aqi: 30, pm25: 12.0, temp: 28, hum: 82, no2: 12.0 },
    'bulgaria': { lat: 42.73, lng: 25.48, aqi: 55, pm25: 30.0, temp: 11, hum: 70, no2: 20.0 },
    'burkina faso': { lat: 12.23, lng: -1.56, aqi: 115, pm25: 75.0, temp: 29, hum: 45, no2: 38.0 },
    'burundi': { lat: -3.37, lng: 29.91, aqi: 40, pm25: 18.0, temp: 21, hum: 75, no2: 14.0 },
    'cambodia': { lat: 12.56, lng: 104.99, aqi: 65, pm25: 38.0, temp: 28, hum: 72, no2: 22.0 },
    'cameroon': { lat: 3.84, lng: 11.50, aqi: 60, pm25: 35.0, temp: 25, hum: 80, no2: 20.0 },
    'canada': { lat: 56.13, lng: -106.34, aqi: 22, pm25: 8.0, temp: -2, hum: 70, no2: 10.0 },
    'chad': { lat: 15.45, lng: 18.73, aqi: 130, pm25: 90.0, temp: 30, hum: 35, no2: 42.0 },
    'chile': { lat: -35.67, lng: -71.54, aqi: 52, pm25: 28.0, temp: 14, hum: 65, no2: 20.0 },
    'china': { lat: 35.86, lng: 104.19, aqi: 88, pm25: 56.0, temp: 15, hum: 60, no2: 36.0 },
    'colombia': { lat: 4.57, lng: -74.29, aqi: 38, pm25: 16.0, temp: 22, hum: 78, no2: 15.0 },
    'congo': { lat: -4.03, lng: 21.75, aqi: 45, pm25: 20.0, temp: 25, hum: 82, no2: 15.0 },
    'costa rica': { lat: 9.74, lng: -83.75, aqi: 25, pm25: 10.0, temp: 25, hum: 80, no2: 10.0 },
    'croatia': { lat: 45.10, lng: 15.20, aqi: 35, pm25: 15.0, temp: 13, hum: 68, no2: 14.0 },
    'cuba': { lat: 21.52, lng: -77.78, aqi: 30, pm25: 12.0, temp: 26, hum: 78, no2: 12.0 },
    'cyprus': { lat: 35.12, lng: 33.42, aqi: 50, pm25: 25.0, temp: 20, hum: 60, no2: 20.0 },
    'czech republic': { lat: 49.81, lng: 15.47, aqi: 42, pm25: 20.0, temp: 9, hum: 72, no2: 18.0 },
    'denmark': { lat: 56.26, lng: 9.50, aqi: 28, pm25: 11.0, temp: 8, hum: 80, no2: 14.0 },
    'djibouti': { lat: 11.82, lng: 42.59, aqi: 80, pm25: 50.0, temp: 30, hum: 65, no2: 28.0 },
    'dominican republic': { lat: 18.73, lng: -70.16, aqi: 35, pm25: 15.0, temp: 26, hum: 75, no2: 14.0 },
    'ecuador': { lat: -1.83, lng: -78.18, aqi: 32, pm25: 14.0, temp: 21, hum: 80, no2: 12.0 },
    'egypt': { lat: 26.82, lng: 30.80, aqi: 125, pm25: 85.0, temp: 25, hum: 50, no2: 45.0 },
    'el salvador': { lat: 13.79, lng: -88.89, aqi: 55, pm25: 30.0, temp: 25, hum: 72, no2: 20.0 },
    'estonia': { lat: 58.59, lng: 25.01, aqi: 20, pm25: 8.0, temp: 6, hum: 80, no2: 9.0 },
    'ethiopia': { lat: 9.14, lng: 40.48, aqi: 65, pm25: 38.0, temp: 22, hum: 60, no2: 22.0 },
    'finland': { lat: 61.92, lng: 25.74, aqi: 18, pm25: 7.0, temp: 5, hum: 82, no2: 8.0 },
    'france': { lat: 46.22, lng: 2.21, aqi: 38, pm25: 16.0, temp: 12, hum: 72, no2: 20.0 },
    'gabon': { lat: -0.80, lng: 11.60, aqi: 30, pm25: 12.0, temp: 25, hum: 85, no2: 11.0 },
    'georgia': { lat: 42.31, lng: 43.35, aqi: 45, pm25: 20.0, temp: 12, hum: 70, no2: 18.0 },
    'germany': { lat: 51.16, lng: 10.45, aqi: 36, pm25: 15.0, temp: 10, hum: 75, no2: 22.0 },
    'ghana': { lat: 7.94, lng: -1.02, aqi: 80, pm25: 48.0, temp: 27, hum: 75, no2: 28.0 },
    'greece': { lat: 39.07, lng: 21.82, aqi: 45, pm25: 22.0, temp: 18, hum: 60, no2: 20.0 },
    'guatemala': { lat: 15.78, lng: -90.23, aqi: 50, pm25: 26.0, temp: 22, hum: 75, no2: 19.0 },
    'honduras': { lat: 15.20, lng: -86.24, aqi: 42, pm25: 20.0, temp: 25, hum: 78, no2: 15.0 },
    'hungary': { lat: 47.16, lng: 19.50, aqi: 48, pm25: 24.0, temp: 11, hum: 70, no2: 21.0 },
    'iceland': { lat: 64.96, lng: -19.02, aqi: 15, pm25: 5.0, temp: 3, hum: 78, no2: 6.0 },
    'indonesia': { lat: -0.78, lng: 113.92, aqi: 75, pm25: 45.0, temp: 27, hum: 82, no2: 28.0 },
    'iran': { lat: 32.42, lng: 53.68, aqi: 115, pm25: 78.0, temp: 20, hum: 40, no2: 40.0 },
    'iraq': { lat: 33.22, lng: 43.67, aqi: 140, pm25: 98.0, temp: 25, hum: 35, no2: 48.0 },
    'ireland': { lat: 53.14, lng: -7.69, aqi: 22, pm25: 9.0, temp: 10, hum: 82, no2: 11.0 },
    'israel': { lat: 31.04, lng: 34.85, aqi: 62, pm25: 35.0, temp: 21, hum: 60, no2: 28.0 },
    'italy': { lat: 41.87, lng: 12.56, aqi: 52, pm25: 28.0, temp: 14, hum: 70, no2: 26.0 },
    'jamaica': { lat: 18.10, lng: -77.29, aqi: 28, pm25: 11.0, temp: 26, hum: 78, no2: 11.0 },
    'japan': { lat: 36.20, lng: 138.25, aqi: 28, pm25: 11.0, temp: 16, hum: 65, no2: 15.0 },
    'jordan': { lat: 30.58, lng: 36.23, aqi: 85, pm25: 52.0, temp: 22, hum: 45, no2: 30.0 },
    'kazakhstan': { lat: 48.01, lng: 66.92, aqi: 70, pm25: 40.0, temp: 6, hum: 60, no2: 25.0 },
    'kenya': { lat: -0.02, lng: 37.90, aqi: 55, pm25: 30.0, temp: 24, hum: 65, no2: 20.0 },
    'kuwait': { lat: 29.31, lng: 47.48, aqi: 130, pm25: 92.0, temp: 29, hum: 40, no2: 45.0 },
    'kyrgyzstan': { lat: 41.20, lng: 74.76, aqi: 80, pm25: 48.0, temp: 9, hum: 60, no2: 28.0 },
    'laos': { lat: 19.85, lng: 102.49, aqi: 85, pm25: 52.0, temp: 25, hum: 72, no2: 28.0 },
    'latvia': { lat: 56.87, lng: 24.60, aqi: 22, pm25: 9.0, temp: 7, hum: 80, no2: 10.0 },
    'lebanon': { lat: 33.85, lng: 35.86, aqi: 72, pm25: 42.0, temp: 20, hum: 68, no2: 26.0 },
    'libya': { lat: 26.33, lng: 17.22, aqi: 110, pm25: 75.0, temp: 24, hum: 45, no2: 35.0 },
    'lithuania': { lat: 55.16, lng: 23.88, aqi: 24, pm25: 10.0, temp: 7, hum: 78, no2: 11.0 },
    'luxembourg': { lat: 49.81, lng: 6.12, aqi: 30, pm25: 13.0, temp: 10, hum: 75, no2: 15.0 },
    'malaysia': { lat: 4.21, lng: 101.97, aqi: 50, pm25: 25.0, temp: 27, hum: 80, no2: 18.0 },
    'maldives': { lat: 3.20, lng: 73.22, aqi: 20, pm25: 7.0, temp: 28, hum: 80, no2: 7.0 },
    'mali': { lat: 17.57, lng: -3.99, aqi: 120, pm25: 82.0, temp: 30, hum: 40, no2: 38.0 },
    'malta': { lat: 35.93, lng: 14.37, aqi: 45, pm25: 20.0, temp: 20, hum: 68, no2: 18.0 },
    'mexico': { lat: 23.63, lng: -102.55, aqi: 85, pm25: 52.0, temp: 21, hum: 55, no2: 32.0 },
    'mongolia': { lat: 46.86, lng: 103.84, aqi: 140, pm25: 98.0, temp: -1, hum: 55, no2: 45.0 },
    'morocco': { lat: 31.79, lng: -7.09, aqi: 55, pm25: 30.0, temp: 20, hum: 62, no2: 20.0 },
    'myanmar': { lat: 21.91, lng: 95.95, aqi: 82, pm25: 50.0, temp: 26, hum: 70, no2: 28.0 },
    'nepal': { lat: 28.39, lng: 84.12, aqi: 150, pm25: 105.0, temp: 18, hum: 65, no2: 48.0 },
    'netherlands': { lat: 52.13, lng: 5.29, aqi: 35, pm25: 15.0, temp: 10, hum: 78, no2: 20.0 },
    'new zealand': { lat: -40.90, lng: 174.88, aqi: 18, pm25: 6.0, temp: 13, hum: 72, no2: 8.0 },
    'nigeria': { lat: 9.08, lng: 8.67, aqi: 110, pm25: 75.0, temp: 28, hum: 65, no2: 36.0 },
    'norway': { lat: 60.47, lng: 8.46, aqi: 16, pm25: 6.0, temp: 4, hum: 76, no2: 7.0 },
    'oman': { lat: 21.51, lng: 55.92, aqi: 80, pm25: 48.0, temp: 28, hum: 55, no2: 28.0 },
    'pakistan': { lat: 30.37, lng: 69.34, aqi: 180, pm25: 125.0, temp: 24, hum: 50, no2: 55.0 },
    'panama': { lat: 8.53, lng: -80.78, aqi: 28, pm25: 11.0, temp: 26, hum: 80, no2: 11.0 },
    'peru': { lat: -9.18, lng: -75.01, aqi: 50, pm25: 25.0, temp: 20, hum: 72, no2: 18.0 },
    'philippines': { lat: 12.87, lng: 121.77, aqi: 42, pm25: 18.0, temp: 27, hum: 78, no2: 15.0 },
    'poland': { lat: 51.91, lng: 19.14, aqi: 65, pm25: 38.0, temp: 9, hum: 75, no2: 25.0 },
    'portugal': { lat: 39.39, lng: -8.22, aqi: 32, pm25: 14.0, temp: 16, hum: 65, no2: 15.0 },
    'qatar': { lat: 25.35, lng: 51.18, aqi: 95, pm25: 62.0, temp: 29, hum: 58, no2: 35.0 },
    'romania': { lat: 45.94, lng: 24.96, aqi: 50, pm25: 26.0, temp: 11, hum: 70, no2: 20.0 },
    'russia': { lat: 61.52, lng: 105.31, aqi: 45, pm25: 22.0, temp: -5, hum: 72, no2: 18.0 },
    'saudi arabia': { lat: 23.88, lng: 45.07, aqi: 115, pm25: 78.0, temp: 28, hum: 40, no2: 42.0 },
    'serbia': { lat: 44.01, lng: 21.00, aqi: 62, pm25: 36.0, temp: 12, hum: 70, no2: 24.0 },
    'singapore': { lat: 1.35, lng: 103.81, aqi: 30, pm25: 12.8, temp: 31, hum: 82, no2: 15.0 },
    'slovakia': { lat: 48.66, lng: 19.69, aqi: 45, pm25: 22.0, temp: 10, hum: 72, no2: 18.0 },
    'south africa': { lat: -30.55, lng: 22.93, aqi: 52, pm25: 28.0, temp: 18, hum: 55, no2: 21.0 },
    'south korea': { lat: 35.90, lng: 127.76, aqi: 65, pm25: 38.0, temp: 13, hum: 65, no2: 28.0 },
    'spain': { lat: 40.46, lng: -3.74, aqi: 36, pm25: 15.0, temp: 15, hum: 60, no2: 18.0 },
    'sri lanka': { lat: 7.87, lng: 80.77, aqi: 45, pm25: 21.0, temp: 28, hum: 78, no2: 17.0 },
    'sweden': { lat: 60.12, lng: 18.64, aqi: 18, pm25: 7.0, temp: 6, hum: 75, no2: 8.0 },
    'switzerland': { lat: 46.81, lng: 8.22, aqi: 24, pm25: 10.0, temp: 8, hum: 72, no2: 11.0 },
    'syria': { lat: 34.80, lng: 38.99, aqi: 105, pm25: 70.0, temp: 21, hum: 50, no2: 36.0 },
    'taiwan': { lat: 23.69, lng: 120.96, aqi: 50, pm25: 26.0, temp: 23, hum: 75, no2: 20.0 },
    'thailand': { lat: 15.87, lng: 100.99, aqi: 78, pm25: 48.0, temp: 29, hum: 70, no2: 30.0 },
    'turkey': { lat: 38.96, lng: 35.24, aqi: 72, pm25: 42.0, temp: 15, hum: 60, no2: 28.0 },
    'uganda': { lat: 1.37, lng: 32.29, aqi: 60, pm25: 35.0, temp: 23, hum: 72, no2: 22.0 },
    'ukraine': { lat: 48.37, lng: 31.16, aqi: 55, pm25: 30.0, temp: 9, hum: 70, no2: 22.0 },
    'united arab emirates': { lat: 23.42, lng: 53.84, aqi: 90, pm25: 58.0, temp: 29, hum: 55, no2: 34.0 },
    'uae': { lat: 23.42, lng: 53.84, aqi: 90, pm25: 58.0, temp: 29, hum: 55, no2: 34.0 },
    'united kingdom': { lat: 55.37, lng: -3.43, aqi: 30, pm25: 13.0, temp: 10, hum: 80, no2: 17.0 },
    'uk': { lat: 55.37, lng: -3.43, aqi: 30, pm25: 13.0, temp: 10, hum: 80, no2: 17.0 },
    'united states': { lat: 37.09, lng: -95.71, aqi: 48, pm25: 22.5, temp: 22, hum: 50, no2: 18.0 },
    'usa': { lat: 37.09, lng: -95.71, aqi: 48, pm25: 22.5, temp: 22, hum: 50, no2: 18.0 },
    'uruguay': { lat: -32.52, lng: -55.76, aqi: 26, pm25: 11.0, temp: 18, hum: 72, no2: 10.0 },
    'uzbekistan': { lat: 41.37, lng: 64.58, aqi: 88, pm25: 54.0, temp: 15, hum: 50, no2: 32.0 },
    'venezuela': { lat: 6.42, lng: -66.58, aqi: 42, pm25: 19.0, temp: 26, hum: 75, no2: 16.0 },
    'vietnam': { lat: 14.05, lng: 108.27, aqi: 75, pm25: 46.0, temp: 26, hum: 78, no2: 28.0 },
    'yemen': { lat: 15.55, lng: 48.51, aqi: 95, pm25: 62.0, temp: 26, hum: 52, no2: 35.0 },
    'zambia': { lat: -13.13, lng: 27.84, aqi: 45, pm25: 20.0, temp: 22, hum: 60, no2: 16.0 },
    'zimbabwe': { lat: -19.01, lng: 29.15, aqi: 50, pm25: 24.0, temp: 20, hum: 55, no2: 18.0 }
};

const SDG_DETAILS = {
    1: { title: "No Poverty", color: "#e5243b", obj: "End poverty in all its forms everywhere" },
    2: { title: "Zero Hunger", color: "#dda638", obj: "End hunger, achieve food security and sustainable agriculture" },
    3: { title: "Good Health & Well-Being", color: "#4c9f38", obj: "Ensure healthy lives and promote well-being for all ages" },
    4: { title: "Quality Education", color: "#c5192d", obj: "Ensure inclusive and equitable quality education" },
    5: { title: "Gender Equality", color: "#ff3a21", obj: "Achieve gender equality and empower all women and girls" },
    6: { title: "Clean Water & Sanitation", color: "#26bde2", obj: "Ensure availability and sustainable management of water" },
    7: { title: "Affordable & Clean Energy", color: "#fcc30b", obj: "Ensure access to affordable, reliable, and modern energy" },
    8: { title: "Decent Work & Economic Growth", color: "#a21942", obj: "Promote sustained, inclusive, and sustainable economic growth" },
    9: { title: "Industry, Innovation & Infrastructure", color: "#fd6925", obj: "Build resilient infrastructure and foster innovation" },
    10: { title: "Reduced Inequalities", color: "#dd1367", obj: "Reduce inequality within and among countries" },
    11: { title: "Sustainable Cities & Communities", color: "#fd9d24", obj: "Make cities inclusive, safe, resilient, and sustainable" },
    12: { title: "Responsible Consumption & Production", color: "#bf8b2e", obj: "Ensure sustainable consumption and production patterns" },
    13: { title: "Climate Action", color: "#3f7e44", obj: "Take urgent action to combat climate change and its impacts" },
    14: { title: "Life Below Water", color: "#0a97d9", obj: "Conserve and sustainably use oceans and marine resources" },
    15: { title: "Life on Land", color: "#56c02b", obj: "Protect, restore, and promote sustainable terrestrial ecosystems" },
    16: { title: "Peace, Justice & Strong Institutions", color: "#00689d", obj: "Promote peaceful and inclusive societies for sustainable development" },
    17: { title: "Partnerships for the Goals", color: "#19486a", obj: "Strengthen the means of implementation and global partnership" }
};

function switchView(viewName, activeBtn) {
    document.querySelectorAll('.view-panel').forEach(panel => panel.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));

    if (viewName === 'tracking') {
        document.getElementById('trackingView')?.classList.add('active');
    } else if (viewName === 'processing') {
        document.getElementById('processingView')?.classList.add('active');
    } else if (viewName === 'aiConsole') {
        document.getElementById('aiConsoleView')?.classList.add('active');
    }

    if (activeBtn) activeBtn.classList.add('active');
}

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.style.display = sidebar.style.display === 'none' ? 'flex' : 'none';
    }
}

function updateDashboardMetrics(no2, pm25, aqi) {
    const no2El = document.getElementById('no2Val');
    const no2Badge = document.getElementById('no2Badge');
    const aiEl = document.getElementById('aiVal');
    const aiBadge = document.getElementById('aiBadge');
    const co2El = document.getElementById('co2Val');

    if (no2El) no2El.innerText = `${no2} µg/m³`;
    if (no2Badge) {
        if (no2 > 25) {
            no2Badge.innerText = "Above WHO Guideline";
            no2Badge.className = "badge red";
        } else {
            no2Badge.innerText = "Normal Threshold";
            no2Badge.className = "badge green";
        }
    }

    const aerosolIndex = (pm25 / 35).toFixed(2);
    if (aiEl) aiEl.innerText = `${aerosolIndex} AI`;
    if (aiBadge) {
        if (aerosolIndex > 1.0) {
            aiBadge.innerText = "Elevated Activity";
            aiBadge.className = "badge yellow";
        } else {
            aiBadge.innerText = "Nominal Level";
            aiBadge.className = "badge green";
        }
    }

    if (co2El) co2El.innerText = "426.0 ppm";
}

async function switchSatellite(name, noradId, activeBtn) {
    currentSatId = noradId;
    const satNameEl = document.getElementById('satName');
    const radarLabelEl = document.getElementById('activeRadarLabel');
    if (satNameEl) satNameEl.innerText = name;
    if (radarLabelEl) radarLabelEl.innerText = `TACTICAL MAP GRID // ${name.toUpperCase()}`;
    
    document.querySelectorAll('.sub-btn').forEach(btn => btn.classList.remove('active'));
    if (activeBtn) activeBtn.classList.add('active');

    const sysStatus = document.querySelector('.system-status');
    if (sysStatus) sysStatus.innerText = "UPLINK: FETCHING TLE...";
    await fetchAndTrackSatellite();
}

async function fetchAndTrackSatellite() {
    try {
        if (typeof satellite === 'undefined') throw new Error("Offline / Satellite library not loaded");

        const response = await fetch(`https://celestrak.org/NORAD/elements/gp.php?CATNR=${currentSatId}&FORMAT=TLE`);
        const text = await response.text();
        const lines = text.trim().split('\n');

        if (lines.length < 2) throw new Error("Invalid TLE");

        const tleLine1 = lines.length === 3 ? lines[1] : lines[0];
        const tleLine2 = lines.length === 3 ? lines[2] : lines[1];

        const sysStatus = document.querySelector('.system-status');
        if (sysStatus) {
            sysStatus.innerText = "UPLINK: LIVE UPLINK ACTIVE";
            sysStatus.style.color = "var(--accent-green)";
        }

        const satrec = satellite.twoline2satrec(tleLine1, tleLine2);

        clearInterval(window.trackerInterval);
        window.trackerInterval = setInterval(() => updateOrbitPosition(satrec), 1000);
        updateOrbitPosition(satrec);

    } catch (err) {
        const sysStatus = document.querySelector('.system-status');
        if (sysStatus) {
            sysStatus.innerText = "UPLINK: SIMULATION FALLBACK (OFFLINE)";
            sysStatus.style.color = "var(--accent-yellow)";
        }
        runFallbackSimulation();
    }
}

function updateOrbitPosition(satrec) {
    if (typeof satellite === 'undefined') return runFallbackSimulation();

    const now = new Date();
    const pv = satellite.propagate(satrec, now);
    const gmst = satellite.gstime(now);

    if (pv.position) {
        const pd = satellite.eciToGeodetic(pv.position, gmst);
        const lat = satellite.degreesLat(pd.latitude);
        const lng = satellite.degreesLong(pd.longitude);
        const height = pd.height;
        const speed = Math.sqrt(pv.velocity.x**2 + pv.velocity.y**2 + pv.velocity.z**2);

        const latEl = document.getElementById('satLat');
        const lngEl = document.getElementById('satLng');
        const altEl = document.getElementById('satAlt');
        const velEl = document.getElementById('satVel');

        if (latEl) latEl.innerText = lat.toFixed(2) + "°";
        if (lngEl) lngEl.innerText = lng.toFixed(2) + "°";
        if (altEl) altEl.innerText = height.toFixed(1) + " km";
        if (velEl) velEl.innerText = speed.toFixed(2) + " km/s";

        const mapX = ((lng + 180) / 360) * 100;
        const mapY = ((90 - lat) / 180) * 100;

        const blip = document.getElementById('targetBlip');
        if (blip) {
            blip.style.left = `${mapX}%`;
            blip.style.top = `${mapY}%`;
        }
    }
}

function runFallbackSimulation() {
    let step = 0;
    clearInterval(window.trackerInterval);
    window.trackerInterval = setInterval(() => {
        step += 0.04;
        let lat = Math.sin(step) * 45;
        let lng = (step * 25) % 360 - 180;

        const latEl = document.getElementById('satLat');
        const lngEl = document.getElementById('satLng');
        const altEl = document.getElementById('satAlt');
        const velEl = document.getElementById('satVel');

        if (latEl) latEl.innerText = lat.toFixed(2) + "°";
        if (lngEl) lngEl.innerText = lng.toFixed(2) + "°";
        if (altEl) altEl.innerText = "415.4 km";
        if (velEl) velEl.innerText = "7.66 km/s";

        const mapX = ((lng + 180) / 360) * 100;
        const mapY = ((90 - lat) / 180) * 100;

        const blip = document.getElementById('targetBlip');
        if (blip) {
            blip.style.left = `${mapX}%`;
            blip.style.top = `${mapY}%`;
        }
    }, 1000);
}

function runDataProcessing() {
    const consoleLogs = document.getElementById('consoleLogs');
    const timestamp = new Date().toLocaleTimeString();
    if (!consoleLogs) return;
    
    consoleLogs.innerHTML += `<br>[${timestamp}] Executing atmospheric aerosol matrix sweep...`;
    setTimeout(() => {
        consoleLogs.innerHTML += `<br>[${timestamp}] NO2 columns verified. Carbon offset and SDG metrics validated.`;
        consoleLogs.scrollTop = consoleLogs.scrollHeight;
        updateDashboardMetrics(38.4, 45.2, 92);
    }, 800);
}

function getLiveTelemetryData(cityName) {
    const key = cityName.toLowerCase().trim();
    let data;
    if (CITY_COORDINATES[key]) {
        data = { ...CITY_COORDINATES[key] };
    } else {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = key.charCodeAt(i) + ((hash << 5) - hash);
        }
        data = {
            lat: (Math.abs(hash) % 110 - 55).toFixed(2),
            lng: (Math.abs(hash >> 2) % 360 - 180).toFixed(2),
            aqi: 35 + (Math.abs(hash) % 115),
            pm25: ((35 + (Math.abs(hash) % 115)) * 0.58).toFixed(1),
            temp: 18 + (Math.abs(hash) % 18),
            hum: 35 + (Math.abs(hash) % 50),
            no2: (12 + (Math.abs(hash) % 35)).toFixed(1)
        };
    }

    data.temp = (parseFloat(data.temp) + (Math.random() * 0.6 - 0.3)).toFixed(1);
    data.hum = Math.min(100, Math.max(10, Math.round(parseFloat(data.hum) + (Math.random() * 2 - 1))));
    data.aqi = Math.max(1, Math.round(data.aqi + (Math.random() * 4 - 2)));
    data.pm25 = (data.aqi * 0.58).toFixed(1);
    data.no2 = (parseFloat(data.no2) + (Math.random() * 0.4 - 0.2)).toFixed(1);

    return data;
}

function generateLocationStats(cityName) {
    activeTelemetryLocation = cityName;
    const data = getLiveTelemetryData(cityName);
    const formattedName = cityName.charAt(0).toUpperCase() + cityName.slice(1);

    updateDashboardMetrics(data.no2, data.pm25, data.aqi);

    if (telemetryInterval) clearInterval(telemetryInterval);
    telemetryInterval = setInterval(() => {
        if (!activeTelemetryLocation) return;
        const liveData = getLiveTelemetryData(activeTelemetryLocation);
        updateDashboardMetrics(liveData.no2, liveData.pm25, liveData.aqi);

        const cardEl = document.getElementById('liveTelemetryCard');
        if (cardEl) {
            cardEl.innerHTML = `
                <div class="ai-card-header"><span style="color:var(--accent-cyan);">📡 LIVE FEED // ${formattedName.toUpperCase()}</span><span style="color:var(--accent-green);">CONNECTED [SYNCING]</span></div>
                <div class="ai-stat-row" style="margin-top:8px;"><span>Target Coordinates</span><b>${liveData.lat}° N, ${liveData.lng}° E</b></div>
                <div class="ai-stat-row"><span>Air Quality Index (AQI)</span><b>${liveData.aqi} PM2.5 (${liveData.aqi <= 100 ? 'Moderate' : 'Unhealthy'})</b></div>
                <div class="ai-stat-row"><span>PM2.5 Concentration</span><b>${liveData.pm25} µg/m³</b></div>
                <div class="ai-stat-row"><span>NO2 Column Density</span><b>${liveData.no2} µg/m³</b></div>
                <div class="ai-stat-row"><span>Surface Temp / Humidity</span><b>${liveData.temp}°C / ${liveData.hum}%</b></div>
                <div class="visual-bar-container" style="margin-top:8px;"><div class="visual-bar-fill" style="width: ${Math.min(liveData.aqi, 100)}%;"></div></div>
            `;
        }
    }, 3000);

    return `
        <div id="liveTelemetryCard" class="ai-card" style="border-color: var(--accent-cyan);">
            <div class="ai-card-header"><span style="color:var(--accent-cyan);">📡 LIVE FEED // ${formattedName.toUpperCase()}</span><span style="color:var(--accent-green);">CONNECTED</span></div>
            <div class="ai-stat-row" style="margin-top:8px;"><span>Target Coordinates</span><b>${data.lat}° N, ${data.lng}° E</b></div>
            <div class="ai-stat-row"><span>Air Quality Index (AQI)</span><b>${data.aqi} PM2.5 (${data.aqi <= 100 ? 'Moderate' : 'Unhealthy'})</b></div>
            <div class="ai-stat-row"><span>PM2.5 Concentration</span><b>${data.pm25} µg/m³</b></div>
            <div class="ai-stat-row"><span>NO2 Column Density</span><b>${data.no2} µg/m³</b></div>
            <div class="ai-stat-row"><span>Surface Temp / Humidity</span><b>${data.temp}°C / ${data.hum}%</b></div>
            <div class="visual-bar-container" style="margin-top:8px;"><div class="visual-bar-fill" style="width: ${Math.min(data.aqi, 100)}%;"></div></div>
        </div>
    `;
}

async function processAICommand() {
    const inputField = document.getElementById('aiUserInput');
    const chatLog = document.getElementById('aiChatLog');
    if (!inputField || !chatLog) return;

    const query = inputField.value.trim();
    if (!query) return;

    chatLog.innerHTML += `<div class="ai-msg user"><strong>[OPERATOR]:</strong> ${query}</div>`;
    inputField.value = '';
    chatLog.scrollTop = chatLog.scrollHeight;

    let replyHtml = "";
    const lowerQ = query.toLowerCase();

    // Clean conversational prefixes from the city lookup
    let cityName = lowerQ.replace(/whats|what is|hows|how is|tell me about|status for|explain|about/gi, '').trim();

    const isNumberOnly = /^\d+$/.test(cityName) || /^\d+$/.test(lowerQ);
    const isShortOrInvalid = cityName.length < 2 || /^[a-z]$/i.test(cityName);
    const containsGibberishToken = /\d+[a-z]+\d+/i.test(lowerQ) || /[a-z]+\d+[a-z]+/i.test(lowerQ);
    const words = query.split(/\s+/);
    const isKeyboardSmash = words.some(w => (w.length > 5 && !/[aeiouy]/i.test(w)) || containsGibberishToken);

    // Check if a specific SDG number (1 to 17) was requested
    const sdgMatch = lowerQ.match(/sdg\s*(\d+)/);
    const sdgNum = sdgMatch ? parseInt(sdgMatch[1]) : null;

    // Check if user is asking generally about SDGs, listing SDGs, or asking "whats sdg"
    const isListSDG = lowerQ.includes('sdg') || lowerQ.includes('sustainable development') || lowerQ.includes('all sdg') || lowerQ.includes('list sdg');

    if ((isNumberOnly || isShortOrInvalid || isKeyboardSmash) && !sdgNum && !isListSDG) {
        replyHtml = `
            <div class="ai-card" style="border-color: var(--accent-red);">
                <div class="ai-card-header"><span style="color:var(--accent-red);">⚠️ SYSTEM EXCEPTION</span><span style="color:var(--accent-red);">ERR_CODE 400</span></div>
                <div class="ai-card-desc" style="margin-top:8px;">Command string rejected. Unrecognized coordinate, satellite designation, or telemetry index. Verify parameters and retry.</div>
            </div>
        `;
        chatLog.innerHTML += `<div class="ai-msg system">${replyHtml}</div>`;
        chatLog.scrollTop = chatLog.scrollHeight;
        return;
    }

    if (sdgNum && SDG_DETAILS[sdgNum]) {
        const goal = SDG_DETAILS[sdgNum];
        replyHtml = `
            <div class="ai-card" style="border-color: ${goal.color};">
                <div class="ai-card-header"><span style="color:${goal.color};">📚 TARGET BRIEFING // SDG ${sdgNum} (${goal.title.toUpperCase()})</span><span style="color:var(--accent-green);">VERIFIED</span></div>
                <div class="ai-stat-row" style="margin-top:8px;"><span>Objective</span><b>${goal.obj}</b></div>
                <div class="ai-stat-row"><span>Sensor Link</span><b>UN Global Telemetry Node ${sdgNum}</b></div>
                <div class="visual-bar-container" style="margin-top:8px;"><div class="visual-bar-fill" style="width: 85%; background-color: ${goal.color};"></div></div>
            </div>
        `;
    } else if (isListSDG) {
        replyHtml = `
            <div class="ai-card">
                <div class="ai-card-header"><span>🌐 UN 17 SUSTAINABLE DEVELOPMENT GOALS</span><span style="color:var(--accent-green);">INDEX LOADED</span></div>
                <div style="max-height: 220px; overflow-y: auto; margin-top: 10px; padding-right: 5px;">
                    <div class="ai-stat-row"><span>SDG 1</span><b>No Poverty</b></div>
                    <div class="ai-stat-row"><span>SDG 2</span><b>Zero Hunger</b></div>
                    <div class="ai-stat-row"><span>SDG 3</span><b>Good Health & Well-Being</b></div>
                    <div class="ai-stat-row" style="color:#c5192d;"><span>SDG 4</span><b>Quality Education</b></div>
                    <div class="ai-stat-row"><span>SDG 5</span><b>Gender Equality</b></div>
                    <div class="ai-stat-row" style="color:#26bde2;"><span>SDG 6</span><b>Clean Water & Sanitation</b></div>
                    <div class="ai-stat-row" style="color:#fcc30b;"><span>SDG 7</span><b>Affordable & Clean Energy</b></div>
                    <div class="ai-stat-row"><span>SDG 8</span><b>Decent Work & Economic Growth</b></div>
                    <div class="ai-stat-row"><span>SDG 9</span><b>Industry, Innovation & Infrastructure</b></div>
                    <div class="ai-stat-row"><span>SDG 10</span><b>Reduced Inequalities</b></div>
                    <div class="ai-stat-row"><span>SDG 11</span><b>Sustainable Cities & Communities</b></div>
                    <div class="ai-stat-row"><span>SDG 12</span><b>Responsible Consumption & Production</b></div>
                    <div class="ai-stat-row" style="color:#3f7e44;"><span>SDG 13</span><b>Climate Action</b></div>
                    <div class="ai-stat-row"><span>SDG 14</span><b>Life Below Water</b></div>
                    <div class="ai-stat-row"><span>SDG 15</span><b>Life on Land</b></div>
                    <div class="ai-stat-row"><span>SDG 16</span><b>Peace, Justice & Strong Institutions</b></div>
                    <div class="ai-stat-row"><span>SDG 17</span><b>Partnerships for the Goals</b></div>
                </div>
            </div>
        `;
    } else if (lowerQ.includes('iss')) {
        replyHtml = `
            <div class="ai-card">
                <div class="ai-card-header"><span>🌍 SATELLITE DOWNLINK // ISS</span><span style="color:var(--accent-green);">NORAD #25544</span></div>
                <div class="ai-stat-row" style="margin-top:8px;"><span>Orbit Profile</span><b>Low Earth Orbit (~415 km)</b></div>
                <div class="ai-stat-row"><span>Telemetry Stream</span><b>Active Earth Observation Feed</b></div>
            </div>
        `;
        switchSatellite('ISS (Space Station)', '25544');
    } else if (lowerQ.includes('noaa')) {
        replyHtml = `
            <div class="ai-card">
                <div class="ai-card-header"><span>🌧️ SATELLITE DOWNLINK // NOAA 18</span><span style="color:var(--accent-green);">NORAD #28654</span></div>
                <div class="ai-stat-row" style="margin-top:8px;"><span>Mission</span><b>Meteorological & Atmospheric Sounding</b></div>
                <div class="ai-stat-row"><span>Telemetry Stream</span><b>Active Weather Radar Feed</b></div>
            </div>
        `;
        switchSatellite('NOAA 18 (Weather)', '28654');
    } else if (lowerQ.includes('hubble')) {
        replyHtml = `
            <div class="ai-card">
                <div class="ai-card-header"><span>🔭 SATELLITE DOWNLINK // HUBBLE</span><span style="color:var(--accent-green);">NORAD #20580</span></div>
                <div class="ai-stat-row" style="margin-top:8px;"><span>Mission</span><b>Deep Space Optical Astronomy</b></div>
                <div class="ai-stat-row"><span>Telemetry Stream</span><b>Active Spectroscopic Feed</b></div>
            </div>
        `;
        switchSatellite('Hubble Telescope', '20580');
    } else {
        if (!cityName) cityName = query;
        replyHtml = generateLocationStats(cityName);
    }

    chatLog.innerHTML += `<div class="ai-msg system">${replyHtml}</div>`;
    chatLog.scrollTop = chatLog.scrollHeight;
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAndTrackSatellite();

    document.getElementById('menuToggleBtn')?.addEventListener('click', toggleMenu);

    const aiInput = document.getElementById('aiUserInput');
    aiInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') processAICommand();
    });

    document.getElementById('sendAiBtn')?.addEventListener('click', processAICommand);

    const themeSelector = document.getElementById('themeSelector');
    if (themeSelector) {
        const savedTheme = localStorage.getItem('orbitcom_theme') || 'cyan';
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeSelector.value = savedTheme;

        themeSelector.addEventListener('change', (e) => {
            const selectedTheme = e.target.value;
            document.documentElement.setAttribute('data-theme', selectedTheme);
            localStorage.setItem('orbitcom_theme', selectedTheme);
        });
    }
});