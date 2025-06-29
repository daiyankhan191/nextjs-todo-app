# 📝 Next.js To-Do Manager

A full-stack To-Do application built with **Next.js** that allows users to manage tasks, create categorized to-do sheets with deadlines, and download them as PDF. Features user authentication, MongoDB Atlas for data persistence, and optional AI integration for smart task suggestions using OpenAI or Gemini.

## 🚀 Features

- ✅ User Registration & Login
- 📋 Create daily to-dos and grouped sheets
- 🗓️ Set deadlines for task sheets
- 📄 Download To-Do sheets as PDF
- 🧠 Ask AI how to complete a task (OpenAI or Gemini)
- 🗂 View saved sheets as cards, open in modal
- 🗑️ Delete sheets anytime
- 🌙 Fully responsive, dark-themed UI
- ☁️ Deployed on **Vercel**

---

## 🛠️ Tech Stack

| Category       | Tech Used                          |
|----------------|------------------------------------|
| **Frontend**   | Next.js 15, React, CSS (styled-jsx)|
| **Backend**    | Next.js API Routes                 |
| **Database**   | MongoDB Atlas                      |
| **AI (Optional)** | OpenAI API or Gemini API          |
| **PDF Generator** | jsPDF                           |
| **Deployment** | Vercel                             |
| **Version Control** | Git & GitHub                   |

---

## 🔧 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/daiyankhan191/nextjs-todo-app.git
   cd nextjs-todo-app
2.Install dependencies:

 bash
 npm install
 
3. Configure environment variables:

  Create a .env.local file and add the following:
  MONGODB_URI=your_mongodb_atlas_connection_string
  NEXT_PUBLIC_BASE_URL=http://localhost:3000
  OPENAI_API_KEY=your_openai_key_or_gemini_key_if_used

4.Run the development server:
  npm run dev

5.Deploy using Vercel:

 Connect your GitHub repository

 Add the same environment variables in the Vercel dashboard

 Click Deploy
 
📁 Folder Structure

src/
├── app/
│   ├── page.js               # Homepage
│   ├── login/                # Login Page
│   ├── register/             # Registration Page
│   ├── dashboard/            # User Dashboard
│   ├── todo-sheets/          # To-Do Sheet Manager
│   └── api/                  # API routes (save, delete, fetch sheets)
├── lib/
│   └── mongodb.js            # MongoDB connection helper
├── models/
│   └── sheet.js              # Mongoose schema (if using)
 

🧠 AI Integration (Optional)
If you'd like to enable "Ask AI how to complete this task":

Set OPENAI_API_KEY or Gemini key in .env.local

Ensure ask-ai API route is connected

Feature will call the AI model to generate guidance


🙋‍♂️ Author
Daiyan Khan
GitHub: @daiyankhan191

 
