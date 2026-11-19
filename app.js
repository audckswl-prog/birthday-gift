// 제품 데이터 정의 (3번 이미지 단품 가격 기준)
const COFFEES = {
  vanilla: {
    id: "vanilla",
    name: "바닐라 라떼",
    fullName: "까페드다몬 바닐라 라떼",
    price: 8500,
    diff: 0,
    artwork: "고흐 '별이 빛나는 밤'",
    color: "#233567",
    image: "assets/coffee-vanilla.png",
  },
  hazelnut: {
    id: "hazelnut",
    name: "헤이즐넛 라떼",
    fullName: "까페드다몬 헤이즐넛 라떼",
    price: 8500,
    diff: 0,
    artwork: "모네 '양산을 쓴 여인'",
    color: "#8a725a",
    image: "assets/coffee-hazelnut.png",
  },
  choco: {
    id: "choco",
    name: "밀크 쵸코레뜨",
    fullName: "까페드다몬 밀크 쵸코레뜨",
    price: 9500,
    diff: 1000,
    artwork: "모네 '정원의 여인들'",
    color: "#4d3627",
    image: "assets/coffee-choco.png",
  },
  latte: {
    id: "latte",
    name: "카페 라떼",
    fullName: "까페드다몬 카페 라떼",
    price: 9500,
    diff: 1000,
    artwork: "드가 '발레리나'",
    color: "#1c1917",
    image: "assets/coffee-latte.png",
  },
  matcha: {
    id: "matcha",
    name: "제주 말차 라떼",
    fullName: "까페드다몬 제주 말차 라떼",
    price: 10500,
    diff: 2000,
    artwork: "고흐 '사이프러스 밀밭'",
    color: "#285438",
    image: "assets/coffee-matcha.png",
  },
};

const CARE_ITEMS = {
  spray: {
    id: "spray",
    name: "마우스 스프레이",
    fullName: "글리스터 마우스 스프레이",
    price: 5500,
    sub: "식후·미팅 전 상쾌한 에티켓",
    image: "assets/care-spray.png",
  },
  lipbalm: {
    id: "lipbalm",
    name: "립밤",
    fullName: "g&h 너리쉬 립밤",
    price: 10000,
    sub: "시어버터 고보습 입술 케어",
    image: "assets/care-lipbalm.png",
  },
  handcream: {
    id: "handcream",
    name: "핸드 크림",
    fullName: "g&h 너리쉬 핸드 크림",
    price: 13000,
    sub: "끈적임 없는 향기 보습 케어",
    image: "assets/care-handcream.png",
  },
};

// 2번 이미지 추천 세트 1~5번 데이터 (원래 워딩)
const SETS = [
  {
    num: 1,
    basePrice: 11000,
    shippingFee: 2500,
    hasCoffee: true,
    extraItem: null,
    tag: "☕ 스벅 2잔 값에 고흐 명화 홈카페 15잔!",
    popularBadge: "가성비 BEST",
  },
  {
    num: 2,
    basePrice: 17000,
    shippingFee: 3000,
    hasCoffee: true,
    extraItem: "spray",
    tag: "✨ 달콤한 라떼 + 식후 상쾌한 마우스 스프레이",
    popularBadge: "호불호 0%",
  },
  {
    num: 3,
    basePrice: 18500,
    shippingFee: 3000,
    hasCoffee: false,
    fixedItems: ["lipbalm", "spray"],
    tag: "🌿 가방 속 필수 에티켓 2종! 커피 안 마시는 분께 딱",
    popularBadge: "🔥 인기 1위 꿀조합",
  },
  {
    num: 4,
    basePrice: 21500,
    shippingFee: 3000,
    hasCoffee: true,
    extraItem: "lipbalm",
    tag: "🎨 명화 홈카페와 촉촉한 립밤을 함께 챙기는 감성 조합",
    popularBadge: "센스 만점",
  },
  {
    num: 5,
    basePrice: 21500,
    shippingFee: 3000,
    hasCoffee: false,
    fixedItems: ["handcream", "spray"],
    tag: "🙌 남녀노소 사계절 매일 쓰는 실용성 끝판왕 세트",
    popularBadge: "실용성 갑",
  },
];

// 애플리케이션 상태
const state = {
  activeTab: "sets",
  setCoffeeSelection: {
    1: "vanilla",
    2: "vanilla",
    4: "vanilla",
  },
  selectionType: "set",
  selectedSetNum: 2,
  customCart: {},
  sheetMode: "gift",
  recipientName: "",
  orderMemo: "",
  sampleNameIdx: 0,
};

const SAMPLE_NAMES = ["김민수", "이지은", "박서준", "최유진"];

function formatKRW(num) {
  return num.toLocaleString("ko-KR") + "원";
}

// 세트 최종 가격 및 구성 텍스트 계산
function getSetComputed(setNum) {
  const setObj = SETS.find((s) => s.num === setNum);
  if (!setObj) return null;

  if (setObj.hasCoffee) {
    const coffeeKey = state.setCoffeeSelection[setNum] || "vanilla";
    const coffee = COFFEES[coffeeKey];
    const extra = setObj.extraItem ? CARE_ITEMS[setObj.extraItem] : null;
    const totalPrice = setObj.basePrice + coffee.diff;

    const title = extra
      ? `${coffee.name} + ${extra.name}`
      : `${coffee.fullName} (15개입)`;

    const breakdown = extra
      ? `${coffee.name} ${formatKRW(coffee.price)} + ${extra.name} ${formatKRW(extra.price)} + 배송비 ${formatKRW(setObj.shippingFee)}`
      : `${coffee.name} ${formatKRW(coffee.price)} + 배송비 ${formatKRW(setObj.shippingFee)}`;

    const isChanged = coffeeKey !== "vanilla";
    const optionSummary = isChanged
      ? `${setNum}번 세트 (${coffee.name}로 변경${extra ? " + " + extra.name : ""})`
      : `${setNum}번 세트 (${coffee.name}${extra ? " + " + extra.name : ""})`;

    const images = extra ? [coffee.image, extra.image] : [coffee.image];

    return {
      setNum,
      title,
      totalPrice,
      breakdown,
      optionSummary,
      coffee,
      extra,
      images,
      isChanged,
    };
  } else {
    const items = setObj.fixedItems.map((id) => CARE_ITEMS[id]);
    const title = items.map((i) => i.name).join(" + ");
    const breakdown =
      items.map((i) => `${i.name} ${formatKRW(i.price)}`).join(" + ") +
      ` + 배송비 ${formatKRW(setObj.shippingFee)}`;
    const optionSummary = `${setNum}번 세트 (${title})`;
    const images = items.map((i) => i.image);

    return {
      setNum,
      title,
      totalPrice: setObj.basePrice,
      breakdown,
      optionSummary,
      coffee: null,
      extra: null,
      images,
      isChanged: false,
    };
  }
}

// 단품 내맘대로 장바구니 계산
function getCustomCartComputed() {
  const entries = Object.entries(state.customCart).filter(([, qty]) => qty > 0);
  if (entries.length === 0) {
    return {
      totalQty: 0,
      itemsPrice: 0,
      shippingFee: 0,
      totalPrice: 0,
      title: "단품을 골라 담아보세요",
      optionSummary: "",
      images: [],
    };
  }

  let totalQty = 0;
  let itemsPrice = 0;
  const parts = [];
  const images = [];

  for (const [id, qty] of entries) {
    const item = COFFEES[id] || CARE_ITEMS[id];
    if (!item) continue;
    totalQty += qty;
    itemsPrice += item.price * qty;
    parts.push(qty > 1 ? `${item.name}×${qty}` : item.name);
    if (images.length < 3) images.push(item.image);
  }

  const isSingleCoffeeOnly =
    entries.length === 1 &&
    entries[0][1] === 1 &&
    Boolean(COFFEES[entries[0][0]]);
  const shippingFee = isSingleCoffeeOnly ? 2500 : 3000;
  const totalPrice = itemsPrice + shippingFee;

  return {
    totalQty,
    itemsPrice,
    shippingFee,
    totalPrice,
    title: parts.join(" + "),
    optionSummary: `내 맘대로 조합 (${parts.join(" + ")})`,
    images,
  };
}

// 세트 카드 목록 렌더링 (아치형 갤러리 디자인 + 원래 워딩)
function renderSets() {
  const grid = document.getElementById("sets-grid");

  grid.innerHTML = SETS.map((setObj) => {
    const comp = getSetComputed(setObj.num);
    const isSelected =
      state.selectionType === "set" && state.selectedSetNum === setObj.num;

    // 제품 스테이지 HTML
    let stageHTML = "";
    if (setObj.hasCoffee) {
      stageHTML = `
        <div class="stage-docent-caption">${comp.coffee.artwork}</div>
        <div class="stage-item">
          <img src="${comp.coffee.image}" alt="${comp.coffee.name}" id="stage-coffee-img-${setObj.num}" />
          <span class="stage-item-label">${comp.coffee.name} (15포)</span>
        </div>
      `;
      if (comp.extra) {
        stageHTML += `
          <div class="stage-plus">+</div>
          <div class="stage-item">
            <img src="${comp.extra.image}" alt="${comp.extra.name}" />
            <span class="stage-item-label">${comp.extra.name}</span>
          </div>
        `;
      }
    } else {
      const items = setObj.fixedItems.map((id) => CARE_ITEMS[id]);
      stageHTML = items
        .map(
          (item, idx) => `
          ${idx > 0 ? '<div class="stage-plus">+</div>' : ""}
          <div class="stage-item">
            <img src="${item.image}" alt="${item.name}" />
            <span class="stage-item-label">${item.name}</span>
          </div>
        `
        )
        .join("");
    }

    // 커피 종류 변경 스위치 HTML (1, 2, 4번 세트)
    let flavorSwitcherHTML = "";
    if (setObj.hasCoffee) {
      const currentCoffeeId = state.setCoffeeSelection[setObj.num];
      const flavorButtons = Object.values(COFFEES)
        .map((c) => {
          const activeClass = c.id === currentCoffeeId ? "active" : "";
          const diffText =
            c.diff === 0 ? "기본" : `+${c.diff.toLocaleString()}원`;
          return `
            <button
              type="button"
              class="flavor-btn ${activeClass}"
              data-action="change-flavor"
              data-set="${setObj.num}"
              data-coffee="${c.id}"
            >
              <span class="flavor-swatch" style="background:${c.color}"></span>
              <span>${c.name}</span>
              <span class="flavor-diff">${diffText}</span>
            </button>
          `;
        })
        .join("");

      flavorSwitcherHTML = `
        <div class="flavor-switcher">
          <div class="flavor-switcher-header">
            <span class="flavor-switcher-title">커피 종류 변경 (클릭해서 바꿔보세요!)</span>
            <span class="flavor-tap-hint">${comp.coffee.artwork}</span>
          </div>
          <div class="flavor-chips">
            ${flavorButtons}
          </div>
        </div>
      `;
    }

    return `
      <article class="set-card ${isSelected ? "selected" : ""}" id="set-card-${setObj.num}">
        <div class="set-card-top-bar">
          <span class="course-index">${setObj.num}번 세트</span>
          <span class="course-mood-tag">${setObj.popularBadge}</span>
        </div>

        <div class="set-title-area">
          <h3 id="set-title-${setObj.num}">${comp.title}</h3>
          <p class="set-curate-desc">${setObj.tag}</p>
        </div>

        <div class="arch-stage-wrap">
          <div class="product-stage">
            ${stageHTML}
          </div>
        </div>

        ${flavorSwitcherHTML}

        <div class="set-card-footer">
          <div class="price-block">
            <div class="price-main-row">
              <span class="set-price" id="set-price-${setObj.num}">${formatKRW(comp.totalPrice)}</span>
              <span class="ship-included-tag">배송비 포함</span>
            </div>
            <span class="price-breakdown" id="set-breakdown-${setObj.num}">${comp.breakdown}</span>
          </div>

          <button
            type="button"
            class="select-set-btn"
            data-action="select-set"
            data-set="${setObj.num}"
          >
            <span>🎁 이 조합으로 주문/체험</span>
          </button>
        </div>
      </article>
    `;
  }).join("");
}

// 단품 탭 렌더링
function renderCustomCatalog() {
  const coffeeGrid = document.getElementById("custom-coffee-grid");
  const careGrid = document.getElementById("custom-care-grid");

  coffeeGrid.innerHTML = Object.values(COFFEES)
    .map((c) => {
      const qty = state.customCart[c.id] || 0;
      return `
        <div class="custom-item-card ${qty > 0 ? "in-cart" : ""}">
          <div class="custom-item-img-wrap">
            <img src="${c.image}" alt="${c.name}" />
          </div>
          <span class="custom-item-art">${c.artwork}</span>
          <div class="custom-item-name">${c.name}</div>
          <div class="custom-item-price">${formatKRW(c.price)}</div>
          <div class="qty-control">
            <button type="button" class="qty-btn minus" data-custom-id="${c.id}" data-delta="-1">−</button>
            <span class="qty-val">${qty}</span>
            <button type="button" class="qty-btn plus" data-custom-id="${c.id}" data-delta="1">+</button>
          </div>
        </div>
      `;
    })
    .join("");

  careGrid.innerHTML = Object.values(CARE_ITEMS)
    .map((item) => {
      const qty = state.customCart[item.id] || 0;
      return `
        <div class="custom-item-card ${qty > 0 ? "in-cart" : ""}">
          <div class="custom-item-img-wrap">
            <img src="${item.image}" alt="${item.name}" />
          </div>
          <span class="custom-item-art">${item.sub}</span>
          <div class="custom-item-name">${item.name}</div>
          <div class="custom-item-price">${formatKRW(item.price)}</div>
          <div class="qty-control">
            <button type="button" class="qty-btn minus" data-custom-id="${item.id}" data-delta="-1">−</button>
            <span class="qty-val">${qty}</span>
            <button type="button" class="qty-btn plus" data-custom-id="${item.id}" data-delta="1">+</button>
          </div>
        </div>
      `;
    })
    .join("");
}

// 하단 플로팅 바 업데이트
function updateFloatingBar() {
  const badgeEl = document.getElementById("floating-badge");
  const titleEl = document.getElementById("floating-title");
  const priceEl = document.getElementById("floating-price");

  if (state.selectionType === "custom") {
    const custom = getCustomCartComputed();
    if (custom.totalQty > 0) {
      badgeEl.textContent = `🧩 내 맘대로 조합 (${custom.totalQty}개)`;
      titleEl.textContent = custom.title;
      priceEl.textContent = formatKRW(custom.totalPrice);
      return;
    } else {
      state.selectionType = "set";
    }
  }

  const comp = getSetComputed(state.selectedSetNum);
  badgeEl.textContent = `${comp.setNum}번 세트 선택됨${comp.isChanged ? " · 맛 변경" : ""}`;
  titleEl.textContent = comp.title;
  priceEl.textContent = formatKRW(comp.totalPrice);
}

// 카카오톡 메시지 생성 (원래 워딩)
function buildKakaoMessage() {
  const isCustom =
    state.selectionType === "custom" && getCustomCartComputed().totalQty > 0;
  const info = isCustom
    ? getCustomCartComputed()
    : getSetComputed(state.selectedSetNum);

  const nameTrimmed = state.recipientName.trim();
  const memoTrimmed = state.orderMemo.trim();

  if (state.sheetMode === "gift") {
    const lines = [
      "🎁 [생일선물 자판기 주문서]",
      `• 받는 사람: ${nameTrimmed || "(이름을 알려주세요)"}`,
      `• 선택 구성: ${info.optionSummary}`,
      `• 송금 금액: ${formatKRW(info.totalPrice)} (배송비 포함)`,
    ];
    if (memoTrimmed) {
      lines.push(`• 메모: ${memoTrimmed}`);
    }
    lines.push("");
    lines.push("이 조합으로 생일선물 신청할게! 바로 카카오 송금할게 💸");
    return lines.join("\n");
  } else {
    const lines = [
      "👀 [생일선물 자판기 미리 체험 완료!]",
      "내가 생일선물로 받는다면 이 조합이 원픽!",
      `• 내 원픽: ${info.optionSummary}`,
      `• 가격: ${formatKRW(info.totalPrice)} (배송비 포함)`,
    ];
    if (nameTrimmed) {
      lines.push(`• 다음에 선물하고 싶은 친구: ${nameTrimmed}`);
    }
    if (memoTrimmed) {
      lines.push(`• 한마디: ${memoTrimmed}`);
    }
    lines.push("");
    lines.push("오 이거 고르기 진짜 편하다ㅋㅋ 다음에 지인 생일 뜨면 이걸로 신청할게 🙌");
    return lines.join("\n");
  }
}

// 바텀 시트 내부 렌더링
function renderOrderSheet() {
  const isCustom =
    state.selectionType === "custom" && getCustomCartComputed().totalQty > 0;
  const info = isCustom
    ? getCustomCartComputed()
    : getSetComputed(state.selectedSetNum);

  const cardEl = document.getElementById("sheet-selected-card");
  const thumbsHTML = info.images
    .map((src) => `<img src="${src}" alt="선택 상품" />`)
    .join("");

  let quickSwitchHTML = "";
  if (!isCustom) {
    const setButtons = SETS.map(
      (s) =>
        `<button type="button" class="sheet-pill-btn ${s.num === state.selectedSetNum ? "active" : ""}" data-sheet-set="${s.num}">${s.num}번 세트</button>`
    ).join("");

    const currentSetObj = SETS.find((s) => s.num === state.selectedSetNum);
    let coffeeButtons = "";
    if (currentSetObj && currentSetObj.hasCoffee) {
      const curCoffee = state.setCoffeeSelection[state.selectedSetNum] || "vanilla";
      coffeeButtons =
        `<div class="sheet-quick-pills">` +
        Object.values(COFFEES)
          .map(
            (c) =>
              `<button type="button" class="sheet-pill-btn ${c.id === curCoffee ? "active" : ""}" data-sheet-coffee="${c.id}">☕ ${c.name}${c.diff > 0 ? ` (+${c.diff / 1000}천)` : ""}</button>`
          )
          .join("") +
        `</div>`;
    }

    quickSwitchHTML = `
      <div class="sheet-quick-pills">${setButtons}</div>
      ${coffeeButtons}
    `;
  }

  cardEl.innerHTML = `
    <div class="sheet-sel-top">
      <div class="sheet-sel-thumbs">${thumbsHTML}</div>
      <div class="sheet-sel-meta">
        <div class="sheet-sel-badge">${isCustom ? "🧩 내 맘대로 단품 조합" : `🎁 ${info.setNum}번 세트`}</div>
        <div class="sheet-sel-name">${info.title}</div>
        <div class="sheet-sel-price">${formatKRW(info.totalPrice)} <span style="font-size:0.72rem;font-weight:500;opacity:0.75;">(배송비 포함)</span></div>
      </div>
    </div>
    ${quickSwitchHTML}
  `;

  const helperEl = document.getElementById("mode-helper-text");
  const recipientLabel = document.getElementById("recipient-label");
  const copyBtnText = document.getElementById("copy-btn-text");

  if (state.sheetMode === "gift") {
    helperEl.textContent =
      "받으실 분 이름을 적으면 카톡으로 보낼 주문 문구가 자동으로 완성돼요! (연습 삼아 눌러보셔도 됩니다 😄)";
    recipientLabel.textContent = "🎂 선물 받으실 분 이름";
    copyBtnText.textContent = "주문 문구 복사하고 카톡으로 보내기";
  } else {
    helperEl.textContent =
      "당장 선물할 지인이 없어도 괜찮아요! 내가 받는다면 가장 마음에 드는 '원픽 조합'을 카톡으로 알려주세요 🙌";
    recipientLabel.textContent = "🎂 다음에 챙겨주고 싶은 친구 이름 (선택)";
    copyBtnText.textContent = "내 원픽 체험 문구 복사하고 카톡 보내기";
  }

  const previewEl = document.getElementById("kakao-message-preview");
  previewEl.textContent = buildKakaoMessage();
}

function openOrderSheet() {
  renderOrderSheet();
  document.getElementById("order-sheet-backdrop").classList.remove("hidden");
  document.getElementById("order-sheet").classList.remove("hidden");
}

function closeOrderSheet() {
  document.getElementById("order-sheet-backdrop").classList.add("hidden");
  document.getElementById("order-sheet").classList.add("hidden");
}

let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.remove("hidden");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    return true;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderSets();
  renderCustomCatalog();
  updateFloatingBar();

  // 메인 탭 전환
  document.querySelectorAll(".main-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTab = btn.dataset.tab;
      state.activeTab = targetTab;
      document
        .querySelectorAll(".main-tab")
        .forEach((b) => b.classList.toggle("active", b === btn));
      document
        .querySelectorAll(".tab-panel")
        .forEach((p) => p.classList.toggle("active", p.id === `tab-${targetTab}`));
    });
  });

  // 세트 그리드 내 이벤트 위임 (커피 맛 변경 & 세트 선택)
  document.getElementById("sets-grid").addEventListener("click", (e) => {
    const flavorBtn = e.target.closest("[data-action='change-flavor']");
    if (flavorBtn) {
      const setNum = Number(flavorBtn.dataset.set);
      const coffeeId = flavorBtn.dataset.coffee;
      state.setCoffeeSelection[setNum] = coffeeId;
      state.selectionType = "set";
      state.selectedSetNum = setNum;

      renderSets();
      updateFloatingBar();

      const imgEl = document.getElementById(`stage-coffee-img-${setNum}`);
      const priceEl = document.getElementById(`set-price-${setNum}`);
      if (imgEl) {
        imgEl.classList.remove("pop-anim");
        void imgEl.offsetWidth;
        imgEl.classList.add("pop-anim");
      }
      if (priceEl) {
        priceEl.classList.remove("price-bump");
        void priceEl.offsetWidth;
        priceEl.classList.add("price-bump");
      }
      return;
    }

    const selectBtn = e.target.closest("[data-action='select-set']");
    if (selectBtn) {
      const setNum = Number(selectBtn.dataset.set);
      state.selectionType = "set";
      state.selectedSetNum = setNum;
      renderSets();
      updateFloatingBar();
      openOrderSheet();
    }
  });

  // 단품 조립 탭 수량 증감
  document.getElementById("tab-custom").addEventListener("click", (e) => {
    const qtyBtn = e.target.closest(".qty-btn");
    if (!qtyBtn) return;
    const itemId = qtyBtn.dataset.customId;
    const delta = Number(qtyBtn.dataset.delta);
    const current = state.customCart[itemId] || 0;
    const next = Math.max(0, current + delta);
    if (next === 0) {
      delete state.customCart[itemId];
    } else {
      state.customCart[itemId] = next;
    }

    const customComp = getCustomCartComputed();
    if (customComp.totalQty > 0) {
      state.selectionType = "custom";
    } else {
      state.selectionType = "set";
    }

    renderCustomCatalog();
    updateFloatingBar();
  });

  // 플로팅 바 클릭 시 바텀 시트 오픈
  document.getElementById("open-sheet-btn").addEventListener("click", openOrderSheet);
  document.getElementById("floating-info-trigger").addEventListener("click", openOrderSheet);

  // 바텀 시트 닫기
  document.getElementById("sheet-close-btn").addEventListener("click", closeOrderSheet);
  document.getElementById("sheet-close-handle").addEventListener("click", closeOrderSheet);
  document.getElementById("order-sheet-backdrop").addEventListener("click", closeOrderSheet);

  // 시트 내부 모드 스위치
  document.querySelectorAll(".mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.sheetMode = btn.dataset.mode;
      document
        .querySelectorAll(".mode-btn")
        .forEach((b) => b.classList.toggle("active", b === btn));
      renderOrderSheet();
    });
  });

  // 시트 내부에서 세트/커피 종류 바로 변경
  document.getElementById("sheet-selected-card").addEventListener("click", (e) => {
    const setBtn = e.target.closest("[data-sheet-set]");
    if (setBtn) {
      state.selectionType = "set";
      state.selectedSetNum = Number(setBtn.dataset.sheetSet);
      renderSets();
      updateFloatingBar();
      renderOrderSheet();
      return;
    }
    const coffeeBtn = e.target.closest("[data-sheet-coffee]");
    if (coffeeBtn) {
      state.setCoffeeSelection[state.selectedSetNum] = coffeeBtn.dataset.sheetCoffee;
      renderSets();
      updateFloatingBar();
      renderOrderSheet();
    }
  });

  // 받는 사람 이름 & 메모 실시간 반영
  const recipientInput = document.getElementById("recipient-name");
  const memoInput = document.getElementById("order-memo");

  recipientInput.addEventListener("input", (e) => {
    state.recipientName = e.target.value;
    document.getElementById("kakao-message-preview").textContent = buildKakaoMessage();
  });

  memoInput.addEventListener("input", (e) => {
    state.orderMemo = e.target.value;
    document.getElementById("kakao-message-preview").textContent = buildKakaoMessage();
  });

  // 예시 이름 넣어보기 버튼
  document.getElementById("sample-name-btn").addEventListener("click", () => {
    const sample = SAMPLE_NAMES[state.sampleNameIdx % SAMPLE_NAMES.length];
    state.sampleNameIdx++;
    state.recipientName = sample;
    recipientInput.value = sample;
    document.getElementById("kakao-message-preview").textContent = buildKakaoMessage();
    showToast(`✨ 예시 이름 '${sample}'님이 입력되었어요!`);
  });

  // 주문 문구 복사하기
  document.getElementById("copy-kakao-btn").addEventListener("click", async () => {
    const msg = buildKakaoMessage();
    await copyTextToClipboard(msg);
    showToast("✅ 카톡 주문 문구가 복사되었어요! 카톡방에 붙여넣기 해주세요 💬");
  });
});
