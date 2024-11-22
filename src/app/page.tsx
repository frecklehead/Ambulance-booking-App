
"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Import from next/navigation

export default function Home() {
  const router = useRouter(); // Correct hook from next/navigation

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-red-50">
      {/* Header */}
      <h1 className="text-4xl font-bold text-red-600">Ambulance Booking App</h1>
      <p className="mt-2 text-lg text-red-500">Fast and Reliable Emergency Services</p>

      {/* Sign In Button */}
      <Button
        onClick={() => router.push("/sign-up")} // Correct navigation logic
        className="mt-6 bg-red-600 text-white hover:bg-red-700"
      >
        Sign In
      </Button>
    </div>
  );
}
