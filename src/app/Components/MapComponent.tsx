"use client";
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ambulance, Phone, Navigation2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const EmergencyAmbulanceBooking = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const pickupMarkerRef = useRef(null);
  const hospitalMarkersRef = useRef([]);
  const routeLayerRef = useRef(null);

  const KATHMANDU_CENTER = [27.7172, 85.3240];
  const INITIAL_ZOOM = 13;

  const [userLocation, setUserLocation] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [distance, setDistance] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [callStatus, setCallStatus] = useState(null);

  // Sample hospital data with ambulance availability
  const HOSPITALS = [
    {
      id: 1,
      name: "City General Hospital",
      coordinates: [27.7271, 85.3376],
      contact: "+1234567890",
      ambulancesAvailable: 3
    },
    {
      id: 2,
      name: "Medicare Hospital",
      coordinates: [27.7072, 85.3140],
      contact: "+1234567891",
      ambulancesAvailable: 2
    },
    {
      id: 3,
      name: "Emergency Care Center",
      coordinates: [27.7372, 85.3440],
      contact: "+1234567892",
      ambulancesAvailable: 1
    },
    {
      id: 4,
      name: "Life Support Hospital",
      coordinates: [27.7172, 85.3040],
      contact: "+1234567893",
      ambulancesAvailable: 4
    },
    {
      id: 5,
      name: "Urgent Care Hospital",
      coordinates: [27.7072, 85.3340],
      contact: "+1234567894",
      ambulancesAvailable: 2
    }
  ];

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          setUserLocation({ lat: KATHMANDU_CENTER[0], lng: KATHMANDU_CENTER[1] });
        }
      );
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView(KATHMANDU_CENTER, INITIAL_ZOOM);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !userLocation) return;

    // Add user location marker
    if (pickupMarkerRef.current) pickupMarkerRef.current.remove();
    
    pickupMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
      icon: createCustomIcon('#22c55e', 'You')
    })
      .addTo(mapInstanceRef.current)
      .bindPopup('Your Location')
      .openPopup();

    // Add hospital markers
    hospitalMarkersRef.current.forEach(marker => marker.remove());
    hospitalMarkersRef.current = [];

    HOSPITALS.forEach(hospital => {
      const marker = L.marker(hospital.coordinates, {
        icon: createCustomIcon('#dc2626', 'H')
      })
        .addTo(mapInstanceRef.current)
        .bindPopup(`
          <b>${hospital.name}</b><br>
          Ambulances available: ${hospital.ambulancesAvailable}
        `);

      hospitalMarkersRef.current.push(marker);

      marker.on('click', () => {
        setSelectedHospital(hospital);
        calculateRoute(hospital.coordinates);
      });
    });

    // Fit bounds to show all markers
    const bounds = L.latLngBounds([
      [userLocation.lat, userLocation.lng],
      ...HOSPITALS.map(h => h.coordinates)
    ]);
    mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
  }, [userLocation]);

  const createCustomIcon = (color, text) => {
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="marker-icon" style="background-color: ${color}">${text}</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15]
    });
  };

  const calculateRoute = (hospitalCoords) => {
    if (!userLocation) return;
    
    const map = mapInstanceRef.current;
    if (routeLayerRef.current) routeLayerRef.current.remove();

    const pickup = L.latLng(userLocation.lat, userLocation.lng);
    const hospital = L.latLng(hospitalCoords[0], hospitalCoords[1]);

    const curvedLatLngs = [
      [pickup.lat, pickup.lng],
      [(pickup.lat + hospital.lat) / 2, (pickup.lng + hospital.lng) / 2 - 0.01],
      [hospital.lat, hospital.lng],
    ];

    routeLayerRef.current = L.polyline(curvedLatLngs, {
      color: '#dc2626',
      weight: 4,
      opacity: 0.8,
    }).addTo(map);

    const dist = pickup.distanceTo(hospital) / 1000;
    setDistance(dist.toFixed(2));
    setEstimatedTime(Math.ceil(dist * 2)); // Assuming ambulance travels faster than regular vehicles
  };

  const makeEmergencyCall = async () => {
    if (!selectedHospital) return;
    
    setIsLoading(true);
    try {
      // Simulate Twilio API call
      const response = await fetch('/api/make-emergency-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hospitalPhone: selectedHospital.contact,
          userLocation: `${userLocation.lat}, ${userLocation.lng}`,
          hospitalName: selectedHospital.name
        }),
      });

      if (response.ok) {
        setCallStatus('success');
      } else {
        setCallStatus('error');
      }
    } catch (error) {
      console.error('Error making emergency call:', error);
      setCallStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-2/3 p-4">
        <div 
          ref={mapRef} 
          className="w-full h-full rounded-2xl overflow-hidden shadow-xl border border-gray-200"
          style={{ minHeight: '600px' }}
        />
      </div>

      <div className="w-1/3 p-4 bg-gray-50">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <AlertCircle className="w-5 h-5 mr-2" />
              Emergency Ambulance Booking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!userLocation && (
              <Alert variant="destructive">
                <AlertDescription>
                  Please enable location services to use this service
                </AlertDescription>
              </Alert>
            )}

            {selectedHospital && (
              <div className="space-y-4 p-4 bg-white rounded-lg border">
                <h3 className="font-medium text-lg">{selectedHospital.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Available Ambulances:</span>
                    <span className="font-medium">{selectedHospital.ambulancesAvailable}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Distance:</span>
                    <span className="font-medium">{distance} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Arrival Time:</span>
                    <span className="font-medium">{estimatedTime} mins</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={makeEmergencyCall}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Connecting..."
                  ) : (
                    <>
                      <Phone className="w-4 h-4 mr-2" />
                      Call Ambulance Now
                    </>
                  )}
                </Button>

                {callStatus && (
                  <Alert variant={callStatus === 'success' ? 'default' : 'destructive'}>
                    <AlertDescription>
                      {callStatus === 'success' 
                        ? 'Emergency call placed successfully. Ambulance is on the way.'
                        : 'Failed to place emergency call. Please try again or call emergency services directly.'}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {!selectedHospital && (
              <div className="text-center text-gray-500">
                <Ambulance className="w-12 h-12 mx-auto mb-2" />
                <p>Select a hospital on the map to book an ambulance</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyAmbulanceBooking;