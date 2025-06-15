# Camera On (Listen Customers) 디자인 시스템 가이드

## 📁 폴더 구조

```
design_resources/
├── logos/                # 로고 파일들
│   ├── black/           # 검정색 로고 버전
│   ├── white/           # 흰색 로고 버전
│   ├── orange/          # 오렌지색 로고 버전
│   └── ai_files/        # AI 원본 파일
├── fonts/               # 브랜드 폰트
├── colors/              # 색상 가이드
└── design.md           # 디자인 시스템 문서 (현재 파일)
```

## 🎨 브랜드 컬러

### 주요 색상
- **Primary Orange**: #FF6B35 (Listen Customers 시그니처 컬러)
- **Black**: #000000 (텍스트 및 로고)
- **White**: #FFFFFF (배경 및 반전 로고)

### 보조 색상
- **Dark Gray**: #333333 (부제목 및 보조 텍스트)
- **Light Gray**: #F5F5F5 (배경색)
- **Success Green**: #4CAF50
- **Error Red**: #F44336

## 🔤 타이포그래피

### 주요 폰트
- **브랜드 메인**: AmpleSoft Medium
- **디스플레이**: Unbounded Variable
- **보조**: Myriad Pro Regular
- **헤드라인 (대체)**: Montserrat Bold
- **본문 (대체)**: Noto Sans KR Regular

### 폰트 사이즈
```css
/* 제목 */
h1: 48px / 3rem
h2: 36px / 2.25rem
h3: 24px / 1.5rem
h4: 20px / 1.25rem

/* 본문 */
body: 16px / 1rem
small: 14px / 0.875rem
```

## 📐 로고 사용 가이드

### 로고 버전
1. **Black Logo**: 밝은 배경에서 사용
   - logo.png (기본 로고)
   - logo_full.png (전체 텍스트 포함)
   - logo_short.png (축약형)
2. **White Logo**: 어두운 배경에서 사용
   - logo_full.png, logo_full.webp
3. **Orange Logo**: 특별한 경우나 강조가 필요할 때 사용
   - logo.png, logo_full.png, logo_short.png

### 최소 여백
- 로고 주변에는 로고 높이의 50% 이상의 여백 확보

### 최소 크기
- 웹: 120px (가로 기준)
- 모바일: 80px (가로 기준)

## 💻 웹 구현 예시

### CSS 변수 설정
```css
:root {
  /* Colors */
  --primary-orange: #FF6B35;
  --black: #000000;
  --white: #FFFFFF;
  --dark-gray: #333333;
  --light-gray: #F5F5F5;
  
  /* Fonts */
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Noto Sans KR', sans-serif;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}
```

### HTML 로고 사용 예시
```html
<!-- 기본 로고 -->
<img src="/design_resources/logos/black/logo.png" alt="Listen Customers" class="logo">

<!-- 반응형 로고 -->
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/design_resources/logos/white/logo.png">
  <img src="/design_resources/logos/black/logo.png" alt="Listen Customers">
</picture>
```

## 📱 반응형 디자인 브레이크포인트

```css
/* Mobile First Approach */
/* Mobile: 320px - 767px (기본) */

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1440px) { }
```

## 🔗 파일 액세스 가이드

### 로고 파일 경로
- Black Logo: `/design_resources/logos/black/logo.png`
- White Logo: `/design_resources/logos/white/logo.png`
- Orange Logo: `/design_resources/logos/orange/logo.png`
- AI Files: `/design_resources/logos/ai_files/`

### 폰트 파일 경로
- `/design_resources/fonts/`

### 사용 시 주의사항
1. 로고 비율을 변경하지 마세요
2. 로고 색상을 임의로 변경하지 마세요
3. 지정된 폰트만 사용하세요
4. 브랜드 컬러를 일관되게 사용하세요

## 📋 체크리스트

홈페이지 제작 시 확인사항:
- [ ] 올바른 로고 버전 사용
- [ ] 브랜드 컬러 일관성
- [ ] 지정된 폰트 적용
- [ ] 최소 여백 규칙 준수
- [ ] 반응형 디자인 적용

---

*Last Updated: 2025-06-15*
*Design System Version: 1.0*
