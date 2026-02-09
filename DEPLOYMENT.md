# 🚀 Deployment Guide: GameVault X

This guide will help you deploy your full-stack application for free using **Render**.

## 1. Prepare Your Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database).
2. Create a free cluster.
3. In "Network Access", add `0.0.0.0/0` (Allow access from anywhere).
4. In "Database Access", create a user and copy the connection string.
   - Example: `mongodb+srv://<user>:<password>@cluster0.mongodb.net/gamevaultx`

## 2. Deploy the Backend (Node.js)
1. Sign up/Login to [Render](https://render.com/).
2. Click **New +** > **Web Service**.
3. Connect your GitHub repository.
4. Set the following:
   - **Name**: `gamevault-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. **Environment Variables**:
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `PORT`: `5000` (Render will override this, but good to have).
6. Click **Deploy**. Copy the URL (e.g., `https://gamevault-backend.onrender.com`).

## 3. Deploy the Frontend (React + Vite)
1. In Render, click **New +** > **Static Site**.
2. Connect the same GitHub repository.
3. Set the following:
   - **Name**: `gamevault-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. **Environment Variables**:
   - `VITE_API_URL`: Your Backend URL + `/api` (e.g., `https://gamevault-backend.onrender.com/api`).
5. Click **Deploy**.

## 4. Deploying to Vercel (Frontend Alternative)
1. Sign up/Login to [Vercel](https://vercel.com).
2. Click **Add New** > **Project**.
3. Connect your GitHub repository.
4. **CRITICAL STEP**: Click "Edit" next to **Root Directory** and select `frontend`.
5. Under "Environment Variables", add:
   - `VITE_API_URL`: Your Backend URL (from Render) + `/api`.
6. Click **Deploy**.

> [!TIP]
> If you encounter an `npm error ERESOLVE`, I have added a `.npmrc` file to the frontend to automatically handle peer dependency conflicts. Vercel will pick this up automatically.

## 5. Final Verification
- Once both are live, visit your site URL.
- Test the login/signup and browse the games.
- **Note**: The first load on Render "free tier" might take ~30 seconds if the instance is sleeping.

---
Need help? Feel free to ask!
