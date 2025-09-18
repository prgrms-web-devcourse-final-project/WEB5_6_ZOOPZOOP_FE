# 🧱 Feature-Sliced Design 구조 및 규칙

## 📁 기본 디렉토리 구조

```bash
src/
│
├── app/            # 앱 전체 설정 및 초기화 (라우팅, 글로벌 프로바이더 등)
├── pages/          # 페이지 단위 (라우트와 직접 매칭)
├── features/       # 사용자 액션 단위 (ex. 로그인, 필터 등)
├── entities/       # 도메인 모델 단위 (ex. 유저, 게시글 등)
├── shared/         # 재사용 가능한 컴포넌트, 유틸, 타입, 라이브러리 등
└── widgets/        # 독립적인 UI 블록, feature 조합 결과물
```

## 📌 핵심 규칙

### ✅ 1. 공개/비공개 API 구분

- 외부에서 접근 가능한 코드는 `index.ts`에 정리합니다.

```ts
// features/auth/index.ts
export { LoginForm } from './ui/LoginForm'
export { useLogin } from './model/useLogin'
```

- 외부에서는 반드시 `index.ts`를 통해 import 해야 합니다.

```ts
// ✅ 권장
import { LoginForm } from 'features/auth'

// ❌ 비권장
import { LoginForm } from 'features/auth/ui/LoginForm'
```

### ✅ 2. 레이어 간 접근 규칙

레이어 간 의존성은 **단방향**만 허용됩니다:
자신보다 하위 레이어의 구성 요소만 참조하거나 임포트할 수 있다는 것을 의미합니다.
예를 들어, Features 레이어는 Shared나 Entities 레이어의 구성 요소를 참조할 수 있지만, Widgets 레이어의 구성 요소는 참조할 수 없습니다.

```txt
shared → entities → features → widgets → processes → pages → app
```

### ✅ 3. `model/` 디렉토리 사용

- 상태 관리, 훅, 비즈니스 로직 등은 `model/` 하위에 정리합니다.
- 역할에 따라 `model.ts`, `hooks.ts`, `slice.ts`, `selectors.ts` 등으로 구분합니다.

### ✅ 4. `ui/` 디렉토리 사용

- 해당 기능의 시각적 컴포넌트는 `ui/`에 위치합니다.
- 반복적으로 쓰이는 UI 요소는 `shared/ui`로 추출합니다.

### ✅ 5. 책임 기준 폴더 설계

| Layer       | 설명                                       |
| ----------- | ------------------------------------------ |
| `shared/`   | 전역 유틸, 컴포넌트, 타입, 스타일 등       |
| `entities/` | 핵심 도메인 상태 및 타입 정의              |
| `features/` | 유저 액션 단위 기능 (로그인, 필터 등)      |
| `widgets/`  | 여러 features를 조합한 독립 UI 블록        |
| `pages/`    | 라우팅과 직접 연결되는 화면 단위           |
| `app/`      | 라우터, 테마, 글로벌 스토어 등 초기화 영역 |

### ✅ 6. 명명 규칙

- 폴더 및 파일은 도메인/기능 기반으로 구성합니다.
  - 예: `features/login-form`, `entities/user`, `widgets/header`

- 네이밍은 일관성 있게 유지합니다.
  - 예: `useLogin`, `authSlice`, `getUserById`, `UserCard`
