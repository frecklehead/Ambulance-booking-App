import React from 'react'
import MedicalProfileForm from './MedicalProfileForm'
import { UserButton, UserProfile } from '@clerk/nextjs'

export default function ProfilePage() {
  return (
    <div className="min-h-screen p-4 pt-20">
      <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
            <UserProfile/>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Medical Information</h2>
            <MedicalProfileForm />
        
        </div>
      </div>
    </div>
  )
}