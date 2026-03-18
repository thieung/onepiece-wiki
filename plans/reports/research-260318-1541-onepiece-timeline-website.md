# Research Report: One Piece Interactive Timeline Website

**Date:** 2026-03-18
**Task:** Xây dựng trang web tương tác hiển thị timeline các saga và arc One Piece theo thứ tự với số chương và tóm tắt ngắn gọn, phong cách anime/manga One Piece vibe.

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [One Piece Arc Data](#one-piece-arc-data)
3. [Tech Stack Recommendations](#tech-stack-recommendations)
4. [Design System](#design-system)
5. [Implementation Recommendations](#implementation-recommendations)
6. [Unresolved Questions](#unresolved-questions)

---

## Executive Summary

Dự án là static web app hiển thị toàn bộ saga/arc One Piece theo timeline thứ tự với số chương và tóm tắt. Tech stack tối giản nhất: **Vanilla HTML/CSS/JS** (không cần framework), dùng **CSS Scroll-Driven Animations** (Chrome/Firefox native 2024+), phong cách visual theo brand colors chính thức của One Piece (đỏ, vàng, đen). Dữ liệu arc có thể hardcode dạng JSON trong JS file.

---

## One Piece Arc Data

Tổng cộng **11 saga**, **34+ arc**, **1100+ chapter** (đang tiếp tục).

### 1. East Blue Saga (Ch. 1–100)

| Arc | Chapters | Summary |
|-----|----------|---------|
| Romance Dawn | 1–7 | Luffy ăn trái 악마no Mi Gomu-Gomu, bắt đầu hành trình. Gặp và chiêu mộ Zoro. |
| Orange Town | 8–21 | Gặp Nami, đánh bại Buggy the Clown tại thị trấn bị hoang hóa. |
| Syrup Village | 22–41 | Usopp gia nhập sau khi bảo vệ làng khỏi cướp biển Black Cat. |
| Baratie | 42–68 | Sanji gia nhập sau trận chiến với Don Krieg tại nhà hàng nổi. |
| Arlong Park | 69–95 | Giải phóng quê hương Nami khỏi Arlong và băng cướp Cá Người. |
| Loguetown | 96–100 | Viếng thăm nơi Gold Roger bị hành quyết, chuẩn bị vào Grand Line. |

### 2. Arabasta Saga (Ch. 101–217)

| Arc | Chapters | Summary |
|-----|----------|---------|
| Reverse Mountain | 101–105 | Vào Grand Line qua cá voi Laboon. |
| Whiskey Peak | 106–114 | Thị trấn bẫy ẩn chứa tổ chức tội phạm Baroque Works. |
| Little Garden | 115–129 | Đảo khủng long với hai người khổng lồ đang chiến nhau 100 năm. |
| Drum Island | 130–154 | Chopper gia nhập; Vivi dẫn nhóm tới Arabasta. |
| Arabasta | 155–217 | Đại chiến để cứu vương quốc của Vivi khỏi Crocodile và Baroque Works. |

### 3. Sky Island Saga (Ch. 218–302)

| Arc | Chapters | Summary |
|-----|----------|---------|
| Jaya | 218–236 | Tìm đường lên đảo trên trời, gặp Blackbeard lần đầu. |
| Skypiea | 237–302 | Chiến với thần Enel trên đảo mây Skypiea; khai quật lịch sử Laugh Tale. |

### 4. Water 7 Saga (Ch. 303–441)

| Arc | Chapters | Summary |
|-----|----------|---------|
| Long Ring Long Land | 303–321 | Cuộc thi Davy Back Fight với băng Foxy. |
| Water 7 | 322–374 | Tàu Merry hỏng, Robin biến mất, nội bộ rạn nứt; Robin bị CP9 bắt. |
| Enies Lobby | 375–430 | Tấn công tòa pháp đình thế giới, giải cứu Robin; Luffy tuyên chiến Chính phủ Thế giới. |
| Post-Enies Lobby | 431–441 | Franky gia nhập; tàu Thousand Sunny ra đời. |

### 5. Thriller Bark Saga (Ch. 442–489)

| Arc | Chapters | Summary |
|-----|----------|---------|
| Thriller Bark | 442–489 | Đảo ma Thriller Bark, zombie, Shichibukai Moria; Brook gia nhập. |

### 6. Summit War Saga (Ch. 490–597)

| Arc | Chapters | Summary |
|-----|----------|---------|
| Sabaody Archipelago | 490–513 | Đảo rừng sú vẹt, gặp Haki lần đầu; nhóm bị Kizaru và Kuma đánh tan. |
| Amazon Lily | 514–524 | Luffy bị đưa tới đảo nữ nhân, gặp Hancock. |
| Impel Down | 525–549 | Đột nhập ngục Impel Down cứu Ace, giải phóng tù nhân. |
| Marineford | 550–580 | Đại chiến Marineford; Ace chết, Whitebeard chết — bi kịch nhất series. |
| Post-War | 581–597 | Luffy hồi phục; nhóm tập hợp lại sau 2 năm. |

### 7. Fish-Man Island Saga (Ch. 598–653)

| Arc | Chapters | Summary |
|-----|----------|---------|
| Return to Sabaody | 598–602 | Đoàn tụ sau 2 năm luyện tập; khởi hành dưới nước. |
| Fish-Man Island | 603–653 | Đảo Cá Người dưới đại dương; Hody Jones và lịch sử phân biệt chủng tộc. |

### 8. Dressrosa Saga (Ch. 654–801)

| Arc | Chapters | Summary |
|-----|----------|---------|
| Punk Hazard | 654–699 | Đảo địa ngục nửa lửa nửa băng; Caesar Clown thí nghiệm trên trẻ em; liên minh với Law. |
| Dressrosa | 700–801 | Lật đổ Doflamingo cai trị đảo; Luffy dùng Gear 4 lần đầu; hình thành Liên minh Straw Hat. |

### 9. Whole Cake Island Saga (Ch. 802–908)

| Arc | Chapters | Summary |
|-----|----------|---------|
| Zou | 802–824 | Đảo voi khổng lồ; gặp Mink Tribe; tiết lộ về Raizo và Wano. |
| Whole Cake Island | 825–902 | Xâm nhập lãnh thổ Big Mom để cứu Sanji; Luffy vs Katakuri; Big Mom liên tiếp tấn công. |
| Levely | 903–908 | Hội nghị Levely — các vua chúa họp; biến động thế giới bắt đầu. |

### 10. Wano Country Saga (Ch. 909–1057)

| Arc | Chapters | Summary |
|-----|----------|---------|
| Wano Country | 909–1057 | Xứ Wano bị Kaido chiếm đóng; liên minh lớn nhất; Luffy Gear 5 — Joy Boy thức dậy. |

### 11. Final Saga (Ch. 1058–ongoing)

| Arc | Chapters | Summary |
|-----|----------|---------|
| Egghead | 1058–1116 | Đảo khoa học của Vegapunk; bí mật lịch sử 800 năm được tiết lộ; Chính phủ Thế giới tổng tấn công. |
| Elbaf | 1117–ongoing | Đảo người khổng lồ; Shanks xuất hiện; hành trình tiến tới Laugh Tale. |

---

## Tech Stack Recommendations

### Core Stack (Minimal, No Framework)
```
HTML5 + CSS3 + Vanilla JS
├── Dữ liệu: JSON hardcoded trong JS file
├── Animation: CSS Scroll-Driven Animations (native 2024+)
├── Font: Google Fonts (Bangers + Noto Sans JP)
└── Build: None (single HTML file hoặc static files)
```

### Thư viện tùy chọn
- **Anime.js** — nếu cần animation phức tạp hơn CSS thuần
- **AOS (Animate On Scroll)** — fallback cho Safari (chưa support CSS scroll-driven)
- **GSAP ScrollTrigger** — nếu cần timeline animations chuyên nghiệp

### CSS Scroll-Driven Animations (2024 Native)
```css
/* Fade-in card khi scroll vào view */
@keyframes fade-slide-in {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.arc-card {
  animation: fade-slide-in linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}
```
Browser support: Chrome ✅, Firefox ✅ (flag), Safari ❌ (polyfill cần thiết)

---

## Design System

### Color Palette (Official One Piece)
```css
:root {
  /* Primary */
  --op-red: #D70000;        /* Luffy's vest, logo */
  --op-yellow: #FFCE00;     /* Gold, treasure */
  --op-black: #1A1A1A;      /* Background dark */
  --op-white: #FEFEFE;      /* Text light */

  /* Secondary */
  --op-navy: #0B3075;       /* Ocean deep */
  --op-sky-blue: #62C3F8;   /* Sky, sea surface */
  --op-brown: #AF6528;      /* Wood, ship */

  /* Saga accent colors */
  --saga-east-blue: #4FC3F7;
  --saga-arabasta: #FFB74D;
  --saga-sky: #E1F5FE;
  --saga-water7: #1565C0;
  --saga-thriller: #4A148C;
  --saga-summit: #B71C1C;
  --saga-fishman: #006064;
  --saga-dressrosa: #E91E63;
  --saga-wholecake: #F06292;
  --saga-wano: #E65100;
  --saga-final: #FFD700;
}
```

### Typography
```css
/* Heading - Manga style */
font-family: 'Bangers', cursive;        /* Bold, comic-like */
font-family: 'Pirata One', cursive;     /* Pirate theme */

/* Body - Readable */
font-family: 'Noto Sans', sans-serif;  /* Clean body text */
font-family: 'Crimson Text', serif;    /* Story summaries */
```

### UI Components
- **Arc Card**: Manga panel style — thick black border, slight tilt, halftone texture
- **Saga Header**: Full-width banner với saga color + tên lớn kiểu Bangers font
- **Chapter Badge**: Pill badge style `Ch. XXX–YYY` màu vàng gold
- **Timeline Line**: Vertical line connecting cards, animated scroll progress
- **Navigation**: Sticky saga nav bar để jump tới saga

### Manga Panel Effects (CSS)
```css
/* Halftone texture */
.manga-card {
  background-image: radial-gradient(circle, #00000015 1px, transparent 1px);
  background-size: 4px 4px;
}

/* Speed lines */
.speed-lines {
  background: repeating-conic-gradient(
    from 0deg at 50% 50%,
    transparent 0deg, transparent 9deg,
    rgba(0,0,0,0.03) 9deg, rgba(0,0,0,0.03) 10deg
  );
}

/* Panel border */
.arc-card {
  border: 3px solid #1A1A1A;
  box-shadow: 4px 4px 0 #1A1A1A;
}
```

---

## Implementation Recommendations

### Cấu trúc File
```
onepiece-timeline/
├── index.html
├── css/
│   ├── variables.css      # Design tokens
│   ├── base.css           # Reset + typography
│   ├── timeline.css       # Timeline layout
│   ├── cards.css          # Arc/saga cards
│   └── animations.css     # Scroll animations
├── js/
│   ├── data.js            # All arc/saga data as JSON
│   ├── render.js          # DOM rendering
│   └── navigation.js      # Saga nav + filter
└── assets/
    └── fonts/
```

### Data Structure (data.js)
```js
const ONE_PIECE_DATA = [
  {
    id: "east-blue",
    name: "East Blue Saga",
    chapters: "1–100",
    color: "#4FC3F7",
    arcs: [
      {
        name: "Romance Dawn",
        chapters: "1–7",
        summary: "Luffy bắt đầu hành trình, chiêu mộ Zoro làm thuyền viên đầu tiên.",
        crew: ["Luffy", "Zoro"]
      },
      // ...
    ]
  }
  // ...
];
```

### Features
1. **Vertical scrolling timeline** — cards xuất hiện khi scroll
2. **Saga navigation** — fixed top bar cho phép jump
3. **Filter by saga** — click để ẩn/hiện saga
4. **Search arc** — tìm kiếm theo tên arc
5. **Responsive** — mobile-friendly

### Performance
- Lazy load: Dùng `IntersectionObserver` để render cards khi cần
- Không cần backend, static site hoàn toàn
- Single HTML file deploy được lên GitHub Pages / Netlify

---

## Unresolved Questions

1. **Elbaf arc chapters**: Đang ongoing (1117+), số chapter cuối chưa xác định. Cần cập nhật định kỳ.
2. **Images/artwork**: Có dùng ảnh nhân vật không? Nếu có, cần xử lý bản quyền (chỉ fan art hoặc official media).
3. **Localization**: Tiếng Việt hay Tiếng Anh cho tên arc và summary?
4. **Safari support**: CSS Scroll-Driven Animations chưa support Safari — cần polyfill hay graceful degradation?
5. **Deployment**: GitHub Pages, Netlify, hay server riêng?

---

## Sources
- [Story Arcs | One Piece Wiki | Fandom](https://onepiece.fandom.com/wiki/Story_Arcs)
- [All One Piece Arcs in Order (2026 Guide) | Beebom](https://beebom.com/one-piece-arcs-in-order/)
- [CSS Scroll-Driven Animations — Smashing Magazine](https://www.smashingmagazine.com/2024/12/introduction-css-scroll-driven-animations/)
- [animation-timeline — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline)
- [Anime.js](https://animejs.com/)
- [One Piece Color Codes — Brand Palettes](https://brandpalettes.com/one-piece-color-codes/)
- [One Piece Series Color Scheme — SchemeColor](https://www.schemecolor.com/one-piece-series.php)
