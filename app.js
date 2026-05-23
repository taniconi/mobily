// Firebase の CDN から必要な機能だけを読み込みます。
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase コンソールで発行された設定値をそのまま使います。
const firebaseConfig = {
  apiKey: "AIzaSyC_WlAo0yaT68qUd96HYk8iCrfpZxxe0is",
  authDomain: "mobily-1e2ef.firebaseapp.com",
  projectId: "mobily-1e2ef",
  storageBucket: "mobily-1e2ef.firebasestorage.app",
  messagingSenderId: "302087927393",
  appId: "1:302087927393:web:56947ffbcb938f6c7f9c20",
  measurementId: "G-T1XBM4LFQC",
};

// Firebase を初期化します。
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 画面で使う要素をまとめて取得しておきます。
const authScreen = document.getElementById("auth-screen");
const appScreen = document.getElementById("app-screen");
const loginAuthPanel = document.getElementById("login-auth-panel");
const signupAuthPanel = document.getElementById("signup-auth-panel");
const tabPanels = document.querySelectorAll(".tab-panel");
const homeButton = document.getElementById("home-button");
const mypageButton = document.getElementById("mypage-button");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const loginEmailInput = document.getElementById("login-email");
const loginPasswordInput = document.getElementById("login-password");
const signupEmailInput = document.getElementById("signup-email");
const signupPasswordInput = document.getElementById("signup-password");
const goSignupButton = document.getElementById("go-signup-button");
const goLoginButton = document.getElementById("go-login-button");
const logoutButton = document.getElementById("logout-button");
const resetAccountButton = document.getElementById("reset-account-button");
const resetAccountModal = document.getElementById("reset-account-modal");
const resetAccountConfirmInput = document.getElementById("reset-account-confirm-input");
const cancelResetAccountButton = document.getElementById("cancel-reset-account-button");
const confirmResetAccountButton = document.getElementById("confirm-reset-account-button");
const resetAccountLoading = document.getElementById("reset-account-loading");
const mnpModal = document.getElementById("mnp-modal");
const mnpCancelDateInput = document.getElementById("mnp-cancel-date-input");
const cancelMnpButton = document.getElementById("cancel-mnp-button");
const confirmMnpButton = document.getElementById("confirm-mnp-button");
const editOptionsModal = document.getElementById("edit-options-modal");
const editOptionsMenu = document.getElementById("edit-options-menu");
const editOptionsDeleteButton = document.getElementById("edit-options-delete-button");
const editOptionsCancelButton = document.getElementById("edit-options-cancel-button");
const editOptionsMnpButton = document.getElementById("edit-options-mnp-button");
const closeEditOptionsButton = document.getElementById("close-edit-options-button");
const editOptionsDeleteConfirm = document.getElementById("edit-options-delete-confirm");
const backFromDeleteConfirmButton = document.getElementById("back-from-delete-confirm-button");
const confirmDeleteFromOptionsButton = document.getElementById("confirm-delete-from-options-button");
const editOptionsCancelEditor = document.getElementById("edit-options-cancel-editor");
const editOptionsCancelDescription = document.getElementById("edit-options-cancel-description");
const editOptionsCancelDateField = document.getElementById("edit-options-cancel-date-field");
const editOptionsCancelDateInput = document.getElementById("edit-options-cancel-date-input");
const backFromCancelEditorButton = document.getElementById("back-from-cancel-editor-button");
const confirmCancelFromOptionsButton = document.getElementById("confirm-cancel-from-options-button");
const authStatus = document.getElementById("auth-status");
const appStatus = document.getElementById("app-status");
const mypageEmail = document.getElementById("mypage-email");
const errorMessage = document.getElementById("error-message");
const successMessage = document.getElementById("success-message");
const appErrorMessage = document.getElementById("app-error-message");
const appSuccessMessage = document.getElementById("app-success-message");
const deviceErrorMessage = document.getElementById("device-error-message");
const deviceSuccessMessage = document.getElementById("device-success-message");
const userRegistrationErrorMessage = document.getElementById("user-registration-error-message");
const userRegistrationSuccessMessage = document.getElementById("user-registration-success-message");
const registerModeText = document.getElementById("register-mode-text");
const editingBanner = document.getElementById("editing-banner");

const carrierForm = document.getElementById("carrier-form");
const carrierNameInput = document.getElementById("carrier-name");
const carrierChoiceButtons = document.querySelectorAll(".carrier-choice-button");
const choiceButtonGroups = document.querySelectorAll(".choice-button-grid[data-target-select-id]");
const showOtherCarriersButton = document.getElementById("show-other-carriers-button");
const otherCarrierPanel = document.getElementById("other-carrier-panel");
const customCarrierField = document.getElementById("custom-carrier-field");
const customCarrierNameInput = document.getElementById("custom-carrier-name");
const phoneNumberInput = document.getElementById("phone-number");
const accountIdInput = document.getElementById("account-id");
const shopNameInput = document.getElementById("shop-name");
const contractDateInput = document.getElementById("contract-date");
const planNameInput = document.getElementById("plan-name");
const benefitList = document.getElementById("benefit-list");
const addBenefitButton = document.getElementById("add-benefit-button");
const userNameField = document.getElementById("user-name-field");
const userNameInput = document.getElementById("user-name");
const isEsimInput = document.getElementById("is-esim");
const optionList = document.getElementById("option-list");
const addOptionButton = document.getElementById("add-option-button");
const deviceNameInput = document.getElementById("device-name");
const isCancelledSelect = document.getElementById("is-cancelled");
const cancelDateField = document.getElementById("cancel-date-field");
const cancelDateInput = document.getElementById("cancel-date");
const saveButton = document.getElementById("save-button");
const cancelEditButton = document.getElementById("cancel-edit-button");
const editOptionsButton = document.getElementById("edit-options-button");
const addCarrierButton = document.getElementById("add-carrier-button");
const carrierList = document.getElementById("carrier-list");
const deviceForm = document.getElementById("device-form");
const openDeviceFormButton = document.getElementById("open-device-form-button");
const deviceManagerPlatformInput = document.getElementById("device-manager-platform");
const deviceManagerNameInput = document.getElementById("device-manager-name");
const addDeviceButton = document.getElementById("add-device-button");
const deviceList = document.getElementById("device-list");
const userRegistrationForm = document.getElementById("user-registration-form");
const openUserRegistrationFormButton = document.getElementById("open-user-registration-form-button");
const userRegistrationNameInput = document.getElementById("user-registration-name");
const addUserRegistrationButton = document.getElementById("add-user-registration-button");
const userRegistrationList = document.getElementById("user-registration-list");
const exportCarriersCsvButton = document.getElementById("export-carriers-csv-button");
const importCarriersCsvButton = document.getElementById("import-carriers-csv-button");
const exportDevicesCsvButton = document.getElementById("export-devices-csv-button");
const importDevicesCsvButton = document.getElementById("import-devices-csv-button");
const exportUsersCsvButton = document.getElementById("export-users-csv-button");
const importUsersCsvButton = document.getElementById("import-users-csv-button");
const importCarriersCsvInput = document.getElementById("import-carriers-csv-input");
const importDevicesCsvInput = document.getElementById("import-devices-csv-input");
const importUsersCsvInput = document.getElementById("import-users-csv-input");
const themeSystemButton = document.getElementById("theme-system-button");
const themeLightButton = document.getElementById("theme-light-button");
const themeDarkButton = document.getElementById("theme-dark-button");

// 今ログイン中のユーザーを保持します。
let currentUser = null;
let currentEditingCarrierId = null;
let currentCarriers = [];
let currentDevices = [];
let currentUserRegistrations = [];
let showCancelledCarriers = false;
let isResettingAccount = false;
let pendingMnpPreset = null;
let pendingMnpSourceStatusUpdate = null;
let themePreference = "system";
const systemThemeMedia = window.matchMedia("(prefers-color-scheme: dark)");

// 成功メッセージとエラーメッセージの表示を切り替えやすくします。
function showError(message) {
  if (currentUser) {
    appErrorMessage.textContent = message;
    appSuccessMessage.textContent = "";
    return;
  }

  errorMessage.textContent = message;
  successMessage.textContent = "";
}

function showSuccess(message) {
  if (currentUser) {
    appSuccessMessage.textContent = message;
    appErrorMessage.textContent = "";
    return;
  }

  successMessage.textContent = message;
  errorMessage.textContent = "";
}

function clearMessages() {
  errorMessage.textContent = "";
  successMessage.textContent = "";
  appErrorMessage.textContent = "";
  appSuccessMessage.textContent = "";
  deviceErrorMessage.textContent = "";
  deviceSuccessMessage.textContent = "";
  userRegistrationErrorMessage.textContent = "";
  userRegistrationSuccessMessage.textContent = "";
}

function showDeviceError(message) {
  deviceErrorMessage.textContent = message;
  deviceSuccessMessage.textContent = "";
}

function showDeviceSuccess(message) {
  deviceSuccessMessage.textContent = message;
  deviceErrorMessage.textContent = "";
}

function showUserRegistrationError(message) {
  userRegistrationErrorMessage.textContent = message;
  userRegistrationSuccessMessage.textContent = "";
}

function showUserRegistrationSuccess(message) {
  userRegistrationSuccessMessage.textContent = message;
  userRegistrationErrorMessage.textContent = "";
}

function escapeCsvValue(value) {
  const stringValue = value == null ? "" : String(value);
  const escapedValue = stringValue.replaceAll('"', '""');
  if (/[",\n]/.test(escapedValue)) {
    return `"${escapedValue}"`;
  }
  return escapedValue;
}

function getStoredThemePreference() {
  const stored = localStorage.getItem("themePreference");
  if (!stored) {
    return "system";
  }
  if (!["system", "light", "dark"].includes(stored)) {
    return "system";
  }
  return stored;
}

function setThemePreference(nextPreference) {
  themePreference = nextPreference;
  localStorage.setItem("themePreference", themePreference);
  applyThemeToDocument();
  syncThemeButtons();
}

function getResolvedTheme() {
  if (themePreference === "light") {
    return "light";
  }
  if (themePreference === "dark") {
    return "dark";
  }
  return systemThemeMedia.matches ? "dark" : "light";
}

function applyThemeToDocument() {
  const resolved = getResolvedTheme();
  document.documentElement.setAttribute("data-theme", resolved);
  document.documentElement.setAttribute("data-theme-source", themePreference);
  document.documentElement.setAttribute("data-resolved-theme", resolved);
}

function syncThemeButtons() {
  if (!themeSystemButton || !themeLightButton || !themeDarkButton) {
    return;
  }
  themeSystemButton.setAttribute("aria-pressed", String(themePreference === "system"));
  themeLightButton.setAttribute("aria-pressed", String(themePreference === "light"));
  themeDarkButton.setAttribute("aria-pressed", String(themePreference === "dark"));
}

function createCsv(headers, rows) {
  const headerLine = headers.map((header) => escapeCsvValue(header)).join(",");
  const rowLines = rows.map((row) =>
    headers.map((header) => escapeCsvValue(row[header] ?? "")).join(",")
  );
  return [headerLine, ...rowLines].join("\n");
}

function parseCsvLine(line) {
  const columns = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];
    if (char === '"' && inQuotes && nextChar === '"') {
      current += '"';
      index += 1;
      continue;
    }
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (char === "," && !inQuotes) {
      columns.push(current);
      current = "";
      continue;
    }
    current += char;
  }
  columns.push(current);
  return columns;
}

function parseCsv(text) {
  const trimmedText = text.trim();
  if (!trimmedText) {
    return [];
  }
  const lines = trimmedText.split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) {
    return [];
  }
  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] ?? "";
    });
    return row;
  });
}

function downloadCsv(filename, csvContent) {
  const blob = new Blob([`\uFEFF${csvContent}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function parseBoolean(value) {
  return ["true", "1", "yes", "はい"].includes(String(value || "").trim().toLowerCase());
}

// Firebase のエラーコードを日本語メッセージに変換します。
function getErrorMessage(error) {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "このメールアドレスはすでに使用されています。";
    case "auth/invalid-email":
      return "メールアドレスの形式が正しくありません。";
    case "auth/weak-password":
      return "パスワードは6文字以上で入力してください。";
    case "auth/invalid-credential":
      return "メールアドレスまたはパスワードが正しくありません。";
    case "auth/missing-password":
      return "パスワードを入力してください。";
    case "permission-denied":
      return "Firestore にアクセスする権限がありません。";
    default:
      return `エラーが発生しました: ${error.message}`;
  }
}

// 入力欄の状態をログイン状態に合わせて切り替えます。
function setCarrierFormEnabled(enabled) {
  carrierChoiceButtons.forEach((button) => {
    button.disabled = !enabled;
  });
  showOtherCarriersButton.disabled = !enabled;
  customCarrierNameInput.disabled = !enabled;
  phoneNumberInput.disabled = !enabled;
  accountIdInput.disabled = !enabled;
  shopNameInput.disabled = !enabled;
  contractDateInput.disabled = !enabled;
  planNameInput.disabled = !enabled;
  addBenefitButton.disabled = !enabled;
  setBenefitInputsEnabled(enabled);
  isEsimInput.disabled = !enabled;
  choiceButtonGroups.forEach((group) => {
    group.querySelectorAll(".choice-button").forEach((button) => {
      button.disabled = !enabled;
    });
  });
  addOptionButton.disabled = !enabled;
  setOptionInputsEnabled(enabled);
  deviceNameInput.disabled = !enabled;
  isCancelledSelect.disabled = !enabled;
  saveButton.disabled = !enabled;
  logoutButton.disabled = !enabled;
  resetAccountButton.disabled = !enabled;
  editOptionsButton.disabled = !enabled || !currentEditingCarrierId;
  deviceManagerPlatformInput.disabled = !enabled;
  deviceManagerNameInput.disabled = !enabled;
  addDeviceButton.disabled = !enabled;
  openDeviceFormButton.disabled = !enabled;
  userRegistrationNameInput.disabled = !enabled;
  addUserRegistrationButton.disabled = !enabled;
  openUserRegistrationFormButton.disabled = !enabled;
  exportCarriersCsvButton.disabled = !enabled;
  importCarriersCsvButton.disabled = !enabled;
  exportDevicesCsvButton.disabled = !enabled;
  importDevicesCsvButton.disabled = !enabled;
  exportUsersCsvButton.disabled = !enabled;
  importUsersCsvButton.disabled = !enabled;
  updateConditionalFields();
}

// ログイン前とログイン後の画面を切り替えます。
function setScreenMode(isLoggedIn) {
  authScreen.classList.toggle("hidden", isLoggedIn);
  appScreen.classList.toggle("hidden", !isLoggedIn);
}

function setDeviceFormVisible(visible) {
  deviceForm.classList.toggle("hidden", !visible);
  openDeviceFormButton.textContent = visible ? "閉じる" : "＋追加";
  openDeviceFormButton.setAttribute("aria-expanded", String(visible));
}

function setUserRegistrationFormVisible(visible) {
  userRegistrationForm.classList.toggle("hidden", !visible);
  openUserRegistrationFormButton.textContent = visible ? "閉じる" : "＋追加";
  openUserRegistrationFormButton.setAttribute("aria-expanded", String(visible));
}

function setAuthPanelMode(mode) {
  const isLoginMode = mode === "login";
  loginAuthPanel.classList.toggle("hidden", !isLoginMode);
  signupAuthPanel.classList.toggle("hidden", isLoginMode);
}

function setActiveTab(tabId) {
  const isHomeActive = tabId === "list-tab";
  const isMypageActive = tabId === "mypage-tab";

  homeButton.classList.toggle("active", isHomeActive);
  homeButton.setAttribute("aria-current", isHomeActive ? "page" : "false");
  mypageButton.classList.toggle("active", isMypageActive);
  mypageButton.setAttribute("aria-current", isMypageActive ? "page" : "false");

  tabPanels.forEach((panel) => {
    panel.classList.toggle("hidden", panel.id !== tabId);
    panel.classList.toggle("active", panel.id === tabId);
  });

  addCarrierButton.classList.toggle("hidden", tabId !== "list-tab");
}

function setEditMode(carrier = null) {
  currentEditingCarrierId = carrier ? carrier.id : null;
  const isEditing = Boolean(carrier);

  editingBanner.classList.toggle("hidden", !isEditing);
  cancelEditButton.classList.toggle("hidden", !isEditing);
  editOptionsButton.disabled = !currentUser || !isEditing;
  saveButton.textContent = isEditing ? "更新" : "保存";
  registerModeText.textContent = "";
}

function getKnownCarrierValues() {
  return Array.from(carrierChoiceButtons).map((button) => button.dataset.carrierValue);
}

function setOtherCarrierPanelVisible(visible) {
  otherCarrierPanel.classList.toggle("hidden", !visible);
  showOtherCarriersButton.setAttribute("aria-expanded", String(visible));
}

function updateCarrierChoiceState() {
  carrierChoiceButtons.forEach((button) => {
    button.classList.toggle(
      "selected",
      button.dataset.carrierValue === carrierNameInput.value
    );
  });
}

function selectCarrierValue(value, { openOtherPanel = false } = {}) {
  carrierNameInput.value = value;

  if (value !== "その他") {
    customCarrierNameInput.value = "";
  }

  if (openOtherPanel || value === "その他") {
    setOtherCarrierPanelVisible(true);
  }

  updateCarrierChoiceState();
  updateConditionalFields();
}

function setOptionInputsEnabled(enabled) {
  optionList
    .querySelectorAll("input, button")
    .forEach((element) => {
      element.disabled = !enabled;
    });
}

function setBenefitInputsEnabled(enabled) {
  benefitList
    .querySelectorAll("select, input, button")
    .forEach((element) => {
      element.disabled = !enabled;
    });
}

function resetCarrierForm() {
  carrierForm.reset();
  carrierNameInput.value = "";
  setOtherCarrierPanelVisible(false);
  updateCarrierChoiceState();
  benefitList.innerHTML = "";
  isEsimInput.checked = false;
  optionList.innerHTML = "";
  isCancelledSelect.value = "no";
  setEditMode(null);
  populateDeviceOptions();
  populateUserRegistrationOptions();
  updateConditionalFields();
}

function applyPendingMnpPresetIfAny() {
  if (!pendingMnpPreset) {
    return;
  }
  phoneNumberInput.value = pendingMnpPreset.phoneNumber;
  contractDateInput.value = pendingMnpPreset.contractDate;
  pendingMnpPreset = null;
}

function syncChoiceButtons() {
  choiceButtonGroups.forEach((group) => {
    const targetSelectId = group.dataset.targetSelectId;
    const selectElement = document.getElementById(targetSelectId);

    if (!selectElement) {
      return;
    }

    const selectedValue = selectElement.value;
    group.querySelectorAll(".choice-button").forEach((button) => {
      button.classList.toggle("selected", button.dataset.value === selectedValue);
    });
  });
}

function populateDeviceOptions(selectedDeviceName = "") {
  const previousValue = selectedDeviceName || deviceNameInput.value || "";
  const optionValues = new Set(currentDevices.map((device) => device.name));
  deviceNameInput.innerHTML = "";

  const emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.textContent = "選択してください";
  deviceNameInput.appendChild(emptyOption);

  currentDevices.forEach((device) => {
    const option = document.createElement("option");
    const platform = getDevicePlatform(device);
    option.value = device.name;
    option.textContent = platform
      ? `${platform} ${device.name}`
      : device.name;
    deviceNameInput.appendChild(option);
  });

  if (previousValue && !optionValues.has(previousValue)) {
    const orphanOption = document.createElement("option");
    orphanOption.value = previousValue;
    orphanOption.textContent = `${previousValue} (未登録)`;
    deviceNameInput.appendChild(orphanOption);
  }

  deviceNameInput.value = previousValue;
}

function populateUserRegistrationOptions(selectedUserName = "") {
  const previousValue = selectedUserName || userNameInput.value || "";
  const optionValues = new Set(currentUserRegistrations.map((item) => item.name));
  userNameInput.innerHTML = "";

  const emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.textContent = "選択してください";
  userNameInput.appendChild(emptyOption);

  currentUserRegistrations.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.name;
    option.textContent = item.name;
    userNameInput.appendChild(option);
  });

  if (previousValue && !optionValues.has(previousValue)) {
    const orphanOption = document.createElement("option");
    orphanOption.value = previousValue;
    orphanOption.textContent = `${previousValue} (未登録)`;
    userNameInput.appendChild(orphanOption);
  }

  userNameInput.value = previousValue;
}

// 前の選択状態に応じて次の項目を開閉します。
function setConditionalFieldVisibility(fieldElement, inputElement, visible, enabled) {
  fieldElement.classList.toggle("visible", visible);
  inputElement.disabled = !visible || !enabled;

  if (!visible) {
    if (inputElement.type === "checkbox") {
      inputElement.checked = false;
    } else {
      inputElement.value = "";
    }
  }
}

function updateConditionalFields() {
  const formEnabled = !saveButton.disabled;
  const isCustomCarrier = carrierNameInput.value === "その他";
  const isCancelled = isCancelledSelect.value === "yes";
  syncChoiceButtons();

  customCarrierField.classList.toggle("visible", isCustomCarrier);
  customCarrierNameInput.disabled = !isCustomCarrier || !formEnabled;

  if (!isCustomCarrier) {
    customCarrierNameInput.value = "";
  }

  userNameField.classList.add("visible");
  userNameInput.disabled = !formEnabled;

  setConditionalFieldVisibility(
    cancelDateField,
    cancelDateInput,
    isCancelled,
    formEnabled
  );
}

function formatDate(dateString) {
  if (!dateString) {
    return "";
  }

  return dateString.replaceAll("-", "/");
}

function createOptionRow(option = {}) {
  const optionItem = document.createElement("div");
  optionItem.className = "option-item";

  const nameLabel = document.createElement("label");
  nameLabel.className = "field";
  const nameText = document.createElement("span");
  nameText.textContent = "オプション内容";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "増量5GB";
  nameInput.className = "option-name-input";
  nameInput.value = option.name || "";
  nameLabel.append(nameText, nameInput);

  const untilLabel = document.createElement("label");
  untilLabel.className = "field";
  const untilText = document.createElement("span");
  untilText.textContent = "期限";
  const untilInput = document.createElement("input");
  untilInput.type = "date";
  untilInput.className = "option-until-input";
  untilInput.value = option.until || "";
  untilLabel.append(untilText, untilInput);

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "ghost option-remove-button";
  removeButton.dataset.action = "remove-option";
  removeButton.textContent = "削除";

  optionItem.append(nameLabel, untilLabel, removeButton);
  optionList.appendChild(optionItem);
  setOptionInputsEnabled(Boolean(currentUser));
}

function updateBenefitRowVisibility(rowElement) {
  const typeSelect = rowElement.querySelector(".benefit-type-select");
  const amountField = rowElement.querySelector(".benefit-amount-field");
  const amountInput = rowElement.querySelector(".benefit-amount-input");
  const receivedField = rowElement.querySelector(".benefit-received-field");
  const receivedInput = rowElement.querySelector(".benefit-received-input");
  const deviceField = rowElement.querySelector(".benefit-device-name-field");
  const deviceInput = rowElement.querySelector(".benefit-device-name-input");
  const isCash = ["現金", "商品券", "自社ポイント"].includes(typeSelect.value);
  const isDevice = typeSelect.value === "特典端末";
  const enabled = Boolean(currentUser);

  setConditionalFieldVisibility(amountField, amountInput, isCash, enabled);
  setConditionalFieldVisibility(receivedField, receivedInput, isCash, enabled);
  setConditionalFieldVisibility(deviceField, deviceInput, isDevice, enabled);
}

function createBenefitRow(benefit = {}) {
  const benefitItem = document.createElement("div");
  benefitItem.className = "option-item benefit-item";

  const typeLabel = document.createElement("label");
  typeLabel.className = "field";
  const typeText = document.createElement("span");
  typeText.textContent = "特典";
  const typeSelect = document.createElement("select");
  typeSelect.className = "benefit-type-select";
  [
    { value: "", label: "選択してください" },
    { value: "現金", label: "現金" },
    { value: "商品券", label: "商品券" },
    { value: "自社ポイント", label: "自社ポイント" },
    { value: "特典端末", label: "特典端末" },
  ].forEach((item) => {
    const option = document.createElement("option");
    option.value = item.value;
    option.textContent = item.label;
    typeSelect.appendChild(option);
  });
  typeSelect.value = benefit.type || "";
  typeLabel.append(typeText, typeSelect);

  const amountLabel = document.createElement("label");
  amountLabel.className = "field conditional-field benefit-amount-field";
  const amountText = document.createElement("span");
  amountText.textContent = "額面";
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.min = "0";
  amountInput.step = "1000";
  amountInput.placeholder = "25000";
  amountInput.className = "benefit-amount-input";
  amountInput.value = benefit.amount ? String(benefit.amount) : "";
  amountLabel.append(amountText, amountInput);

  const receivedLabel = document.createElement("label");
  receivedLabel.className = "field conditional-field benefit-received-field";
  const receivedText = document.createElement("span");
  receivedText.textContent = "受け取り済み";
  const receivedInput = document.createElement("input");
  receivedInput.type = "checkbox";
  receivedInput.className = "benefit-received-input";
  receivedInput.checked = Boolean(benefit.received);
  receivedLabel.append(receivedText, receivedInput);

  const deviceLabel = document.createElement("label");
  deviceLabel.className = "field conditional-field benefit-device-name-field";
  const deviceText = document.createElement("span");
  deviceText.textContent = "特典端末名";
  const deviceInput = document.createElement("input");
  deviceInput.type = "text";
  deviceInput.placeholder = "iPhone 16";
  deviceInput.className = "benefit-device-name-input";
  deviceInput.value = benefit.deviceName || "";
  deviceLabel.append(deviceText, deviceInput);

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "ghost option-remove-button";
  removeButton.dataset.action = "remove-benefit";
  removeButton.textContent = "削除";

  benefitItem.append(typeLabel, amountLabel, receivedLabel, deviceLabel, removeButton);
  benefitList.appendChild(benefitItem);
  typeSelect.addEventListener("change", () => updateBenefitRowVisibility(benefitItem));
  updateBenefitRowVisibility(benefitItem);
  setBenefitInputsEnabled(Boolean(currentUser));
}

function getOptionValues() {
  return Array.from(optionList.querySelectorAll(".option-item")).map((item) => ({
    name: item.querySelector(".option-name-input").value.trim(),
    until: item.querySelector(".option-until-input").value,
  }));
}

function getBenefitValues() {
  return Array.from(benefitList.querySelectorAll(".option-item")).map((item) => ({
    type: item.querySelector(".benefit-type-select").value,
    amount: item.querySelector(".benefit-amount-input").value
      ? Number(item.querySelector(".benefit-amount-input").value)
      : 0,
    received: item.querySelector(".benefit-received-input").checked,
    deviceName: item.querySelector(".benefit-device-name-input").value.trim(),
  }));
}

function normalizeCarrierOptions(carrier) {
  if (Array.isArray(carrier.options)) {
    return carrier.options;
  }

  if (carrier.hasOption || carrier.optionName || carrier.optionUntil) {
    return [
      {
        name: carrier.optionName || "",
        until: carrier.optionUntil || "",
      },
    ];
  }

  return [];
}

function normalizeCarrierBenefits(carrier) {
  if (Array.isArray(carrier.benefitItems)) {
    return carrier.benefitItems;
  }

  if (carrier.benefitValue === "特典端末") {
    return [
      {
        type: "特典端末",
        deviceName: carrier.benefitDeviceName || "",
      },
    ];
  }

  if (
    carrier.benefitValue === "現金" ||
    carrier.benefitValue === "商品券" ||
    carrier.benefitValue === "自社ポイント"
  ) {
    return [
      {
        type: carrier.benefitValue,
        amount: Number(carrier.cashbackAmount || 0),
        received: Boolean(carrier.cashbackReceived),
      },
    ];
  }

  if (carrier.benefitType === "device" && carrier.benefitDeviceName) {
    return [
      {
        type: "特典端末",
        deviceName: carrier.benefitDeviceName,
      },
    ];
  }

  if (carrier.benefitType === "cashback" && carrier.cashbackKind) {
    return [
      {
        type: carrier.cashbackKind,
        amount: Number(carrier.cashbackAmount || 0),
        received: Boolean(carrier.cashbackReceived),
      },
    ];
  }

  return [];
}

function getOptionsSummary(item) {
  const options = normalizeCarrierOptions(item).filter((option) => option.name);

  if (options.length === 0) {
    return "";
  }

  return `${options
    .map((option) =>
      option.until ? `${option.name} (${formatDate(option.until)})` : option.name
    )
    .join(" / ")}`;
}

function getBenefitSummary(item) {
  const benefitItems = normalizeCarrierBenefits(item).filter((benefit) => benefit.type);
  if (benefitItems.length === 0) {
    return "";
  }

  return benefitItems
    .map((benefit) => {
      if (benefit.type === "特典端末") {
        return benefit.deviceName ? `特典端末 ${benefit.deviceName}` : "特典端末";
      }
      const amountText = benefit.amount > 0 ? `${Number(benefit.amount).toLocaleString("ja-JP")}円` : "額面未入力";
      const receivedText = benefit.received ? "受取済" : "未受取";
      return `${benefit.type} ${amountText} ${receivedText}`;
    })
    .join(" / ");
}

function getCarrierTheme(carrierName = "") {
  const normalizedName = carrierName.trim().toLowerCase();
  const carrierThemes = {
    docomo: { color: "#cc3341", textColor: "#ffffff" },
    au: { color: "#eb5505", textColor: "#ffffff" },
    softbank: { color: "#111827", textColor: "#ffffff" },
    rakuten: { color: "#ff008c", textColor: "#ffffff" },
    "rakuten mobile": { color: "#ff008c", textColor: "#ffffff" },
    "y!mobile": { color: "#ff0033", textColor: "#ffffff" },
    "uq mobile": { color: "#0091d7", textColor: "#ffffff" },
    linemo: { color: "#14eb0a", textColor: "#1f2937" },
    povo: { color: "#ffd900", textColor: "#1f2937" },
    ahamo: { color: "#d6003b", textColor: "#ffffff" },
    irumo: { color: "#00bfa5", textColor: "#1f2937" },
    iijmio: { color: "#e4007f", textColor: "#ffffff" },
    mineo: { color: "#00a23f", textColor: "#ffffff" },
    "ocn モバイル one": { color: "#13327c", textColor: "#ffffff" },
    "nuro mobile": { color: "#000000", textColor: "#ffffff" },
    "biglobeモバイル": { color: "#008cd7", textColor: "#ffffff" },
    "j:com mobile": { color: "#e60012", textColor: "#ffffff" },
    "イオンモバイル": { color: "#b60081", textColor: "#ffffff" },
    "日本通信sim": { color: "#d71920", textColor: "#ffffff" },
    "b-mobile": { color: "#111827", textColor: "#ffffff" },
    "hisモバイル": { color: "#0071ce", textColor: "#ffffff" },
    linksmate: { color: "#00a1e9", textColor: "#ffffff" },
    libmo: { color: "#e2261a", textColor: "#ffffff" },
    "y.u mobile": { color: "#f97316", textColor: "#ffffff" },
    qtmobile: { color: "#0f766e", textColor: "#ffffff" },
    エキサイトモバイル: { color: "#ef4444", textColor: "#ffffff" },
    toneモバイル: { color: "#3b82f6", textColor: "#ffffff" },
  };

  return carrierThemes[normalizedName] || {
    color: "var(--primary)",
    textColor: "#ffffff",
  };
}

function applyCarrierChoiceButtonThemes() {
  carrierChoiceButtons.forEach((button) => {
    const carrierValue = button.dataset.carrierValue;
    if (!carrierValue) {
      return;
    }
    const theme = getCarrierTheme(carrierValue);
    button.style.setProperty("--carrier-choice-color", theme.color);
    button.style.setProperty("--carrier-choice-text-color", theme.textColor);
  });
}

function getDevicePlatform(device) {
  if (device.platform) {
    return device.platform === "iPhone" ? "Apple" : device.platform;
  }

  if (device.manufacturer === "Apple") {
    return "Apple";
  }

  if (device.manufacturer) {
    return "Android";
  }

  return "";
}

function createDeviceIcon(platform = "") {
  const iconMap = {
    Apple: {
      src: "https://cdn.simpleicons.org/apple/000000",
      label: "Apple",
      monochrome: true,
    },
    Android: {
      src: "https://api.iconify.design/logos/android-icon.svg",
      label: "Android",
    },
    その他: {
      src: "https://api.iconify.design/material-symbols/memory.svg?color=%235f6b7a",
      label: "その他",
      monochrome: true,
    },
  };
  const icon = iconMap[platform] || {
    src: "https://api.iconify.design/material-symbols/memory.svg?color=%235f6b7a",
    label: "端末",
    monochrome: true,
  };
  const image = document.createElement("img");
  image.className = icon.monochrome ? "device-icon theme-icon" : "device-icon";
  image.src = icon.src;
  image.alt = `${icon.label} アイコン`;
  image.loading = "lazy";
  image.decoding = "async";
  return image;
}

function getDevicePlatformByName(deviceName = "") {
  if (!deviceName) {
    return "";
  }

  const matchedDevice = currentDevices.find((device) => device.name === deviceName);
  if (!matchedDevice) {
    return "";
  }

  return getDevicePlatform(matchedDevice);
}

function fillCarrierForm(carrier) {
  if (!carrier) {
    return;
  }
  pendingMnpPreset = null;
  pendingMnpSourceStatusUpdate = null;

  const carrierOptions = getKnownCarrierValues();
  const isKnownCarrier = carrierOptions.includes(carrier.carrierName);

  selectCarrierValue(isKnownCarrier ? carrier.carrierName : "その他", {
    openOtherPanel: !isKnownCarrier,
  });
  customCarrierNameInput.value = isKnownCarrier ? "" : carrier.carrierName || "";
  planNameInput.value = carrier.planName || "";
  phoneNumberInput.value = carrier.phoneNumber || "";
  contractDateInput.value = carrier.contractDate || "";
  accountIdInput.value = carrier.accountId || "";
  shopNameInput.value = carrier.shopName || "";
  benefitList.innerHTML = "";
  const benefitItems = normalizeCarrierBenefits(carrier);
  if (benefitItems.length > 0) {
    benefitItems.forEach((benefit) => createBenefitRow(benefit));
  }
  populateUserRegistrationOptions(carrier.userName || "");
  isEsimInput.checked = carrier.lineType === "eSIM";
  optionList.innerHTML = "";
  normalizeCarrierOptions(carrier).forEach((option) => createOptionRow(option));
  populateDeviceOptions(carrier.deviceName || "");
  isCancelledSelect.value = carrier.isCancelled ? "yes" : "no";
  cancelDateInput.value = carrier.cancelDate || "";

  setEditMode(carrier);
  updateConditionalFields();
}

function renderDeviceList(items) {
  deviceList.innerHTML = "";
  currentDevices = items;
  populateDeviceOptions();

  if (items.length === 0) {
    deviceList.innerHTML =
      '<li class="empty-item">データなし</li>';
    return;
  }

  items.forEach((device) => {
    const listItem = document.createElement("li");
    listItem.className = "device-item";
    const platform = getDevicePlatform(device);

    const deviceSummary = document.createElement("div");
    deviceSummary.className = "device-summary";
    deviceSummary.appendChild(createDeviceIcon(platform));

    const deviceText = document.createElement("div");
    deviceText.className = "device-text";

    const platformElement = document.createElement("span");
    platformElement.className = "device-platform";
    platformElement.textContent = platform || "所持端末タイプ未設定";

    const nameElement = document.createElement("strong");
    nameElement.textContent = device.name;

    deviceText.append(platformElement, nameElement);
    deviceSummary.appendChild(deviceText);

    const deleteDeviceButton = document.createElement("button");
    deleteDeviceButton.type = "button";
    deleteDeviceButton.className = "danger";
    deleteDeviceButton.dataset.deviceId = device.id;
    deleteDeviceButton.textContent = "削除";

    listItem.appendChild(deviceSummary);
    listItem.appendChild(deleteDeviceButton);
    deviceList.appendChild(listItem);
  });
}

function renderUserRegistrationList(items) {
  userRegistrationList.innerHTML = "";
  currentUserRegistrations = items;
  populateUserRegistrationOptions();

  if (items.length === 0) {
    userRegistrationList.innerHTML =
      '<li class="empty-item">データなし</li>';
    return;
  }

  items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className = "device-item";

    const nameElement = document.createElement("strong");
    nameElement.textContent = item.name;

    const deleteUserButton = document.createElement("button");
    deleteUserButton.type = "button";
    deleteUserButton.className = "danger";
    deleteUserButton.dataset.userRegistrationId = item.id;
    deleteUserButton.textContent = "削除";

    listItem.append(nameElement, deleteUserButton);
    userRegistrationList.appendChild(listItem);
  });
}

// 一覧表示を描画します。
function createCarrierListItem(item) {
  const listItem = document.createElement("li");
  listItem.className = "carrier-item";
  listItem.classList.toggle("cancelled-carrier", Boolean(item.isCancelled));
  listItem.dataset.carrierId = item.id;
  const carrierTheme = getCarrierTheme(item.carrierName);
  listItem.style.setProperty("--carrier-color", carrierTheme.color);
  listItem.style.setProperty("--carrier-text-color", carrierTheme.textColor);
  const contractStatus = item.isCancelled && item.cancelDate
    ? formatDate(item.cancelDate)
    : "契約継続中";
  const benefitSummary = getBenefitSummary(item);
  const userSummary = item.userName || "";
  const optionsSummary = getOptionsSummary(item);

  const carrierBadge = document.createElement("span");
  carrierBadge.className = "carrier-badge";
  carrierBadge.textContent = item.planName
    ? `${item.carrierName} - ${item.planName}`
    : item.carrierName;

  const phoneHeading = document.createElement("strong");
  phoneHeading.textContent = item.phoneNumber || "電話番号未入力";

  listItem.append(carrierBadge, phoneHeading);

  const carrierLineIcons = {
    plan: "https://api.iconify.design/material-symbols/description-outline-rounded.svg?color=%235f6b7a",
    contract: "https://api.iconify.design/material-symbols/calendar-month-outline-rounded.svg?color=%235f6b7a",
    benefit: "https://api.iconify.design/material-symbols/payments-rounded.svg?color=%235f6b7a",
    user: "https://api.iconify.design/material-symbols/person-outline-rounded.svg?color=%235f6b7a",
    device: "https://api.iconify.design/material-symbols/memory.svg?color=%235f6b7a",
    option: "https://api.iconify.design/material-symbols/tune-rounded.svg?color=%235f6b7a",
    shop: "https://api.iconify.design/material-symbols/storefront-outline-rounded.svg?color=%235f6b7a",
    id: "https://api.iconify.design/material-symbols/badge-outline-rounded.svg?color=%235f6b7a",
  };

  function createCarrierDetailLine(
    text,
    iconSrc,
    { primary = false, statusLabel = "", statusTone = "neutral" } = {}
  ) {
    const line = document.createElement("p");
    line.className = "carrier-detail-line";

    const icon = document.createElement("img");
    icon.className = "carrier-line-icon";
    icon.src = iconSrc;
    icon.alt = "";
    icon.setAttribute("aria-hidden", "true");
    icon.loading = "lazy";
    icon.decoding = "async";

    const textNode = document.createElement("span");
    textNode.className = "carrier-line-text";
    textNode.textContent = text;
    if (primary) {
      textNode.classList.add("primary-line");
    }

    line.append(icon, textNode);

    if (statusLabel) {
      const status = document.createElement("span");
      status.className = `carrier-line-status ${statusTone}`;
      status.textContent = statusLabel;
      line.appendChild(status);
    }

    return line;
  }

  if (item.deviceName || item.lineType) {
    const deviceBlock = document.createElement("div");
    deviceBlock.className = "carrier-device-summary";

    const platform = getDevicePlatformByName(item.deviceName);
    deviceBlock.appendChild(createDeviceIcon(platform));

    const deviceText = document.createElement("div");
    deviceText.className = "device-text";

    const platformElement = document.createElement("span");
    platformElement.className = "device-platform";
    platformElement.textContent = platform || "所持端末タイプ未設定";

    const nameElement = document.createElement("strong");
    nameElement.textContent = item.deviceName || "端末未選択";

    const lineTypeElement = document.createElement("span");
    lineTypeElement.className = "carrier-device-line-type";
    lineTypeElement.textContent = item.lineType ? `(${item.lineType})` : "";

    deviceText.append(platformElement, nameElement, lineTypeElement);
    deviceBlock.appendChild(deviceText);
    listItem.appendChild(deviceBlock);
  }

  [
    { key: "contract", text: `${formatDate(item.contractDate)} - ${contractStatus}` },
    { key: "benefit", text: benefitSummary },
    { key: "user", text: userSummary },
    { key: "option", text: optionsSummary },
    { key: "shop", text: item.shopName || "" },
    { key: "id", text: item.accountId ? `ID ${item.accountId}` : "" },
  ]
    .filter((line) => line.text)
    .forEach((line) => {
      listItem.appendChild(
        createCarrierDetailLine(line.text, carrierLineIcons[line.key], {
          primary: Boolean(line.primary),
        })
      );
    });

  return listItem;
}

function renderCarrierList(items) {
  carrierList.innerHTML = "";
  currentCarriers = items;

  if (items.length === 0) {
    carrierList.innerHTML =
      '<li class="empty-item">データなし</li>';
    return;
  }

  const activeItems = items.filter((item) => !item.isCancelled);
  const cancelledItems = items
    .filter((item) => item.isCancelled)
    .toSorted((left, right) => {
      const leftTime = left.cancelDate ? Date.parse(left.cancelDate) : Number.POSITIVE_INFINITY;
      const rightTime = right.cancelDate ? Date.parse(right.cancelDate) : Number.POSITIVE_INFINITY;
      if (Number.isNaN(leftTime) && Number.isNaN(rightTime)) {
        return 0;
      }
      if (Number.isNaN(leftTime)) {
        return 1;
      }
      if (Number.isNaN(rightTime)) {
        return -1;
      }
      return leftTime - rightTime;
    });

  activeItems.forEach((item) => {
    carrierList.appendChild(createCarrierListItem(item));
  });

  if (cancelledItems.length > 0) {
    const cancelledHeader = document.createElement("li");
    const cancelledToggleButton = document.createElement("button");
    cancelledHeader.className = "cancelled-section-header";
    cancelledToggleButton.type = "button";
    cancelledToggleButton.className = "cancelled-toggle-button";
    cancelledToggleButton.dataset.action = "toggle-cancelled";
    cancelledToggleButton.setAttribute("aria-expanded", String(showCancelledCarriers));
    cancelledToggleButton.setAttribute(
      "aria-label",
      showCancelledCarriers ? "解約済みを閉じる" : "解約済みを開く"
    );
    cancelledToggleButton.title = showCancelledCarriers ? "解約済みを閉じる" : "解約済みを開く";
    cancelledHeader.appendChild(cancelledToggleButton);
    carrierList.appendChild(cancelledHeader);
  }

  if (showCancelledCarriers) {
    cancelledItems.forEach((item) => {
      carrierList.appendChild(createCarrierListItem(item));
    });
  }
}

// ログアウト時や未ログイン時の表示を整えます。
function renderLoggedOutState() {
  carrierList.innerHTML =
    '<li class="empty-item">データなし</li>';
}

// 必須項目の簡単なバリデーションです。
function validateAuthInputs(emailInputElement, passwordInputElement) {
  const email = emailInputElement.value.trim();
  const password = passwordInputElement.value.trim();

  if (!email || !password) {
    showError("メールアドレスとパスワードを入力してください。");
    return null;
  }

  return { email, password };
}

// Firestore から現在のユーザーの回線一覧を取得します。
async function loadCarriers(user) {
  try {
    const carriersRef = collection(db, "users", user.uid, "carriers");
    const carriersQuery = query(carriersRef, orderBy("contractDate", "asc"));
    const snapshot = await getDocs(carriersQuery);

    const carriers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    renderCarrierList(carriers);
  } catch (error) {
    showError(getErrorMessage(error));
  }
}

async function loadDevices(user) {
  try {
    const devicesRef = collection(db, "users", user.uid, "devices");
    const devicesQuery = query(devicesRef, orderBy("name", "asc"));
    const snapshot = await getDocs(devicesQuery);

    const devices = snapshot.docs.map((deviceDoc) => ({
      id: deviceDoc.id,
      ...deviceDoc.data(),
    }));

    renderDeviceList(devices);
  } catch (error) {
    showDeviceError(getErrorMessage(error));
  }
}

async function loadUserRegistrations(user) {
  try {
    const usersRef = collection(db, "users", user.uid, "userRegistrations");
    const usersQuery = query(usersRef, orderBy("name", "asc"));
    const snapshot = await getDocs(usersQuery);

    const userRegistrations = snapshot.docs.map((userDoc) => ({
      id: userDoc.id,
      ...userDoc.data(),
    }));

    renderUserRegistrationList(userRegistrations);
  } catch (error) {
    showUserRegistrationError(getErrorMessage(error));
  }
}

function buildCarrierPayload() {
  const phoneNumber = phoneNumberInput.value.trim();
  const selectedCarrierName = carrierNameInput.value;
  const customCarrierName = customCarrierNameInput.value.trim();
  const carrierName =
    selectedCarrierName === "その他" ? customCarrierName : selectedCarrierName;
  const accountId = accountIdInput.value.trim();
  const shopName = shopNameInput.value.trim();
  const contractDate = contractDateInput.value;
  const planName = planNameInput.value.trim();
  const benefitItems = getBenefitValues();
  const userName = userNameInput.value.trim();
  const lineType = isEsimInput.checked ? "eSIM" : "SIM";
  const options = getOptionValues();
  const hasOption = options.length > 0;
  const deviceName = deviceNameInput.value.trim();
  const isCancelled = isCancelledSelect.value === "yes";
  const cancelDate = cancelDateInput.value;

  if (!carrierName || !phoneNumber || !contractDate || !planName) {
    showError("キャリア・電話番号・契約日・プラン名を入力してください。");
    return null;
  }

  if (selectedCarrierName === "その他" && !customCarrierName) {
    showError("その他を選んだ場合はキャリア名を入力してください。");
    return null;
  }

  for (const benefit of benefitItems) {
    if (!benefit.type) {
      showError("契約時特典の種類を選択してください。");
      return null;
    }
    if (["現金", "商品券", "自社ポイント"].includes(benefit.type) && benefit.amount <= 0) {
      showError("現金・商品券・自社ポイントは額面を入力してください。");
      return null;
    }
    if (benefit.type === "特典端末" && !benefit.deviceName) {
      showError("特典端末は端末名を入力してください。");
      return null;
    }
  }

  const primaryBenefit = benefitItems[0] || null;
  const benefitType = primaryBenefit
    ? (primaryBenefit.type === "特典端末" ? "device" : "cashback")
    : "";
  const benefitDeviceName = primaryBenefit && primaryBenefit.type === "特典端末"
    ? primaryBenefit.deviceName
    : "";
  const cashbackKind = primaryBenefit && primaryBenefit.type !== "特典端末"
    ? primaryBenefit.type
    : "";
  const cashbackAmount = primaryBenefit && primaryBenefit.type !== "特典端末"
    ? primaryBenefit.amount
    : 0;
  const cashbackReceived = primaryBenefit && primaryBenefit.type !== "特典端末"
    ? primaryBenefit.received
    : false;
  const benefitValue = primaryBenefit ? primaryBenefit.type : "";

  if (options.some((option) => !option.name || !option.until)) {
    showError("オプションを追加した場合は内容と期限を入力してください。");
    return null;
  }

  if (isCancelled && !cancelDate) {
    showError("解約済みの場合は解約日を入力してください。");
    return null;
  }

  return {
    carrierName,
    phoneNumber,
    accountId,
    shopName,
    contractDate,
    planName,
    benefitItems,
    benefitValue,
    benefitType,
    benefitDeviceName,
    cashbackKind,
    cashbackAmount,
    cashbackReceived,
    hasUserRegistration: Boolean(userName),
    userName,
    lineType,
    hasOption,
    options,
    deviceName,
    isCancelled,
    cancelDate,
  };
}

async function handleDeviceAdd(event) {
  event.preventDefault();
  deviceErrorMessage.textContent = "";
  deviceSuccessMessage.textContent = "";

  if (!currentUser) {
    showDeviceError("端末を追加するにはログインしてください。");
    return;
  }

  const deviceName = deviceManagerNameInput.value.trim();
  const platform = deviceManagerPlatformInput.value;

  if (!platform || !deviceName) {
    showDeviceError("所持端末タイプと所持端末名を入力してください。");
    return;
  }

  if (currentDevices.some((device) => device.name === deviceName)) {
    showDeviceError("同じ所持端末名はすでに登録されています。");
    return;
  }

  try {
    const devicesRef = collection(db, "users", currentUser.uid, "devices");
    await addDoc(devicesRef, {
      platform,
      name: deviceName,
      createdAt: new Date().toISOString(),
    });
    deviceForm.reset();
    showDeviceSuccess("所持端末を追加しました。");
    await loadDevices(currentUser);
    setDeviceFormVisible(false);
  } catch (error) {
    showDeviceError(getErrorMessage(error));
  }
}

async function handleDeviceDelete(event) {
  const deleteButtonElement = event.target.closest("[data-device-id]");

  if (!deleteButtonElement) {
    return;
  }

  deviceErrorMessage.textContent = "";
  deviceSuccessMessage.textContent = "";

  if (!currentUser) {
    showDeviceError("所持端末を削除するにはログインしてください。");
    return;
  }

  const deviceId = deleteButtonElement.dataset.deviceId;
  const targetDevice = currentDevices.find((device) => device.id === deviceId);

  if (!targetDevice) {
    showDeviceError("削除する所持端末を見つけられませんでした。");
    return;
  }

  const confirmed = window.confirm(`所持端末「${targetDevice.name}」を削除しますか？`);
  if (!confirmed) {
    return;
  }

  try {
    const deviceDocRef = doc(db, "users", currentUser.uid, "devices", deviceId);
    await deleteDoc(deviceDocRef);

    if (deviceNameInput.value === targetDevice.name && !currentEditingCarrierId) {
      deviceNameInput.value = "";
    }

    showDeviceSuccess("所持端末を削除しました。");
    await loadDevices(currentUser);
  } catch (error) {
    showDeviceError(getErrorMessage(error));
  }
}

async function handleUserRegistrationAdd(event) {
  event.preventDefault();
  userRegistrationErrorMessage.textContent = "";
  userRegistrationSuccessMessage.textContent = "";

  if (!currentUser) {
    showUserRegistrationError("利用者を追加するにはログインしてください。");
    return;
  }

  const userName = userRegistrationNameInput.value.trim();

  if (!userName) {
    showUserRegistrationError("利用者名を入力してください。");
    return;
  }

  if (currentUserRegistrations.some((item) => item.name === userName)) {
    showUserRegistrationError("同じ利用者名はすでに登録されています。");
    return;
  }

  try {
    const usersRef = collection(db, "users", currentUser.uid, "userRegistrations");
    await addDoc(usersRef, {
      name: userName,
      createdAt: new Date().toISOString(),
    });
    userRegistrationForm.reset();
    showUserRegistrationSuccess("利用者を追加しました。");
    await loadUserRegistrations(currentUser);
    setUserRegistrationFormVisible(false);
  } catch (error) {
    showUserRegistrationError(getErrorMessage(error));
  }
}

async function handleUserRegistrationDelete(event) {
  const deleteButtonElement = event.target.closest("[data-user-registration-id]");

  if (!deleteButtonElement) {
    return;
  }

  userRegistrationErrorMessage.textContent = "";
  userRegistrationSuccessMessage.textContent = "";

  if (!currentUser) {
    showUserRegistrationError("利用者を削除するにはログインしてください。");
    return;
  }

  const userRegistrationId = deleteButtonElement.dataset.userRegistrationId;
  const targetUser = currentUserRegistrations.find((item) => item.id === userRegistrationId);

  if (!targetUser) {
    showUserRegistrationError("削除する利用者を見つけられませんでした。");
    return;
  }

  const confirmed = window.confirm(`利用者「${targetUser.name}」を削除しますか？`);
  if (!confirmed) {
    return;
  }

  try {
    const userDocRef = doc(db, "users", currentUser.uid, "userRegistrations", userRegistrationId);
    await deleteDoc(userDocRef);

    if (userNameInput.value === targetUser.name && !currentEditingCarrierId) {
      userNameInput.value = "";
    }

    showUserRegistrationSuccess("利用者を削除しました。");
    await loadUserRegistrations(currentUser);
  } catch (error) {
    showUserRegistrationError(getErrorMessage(error));
  }
}

// 新規登録の処理です。
async function handleSignup() {
  clearMessages();
  const values = validateAuthInputs(signupEmailInput, signupPasswordInput);

  if (!values) {
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    showSuccess("新規登録が完了しました。ログイン状態になっています。");
  } catch (error) {
    showError(getErrorMessage(error));
  }
}

// ログインの処理です。
async function handleLogin() {
  clearMessages();
  const values = validateAuthInputs(loginEmailInput, loginPasswordInput);

  if (!values) {
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, values.email, values.password);
    showSuccess("ログインしました。");
  } catch (error) {
    showError(getErrorMessage(error));
  }
}

// ログアウトの処理です。
async function handleLogout() {
  clearMessages();

  try {
    await signOut(auth);
    showSuccess("ログアウトしました。");
  } catch (error) {
    showError(getErrorMessage(error));
  }
}

async function deleteAllDocsInCollection(userId, collectionName) {
  const collectionRef = collection(db, "users", userId, collectionName);
  const snapshot = await getDocs(collectionRef);
  for (const snapshotDoc of snapshot.docs) {
    await deleteDoc(snapshotDoc.ref);
  }
}

function setResetModalProcessingState(processing) {
  isResettingAccount = processing;
  resetAccountLoading.classList.toggle("hidden", !processing);
  resetAccountConfirmInput.disabled = processing;
  cancelResetAccountButton.disabled = processing;
  confirmResetAccountButton.disabled = processing;
  resetAccountButton.disabled = processing || !currentUser;
}

function openResetAccountModal() {
  clearMessages();
  if (!currentUser) {
    showError("初期化するにはログインしてください。");
    return;
  }
  resetAccountModal.classList.remove("hidden");
  resetAccountConfirmInput.value = "";
  setResetModalProcessingState(false);
  resetAccountConfirmInput.focus();
}

function closeResetAccountModal() {
  if (isResettingAccount) {
    return;
  }
  resetAccountModal.classList.add("hidden");
  resetAccountConfirmInput.value = "";
}

function openMnpModal() {
  mnpCancelDateInput.value = cancelDateInput.value || "";
  mnpModal.classList.remove("hidden");
  mnpCancelDateInput.focus();
}

function closeMnpModal() {
  mnpModal.classList.add("hidden");
  mnpCancelDateInput.value = "";
}

function setEditOptionsModalMode(mode) {
  const showMenu = mode === "menu";
  editOptionsMenu.classList.toggle("hidden", !showMenu);
  editOptionsDeleteConfirm.classList.toggle("hidden", mode !== "delete-confirm");
  editOptionsCancelEditor.classList.toggle("hidden", mode !== "cancel-editor");
}

function openEditOptionsModal() {
  clearMessages();

  if (!currentUser || !currentEditingCarrierId) {
    showError("編集対象の回線を選択してください。");
    return;
  }

  setEditOptionsModalMode("menu");
  editOptionsModal.classList.remove("hidden");
  editOptionsDeleteButton.focus();
}

function closeEditOptionsModal() {
  editOptionsModal.classList.add("hidden");
  setEditOptionsModalMode("menu");
  editOptionsCancelDateInput.value = "";
}

function openDeleteConfirmInOptions() {
  setEditOptionsModalMode("delete-confirm");
  backFromDeleteConfirmButton.focus();
}

function openCancelEditorInOptions() {
  const isCurrentlyCancelled = isCancelledSelect.value === "yes";

  if (isCurrentlyCancelled) {
    editOptionsCancelDescription.textContent = "この回線の解約状態を解除しますか？";
    editOptionsCancelDateField.classList.add("hidden");
    editOptionsCancelDateInput.value = "";
  } else {
    editOptionsCancelDescription.textContent = "この回線を解約済みにします。解約日を入力してください。";
    editOptionsCancelDateField.classList.remove("hidden");
    editOptionsCancelDateInput.value = cancelDateInput.value || "";
  }

  setEditOptionsModalMode("cancel-editor");
  (isCurrentlyCancelled ? backFromCancelEditorButton : editOptionsCancelDateInput).focus();
}

async function handleResetAccountConfirm() {
  clearMessages();

  if (!currentUser) {
    showError("初期化するにはログインしてください。");
    return;
  }

  const confirmationText = resetAccountConfirmInput.value.trim();
  if (confirmationText !== "初期化") {
    showError("確認文字が一致しなかったため、初期化を中止しました。");
    return;
  }

  setResetModalProcessingState(true);
  try {
    await deleteAllDocsInCollection(currentUser.uid, "carriers");
    await deleteAllDocsInCollection(currentUser.uid, "devices");
    await deleteAllDocsInCollection(currentUser.uid, "userRegistrations");

    currentCarriers = [];
    currentDevices = [];
    currentUserRegistrations = [];
    showCancelledCarriers = false;

    resetCarrierForm();
    populateDeviceOptions();
    populateUserRegistrationOptions();
    renderCarrierList([]);
    renderDeviceList([]);
    renderUserRegistrationList([]);
    setActiveTab("list-tab");
    resetAccountModal.classList.add("hidden");
    showSuccess("アカウントデータを初期化しました。");
  } catch (error) {
    showError(getErrorMessage(error));
  } finally {
    setResetModalProcessingState(false);
  }
}

// Firestore に回線情報を保存します。
async function handleCarrierSave(event) {
  event.preventDefault();
  clearMessages();

  if (!currentUser) {
    showError("保存するにはログインしてください。");
    return;
  }

  const payload = buildCarrierPayload();

  if (!payload) {
    return;
  }

  try {
    if (currentEditingCarrierId) {
      const carrierDocRef = doc(
        db,
        "users",
        currentUser.uid,
        "carriers",
        currentEditingCarrierId
      );
      await updateDoc(carrierDocRef, {
        ...payload,
        updatedAt: new Date().toISOString(),
      });
      showSuccess("回線情報を更新しました。");
    } else {
      const carriersRef = collection(db, "users", currentUser.uid, "carriers");
      await addDoc(carriersRef, {
        ...payload,
        createdAt: new Date().toISOString(),
      });
      if (pendingMnpSourceStatusUpdate) {
        const oldCarrierDocRef = doc(
          db,
          "users",
          currentUser.uid,
          "carriers",
          pendingMnpSourceStatusUpdate.carrierId
        );
        await updateDoc(oldCarrierDocRef, {
          isCancelled: true,
          cancelDate: pendingMnpSourceStatusUpdate.cancelDate,
          updatedAt: new Date().toISOString(),
        });
        pendingMnpSourceStatusUpdate = null;
      }

      showSuccess("回線情報を保存しました。");
    }

    resetCarrierForm();
    setActiveTab("list-tab");
    await loadCarriers(currentUser);
  } catch (error) {
    showError(getErrorMessage(error));
  }
}

async function deleteCurrentCarrier() {
  if (!currentUser || !currentEditingCarrierId) {
    showError("削除する回線が選択されていません。");
    return;
  }

  const carrierDocRef = doc(
    db,
    "users",
    currentUser.uid,
    "carriers",
    currentEditingCarrierId
  );
  await deleteDoc(carrierDocRef);
}

async function handleConfirmDeleteFromOptions() {
  clearMessages();

  if (!currentUser || !currentEditingCarrierId) {
    showError("削除する回線が選択されていません。");
    closeEditOptionsModal();
    return;
  }

  try {
    await deleteCurrentCarrier();
    closeEditOptionsModal();
    resetCarrierForm();
    setActiveTab("list-tab");
    showSuccess("回線情報を削除しました。");
    await loadCarriers(currentUser);
  } catch (error) {
    showError(getErrorMessage(error));
  }
}

function handleConfirmCancelFromOptions() {
  clearMessages();

  if (!currentEditingCarrierId) {
    showError("解約対象の回線が選択されていません。");
    closeEditOptionsModal();
    return;
  }

  const isCurrentlyCancelled = isCancelledSelect.value === "yes";
  if (isCurrentlyCancelled) {
    isCancelledSelect.value = "no";
    isCancelledSelect.dispatchEvent(new Event("change", { bubbles: true }));
    cancelDateInput.value = "";
    updateConditionalFields();
    closeEditOptionsModal();
    showSuccess("解約状態を解除しました。保存すると反映されます。");
    return;
  }

  const cancelDate = editOptionsCancelDateInput.value;
  if (!cancelDate) {
    showError("解約日を入力してください。");
    return;
  }

  isCancelledSelect.value = "yes";
  isCancelledSelect.dispatchEvent(new Event("change", { bubbles: true }));
  cancelDateInput.value = cancelDate;
  updateConditionalFields();
  closeEditOptionsModal();
  showSuccess("解約状態に変更しました。保存すると反映されます。");
}

function exportCarriersCsv() {
  if (!currentUser) {
    showError("エクスポートするにはログインしてください。");
    return;
  }
  const headers = [
    "carrierName",
    "phoneNumber",
    "accountId",
    "shopName",
    "contractDate",
    "planName",
    "userName",
    "lineType",
    "deviceName",
    "isCancelled",
    "cancelDate",
    "benefitItemsJson",
    "optionsJson",
  ];
  const rows = currentCarriers.map((carrier) => ({
    carrierName: carrier.carrierName || "",
    phoneNumber: carrier.phoneNumber || "",
    accountId: carrier.accountId || "",
    shopName: carrier.shopName || "",
    contractDate: carrier.contractDate || "",
    planName: carrier.planName || "",
    userName: carrier.userName || "",
    lineType: carrier.lineType || "SIM",
    deviceName: carrier.deviceName || "",
    isCancelled: Boolean(carrier.isCancelled),
    cancelDate: carrier.cancelDate || "",
    benefitItemsJson: JSON.stringify(normalizeCarrierBenefits(carrier)),
    optionsJson: JSON.stringify(normalizeCarrierOptions(carrier)),
  }));
  downloadCsv("mobily_carriers.csv", createCsv(headers, rows));
  showSuccess("回線CSVをエクスポートしました。");
}

function exportDevicesCsv() {
  if (!currentUser) {
    showError("エクスポートするにはログインしてください。");
    return;
  }
  const headers = ["platform", "name", "createdAt"];
  const rows = currentDevices.map((device) => ({
    platform: device.platform || "",
    name: device.name || "",
    createdAt: device.createdAt || "",
  }));
  downloadCsv("mobily_devices.csv", createCsv(headers, rows));
  showSuccess("端末CSVをエクスポートしました。");
}

function exportUsersCsv() {
  if (!currentUser) {
    showError("エクスポートするにはログインしてください。");
    return;
  }
  const headers = ["name", "createdAt"];
  const rows = currentUserRegistrations.map((userRegistration) => ({
    name: userRegistration.name || "",
    createdAt: userRegistration.createdAt || "",
  }));
  downloadCsv("mobily_users.csv", createCsv(headers, rows));
  showSuccess("利用者CSVをエクスポートしました。");
}

function readFileText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("CSVファイルの読み込みに失敗しました。"));
    reader.readAsText(file, "utf-8");
  });
}

async function importCarriersCsv(file) {
  if (!currentUser) {
    showError("インポートするにはログインしてください。");
    return;
  }
  const text = await readFileText(file);
  const rows = parseCsv(text);
  if (rows.length === 0) {
    showError("回線CSVにデータ行がありません。");
    return;
  }
  const carriersRef = collection(db, "users", currentUser.uid, "carriers");
  let importedCount = 0;
  for (const row of rows) {
    const benefitItems = row.benefitItemsJson ? JSON.parse(row.benefitItemsJson) : [];
    const options = row.optionsJson ? JSON.parse(row.optionsJson) : [];
    const primaryBenefit = Array.isArray(benefitItems) && benefitItems.length > 0
      ? benefitItems[0]
      : null;
    if (!row.carrierName || !row.phoneNumber || !row.contractDate || !row.planName || !primaryBenefit?.type) {
      continue;
    }
    const isDeviceBenefit = primaryBenefit.type === "特典端末";
    await addDoc(carriersRef, {
      carrierName: row.carrierName.trim(),
      phoneNumber: row.phoneNumber.trim(),
      accountId: (row.accountId || "").trim(),
      shopName: (row.shopName || "").trim(),
      contractDate: row.contractDate.trim(),
      planName: row.planName.trim(),
      benefitItems,
      benefitValue: primaryBenefit.type,
      benefitType: isDeviceBenefit ? "device" : "cashback",
      benefitDeviceName: isDeviceBenefit ? (primaryBenefit.deviceName || "") : "",
      cashbackKind: isDeviceBenefit ? "" : primaryBenefit.type,
      cashbackAmount: isDeviceBenefit ? 0 : Number(primaryBenefit.amount || 0),
      cashbackReceived: isDeviceBenefit ? false : Boolean(primaryBenefit.received),
      hasUserRegistration: Boolean((row.userName || "").trim()),
      userName: (row.userName || "").trim(),
      lineType: row.lineType === "eSIM" ? "eSIM" : "SIM",
      hasOption: Array.isArray(options) && options.length > 0,
      options: Array.isArray(options) ? options : [],
      deviceName: (row.deviceName || "").trim(),
      isCancelled: parseBoolean(row.isCancelled),
      cancelDate: (row.cancelDate || "").trim(),
      createdAt: new Date().toISOString(),
    });
    importedCount += 1;
  }
  await loadCarriers(currentUser);
  showSuccess(`回線CSVをインポートしました。${importedCount}件を追加しました。`);
}

async function importDevicesCsv(file) {
  if (!currentUser) {
    showError("インポートするにはログインしてください。");
    return;
  }
  const text = await readFileText(file);
  const rows = parseCsv(text);
  if (rows.length === 0) {
    showDeviceError("端末CSVにデータ行がありません。");
    return;
  }
  const devicesRef = collection(db, "users", currentUser.uid, "devices");
  const existingNames = new Set(currentDevices.map((device) => device.name));
  let importedCount = 0;
  for (const row of rows) {
    const name = (row.name || "").trim();
    const platform = (row.platform || "").trim();
    if (!name || !platform || existingNames.has(name)) {
      continue;
    }
    await addDoc(devicesRef, {
      platform,
      name,
      createdAt: row.createdAt || new Date().toISOString(),
    });
    existingNames.add(name);
    importedCount += 1;
  }
  await loadDevices(currentUser);
  showDeviceSuccess(`端末CSVをインポートしました。${importedCount}件を追加しました。`);
}

async function importUsersCsv(file) {
  if (!currentUser) {
    showError("インポートするにはログインしてください。");
    return;
  }
  const text = await readFileText(file);
  const rows = parseCsv(text);
  if (rows.length === 0) {
    showUserRegistrationError("利用者CSVにデータ行がありません。");
    return;
  }
  const usersRef = collection(db, "users", currentUser.uid, "userRegistrations");
  const existingNames = new Set(currentUserRegistrations.map((item) => item.name));
  let importedCount = 0;
  for (const row of rows) {
    const name = (row.name || "").trim();
    if (!name || existingNames.has(name)) {
      continue;
    }
    await addDoc(usersRef, {
      name,
      createdAt: row.createdAt || new Date().toISOString(),
    });
    existingNames.add(name);
    importedCount += 1;
  }
  await loadUserRegistrations(currentUser);
  showUserRegistrationSuccess(`利用者CSVをインポートしました。${importedCount}件を追加しました。`);
}

function handleCarrierSelect(event) {
  const cancelledToggleButton = event.target.closest("[data-action='toggle-cancelled']");

  if (cancelledToggleButton) {
    showCancelledCarriers = !showCancelledCarriers;
    renderCarrierList(currentCarriers);
    return;
  }

  const card = event.target.closest(".carrier-item");

  if (!card) {
    return;
  }

  const selectedCarrier = currentCarriers.find(
    (carrier) => carrier.id === card.dataset.carrierId
  );

  if (!selectedCarrier) {
    showError("選択した回線情報を読み込めませんでした。");
    return;
  }

  fillCarrierForm(selectedCarrier);
  setActiveTab("register-tab");
}

function handleCancelEdit() {
  clearMessages();
  pendingMnpPreset = null;
  pendingMnpSourceStatusUpdate = null;
  resetCarrierForm();
  setActiveTab("list-tab");
}

function handleAddCarrierClick() {
  clearMessages();
  resetCarrierForm();
  applyPendingMnpPresetIfAny();
  if (!phoneNumberInput.value || !contractDateInput.value) {
    pendingMnpSourceStatusUpdate = null;
  }
  setActiveTab("register-tab");
}

function handleMnpClick() {
  clearMessages();

  if (!currentUser || !currentEditingCarrierId) {
    showError("MNPの元になる回線を選択してください。");
    return;
  }

  const phoneNumber = phoneNumberInput.value.trim();

  if (!phoneNumber) {
    showError("MNPの引き継ぎには電話番号の入力が必要です。");
    return;
  }
  openMnpModal();
}

function handleConfirmMnp() {
  clearMessages();

  if (!currentUser || !currentEditingCarrierId) {
    showError("MNPの元になる回線を選択してください。");
    closeMnpModal();
    return;
  }

  const phoneNumber = phoneNumberInput.value.trim();
  const cancelDate = mnpCancelDateInput.value;

  if (!phoneNumber) {
    showError("MNPの引き継ぎには電話番号の入力が必要です。");
    return;
  }

  if (!cancelDate) {
    showError("MNPの引き継ぎには解約日の入力が必要です。");
    return;
  }

  cancelDateInput.value = cancelDate;
  isCancelledSelect.value = "yes";
  updateConditionalFields();

  pendingMnpPreset = {
    phoneNumber,
    contractDate: cancelDate,
  };
  pendingMnpSourceStatusUpdate = {
    carrierId: currentEditingCarrierId,
    cancelDate,
  };

  closeMnpModal();
  resetCarrierForm();
  applyPendingMnpPresetIfAny();
  setActiveTab("register-tab");
  showSuccess("MNP用に電話番号と契約日を引き継ぎました。");
}

function handleAddOptionClick() {
  createOptionRow();
}

function handleAddBenefitClick() {
  createBenefitRow();
}

function handleOptionListClick(event) {
  const removeButton = event.target.closest("[data-action='remove-option']");

  if (!removeButton) {
    return;
  }

  removeButton.closest(".option-item").remove();
}

function handleBenefitListClick(event) {
  const removeButton = event.target.closest("[data-action='remove-benefit']");

  if (!removeButton) {
    return;
  }

  removeButton.closest(".option-item").remove();
}

function handleCarrierChoiceClick(event) {
  const carrierButton = event.target.closest(".carrier-choice-button");

  if (!carrierButton) {
    return;
  }

  if (!carrierButton.dataset.carrierValue) {
    return;
  }

  selectCarrierValue(carrierButton.dataset.carrierValue);
}

function handleChoiceButtonClick(event) {
  const choiceButton = event.target.closest(".choice-button");

  if (!choiceButton) {
    return;
  }

  const choiceGroup = choiceButton.closest(".choice-button-grid[data-target-select-id]");

  if (!choiceGroup) {
    return;
  }

  const selectElement = document.getElementById(choiceGroup.dataset.targetSelectId);

  if (!selectElement || selectElement.disabled) {
    return;
  }

  selectElement.value = choiceButton.dataset.value;
  selectElement.dispatchEvent(new Event("change", { bubbles: true }));
}

function handleToggleCancelClick() {
  if (isCancelledSelect.disabled || !currentEditingCarrierId) {
    return;
  }

  isCancelledSelect.value = isCancelledSelect.value === "yes" ? "no" : "yes";
  isCancelledSelect.dispatchEvent(new Event("change", { bubbles: true }));
}

function handleOtherCarriersToggle() {
  const willShowPanel = otherCarrierPanel.classList.contains("hidden");
  setOtherCarrierPanelVisible(willShowPanel);

  if (willShowPanel && !getKnownCarrierValues().includes(carrierNameInput.value)) {
    selectCarrierValue("その他", { openOtherPanel: true });
  }
}

// ログイン状態が変わったときに UI を更新します。
onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  clearMessages();

  if (user) {
    authStatus.textContent = `ログイン中: ${user.email}`;
    appStatus.textContent = `ログイン中: ${user.email}`;
    mypageEmail.textContent = `ログイン中アカウント: ${user.email}`;
    setScreenMode(true);
    setActiveTab("list-tab");
    setCarrierFormEnabled(true);
    await loadDevices(user);
    await loadUserRegistrations(user);
    await loadCarriers(user);
    return;
  }

  authStatus.textContent = "未ログインです。";
  appStatus.textContent = "ログイン中";
  mypageEmail.textContent = "現在のログインアカウント情報を確認できます。";
  setScreenMode(false);
  setActiveTab("list-tab");
  setCarrierFormEnabled(false);
  resetCarrierForm();
  currentDevices = [];
  currentUserRegistrations = [];
  setDeviceFormVisible(false);
  setUserRegistrationFormVisible(false);
  populateDeviceOptions();
  populateUserRegistrationOptions();
  deviceForm.reset();
  userRegistrationForm.reset();
  deviceList.innerHTML =
    '<li class="empty-item">データなし</li>';
  userRegistrationList.innerHTML =
    '<li class="empty-item">データなし</li>';
  renderLoggedOutState();
});

// ボタンとフォームにイベントを登録します。
signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSignup();
});
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleLogin();
});
goSignupButton.addEventListener("click", () => {
  clearMessages();
  setAuthPanelMode("signup");
});
goLoginButton.addEventListener("click", () => {
  clearMessages();
  setAuthPanelMode("login");
});
logoutButton.addEventListener("click", handleLogout);
resetAccountButton.addEventListener("click", openResetAccountModal);
cancelResetAccountButton.addEventListener("click", closeResetAccountModal);
confirmResetAccountButton.addEventListener("click", handleResetAccountConfirm);
resetAccountModal.addEventListener("click", (event) => {
  if (event.target === resetAccountModal) {
    closeResetAccountModal();
  }
});
mnpModal.addEventListener("click", (event) => {
  if (event.target === mnpModal) {
    closeMnpModal();
  }
});
editOptionsModal.addEventListener("click", (event) => {
  if (event.target === editOptionsModal) {
    closeEditOptionsModal();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !resetAccountModal.classList.contains("hidden")) {
    closeResetAccountModal();
    return;
  }
  if (event.key === "Escape" && !mnpModal.classList.contains("hidden")) {
    closeMnpModal();
    return;
  }
  if (event.key === "Escape" && !editOptionsModal.classList.contains("hidden")) {
    closeEditOptionsModal();
    return;
  }
});
carrierForm.addEventListener("submit", handleCarrierSave);
deviceForm.addEventListener("submit", handleDeviceAdd);
userRegistrationForm.addEventListener("submit", handleUserRegistrationAdd);
addCarrierButton.addEventListener("click", handleAddCarrierClick);
addBenefitButton.addEventListener("click", handleAddBenefitClick);
addOptionButton.addEventListener("click", handleAddOptionClick);
benefitList.addEventListener("click", handleBenefitListClick);
optionList.addEventListener("click", handleOptionListClick);
carrierForm.addEventListener("click", handleCarrierChoiceClick);
carrierForm.addEventListener("click", handleChoiceButtonClick);
showOtherCarriersButton.addEventListener("click", handleOtherCarriersToggle);
editOptionsButton.addEventListener("click", openEditOptionsModal);
cancelMnpButton.addEventListener("click", closeMnpModal);
confirmMnpButton.addEventListener("click", handleConfirmMnp);
closeEditOptionsButton.addEventListener("click", closeEditOptionsModal);
editOptionsDeleteButton.addEventListener("click", openDeleteConfirmInOptions);
editOptionsCancelButton.addEventListener("click", openCancelEditorInOptions);
editOptionsMnpButton.addEventListener("click", () => {
  closeEditOptionsModal();
  handleMnpClick();
});
backFromDeleteConfirmButton.addEventListener("click", () => setEditOptionsModalMode("menu"));
confirmDeleteFromOptionsButton.addEventListener("click", handleConfirmDeleteFromOptions);
backFromCancelEditorButton.addEventListener("click", () => setEditOptionsModalMode("menu"));
confirmCancelFromOptionsButton.addEventListener("click", handleConfirmCancelFromOptions);
cancelEditButton.addEventListener("click", handleCancelEdit);
carrierList.addEventListener("click", handleCarrierSelect);
deviceList.addEventListener("click", handleDeviceDelete);
userRegistrationList.addEventListener("click", handleUserRegistrationDelete);
homeButton.addEventListener("click", () => setActiveTab("list-tab"));
mypageButton.addEventListener("click", () => setActiveTab("mypage-tab"));
isCancelledSelect.addEventListener("change", updateConditionalFields);
openDeviceFormButton.addEventListener("click", () => {
  setDeviceFormVisible(deviceForm.classList.contains("hidden"));
});
openUserRegistrationFormButton.addEventListener("click", () => {
  setUserRegistrationFormVisible(userRegistrationForm.classList.contains("hidden"));
});
exportCarriersCsvButton.addEventListener("click", exportCarriersCsv);
exportDevicesCsvButton.addEventListener("click", exportDevicesCsv);
exportUsersCsvButton.addEventListener("click", exportUsersCsv);
importCarriersCsvButton.addEventListener("click", () => {
  importCarriersCsvInput.value = "";
  importCarriersCsvInput.click();
});
importDevicesCsvButton.addEventListener("click", () => {
  importDevicesCsvInput.value = "";
  importDevicesCsvInput.click();
});
importUsersCsvButton.addEventListener("click", () => {
  importUsersCsvInput.value = "";
  importUsersCsvInput.click();
});
importCarriersCsvInput.addEventListener("change", async () => {
  const [file] = importCarriersCsvInput.files || [];
  if (!file) {
    return;
  }
  try {
    await importCarriersCsv(file);
  } catch (error) {
    showError(getErrorMessage(error));
  }
});
importDevicesCsvInput.addEventListener("change", async () => {
  const [file] = importDevicesCsvInput.files || [];
  if (!file) {
    return;
  }
  try {
    await importDevicesCsv(file);
  } catch (error) {
    showDeviceError(getErrorMessage(error));
  }
});
importUsersCsvInput.addEventListener("change", async () => {
  const [file] = importUsersCsvInput.files || [];
  if (!file) {
    return;
  }
  try {
    await importUsersCsv(file);
  } catch (error) {
    showUserRegistrationError(getErrorMessage(error));
  }
});
setAuthPanelMode("login");
setDeviceFormVisible(false);
setUserRegistrationFormVisible(false);
applyCarrierChoiceButtonThemes();

themePreference = getStoredThemePreference();
applyThemeToDocument();
syncThemeButtons();

systemThemeMedia.addEventListener("change", () => {
  if (themePreference !== "system") {
    return;
  }
  applyThemeToDocument();
});

themeSystemButton?.addEventListener("click", () => setThemePreference("system"));
themeLightButton?.addEventListener("click", () => setThemePreference("light"));
themeDarkButton?.addEventListener("click", () => setThemePreference("dark"));
