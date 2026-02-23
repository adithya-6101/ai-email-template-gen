# 📧 AI-Powered Email Template Generator

<img width="2507" height="1374" alt="image" src="https://github.com/user-attachments/assets/c5263439-eb38-4b91-b8b9-c30f9f922b39" />

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Convex](https://img.shields.io/badge/Convex-Realtime_DB-orange?style=for-the-badge&logo=firebase)](https://convex.dev/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-AI-blue?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-Email_Delivery-green?style=for-the-badge&logo=gmail)](https://nodemailer.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 🚀 Overview

**AI-Powered Email Architect** is a comprehensive SaaS platform designed to streamline the email marketing workflow. It bridges the gap between **Generative AI** and manual design, allowing users to bootstrap layouts using natural language prompts and then refine them with a **custom-engineered Drag-and-Drop editor**.

Beyond simple design, this application is a complete **end-to-end solution**: users can authenticate securely, manage a personalized dashboard of saved templates, and, crucially, **send real emails** directly from the platform using a custom SMTP integration.

## 🎥 Video Walkthrough

> **[Click here to watch the full video walkthrough and functional demo](https://drive.google.com/file/d/1SraSuMPYhCF0r0hpGG1p3vLj2wnii9z6/view?usp=drive_link)**
>
> *I walk through the AI generation pipeline, the custom drag-and-drop architecture, and the real-time email delivery system.*

## ✨ Key Features

### 🧠 Generative AI Pipeline
* **Prompt-to-Design:** Integrates **Google Gemini** to parse natural language (e.g., "Product launch newsletter with a CTA") into valid, structured JSON layouts.
* **Strict Schema Validation:** Ensures AI outputs match the internal rendering engine's recursive state structure perfectly.

### 🎨 Native Drag-and-Drop Engine
* **Dependency-Free:** Built entirely on the **HTML5 Native Drag and Drop API**. No heavy third-party libraries (like `dnd-kit` or `react-dnd`) were used.
* **Performance:** Zero bloat, ensuring 60fps performance even with complex, nested layouts.
* **Granular Control:** Custom "drop zones" with visual cues for precise column and element placement.

### 🔐 Full-Stack Authentication & Dashboard
* **Secure Auth:** Implemented **Google OAuth 2.0** for secure, one-tap sign-in and session management.
* **Personal Workspace:** Users have a private dashboard to Create, Read, Update, and Delete (CRUD) their templates.
* **Persistence:** All data is synced in real-time to **Convex**, ensuring users never lose work.

### 📧 Live Email Delivery System
* **Nodemailer Integration:** Custom backend API route that reconstructs the JSON design state into production-ready HTML.
* **Real-World Sending:** Users can send test emails or final campaigns to any recipient directly from the editor interface.

## 🏗️ Engineering & Architecture

### 1. Recursive State Management
The core editor uses a complex nested data structure: `Layout[]` -> `Column[]` -> `Element[]`.
* **Decision:** I utilized **React Context** combined with optimistic UI updates. This allows the deeply nested components to update state instantly (changing colors, padding, text) without prop-drilling, while the database syncs asynchronously.

### 2. Real-Time Synchronization
* **Decision:** Instead of traditional REST polling, I chose **Convex** for its WebSocket-based subscription model.
* **Result:** Collaborative-ready architecture where the editor state is always consistent with the database.

### 3. Modular Component System
* **Design:** Each element (Button, Text, Image, Social) is a self-contained module that accepts a standardized configuration object. This makes the system highly extensible, adding a new element type requires zero changes to the core drag-and-drop logic.

## 🛠️ Tech Stack

* **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Shadcn UI.
* **Backend:** Next.js Server Actions, Convex (BaaS).
* **AI:** Google Gemini Flash Model.
* **Email Service:** Nodemailer (SMTP Transport).
* **Auth:** Google OAuth 2.0.

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
* Node.js (v18+)
* Google Cloud Console Project (for OAuth & Gemini)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/adithya-6101/ai-email-template-gen.git](https://github.com/adithya-6101/ai-email-template-gen.git)
    cd ai-email-template-gen
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a `.env.local` file in the root directory and add the following keys:
    ```env
    # Convex Configuration
    CONVEX_DEPLOYMENT=your_deployment_key
    NEXT_PUBLIC_CONVEX_URL=your_convex_url

    # Google Services (Auth & AI)
    NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
    NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

    # Nodemailer Configuration
    EMAIL_USER=your_email_address
    EMAIL_PASS=your_app_password
    ```

4.  **Initialize Database:**
    ```bash
    npx convex dev
    ```

5.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

6.  **Open the App:**
    Visit `http://localhost:3000` in your browser.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ by [Adithya Cherukuri](https://www.linkedin.com/in/adithyach2001/)**
