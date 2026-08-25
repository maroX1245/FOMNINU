# 🏥 FOMNINU Student Guide - دليل الطالب

<div align="center">

![FOMNINU Logo](https://img.shields.io/badge/FOMNINU-Medical%20Guide-005b96?style=for-the-badge&logo=medical)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React Three Fiber](https://img.shields.io/badge/3D-R3F-06b6d4?style=for-the-badge&logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql)

**دليل الطالب الرسمي - كلية الطب البشري - جامعة الإسماعيلية الوطنية الجديدة FOMNINU 2026-2031**

🎓 **Full-Stack Arabic Medical Education Website with 3D Graphics**

*Developed by Mohamed Magdy - 5th Year Medical Student at FOMNINU*

</div>

---

## ✨ Features | المميزات

### 🎨 Frontend
- **3D Interactive Elements**: DNA helix animation, particle backgrounds, rotating strategy icons
- **RTL Arabic Support**: Full right-to-left layout with Tajawal font
- **Glassmorphism UI**: Modern glass-effect cards and navigation
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Framer Motion for transitions

### ⚙️ Backend
- **RESTful API Routes**: `/api/complaints`, `/api/guide`, `/api/electives`
- **PostgreSQL Database**: With Prisma ORM
- **NextAuth Authentication**: Secure admin panel access
- **Dynamic Content Management**: Update guide content from dashboard

### 🗄️ Database Models
- `Admin`: Authentication for admin panel
- `GuideContent`: Dynamic CMS for student guide sections
- `StudentComplaint`: Student complaint submission system
- `ElectiveCourse`: Elective courses catalog
- `Module`: Detailed module information
- `ExamType`: Exam types and grading
- `StudentGroup`: Group A & B information
- `AttendanceRule`: Attendance policies

---

## 🚀 Quick Start | البدء السريع

### Prerequisites | المتطلبات
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation | التثبيت

```bash
# 1. Clone the repository
git clone https://github.com/marox1245/FOMNINU.git
cd FOMNINU

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your PostgreSQL credentials

# 4. Set up the database
npx prisma generate
npx prisma db push
npm run db:seed

# 5. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

---

## 🛠️ Tech Stack | التقنيات

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router), React Three Fiber, Drei, Framer Motion |
| Styling | Tailwind CSS (RTL configured) |
| Backend | Next.js API Routes, Node.js |
| Database | PostgreSQL, Prisma ORM |
| Authentication | NextAuth.js |
| Language | TypeScript, Arabic (RTL) |

---

## 📁 Project Structure | هيكل المشروع

```
FOMNINU/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts               # Database seed data
├── src/
│   ├── app/
│   │   ├── api/               # API Routes
│   │   │   ├── complaints/    # Student complaints CRUD
│   │   │   ├── guide/         # Guide content management
│   │   │   ├── electives/     # Elective courses
│   │   │   └── auth/          # NextAuth configuration
│   │   ├── admin/             # Admin dashboard
│   │   │   ├── login/        # Admin login page
│   │   │   └── page.tsx      # Dashboard main page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Main website page
│   ├── components/
│   │   ├── 3d/               # React Three Fiber components
│   │   │   ├── DNAHelix.tsx  # 3D DNA animation
│   │   │   ├── ParticleBackground.tsx
│   │   │   ├── Timeline3D.tsx
│   │   │   └── AnimatedIcons.tsx
│   │   └── ui/              # UI components
│   │       ├── Navigation.tsx
│   │       ├── GlassCard.tsx
│   │       ├── ComplaintForm.tsx
│   │       ├── Accordion.tsx
│   │       ├── AnimatedCharts.tsx
│   │       └── Footer.tsx
│   └── lib/
│       ├── prisma.ts         # Prisma client singleton
│       └── auth.ts           # NextAuth configuration
├── public/images/            # University images
├── tailwind.config.ts        # Tailwind configuration
├── next.config.mjs           # Next.js configuration
└── package.json
```

---

## 🌐 API Endpoints | نقاط API

### Complaints | الشكاوى
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/complaints` | Get all complaints |
| POST | `/api/complaints` | Submit new complaint |
| PATCH | `/api/complaints/[id]` | Update complaint status |
| DELETE | `/api/complaints/[id]` | Delete complaint |

### Guide Content | محتوى الدليل
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/guide` | Get all guide content |
| GET | `/api/guide?sectionKey=vision` | Get specific section |
| POST | `/api/guide` | Create/Update content |

### Other
| Endpoint | Description |
|----------|-------------|
| `GET /api/electives` | Get elective courses |
| `GET /api/timeline` | Get timeline milestones |
| `GET /api/phases` | Get program phases |

---

## 🔐 Admin Panel | لوحة التحكم

Access the admin panel at `/admin`

**Default Credentials:**
- Username: `admin`
- Password: `admin123` (change in production!)

**Admin Features:**
- 📬 View and manage student complaints
- 📝 Update guide content
- ✅ Change complaint status (Pending → In Progress → Resolved)
- 💬 Reply to student complaints

---

## 🎨 Design System | نظام التصميم

### Colors | الألوان
```css
--medical-blue: #005b96
--medical-cyan: #06b6d4
--medical-slate: #0f172a
```

### Typography | الخطوط
- Primary: **Tajawal** (Google Fonts)
- Fallback: Cairo, sans-serif

### Components
- Glassmorphism cards with backdrop blur
- Neon glowing text effects
- Smooth hover animations
- RTL layout support

---

## 📚 المحتوى | Content

### الموديولات | Modules
- **How to Learn** (2 weeks)
- **Foundation 1** (7 weeks - 6 subjects)
- **Foundation 2** (7 weeks - 9 subjects)
- **Foundation 3** (9 weeks - 9 subjects + Research)
- **Musculoskeletal** (6 weeks - Systemic)

### الامتحانات | Exams
| Exam | Percentage |
|------|------------|
| MCQ Mid-module | 10% |
| OSPE Practical | 40% |
| MCQ Final | 15% |
| MEQ Final | 15% |
| Portfolio | 20% |

---

## 👨‍💻 Developer | المطور

<div align="center">

**Mohamed Magdy**  
🎓 5th Year Medical Student  
🏥 Faculty of Medicine, New Ismailia National University (FOMNINU)  
📅 Class of 2026-2031

</div>

---

## 📄 License | الترخيص

This project is for educational purposes. All rights reserved © 2026

---

## 🙏 Acknowledgments | الشكر والتقدير

- Faculty of Medicine, New Ismailia National University
- Next.js and React communities
- Three.js and React Three Fiber teams
- All medical students who contributed feedback
- M TEAM by Marwan Essa (for the original PDF guide)

---

<div align="center">

**Made with ❤️ and 🩺 for FOMNINU Students**

</div>
