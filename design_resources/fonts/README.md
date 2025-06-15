# Fonts Directory

이 폴더는 Listen Customers의 브랜드 폰트를 포함합니다.

## 폰트 목록

### 실제 사용 폰트 (Camera On 브랜드)
- **AmpleSoft Medium** (브랜드 메인 폰트)
  - AmpleSoft_Medium.ttf
  
- **Unbounded** (디스플레이 폰트)
  - Unbounded-VariableFont_wght.ttf
  
- **Myriad Pro** (보조 폰트)
  - MyriadPro-Regular.otf

### 주요 폰트 (Listen Customers)
- **Montserrat** (헤드라인 및 강조)
  - Montserrat-Bold.ttf
  - Montserrat-Medium.ttf
  - Montserrat-Regular.ttf

- **Noto Sans KR** (본문 및 한글)
  - NotoSansKR-Regular.otf
  - NotoSansKR-Medium.otf
  - NotoSansKR-Bold.otf

## 웹폰트 사용법

```css
/* CSS에서 폰트 불러오기 */
@font-face {
  font-family: 'Montserrat';
  src: url('/design_resources/fonts/Montserrat-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'Noto Sans KR';
  src: url('/design_resources/fonts/NotoSansKR-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
}
```

## 폰트 사용 가이드

1. **헤드라인**: Montserrat Bold
2. **서브 헤드라인**: Montserrat Medium
3. **본문**: Noto Sans KR Regular
4. **강조 텍스트**: Noto Sans KR Medium

## 대체 폰트

웹폰트 로딩 실패 시:
- Montserrat → Arial, sans-serif
- Noto Sans KR → 'Malgun Gothic', sans-serif
