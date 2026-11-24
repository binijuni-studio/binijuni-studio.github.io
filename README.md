# BiniJuni Studio

React·TypeScript·Vite로 만든 회사 홈페이지입니다. React 소스는 `parcelstack/studio`에 있습니다. 게임의 영문 표기는 Parcel Stack이며, 기존 `pacelstack` 주소는 `parcelstack`으로 연결됩니다.

## 실행

Node.js 24에서 프로젝트 루트 기준으로 실행합니다. Windows PowerShell에서 실행 정책 때문에 `npm`이 차단되면 `npm.cmd`를 사용합니다.

```sh
npm install
npm run dev
```

터미널에 표시된 로컬 주소를 엽니다. 개발 서버에서 회사 홈페이지와 기존 게임 페이지를 함께 확인할 수 있습니다.

## 빌드와 검증

```sh
npm run typecheck
npm run build
npm run check
npm run preview
```

`dist`에는 React 회사 홈페이지와 게임별 소개·지원·개인정보 페이지, `app-ads.txt`가 함께 생성됩니다. 기존 게임 파일은 변경 없이 복사하며 React 소스 폴더는 복사하지 않습니다. 검증 명령은 React 렌더링, 내비게이션, 게임별 링크, 번들·폰트 경로 및 기존 파일 보존을 확인합니다.

## GitHub Pages

저장소 Settings → Pages → Build and deployment → Source를 **GitHub Actions**로 선택합니다. `main` 또는 `master`에 푸시하면 포함된 워크플로가 빌드·검증 후 `dist`를 배포합니다. Actions에서 수동 실행할 수도 있습니다. 소스 파일을 그대로 게시하는 브랜치 방식 대신 빌드 결과를 배포해야 합니다.

## 디자인과 수정 위치

- 화면·문구·게임 링크: `parcelstack/studio/App.tsx`
- 색상·레이아웃·모바일 화면: `parcelstack/studio/style.css`
- 로고 원본: `parcelstack/studio/assets/logo.svg`
- 메타 정보: 루트 `index.html`

로고는 소문자 **b**와 **j**를 조합한 모노그램입니다. Bini와 Juni를 하나의 둥근 정사각형 안에 담았고, 딥그린은 차분함, 코랄은 가벼운 즐거움을 표현합니다. SVG이므로 작은 파비콘부터 큰 브랜드 심볼까지 선명하게 사용할 수 있습니다.

게임 이미지와 스크린샷은 저장소의 기존 자료를 사용합니다. Pretendard 폰트는 로컬에서 제공하며 라이선스는 `parcelstack/studio/assets/OFL-Pretendard.txt`에 포함했습니다. 문의 링크는 이메일 앱을 엽니다.

Stunt Bike Tour 배너와 아이콘은 사용자가 지정한 `D:/Projects/REA_example/RN_UBAN`의 게임 자료를 사용합니다. 출처는 `stuntbiketour/assets/SOURCES.md`에 기록했습니다. 반응형 이미지는 원본 비율을 유지하며, 빌드와 검증 과정에서 TypeScript 타입 검사를 실행합니다.
