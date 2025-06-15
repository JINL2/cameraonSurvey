# Listen Customers Design Resources

이 폴더는 Listen Customers 웹사이트 제작에 필요한 모든 디자인 리소스를 포함합니다.

## 🚀 빠른 시작

1. **로고 사용**: `/logos/` 폴더에서 적절한 색상의 로고 선택
2. **폰트 적용**: `/fonts/` 폴더의 폰트 파일 사용
3. **색상 확인**: `/colors/README.md`에서 브랜드 컬러 확인
4. **가이드 참조**: `design.md`에서 상세한 디자인 시스템 확인

## 📁 폴더 구조

```
design_resources/
├── README.md           # 현재 파일
├── design.md          # 상세 디자인 시스템 가이드
├── logos/             # 로고 파일들
│   ├── README.md
│   ├── black/         # 검정 로고
│   ├── white/         # 흰색 로고
│   ├── orange/        # 오렌지 로고
│   └── ai_files/      # 원본 AI 파일
├── fonts/             # 브랜드 폰트
│   └── README.md
└── colors/            # 색상 가이드
    └── README.md
```

## 🎨 브랜드 요약

- **Primary Color**: Orange (#FF6B35)
- **Font**: Montserrat (헤드라인), Noto Sans KR (본문)
- **Logo**: 3가지 색상 버전 제공 (Black, White, Orange)

## 💻 개발자를 위한 팁

### CSS 초기 설정
```css
/* 브랜드 컬러 변수 */
:root {
  --primary: #FF6B35;
  --black: #000000;
  --white: #FFFFFF;
}

/* 폰트 설정 */
body {
  font-family: 'Noto Sans KR', sans-serif;
}

h1, h2, h3 {
  font-family: 'Montserrat', sans-serif;
}
```

### 로고 HTML 예시
```html
<img src="/design_resources/logos/black/logo.png" 
     alt="Listen Customers" 
     width="200">
```

## 📝 주의사항

1. 로고 비율을 변경하지 마세요
2. 지정된 색상만 사용하세요
3. 폰트 대체 시 가이드라인을 따르세요
4. 최소 크기 규정을 준수하세요

## 🔗 관련 문서

- [상세 디자인 가이드](./design.md)
- [로고 사용 가이드](./logos/README.md)
- [폰트 사용 가이드](./fonts/README.md)
- [색상 사용 가이드](./colors/README.md)

## 📞 문의

디자인 관련 문의사항이 있으면 디자인 팀에 연락하세요.

---
*Version: 1.0*
*Last Updated: 2025-06-15*
