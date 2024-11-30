# 🚑 Ambulance Booking App

A modern web application to book ambulances in emergency situations, built with cutting-edge technologies like **Next.js**, **Shadcn/UI**, **Clerk** for authentication, and **Leaflet.js** for interactive maps.

## 🔗 **Live Demo**  
[Link to Live Demo](#) *(Replace with your live demo link)*

---

## 📋 **Features**  
- 🚨 **Real-time Ambulance Booking:** Book the nearest available ambulance in case of an emergency.
- 📍 **Interactive Map:** View ambulance locations and hospital details on an interactive map.
- 🔒 **Secure Authentication:** User authentication and management using Clerk.
- 📊 **Distance & ETA Calculation:** Automatically calculate the distance and estimated arrival time of the ambulance.
- 💬 **Responsive Design:** Optimized for both desktop and mobile devices.

---

## 🛠️ **Technologies Used**  

| Technology   | Description                          |
|--------------|--------------------------------------|
| **Next.js**  | Frontend framework for building fast and scalable web apps. |
| **Shadcn/UI**| Customizable UI components for modern design. |
| **Clerk**    | Authentication and user management system. |
| **Leaflet.js** | Library for interactive maps. |
| **Vercel**   | Deployment platform for hosting the app. |

---

## 🚀 **Getting Started**

### Prerequisites  
- **Node.js** (v16 or later)  
- **npm** or **yarn**  

### Installation  

1. Clone the repository:  
   ```bash
   git clone https://github.com/yourusername/ambulance-booking-app.git
   cd ambulance-booking-app

2. Install dependencies:
```bash
npm install
# or
yarn install
```
 
3. Set up environment variables:
Create a .env.local file in the root directory and add your API keys and configuration:

```bash
NEXT_PUBLIC_CLERK_FRONTEND_API=<Your Clerk Frontend API Key>
CLERK_API_KEY=<Your Clerk Backend API Key>
```

4. Run the development server:
```
 
npm run dev
# or
yarn dev
Open http://localhost:3000 in your browser.
```



Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
