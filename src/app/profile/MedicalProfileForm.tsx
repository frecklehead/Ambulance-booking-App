
"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MedicalProfileForm = () => {
  const [formData, setFormData] = useState({
    allergies: '',
    chronicConditions: '',
    currentMedications: '',
    bloodType: '',
    emergencyContact: '',
    lastCheckup: '',
    medicalHistory: '',
    surgicalHistory: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission - connect to your backend here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Medical Profile</CardTitle>
        <CardDescription>Please provide your medical information to help us serve you better.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Allergies</label>
            <textarea 
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="List any allergies..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Chronic Conditions</label>
            <textarea 
              name="chronicConditions"
              value={formData.chronicConditions}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="List any chronic conditions..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Current Medications</label>
            <textarea 
              name="currentMedications"
              value={formData.currentMedications}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="List current medications and dosages..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Blood Type</label>
            <select 
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Emergency Contact</label>
            <input 
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Name and phone number"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Last Medical Checkup</label>
            <input 
              type="date"
              name="lastCheckup"
              value={formData.lastCheckup}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Medical History</label>
            <textarea 
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Past medical conditions..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Surgical History</label>
            <textarea 
              name="surgicalHistory"
              value={formData.surgicalHistory}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Past surgeries and dates..."
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">Save Medical Profile</Button>
      </CardFooter>
    </Card>
  );
};

export default MedicalProfileForm;