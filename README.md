<div align="center">

# 🐾 ZoopZoop  
### 웹 지식을 **수집·정리·협업**하는 통합 플랫폼

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)

**백엔드:** https://github.com/prgrms-web-devcourse-final-project/web6_8_zoopzoop_be  
**확장 프로그램:** https://github.com/prgrms-web-devcourse-final-project/WEB5_6_ZOOPS_TENSION_FE  
**데모 영상:** https://youtu.be/8ofrx60MaL4

</div>

---

## 📖 프로젝트 소개

**ZoopZoop**은 웹에서 찾은 콘텐츠를 손쉽게 저장하고,  
폴더별로 정리하며, 팀과 함께 시각적으로 아이디어를 확장할 수 있는 **지식 협업 플랫폼**입니다.

### 🎯 주요 가치
- **원클릭 수집** — 웹 탐색 중 콘텐츠를 즉시 저장  
- **체계적 관리** — 폴더, 태그, 검색으로 빠른 탐색  
- **실시간 협업** — Presence·댓글 스레드로 함께 작업  
- **개인화 추천** — 관심사 기반 뉴스 자동 큐레이션

---

## 🧩 핵심 기능

### 🧭 크롬 확장 프로그램 — 웹에서 즉시 저장
<div align="center">

![확장-프로그램](https://github.com/user-attachments/assets/a9d68965-5ec4-4c0c-b665-5dd8cdbaf206)

</div>

- 브라우저에서 **클릭 한 번으로 콘텐츠 저장**  
- 제목, 이미지, 요약 정보 **자동 추출**  
- 로그인 상태와 연동되어 바로 아카이브 반영  

---

### 📁 아카이브 — 저장과 정리의 중심

![아카이브-URL-등록](https://github.com/user-attachments/assets/7881dd98-d068-4b28-af71-e10c41aae380)

- 뉴스·블로그·영상 등 다양한 콘텐츠를 한곳에 보관  
- **폴더별 관리** 및 **태그 기반 검색** 지원  
- 파일 **CRUD**, **휴지통 복원 기능** 내장  

---

### 📰 뉴스 페이지 — AI 추천 & 맞춤 탐색

| AI 추천 | 키워드 검색 |
|----------|-------------|
| ![뉴스-ai-추천](https://github.com/user-attachments/assets/ee292f7b-ef0f-41c8-876b-d5719636cbb6) | ![키워드 검색](https://github.com/user-attachments/assets/6f67462e-20ee-4b04-81b9-49e259557c9b) |

- 관심사 기반 **AI 뉴스 추천**  
- **키워드 검색**으로 주제별 뉴스 탐색  
- 저장 버튼 클릭 시 **아카이브로 즉시 추가**

---

### 👥 팀 스페이스 — 함께 아이디어를 확장하는 공간

| 스페이스 관리 | 데이터 공유 |
|----------|-------------|
| ![대시보드-생성](https://github.com/user-attachments/assets/05775580-2afa-4b2b-a5a4-7e1ce2653224) | ![대시보드-불러오기](https://github.com/user-attachments/assets/d0610991-bb0e-40f9-beed-3f983a1889e4) |




- 팀별 **스페이스 생성 및 초대 관리**  
- 스페이스별 **뉴스 추천 및 아카이브 공유**  
- 실시간 동기화로 협업 데이터 일관성 유지  

---

### 🎨 플로우 에디터 — 생각의 흐름을 시각화

<div align="center">

| 플로우 사용 | 실시간 협업 |
|----------|-------------|
| ![플로우-편집기](https://github.com/user-attachments/assets/2b56714b-be20-4605-8654-6d620d34a851) |![플로우-실시간-협업](https://github.com/user-attachments/assets/74cee822-feca-455b-9ce4-410445d8630b) |


</div>

- **React Flow 기반** 노드·엣지 그래프 편집  
- 드래그·줌·미니맵 등 편리한 조작 지원  
- **카테고리별 노드 관리** 및 연동  
- Liveblocks를 통한 **실시간 커서·댓글·Presence**  

---

### 🔐 소셜 인증 — 안전하고 간편한 로그인

![로그인-계정-관리](https://github.com/user-attachments/assets/328d11a3-08aa-4dca-b81c-7f574d9dad29)

- **Google / Kakao OAuth** 지원  
- **Refresh Token 자동 갱신**  
- 안전한 세션 및 로그아웃 처리  

---

## 🛠 기술 스택 & 선택 이유

### Frontend Framework

| 기술 | 버전 | 선택 이유 |
|------|------|-----------|
| **Next.js** | 15 | App Router, Turbopack 기반 SSR/SSG 최적화 |
| **React** | 19 | 최신 동시성 기능, Server Components 지원 |
| **TypeScript** | 5 | 정적 타입 안정성과 협업 생산성 |

### Realtime & Flow


| 기술 | 선택 이유 |
|------|------------|
| **Liveblocks** | 실시간 Presence/Comment Thread 구축 용이 |
| **XYFlow (React Flow)** | 노드 기반 플로우 UI, 커스텀 노드/엣지 확장성 |

### State & Data

| 기술 | 선택 이유 |
|------|------------|
| **React Query** | 서버 상태 캐싱/동기화, 로딩/에러 관리 일원화 |
| **Zustand** | 전역 상태를 단순하고 가볍게 관리 |

### UI & Styling

| 기술 | 선택 이유 |
|------|------------|
| **Radix UI** | 접근성 있는 Headless 컴포넌트 |
| **Lucide Icons** | 일관된 아이콘 세트, Tree Shaking 지원 |
| **Tailwind CSS 4** | 빠른 스타일링, 클래스 정렬 자동화 (Prettier 플러그인) |

### Developer Experience

| 기술 | 선택 이유 |
|------|------------|
| **Storybook 9** | 컴포넌트 단위 개발/문서화 |
| **Vitest + Playwright** | 단위·E2E 테스트 통합 |
| **ESLint + Prettier + Husky** | 일관된 코드 품질 유지 |

---

## 🚀 빠른 시작

### 사전 요구사항
- Node.js 20.x 이상  
- npm 또는 yarn

### 설치 및 실행
```bash
# 1. 저장소 클론
git clone https://github.com/your-username/zoopzoop.git
cd zoopzoop

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
cp .env.example .env.local

# 4. 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:3000` 열기

---

## ⚙️ 환경 변수

`.env.local` 파일을 생성하고 아래 항목을 설정합니다.
```bash
# 백엔드 API 엔드포인트
API_URL=https://api.example.com

# Liveblocks 서버 키 (서버 전용)
NEXT_LIVEBLOCKS_SECRET_KEY=sk_liveblocks_xxx
```

| 변수 | 설명 |
|------|------|
| `API_URL` | 백엔드 API 베이스 URL |
| `NEXT_LIVEBLOCKS_SECRET_KEY` | Liveblocks 서버 인증용 시크릿 키 (`/api/liveblocks-auth` 사용) |

---

## 📦 사용 가능한 스크립트
```bash
npm run dev              # 개발 서버 실행 (Turbopack)
npm run build            # 프로덕션 빌드
npm run start            # 프로덕션 서버 시작
npm run lint             # ESLint 검사
npm run format           # Prettier 포맷 적용
npm run storybook        # Storybook 서버 실행
npm run build-storybook  # Storybook 정적 빌드
```

---

## 📁 폴더 구조 (Feature-Sliced Design)
```
src/
├── app/          # Next.js App Router, 전역 Provider
├── features/     # 사용자 액션 단위 (로그인, 업로드 등)
├── entities/     # 도메인 모델, 상태, 타입 (User, Archive, Space 등)
├── widgets/      # 독립 UI 블록 (Header, Sidebar 등)
└── shared/       # 공용 컴포넌트, 유틸, 타입, 라이브러리
```

---

<div align="center">

ZoopZoop — 웹 지식의 흐름을 기록하고, 팀과 함께 발전시키는 공간 🧠✨

</div>
