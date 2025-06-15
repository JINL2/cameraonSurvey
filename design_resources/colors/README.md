# Colors Directory

이 폴더는 Listen Customers의 브랜드 컬러 가이드를 포함합니다.

## 브랜드 컬러 팔레트

### Primary Colors
```
Orange: #FF6B35
RGB: 255, 107, 53
사용: 메인 브랜드 컬러, CTA 버튼, 강조
```

### Neutral Colors
```
Black: #000000
RGB: 0, 0, 0
사용: 주요 텍스트, 로고

White: #FFFFFF
RGB: 255, 255, 255
사용: 배경, 반전 텍스트
```

### Gray Scale
```
Dark Gray: #333333
RGB: 51, 51, 51
사용: 부제목, 보조 텍스트

Medium Gray: #666666
RGB: 102, 102, 102
사용: 메타 정보, 비활성 상태

Light Gray: #F5F5F5
RGB: 245, 245, 245
사용: 배경, 구분선
```

### Status Colors
```
Success: #4CAF50
RGB: 76, 175, 80
사용: 성공 메시지, 완료 상태

Warning: #FF9800
RGB: 255, 152, 0
사용: 경고 메시지, 주의 상태

Error: #F44336
RGB: 244, 67, 54
사용: 에러 메시지, 실패 상태
```

## CSS 컬러 변수

```css
:root {
  /* Primary */
  --color-primary: #FF6B35;
  --color-primary-light: #FF8A65;
  --color-primary-dark: #E55100;
  
  /* Neutral */
  --color-black: #000000;
  --color-white: #FFFFFF;
  --color-gray-dark: #333333;
  --color-gray-medium: #666666;
  --color-gray-light: #F5F5F5;
  
  /* Status */
  --color-success: #4CAF50;
  --color-warning: #FF9800;
  --color-error: #F44336;
}
```

## 사용 가이드

1. **Primary Orange**는 주요 액션과 브랜드 아이덴티티에만 사용
2. **Black**은 주요 텍스트와 헤드라인에 사용
3. **Gray Scale**은 계층 구조를 표현할 때 사용
4. **Status Colors**는 사용자 피드백에만 사용

## 접근성 고려사항

- 텍스트와 배경의 명도 대비는 WCAG AA 기준(4.5:1) 이상 유지
- Primary Orange (#FF6B35)는 흰색 배경에서만 텍스트로 사용
