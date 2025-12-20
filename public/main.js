// src/game/Cell.ts
class Cell {
  r;
  c;
  el;
  mine = false;
  revealed = false;
  flagged = false;
  constructor(r, c, el) {
    this.r = r;
    this.c = c;
    this.el = el;
  }
}

// src/game/constants.ts
var DIFFICULTY_LEVELS = {
  easy: { r: 9, c: 9, m: 10 },
  medium: { r: 16, c: 16, m: 40 },
  hard: { r: 16, c: 30, m: 99 }
};
var HINTS_PER_GAME = 3;

// node_modules/@firebase/util/dist/postinstall.mjs
var getDefaultsFromPostinstall = () => {
  return;
};

// node_modules/@firebase/util/dist/index.esm.js
var stringToByteArray$1 = function(str) {
  const out = [];
  let p = 0;
  for (let i = 0;i < str.length; i++) {
    let c = str.charCodeAt(i);
    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = c >> 6 | 192;
      out[p++] = c & 63 | 128;
    } else if ((c & 64512) === 55296 && i + 1 < str.length && (str.charCodeAt(i + 1) & 64512) === 56320) {
      c = 65536 + ((c & 1023) << 10) + (str.charCodeAt(++i) & 1023);
      out[p++] = c >> 18 | 240;
      out[p++] = c >> 12 & 63 | 128;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    } else {
      out[p++] = c >> 12 | 224;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    }
  }
  return out;
};
var byteArrayToString = function(bytes) {
  const out = [];
  let pos = 0, c = 0;
  while (pos < bytes.length) {
    const c1 = bytes[pos++];
    if (c1 < 128) {
      out[c++] = String.fromCharCode(c1);
    } else if (c1 > 191 && c1 < 224) {
      const c2 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
    } else if (c1 > 239 && c1 < 365) {
      const c2 = bytes[pos++];
      const c3 = bytes[pos++];
      const c4 = bytes[pos++];
      const u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 65536;
      out[c++] = String.fromCharCode(55296 + (u >> 10));
      out[c++] = String.fromCharCode(56320 + (u & 1023));
    } else {
      const c2 = bytes[pos++];
      const c3 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
    }
  }
  return out.join("");
};
var base64 = {
  byteToCharMap_: null,
  charToByteMap_: null,
  byteToCharMapWebSafe_: null,
  charToByteMapWebSafe_: null,
  ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz" + "0123456789",
  get ENCODED_VALS() {
    return this.ENCODED_VALS_BASE + "+/=";
  },
  get ENCODED_VALS_WEBSAFE() {
    return this.ENCODED_VALS_BASE + "-_.";
  },
  HAS_NATIVE_SUPPORT: typeof atob === "function",
  encodeByteArray(input, webSafe) {
    if (!Array.isArray(input)) {
      throw Error("encodeByteArray takes an array as a parameter");
    }
    this.init_();
    const byteToCharMap = webSafe ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
    const output = [];
    for (let i = 0;i < input.length; i += 3) {
      const byte1 = input[i];
      const haveByte2 = i + 1 < input.length;
      const byte2 = haveByte2 ? input[i + 1] : 0;
      const haveByte3 = i + 2 < input.length;
      const byte3 = haveByte3 ? input[i + 2] : 0;
      const outByte1 = byte1 >> 2;
      const outByte2 = (byte1 & 3) << 4 | byte2 >> 4;
      let outByte3 = (byte2 & 15) << 2 | byte3 >> 6;
      let outByte4 = byte3 & 63;
      if (!haveByte3) {
        outByte4 = 64;
        if (!haveByte2) {
          outByte3 = 64;
        }
      }
      output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
    }
    return output.join("");
  },
  encodeString(input, webSafe) {
    if (this.HAS_NATIVE_SUPPORT && !webSafe) {
      return btoa(input);
    }
    return this.encodeByteArray(stringToByteArray$1(input), webSafe);
  },
  decodeString(input, webSafe) {
    if (this.HAS_NATIVE_SUPPORT && !webSafe) {
      return atob(input);
    }
    return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
  },
  decodeStringToByteArray(input, webSafe) {
    this.init_();
    const charToByteMap = webSafe ? this.charToByteMapWebSafe_ : this.charToByteMap_;
    const output = [];
    for (let i = 0;i < input.length; ) {
      const byte1 = charToByteMap[input.charAt(i++)];
      const haveByte2 = i < input.length;
      const byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
      ++i;
      const haveByte3 = i < input.length;
      const byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
      ++i;
      const haveByte4 = i < input.length;
      const byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
      ++i;
      if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
        throw new DecodeBase64StringError;
      }
      const outByte1 = byte1 << 2 | byte2 >> 4;
      output.push(outByte1);
      if (byte3 !== 64) {
        const outByte2 = byte2 << 4 & 240 | byte3 >> 2;
        output.push(outByte2);
        if (byte4 !== 64) {
          const outByte3 = byte3 << 6 & 192 | byte4;
          output.push(outByte3);
        }
      }
    }
    return output;
  },
  init_() {
    if (!this.byteToCharMap_) {
      this.byteToCharMap_ = {};
      this.charToByteMap_ = {};
      this.byteToCharMapWebSafe_ = {};
      this.charToByteMapWebSafe_ = {};
      for (let i = 0;i < this.ENCODED_VALS.length; i++) {
        this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
        this.charToByteMap_[this.byteToCharMap_[i]] = i;
        this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
        this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i;
        if (i >= this.ENCODED_VALS_BASE.length) {
          this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
          this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
        }
      }
    }
  }
};

class DecodeBase64StringError extends Error {
  constructor() {
    super(...arguments);
    this.name = "DecodeBase64StringError";
  }
}
var base64Encode = function(str) {
  const utf8Bytes = stringToByteArray$1(str);
  return base64.encodeByteArray(utf8Bytes, true);
};
var base64urlEncodeWithoutPadding = function(str) {
  return base64Encode(str).replace(/\./g, "");
};
var base64Decode = function(str) {
  try {
    return base64.decodeString(str, true);
  } catch (e) {
    console.error("base64Decode failed: ", e);
  }
  return null;
};
function getGlobal() {
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw new Error("Unable to locate global object.");
}
var getDefaultsFromGlobal = () => getGlobal().__FIREBASE_DEFAULTS__;
var getDefaultsFromEnvVariable = () => {
  if (typeof process === "undefined" || typeof process.env === "undefined") {
    return;
  }
  const defaultsJsonString = process.env.__FIREBASE_DEFAULTS__;
  if (defaultsJsonString) {
    return JSON.parse(defaultsJsonString);
  }
};
var getDefaultsFromCookie = () => {
  if (typeof document === "undefined") {
    return;
  }
  let match;
  try {
    match = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
  } catch (e) {
    return;
  }
  const decoded = match && base64Decode(match[1]);
  return decoded && JSON.parse(decoded);
};
var getDefaults = () => {
  try {
    return getDefaultsFromPostinstall() || getDefaultsFromGlobal() || getDefaultsFromEnvVariable() || getDefaultsFromCookie();
  } catch (e) {
    console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);
    return;
  }
};
var getDefaultEmulatorHost = (productName) => getDefaults()?.emulatorHosts?.[productName];
var getDefaultEmulatorHostnameAndPort = (productName) => {
  const host = getDefaultEmulatorHost(productName);
  if (!host) {
    return;
  }
  const separatorIndex = host.lastIndexOf(":");
  if (separatorIndex <= 0 || separatorIndex + 1 === host.length) {
    throw new Error(`Invalid host ${host} with no separate hostname and port!`);
  }
  const port = parseInt(host.substring(separatorIndex + 1), 10);
  if (host[0] === "[") {
    return [host.substring(1, separatorIndex - 1), port];
  } else {
    return [host.substring(0, separatorIndex), port];
  }
};
var getDefaultAppConfig = () => getDefaults()?.config;
class Deferred {
  constructor() {
    this.reject = () => {};
    this.resolve = () => {};
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
  wrapCallback(callback) {
    return (error, value) => {
      if (error) {
        this.reject(error);
      } else {
        this.resolve(value);
      }
      if (typeof callback === "function") {
        this.promise.catch(() => {});
        if (callback.length === 1) {
          callback(error);
        } else {
          callback(error, value);
        }
      }
    };
  }
}
function isCloudWorkstation(url) {
  try {
    const host = url.startsWith("http://") || url.startsWith("https://") ? new URL(url).hostname : url;
    return host.endsWith(".cloudworkstations.dev");
  } catch {
    return false;
  }
}
async function pingServer(endpoint) {
  const result = await fetch(endpoint, {
    credentials: "include"
  });
  return result.ok;
}
function createMockUserToken(token, projectId) {
  if (token.uid) {
    throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
  }
  const header = {
    alg: "none",
    type: "JWT"
  };
  const project = projectId || "demo-project";
  const iat = token.iat || 0;
  const sub = token.sub || token.user_id;
  if (!sub) {
    throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
  }
  const payload = {
    iss: `https://securetoken.google.com/${project}`,
    aud: project,
    iat,
    exp: iat + 3600,
    auth_time: iat,
    sub,
    user_id: sub,
    firebase: {
      sign_in_provider: "custom",
      identities: {}
    },
    ...token
  };
  const signature = "";
  return [
    base64urlEncodeWithoutPadding(JSON.stringify(header)),
    base64urlEncodeWithoutPadding(JSON.stringify(payload)),
    signature
  ].join(".");
}
var emulatorStatus = {};
function getEmulatorSummary() {
  const summary = {
    prod: [],
    emulator: []
  };
  for (const key of Object.keys(emulatorStatus)) {
    if (emulatorStatus[key]) {
      summary.emulator.push(key);
    } else {
      summary.prod.push(key);
    }
  }
  return summary;
}
function getOrCreateEl(id) {
  let parentDiv = document.getElementById(id);
  let created = false;
  if (!parentDiv) {
    parentDiv = document.createElement("div");
    parentDiv.setAttribute("id", id);
    created = true;
  }
  return { created, element: parentDiv };
}
var previouslyDismissed = false;
function updateEmulatorBanner(name, isRunningEmulator) {
  if (typeof window === "undefined" || typeof document === "undefined" || !isCloudWorkstation(window.location.host) || emulatorStatus[name] === isRunningEmulator || emulatorStatus[name] || previouslyDismissed) {
    return;
  }
  emulatorStatus[name] = isRunningEmulator;
  function prefixedId(id) {
    return `__firebase__banner__${id}`;
  }
  const bannerId = "__firebase__banner";
  const summary = getEmulatorSummary();
  const showError = summary.prod.length > 0;
  function tearDown() {
    const element = document.getElementById(bannerId);
    if (element) {
      element.remove();
    }
  }
  function setupBannerStyles(bannerEl) {
    bannerEl.style.display = "flex";
    bannerEl.style.background = "#7faaf0";
    bannerEl.style.position = "fixed";
    bannerEl.style.bottom = "5px";
    bannerEl.style.left = "5px";
    bannerEl.style.padding = ".5em";
    bannerEl.style.borderRadius = "5px";
    bannerEl.style.alignItems = "center";
  }
  function setupIconStyles(prependIcon, iconId) {
    prependIcon.setAttribute("width", "24");
    prependIcon.setAttribute("id", iconId);
    prependIcon.setAttribute("height", "24");
    prependIcon.setAttribute("viewBox", "0 0 24 24");
    prependIcon.setAttribute("fill", "none");
    prependIcon.style.marginLeft = "-6px";
  }
  function setupCloseBtn() {
    const closeBtn = document.createElement("span");
    closeBtn.style.cursor = "pointer";
    closeBtn.style.marginLeft = "16px";
    closeBtn.style.fontSize = "24px";
    closeBtn.innerHTML = " &times;";
    closeBtn.onclick = () => {
      previouslyDismissed = true;
      tearDown();
    };
    return closeBtn;
  }
  function setupLinkStyles(learnMoreLink, learnMoreId) {
    learnMoreLink.setAttribute("id", learnMoreId);
    learnMoreLink.innerText = "Learn more";
    learnMoreLink.href = "https://firebase.google.com/docs/studio/preview-apps#preview-backend";
    learnMoreLink.setAttribute("target", "__blank");
    learnMoreLink.style.paddingLeft = "5px";
    learnMoreLink.style.textDecoration = "underline";
  }
  function setupDom() {
    const banner = getOrCreateEl(bannerId);
    const firebaseTextId = prefixedId("text");
    const firebaseText = document.getElementById(firebaseTextId) || document.createElement("span");
    const learnMoreId = prefixedId("learnmore");
    const learnMoreLink = document.getElementById(learnMoreId) || document.createElement("a");
    const prependIconId = prefixedId("preprendIcon");
    const prependIcon = document.getElementById(prependIconId) || document.createElementNS("http://www.w3.org/2000/svg", "svg");
    if (banner.created) {
      const bannerEl = banner.element;
      setupBannerStyles(bannerEl);
      setupLinkStyles(learnMoreLink, learnMoreId);
      const closeBtn = setupCloseBtn();
      setupIconStyles(prependIcon, prependIconId);
      bannerEl.append(prependIcon, firebaseText, learnMoreLink, closeBtn);
      document.body.appendChild(bannerEl);
    }
    if (showError) {
      firebaseText.innerText = `Preview backend disconnected.`;
      prependIcon.innerHTML = `<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`;
    } else {
      prependIcon.innerHTML = `<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`;
      firebaseText.innerText = "Preview backend running in this workspace.";
    }
    firebaseText.setAttribute("id", firebaseTextId);
  }
  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", setupDom);
  } else {
    setupDom();
  }
}
function getUA() {
  if (typeof navigator !== "undefined" && typeof navigator["userAgent"] === "string") {
    return navigator["userAgent"];
  } else {
    return "";
  }
}
function isNode() {
  const forceEnvironment = getDefaults()?.forceEnvironment;
  if (forceEnvironment === "node") {
    return true;
  } else if (forceEnvironment === "browser") {
    return false;
  }
  try {
    return Object.prototype.toString.call(global.process) === "[object process]";
  } catch (e) {
    return false;
  }
}
function isSafari() {
  return !isNode() && !!navigator.userAgent && navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
}
function isIndexedDBAvailable() {
  try {
    return typeof indexedDB === "object";
  } catch (e) {
    return false;
  }
}
function validateIndexedDBOpenable() {
  return new Promise((resolve, reject) => {
    try {
      let preExist = true;
      const DB_CHECK_NAME = "validate-browser-context-for-indexeddb-analytics-module";
      const request = self.indexedDB.open(DB_CHECK_NAME);
      request.onsuccess = () => {
        request.result.close();
        if (!preExist) {
          self.indexedDB.deleteDatabase(DB_CHECK_NAME);
        }
        resolve(true);
      };
      request.onupgradeneeded = () => {
        preExist = false;
      };
      request.onerror = () => {
        reject(request.error?.message || "");
      };
    } catch (error) {
      reject(error);
    }
  });
}
var ERROR_NAME = "FirebaseError";

class FirebaseError extends Error {
  constructor(code, message, customData) {
    super(message);
    this.code = code;
    this.customData = customData;
    this.name = ERROR_NAME;
    Object.setPrototypeOf(this, FirebaseError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorFactory.prototype.create);
    }
  }
}

class ErrorFactory {
  constructor(service, serviceName, errors) {
    this.service = service;
    this.serviceName = serviceName;
    this.errors = errors;
  }
  create(code, ...data) {
    const customData = data[0] || {};
    const fullCode = `${this.service}/${code}`;
    const template = this.errors[code];
    const message = template ? replaceTemplate(template, customData) : "Error";
    const fullMessage = `${this.serviceName}: ${message} (${fullCode}).`;
    const error = new FirebaseError(fullCode, fullMessage, customData);
    return error;
  }
}
function replaceTemplate(template, data) {
  return template.replace(PATTERN, (_, key) => {
    const value = data[key];
    return value != null ? String(value) : `<${key}?>`;
  });
}
var PATTERN = /\{\$([^}]+)}/g;
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  for (const k of aKeys) {
    if (!bKeys.includes(k)) {
      return false;
    }
    const aProp = a[k];
    const bProp = b[k];
    if (isObject(aProp) && isObject(bProp)) {
      if (!deepEqual(aProp, bProp)) {
        return false;
      }
    } else if (aProp !== bProp) {
      return false;
    }
  }
  for (const k of bKeys) {
    if (!aKeys.includes(k)) {
      return false;
    }
  }
  return true;
}
function isObject(thing) {
  return thing !== null && typeof thing === "object";
}
var MAX_VALUE_MILLIS = 4 * 60 * 60 * 1000;
function getModularInstance(service) {
  if (service && service._delegate) {
    return service._delegate;
  } else {
    return service;
  }
}

// node_modules/@firebase/component/dist/esm/index.esm.js
class Component {
  constructor(name, instanceFactory, type) {
    this.name = name;
    this.instanceFactory = instanceFactory;
    this.type = type;
    this.multipleInstances = false;
    this.serviceProps = {};
    this.instantiationMode = "LAZY";
    this.onInstanceCreated = null;
  }
  setInstantiationMode(mode) {
    this.instantiationMode = mode;
    return this;
  }
  setMultipleInstances(multipleInstances) {
    this.multipleInstances = multipleInstances;
    return this;
  }
  setServiceProps(props) {
    this.serviceProps = props;
    return this;
  }
  setInstanceCreatedCallback(callback) {
    this.onInstanceCreated = callback;
    return this;
  }
}
var DEFAULT_ENTRY_NAME = "[DEFAULT]";

class Provider {
  constructor(name, container) {
    this.name = name;
    this.container = container;
    this.component = null;
    this.instances = new Map;
    this.instancesDeferred = new Map;
    this.instancesOptions = new Map;
    this.onInitCallbacks = new Map;
  }
  get(identifier) {
    const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
    if (!this.instancesDeferred.has(normalizedIdentifier)) {
      const deferred = new Deferred;
      this.instancesDeferred.set(normalizedIdentifier, deferred);
      if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
        try {
          const instance = this.getOrInitializeService({
            instanceIdentifier: normalizedIdentifier
          });
          if (instance) {
            deferred.resolve(instance);
          }
        } catch (e) {}
      }
    }
    return this.instancesDeferred.get(normalizedIdentifier).promise;
  }
  getImmediate(options) {
    const normalizedIdentifier = this.normalizeInstanceIdentifier(options?.identifier);
    const optional = options?.optional ?? false;
    if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
      try {
        return this.getOrInitializeService({
          instanceIdentifier: normalizedIdentifier
        });
      } catch (e) {
        if (optional) {
          return null;
        } else {
          throw e;
        }
      }
    } else {
      if (optional) {
        return null;
      } else {
        throw Error(`Service ${this.name} is not available`);
      }
    }
  }
  getComponent() {
    return this.component;
  }
  setComponent(component) {
    if (component.name !== this.name) {
      throw Error(`Mismatching Component ${component.name} for Provider ${this.name}.`);
    }
    if (this.component) {
      throw Error(`Component for ${this.name} has already been provided`);
    }
    this.component = component;
    if (!this.shouldAutoInitialize()) {
      return;
    }
    if (isComponentEager(component)) {
      try {
        this.getOrInitializeService({ instanceIdentifier: DEFAULT_ENTRY_NAME });
      } catch (e) {}
    }
    for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
      const normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
      try {
        const instance = this.getOrInitializeService({
          instanceIdentifier: normalizedIdentifier
        });
        instanceDeferred.resolve(instance);
      } catch (e) {}
    }
  }
  clearInstance(identifier = DEFAULT_ENTRY_NAME) {
    this.instancesDeferred.delete(identifier);
    this.instancesOptions.delete(identifier);
    this.instances.delete(identifier);
  }
  async delete() {
    const services = Array.from(this.instances.values());
    await Promise.all([
      ...services.filter((service) => ("INTERNAL" in service)).map((service) => service.INTERNAL.delete()),
      ...services.filter((service) => ("_delete" in service)).map((service) => service._delete())
    ]);
  }
  isComponentSet() {
    return this.component != null;
  }
  isInitialized(identifier = DEFAULT_ENTRY_NAME) {
    return this.instances.has(identifier);
  }
  getOptions(identifier = DEFAULT_ENTRY_NAME) {
    return this.instancesOptions.get(identifier) || {};
  }
  initialize(opts = {}) {
    const { options = {} } = opts;
    const normalizedIdentifier = this.normalizeInstanceIdentifier(opts.instanceIdentifier);
    if (this.isInitialized(normalizedIdentifier)) {
      throw Error(`${this.name}(${normalizedIdentifier}) has already been initialized`);
    }
    if (!this.isComponentSet()) {
      throw Error(`Component ${this.name} has not been registered yet`);
    }
    const instance = this.getOrInitializeService({
      instanceIdentifier: normalizedIdentifier,
      options
    });
    for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
      const normalizedDeferredIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
      if (normalizedIdentifier === normalizedDeferredIdentifier) {
        instanceDeferred.resolve(instance);
      }
    }
    return instance;
  }
  onInit(callback, identifier) {
    const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
    const existingCallbacks = this.onInitCallbacks.get(normalizedIdentifier) ?? new Set;
    existingCallbacks.add(callback);
    this.onInitCallbacks.set(normalizedIdentifier, existingCallbacks);
    const existingInstance = this.instances.get(normalizedIdentifier);
    if (existingInstance) {
      callback(existingInstance, normalizedIdentifier);
    }
    return () => {
      existingCallbacks.delete(callback);
    };
  }
  invokeOnInitCallbacks(instance, identifier) {
    const callbacks = this.onInitCallbacks.get(identifier);
    if (!callbacks) {
      return;
    }
    for (const callback of callbacks) {
      try {
        callback(instance, identifier);
      } catch {}
    }
  }
  getOrInitializeService({ instanceIdentifier, options = {} }) {
    let instance = this.instances.get(instanceIdentifier);
    if (!instance && this.component) {
      instance = this.component.instanceFactory(this.container, {
        instanceIdentifier: normalizeIdentifierForFactory(instanceIdentifier),
        options
      });
      this.instances.set(instanceIdentifier, instance);
      this.instancesOptions.set(instanceIdentifier, options);
      this.invokeOnInitCallbacks(instance, instanceIdentifier);
      if (this.component.onInstanceCreated) {
        try {
          this.component.onInstanceCreated(this.container, instanceIdentifier, instance);
        } catch {}
      }
    }
    return instance || null;
  }
  normalizeInstanceIdentifier(identifier = DEFAULT_ENTRY_NAME) {
    if (this.component) {
      return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME;
    } else {
      return identifier;
    }
  }
  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT";
  }
}
function normalizeIdentifierForFactory(identifier) {
  return identifier === DEFAULT_ENTRY_NAME ? undefined : identifier;
}
function isComponentEager(component) {
  return component.instantiationMode === "EAGER";
}

class ComponentContainer {
  constructor(name) {
    this.name = name;
    this.providers = new Map;
  }
  addComponent(component) {
    const provider = this.getProvider(component.name);
    if (provider.isComponentSet()) {
      throw new Error(`Component ${component.name} has already been registered with ${this.name}`);
    }
    provider.setComponent(component);
  }
  addOrOverwriteComponent(component) {
    const provider = this.getProvider(component.name);
    if (provider.isComponentSet()) {
      this.providers.delete(component.name);
    }
    this.addComponent(component);
  }
  getProvider(name) {
    if (this.providers.has(name)) {
      return this.providers.get(name);
    }
    const provider = new Provider(name, this);
    this.providers.set(name, provider);
    return provider;
  }
  getProviders() {
    return Array.from(this.providers.values());
  }
}

// node_modules/@firebase/logger/dist/esm/index.esm.js
var instances = [];
var LogLevel;
(function(LogLevel2) {
  LogLevel2[LogLevel2["DEBUG"] = 0] = "DEBUG";
  LogLevel2[LogLevel2["VERBOSE"] = 1] = "VERBOSE";
  LogLevel2[LogLevel2["INFO"] = 2] = "INFO";
  LogLevel2[LogLevel2["WARN"] = 3] = "WARN";
  LogLevel2[LogLevel2["ERROR"] = 4] = "ERROR";
  LogLevel2[LogLevel2["SILENT"] = 5] = "SILENT";
})(LogLevel || (LogLevel = {}));
var levelStringToEnum = {
  debug: LogLevel.DEBUG,
  verbose: LogLevel.VERBOSE,
  info: LogLevel.INFO,
  warn: LogLevel.WARN,
  error: LogLevel.ERROR,
  silent: LogLevel.SILENT
};
var defaultLogLevel = LogLevel.INFO;
var ConsoleMethod = {
  [LogLevel.DEBUG]: "log",
  [LogLevel.VERBOSE]: "log",
  [LogLevel.INFO]: "info",
  [LogLevel.WARN]: "warn",
  [LogLevel.ERROR]: "error"
};
var defaultLogHandler = (instance, logType, ...args) => {
  if (logType < instance.logLevel) {
    return;
  }
  const now = new Date().toISOString();
  const method = ConsoleMethod[logType];
  if (method) {
    console[method](`[${now}]  ${instance.name}:`, ...args);
  } else {
    throw new Error(`Attempted to log a message with an invalid logType (value: ${logType})`);
  }
};

class Logger {
  constructor(name) {
    this.name = name;
    this._logLevel = defaultLogLevel;
    this._logHandler = defaultLogHandler;
    this._userLogHandler = null;
    instances.push(this);
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(val) {
    if (!(val in LogLevel)) {
      throw new TypeError(`Invalid value "${val}" assigned to \`logLevel\``);
    }
    this._logLevel = val;
  }
  setLogLevel(val) {
    this._logLevel = typeof val === "string" ? levelStringToEnum[val] : val;
  }
  get logHandler() {
    return this._logHandler;
  }
  set logHandler(val) {
    if (typeof val !== "function") {
      throw new TypeError("Value assigned to `logHandler` must be a function");
    }
    this._logHandler = val;
  }
  get userLogHandler() {
    return this._userLogHandler;
  }
  set userLogHandler(val) {
    this._userLogHandler = val;
  }
  debug(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.DEBUG, ...args);
    this._logHandler(this, LogLevel.DEBUG, ...args);
  }
  log(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.VERBOSE, ...args);
    this._logHandler(this, LogLevel.VERBOSE, ...args);
  }
  info(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.INFO, ...args);
    this._logHandler(this, LogLevel.INFO, ...args);
  }
  warn(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.WARN, ...args);
    this._logHandler(this, LogLevel.WARN, ...args);
  }
  error(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.ERROR, ...args);
    this._logHandler(this, LogLevel.ERROR, ...args);
  }
}
// node_modules/idb/build/wrap-idb-value.js
var instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);
var idbProxyableTypes;
var cursorAdvanceMethods;
function getIdbProxyableTypes() {
  return idbProxyableTypes || (idbProxyableTypes = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function getCursorAdvanceMethods() {
  return cursorAdvanceMethods || (cursorAdvanceMethods = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
var cursorRequestMap = new WeakMap;
var transactionDoneMap = new WeakMap;
var transactionStoreNamesMap = new WeakMap;
var transformCache = new WeakMap;
var reverseTransformCache = new WeakMap;
function promisifyRequest(request) {
  const promise = new Promise((resolve, reject) => {
    const unlisten = () => {
      request.removeEventListener("success", success);
      request.removeEventListener("error", error);
    };
    const success = () => {
      resolve(wrap(request.result));
      unlisten();
    };
    const error = () => {
      reject(request.error);
      unlisten();
    };
    request.addEventListener("success", success);
    request.addEventListener("error", error);
  });
  promise.then((value) => {
    if (value instanceof IDBCursor) {
      cursorRequestMap.set(value, request);
    }
  }).catch(() => {});
  reverseTransformCache.set(promise, request);
  return promise;
}
function cacheDonePromiseForTransaction(tx) {
  if (transactionDoneMap.has(tx))
    return;
  const done = new Promise((resolve, reject) => {
    const unlisten = () => {
      tx.removeEventListener("complete", complete);
      tx.removeEventListener("error", error);
      tx.removeEventListener("abort", error);
    };
    const complete = () => {
      resolve();
      unlisten();
    };
    const error = () => {
      reject(tx.error || new DOMException("AbortError", "AbortError"));
      unlisten();
    };
    tx.addEventListener("complete", complete);
    tx.addEventListener("error", error);
    tx.addEventListener("abort", error);
  });
  transactionDoneMap.set(tx, done);
}
var idbProxyTraps = {
  get(target, prop, receiver) {
    if (target instanceof IDBTransaction) {
      if (prop === "done")
        return transactionDoneMap.get(target);
      if (prop === "objectStoreNames") {
        return target.objectStoreNames || transactionStoreNamesMap.get(target);
      }
      if (prop === "store") {
        return receiver.objectStoreNames[1] ? undefined : receiver.objectStore(receiver.objectStoreNames[0]);
      }
    }
    return wrap(target[prop]);
  },
  set(target, prop, value) {
    target[prop] = value;
    return true;
  },
  has(target, prop) {
    if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) {
      return true;
    }
    return prop in target;
  }
};
function replaceTraps(callback) {
  idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
  if (func === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype)) {
    return function(storeNames, ...args) {
      const tx = func.call(unwrap(this), storeNames, ...args);
      transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
      return wrap(tx);
    };
  }
  if (getCursorAdvanceMethods().includes(func)) {
    return function(...args) {
      func.apply(unwrap(this), args);
      return wrap(cursorRequestMap.get(this));
    };
  }
  return function(...args) {
    return wrap(func.apply(unwrap(this), args));
  };
}
function transformCachableValue(value) {
  if (typeof value === "function")
    return wrapFunction(value);
  if (value instanceof IDBTransaction)
    cacheDonePromiseForTransaction(value);
  if (instanceOfAny(value, getIdbProxyableTypes()))
    return new Proxy(value, idbProxyTraps);
  return value;
}
function wrap(value) {
  if (value instanceof IDBRequest)
    return promisifyRequest(value);
  if (transformCache.has(value))
    return transformCache.get(value);
  const newValue = transformCachableValue(value);
  if (newValue !== value) {
    transformCache.set(value, newValue);
    reverseTransformCache.set(newValue, value);
  }
  return newValue;
}
var unwrap = (value) => reverseTransformCache.get(value);

// node_modules/idb/build/index.js
function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
  const request = indexedDB.open(name, version);
  const openPromise = wrap(request);
  if (upgrade) {
    request.addEventListener("upgradeneeded", (event) => {
      upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
    });
  }
  if (blocked) {
    request.addEventListener("blocked", (event) => blocked(event.oldVersion, event.newVersion, event));
  }
  openPromise.then((db) => {
    if (terminated)
      db.addEventListener("close", () => terminated());
    if (blocking) {
      db.addEventListener("versionchange", (event) => blocking(event.oldVersion, event.newVersion, event));
    }
  }).catch(() => {});
  return openPromise;
}
var readMethods = ["get", "getKey", "getAll", "getAllKeys", "count"];
var writeMethods = ["put", "add", "delete", "clear"];
var cachedMethods = new Map;
function getMethod(target, prop) {
  if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) {
    return;
  }
  if (cachedMethods.get(prop))
    return cachedMethods.get(prop);
  const targetFuncName = prop.replace(/FromIndex$/, "");
  const useIndex = prop !== targetFuncName;
  const isWrite = writeMethods.includes(targetFuncName);
  if (!(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) {
    return;
  }
  const method = async function(storeName, ...args) {
    const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
    let target2 = tx.store;
    if (useIndex)
      target2 = target2.index(args.shift());
    return (await Promise.all([
      target2[targetFuncName](...args),
      isWrite && tx.done
    ]))[0];
  };
  cachedMethods.set(prop, method);
  return method;
}
replaceTraps((oldTraps) => ({
  ...oldTraps,
  get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
  has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));

// node_modules/@firebase/app/dist/esm/index.esm.js
class PlatformLoggerServiceImpl {
  constructor(container) {
    this.container = container;
  }
  getPlatformInfoString() {
    const providers = this.container.getProviders();
    return providers.map((provider) => {
      if (isVersionServiceProvider(provider)) {
        const service = provider.getImmediate();
        return `${service.library}/${service.version}`;
      } else {
        return null;
      }
    }).filter((logString) => logString).join(" ");
  }
}
function isVersionServiceProvider(provider) {
  const component = provider.getComponent();
  return component?.type === "VERSION";
}
var name$q = "@firebase/app";
var version$1 = "0.14.6";
var logger = new Logger("@firebase/app");
var name$p = "@firebase/app-compat";
var name$o = "@firebase/analytics-compat";
var name$n = "@firebase/analytics";
var name$m = "@firebase/app-check-compat";
var name$l = "@firebase/app-check";
var name$k = "@firebase/auth";
var name$j = "@firebase/auth-compat";
var name$i = "@firebase/database";
var name$h = "@firebase/data-connect";
var name$g = "@firebase/database-compat";
var name$f = "@firebase/functions";
var name$e = "@firebase/functions-compat";
var name$d = "@firebase/installations";
var name$c = "@firebase/installations-compat";
var name$b = "@firebase/messaging";
var name$a = "@firebase/messaging-compat";
var name$9 = "@firebase/performance";
var name$8 = "@firebase/performance-compat";
var name$7 = "@firebase/remote-config";
var name$6 = "@firebase/remote-config-compat";
var name$5 = "@firebase/storage";
var name$4 = "@firebase/storage-compat";
var name$3 = "@firebase/firestore";
var name$2 = "@firebase/ai";
var name$1 = "@firebase/firestore-compat";
var name = "firebase";
var version = "12.6.0";
var DEFAULT_ENTRY_NAME2 = "[DEFAULT]";
var PLATFORM_LOG_STRING = {
  [name$q]: "fire-core",
  [name$p]: "fire-core-compat",
  [name$n]: "fire-analytics",
  [name$o]: "fire-analytics-compat",
  [name$l]: "fire-app-check",
  [name$m]: "fire-app-check-compat",
  [name$k]: "fire-auth",
  [name$j]: "fire-auth-compat",
  [name$i]: "fire-rtdb",
  [name$h]: "fire-data-connect",
  [name$g]: "fire-rtdb-compat",
  [name$f]: "fire-fn",
  [name$e]: "fire-fn-compat",
  [name$d]: "fire-iid",
  [name$c]: "fire-iid-compat",
  [name$b]: "fire-fcm",
  [name$a]: "fire-fcm-compat",
  [name$9]: "fire-perf",
  [name$8]: "fire-perf-compat",
  [name$7]: "fire-rc",
  [name$6]: "fire-rc-compat",
  [name$5]: "fire-gcs",
  [name$4]: "fire-gcs-compat",
  [name$3]: "fire-fst",
  [name$1]: "fire-fst-compat",
  [name$2]: "fire-vertex",
  "fire-js": "fire-js",
  [name]: "fire-js-all"
};
var _apps = new Map;
var _serverApps = new Map;
var _components = new Map;
function _addComponent(app, component) {
  try {
    app.container.addComponent(component);
  } catch (e) {
    logger.debug(`Component ${component.name} failed to register with FirebaseApp ${app.name}`, e);
  }
}
function _registerComponent(component) {
  const componentName = component.name;
  if (_components.has(componentName)) {
    logger.debug(`There were multiple attempts to register component ${componentName}.`);
    return false;
  }
  _components.set(componentName, component);
  for (const app of _apps.values()) {
    _addComponent(app, component);
  }
  for (const serverApp of _serverApps.values()) {
    _addComponent(serverApp, component);
  }
  return true;
}
function _getProvider(app, name2) {
  const heartbeatController = app.container.getProvider("heartbeat").getImmediate({ optional: true });
  if (heartbeatController) {
    heartbeatController.triggerHeartbeat();
  }
  return app.container.getProvider(name2);
}
function _isFirebaseServerApp(obj) {
  if (obj === null || obj === undefined) {
    return false;
  }
  return obj.settings !== undefined;
}
var ERRORS = {
  ["no-app"]: "No Firebase App '{$appName}' has been created - " + "call initializeApp() first",
  ["bad-app-name"]: "Illegal App name: '{$appName}'",
  ["duplicate-app"]: "Firebase App named '{$appName}' already exists with different options or config",
  ["app-deleted"]: "Firebase App named '{$appName}' already deleted",
  ["server-app-deleted"]: "Firebase Server App has been deleted",
  ["no-options"]: "Need to provide options, when not being deployed to hosting via source.",
  ["invalid-app-argument"]: "firebase.{$appName}() takes either no argument or a " + "Firebase App instance.",
  ["invalid-log-argument"]: "First argument to `onLog` must be null or a function.",
  ["idb-open"]: "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
  ["idb-get"]: "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
  ["idb-set"]: "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
  ["idb-delete"]: "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
  ["finalization-registry-not-supported"]: "FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",
  ["invalid-server-app-environment"]: "FirebaseServerApp is not for use in browser environments."
};
var ERROR_FACTORY = new ErrorFactory("app", "Firebase", ERRORS);

class FirebaseAppImpl {
  constructor(options, config, container) {
    this._isDeleted = false;
    this._options = { ...options };
    this._config = { ...config };
    this._name = config.name;
    this._automaticDataCollectionEnabled = config.automaticDataCollectionEnabled;
    this._container = container;
    this.container.addComponent(new Component("app", () => this, "PUBLIC"));
  }
  get automaticDataCollectionEnabled() {
    this.checkDestroyed();
    return this._automaticDataCollectionEnabled;
  }
  set automaticDataCollectionEnabled(val) {
    this.checkDestroyed();
    this._automaticDataCollectionEnabled = val;
  }
  get name() {
    this.checkDestroyed();
    return this._name;
  }
  get options() {
    this.checkDestroyed();
    return this._options;
  }
  get config() {
    this.checkDestroyed();
    return this._config;
  }
  get container() {
    return this._container;
  }
  get isDeleted() {
    return this._isDeleted;
  }
  set isDeleted(val) {
    this._isDeleted = val;
  }
  checkDestroyed() {
    if (this.isDeleted) {
      throw ERROR_FACTORY.create("app-deleted", { appName: this._name });
    }
  }
}
var SDK_VERSION = version;
function initializeApp(_options, rawConfig = {}) {
  let options = _options;
  if (typeof rawConfig !== "object") {
    const name3 = rawConfig;
    rawConfig = { name: name3 };
  }
  const config = {
    name: DEFAULT_ENTRY_NAME2,
    automaticDataCollectionEnabled: true,
    ...rawConfig
  };
  const name2 = config.name;
  if (typeof name2 !== "string" || !name2) {
    throw ERROR_FACTORY.create("bad-app-name", {
      appName: String(name2)
    });
  }
  options || (options = getDefaultAppConfig());
  if (!options) {
    throw ERROR_FACTORY.create("no-options");
  }
  const existingApp = _apps.get(name2);
  if (existingApp) {
    if (deepEqual(options, existingApp.options) && deepEqual(config, existingApp.config)) {
      return existingApp;
    } else {
      throw ERROR_FACTORY.create("duplicate-app", { appName: name2 });
    }
  }
  const container = new ComponentContainer(name2);
  for (const component of _components.values()) {
    container.addComponent(component);
  }
  const newApp = new FirebaseAppImpl(options, config, container);
  _apps.set(name2, newApp);
  return newApp;
}
function getApp(name2 = DEFAULT_ENTRY_NAME2) {
  const app = _apps.get(name2);
  if (!app && name2 === DEFAULT_ENTRY_NAME2 && getDefaultAppConfig()) {
    return initializeApp();
  }
  if (!app) {
    throw ERROR_FACTORY.create("no-app", { appName: name2 });
  }
  return app;
}
function registerVersion(libraryKeyOrName, version2, variant) {
  let library = PLATFORM_LOG_STRING[libraryKeyOrName] ?? libraryKeyOrName;
  if (variant) {
    library += `-${variant}`;
  }
  const libraryMismatch = library.match(/\s|\//);
  const versionMismatch = version2.match(/\s|\//);
  if (libraryMismatch || versionMismatch) {
    const warning = [
      `Unable to register library "${library}" with version "${version2}":`
    ];
    if (libraryMismatch) {
      warning.push(`library name "${library}" contains illegal characters (whitespace or "/")`);
    }
    if (libraryMismatch && versionMismatch) {
      warning.push("and");
    }
    if (versionMismatch) {
      warning.push(`version name "${version2}" contains illegal characters (whitespace or "/")`);
    }
    logger.warn(warning.join(" "));
    return;
  }
  _registerComponent(new Component(`${library}-version`, () => ({ library, version: version2 }), "VERSION"));
}
var DB_NAME = "firebase-heartbeat-database";
var DB_VERSION = 1;
var STORE_NAME = "firebase-heartbeat-store";
var dbPromise = null;
function getDbPromise() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade: (db, oldVersion) => {
        switch (oldVersion) {
          case 0:
            try {
              db.createObjectStore(STORE_NAME);
            } catch (e) {
              console.warn(e);
            }
        }
      }
    }).catch((e) => {
      throw ERROR_FACTORY.create("idb-open", {
        originalErrorMessage: e.message
      });
    });
  }
  return dbPromise;
}
async function readHeartbeatsFromIndexedDB(app) {
  try {
    const db = await getDbPromise();
    const tx = db.transaction(STORE_NAME);
    const result = await tx.objectStore(STORE_NAME).get(computeKey(app));
    await tx.done;
    return result;
  } catch (e) {
    if (e instanceof FirebaseError) {
      logger.warn(e.message);
    } else {
      const idbGetError = ERROR_FACTORY.create("idb-get", {
        originalErrorMessage: e?.message
      });
      logger.warn(idbGetError.message);
    }
  }
}
async function writeHeartbeatsToIndexedDB(app, heartbeatObject) {
  try {
    const db = await getDbPromise();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const objectStore = tx.objectStore(STORE_NAME);
    await objectStore.put(heartbeatObject, computeKey(app));
    await tx.done;
  } catch (e) {
    if (e instanceof FirebaseError) {
      logger.warn(e.message);
    } else {
      const idbGetError = ERROR_FACTORY.create("idb-set", {
        originalErrorMessage: e?.message
      });
      logger.warn(idbGetError.message);
    }
  }
}
function computeKey(app) {
  return `${app.name}!${app.options.appId}`;
}
var MAX_HEADER_BYTES = 1024;
var MAX_NUM_STORED_HEARTBEATS = 30;

class HeartbeatServiceImpl {
  constructor(container) {
    this.container = container;
    this._heartbeatsCache = null;
    const app = this.container.getProvider("app").getImmediate();
    this._storage = new HeartbeatStorageImpl(app);
    this._heartbeatsCachePromise = this._storage.read().then((result) => {
      this._heartbeatsCache = result;
      return result;
    });
  }
  async triggerHeartbeat() {
    try {
      const platformLogger = this.container.getProvider("platform-logger").getImmediate();
      const agent = platformLogger.getPlatformInfoString();
      const date = getUTCDateString();
      if (this._heartbeatsCache?.heartbeats == null) {
        this._heartbeatsCache = await this._heartbeatsCachePromise;
        if (this._heartbeatsCache?.heartbeats == null) {
          return;
        }
      }
      if (this._heartbeatsCache.lastSentHeartbeatDate === date || this._heartbeatsCache.heartbeats.some((singleDateHeartbeat) => singleDateHeartbeat.date === date)) {
        return;
      } else {
        this._heartbeatsCache.heartbeats.push({ date, agent });
        if (this._heartbeatsCache.heartbeats.length > MAX_NUM_STORED_HEARTBEATS) {
          const earliestHeartbeatIdx = getEarliestHeartbeatIdx(this._heartbeatsCache.heartbeats);
          this._heartbeatsCache.heartbeats.splice(earliestHeartbeatIdx, 1);
        }
      }
      return this._storage.overwrite(this._heartbeatsCache);
    } catch (e) {
      logger.warn(e);
    }
  }
  async getHeartbeatsHeader() {
    try {
      if (this._heartbeatsCache === null) {
        await this._heartbeatsCachePromise;
      }
      if (this._heartbeatsCache?.heartbeats == null || this._heartbeatsCache.heartbeats.length === 0) {
        return "";
      }
      const date = getUTCDateString();
      const { heartbeatsToSend, unsentEntries } = extractHeartbeatsForHeader(this._heartbeatsCache.heartbeats);
      const headerString = base64urlEncodeWithoutPadding(JSON.stringify({ version: 2, heartbeats: heartbeatsToSend }));
      this._heartbeatsCache.lastSentHeartbeatDate = date;
      if (unsentEntries.length > 0) {
        this._heartbeatsCache.heartbeats = unsentEntries;
        await this._storage.overwrite(this._heartbeatsCache);
      } else {
        this._heartbeatsCache.heartbeats = [];
        this._storage.overwrite(this._heartbeatsCache);
      }
      return headerString;
    } catch (e) {
      logger.warn(e);
      return "";
    }
  }
}
function getUTCDateString() {
  const today = new Date;
  return today.toISOString().substring(0, 10);
}
function extractHeartbeatsForHeader(heartbeatsCache, maxSize = MAX_HEADER_BYTES) {
  const heartbeatsToSend = [];
  let unsentEntries = heartbeatsCache.slice();
  for (const singleDateHeartbeat of heartbeatsCache) {
    const heartbeatEntry = heartbeatsToSend.find((hb) => hb.agent === singleDateHeartbeat.agent);
    if (!heartbeatEntry) {
      heartbeatsToSend.push({
        agent: singleDateHeartbeat.agent,
        dates: [singleDateHeartbeat.date]
      });
      if (countBytes(heartbeatsToSend) > maxSize) {
        heartbeatsToSend.pop();
        break;
      }
    } else {
      heartbeatEntry.dates.push(singleDateHeartbeat.date);
      if (countBytes(heartbeatsToSend) > maxSize) {
        heartbeatEntry.dates.pop();
        break;
      }
    }
    unsentEntries = unsentEntries.slice(1);
  }
  return {
    heartbeatsToSend,
    unsentEntries
  };
}

class HeartbeatStorageImpl {
  constructor(app) {
    this.app = app;
    this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
  }
  async runIndexedDBEnvironmentCheck() {
    if (!isIndexedDBAvailable()) {
      return false;
    } else {
      return validateIndexedDBOpenable().then(() => true).catch(() => false);
    }
  }
  async read() {
    const canUseIndexedDB = await this._canUseIndexedDBPromise;
    if (!canUseIndexedDB) {
      return { heartbeats: [] };
    } else {
      const idbHeartbeatObject = await readHeartbeatsFromIndexedDB(this.app);
      if (idbHeartbeatObject?.heartbeats) {
        return idbHeartbeatObject;
      } else {
        return { heartbeats: [] };
      }
    }
  }
  async overwrite(heartbeatsObject) {
    const canUseIndexedDB = await this._canUseIndexedDBPromise;
    if (!canUseIndexedDB) {
      return;
    } else {
      const existingHeartbeatsObject = await this.read();
      return writeHeartbeatsToIndexedDB(this.app, {
        lastSentHeartbeatDate: heartbeatsObject.lastSentHeartbeatDate ?? existingHeartbeatsObject.lastSentHeartbeatDate,
        heartbeats: heartbeatsObject.heartbeats
      });
    }
  }
  async add(heartbeatsObject) {
    const canUseIndexedDB = await this._canUseIndexedDBPromise;
    if (!canUseIndexedDB) {
      return;
    } else {
      const existingHeartbeatsObject = await this.read();
      return writeHeartbeatsToIndexedDB(this.app, {
        lastSentHeartbeatDate: heartbeatsObject.lastSentHeartbeatDate ?? existingHeartbeatsObject.lastSentHeartbeatDate,
        heartbeats: [
          ...existingHeartbeatsObject.heartbeats,
          ...heartbeatsObject.heartbeats
        ]
      });
    }
  }
}
function countBytes(heartbeatsCache) {
  return base64urlEncodeWithoutPadding(JSON.stringify({ version: 2, heartbeats: heartbeatsCache })).length;
}
function getEarliestHeartbeatIdx(heartbeats) {
  if (heartbeats.length === 0) {
    return -1;
  }
  let earliestHeartbeatIdx = 0;
  let earliestHeartbeatDate = heartbeats[0].date;
  for (let i = 1;i < heartbeats.length; i++) {
    if (heartbeats[i].date < earliestHeartbeatDate) {
      earliestHeartbeatDate = heartbeats[i].date;
      earliestHeartbeatIdx = i;
    }
  }
  return earliestHeartbeatIdx;
}
function registerCoreComponents(variant) {
  _registerComponent(new Component("platform-logger", (container) => new PlatformLoggerServiceImpl(container), "PRIVATE"));
  _registerComponent(new Component("heartbeat", (container) => new HeartbeatServiceImpl(container), "PRIVATE"));
  registerVersion(name$q, version$1, variant);
  registerVersion(name$q, version$1, "esm2020");
  registerVersion("fire-js", "");
}
registerCoreComponents("");

// node_modules/firebase/app/dist/esm/index.esm.js
var name2 = "firebase";
var version2 = "12.7.0";
registerVersion(name2, version2, "app");

// node_modules/@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var bloom_blob_es2018 = {};
var Integer;
var Md5;
(function() {
  var h;
  function k(d, a) {
    function c() {}
    c.prototype = a.prototype;
    d.F = a.prototype;
    d.prototype = new c;
    d.prototype.constructor = d;
    d.D = function(f, e, g) {
      for (var b = Array(arguments.length - 2), r = 2;r < arguments.length; r++)
        b[r - 2] = arguments[r];
      return a.prototype[e].apply(f, b);
    };
  }
  function l() {
    this.blockSize = -1;
  }
  function m() {
    this.blockSize = -1;
    this.blockSize = 64;
    this.g = Array(4);
    this.C = Array(this.blockSize);
    this.o = this.h = 0;
    this.u();
  }
  k(m, l);
  m.prototype.u = function() {
    this.g[0] = 1732584193;
    this.g[1] = 4023233417;
    this.g[2] = 2562383102;
    this.g[3] = 271733878;
    this.o = this.h = 0;
  };
  function n(d, a, c) {
    c || (c = 0);
    const f = Array(16);
    if (typeof a === "string")
      for (var e = 0;e < 16; ++e)
        f[e] = a.charCodeAt(c++) | a.charCodeAt(c++) << 8 | a.charCodeAt(c++) << 16 | a.charCodeAt(c++) << 24;
    else
      for (e = 0;e < 16; ++e)
        f[e] = a[c++] | a[c++] << 8 | a[c++] << 16 | a[c++] << 24;
    a = d.g[0];
    c = d.g[1];
    e = d.g[2];
    let g = d.g[3], b;
    b = a + (g ^ c & (e ^ g)) + f[0] + 3614090360 & 4294967295;
    a = c + (b << 7 & 4294967295 | b >>> 25);
    b = g + (e ^ a & (c ^ e)) + f[1] + 3905402710 & 4294967295;
    g = a + (b << 12 & 4294967295 | b >>> 20);
    b = e + (c ^ g & (a ^ c)) + f[2] + 606105819 & 4294967295;
    e = g + (b << 17 & 4294967295 | b >>> 15);
    b = c + (a ^ e & (g ^ a)) + f[3] + 3250441966 & 4294967295;
    c = e + (b << 22 & 4294967295 | b >>> 10);
    b = a + (g ^ c & (e ^ g)) + f[4] + 4118548399 & 4294967295;
    a = c + (b << 7 & 4294967295 | b >>> 25);
    b = g + (e ^ a & (c ^ e)) + f[5] + 1200080426 & 4294967295;
    g = a + (b << 12 & 4294967295 | b >>> 20);
    b = e + (c ^ g & (a ^ c)) + f[6] + 2821735955 & 4294967295;
    e = g + (b << 17 & 4294967295 | b >>> 15);
    b = c + (a ^ e & (g ^ a)) + f[7] + 4249261313 & 4294967295;
    c = e + (b << 22 & 4294967295 | b >>> 10);
    b = a + (g ^ c & (e ^ g)) + f[8] + 1770035416 & 4294967295;
    a = c + (b << 7 & 4294967295 | b >>> 25);
    b = g + (e ^ a & (c ^ e)) + f[9] + 2336552879 & 4294967295;
    g = a + (b << 12 & 4294967295 | b >>> 20);
    b = e + (c ^ g & (a ^ c)) + f[10] + 4294925233 & 4294967295;
    e = g + (b << 17 & 4294967295 | b >>> 15);
    b = c + (a ^ e & (g ^ a)) + f[11] + 2304563134 & 4294967295;
    c = e + (b << 22 & 4294967295 | b >>> 10);
    b = a + (g ^ c & (e ^ g)) + f[12] + 1804603682 & 4294967295;
    a = c + (b << 7 & 4294967295 | b >>> 25);
    b = g + (e ^ a & (c ^ e)) + f[13] + 4254626195 & 4294967295;
    g = a + (b << 12 & 4294967295 | b >>> 20);
    b = e + (c ^ g & (a ^ c)) + f[14] + 2792965006 & 4294967295;
    e = g + (b << 17 & 4294967295 | b >>> 15);
    b = c + (a ^ e & (g ^ a)) + f[15] + 1236535329 & 4294967295;
    c = e + (b << 22 & 4294967295 | b >>> 10);
    b = a + (e ^ g & (c ^ e)) + f[1] + 4129170786 & 4294967295;
    a = c + (b << 5 & 4294967295 | b >>> 27);
    b = g + (c ^ e & (a ^ c)) + f[6] + 3225465664 & 4294967295;
    g = a + (b << 9 & 4294967295 | b >>> 23);
    b = e + (a ^ c & (g ^ a)) + f[11] + 643717713 & 4294967295;
    e = g + (b << 14 & 4294967295 | b >>> 18);
    b = c + (g ^ a & (e ^ g)) + f[0] + 3921069994 & 4294967295;
    c = e + (b << 20 & 4294967295 | b >>> 12);
    b = a + (e ^ g & (c ^ e)) + f[5] + 3593408605 & 4294967295;
    a = c + (b << 5 & 4294967295 | b >>> 27);
    b = g + (c ^ e & (a ^ c)) + f[10] + 38016083 & 4294967295;
    g = a + (b << 9 & 4294967295 | b >>> 23);
    b = e + (a ^ c & (g ^ a)) + f[15] + 3634488961 & 4294967295;
    e = g + (b << 14 & 4294967295 | b >>> 18);
    b = c + (g ^ a & (e ^ g)) + f[4] + 3889429448 & 4294967295;
    c = e + (b << 20 & 4294967295 | b >>> 12);
    b = a + (e ^ g & (c ^ e)) + f[9] + 568446438 & 4294967295;
    a = c + (b << 5 & 4294967295 | b >>> 27);
    b = g + (c ^ e & (a ^ c)) + f[14] + 3275163606 & 4294967295;
    g = a + (b << 9 & 4294967295 | b >>> 23);
    b = e + (a ^ c & (g ^ a)) + f[3] + 4107603335 & 4294967295;
    e = g + (b << 14 & 4294967295 | b >>> 18);
    b = c + (g ^ a & (e ^ g)) + f[8] + 1163531501 & 4294967295;
    c = e + (b << 20 & 4294967295 | b >>> 12);
    b = a + (e ^ g & (c ^ e)) + f[13] + 2850285829 & 4294967295;
    a = c + (b << 5 & 4294967295 | b >>> 27);
    b = g + (c ^ e & (a ^ c)) + f[2] + 4243563512 & 4294967295;
    g = a + (b << 9 & 4294967295 | b >>> 23);
    b = e + (a ^ c & (g ^ a)) + f[7] + 1735328473 & 4294967295;
    e = g + (b << 14 & 4294967295 | b >>> 18);
    b = c + (g ^ a & (e ^ g)) + f[12] + 2368359562 & 4294967295;
    c = e + (b << 20 & 4294967295 | b >>> 12);
    b = a + (c ^ e ^ g) + f[5] + 4294588738 & 4294967295;
    a = c + (b << 4 & 4294967295 | b >>> 28);
    b = g + (a ^ c ^ e) + f[8] + 2272392833 & 4294967295;
    g = a + (b << 11 & 4294967295 | b >>> 21);
    b = e + (g ^ a ^ c) + f[11] + 1839030562 & 4294967295;
    e = g + (b << 16 & 4294967295 | b >>> 16);
    b = c + (e ^ g ^ a) + f[14] + 4259657740 & 4294967295;
    c = e + (b << 23 & 4294967295 | b >>> 9);
    b = a + (c ^ e ^ g) + f[1] + 2763975236 & 4294967295;
    a = c + (b << 4 & 4294967295 | b >>> 28);
    b = g + (a ^ c ^ e) + f[4] + 1272893353 & 4294967295;
    g = a + (b << 11 & 4294967295 | b >>> 21);
    b = e + (g ^ a ^ c) + f[7] + 4139469664 & 4294967295;
    e = g + (b << 16 & 4294967295 | b >>> 16);
    b = c + (e ^ g ^ a) + f[10] + 3200236656 & 4294967295;
    c = e + (b << 23 & 4294967295 | b >>> 9);
    b = a + (c ^ e ^ g) + f[13] + 681279174 & 4294967295;
    a = c + (b << 4 & 4294967295 | b >>> 28);
    b = g + (a ^ c ^ e) + f[0] + 3936430074 & 4294967295;
    g = a + (b << 11 & 4294967295 | b >>> 21);
    b = e + (g ^ a ^ c) + f[3] + 3572445317 & 4294967295;
    e = g + (b << 16 & 4294967295 | b >>> 16);
    b = c + (e ^ g ^ a) + f[6] + 76029189 & 4294967295;
    c = e + (b << 23 & 4294967295 | b >>> 9);
    b = a + (c ^ e ^ g) + f[9] + 3654602809 & 4294967295;
    a = c + (b << 4 & 4294967295 | b >>> 28);
    b = g + (a ^ c ^ e) + f[12] + 3873151461 & 4294967295;
    g = a + (b << 11 & 4294967295 | b >>> 21);
    b = e + (g ^ a ^ c) + f[15] + 530742520 & 4294967295;
    e = g + (b << 16 & 4294967295 | b >>> 16);
    b = c + (e ^ g ^ a) + f[2] + 3299628645 & 4294967295;
    c = e + (b << 23 & 4294967295 | b >>> 9);
    b = a + (e ^ (c | ~g)) + f[0] + 4096336452 & 4294967295;
    a = c + (b << 6 & 4294967295 | b >>> 26);
    b = g + (c ^ (a | ~e)) + f[7] + 1126891415 & 4294967295;
    g = a + (b << 10 & 4294967295 | b >>> 22);
    b = e + (a ^ (g | ~c)) + f[14] + 2878612391 & 4294967295;
    e = g + (b << 15 & 4294967295 | b >>> 17);
    b = c + (g ^ (e | ~a)) + f[5] + 4237533241 & 4294967295;
    c = e + (b << 21 & 4294967295 | b >>> 11);
    b = a + (e ^ (c | ~g)) + f[12] + 1700485571 & 4294967295;
    a = c + (b << 6 & 4294967295 | b >>> 26);
    b = g + (c ^ (a | ~e)) + f[3] + 2399980690 & 4294967295;
    g = a + (b << 10 & 4294967295 | b >>> 22);
    b = e + (a ^ (g | ~c)) + f[10] + 4293915773 & 4294967295;
    e = g + (b << 15 & 4294967295 | b >>> 17);
    b = c + (g ^ (e | ~a)) + f[1] + 2240044497 & 4294967295;
    c = e + (b << 21 & 4294967295 | b >>> 11);
    b = a + (e ^ (c | ~g)) + f[8] + 1873313359 & 4294967295;
    a = c + (b << 6 & 4294967295 | b >>> 26);
    b = g + (c ^ (a | ~e)) + f[15] + 4264355552 & 4294967295;
    g = a + (b << 10 & 4294967295 | b >>> 22);
    b = e + (a ^ (g | ~c)) + f[6] + 2734768916 & 4294967295;
    e = g + (b << 15 & 4294967295 | b >>> 17);
    b = c + (g ^ (e | ~a)) + f[13] + 1309151649 & 4294967295;
    c = e + (b << 21 & 4294967295 | b >>> 11);
    b = a + (e ^ (c | ~g)) + f[4] + 4149444226 & 4294967295;
    a = c + (b << 6 & 4294967295 | b >>> 26);
    b = g + (c ^ (a | ~e)) + f[11] + 3174756917 & 4294967295;
    g = a + (b << 10 & 4294967295 | b >>> 22);
    b = e + (a ^ (g | ~c)) + f[2] + 718787259 & 4294967295;
    e = g + (b << 15 & 4294967295 | b >>> 17);
    b = c + (g ^ (e | ~a)) + f[9] + 3951481745 & 4294967295;
    d.g[0] = d.g[0] + a & 4294967295;
    d.g[1] = d.g[1] + (e + (b << 21 & 4294967295 | b >>> 11)) & 4294967295;
    d.g[2] = d.g[2] + e & 4294967295;
    d.g[3] = d.g[3] + g & 4294967295;
  }
  m.prototype.v = function(d, a) {
    a === undefined && (a = d.length);
    const c = a - this.blockSize, f = this.C;
    let e = this.h, g = 0;
    for (;g < a; ) {
      if (e == 0)
        for (;g <= c; )
          n(this, d, g), g += this.blockSize;
      if (typeof d === "string")
        for (;g < a; ) {
          if (f[e++] = d.charCodeAt(g++), e == this.blockSize) {
            n(this, f);
            e = 0;
            break;
          }
        }
      else
        for (;g < a; )
          if (f[e++] = d[g++], e == this.blockSize) {
            n(this, f);
            e = 0;
            break;
          }
    }
    this.h = e;
    this.o += a;
  };
  m.prototype.A = function() {
    var d = Array((this.h < 56 ? this.blockSize : this.blockSize * 2) - this.h);
    d[0] = 128;
    for (var a = 1;a < d.length - 8; ++a)
      d[a] = 0;
    a = this.o * 8;
    for (var c = d.length - 8;c < d.length; ++c)
      d[c] = a & 255, a /= 256;
    this.v(d);
    d = Array(16);
    a = 0;
    for (c = 0;c < 4; ++c)
      for (let f = 0;f < 32; f += 8)
        d[a++] = this.g[c] >>> f & 255;
    return d;
  };
  function p(d, a) {
    var c = q;
    return Object.prototype.hasOwnProperty.call(c, d) ? c[d] : c[d] = a(d);
  }
  function t(d, a) {
    this.h = a;
    const c = [];
    let f = true;
    for (let e = d.length - 1;e >= 0; e--) {
      const g = d[e] | 0;
      f && g == a || (c[e] = g, f = false);
    }
    this.g = c;
  }
  var q = {};
  function u(d) {
    return -128 <= d && d < 128 ? p(d, function(a) {
      return new t([a | 0], a < 0 ? -1 : 0);
    }) : new t([d | 0], d < 0 ? -1 : 0);
  }
  function v(d) {
    if (isNaN(d) || !isFinite(d))
      return w;
    if (d < 0)
      return x(v(-d));
    const a = [];
    let c = 1;
    for (let f = 0;d >= c; f++)
      a[f] = d / c | 0, c *= 4294967296;
    return new t(a, 0);
  }
  function y(d, a) {
    if (d.length == 0)
      throw Error("number format error: empty string");
    a = a || 10;
    if (a < 2 || 36 < a)
      throw Error("radix out of range: " + a);
    if (d.charAt(0) == "-")
      return x(y(d.substring(1), a));
    if (d.indexOf("-") >= 0)
      throw Error('number format error: interior "-" character');
    const c = v(Math.pow(a, 8));
    let f = w;
    for (let g = 0;g < d.length; g += 8) {
      var e = Math.min(8, d.length - g);
      const b = parseInt(d.substring(g, g + e), a);
      e < 8 ? (e = v(Math.pow(a, e)), f = f.j(e).add(v(b))) : (f = f.j(c), f = f.add(v(b)));
    }
    return f;
  }
  var w = u(0), z = u(1), A = u(16777216);
  h = t.prototype;
  h.m = function() {
    if (B(this))
      return -x(this).m();
    let d = 0, a = 1;
    for (let c = 0;c < this.g.length; c++) {
      const f = this.i(c);
      d += (f >= 0 ? f : 4294967296 + f) * a;
      a *= 4294967296;
    }
    return d;
  };
  h.toString = function(d) {
    d = d || 10;
    if (d < 2 || 36 < d)
      throw Error("radix out of range: " + d);
    if (C(this))
      return "0";
    if (B(this))
      return "-" + x(this).toString(d);
    const a = v(Math.pow(d, 6));
    var c = this;
    let f = "";
    for (;; ) {
      const e = D(c, a).g;
      c = F(c, e.j(a));
      let g = ((c.g.length > 0 ? c.g[0] : c.h) >>> 0).toString(d);
      c = e;
      if (C(c))
        return g + f;
      for (;g.length < 6; )
        g = "0" + g;
      f = g + f;
    }
  };
  h.i = function(d) {
    return d < 0 ? 0 : d < this.g.length ? this.g[d] : this.h;
  };
  function C(d) {
    if (d.h != 0)
      return false;
    for (let a = 0;a < d.g.length; a++)
      if (d.g[a] != 0)
        return false;
    return true;
  }
  function B(d) {
    return d.h == -1;
  }
  h.l = function(d) {
    d = F(this, d);
    return B(d) ? -1 : C(d) ? 0 : 1;
  };
  function x(d) {
    const a = d.g.length, c = [];
    for (let f = 0;f < a; f++)
      c[f] = ~d.g[f];
    return new t(c, ~d.h).add(z);
  }
  h.abs = function() {
    return B(this) ? x(this) : this;
  };
  h.add = function(d) {
    const a = Math.max(this.g.length, d.g.length), c = [];
    let f = 0;
    for (let e = 0;e <= a; e++) {
      let g = f + (this.i(e) & 65535) + (d.i(e) & 65535), b = (g >>> 16) + (this.i(e) >>> 16) + (d.i(e) >>> 16);
      f = b >>> 16;
      g &= 65535;
      b &= 65535;
      c[e] = b << 16 | g;
    }
    return new t(c, c[c.length - 1] & -2147483648 ? -1 : 0);
  };
  function F(d, a) {
    return d.add(x(a));
  }
  h.j = function(d) {
    if (C(this) || C(d))
      return w;
    if (B(this))
      return B(d) ? x(this).j(x(d)) : x(x(this).j(d));
    if (B(d))
      return x(this.j(x(d)));
    if (this.l(A) < 0 && d.l(A) < 0)
      return v(this.m() * d.m());
    const a = this.g.length + d.g.length, c = [];
    for (var f = 0;f < 2 * a; f++)
      c[f] = 0;
    for (f = 0;f < this.g.length; f++)
      for (let e = 0;e < d.g.length; e++) {
        const g = this.i(f) >>> 16, b = this.i(f) & 65535, r = d.i(e) >>> 16, E = d.i(e) & 65535;
        c[2 * f + 2 * e] += b * E;
        G(c, 2 * f + 2 * e);
        c[2 * f + 2 * e + 1] += g * E;
        G(c, 2 * f + 2 * e + 1);
        c[2 * f + 2 * e + 1] += b * r;
        G(c, 2 * f + 2 * e + 1);
        c[2 * f + 2 * e + 2] += g * r;
        G(c, 2 * f + 2 * e + 2);
      }
    for (d = 0;d < a; d++)
      c[d] = c[2 * d + 1] << 16 | c[2 * d];
    for (d = a;d < 2 * a; d++)
      c[d] = 0;
    return new t(c, 0);
  };
  function G(d, a) {
    for (;(d[a] & 65535) != d[a]; )
      d[a + 1] += d[a] >>> 16, d[a] &= 65535, a++;
  }
  function H(d, a) {
    this.g = d;
    this.h = a;
  }
  function D(d, a) {
    if (C(a))
      throw Error("division by zero");
    if (C(d))
      return new H(w, w);
    if (B(d))
      return a = D(x(d), a), new H(x(a.g), x(a.h));
    if (B(a))
      return a = D(d, x(a)), new H(x(a.g), a.h);
    if (d.g.length > 30) {
      if (B(d) || B(a))
        throw Error("slowDivide_ only works with positive integers.");
      for (var c = z, f = a;f.l(d) <= 0; )
        c = I(c), f = I(f);
      var e = J(c, 1), g = J(f, 1);
      f = J(f, 2);
      for (c = J(c, 2);!C(f); ) {
        var b = g.add(f);
        b.l(d) <= 0 && (e = e.add(c), g = b);
        f = J(f, 1);
        c = J(c, 1);
      }
      a = F(d, e.j(a));
      return new H(e, a);
    }
    for (e = w;d.l(a) >= 0; ) {
      c = Math.max(1, Math.floor(d.m() / a.m()));
      f = Math.ceil(Math.log(c) / Math.LN2);
      f = f <= 48 ? 1 : Math.pow(2, f - 48);
      g = v(c);
      for (b = g.j(a);B(b) || b.l(d) > 0; )
        c -= f, g = v(c), b = g.j(a);
      C(g) && (g = z);
      e = e.add(g);
      d = F(d, b);
    }
    return new H(e, d);
  }
  h.B = function(d) {
    return D(this, d).h;
  };
  h.and = function(d) {
    const a = Math.max(this.g.length, d.g.length), c = [];
    for (let f = 0;f < a; f++)
      c[f] = this.i(f) & d.i(f);
    return new t(c, this.h & d.h);
  };
  h.or = function(d) {
    const a = Math.max(this.g.length, d.g.length), c = [];
    for (let f = 0;f < a; f++)
      c[f] = this.i(f) | d.i(f);
    return new t(c, this.h | d.h);
  };
  h.xor = function(d) {
    const a = Math.max(this.g.length, d.g.length), c = [];
    for (let f = 0;f < a; f++)
      c[f] = this.i(f) ^ d.i(f);
    return new t(c, this.h ^ d.h);
  };
  function I(d) {
    const a = d.g.length + 1, c = [];
    for (let f = 0;f < a; f++)
      c[f] = d.i(f) << 1 | d.i(f - 1) >>> 31;
    return new t(c, d.h);
  }
  function J(d, a) {
    const c = a >> 5;
    a %= 32;
    const f = d.g.length - c, e = [];
    for (let g = 0;g < f; g++)
      e[g] = a > 0 ? d.i(g + c) >>> a | d.i(g + c + 1) << 32 - a : d.i(g + c);
    return new t(e, d.h);
  }
  m.prototype.digest = m.prototype.A;
  m.prototype.reset = m.prototype.u;
  m.prototype.update = m.prototype.v;
  Md5 = bloom_blob_es2018.Md5 = m;
  t.prototype.add = t.prototype.add;
  t.prototype.multiply = t.prototype.j;
  t.prototype.modulo = t.prototype.B;
  t.prototype.compare = t.prototype.l;
  t.prototype.toNumber = t.prototype.m;
  t.prototype.toString = t.prototype.toString;
  t.prototype.getBits = t.prototype.i;
  t.fromNumber = v;
  t.fromString = y;
  Integer = bloom_blob_es2018.Integer = t;
}).apply(typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

// node_modules/@firebase/webchannel-wrapper/dist/webchannel-blob/esm/webchannel_blob_es2018.js
var commonjsGlobal2 = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var webchannel_blob_es2018 = {};
var XhrIo;
var FetchXmlHttpFactory;
var WebChannel;
var EventType;
var ErrorCode;
var Stat;
var Event;
var getStatEventTarget;
var createWebChannelTransport;
(function() {
  var h, aa = Object.defineProperty;
  function ba(a) {
    a = [typeof globalThis == "object" && globalThis, a, typeof window == "object" && window, typeof self == "object" && self, typeof commonjsGlobal2 == "object" && commonjsGlobal2];
    for (var b = 0;b < a.length; ++b) {
      var c = a[b];
      if (c && c.Math == Math)
        return c;
    }
    throw Error("Cannot find global object");
  }
  var ca = ba(this);
  function da(a, b) {
    if (b)
      a: {
        var c = ca;
        a = a.split(".");
        for (var d = 0;d < a.length - 1; d++) {
          var e = a[d];
          if (!(e in c))
            break a;
          c = c[e];
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d && b != null && aa(c, a, { configurable: true, writable: true, value: b });
      }
  }
  da("Symbol.dispose", function(a) {
    return a ? a : Symbol("Symbol.dispose");
  });
  da("Array.prototype.values", function(a) {
    return a ? a : function() {
      return this[Symbol.iterator]();
    };
  });
  da("Object.entries", function(a) {
    return a ? a : function(b) {
      var c = [], d;
      for (d in b)
        Object.prototype.hasOwnProperty.call(b, d) && c.push([d, b[d]]);
      return c;
    };
  });
  var ea = ea || {}, l = this || self;
  function n(a) {
    var b = typeof a;
    return b == "object" && a != null || b == "function";
  }
  function fa(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }
  function p(a, b, c) {
    p = fa;
    return p.apply(null, arguments);
  }
  function ha(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function() {
      var d = c.slice();
      d.push.apply(d, arguments);
      return a.apply(this, d);
    };
  }
  function t(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.Z = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    a.Ob = function(d, e, f) {
      for (var g = Array(arguments.length - 2), k = 2;k < arguments.length; k++)
        g[k - 2] = arguments[k];
      return b.prototype[e].apply(d, g);
    };
  }
  var ia = typeof AsyncContext !== "undefined" && typeof AsyncContext.Snapshot === "function" ? (a) => a && AsyncContext.Snapshot.wrap(a) : (a) => a;
  function ja(a) {
    const b = a.length;
    if (b > 0) {
      const c = Array(b);
      for (let d = 0;d < b; d++)
        c[d] = a[d];
      return c;
    }
    return [];
  }
  function ka(a, b) {
    for (let d = 1;d < arguments.length; d++) {
      const e = arguments[d];
      var c = typeof e;
      c = c != "object" ? c : e ? Array.isArray(e) ? "array" : c : "null";
      if (c == "array" || c == "object" && typeof e.length == "number") {
        c = a.length || 0;
        const f = e.length || 0;
        a.length = c + f;
        for (let g = 0;g < f; g++)
          a[c + g] = e[g];
      } else
        a.push(e);
    }
  }

  class la {
    constructor(a, b) {
      this.i = a;
      this.j = b;
      this.h = 0;
      this.g = null;
    }
    get() {
      let a;
      this.h > 0 ? (this.h--, a = this.g, this.g = a.next, a.next = null) : a = this.i();
      return a;
    }
  }
  function ma(a) {
    l.setTimeout(() => {
      throw a;
    }, 0);
  }
  function na() {
    var a = oa;
    let b = null;
    a.g && (b = a.g, a.g = a.g.next, a.g || (a.h = null), b.next = null);
    return b;
  }

  class pa {
    constructor() {
      this.h = this.g = null;
    }
    add(a, b) {
      const c = qa.get();
      c.set(a, b);
      this.h ? this.h.next = c : this.g = c;
      this.h = c;
    }
  }
  var qa = new la(() => new ra, (a) => a.reset());

  class ra {
    constructor() {
      this.next = this.g = this.h = null;
    }
    set(a, b) {
      this.h = a;
      this.g = b;
      this.next = null;
    }
    reset() {
      this.next = this.g = this.h = null;
    }
  }
  let u, v = false, oa = new pa, ta = () => {
    const a = Promise.resolve(undefined);
    u = () => {
      a.then(sa);
    };
  };
  function sa() {
    for (var a;a = na(); ) {
      try {
        a.h.call(a.g);
      } catch (c) {
        ma(c);
      }
      var b = qa;
      b.j(a);
      b.h < 100 && (b.h++, a.next = b.g, b.g = a);
    }
    v = false;
  }
  function w() {
    this.u = this.u;
    this.C = this.C;
  }
  w.prototype.u = false;
  w.prototype.dispose = function() {
    this.u || (this.u = true, this.N());
  };
  w.prototype[Symbol.dispose] = function() {
    this.dispose();
  };
  w.prototype.N = function() {
    if (this.C)
      for (;this.C.length; )
        this.C.shift()();
  };
  function x(a, b) {
    this.type = a;
    this.g = this.target = b;
    this.defaultPrevented = false;
  }
  x.prototype.h = function() {
    this.defaultPrevented = true;
  };
  var ua = function() {
    if (!l.addEventListener || !Object.defineProperty)
      return false;
    var a = false, b = Object.defineProperty({}, "passive", { get: function() {
      a = true;
    } });
    try {
      const c = () => {};
      l.addEventListener("test", c, b);
      l.removeEventListener("test", c, b);
    } catch (c) {}
    return a;
  }();
  function y(a) {
    return /^[\s\xa0]*$/.test(a);
  }
  function z(a, b) {
    x.call(this, a ? a.type : "");
    this.relatedTarget = this.g = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
    this.key = "";
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = false;
    this.state = null;
    this.pointerId = 0;
    this.pointerType = "";
    this.i = null;
    a && this.init(a, b);
  }
  t(z, x);
  z.prototype.init = function(a, b) {
    const c = this.type = a.type, d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
    this.target = a.target || a.srcElement;
    this.g = b;
    b = a.relatedTarget;
    b || (c == "mouseover" ? b = a.fromElement : c == "mouseout" && (b = a.toElement));
    this.relatedTarget = b;
    d ? (this.clientX = d.clientX !== undefined ? d.clientX : d.pageX, this.clientY = d.clientY !== undefined ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.clientX = a.clientX !== undefined ? a.clientX : a.pageX, this.clientY = a.clientY !== undefined ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
    this.button = a.button;
    this.key = a.key || "";
    this.ctrlKey = a.ctrlKey;
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.pointerId = a.pointerId || 0;
    this.pointerType = a.pointerType;
    this.state = a.state;
    this.i = a;
    a.defaultPrevented && z.Z.h.call(this);
  };
  z.prototype.h = function() {
    z.Z.h.call(this);
    const a = this.i;
    a.preventDefault ? a.preventDefault() : a.returnValue = false;
  };
  var B = "closure_listenable_" + (Math.random() * 1e6 | 0);
  var va = 0;
  function wa(a, b, c, d, e) {
    this.listener = a;
    this.proxy = null;
    this.src = b;
    this.type = c;
    this.capture = !!d;
    this.ha = e;
    this.key = ++va;
    this.da = this.fa = false;
  }
  function xa(a) {
    a.da = true;
    a.listener = null;
    a.proxy = null;
    a.src = null;
    a.ha = null;
  }
  function ya(a, b, c) {
    for (const d in a)
      b.call(c, a[d], d, a);
  }
  function Aa(a, b) {
    for (const c in a)
      b.call(undefined, a[c], c, a);
  }
  function Ba(a) {
    const b = {};
    for (const c in a)
      b[c] = a[c];
    return b;
  }
  const Ca = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
  function Da(a, b) {
    let c, d;
    for (let e = 1;e < arguments.length; e++) {
      d = arguments[e];
      for (c in d)
        a[c] = d[c];
      for (let f = 0;f < Ca.length; f++)
        c = Ca[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    }
  }
  function Ea(a) {
    this.src = a;
    this.g = {};
    this.h = 0;
  }
  Ea.prototype.add = function(a, b, c, d, e) {
    const f = a.toString();
    a = this.g[f];
    a || (a = this.g[f] = [], this.h++);
    const g = Fa(a, b, d, e);
    g > -1 ? (b = a[g], c || (b.fa = false)) : (b = new wa(b, this.src, f, !!d, e), b.fa = c, a.push(b));
    return b;
  };
  function Ga(a, b) {
    const c = b.type;
    if (c in a.g) {
      var d = a.g[c], e = Array.prototype.indexOf.call(d, b, undefined), f;
      (f = e >= 0) && Array.prototype.splice.call(d, e, 1);
      f && (xa(b), a.g[c].length == 0 && (delete a.g[c], a.h--));
    }
  }
  function Fa(a, b, c, d) {
    for (let e = 0;e < a.length; ++e) {
      const f = a[e];
      if (!f.da && f.listener == b && f.capture == !!c && f.ha == d)
        return e;
    }
    return -1;
  }
  var Ha = "closure_lm_" + (Math.random() * 1e6 | 0), Ia = {};
  function Ka(a, b, c, d, e) {
    if (d && d.once)
      return La(a, b, c, d, e);
    if (Array.isArray(b)) {
      for (let f = 0;f < b.length; f++)
        Ka(a, b[f], c, d, e);
      return null;
    }
    c = Ma(c);
    return a && a[B] ? a.J(b, c, n(d) ? !!d.capture : !!d, e) : Na(a, b, c, false, d, e);
  }
  function Na(a, b, c, d, e, f) {
    if (!b)
      throw Error("Invalid event type");
    const g = n(e) ? !!e.capture : !!e;
    let k = Oa(a);
    k || (a[Ha] = k = new Ea(a));
    c = k.add(b, c, d, g, f);
    if (c.proxy)
      return c;
    d = Pa();
    c.proxy = d;
    d.src = a;
    d.listener = c;
    if (a.addEventListener)
      ua || (e = g), e === undefined && (e = false), a.addEventListener(b.toString(), d, e);
    else if (a.attachEvent)
      a.attachEvent(Qa(b.toString()), d);
    else if (a.addListener && a.removeListener)
      a.addListener(d);
    else
      throw Error("addEventListener and attachEvent are unavailable.");
    return c;
  }
  function Pa() {
    function a(c) {
      return b.call(a.src, a.listener, c);
    }
    const b = Ra;
    return a;
  }
  function La(a, b, c, d, e) {
    if (Array.isArray(b)) {
      for (let f = 0;f < b.length; f++)
        La(a, b[f], c, d, e);
      return null;
    }
    c = Ma(c);
    return a && a[B] ? a.K(b, c, n(d) ? !!d.capture : !!d, e) : Na(a, b, c, true, d, e);
  }
  function Sa(a, b, c, d, e) {
    if (Array.isArray(b))
      for (var f = 0;f < b.length; f++)
        Sa(a, b[f], c, d, e);
    else
      (d = n(d) ? !!d.capture : !!d, c = Ma(c), a && a[B]) ? (a = a.i, f = String(b).toString(), (f in a.g) && (b = a.g[f], c = Fa(b, c, d, e), c > -1 && (xa(b[c]), Array.prototype.splice.call(b, c, 1), b.length == 0 && (delete a.g[f], a.h--)))) : a && (a = Oa(a)) && (b = a.g[b.toString()], a = -1, b && (a = Fa(b, c, d, e)), (c = a > -1 ? b[a] : null) && Ta(c));
  }
  function Ta(a) {
    if (typeof a !== "number" && a && !a.da) {
      var b = a.src;
      if (b && b[B])
        Ga(b.i, a);
      else {
        var { type: c, proxy: d } = a;
        b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(Qa(c), d) : b.addListener && b.removeListener && b.removeListener(d);
        (c = Oa(b)) ? (Ga(c, a), c.h == 0 && (c.src = null, b[Ha] = null)) : xa(a);
      }
    }
  }
  function Qa(a) {
    return a in Ia ? Ia[a] : Ia[a] = "on" + a;
  }
  function Ra(a, b) {
    if (a.da)
      a = true;
    else {
      b = new z(b, this);
      const c = a.listener, d = a.ha || a.src;
      a.fa && Ta(a);
      a = c.call(d, b);
    }
    return a;
  }
  function Oa(a) {
    a = a[Ha];
    return a instanceof Ea ? a : null;
  }
  var Ua = "__closure_events_fn_" + (Math.random() * 1e9 >>> 0);
  function Ma(a) {
    if (typeof a === "function")
      return a;
    a[Ua] || (a[Ua] = function(b) {
      return a.handleEvent(b);
    });
    return a[Ua];
  }
  function C() {
    w.call(this);
    this.i = new Ea(this);
    this.M = this;
    this.G = null;
  }
  t(C, w);
  C.prototype[B] = true;
  C.prototype.removeEventListener = function(a, b, c, d) {
    Sa(this, a, b, c, d);
  };
  function D(a, b) {
    var c, d = a.G;
    if (d)
      for (c = [];d; d = d.G)
        c.push(d);
    a = a.M;
    d = b.type || b;
    if (typeof b === "string")
      b = new x(b, a);
    else if (b instanceof x)
      b.target = b.target || a;
    else {
      var e = b;
      b = new x(d, a);
      Da(b, e);
    }
    e = true;
    let f, g;
    if (c)
      for (g = c.length - 1;g >= 0; g--)
        f = b.g = c[g], e = Va(f, d, true, b) && e;
    f = b.g = a;
    e = Va(f, d, true, b) && e;
    e = Va(f, d, false, b) && e;
    if (c)
      for (g = 0;g < c.length; g++)
        f = b.g = c[g], e = Va(f, d, false, b) && e;
  }
  C.prototype.N = function() {
    C.Z.N.call(this);
    if (this.i) {
      var a = this.i;
      for (const c in a.g) {
        const d = a.g[c];
        for (let e = 0;e < d.length; e++)
          xa(d[e]);
        delete a.g[c];
        a.h--;
      }
    }
    this.G = null;
  };
  C.prototype.J = function(a, b, c, d) {
    return this.i.add(String(a), b, false, c, d);
  };
  C.prototype.K = function(a, b, c, d) {
    return this.i.add(String(a), b, true, c, d);
  };
  function Va(a, b, c, d) {
    b = a.i.g[String(b)];
    if (!b)
      return true;
    b = b.concat();
    let e = true;
    for (let f = 0;f < b.length; ++f) {
      const g = b[f];
      if (g && !g.da && g.capture == c) {
        const k = g.listener, q = g.ha || g.src;
        g.fa && Ga(a.i, g);
        e = k.call(q, d) !== false && e;
      }
    }
    return e && !d.defaultPrevented;
  }
  function Wa(a, b) {
    if (typeof a !== "function")
      if (a && typeof a.handleEvent == "function")
        a = p(a.handleEvent, a);
      else
        throw Error("Invalid listener argument");
    return Number(b) > 2147483647 ? -1 : l.setTimeout(a, b || 0);
  }
  function Xa(a) {
    a.g = Wa(() => {
      a.g = null;
      a.i && (a.i = false, Xa(a));
    }, a.l);
    const b = a.h;
    a.h = null;
    a.m.apply(null, b);
  }

  class Ya extends w {
    constructor(a, b) {
      super();
      this.m = a;
      this.l = b;
      this.h = null;
      this.i = false;
      this.g = null;
    }
    j(a) {
      this.h = arguments;
      this.g ? this.i = true : Xa(this);
    }
    N() {
      super.N();
      this.g && (l.clearTimeout(this.g), this.g = null, this.i = false, this.h = null);
    }
  }
  function E(a) {
    w.call(this);
    this.h = a;
    this.g = {};
  }
  t(E, w);
  var Za = [];
  function $a(a) {
    ya(a.g, function(b, c) {
      this.g.hasOwnProperty(c) && Ta(b);
    }, a);
    a.g = {};
  }
  E.prototype.N = function() {
    E.Z.N.call(this);
    $a(this);
  };
  E.prototype.handleEvent = function() {
    throw Error("EventHandler.handleEvent not implemented");
  };
  var ab = l.JSON.stringify;
  var cb = l.JSON.parse;
  var db = class {
    stringify(a) {
      return l.JSON.stringify(a, undefined);
    }
    parse(a) {
      return l.JSON.parse(a, undefined);
    }
  };
  function eb() {}
  function fb() {}
  var H = { OPEN: "a", hb: "b", ERROR: "c", tb: "d" };
  function gb() {
    x.call(this, "d");
  }
  t(gb, x);
  function hb() {
    x.call(this, "c");
  }
  t(hb, x);
  var I = {}, ib = null;
  function jb() {
    return ib = ib || new C;
  }
  I.Ia = "serverreachability";
  function kb(a) {
    x.call(this, I.Ia, a);
  }
  t(kb, x);
  function lb(a) {
    const b = jb();
    D(b, new kb(b));
  }
  I.STAT_EVENT = "statevent";
  function mb(a, b) {
    x.call(this, I.STAT_EVENT, a);
    this.stat = b;
  }
  t(mb, x);
  function J(a) {
    const b = jb();
    D(b, new mb(b, a));
  }
  I.Ja = "timingevent";
  function nb(a, b) {
    x.call(this, I.Ja, a);
    this.size = b;
  }
  t(nb, x);
  function ob(a, b) {
    if (typeof a !== "function")
      throw Error("Fn must not be null and must be a function");
    return l.setTimeout(function() {
      a();
    }, b);
  }
  function pb() {
    this.g = true;
  }
  pb.prototype.ua = function() {
    this.g = false;
  };
  function qb(a, b, c, d, e, f) {
    a.info(function() {
      if (a.g)
        if (f) {
          var g = "";
          var k = f.split("&");
          for (let m = 0;m < k.length; m++) {
            var q = k[m].split("=");
            if (q.length > 1) {
              const r = q[0];
              q = q[1];
              const A = r.split("_");
              g = A.length >= 2 && A[1] == "type" ? g + (r + "=" + q + "&") : g + (r + "=redacted&");
            }
          }
        } else
          g = null;
      else
        g = f;
      return "XMLHTTP REQ (" + d + ") [attempt " + e + "]: " + b + `
` + c + `
` + g;
    });
  }
  function rb(a, b, c, d, e, f, g) {
    a.info(function() {
      return "XMLHTTP RESP (" + d + ") [ attempt " + e + "]: " + b + `
` + c + `
` + f + " " + g;
    });
  }
  function K(a, b, c, d) {
    a.info(function() {
      return "XMLHTTP TEXT (" + b + "): " + sb(a, c) + (d ? " " + d : "");
    });
  }
  function tb(a, b) {
    a.info(function() {
      return "TIMEOUT: " + b;
    });
  }
  pb.prototype.info = function() {};
  function sb(a, b) {
    if (!a.g)
      return b;
    if (!b)
      return null;
    try {
      const f = JSON.parse(b);
      if (f) {
        for (a = 0;a < f.length; a++)
          if (Array.isArray(f[a])) {
            var c = f[a];
            if (!(c.length < 2)) {
              var d = c[1];
              if (Array.isArray(d) && !(d.length < 1)) {
                var e = d[0];
                if (e != "noop" && e != "stop" && e != "close")
                  for (let g = 1;g < d.length; g++)
                    d[g] = "";
              }
            }
          }
      }
      return ab(f);
    } catch (f) {
      return b;
    }
  }
  var ub = { NO_ERROR: 0, cb: 1, qb: 2, pb: 3, kb: 4, ob: 5, rb: 6, Ga: 7, TIMEOUT: 8, ub: 9 };
  var vb = { ib: "complete", Fb: "success", ERROR: "error", Ga: "abort", xb: "ready", yb: "readystatechange", TIMEOUT: "timeout", sb: "incrementaldata", wb: "progress", lb: "downloadprogress", Nb: "uploadprogress" };
  var wb;
  function xb() {}
  t(xb, eb);
  xb.prototype.g = function() {
    return new XMLHttpRequest;
  };
  wb = new xb;
  function L(a) {
    return encodeURIComponent(String(a));
  }
  function yb(a) {
    var b = 1;
    a = a.split(":");
    const c = [];
    for (;b > 0 && a.length; )
      c.push(a.shift()), b--;
    a.length && c.push(a.join(":"));
    return c;
  }
  function N(a, b, c, d) {
    this.j = a;
    this.i = b;
    this.l = c;
    this.S = d || 1;
    this.V = new E(this);
    this.H = 45000;
    this.J = null;
    this.o = false;
    this.u = this.B = this.A = this.M = this.F = this.T = this.D = null;
    this.G = [];
    this.g = null;
    this.C = 0;
    this.m = this.v = null;
    this.X = -1;
    this.K = false;
    this.P = 0;
    this.O = null;
    this.W = this.L = this.U = this.R = false;
    this.h = new zb;
  }
  function zb() {
    this.i = null;
    this.g = "";
    this.h = false;
  }
  var Ab = {}, Bb = {};
  function Cb(a, b, c) {
    a.M = 1;
    a.A = Db(O(b));
    a.u = c;
    a.R = true;
    Eb(a, null);
  }
  function Eb(a, b) {
    a.F = Date.now();
    Fb(a);
    a.B = O(a.A);
    var { B: c, S: d } = a;
    Array.isArray(d) || (d = [String(d)]);
    Gb(c.i, "t", d);
    a.C = 0;
    c = a.j.L;
    a.h = new zb;
    a.g = Hb(a.j, c ? b : null, !a.u);
    a.P > 0 && (a.O = new Ya(p(a.Y, a, a.g), a.P));
    b = a.V;
    c = a.g;
    d = a.ba;
    var e = "readystatechange";
    Array.isArray(e) || (e && (Za[0] = e.toString()), e = Za);
    for (let f = 0;f < e.length; f++) {
      const g = Ka(c, e[f], d || b.handleEvent, false, b.h || b);
      if (!g)
        break;
      b.g[g.key] = g;
    }
    b = a.J ? Ba(a.J) : {};
    a.u ? (a.v || (a.v = "POST"), b["Content-Type"] = "application/x-www-form-urlencoded", a.g.ea(a.B, a.v, a.u, b)) : (a.v = "GET", a.g.ea(a.B, a.v, null, b));
    lb();
    qb(a.i, a.v, a.B, a.l, a.S, a.u);
  }
  N.prototype.ba = function(a) {
    a = a.target;
    const b = this.O;
    b && P(a) == 3 ? b.j() : this.Y(a);
  };
  N.prototype.Y = function(a) {
    try {
      if (a == this.g)
        a: {
          const k = P(this.g), q = this.g.ya(), m = this.g.ca();
          if (!(k < 3) && (k != 3 || this.g && (this.h.h || this.g.la() || Ib(this.g)))) {
            this.K || k != 4 || q == 7 || (q == 8 || m <= 0 ? lb(3) : lb(2));
            Jb(this);
            var b = this.g.ca();
            this.X = b;
            var c = Kb(this);
            this.o = b == 200;
            rb(this.i, this.v, this.B, this.l, this.S, k, b);
            if (this.o) {
              if (this.U && !this.L) {
                b: {
                  if (this.g) {
                    var d, e = this.g;
                    if ((d = e.g ? e.g.getResponseHeader("X-HTTP-Initial-Response") : null) && !y(d)) {
                      var f = d;
                      break b;
                    }
                  }
                  f = null;
                }
                if (a = f)
                  K(this.i, this.l, a, "Initial handshake response via X-HTTP-Initial-Response"), this.L = true, Lb(this, a);
                else {
                  this.o = false;
                  this.m = 3;
                  J(12);
                  Q(this);
                  Mb(this);
                  break a;
                }
              }
              if (this.R) {
                a = true;
                let r;
                for (;!this.K && this.C < c.length; )
                  if (r = Nb(this, c), r == Bb) {
                    k == 4 && (this.m = 4, J(14), a = false);
                    K(this.i, this.l, null, "[Incomplete Response]");
                    break;
                  } else if (r == Ab) {
                    this.m = 4;
                    J(15);
                    K(this.i, this.l, c, "[Invalid Chunk]");
                    a = false;
                    break;
                  } else
                    K(this.i, this.l, r, null), Lb(this, r);
                Ob(this) && this.C != 0 && (this.h.g = this.h.g.slice(this.C), this.C = 0);
                k != 4 || c.length != 0 || this.h.h || (this.m = 1, J(16), a = false);
                this.o = this.o && a;
                if (!a)
                  K(this.i, this.l, c, "[Invalid Chunked Response]"), Q(this), Mb(this);
                else if (c.length > 0 && !this.W) {
                  this.W = true;
                  var g = this.j;
                  g.g == this && g.aa && !g.P && (g.j.info("Great, no buffering proxy detected. Bytes received: " + c.length), Pb(g), g.P = true, J(11));
                }
              } else
                K(this.i, this.l, c, null), Lb(this, c);
              k == 4 && Q(this);
              this.o && !this.K && (k == 4 ? Qb(this.j, this) : (this.o = false, Fb(this)));
            } else
              Rb(this.g), b == 400 && c.indexOf("Unknown SID") > 0 ? (this.m = 3, J(12)) : (this.m = 0, J(13)), Q(this), Mb(this);
          }
        }
    } catch (k) {} finally {}
  };
  function Kb(a) {
    if (!Ob(a))
      return a.g.la();
    const b = Ib(a.g);
    if (b === "")
      return "";
    let c = "";
    const d = b.length, e = P(a.g) == 4;
    if (!a.h.i) {
      if (typeof TextDecoder === "undefined")
        return Q(a), Mb(a), "";
      a.h.i = new l.TextDecoder;
    }
    for (let f = 0;f < d; f++)
      a.h.h = true, c += a.h.i.decode(b[f], { stream: !(e && f == d - 1) });
    b.length = 0;
    a.h.g += c;
    a.C = 0;
    return a.h.g;
  }
  function Ob(a) {
    return a.g ? a.v == "GET" && a.M != 2 && a.j.Aa : false;
  }
  function Nb(a, b) {
    var c = a.C, d = b.indexOf(`
`, c);
    if (d == -1)
      return Bb;
    c = Number(b.substring(c, d));
    if (isNaN(c))
      return Ab;
    d += 1;
    if (d + c > b.length)
      return Bb;
    b = b.slice(d, d + c);
    a.C = d + c;
    return b;
  }
  N.prototype.cancel = function() {
    this.K = true;
    Q(this);
  };
  function Fb(a) {
    a.T = Date.now() + a.H;
    Sb(a, a.H);
  }
  function Sb(a, b) {
    if (a.D != null)
      throw Error("WatchDog timer not null");
    a.D = ob(p(a.aa, a), b);
  }
  function Jb(a) {
    a.D && (l.clearTimeout(a.D), a.D = null);
  }
  N.prototype.aa = function() {
    this.D = null;
    const a = Date.now();
    a - this.T >= 0 ? (tb(this.i, this.B), this.M != 2 && (lb(), J(17)), Q(this), this.m = 2, Mb(this)) : Sb(this, this.T - a);
  };
  function Mb(a) {
    a.j.I == 0 || a.K || Qb(a.j, a);
  }
  function Q(a) {
    Jb(a);
    var b = a.O;
    b && typeof b.dispose == "function" && b.dispose();
    a.O = null;
    $a(a.V);
    a.g && (b = a.g, a.g = null, b.abort(), b.dispose());
  }
  function Lb(a, b) {
    try {
      var c = a.j;
      if (c.I != 0 && (c.g == a || Tb(c.h, a))) {
        if (!a.L && Tb(c.h, a) && c.I == 3) {
          try {
            var d = c.Ba.g.parse(b);
          } catch (m) {
            d = null;
          }
          if (Array.isArray(d) && d.length == 3) {
            var e = d;
            if (e[0] == 0)
              a: {
                if (!c.v) {
                  if (c.g)
                    if (c.g.F + 3000 < a.F)
                      Ub(c), Vb(c);
                    else
                      break a;
                  Wb(c);
                  J(18);
                }
              }
            else
              c.xa = e[1], 0 < c.xa - c.K && e[2] < 37500 && c.F && c.A == 0 && !c.C && (c.C = ob(p(c.Va, c), 6000));
            Xb(c.h) <= 1 && c.ta && (c.ta = undefined);
          } else
            R(c, 11);
        } else if ((a.L || c.g == a) && Ub(c), !y(b))
          for (e = c.Ba.g.parse(b), b = 0;b < e.length; b++) {
            let m = e[b];
            const r = m[0];
            if (!(r <= c.K))
              if (c.K = r, m = m[1], c.I == 2)
                if (m[0] == "c") {
                  c.M = m[1];
                  c.ba = m[2];
                  const A = m[3];
                  A != null && (c.ka = A, c.j.info("VER=" + c.ka));
                  const M = m[4];
                  M != null && (c.za = M, c.j.info("SVER=" + c.za));
                  const F = m[5];
                  F != null && typeof F === "number" && F > 0 && (d = 1.5 * F, c.O = d, c.j.info("backChannelRequestTimeoutMs_=" + d));
                  d = c;
                  const G = a.g;
                  if (G) {
                    const za = G.g ? G.g.getResponseHeader("X-Client-Wire-Protocol") : null;
                    if (za) {
                      var f = d.h;
                      f.g || za.indexOf("spdy") == -1 && za.indexOf("quic") == -1 && za.indexOf("h2") == -1 || (f.j = f.l, f.g = new Set, f.h && (Yb(f, f.h), f.h = null));
                    }
                    if (d.G) {
                      const bb = G.g ? G.g.getResponseHeader("X-HTTP-Session-Id") : null;
                      bb && (d.wa = bb, S(d.J, d.G, bb));
                    }
                  }
                  c.I = 3;
                  c.l && c.l.ra();
                  c.aa && (c.T = Date.now() - a.F, c.j.info("Handshake RTT: " + c.T + "ms"));
                  d = c;
                  var g = a;
                  d.na = Zb(d, d.L ? d.ba : null, d.W);
                  if (g.L) {
                    $b(d.h, g);
                    var k = g, q = d.O;
                    q && (k.H = q);
                    k.D && (Jb(k), Fb(k));
                    d.g = g;
                  } else
                    ac(d);
                  c.i.length > 0 && bc(c);
                } else
                  m[0] != "stop" && m[0] != "close" || R(c, 7);
              else
                c.I == 3 && (m[0] == "stop" || m[0] == "close" ? m[0] == "stop" ? R(c, 7) : cc(c) : m[0] != "noop" && c.l && c.l.qa(m), c.A = 0);
          }
      }
      lb(4);
    } catch (m) {}
  }
  var dc = class {
    constructor(a, b) {
      this.g = a;
      this.map = b;
    }
  };
  function ec(a) {
    this.l = a || 10;
    l.PerformanceNavigationTiming ? (a = l.performance.getEntriesByType("navigation"), a = a.length > 0 && (a[0].nextHopProtocol == "hq" || a[0].nextHopProtocol == "h2")) : a = !!(l.chrome && l.chrome.loadTimes && l.chrome.loadTimes() && l.chrome.loadTimes().wasFetchedViaSpdy);
    this.j = a ? this.l : 1;
    this.g = null;
    this.j > 1 && (this.g = new Set);
    this.h = null;
    this.i = [];
  }
  function fc(a) {
    return a.h ? true : a.g ? a.g.size >= a.j : false;
  }
  function Xb(a) {
    return a.h ? 1 : a.g ? a.g.size : 0;
  }
  function Tb(a, b) {
    return a.h ? a.h == b : a.g ? a.g.has(b) : false;
  }
  function Yb(a, b) {
    a.g ? a.g.add(b) : a.h = b;
  }
  function $b(a, b) {
    a.h && a.h == b ? a.h = null : a.g && a.g.has(b) && a.g.delete(b);
  }
  ec.prototype.cancel = function() {
    this.i = hc(this);
    if (this.h)
      this.h.cancel(), this.h = null;
    else if (this.g && this.g.size !== 0) {
      for (const a of this.g.values())
        a.cancel();
      this.g.clear();
    }
  };
  function hc(a) {
    if (a.h != null)
      return a.i.concat(a.h.G);
    if (a.g != null && a.g.size !== 0) {
      let b = a.i;
      for (const c of a.g.values())
        b = b.concat(c.G);
      return b;
    }
    return ja(a.i);
  }
  var ic = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");
  function jc(a, b) {
    if (a) {
      a = a.split("&");
      for (let c = 0;c < a.length; c++) {
        const d = a[c].indexOf("=");
        let e, f = null;
        d >= 0 ? (e = a[c].substring(0, d), f = a[c].substring(d + 1)) : e = a[c];
        b(e, f ? decodeURIComponent(f.replace(/\+/g, " ")) : "");
      }
    }
  }
  function T(a) {
    this.g = this.o = this.j = "";
    this.u = null;
    this.m = this.h = "";
    this.l = false;
    let b;
    a instanceof T ? (this.l = a.l, kc(this, a.j), this.o = a.o, this.g = a.g, lc(this, a.u), this.h = a.h, mc(this, nc(a.i)), this.m = a.m) : a && (b = String(a).match(ic)) ? (this.l = false, kc(this, b[1] || "", true), this.o = oc(b[2] || ""), this.g = oc(b[3] || "", true), lc(this, b[4]), this.h = oc(b[5] || "", true), mc(this, b[6] || "", true), this.m = oc(b[7] || "")) : (this.l = false, this.i = new pc(null, this.l));
  }
  T.prototype.toString = function() {
    const a = [];
    var b = this.j;
    b && a.push(qc(b, rc, true), ":");
    var c = this.g;
    if (c || b == "file")
      a.push("//"), (b = this.o) && a.push(qc(b, rc, true), "@"), a.push(L(c).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.u, c != null && a.push(":", String(c));
    if (c = this.h)
      this.g && c.charAt(0) != "/" && a.push("/"), a.push(qc(c, c.charAt(0) == "/" ? sc : tc, true));
    (c = this.i.toString()) && a.push("?", c);
    (c = this.m) && a.push("#", qc(c, uc));
    return a.join("");
  };
  T.prototype.resolve = function(a) {
    const b = O(this);
    let c = !!a.j;
    c ? kc(b, a.j) : c = !!a.o;
    c ? b.o = a.o : c = !!a.g;
    c ? b.g = a.g : c = a.u != null;
    var d = a.h;
    if (c)
      lc(b, a.u);
    else if (c = !!a.h) {
      if (d.charAt(0) != "/")
        if (this.g && !this.h)
          d = "/" + d;
        else {
          var e = b.h.lastIndexOf("/");
          e != -1 && (d = b.h.slice(0, e + 1) + d);
        }
      e = d;
      if (e == ".." || e == ".")
        d = "";
      else if (e.indexOf("./") != -1 || e.indexOf("/.") != -1) {
        d = e.lastIndexOf("/", 0) == 0;
        e = e.split("/");
        const f = [];
        for (let g = 0;g < e.length; ) {
          const k = e[g++];
          k == "." ? d && g == e.length && f.push("") : k == ".." ? ((f.length > 1 || f.length == 1 && f[0] != "") && f.pop(), d && g == e.length && f.push("")) : (f.push(k), d = true);
        }
        d = f.join("/");
      } else
        d = e;
    }
    c ? b.h = d : c = a.i.toString() !== "";
    c ? mc(b, nc(a.i)) : c = !!a.m;
    c && (b.m = a.m);
    return b;
  };
  function O(a) {
    return new T(a);
  }
  function kc(a, b, c) {
    a.j = c ? oc(b, true) : b;
    a.j && (a.j = a.j.replace(/:$/, ""));
  }
  function lc(a, b) {
    if (b) {
      b = Number(b);
      if (isNaN(b) || b < 0)
        throw Error("Bad port number " + b);
      a.u = b;
    } else
      a.u = null;
  }
  function mc(a, b, c) {
    b instanceof pc ? (a.i = b, vc(a.i, a.l)) : (c || (b = qc(b, wc)), a.i = new pc(b, a.l));
  }
  function S(a, b, c) {
    a.i.set(b, c);
  }
  function Db(a) {
    S(a, "zx", Math.floor(Math.random() * 2147483648).toString(36) + Math.abs(Math.floor(Math.random() * 2147483648) ^ Date.now()).toString(36));
    return a;
  }
  function oc(a, b) {
    return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : "";
  }
  function qc(a, b, c) {
    return typeof a === "string" ? (a = encodeURI(a).replace(b, xc), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null;
  }
  function xc(a) {
    a = a.charCodeAt(0);
    return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16);
  }
  var rc = /[#\/\?@]/g, tc = /[#\?:]/g, sc = /[#\?]/g, wc = /[#\?@]/g, uc = /#/g;
  function pc(a, b) {
    this.h = this.g = null;
    this.i = a || null;
    this.j = !!b;
  }
  function U(a) {
    a.g || (a.g = new Map, a.h = 0, a.i && jc(a.i, function(b, c) {
      a.add(decodeURIComponent(b.replace(/\+/g, " ")), c);
    }));
  }
  h = pc.prototype;
  h.add = function(a, b) {
    U(this);
    this.i = null;
    a = V(this, a);
    let c = this.g.get(a);
    c || this.g.set(a, c = []);
    c.push(b);
    this.h += 1;
    return this;
  };
  function yc(a, b) {
    U(a);
    b = V(a, b);
    a.g.has(b) && (a.i = null, a.h -= a.g.get(b).length, a.g.delete(b));
  }
  function zc(a, b) {
    U(a);
    b = V(a, b);
    return a.g.has(b);
  }
  h.forEach = function(a, b) {
    U(this);
    this.g.forEach(function(c, d) {
      c.forEach(function(e) {
        a.call(b, e, d, this);
      }, this);
    }, this);
  };
  function Ac(a, b) {
    U(a);
    let c = [];
    if (typeof b === "string")
      zc(a, b) && (c = c.concat(a.g.get(V(a, b))));
    else
      for (a = Array.from(a.g.values()), b = 0;b < a.length; b++)
        c = c.concat(a[b]);
    return c;
  }
  h.set = function(a, b) {
    U(this);
    this.i = null;
    a = V(this, a);
    zc(this, a) && (this.h -= this.g.get(a).length);
    this.g.set(a, [b]);
    this.h += 1;
    return this;
  };
  h.get = function(a, b) {
    if (!a)
      return b;
    a = Ac(this, a);
    return a.length > 0 ? String(a[0]) : b;
  };
  function Gb(a, b, c) {
    yc(a, b);
    c.length > 0 && (a.i = null, a.g.set(V(a, b), ja(c)), a.h += c.length);
  }
  h.toString = function() {
    if (this.i)
      return this.i;
    if (!this.g)
      return "";
    const a = [], b = Array.from(this.g.keys());
    for (let d = 0;d < b.length; d++) {
      var c = b[d];
      const e = L(c);
      c = Ac(this, c);
      for (let f = 0;f < c.length; f++) {
        let g = e;
        c[f] !== "" && (g += "=" + L(c[f]));
        a.push(g);
      }
    }
    return this.i = a.join("&");
  };
  function nc(a) {
    const b = new pc;
    b.i = a.i;
    a.g && (b.g = new Map(a.g), b.h = a.h);
    return b;
  }
  function V(a, b) {
    b = String(b);
    a.j && (b = b.toLowerCase());
    return b;
  }
  function vc(a, b) {
    b && !a.j && (U(a), a.i = null, a.g.forEach(function(c, d) {
      const e = d.toLowerCase();
      d != e && (yc(this, d), Gb(this, e, c));
    }, a));
    a.j = b;
  }
  function Bc(a, b) {
    const c = new pb;
    if (l.Image) {
      const d = new Image;
      d.onload = ha(W, c, "TestLoadImage: loaded", true, b, d);
      d.onerror = ha(W, c, "TestLoadImage: error", false, b, d);
      d.onabort = ha(W, c, "TestLoadImage: abort", false, b, d);
      d.ontimeout = ha(W, c, "TestLoadImage: timeout", false, b, d);
      l.setTimeout(function() {
        if (d.ontimeout)
          d.ontimeout();
      }, 1e4);
      d.src = a;
    } else
      b(false);
  }
  function Cc(a, b) {
    const c = new pb, d = new AbortController, e = setTimeout(() => {
      d.abort();
      W(c, "TestPingServer: timeout", false, b);
    }, 1e4);
    fetch(a, { signal: d.signal }).then((f) => {
      clearTimeout(e);
      f.ok ? W(c, "TestPingServer: ok", true, b) : W(c, "TestPingServer: server error", false, b);
    }).catch(() => {
      clearTimeout(e);
      W(c, "TestPingServer: error", false, b);
    });
  }
  function W(a, b, c, d, e) {
    try {
      e && (e.onload = null, e.onerror = null, e.onabort = null, e.ontimeout = null), d(c);
    } catch (f) {}
  }
  function Dc() {
    this.g = new db;
  }
  function Ec(a) {
    this.i = a.Sb || null;
    this.h = a.ab || false;
  }
  t(Ec, eb);
  Ec.prototype.g = function() {
    return new Fc(this.i, this.h);
  };
  function Fc(a, b) {
    C.call(this);
    this.H = a;
    this.o = b;
    this.m = undefined;
    this.status = this.readyState = 0;
    this.responseType = this.responseText = this.response = this.statusText = "";
    this.onreadystatechange = null;
    this.A = new Headers;
    this.h = null;
    this.F = "GET";
    this.D = "";
    this.g = false;
    this.B = this.j = this.l = null;
    this.v = new AbortController;
  }
  t(Fc, C);
  h = Fc.prototype;
  h.open = function(a, b) {
    if (this.readyState != 0)
      throw this.abort(), Error("Error reopening a connection");
    this.F = a;
    this.D = b;
    this.readyState = 1;
    Gc(this);
  };
  h.send = function(a) {
    if (this.readyState != 1)
      throw this.abort(), Error("need to call open() first. ");
    if (this.v.signal.aborted)
      throw this.abort(), Error("Request was aborted.");
    this.g = true;
    const b = { headers: this.A, method: this.F, credentials: this.m, cache: undefined, signal: this.v.signal };
    a && (b.body = a);
    (this.H || l).fetch(new Request(this.D, b)).then(this.Pa.bind(this), this.ga.bind(this));
  };
  h.abort = function() {
    this.response = this.responseText = "";
    this.A = new Headers;
    this.status = 0;
    this.v.abort();
    this.j && this.j.cancel("Request was aborted.").catch(() => {});
    this.readyState >= 1 && this.g && this.readyState != 4 && (this.g = false, Hc(this));
    this.readyState = 0;
  };
  h.Pa = function(a) {
    if (this.g && (this.l = a, this.h || (this.status = this.l.status, this.statusText = this.l.statusText, this.h = a.headers, this.readyState = 2, Gc(this)), this.g && (this.readyState = 3, Gc(this), this.g)))
      if (this.responseType === "arraybuffer")
        a.arrayBuffer().then(this.Na.bind(this), this.ga.bind(this));
      else if (typeof l.ReadableStream !== "undefined" && "body" in a) {
        this.j = a.body.getReader();
        if (this.o) {
          if (this.responseType)
            throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');
          this.response = [];
        } else
          this.response = this.responseText = "", this.B = new TextDecoder;
        Ic(this);
      } else
        a.text().then(this.Oa.bind(this), this.ga.bind(this));
  };
  function Ic(a) {
    a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a));
  }
  h.Ma = function(a) {
    if (this.g) {
      if (this.o && a.value)
        this.response.push(a.value);
      else if (!this.o) {
        var b = a.value ? a.value : new Uint8Array(0);
        if (b = this.B.decode(b, { stream: !a.done }))
          this.response = this.responseText += b;
      }
      a.done ? Hc(this) : Gc(this);
      this.readyState == 3 && Ic(this);
    }
  };
  h.Oa = function(a) {
    this.g && (this.response = this.responseText = a, Hc(this));
  };
  h.Na = function(a) {
    this.g && (this.response = a, Hc(this));
  };
  h.ga = function() {
    this.g && Hc(this);
  };
  function Hc(a) {
    a.readyState = 4;
    a.l = null;
    a.j = null;
    a.B = null;
    Gc(a);
  }
  h.setRequestHeader = function(a, b) {
    this.A.append(a, b);
  };
  h.getResponseHeader = function(a) {
    return this.h ? this.h.get(a.toLowerCase()) || "" : "";
  };
  h.getAllResponseHeaders = function() {
    if (!this.h)
      return "";
    const a = [], b = this.h.entries();
    for (var c = b.next();!c.done; )
      c = c.value, a.push(c[0] + ": " + c[1]), c = b.next();
    return a.join(`\r
`);
  };
  function Gc(a) {
    a.onreadystatechange && a.onreadystatechange.call(a);
  }
  Object.defineProperty(Fc.prototype, "withCredentials", { get: function() {
    return this.m === "include";
  }, set: function(a) {
    this.m = a ? "include" : "same-origin";
  } });
  function Jc(a) {
    let b = "";
    ya(a, function(c, d) {
      b += d;
      b += ":";
      b += c;
      b += `\r
`;
    });
    return b;
  }
  function Kc(a, b, c) {
    a: {
      for (d in c) {
        var d = false;
        break a;
      }
      d = true;
    }
    d || (c = Jc(c), typeof a === "string" ? c != null && L(c) : S(a, b, c));
  }
  function X(a) {
    C.call(this);
    this.headers = new Map;
    this.L = a || null;
    this.h = false;
    this.g = null;
    this.D = "";
    this.o = 0;
    this.l = "";
    this.j = this.B = this.v = this.A = false;
    this.m = null;
    this.F = "";
    this.H = false;
  }
  t(X, C);
  var Lc = /^https?$/i, Mc = ["POST", "PUT"];
  h = X.prototype;
  h.Fa = function(a) {
    this.H = a;
  };
  h.ea = function(a, b, c, d) {
    if (this.g)
      throw Error("[goog.net.XhrIo] Object is active with another request=" + this.D + "; newUri=" + a);
    b = b ? b.toUpperCase() : "GET";
    this.D = a;
    this.l = "";
    this.o = 0;
    this.A = false;
    this.h = true;
    this.g = this.L ? this.L.g() : wb.g();
    this.g.onreadystatechange = ia(p(this.Ca, this));
    try {
      this.B = true, this.g.open(b, String(a), true), this.B = false;
    } catch (f) {
      Nc(this, f);
      return;
    }
    a = c || "";
    c = new Map(this.headers);
    if (d)
      if (Object.getPrototypeOf(d) === Object.prototype)
        for (var e in d)
          c.set(e, d[e]);
      else if (typeof d.keys === "function" && typeof d.get === "function")
        for (const f of d.keys())
          c.set(f, d.get(f));
      else
        throw Error("Unknown input type for opt_headers: " + String(d));
    d = Array.from(c.keys()).find((f) => f.toLowerCase() == "content-type");
    e = l.FormData && a instanceof l.FormData;
    !(Array.prototype.indexOf.call(Mc, b, undefined) >= 0) || d || e || c.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
    for (const [f, g] of c)
      this.g.setRequestHeader(f, g);
    this.F && (this.g.responseType = this.F);
    "withCredentials" in this.g && this.g.withCredentials !== this.H && (this.g.withCredentials = this.H);
    try {
      this.m && (clearTimeout(this.m), this.m = null), this.v = true, this.g.send(a), this.v = false;
    } catch (f) {
      Nc(this, f);
    }
  };
  function Nc(a, b) {
    a.h = false;
    a.g && (a.j = true, a.g.abort(), a.j = false);
    a.l = b;
    a.o = 5;
    Oc(a);
    Pc(a);
  }
  function Oc(a) {
    a.A || (a.A = true, D(a, "complete"), D(a, "error"));
  }
  h.abort = function(a) {
    this.g && this.h && (this.h = false, this.j = true, this.g.abort(), this.j = false, this.o = a || 7, D(this, "complete"), D(this, "abort"), Pc(this));
  };
  h.N = function() {
    this.g && (this.h && (this.h = false, this.j = true, this.g.abort(), this.j = false), Pc(this, true));
    X.Z.N.call(this);
  };
  h.Ca = function() {
    this.u || (this.B || this.v || this.j ? Qc(this) : this.Xa());
  };
  h.Xa = function() {
    Qc(this);
  };
  function Qc(a) {
    if (a.h && typeof ea != "undefined") {
      if (a.v && P(a) == 4)
        setTimeout(a.Ca.bind(a), 0);
      else if (D(a, "readystatechange"), P(a) == 4) {
        a.h = false;
        try {
          const f = a.ca();
          a:
            switch (f) {
              case 200:
              case 201:
              case 202:
              case 204:
              case 206:
              case 304:
              case 1223:
                var b = true;
                break a;
              default:
                b = false;
            }
          var c;
          if (!(c = b)) {
            var d;
            if (d = f === 0) {
              let g = String(a.D).match(ic)[1] || null;
              !g && l.self && l.self.location && (g = l.self.location.protocol.slice(0, -1));
              d = !Lc.test(g ? g.toLowerCase() : "");
            }
            c = d;
          }
          if (c)
            D(a, "complete"), D(a, "success");
          else {
            a.o = 6;
            try {
              var e = P(a) > 2 ? a.g.statusText : "";
            } catch (g) {
              e = "";
            }
            a.l = e + " [" + a.ca() + "]";
            Oc(a);
          }
        } finally {
          Pc(a);
        }
      }
    }
  }
  function Pc(a, b) {
    if (a.g) {
      a.m && (clearTimeout(a.m), a.m = null);
      const c = a.g;
      a.g = null;
      b || D(a, "ready");
      try {
        c.onreadystatechange = null;
      } catch (d) {}
    }
  }
  h.isActive = function() {
    return !!this.g;
  };
  function P(a) {
    return a.g ? a.g.readyState : 0;
  }
  h.ca = function() {
    try {
      return P(this) > 2 ? this.g.status : -1;
    } catch (a) {
      return -1;
    }
  };
  h.la = function() {
    try {
      return this.g ? this.g.responseText : "";
    } catch (a) {
      return "";
    }
  };
  h.La = function(a) {
    if (this.g) {
      var b = this.g.responseText;
      a && b.indexOf(a) == 0 && (b = b.substring(a.length));
      return cb(b);
    }
  };
  function Ib(a) {
    try {
      if (!a.g)
        return null;
      if ("response" in a.g)
        return a.g.response;
      switch (a.F) {
        case "":
        case "text":
          return a.g.responseText;
        case "arraybuffer":
          if ("mozResponseArrayBuffer" in a.g)
            return a.g.mozResponseArrayBuffer;
      }
      return null;
    } catch (b) {
      return null;
    }
  }
  function Rb(a) {
    const b = {};
    a = (a.g && P(a) >= 2 ? a.g.getAllResponseHeaders() || "" : "").split(`\r
`);
    for (let d = 0;d < a.length; d++) {
      if (y(a[d]))
        continue;
      var c = yb(a[d]);
      const e = c[0];
      c = c[1];
      if (typeof c !== "string")
        continue;
      c = c.trim();
      const f = b[e] || [];
      b[e] = f;
      f.push(c);
    }
    Aa(b, function(d) {
      return d.join(", ");
    });
  }
  h.ya = function() {
    return this.o;
  };
  h.Ha = function() {
    return typeof this.l === "string" ? this.l : String(this.l);
  };
  function Rc(a, b, c) {
    return c && c.internalChannelParams ? c.internalChannelParams[a] || b : b;
  }
  function Sc(a) {
    this.za = 0;
    this.i = [];
    this.j = new pb;
    this.ba = this.na = this.J = this.W = this.g = this.wa = this.G = this.H = this.u = this.U = this.o = null;
    this.Ya = this.V = 0;
    this.Sa = Rc("failFast", false, a);
    this.F = this.C = this.v = this.m = this.l = null;
    this.X = true;
    this.xa = this.K = -1;
    this.Y = this.A = this.D = 0;
    this.Qa = Rc("baseRetryDelayMs", 5000, a);
    this.Za = Rc("retryDelaySeedMs", 1e4, a);
    this.Ta = Rc("forwardChannelMaxRetries", 2, a);
    this.va = Rc("forwardChannelRequestTimeoutMs", 20000, a);
    this.ma = a && a.xmlHttpFactory || undefined;
    this.Ua = a && a.Rb || undefined;
    this.Aa = a && a.useFetchStreams || false;
    this.O = undefined;
    this.L = a && a.supportsCrossDomainXhr || false;
    this.M = "";
    this.h = new ec(a && a.concurrentRequestLimit);
    this.Ba = new Dc;
    this.S = a && a.fastHandshake || false;
    this.R = a && a.encodeInitMessageHeaders || false;
    this.S && this.R && (this.R = false);
    this.Ra = a && a.Pb || false;
    a && a.ua && this.j.ua();
    a && a.forceLongPolling && (this.X = false);
    this.aa = !this.S && this.X && a && a.detectBufferingProxy || false;
    this.ia = undefined;
    a && a.longPollingTimeout && a.longPollingTimeout > 0 && (this.ia = a.longPollingTimeout);
    this.ta = undefined;
    this.T = 0;
    this.P = false;
    this.ja = this.B = null;
  }
  h = Sc.prototype;
  h.ka = 8;
  h.I = 1;
  h.connect = function(a, b, c, d) {
    J(0);
    this.W = a;
    this.H = b || {};
    c && d !== undefined && (this.H.OSID = c, this.H.OAID = d);
    this.F = this.X;
    this.J = Zb(this, null, this.W);
    bc(this);
  };
  function cc(a) {
    Tc(a);
    if (a.I == 3) {
      var b = a.V++, c = O(a.J);
      S(c, "SID", a.M);
      S(c, "RID", b);
      S(c, "TYPE", "terminate");
      Uc(a, c);
      b = new N(a, a.j, b);
      b.M = 2;
      b.A = Db(O(c));
      c = false;
      if (l.navigator && l.navigator.sendBeacon)
        try {
          c = l.navigator.sendBeacon(b.A.toString(), "");
        } catch (d) {}
      !c && l.Image && (new Image().src = b.A, c = true);
      c || (b.g = Hb(b.j, null), b.g.ea(b.A));
      b.F = Date.now();
      Fb(b);
    }
    Vc(a);
  }
  function Vb(a) {
    a.g && (Pb(a), a.g.cancel(), a.g = null);
  }
  function Tc(a) {
    Vb(a);
    a.v && (l.clearTimeout(a.v), a.v = null);
    Ub(a);
    a.h.cancel();
    a.m && (typeof a.m === "number" && l.clearTimeout(a.m), a.m = null);
  }
  function bc(a) {
    if (!fc(a.h) && !a.m) {
      a.m = true;
      var b = a.Ea;
      u || ta();
      v || (u(), v = true);
      oa.add(b, a);
      a.D = 0;
    }
  }
  function Wc(a, b) {
    if (Xb(a.h) >= a.h.j - (a.m ? 1 : 0))
      return false;
    if (a.m)
      return a.i = b.G.concat(a.i), true;
    if (a.I == 1 || a.I == 2 || a.D >= (a.Sa ? 0 : a.Ta))
      return false;
    a.m = ob(p(a.Ea, a, b), Xc(a, a.D));
    a.D++;
    return true;
  }
  h.Ea = function(a) {
    if (this.m)
      if (this.m = null, this.I == 1) {
        if (!a) {
          this.V = Math.floor(Math.random() * 1e5);
          a = this.V++;
          const e = new N(this, this.j, a);
          let f = this.o;
          this.U && (f ? (f = Ba(f), Da(f, this.U)) : f = this.U);
          this.u !== null || this.R || (e.J = f, f = null);
          if (this.S)
            a: {
              var b = 0;
              for (var c = 0;c < this.i.length; c++) {
                b: {
                  var d = this.i[c];
                  if ("__data__" in d.map && (d = d.map.__data__, typeof d === "string")) {
                    d = d.length;
                    break b;
                  }
                  d = undefined;
                }
                if (d === undefined)
                  break;
                b += d;
                if (b > 4096) {
                  b = c;
                  break a;
                }
                if (b === 4096 || c === this.i.length - 1) {
                  b = c + 1;
                  break a;
                }
              }
              b = 1000;
            }
          else
            b = 1000;
          b = Yc(this, e, b);
          c = O(this.J);
          S(c, "RID", a);
          S(c, "CVER", 22);
          this.G && S(c, "X-HTTP-Session-Id", this.G);
          Uc(this, c);
          f && (this.R ? b = "headers=" + L(Jc(f)) + "&" + b : this.u && Kc(c, this.u, f));
          Yb(this.h, e);
          this.Ra && S(c, "TYPE", "init");
          this.S ? (S(c, "$req", b), S(c, "SID", "null"), e.U = true, Cb(e, c, null)) : Cb(e, c, b);
          this.I = 2;
        }
      } else
        this.I == 3 && (a ? Zc(this, a) : this.i.length == 0 || fc(this.h) || Zc(this));
  };
  function Zc(a, b) {
    var c;
    b ? c = b.l : c = a.V++;
    const d = O(a.J);
    S(d, "SID", a.M);
    S(d, "RID", c);
    S(d, "AID", a.K);
    Uc(a, d);
    a.u && a.o && Kc(d, a.u, a.o);
    c = new N(a, a.j, c, a.D + 1);
    a.u === null && (c.J = a.o);
    b && (a.i = b.G.concat(a.i));
    b = Yc(a, c, 1000);
    c.H = Math.round(a.va * 0.5) + Math.round(a.va * 0.5 * Math.random());
    Yb(a.h, c);
    Cb(c, d, b);
  }
  function Uc(a, b) {
    a.H && ya(a.H, function(c, d) {
      S(b, d, c);
    });
    a.l && ya({}, function(c, d) {
      S(b, d, c);
    });
  }
  function Yc(a, b, c) {
    c = Math.min(a.i.length, c);
    const d = a.l ? p(a.l.Ka, a.l, a) : null;
    a: {
      var e = a.i;
      let k = -1;
      for (;; ) {
        const q = ["count=" + c];
        k == -1 ? c > 0 ? (k = e[0].g, q.push("ofs=" + k)) : k = 0 : q.push("ofs=" + k);
        let m = true;
        for (let r = 0;r < c; r++) {
          var f = e[r].g;
          const A = e[r].map;
          f -= k;
          if (f < 0)
            k = Math.max(0, e[r].g - 100), m = false;
          else
            try {
              f = "req" + f + "_" || "";
              try {
                var g = A instanceof Map ? A : Object.entries(A);
                for (const [M, F] of g) {
                  let G = F;
                  n(F) && (G = ab(F));
                  q.push(f + M + "=" + encodeURIComponent(G));
                }
              } catch (M) {
                throw q.push(f + "type=" + encodeURIComponent("_badmap")), M;
              }
            } catch (M) {
              d && d(A);
            }
        }
        if (m) {
          g = q.join("&");
          break a;
        }
      }
      g = undefined;
    }
    a = a.i.splice(0, c);
    b.G = a;
    return g;
  }
  function ac(a) {
    if (!a.g && !a.v) {
      a.Y = 1;
      var b = a.Da;
      u || ta();
      v || (u(), v = true);
      oa.add(b, a);
      a.A = 0;
    }
  }
  function Wb(a) {
    if (a.g || a.v || a.A >= 3)
      return false;
    a.Y++;
    a.v = ob(p(a.Da, a), Xc(a, a.A));
    a.A++;
    return true;
  }
  h.Da = function() {
    this.v = null;
    $c(this);
    if (this.aa && !(this.P || this.g == null || this.T <= 0)) {
      var a = 4 * this.T;
      this.j.info("BP detection timer enabled: " + a);
      this.B = ob(p(this.Wa, this), a);
    }
  };
  h.Wa = function() {
    this.B && (this.B = null, this.j.info("BP detection timeout reached."), this.j.info("Buffering proxy detected and switch to long-polling!"), this.F = false, this.P = true, J(10), Vb(this), $c(this));
  };
  function Pb(a) {
    a.B != null && (l.clearTimeout(a.B), a.B = null);
  }
  function $c(a) {
    a.g = new N(a, a.j, "rpc", a.Y);
    a.u === null && (a.g.J = a.o);
    a.g.P = 0;
    var b = O(a.na);
    S(b, "RID", "rpc");
    S(b, "SID", a.M);
    S(b, "AID", a.K);
    S(b, "CI", a.F ? "0" : "1");
    !a.F && a.ia && S(b, "TO", a.ia);
    S(b, "TYPE", "xmlhttp");
    Uc(a, b);
    a.u && a.o && Kc(b, a.u, a.o);
    a.O && (a.g.H = a.O);
    var c = a.g;
    a = a.ba;
    c.M = 1;
    c.A = Db(O(b));
    c.u = null;
    c.R = true;
    Eb(c, a);
  }
  h.Va = function() {
    this.C != null && (this.C = null, Vb(this), Wb(this), J(19));
  };
  function Ub(a) {
    a.C != null && (l.clearTimeout(a.C), a.C = null);
  }
  function Qb(a, b) {
    var c = null;
    if (a.g == b) {
      Ub(a);
      Pb(a);
      a.g = null;
      var d = 2;
    } else if (Tb(a.h, b))
      c = b.G, $b(a.h, b), d = 1;
    else
      return;
    if (a.I != 0) {
      if (b.o)
        if (d == 1) {
          c = b.u ? b.u.length : 0;
          b = Date.now() - b.F;
          var e = a.D;
          d = jb();
          D(d, new nb(d, c));
          bc(a);
        } else
          ac(a);
      else if (e = b.m, e == 3 || e == 0 && b.X > 0 || !(d == 1 && Wc(a, b) || d == 2 && Wb(a)))
        switch (c && c.length > 0 && (b = a.h, b.i = b.i.concat(c)), e) {
          case 1:
            R(a, 5);
            break;
          case 4:
            R(a, 10);
            break;
          case 3:
            R(a, 6);
            break;
          default:
            R(a, 2);
        }
    }
  }
  function Xc(a, b) {
    let c = a.Qa + Math.floor(Math.random() * a.Za);
    a.isActive() || (c *= 2);
    return c * b;
  }
  function R(a, b) {
    a.j.info("Error code " + b);
    if (b == 2) {
      var c = p(a.bb, a), d = a.Ua;
      const e = !d;
      d = new T(d || "//www.google.com/images/cleardot.gif");
      l.location && l.location.protocol == "http" || kc(d, "https");
      Db(d);
      e ? Bc(d.toString(), c) : Cc(d.toString(), c);
    } else
      J(2);
    a.I = 0;
    a.l && a.l.pa(b);
    Vc(a);
    Tc(a);
  }
  h.bb = function(a) {
    a ? (this.j.info("Successfully pinged google.com"), J(2)) : (this.j.info("Failed to ping google.com"), J(1));
  };
  function Vc(a) {
    a.I = 0;
    a.ja = [];
    if (a.l) {
      const b = hc(a.h);
      if (b.length != 0 || a.i.length != 0)
        ka(a.ja, b), ka(a.ja, a.i), a.h.i.length = 0, ja(a.i), a.i.length = 0;
      a.l.oa();
    }
  }
  function Zb(a, b, c) {
    var d = c instanceof T ? O(c) : new T(c);
    if (d.g != "")
      b && (d.g = b + "." + d.g), lc(d, d.u);
    else {
      var e = l.location;
      d = e.protocol;
      b = b ? b + "." + e.hostname : e.hostname;
      e = +e.port;
      const f = new T(null);
      d && kc(f, d);
      b && (f.g = b);
      e && lc(f, e);
      c && (f.h = c);
      d = f;
    }
    c = a.G;
    b = a.wa;
    c && b && S(d, c, b);
    S(d, "VER", a.ka);
    Uc(a, d);
    return d;
  }
  function Hb(a, b, c) {
    if (b && !a.L)
      throw Error("Can't create secondary domain capable XhrIo object.");
    b = a.Aa && !a.ma ? new X(new Ec({ ab: c })) : new X(a.ma);
    b.Fa(a.L);
    return b;
  }
  h.isActive = function() {
    return !!this.l && this.l.isActive(this);
  };
  function ad() {}
  h = ad.prototype;
  h.ra = function() {};
  h.qa = function() {};
  h.pa = function() {};
  h.oa = function() {};
  h.isActive = function() {
    return true;
  };
  h.Ka = function() {};
  function bd() {}
  bd.prototype.g = function(a, b) {
    return new Y(a, b);
  };
  function Y(a, b) {
    C.call(this);
    this.g = new Sc(b);
    this.l = a;
    this.h = b && b.messageUrlParams || null;
    a = b && b.messageHeaders || null;
    b && b.clientProtocolHeaderRequired && (a ? a["X-Client-Protocol"] = "webchannel" : a = { "X-Client-Protocol": "webchannel" });
    this.g.o = a;
    a = b && b.initMessageHeaders || null;
    b && b.messageContentType && (a ? a["X-WebChannel-Content-Type"] = b.messageContentType : a = { "X-WebChannel-Content-Type": b.messageContentType });
    b && b.sa && (a ? a["X-WebChannel-Client-Profile"] = b.sa : a = { "X-WebChannel-Client-Profile": b.sa });
    this.g.U = a;
    (a = b && b.Qb) && !y(a) && (this.g.u = a);
    this.A = b && b.supportsCrossDomainXhr || false;
    this.v = b && b.sendRawJson || false;
    (b = b && b.httpSessionIdParam) && !y(b) && (this.g.G = b, a = this.h, a !== null && (b in a) && (a = this.h, (b in a) && delete a[b]));
    this.j = new Z(this);
  }
  t(Y, C);
  Y.prototype.m = function() {
    this.g.l = this.j;
    this.A && (this.g.L = true);
    this.g.connect(this.l, this.h || undefined);
  };
  Y.prototype.close = function() {
    cc(this.g);
  };
  Y.prototype.o = function(a) {
    var b = this.g;
    if (typeof a === "string") {
      var c = {};
      c.__data__ = a;
      a = c;
    } else
      this.v && (c = {}, c.__data__ = ab(a), a = c);
    b.i.push(new dc(b.Ya++, a));
    b.I == 3 && bc(b);
  };
  Y.prototype.N = function() {
    this.g.l = null;
    delete this.j;
    cc(this.g);
    delete this.g;
    Y.Z.N.call(this);
  };
  function cd(a) {
    gb.call(this);
    a.__headers__ && (this.headers = a.__headers__, this.statusCode = a.__status__, delete a.__headers__, delete a.__status__);
    var b = a.__sm__;
    if (b) {
      a: {
        for (const c in b) {
          a = c;
          break a;
        }
        a = undefined;
      }
      if (this.i = a)
        a = this.i, b = b !== null && a in b ? b[a] : undefined;
      this.data = b;
    } else
      this.data = a;
  }
  t(cd, gb);
  function dd() {
    hb.call(this);
    this.status = 1;
  }
  t(dd, hb);
  function Z(a) {
    this.g = a;
  }
  t(Z, ad);
  Z.prototype.ra = function() {
    D(this.g, "a");
  };
  Z.prototype.qa = function(a) {
    D(this.g, new cd(a));
  };
  Z.prototype.pa = function(a) {
    D(this.g, new dd);
  };
  Z.prototype.oa = function() {
    D(this.g, "b");
  };
  bd.prototype.createWebChannel = bd.prototype.g;
  Y.prototype.send = Y.prototype.o;
  Y.prototype.open = Y.prototype.m;
  Y.prototype.close = Y.prototype.close;
  createWebChannelTransport = webchannel_blob_es2018.createWebChannelTransport = function() {
    return new bd;
  };
  getStatEventTarget = webchannel_blob_es2018.getStatEventTarget = function() {
    return jb();
  };
  Event = webchannel_blob_es2018.Event = I;
  Stat = webchannel_blob_es2018.Stat = { jb: 0, mb: 1, nb: 2, Hb: 3, Mb: 4, Jb: 5, Kb: 6, Ib: 7, Gb: 8, Lb: 9, PROXY: 10, NOPROXY: 11, Eb: 12, Ab: 13, Bb: 14, zb: 15, Cb: 16, Db: 17, fb: 18, eb: 19, gb: 20 };
  ub.NO_ERROR = 0;
  ub.TIMEOUT = 8;
  ub.HTTP_ERROR = 6;
  ErrorCode = webchannel_blob_es2018.ErrorCode = ub;
  vb.COMPLETE = "complete";
  EventType = webchannel_blob_es2018.EventType = vb;
  fb.EventType = H;
  H.OPEN = "a";
  H.CLOSE = "b";
  H.ERROR = "c";
  H.MESSAGE = "d";
  C.prototype.listen = C.prototype.J;
  WebChannel = webchannel_blob_es2018.WebChannel = fb;
  FetchXmlHttpFactory = webchannel_blob_es2018.FetchXmlHttpFactory = Ec;
  X.prototype.listenOnce = X.prototype.K;
  X.prototype.getLastError = X.prototype.Ha;
  X.prototype.getLastErrorCode = X.prototype.ya;
  X.prototype.getStatus = X.prototype.ca;
  X.prototype.getResponseJson = X.prototype.La;
  X.prototype.getResponseText = X.prototype.la;
  X.prototype.send = X.prototype.ea;
  X.prototype.setWithCredentials = X.prototype.Fa;
  XhrIo = webchannel_blob_es2018.XhrIo = X;
}).apply(typeof commonjsGlobal2 !== "undefined" ? commonjsGlobal2 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

// node_modules/@firebase/firestore/dist/index.esm.js
var F = "@firebase/firestore";
var M = "4.9.3";

class User {
  constructor(e) {
    this.uid = e;
  }
  isAuthenticated() {
    return this.uid != null;
  }
  toKey() {
    return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
  }
  isEqual(e) {
    return e.uid === this.uid;
  }
}
User.UNAUTHENTICATED = new User(null), User.GOOGLE_CREDENTIALS = new User("google-credentials-uid"), User.FIRST_PARTY = new User("first-party-uid"), User.MOCK_USER = new User("mock-user");
var x = "12.7.0";
var O = new Logger("@firebase/firestore");
function __PRIVATE_getLogLevel() {
  return O.logLevel;
}
function __PRIVATE_logDebug(e, ...t) {
  if (O.logLevel <= LogLevel.DEBUG) {
    const n = t.map(__PRIVATE_argToString);
    O.debug(`Firestore (${x}): ${e}`, ...n);
  }
}
function __PRIVATE_logError(e, ...t) {
  if (O.logLevel <= LogLevel.ERROR) {
    const n = t.map(__PRIVATE_argToString);
    O.error(`Firestore (${x}): ${e}`, ...n);
  }
}
function __PRIVATE_logWarn(e, ...t) {
  if (O.logLevel <= LogLevel.WARN) {
    const n = t.map(__PRIVATE_argToString);
    O.warn(`Firestore (${x}): ${e}`, ...n);
  }
}
function __PRIVATE_argToString(e) {
  if (typeof e == "string")
    return e;
  try {
    return function __PRIVATE_formatJSON(e2) {
      return JSON.stringify(e2);
    }(e);
  } catch (t) {
    return e;
  }
}
function fail(e, t, n) {
  let r = "Unexpected state";
  typeof t == "string" ? r = t : n = t, __PRIVATE__fail(e, r, n);
}
function __PRIVATE__fail(e, t, n) {
  let r = `FIRESTORE (${x}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;
  if (n !== undefined)
    try {
      r += " CONTEXT: " + JSON.stringify(n);
    } catch (e2) {
      r += " CONTEXT: " + n;
    }
  throw __PRIVATE_logError(r), new Error(r);
}
function __PRIVATE_hardAssert(e, t, n, r) {
  let i = "Unexpected state";
  typeof n == "string" ? i = n : r = n, e || __PRIVATE__fail(t, i, r);
}
function __PRIVATE_debugCast(e, t) {
  return e;
}
var N = {
  OK: "ok",
  CANCELLED: "cancelled",
  UNKNOWN: "unknown",
  INVALID_ARGUMENT: "invalid-argument",
  DEADLINE_EXCEEDED: "deadline-exceeded",
  NOT_FOUND: "not-found",
  ALREADY_EXISTS: "already-exists",
  PERMISSION_DENIED: "permission-denied",
  UNAUTHENTICATED: "unauthenticated",
  RESOURCE_EXHAUSTED: "resource-exhausted",
  FAILED_PRECONDITION: "failed-precondition",
  ABORTED: "aborted",
  OUT_OF_RANGE: "out-of-range",
  UNIMPLEMENTED: "unimplemented",
  INTERNAL: "internal",
  UNAVAILABLE: "unavailable",
  DATA_LOSS: "data-loss"
};

class FirestoreError extends FirebaseError {
  constructor(e, t) {
    super(e, t), this.code = e, this.message = t, this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`;
  }
}

class __PRIVATE_Deferred {
  constructor() {
    this.promise = new Promise((e, t) => {
      this.resolve = e, this.reject = t;
    });
  }
}

class __PRIVATE_OAuthToken {
  constructor(e, t) {
    this.user = t, this.type = "OAuth", this.headers = new Map, this.headers.set("Authorization", `Bearer ${e}`);
  }
}

class __PRIVATE_EmptyAuthCredentialsProvider {
  getToken() {
    return Promise.resolve(null);
  }
  invalidateToken() {}
  start(e, t) {
    e.enqueueRetryable(() => t(User.UNAUTHENTICATED));
  }
  shutdown() {}
}

class __PRIVATE_EmulatorAuthCredentialsProvider {
  constructor(e) {
    this.token = e, this.changeListener = null;
  }
  getToken() {
    return Promise.resolve(this.token);
  }
  invalidateToken() {}
  start(e, t) {
    this.changeListener = t, e.enqueueRetryable(() => t(this.token.user));
  }
  shutdown() {
    this.changeListener = null;
  }
}

class __PRIVATE_FirebaseAuthCredentialsProvider {
  constructor(e) {
    this.t = e, this.currentUser = User.UNAUTHENTICATED, this.i = 0, this.forceRefresh = false, this.auth = null;
  }
  start(e, t) {
    __PRIVATE_hardAssert(this.o === undefined, 42304);
    let n = this.i;
    const __PRIVATE_guardedChangeListener = (e2) => this.i !== n ? (n = this.i, t(e2)) : Promise.resolve();
    let r = new __PRIVATE_Deferred;
    this.o = () => {
      this.i++, this.currentUser = this.u(), r.resolve(), r = new __PRIVATE_Deferred, e.enqueueRetryable(() => __PRIVATE_guardedChangeListener(this.currentUser));
    };
    const __PRIVATE_awaitNextToken = () => {
      const t2 = r;
      e.enqueueRetryable(async () => {
        await t2.promise, await __PRIVATE_guardedChangeListener(this.currentUser);
      });
    }, __PRIVATE_registerAuth = (e2) => {
      __PRIVATE_logDebug("FirebaseAuthCredentialsProvider", "Auth detected"), this.auth = e2, this.o && (this.auth.addAuthTokenListener(this.o), __PRIVATE_awaitNextToken());
    };
    this.t.onInit((e2) => __PRIVATE_registerAuth(e2)), setTimeout(() => {
      if (!this.auth) {
        const e2 = this.t.getImmediate({
          optional: true
        });
        e2 ? __PRIVATE_registerAuth(e2) : (__PRIVATE_logDebug("FirebaseAuthCredentialsProvider", "Auth not yet detected"), r.resolve(), r = new __PRIVATE_Deferred);
      }
    }, 0), __PRIVATE_awaitNextToken();
  }
  getToken() {
    const e = this.i, t = this.forceRefresh;
    return this.forceRefresh = false, this.auth ? this.auth.getToken(t).then((t2) => this.i !== e ? (__PRIVATE_logDebug("FirebaseAuthCredentialsProvider", "getToken aborted due to token change."), this.getToken()) : t2 ? (__PRIVATE_hardAssert(typeof t2.accessToken == "string", 31837, {
      l: t2
    }), new __PRIVATE_OAuthToken(t2.accessToken, this.currentUser)) : null) : Promise.resolve(null);
  }
  invalidateToken() {
    this.forceRefresh = true;
  }
  shutdown() {
    this.auth && this.o && this.auth.removeAuthTokenListener(this.o), this.o = undefined;
  }
  u() {
    const e = this.auth && this.auth.getUid();
    return __PRIVATE_hardAssert(e === null || typeof e == "string", 2055, {
      h: e
    }), new User(e);
  }
}

class __PRIVATE_FirstPartyToken {
  constructor(e, t, n) {
    this.P = e, this.T = t, this.I = n, this.type = "FirstParty", this.user = User.FIRST_PARTY, this.A = new Map;
  }
  R() {
    return this.I ? this.I() : null;
  }
  get headers() {
    this.A.set("X-Goog-AuthUser", this.P);
    const e = this.R();
    return e && this.A.set("Authorization", e), this.T && this.A.set("X-Goog-Iam-Authorization-Token", this.T), this.A;
  }
}

class __PRIVATE_FirstPartyAuthCredentialsProvider {
  constructor(e, t, n) {
    this.P = e, this.T = t, this.I = n;
  }
  getToken() {
    return Promise.resolve(new __PRIVATE_FirstPartyToken(this.P, this.T, this.I));
  }
  start(e, t) {
    e.enqueueRetryable(() => t(User.FIRST_PARTY));
  }
  shutdown() {}
  invalidateToken() {}
}

class AppCheckToken {
  constructor(e) {
    this.value = e, this.type = "AppCheck", this.headers = new Map, e && e.length > 0 && this.headers.set("x-firebase-appcheck", this.value);
  }
}

class __PRIVATE_FirebaseAppCheckTokenProvider {
  constructor(t, n) {
    this.V = n, this.forceRefresh = false, this.appCheck = null, this.m = null, this.p = null, _isFirebaseServerApp(t) && t.settings.appCheckToken && (this.p = t.settings.appCheckToken);
  }
  start(e, t) {
    __PRIVATE_hardAssert(this.o === undefined, 3512);
    const onTokenChanged = (e2) => {
      e2.error != null && __PRIVATE_logDebug("FirebaseAppCheckTokenProvider", `Error getting App Check token; using placeholder token instead. Error: ${e2.error.message}`);
      const n = e2.token !== this.m;
      return this.m = e2.token, __PRIVATE_logDebug("FirebaseAppCheckTokenProvider", `Received ${n ? "new" : "existing"} token.`), n ? t(e2.token) : Promise.resolve();
    };
    this.o = (t2) => {
      e.enqueueRetryable(() => onTokenChanged(t2));
    };
    const __PRIVATE_registerAppCheck = (e2) => {
      __PRIVATE_logDebug("FirebaseAppCheckTokenProvider", "AppCheck detected"), this.appCheck = e2, this.o && this.appCheck.addTokenListener(this.o);
    };
    this.V.onInit((e2) => __PRIVATE_registerAppCheck(e2)), setTimeout(() => {
      if (!this.appCheck) {
        const e2 = this.V.getImmediate({
          optional: true
        });
        e2 ? __PRIVATE_registerAppCheck(e2) : __PRIVATE_logDebug("FirebaseAppCheckTokenProvider", "AppCheck not yet detected");
      }
    }, 0);
  }
  getToken() {
    if (this.p)
      return Promise.resolve(new AppCheckToken(this.p));
    const e = this.forceRefresh;
    return this.forceRefresh = false, this.appCheck ? this.appCheck.getToken(e).then((e2) => e2 ? (__PRIVATE_hardAssert(typeof e2.token == "string", 44558, {
      tokenResult: e2
    }), this.m = e2.token, new AppCheckToken(e2.token)) : null) : Promise.resolve(null);
  }
  invalidateToken() {
    this.forceRefresh = true;
  }
  shutdown() {
    this.appCheck && this.o && this.appCheck.removeTokenListener(this.o), this.o = undefined;
  }
}
function __PRIVATE_randomBytes(e) {
  const t = typeof self != "undefined" && (self.crypto || self.msCrypto), n = new Uint8Array(e);
  if (t && typeof t.getRandomValues == "function")
    t.getRandomValues(n);
  else
    for (let t2 = 0;t2 < e; t2++)
      n[t2] = Math.floor(256 * Math.random());
  return n;
}

class __PRIVATE_AutoId {
  static newId() {
    const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", t = 62 * Math.floor(256 / 62);
    let n = "";
    for (;n.length < 20; ) {
      const r = __PRIVATE_randomBytes(40);
      for (let i = 0;i < r.length; ++i)
        n.length < 20 && r[i] < t && (n += e.charAt(r[i] % 62));
    }
    return n;
  }
}
function __PRIVATE_primitiveComparator(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function __PRIVATE_compareUtf8Strings(e, t) {
  const n = Math.min(e.length, t.length);
  for (let r = 0;r < n; r++) {
    const n2 = e.charAt(r), i = t.charAt(r);
    if (n2 !== i)
      return __PRIVATE_isSurrogate(n2) === __PRIVATE_isSurrogate(i) ? __PRIVATE_primitiveComparator(n2, i) : __PRIVATE_isSurrogate(n2) ? 1 : -1;
  }
  return __PRIVATE_primitiveComparator(e.length, t.length);
}
var B = 55296;
var L = 57343;
function __PRIVATE_isSurrogate(e) {
  const t = e.charCodeAt(0);
  return t >= B && t <= L;
}
function __PRIVATE_arrayEquals(e, t, n) {
  return e.length === t.length && e.every((e2, r) => n(e2, t[r]));
}
var k = "__name__";

class BasePath {
  constructor(e, t, n) {
    t === undefined ? t = 0 : t > e.length && fail(637, {
      offset: t,
      range: e.length
    }), n === undefined ? n = e.length - t : n > e.length - t && fail(1746, {
      length: n,
      range: e.length - t
    }), this.segments = e, this.offset = t, this.len = n;
  }
  get length() {
    return this.len;
  }
  isEqual(e) {
    return BasePath.comparator(this, e) === 0;
  }
  child(e) {
    const t = this.segments.slice(this.offset, this.limit());
    return e instanceof BasePath ? e.forEach((e2) => {
      t.push(e2);
    }) : t.push(e), this.construct(t);
  }
  limit() {
    return this.offset + this.length;
  }
  popFirst(e) {
    return e = e === undefined ? 1 : e, this.construct(this.segments, this.offset + e, this.length - e);
  }
  popLast() {
    return this.construct(this.segments, this.offset, this.length - 1);
  }
  firstSegment() {
    return this.segments[this.offset];
  }
  lastSegment() {
    return this.get(this.length - 1);
  }
  get(e) {
    return this.segments[this.offset + e];
  }
  isEmpty() {
    return this.length === 0;
  }
  isPrefixOf(e) {
    if (e.length < this.length)
      return false;
    for (let t = 0;t < this.length; t++)
      if (this.get(t) !== e.get(t))
        return false;
    return true;
  }
  isImmediateParentOf(e) {
    if (this.length + 1 !== e.length)
      return false;
    for (let t = 0;t < this.length; t++)
      if (this.get(t) !== e.get(t))
        return false;
    return true;
  }
  forEach(e) {
    for (let t = this.offset, n = this.limit();t < n; t++)
      e(this.segments[t]);
  }
  toArray() {
    return this.segments.slice(this.offset, this.limit());
  }
  static comparator(e, t) {
    const n = Math.min(e.length, t.length);
    for (let r = 0;r < n; r++) {
      const n2 = BasePath.compareSegments(e.get(r), t.get(r));
      if (n2 !== 0)
        return n2;
    }
    return __PRIVATE_primitiveComparator(e.length, t.length);
  }
  static compareSegments(e, t) {
    const n = BasePath.isNumericId(e), r = BasePath.isNumericId(t);
    return n && !r ? -1 : !n && r ? 1 : n && r ? BasePath.extractNumericId(e).compare(BasePath.extractNumericId(t)) : __PRIVATE_compareUtf8Strings(e, t);
  }
  static isNumericId(e) {
    return e.startsWith("__id") && e.endsWith("__");
  }
  static extractNumericId(e) {
    return Integer.fromString(e.substring(4, e.length - 2));
  }
}

class ResourcePath extends BasePath {
  construct(e, t, n) {
    return new ResourcePath(e, t, n);
  }
  canonicalString() {
    return this.toArray().join("/");
  }
  toString() {
    return this.canonicalString();
  }
  toUriEncodedString() {
    return this.toArray().map(encodeURIComponent).join("/");
  }
  static fromString(...e) {
    const t = [];
    for (const n of e) {
      if (n.indexOf("//") >= 0)
        throw new FirestoreError(N.INVALID_ARGUMENT, `Invalid segment (${n}). Paths must not contain // in them.`);
      t.push(...n.split("/").filter((e2) => e2.length > 0));
    }
    return new ResourcePath(t);
  }
  static emptyPath() {
    return new ResourcePath([]);
  }
}
var q = /^[_a-zA-Z][_a-zA-Z0-9]*$/;

class FieldPath$1 extends BasePath {
  construct(e, t, n) {
    return new FieldPath$1(e, t, n);
  }
  static isValidIdentifier(e) {
    return q.test(e);
  }
  canonicalString() {
    return this.toArray().map((e) => (e = e.replace(/\\/g, "\\\\").replace(/`/g, "\\`"), FieldPath$1.isValidIdentifier(e) || (e = "`" + e + "`"), e)).join(".");
  }
  toString() {
    return this.canonicalString();
  }
  isKeyField() {
    return this.length === 1 && this.get(0) === k;
  }
  static keyField() {
    return new FieldPath$1([k]);
  }
  static fromServerFormat(e) {
    const t = [];
    let n = "", r = 0;
    const __PRIVATE_addCurrentSegment = () => {
      if (n.length === 0)
        throw new FirestoreError(N.INVALID_ARGUMENT, `Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
      t.push(n), n = "";
    };
    let i = false;
    for (;r < e.length; ) {
      const t2 = e[r];
      if (t2 === "\\") {
        if (r + 1 === e.length)
          throw new FirestoreError(N.INVALID_ARGUMENT, "Path has trailing escape character: " + e);
        const t3 = e[r + 1];
        if (t3 !== "\\" && t3 !== "." && t3 !== "`")
          throw new FirestoreError(N.INVALID_ARGUMENT, "Path has invalid escape sequence: " + e);
        n += t3, r += 2;
      } else
        t2 === "`" ? (i = !i, r++) : t2 !== "." || i ? (n += t2, r++) : (__PRIVATE_addCurrentSegment(), r++);
    }
    if (__PRIVATE_addCurrentSegment(), i)
      throw new FirestoreError(N.INVALID_ARGUMENT, "Unterminated ` in path: " + e);
    return new FieldPath$1(t);
  }
  static emptyPath() {
    return new FieldPath$1([]);
  }
}

class DocumentKey {
  constructor(e) {
    this.path = e;
  }
  static fromPath(e) {
    return new DocumentKey(ResourcePath.fromString(e));
  }
  static fromName(e) {
    return new DocumentKey(ResourcePath.fromString(e).popFirst(5));
  }
  static empty() {
    return new DocumentKey(ResourcePath.emptyPath());
  }
  get collectionGroup() {
    return this.path.popLast().lastSegment();
  }
  hasCollectionId(e) {
    return this.path.length >= 2 && this.path.get(this.path.length - 2) === e;
  }
  getCollectionGroup() {
    return this.path.get(this.path.length - 2);
  }
  getCollectionPath() {
    return this.path.popLast();
  }
  isEqual(e) {
    return e !== null && ResourcePath.comparator(this.path, e.path) === 0;
  }
  toString() {
    return this.path.toString();
  }
  static comparator(e, t) {
    return ResourcePath.comparator(e.path, t.path);
  }
  static isDocumentKey(e) {
    return e.length % 2 == 0;
  }
  static fromSegments(e) {
    return new DocumentKey(new ResourcePath(e.slice()));
  }
}
function __PRIVATE_validateNonEmptyArgument(e, t, n) {
  if (!n)
    throw new FirestoreError(N.INVALID_ARGUMENT, `Function ${e}() cannot be called with an empty ${t}.`);
}
function __PRIVATE_validateIsNotUsedTogether(e, t, n, r) {
  if (t === true && r === true)
    throw new FirestoreError(N.INVALID_ARGUMENT, `${e} and ${n} cannot be used together.`);
}
function __PRIVATE_validateDocumentPath(e) {
  if (!DocumentKey.isDocumentKey(e))
    throw new FirestoreError(N.INVALID_ARGUMENT, `Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`);
}
function __PRIVATE_validateCollectionPath(e) {
  if (DocumentKey.isDocumentKey(e))
    throw new FirestoreError(N.INVALID_ARGUMENT, `Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`);
}
function __PRIVATE_isPlainObject(e) {
  return typeof e == "object" && e !== null && (Object.getPrototypeOf(e) === Object.prototype || Object.getPrototypeOf(e) === null);
}
function __PRIVATE_valueDescription(e) {
  if (e === undefined)
    return "undefined";
  if (e === null)
    return "null";
  if (typeof e == "string")
    return e.length > 20 && (e = `${e.substring(0, 20)}...`), JSON.stringify(e);
  if (typeof e == "number" || typeof e == "boolean")
    return "" + e;
  if (typeof e == "object") {
    if (e instanceof Array)
      return "an array";
    {
      const t = function __PRIVATE_tryGetCustomObjectType(e2) {
        if (e2.constructor)
          return e2.constructor.name;
        return null;
      }(e);
      return t ? `a custom ${t} object` : "an object";
    }
  }
  return typeof e == "function" ? "a function" : fail(12329, {
    type: typeof e
  });
}
function __PRIVATE_cast(e, t) {
  if ("_delegate" in e && (e = e._delegate), !(e instanceof t)) {
    if (t.name === e.constructor.name)
      throw new FirestoreError(N.INVALID_ARGUMENT, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
    {
      const n = __PRIVATE_valueDescription(e);
      throw new FirestoreError(N.INVALID_ARGUMENT, `Expected type '${t.name}', but it was: ${n}`);
    }
  }
  return e;
}
function __PRIVATE_validatePositiveNumber(e, t) {
  if (t <= 0)
    throw new FirestoreError(N.INVALID_ARGUMENT, `Function ${e}() requires a positive number, but it was: ${t}.`);
}
function property(e, t) {
  const n = {
    typeString: e
  };
  return t && (n.value = t), n;
}
function __PRIVATE_validateJSON(e, t) {
  if (!__PRIVATE_isPlainObject(e))
    throw new FirestoreError(N.INVALID_ARGUMENT, "JSON must be an object");
  let n;
  for (const r in t)
    if (t[r]) {
      const i = t[r].typeString, s = "value" in t[r] ? {
        value: t[r].value
      } : undefined;
      if (!(r in e)) {
        n = `JSON missing required field: '${r}'`;
        break;
      }
      const o = e[r];
      if (i && typeof o !== i) {
        n = `JSON field '${r}' must be a ${i}.`;
        break;
      }
      if (s !== undefined && o !== s.value) {
        n = `Expected '${r}' field to equal '${s.value}'`;
        break;
      }
    }
  if (n)
    throw new FirestoreError(N.INVALID_ARGUMENT, n);
  return true;
}
var Q = -62135596800;
var $ = 1e6;

class Timestamp {
  static now() {
    return Timestamp.fromMillis(Date.now());
  }
  static fromDate(e) {
    return Timestamp.fromMillis(e.getTime());
  }
  static fromMillis(e) {
    const t = Math.floor(e / 1000), n = Math.floor((e - 1000 * t) * $);
    return new Timestamp(t, n);
  }
  constructor(e, t) {
    if (this.seconds = e, this.nanoseconds = t, t < 0)
      throw new FirestoreError(N.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + t);
    if (t >= 1e9)
      throw new FirestoreError(N.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + t);
    if (e < Q)
      throw new FirestoreError(N.INVALID_ARGUMENT, "Timestamp seconds out of range: " + e);
    if (e >= 253402300800)
      throw new FirestoreError(N.INVALID_ARGUMENT, "Timestamp seconds out of range: " + e);
  }
  toDate() {
    return new Date(this.toMillis());
  }
  toMillis() {
    return 1000 * this.seconds + this.nanoseconds / $;
  }
  _compareTo(e) {
    return this.seconds === e.seconds ? __PRIVATE_primitiveComparator(this.nanoseconds, e.nanoseconds) : __PRIVATE_primitiveComparator(this.seconds, e.seconds);
  }
  isEqual(e) {
    return e.seconds === this.seconds && e.nanoseconds === this.nanoseconds;
  }
  toString() {
    return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")";
  }
  toJSON() {
    return {
      type: Timestamp._jsonSchemaVersion,
      seconds: this.seconds,
      nanoseconds: this.nanoseconds
    };
  }
  static fromJSON(e) {
    if (__PRIVATE_validateJSON(e, Timestamp._jsonSchema))
      return new Timestamp(e.seconds, e.nanoseconds);
  }
  valueOf() {
    const e = this.seconds - Q;
    return String(e).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0");
  }
}
Timestamp._jsonSchemaVersion = "firestore/timestamp/1.0", Timestamp._jsonSchema = {
  type: property("string", Timestamp._jsonSchemaVersion),
  seconds: property("number"),
  nanoseconds: property("number")
};

class SnapshotVersion {
  static fromTimestamp(e) {
    return new SnapshotVersion(e);
  }
  static min() {
    return new SnapshotVersion(new Timestamp(0, 0));
  }
  static max() {
    return new SnapshotVersion(new Timestamp(253402300799, 999999999));
  }
  constructor(e) {
    this.timestamp = e;
  }
  compareTo(e) {
    return this.timestamp._compareTo(e.timestamp);
  }
  isEqual(e) {
    return this.timestamp.isEqual(e.timestamp);
  }
  toMicroseconds() {
    return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1000;
  }
  toString() {
    return "SnapshotVersion(" + this.timestamp.toString() + ")";
  }
  toTimestamp() {
    return this.timestamp;
  }
}
var U = -1;

class FieldIndex {
  constructor(e, t, n, r) {
    this.indexId = e, this.collectionGroup = t, this.fields = n, this.indexState = r;
  }
}
FieldIndex.UNKNOWN_ID = -1;
function __PRIVATE_newIndexOffsetSuccessorFromReadTime(e, t) {
  const n = e.toTimestamp().seconds, r = e.toTimestamp().nanoseconds + 1, i = SnapshotVersion.fromTimestamp(r === 1e9 ? new Timestamp(n + 1, 0) : new Timestamp(n, r));
  return new IndexOffset(i, DocumentKey.empty(), t);
}
function __PRIVATE_newIndexOffsetFromDocument(e) {
  return new IndexOffset(e.readTime, e.key, U);
}

class IndexOffset {
  constructor(e, t, n) {
    this.readTime = e, this.documentKey = t, this.largestBatchId = n;
  }
  static min() {
    return new IndexOffset(SnapshotVersion.min(), DocumentKey.empty(), U);
  }
  static max() {
    return new IndexOffset(SnapshotVersion.max(), DocumentKey.empty(), U);
  }
}
function __PRIVATE_indexOffsetComparator(e, t) {
  let n = e.readTime.compareTo(t.readTime);
  return n !== 0 ? n : (n = DocumentKey.comparator(e.documentKey, t.documentKey), n !== 0 ? n : __PRIVATE_primitiveComparator(e.largestBatchId, t.largestBatchId));
}
var K = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";

class PersistenceTransaction {
  constructor() {
    this.onCommittedListeners = [];
  }
  addOnCommittedListener(e) {
    this.onCommittedListeners.push(e);
  }
  raiseOnCommittedEvent() {
    this.onCommittedListeners.forEach((e) => e());
  }
}
async function __PRIVATE_ignoreIfPrimaryLeaseLoss(e) {
  if (e.code !== N.FAILED_PRECONDITION || e.message !== K)
    throw e;
  __PRIVATE_logDebug("LocalStore", "Unexpectedly lost primary lease");
}

class PersistencePromise {
  constructor(e) {
    this.nextCallback = null, this.catchCallback = null, this.result = undefined, this.error = undefined, this.isDone = false, this.callbackAttached = false, e((e2) => {
      this.isDone = true, this.result = e2, this.nextCallback && this.nextCallback(e2);
    }, (e2) => {
      this.isDone = true, this.error = e2, this.catchCallback && this.catchCallback(e2);
    });
  }
  catch(e) {
    return this.next(undefined, e);
  }
  next(e, t) {
    return this.callbackAttached && fail(59440), this.callbackAttached = true, this.isDone ? this.error ? this.wrapFailure(t, this.error) : this.wrapSuccess(e, this.result) : new PersistencePromise((n, r) => {
      this.nextCallback = (t2) => {
        this.wrapSuccess(e, t2).next(n, r);
      }, this.catchCallback = (e2) => {
        this.wrapFailure(t, e2).next(n, r);
      };
    });
  }
  toPromise() {
    return new Promise((e, t) => {
      this.next(e, t);
    });
  }
  wrapUserFunction(e) {
    try {
      const t = e();
      return t instanceof PersistencePromise ? t : PersistencePromise.resolve(t);
    } catch (e2) {
      return PersistencePromise.reject(e2);
    }
  }
  wrapSuccess(e, t) {
    return e ? this.wrapUserFunction(() => e(t)) : PersistencePromise.resolve(t);
  }
  wrapFailure(e, t) {
    return e ? this.wrapUserFunction(() => e(t)) : PersistencePromise.reject(t);
  }
  static resolve(e) {
    return new PersistencePromise((t, n) => {
      t(e);
    });
  }
  static reject(e) {
    return new PersistencePromise((t, n) => {
      n(e);
    });
  }
  static waitFor(e) {
    return new PersistencePromise((t, n) => {
      let r = 0, i = 0, s = false;
      e.forEach((e2) => {
        ++r, e2.next(() => {
          ++i, s && i === r && t();
        }, (e3) => n(e3));
      }), s = true, i === r && t();
    });
  }
  static or(e) {
    let t = PersistencePromise.resolve(false);
    for (const n of e)
      t = t.next((e2) => e2 ? PersistencePromise.resolve(e2) : n());
    return t;
  }
  static forEach(e, t) {
    const n = [];
    return e.forEach((e2, r) => {
      n.push(t.call(this, e2, r));
    }), this.waitFor(n);
  }
  static mapArray(e, t) {
    return new PersistencePromise((n, r) => {
      const i = e.length, s = new Array(i);
      let o = 0;
      for (let _ = 0;_ < i; _++) {
        const a = _;
        t(e[a]).next((e2) => {
          s[a] = e2, ++o, o === i && n(s);
        }, (e2) => r(e2));
      }
    });
  }
  static doWhile(e, t) {
    return new PersistencePromise((n, r) => {
      const process2 = () => {
        e() === true ? t().next(() => {
          process2();
        }, r) : n();
      };
      process2();
    });
  }
}
function __PRIVATE_getAndroidVersion(e) {
  const t = e.match(/Android ([\d.]+)/i), n = t ? t[1].split(".").slice(0, 2).join(".") : "-1";
  return Number(n);
}
function __PRIVATE_isIndexedDbTransactionError(e) {
  return e.name === "IndexedDbTransactionError";
}
class __PRIVATE_ListenSequence {
  constructor(e, t) {
    this.previousValue = e, t && (t.sequenceNumberHandler = (e2) => this.ae(e2), this.ue = (e2) => t.writeSequenceNumber(e2));
  }
  ae(e) {
    return this.previousValue = Math.max(e, this.previousValue), this.previousValue;
  }
  next() {
    const e = ++this.previousValue;
    return this.ue && this.ue(e), e;
  }
}
__PRIVATE_ListenSequence.ce = -1;
var j = -1;
function __PRIVATE_isNullOrUndefined(e) {
  return e == null;
}
function __PRIVATE_isNegativeZero(e) {
  return e === 0 && 1 / e == -1 / 0;
}
function isSafeInteger(e) {
  return typeof e == "number" && Number.isInteger(e) && !__PRIVATE_isNegativeZero(e) && e <= Number.MAX_SAFE_INTEGER && e >= Number.MIN_SAFE_INTEGER;
}
var J = "\x01";
function __PRIVATE_encodeResourcePath(e) {
  let t = "";
  for (let n = 0;n < e.length; n++)
    t.length > 0 && (t = __PRIVATE_encodeSeparator(t)), t = __PRIVATE_encodeSegment(e.get(n), t);
  return __PRIVATE_encodeSeparator(t);
}
function __PRIVATE_encodeSegment(e, t) {
  let n = t;
  const r = e.length;
  for (let t2 = 0;t2 < r; t2++) {
    const r2 = e.charAt(t2);
    switch (r2) {
      case "\x00":
        n += "\x01\x10";
        break;
      case J:
        n += "\x01\x11";
        break;
      default:
        n += r2;
    }
  }
  return n;
}
function __PRIVATE_encodeSeparator(e) {
  return e + J + "\x01";
}
var H = "remoteDocuments";
var Y = "owner";
var X = "mutationQueues";
var te = "mutations";
var oe = "documentMutations";
var _e = "remoteDocumentsV14";
var Pe = "remoteDocumentGlobal";
var Ie = "targets";
var Ae = "targetDocuments";
var ge = "targetGlobal";
var pe = "collectionParents";
var we = "clientMetadata";
var be = "bundles";
var Ce = "namedQueries";
var Fe = "indexConfiguration";
var Ne = "indexState";
var qe = "indexEntries";
var Ke = "documentOverlays";
var He = "globals";
var Ze = [...[...[...[...[X, te, oe, H, Ie, Y, ge, Ae], we], Pe], pe], be, Ce];
var Xe = [...Ze, Ke];
var et = [X, te, oe, _e, Ie, Y, ge, Ae, we, Pe, pe, be, Ce, Ke];
var tt = et;
var nt = [...tt, Fe, Ne, qe];
var it = [...nt, He];
function __PRIVATE_objectSize(e) {
  let t = 0;
  for (const n in e)
    Object.prototype.hasOwnProperty.call(e, n) && t++;
  return t;
}
function forEach(e, t) {
  for (const n in e)
    Object.prototype.hasOwnProperty.call(e, n) && t(n, e[n]);
}
function isEmpty(e) {
  for (const t in e)
    if (Object.prototype.hasOwnProperty.call(e, t))
      return false;
  return true;
}

class SortedMap {
  constructor(e, t) {
    this.comparator = e, this.root = t || LLRBNode.EMPTY;
  }
  insert(e, t) {
    return new SortedMap(this.comparator, this.root.insert(e, t, this.comparator).copy(null, null, LLRBNode.BLACK, null, null));
  }
  remove(e) {
    return new SortedMap(this.comparator, this.root.remove(e, this.comparator).copy(null, null, LLRBNode.BLACK, null, null));
  }
  get(e) {
    let t = this.root;
    for (;!t.isEmpty(); ) {
      const n = this.comparator(e, t.key);
      if (n === 0)
        return t.value;
      n < 0 ? t = t.left : n > 0 && (t = t.right);
    }
    return null;
  }
  indexOf(e) {
    let t = 0, n = this.root;
    for (;!n.isEmpty(); ) {
      const r = this.comparator(e, n.key);
      if (r === 0)
        return t + n.left.size;
      r < 0 ? n = n.left : (t += n.left.size + 1, n = n.right);
    }
    return -1;
  }
  isEmpty() {
    return this.root.isEmpty();
  }
  get size() {
    return this.root.size;
  }
  minKey() {
    return this.root.minKey();
  }
  maxKey() {
    return this.root.maxKey();
  }
  inorderTraversal(e) {
    return this.root.inorderTraversal(e);
  }
  forEach(e) {
    this.inorderTraversal((t, n) => (e(t, n), false));
  }
  toString() {
    const e = [];
    return this.inorderTraversal((t, n) => (e.push(`${t}:${n}`), false)), `{${e.join(", ")}}`;
  }
  reverseTraversal(e) {
    return this.root.reverseTraversal(e);
  }
  getIterator() {
    return new SortedMapIterator(this.root, null, this.comparator, false);
  }
  getIteratorFrom(e) {
    return new SortedMapIterator(this.root, e, this.comparator, false);
  }
  getReverseIterator() {
    return new SortedMapIterator(this.root, null, this.comparator, true);
  }
  getReverseIteratorFrom(e) {
    return new SortedMapIterator(this.root, e, this.comparator, true);
  }
}

class SortedMapIterator {
  constructor(e, t, n, r) {
    this.isReverse = r, this.nodeStack = [];
    let i = 1;
    for (;!e.isEmpty(); )
      if (i = t ? n(e.key, t) : 1, t && r && (i *= -1), i < 0)
        e = this.isReverse ? e.left : e.right;
      else {
        if (i === 0) {
          this.nodeStack.push(e);
          break;
        }
        this.nodeStack.push(e), e = this.isReverse ? e.right : e.left;
      }
  }
  getNext() {
    let e = this.nodeStack.pop();
    const t = {
      key: e.key,
      value: e.value
    };
    if (this.isReverse)
      for (e = e.left;!e.isEmpty(); )
        this.nodeStack.push(e), e = e.right;
    else
      for (e = e.right;!e.isEmpty(); )
        this.nodeStack.push(e), e = e.left;
    return t;
  }
  hasNext() {
    return this.nodeStack.length > 0;
  }
  peek() {
    if (this.nodeStack.length === 0)
      return null;
    const e = this.nodeStack[this.nodeStack.length - 1];
    return {
      key: e.key,
      value: e.value
    };
  }
}

class LLRBNode {
  constructor(e, t, n, r, i) {
    this.key = e, this.value = t, this.color = n != null ? n : LLRBNode.RED, this.left = r != null ? r : LLRBNode.EMPTY, this.right = i != null ? i : LLRBNode.EMPTY, this.size = this.left.size + 1 + this.right.size;
  }
  copy(e, t, n, r, i) {
    return new LLRBNode(e != null ? e : this.key, t != null ? t : this.value, n != null ? n : this.color, r != null ? r : this.left, i != null ? i : this.right);
  }
  isEmpty() {
    return false;
  }
  inorderTraversal(e) {
    return this.left.inorderTraversal(e) || e(this.key, this.value) || this.right.inorderTraversal(e);
  }
  reverseTraversal(e) {
    return this.right.reverseTraversal(e) || e(this.key, this.value) || this.left.reverseTraversal(e);
  }
  min() {
    return this.left.isEmpty() ? this : this.left.min();
  }
  minKey() {
    return this.min().key;
  }
  maxKey() {
    return this.right.isEmpty() ? this.key : this.right.maxKey();
  }
  insert(e, t, n) {
    let r = this;
    const i = n(e, r.key);
    return r = i < 0 ? r.copy(null, null, null, r.left.insert(e, t, n), null) : i === 0 ? r.copy(null, t, null, null, null) : r.copy(null, null, null, null, r.right.insert(e, t, n)), r.fixUp();
  }
  removeMin() {
    if (this.left.isEmpty())
      return LLRBNode.EMPTY;
    let e = this;
    return e.left.isRed() || e.left.left.isRed() || (e = e.moveRedLeft()), e = e.copy(null, null, null, e.left.removeMin(), null), e.fixUp();
  }
  remove(e, t) {
    let n, r = this;
    if (t(e, r.key) < 0)
      r.left.isEmpty() || r.left.isRed() || r.left.left.isRed() || (r = r.moveRedLeft()), r = r.copy(null, null, null, r.left.remove(e, t), null);
    else {
      if (r.left.isRed() && (r = r.rotateRight()), r.right.isEmpty() || r.right.isRed() || r.right.left.isRed() || (r = r.moveRedRight()), t(e, r.key) === 0) {
        if (r.right.isEmpty())
          return LLRBNode.EMPTY;
        n = r.right.min(), r = r.copy(n.key, n.value, null, null, r.right.removeMin());
      }
      r = r.copy(null, null, null, null, r.right.remove(e, t));
    }
    return r.fixUp();
  }
  isRed() {
    return this.color;
  }
  fixUp() {
    let e = this;
    return e.right.isRed() && !e.left.isRed() && (e = e.rotateLeft()), e.left.isRed() && e.left.left.isRed() && (e = e.rotateRight()), e.left.isRed() && e.right.isRed() && (e = e.colorFlip()), e;
  }
  moveRedLeft() {
    let e = this.colorFlip();
    return e.right.left.isRed() && (e = e.copy(null, null, null, null, e.right.rotateRight()), e = e.rotateLeft(), e = e.colorFlip()), e;
  }
  moveRedRight() {
    let e = this.colorFlip();
    return e.left.left.isRed() && (e = e.rotateRight(), e = e.colorFlip()), e;
  }
  rotateLeft() {
    const e = this.copy(null, null, LLRBNode.RED, null, this.right.left);
    return this.right.copy(null, null, this.color, e, null);
  }
  rotateRight() {
    const e = this.copy(null, null, LLRBNode.RED, this.left.right, null);
    return this.left.copy(null, null, this.color, null, e);
  }
  colorFlip() {
    const e = this.left.copy(null, null, !this.left.color, null, null), t = this.right.copy(null, null, !this.right.color, null, null);
    return this.copy(null, null, !this.color, e, t);
  }
  checkMaxDepth() {
    const e = this.check();
    return Math.pow(2, e) <= this.size + 1;
  }
  check() {
    if (this.isRed() && this.left.isRed())
      throw fail(43730, {
        key: this.key,
        value: this.value
      });
    if (this.right.isRed())
      throw fail(14113, {
        key: this.key,
        value: this.value
      });
    const e = this.left.check();
    if (e !== this.right.check())
      throw fail(27949);
    return e + (this.isRed() ? 0 : 1);
  }
}
LLRBNode.EMPTY = null, LLRBNode.RED = true, LLRBNode.BLACK = false;
LLRBNode.EMPTY = new class LLRBEmptyNode {
  constructor() {
    this.size = 0;
  }
  get key() {
    throw fail(57766);
  }
  get value() {
    throw fail(16141);
  }
  get color() {
    throw fail(16727);
  }
  get left() {
    throw fail(29726);
  }
  get right() {
    throw fail(36894);
  }
  copy(e, t, n, r, i) {
    return this;
  }
  insert(e, t, n) {
    return new LLRBNode(e, t);
  }
  remove(e, t) {
    return this;
  }
  isEmpty() {
    return true;
  }
  inorderTraversal(e) {
    return false;
  }
  reverseTraversal(e) {
    return false;
  }
  minKey() {
    return null;
  }
  maxKey() {
    return null;
  }
  isRed() {
    return false;
  }
  checkMaxDepth() {
    return true;
  }
  check() {
    return 0;
  }
};

class SortedSet {
  constructor(e) {
    this.comparator = e, this.data = new SortedMap(this.comparator);
  }
  has(e) {
    return this.data.get(e) !== null;
  }
  first() {
    return this.data.minKey();
  }
  last() {
    return this.data.maxKey();
  }
  get size() {
    return this.data.size;
  }
  indexOf(e) {
    return this.data.indexOf(e);
  }
  forEach(e) {
    this.data.inorderTraversal((t, n) => (e(t), false));
  }
  forEachInRange(e, t) {
    const n = this.data.getIteratorFrom(e[0]);
    for (;n.hasNext(); ) {
      const r = n.getNext();
      if (this.comparator(r.key, e[1]) >= 0)
        return;
      t(r.key);
    }
  }
  forEachWhile(e, t) {
    let n;
    for (n = t !== undefined ? this.data.getIteratorFrom(t) : this.data.getIterator();n.hasNext(); ) {
      if (!e(n.getNext().key))
        return;
    }
  }
  firstAfterOrEqual(e) {
    const t = this.data.getIteratorFrom(e);
    return t.hasNext() ? t.getNext().key : null;
  }
  getIterator() {
    return new SortedSetIterator(this.data.getIterator());
  }
  getIteratorFrom(e) {
    return new SortedSetIterator(this.data.getIteratorFrom(e));
  }
  add(e) {
    return this.copy(this.data.remove(e).insert(e, true));
  }
  delete(e) {
    return this.has(e) ? this.copy(this.data.remove(e)) : this;
  }
  isEmpty() {
    return this.data.isEmpty();
  }
  unionWith(e) {
    let t = this;
    return t.size < e.size && (t = e, e = this), e.forEach((e2) => {
      t = t.add(e2);
    }), t;
  }
  isEqual(e) {
    if (!(e instanceof SortedSet))
      return false;
    if (this.size !== e.size)
      return false;
    const t = this.data.getIterator(), n = e.data.getIterator();
    for (;t.hasNext(); ) {
      const e2 = t.getNext().key, r = n.getNext().key;
      if (this.comparator(e2, r) !== 0)
        return false;
    }
    return true;
  }
  toArray() {
    const e = [];
    return this.forEach((t) => {
      e.push(t);
    }), e;
  }
  toString() {
    const e = [];
    return this.forEach((t) => e.push(t)), "SortedSet(" + e.toString() + ")";
  }
  copy(e) {
    const t = new SortedSet(this.comparator);
    return t.data = e, t;
  }
}

class SortedSetIterator {
  constructor(e) {
    this.iter = e;
  }
  getNext() {
    return this.iter.getNext().key;
  }
  hasNext() {
    return this.iter.hasNext();
  }
}
class FieldMask {
  constructor(e) {
    this.fields = e, e.sort(FieldPath$1.comparator);
  }
  static empty() {
    return new FieldMask([]);
  }
  unionWith(e) {
    let t = new SortedSet(FieldPath$1.comparator);
    for (const e2 of this.fields)
      t = t.add(e2);
    for (const n of e)
      t = t.add(n);
    return new FieldMask(t.toArray());
  }
  covers(e) {
    for (const t of this.fields)
      if (t.isPrefixOf(e))
        return true;
    return false;
  }
  isEqual(e) {
    return __PRIVATE_arrayEquals(this.fields, e.fields, (e2, t) => e2.isEqual(t));
  }
}

class __PRIVATE_Base64DecodeError extends Error {
  constructor() {
    super(...arguments), this.name = "Base64DecodeError";
  }
}
class ByteString {
  constructor(e) {
    this.binaryString = e;
  }
  static fromBase64String(e) {
    const t = function __PRIVATE_decodeBase64(e2) {
      try {
        return atob(e2);
      } catch (e3) {
        throw typeof DOMException != "undefined" && e3 instanceof DOMException ? new __PRIVATE_Base64DecodeError("Invalid base64 string: " + e3) : e3;
      }
    }(e);
    return new ByteString(t);
  }
  static fromUint8Array(e) {
    const t = function __PRIVATE_binaryStringFromUint8Array(e2) {
      let t2 = "";
      for (let n = 0;n < e2.length; ++n)
        t2 += String.fromCharCode(e2[n]);
      return t2;
    }(e);
    return new ByteString(t);
  }
  [Symbol.iterator]() {
    let e = 0;
    return {
      next: () => e < this.binaryString.length ? {
        value: this.binaryString.charCodeAt(e++),
        done: false
      } : {
        value: undefined,
        done: true
      }
    };
  }
  toBase64() {
    return function __PRIVATE_encodeBase64(e) {
      return btoa(e);
    }(this.binaryString);
  }
  toUint8Array() {
    return function __PRIVATE_uint8ArrayFromBinaryString(e) {
      const t = new Uint8Array(e.length);
      for (let n = 0;n < e.length; n++)
        t[n] = e.charCodeAt(n);
      return t;
    }(this.binaryString);
  }
  approximateByteSize() {
    return 2 * this.binaryString.length;
  }
  compareTo(e) {
    return __PRIVATE_primitiveComparator(this.binaryString, e.binaryString);
  }
  isEqual(e) {
    return this.binaryString === e.binaryString;
  }
}
ByteString.EMPTY_BYTE_STRING = new ByteString("");
var ot = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
function __PRIVATE_normalizeTimestamp(e) {
  if (__PRIVATE_hardAssert(!!e, 39018), typeof e == "string") {
    let t = 0;
    const n = ot.exec(e);
    if (__PRIVATE_hardAssert(!!n, 46558, {
      timestamp: e
    }), n[1]) {
      let e2 = n[1];
      e2 = (e2 + "000000000").substr(0, 9), t = Number(e2);
    }
    const r = new Date(e);
    return {
      seconds: Math.floor(r.getTime() / 1000),
      nanos: t
    };
  }
  return {
    seconds: __PRIVATE_normalizeNumber(e.seconds),
    nanos: __PRIVATE_normalizeNumber(e.nanos)
  };
}
function __PRIVATE_normalizeNumber(e) {
  return typeof e == "number" ? e : typeof e == "string" ? Number(e) : 0;
}
function __PRIVATE_normalizeByteString(e) {
  return typeof e == "string" ? ByteString.fromBase64String(e) : ByteString.fromUint8Array(e);
}
var _t = "server_timestamp";
var at = "__type__";
var ut = "__previous_value__";
var ct = "__local_write_time__";
function __PRIVATE_isServerTimestamp(e) {
  const t = (e?.mapValue?.fields || {})[at]?.stringValue;
  return t === _t;
}
function __PRIVATE_getPreviousValue(e) {
  const t = e.mapValue.fields[ut];
  return __PRIVATE_isServerTimestamp(t) ? __PRIVATE_getPreviousValue(t) : t;
}
function __PRIVATE_getLocalWriteTime(e) {
  const t = __PRIVATE_normalizeTimestamp(e.mapValue.fields[ct].timestampValue);
  return new Timestamp(t.seconds, t.nanos);
}

class DatabaseInfo {
  constructor(e, t, n, r, i, s, o, _, a, u) {
    this.databaseId = e, this.appId = t, this.persistenceKey = n, this.host = r, this.ssl = i, this.forceLongPolling = s, this.autoDetectLongPolling = o, this.longPollingOptions = _, this.useFetchStreams = a, this.isUsingEmulator = u;
  }
}
var lt = "(default)";

class DatabaseId {
  constructor(e, t) {
    this.projectId = e, this.database = t || lt;
  }
  static empty() {
    return new DatabaseId("", "");
  }
  get isDefaultDatabase() {
    return this.database === lt;
  }
  isEqual(e) {
    return e instanceof DatabaseId && e.projectId === this.projectId && e.database === this.database;
  }
}
var ht = "__type__";
var Pt = "__max__";
var Tt = {
  mapValue: {
    fields: {
      __type__: {
        stringValue: Pt
      }
    }
  }
};
var It = "__vector__";
var Et = "value";
function __PRIVATE_typeOrder(e) {
  return "nullValue" in e ? 0 : ("booleanValue" in e) ? 1 : ("integerValue" in e) || ("doubleValue" in e) ? 2 : ("timestampValue" in e) ? 3 : ("stringValue" in e) ? 5 : ("bytesValue" in e) ? 6 : ("referenceValue" in e) ? 7 : ("geoPointValue" in e) ? 8 : ("arrayValue" in e) ? 9 : ("mapValue" in e) ? __PRIVATE_isServerTimestamp(e) ? 4 : __PRIVATE_isMaxValue(e) ? 9007199254740991 : __PRIVATE_isVectorValue(e) ? 10 : 11 : fail(28295, {
    value: e
  });
}
function __PRIVATE_valueEquals(e, t) {
  if (e === t)
    return true;
  const n = __PRIVATE_typeOrder(e);
  if (n !== __PRIVATE_typeOrder(t))
    return false;
  switch (n) {
    case 0:
    case 9007199254740991:
      return true;
    case 1:
      return e.booleanValue === t.booleanValue;
    case 4:
      return __PRIVATE_getLocalWriteTime(e).isEqual(__PRIVATE_getLocalWriteTime(t));
    case 3:
      return function __PRIVATE_timestampEquals(e2, t2) {
        if (typeof e2.timestampValue == "string" && typeof t2.timestampValue == "string" && e2.timestampValue.length === t2.timestampValue.length)
          return e2.timestampValue === t2.timestampValue;
        const n2 = __PRIVATE_normalizeTimestamp(e2.timestampValue), r = __PRIVATE_normalizeTimestamp(t2.timestampValue);
        return n2.seconds === r.seconds && n2.nanos === r.nanos;
      }(e, t);
    case 5:
      return e.stringValue === t.stringValue;
    case 6:
      return function __PRIVATE_blobEquals(e2, t2) {
        return __PRIVATE_normalizeByteString(e2.bytesValue).isEqual(__PRIVATE_normalizeByteString(t2.bytesValue));
      }(e, t);
    case 7:
      return e.referenceValue === t.referenceValue;
    case 8:
      return function __PRIVATE_geoPointEquals(e2, t2) {
        return __PRIVATE_normalizeNumber(e2.geoPointValue.latitude) === __PRIVATE_normalizeNumber(t2.geoPointValue.latitude) && __PRIVATE_normalizeNumber(e2.geoPointValue.longitude) === __PRIVATE_normalizeNumber(t2.geoPointValue.longitude);
      }(e, t);
    case 2:
      return function __PRIVATE_numberEquals(e2, t2) {
        if ("integerValue" in e2 && "integerValue" in t2)
          return __PRIVATE_normalizeNumber(e2.integerValue) === __PRIVATE_normalizeNumber(t2.integerValue);
        if ("doubleValue" in e2 && "doubleValue" in t2) {
          const n2 = __PRIVATE_normalizeNumber(e2.doubleValue), r = __PRIVATE_normalizeNumber(t2.doubleValue);
          return n2 === r ? __PRIVATE_isNegativeZero(n2) === __PRIVATE_isNegativeZero(r) : isNaN(n2) && isNaN(r);
        }
        return false;
      }(e, t);
    case 9:
      return __PRIVATE_arrayEquals(e.arrayValue.values || [], t.arrayValue.values || [], __PRIVATE_valueEquals);
    case 10:
    case 11:
      return function __PRIVATE_objectEquals(e2, t2) {
        const n2 = e2.mapValue.fields || {}, r = t2.mapValue.fields || {};
        if (__PRIVATE_objectSize(n2) !== __PRIVATE_objectSize(r))
          return false;
        for (const e3 in n2)
          if (n2.hasOwnProperty(e3) && (r[e3] === undefined || !__PRIVATE_valueEquals(n2[e3], r[e3])))
            return false;
        return true;
      }(e, t);
    default:
      return fail(52216, {
        left: e
      });
  }
}
function __PRIVATE_arrayValueContains(e, t) {
  return (e.values || []).find((e2) => __PRIVATE_valueEquals(e2, t)) !== undefined;
}
function __PRIVATE_valueCompare(e, t) {
  if (e === t)
    return 0;
  const n = __PRIVATE_typeOrder(e), r = __PRIVATE_typeOrder(t);
  if (n !== r)
    return __PRIVATE_primitiveComparator(n, r);
  switch (n) {
    case 0:
    case 9007199254740991:
      return 0;
    case 1:
      return __PRIVATE_primitiveComparator(e.booleanValue, t.booleanValue);
    case 2:
      return function __PRIVATE_compareNumbers(e2, t2) {
        const n2 = __PRIVATE_normalizeNumber(e2.integerValue || e2.doubleValue), r2 = __PRIVATE_normalizeNumber(t2.integerValue || t2.doubleValue);
        return n2 < r2 ? -1 : n2 > r2 ? 1 : n2 === r2 ? 0 : isNaN(n2) ? isNaN(r2) ? 0 : -1 : 1;
      }(e, t);
    case 3:
      return __PRIVATE_compareTimestamps(e.timestampValue, t.timestampValue);
    case 4:
      return __PRIVATE_compareTimestamps(__PRIVATE_getLocalWriteTime(e), __PRIVATE_getLocalWriteTime(t));
    case 5:
      return __PRIVATE_compareUtf8Strings(e.stringValue, t.stringValue);
    case 6:
      return function __PRIVATE_compareBlobs(e2, t2) {
        const n2 = __PRIVATE_normalizeByteString(e2), r2 = __PRIVATE_normalizeByteString(t2);
        return n2.compareTo(r2);
      }(e.bytesValue, t.bytesValue);
    case 7:
      return function __PRIVATE_compareReferences(e2, t2) {
        const n2 = e2.split("/"), r2 = t2.split("/");
        for (let e3 = 0;e3 < n2.length && e3 < r2.length; e3++) {
          const t3 = __PRIVATE_primitiveComparator(n2[e3], r2[e3]);
          if (t3 !== 0)
            return t3;
        }
        return __PRIVATE_primitiveComparator(n2.length, r2.length);
      }(e.referenceValue, t.referenceValue);
    case 8:
      return function __PRIVATE_compareGeoPoints(e2, t2) {
        const n2 = __PRIVATE_primitiveComparator(__PRIVATE_normalizeNumber(e2.latitude), __PRIVATE_normalizeNumber(t2.latitude));
        if (n2 !== 0)
          return n2;
        return __PRIVATE_primitiveComparator(__PRIVATE_normalizeNumber(e2.longitude), __PRIVATE_normalizeNumber(t2.longitude));
      }(e.geoPointValue, t.geoPointValue);
    case 9:
      return __PRIVATE_compareArrays(e.arrayValue, t.arrayValue);
    case 10:
      return function __PRIVATE_compareVectors(e2, t2) {
        const n2 = e2.fields || {}, r2 = t2.fields || {}, i = n2[Et]?.arrayValue, s = r2[Et]?.arrayValue, o = __PRIVATE_primitiveComparator(i?.values?.length || 0, s?.values?.length || 0);
        if (o !== 0)
          return o;
        return __PRIVATE_compareArrays(i, s);
      }(e.mapValue, t.mapValue);
    case 11:
      return function __PRIVATE_compareMaps(e2, t2) {
        if (e2 === Tt.mapValue && t2 === Tt.mapValue)
          return 0;
        if (e2 === Tt.mapValue)
          return 1;
        if (t2 === Tt.mapValue)
          return -1;
        const n2 = e2.fields || {}, r2 = Object.keys(n2), i = t2.fields || {}, s = Object.keys(i);
        r2.sort(), s.sort();
        for (let e3 = 0;e3 < r2.length && e3 < s.length; ++e3) {
          const t3 = __PRIVATE_compareUtf8Strings(r2[e3], s[e3]);
          if (t3 !== 0)
            return t3;
          const o = __PRIVATE_valueCompare(n2[r2[e3]], i[s[e3]]);
          if (o !== 0)
            return o;
        }
        return __PRIVATE_primitiveComparator(r2.length, s.length);
      }(e.mapValue, t.mapValue);
    default:
      throw fail(23264, {
        he: n
      });
  }
}
function __PRIVATE_compareTimestamps(e, t) {
  if (typeof e == "string" && typeof t == "string" && e.length === t.length)
    return __PRIVATE_primitiveComparator(e, t);
  const n = __PRIVATE_normalizeTimestamp(e), r = __PRIVATE_normalizeTimestamp(t), i = __PRIVATE_primitiveComparator(n.seconds, r.seconds);
  return i !== 0 ? i : __PRIVATE_primitiveComparator(n.nanos, r.nanos);
}
function __PRIVATE_compareArrays(e, t) {
  const n = e.values || [], r = t.values || [];
  for (let e2 = 0;e2 < n.length && e2 < r.length; ++e2) {
    const t2 = __PRIVATE_valueCompare(n[e2], r[e2]);
    if (t2)
      return t2;
  }
  return __PRIVATE_primitiveComparator(n.length, r.length);
}
function canonicalId(e) {
  return __PRIVATE_canonifyValue(e);
}
function __PRIVATE_canonifyValue(e) {
  return "nullValue" in e ? "null" : ("booleanValue" in e) ? "" + e.booleanValue : ("integerValue" in e) ? "" + e.integerValue : ("doubleValue" in e) ? "" + e.doubleValue : ("timestampValue" in e) ? function __PRIVATE_canonifyTimestamp(e2) {
    const t = __PRIVATE_normalizeTimestamp(e2);
    return `time(${t.seconds},${t.nanos})`;
  }(e.timestampValue) : ("stringValue" in e) ? e.stringValue : ("bytesValue" in e) ? function __PRIVATE_canonifyByteString(e2) {
    return __PRIVATE_normalizeByteString(e2).toBase64();
  }(e.bytesValue) : ("referenceValue" in e) ? function __PRIVATE_canonifyReference(e2) {
    return DocumentKey.fromName(e2).toString();
  }(e.referenceValue) : ("geoPointValue" in e) ? function __PRIVATE_canonifyGeoPoint(e2) {
    return `geo(${e2.latitude},${e2.longitude})`;
  }(e.geoPointValue) : ("arrayValue" in e) ? function __PRIVATE_canonifyArray(e2) {
    let t = "[", n = true;
    for (const r of e2.values || [])
      n ? n = false : t += ",", t += __PRIVATE_canonifyValue(r);
    return t + "]";
  }(e.arrayValue) : ("mapValue" in e) ? function __PRIVATE_canonifyMap(e2) {
    const t = Object.keys(e2.fields || {}).sort();
    let n = "{", r = true;
    for (const i of t)
      r ? r = false : n += ",", n += `${i}:${__PRIVATE_canonifyValue(e2.fields[i])}`;
    return n + "}";
  }(e.mapValue) : fail(61005, {
    value: e
  });
}
function __PRIVATE_estimateByteSize(e) {
  switch (__PRIVATE_typeOrder(e)) {
    case 0:
    case 1:
      return 4;
    case 2:
      return 8;
    case 3:
    case 8:
      return 16;
    case 4:
      const t = __PRIVATE_getPreviousValue(e);
      return t ? 16 + __PRIVATE_estimateByteSize(t) : 16;
    case 5:
      return 2 * e.stringValue.length;
    case 6:
      return __PRIVATE_normalizeByteString(e.bytesValue).approximateByteSize();
    case 7:
      return e.referenceValue.length;
    case 9:
      return function __PRIVATE_estimateArrayByteSize(e2) {
        return (e2.values || []).reduce((e3, t2) => e3 + __PRIVATE_estimateByteSize(t2), 0);
      }(e.arrayValue);
    case 10:
    case 11:
      return function __PRIVATE_estimateMapByteSize(e2) {
        let t2 = 0;
        return forEach(e2.fields, (e3, n) => {
          t2 += e3.length + __PRIVATE_estimateByteSize(n);
        }), t2;
      }(e.mapValue);
    default:
      throw fail(13486, {
        value: e
      });
  }
}
function __PRIVATE_refValue(e, t) {
  return {
    referenceValue: `projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`
  };
}
function isInteger(e) {
  return !!e && "integerValue" in e;
}
function isArray(e) {
  return !!e && "arrayValue" in e;
}
function __PRIVATE_isNullValue(e) {
  return !!e && "nullValue" in e;
}
function __PRIVATE_isNanValue(e) {
  return !!e && "doubleValue" in e && isNaN(Number(e.doubleValue));
}
function __PRIVATE_isMapValue(e) {
  return !!e && "mapValue" in e;
}
function __PRIVATE_isVectorValue(e) {
  const t = (e?.mapValue?.fields || {})[ht]?.stringValue;
  return t === It;
}
function __PRIVATE_deepClone(e) {
  if (e.geoPointValue)
    return {
      geoPointValue: {
        ...e.geoPointValue
      }
    };
  if (e.timestampValue && typeof e.timestampValue == "object")
    return {
      timestampValue: {
        ...e.timestampValue
      }
    };
  if (e.mapValue) {
    const t = {
      mapValue: {
        fields: {}
      }
    };
    return forEach(e.mapValue.fields, (e2, n) => t.mapValue.fields[e2] = __PRIVATE_deepClone(n)), t;
  }
  if (e.arrayValue) {
    const t = {
      arrayValue: {
        values: []
      }
    };
    for (let n = 0;n < (e.arrayValue.values || []).length; ++n)
      t.arrayValue.values[n] = __PRIVATE_deepClone(e.arrayValue.values[n]);
    return t;
  }
  return {
    ...e
  };
}
function __PRIVATE_isMaxValue(e) {
  return (((e.mapValue || {}).fields || {}).__type__ || {}).stringValue === Pt;
}
var At = {
  mapValue: {
    fields: {
      [ht]: {
        stringValue: It
      },
      [Et]: {
        arrayValue: {}
      }
    }
  }
};
class ObjectValue {
  constructor(e) {
    this.value = e;
  }
  static empty() {
    return new ObjectValue({
      mapValue: {}
    });
  }
  field(e) {
    if (e.isEmpty())
      return this.value;
    {
      let t = this.value;
      for (let n = 0;n < e.length - 1; ++n)
        if (t = (t.mapValue.fields || {})[e.get(n)], !__PRIVATE_isMapValue(t))
          return null;
      return t = (t.mapValue.fields || {})[e.lastSegment()], t || null;
    }
  }
  set(e, t) {
    this.getFieldsMap(e.popLast())[e.lastSegment()] = __PRIVATE_deepClone(t);
  }
  setAll(e) {
    let t = FieldPath$1.emptyPath(), n = {}, r = [];
    e.forEach((e2, i2) => {
      if (!t.isImmediateParentOf(i2)) {
        const e3 = this.getFieldsMap(t);
        this.applyChanges(e3, n, r), n = {}, r = [], t = i2.popLast();
      }
      e2 ? n[i2.lastSegment()] = __PRIVATE_deepClone(e2) : r.push(i2.lastSegment());
    });
    const i = this.getFieldsMap(t);
    this.applyChanges(i, n, r);
  }
  delete(e) {
    const t = this.field(e.popLast());
    __PRIVATE_isMapValue(t) && t.mapValue.fields && delete t.mapValue.fields[e.lastSegment()];
  }
  isEqual(e) {
    return __PRIVATE_valueEquals(this.value, e.value);
  }
  getFieldsMap(e) {
    let t = this.value;
    t.mapValue.fields || (t.mapValue = {
      fields: {}
    });
    for (let n = 0;n < e.length; ++n) {
      let r = t.mapValue.fields[e.get(n)];
      __PRIVATE_isMapValue(r) && r.mapValue.fields || (r = {
        mapValue: {
          fields: {}
        }
      }, t.mapValue.fields[e.get(n)] = r), t = r;
    }
    return t.mapValue.fields;
  }
  applyChanges(e, t, n) {
    forEach(t, (t2, n2) => e[t2] = n2);
    for (const t2 of n)
      delete e[t2];
  }
  clone() {
    return new ObjectValue(__PRIVATE_deepClone(this.value));
  }
}
function __PRIVATE_extractFieldMask(e) {
  const t = [];
  return forEach(e.fields, (e2, n) => {
    const r = new FieldPath$1([e2]);
    if (__PRIVATE_isMapValue(n)) {
      const e3 = __PRIVATE_extractFieldMask(n.mapValue).fields;
      if (e3.length === 0)
        t.push(r);
      else
        for (const n2 of e3)
          t.push(r.child(n2));
    } else
      t.push(r);
  }), new FieldMask(t);
}

class MutableDocument {
  constructor(e, t, n, r, i, s, o) {
    this.key = e, this.documentType = t, this.version = n, this.readTime = r, this.createTime = i, this.data = s, this.documentState = o;
  }
  static newInvalidDocument(e) {
    return new MutableDocument(e, 0, SnapshotVersion.min(), SnapshotVersion.min(), SnapshotVersion.min(), ObjectValue.empty(), 0);
  }
  static newFoundDocument(e, t, n, r) {
    return new MutableDocument(e, 1, t, SnapshotVersion.min(), n, r, 0);
  }
  static newNoDocument(e, t) {
    return new MutableDocument(e, 2, t, SnapshotVersion.min(), SnapshotVersion.min(), ObjectValue.empty(), 0);
  }
  static newUnknownDocument(e, t) {
    return new MutableDocument(e, 3, t, SnapshotVersion.min(), SnapshotVersion.min(), ObjectValue.empty(), 2);
  }
  convertToFoundDocument(e, t) {
    return !this.createTime.isEqual(SnapshotVersion.min()) || this.documentType !== 2 && this.documentType !== 0 || (this.createTime = e), this.version = e, this.documentType = 1, this.data = t, this.documentState = 0, this;
  }
  convertToNoDocument(e) {
    return this.version = e, this.documentType = 2, this.data = ObjectValue.empty(), this.documentState = 0, this;
  }
  convertToUnknownDocument(e) {
    return this.version = e, this.documentType = 3, this.data = ObjectValue.empty(), this.documentState = 2, this;
  }
  setHasCommittedMutations() {
    return this.documentState = 2, this;
  }
  setHasLocalMutations() {
    return this.documentState = 1, this.version = SnapshotVersion.min(), this;
  }
  setReadTime(e) {
    return this.readTime = e, this;
  }
  get hasLocalMutations() {
    return this.documentState === 1;
  }
  get hasCommittedMutations() {
    return this.documentState === 2;
  }
  get hasPendingWrites() {
    return this.hasLocalMutations || this.hasCommittedMutations;
  }
  isValidDocument() {
    return this.documentType !== 0;
  }
  isFoundDocument() {
    return this.documentType === 1;
  }
  isNoDocument() {
    return this.documentType === 2;
  }
  isUnknownDocument() {
    return this.documentType === 3;
  }
  isEqual(e) {
    return e instanceof MutableDocument && this.key.isEqual(e.key) && this.version.isEqual(e.version) && this.documentType === e.documentType && this.documentState === e.documentState && this.data.isEqual(e.data);
  }
  mutableCopy() {
    return new MutableDocument(this.key, this.documentType, this.version, this.readTime, this.createTime, this.data.clone(), this.documentState);
  }
  toString() {
    return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`;
  }
}

class Bound {
  constructor(e, t) {
    this.position = e, this.inclusive = t;
  }
}
function __PRIVATE_boundCompareToDocument(e, t, n) {
  let r = 0;
  for (let i = 0;i < e.position.length; i++) {
    const s = t[i], o = e.position[i];
    if (s.field.isKeyField())
      r = DocumentKey.comparator(DocumentKey.fromName(o.referenceValue), n.key);
    else {
      r = __PRIVATE_valueCompare(o, n.data.field(s.field));
    }
    if (s.dir === "desc" && (r *= -1), r !== 0)
      break;
  }
  return r;
}
function __PRIVATE_boundEquals(e, t) {
  if (e === null)
    return t === null;
  if (t === null)
    return false;
  if (e.inclusive !== t.inclusive || e.position.length !== t.position.length)
    return false;
  for (let n = 0;n < e.position.length; n++) {
    if (!__PRIVATE_valueEquals(e.position[n], t.position[n]))
      return false;
  }
  return true;
}

class OrderBy {
  constructor(e, t = "asc") {
    this.field = e, this.dir = t;
  }
}
function __PRIVATE_orderByEquals(e, t) {
  return e.dir === t.dir && e.field.isEqual(t.field);
}

class Filter {
}

class FieldFilter extends Filter {
  constructor(e, t, n) {
    super(), this.field = e, this.op = t, this.value = n;
  }
  static create(e, t, n) {
    return e.isKeyField() ? t === "in" || t === "not-in" ? this.createKeyFieldInFilter(e, t, n) : new __PRIVATE_KeyFieldFilter(e, t, n) : t === "array-contains" ? new __PRIVATE_ArrayContainsFilter(e, n) : t === "in" ? new __PRIVATE_InFilter(e, n) : t === "not-in" ? new __PRIVATE_NotInFilter(e, n) : t === "array-contains-any" ? new __PRIVATE_ArrayContainsAnyFilter(e, n) : new FieldFilter(e, t, n);
  }
  static createKeyFieldInFilter(e, t, n) {
    return t === "in" ? new __PRIVATE_KeyFieldInFilter(e, n) : new __PRIVATE_KeyFieldNotInFilter(e, n);
  }
  matches(e) {
    const t = e.data.field(this.field);
    return this.op === "!=" ? t !== null && t.nullValue === undefined && this.matchesComparison(__PRIVATE_valueCompare(t, this.value)) : t !== null && __PRIVATE_typeOrder(this.value) === __PRIVATE_typeOrder(t) && this.matchesComparison(__PRIVATE_valueCompare(t, this.value));
  }
  matchesComparison(e) {
    switch (this.op) {
      case "<":
        return e < 0;
      case "<=":
        return e <= 0;
      case "==":
        return e === 0;
      case "!=":
        return e !== 0;
      case ">":
        return e > 0;
      case ">=":
        return e >= 0;
      default:
        return fail(47266, {
          operator: this.op
        });
    }
  }
  isInequality() {
    return ["<", "<=", ">", ">=", "!=", "not-in"].indexOf(this.op) >= 0;
  }
  getFlattenedFilters() {
    return [this];
  }
  getFilters() {
    return [this];
  }
}

class CompositeFilter extends Filter {
  constructor(e, t) {
    super(), this.filters = e, this.op = t, this.Pe = null;
  }
  static create(e, t) {
    return new CompositeFilter(e, t);
  }
  matches(e) {
    return __PRIVATE_compositeFilterIsConjunction(this) ? this.filters.find((t) => !t.matches(e)) === undefined : this.filters.find((t) => t.matches(e)) !== undefined;
  }
  getFlattenedFilters() {
    return this.Pe !== null || (this.Pe = this.filters.reduce((e, t) => e.concat(t.getFlattenedFilters()), [])), this.Pe;
  }
  getFilters() {
    return Object.assign([], this.filters);
  }
}
function __PRIVATE_compositeFilterIsConjunction(e) {
  return e.op === "and";
}
function __PRIVATE_compositeFilterIsFlatConjunction(e) {
  return __PRIVATE_compositeFilterIsFlat(e) && __PRIVATE_compositeFilterIsConjunction(e);
}
function __PRIVATE_compositeFilterIsFlat(e) {
  for (const t of e.filters)
    if (t instanceof CompositeFilter)
      return false;
  return true;
}
function __PRIVATE_canonifyFilter(e) {
  if (e instanceof FieldFilter)
    return e.field.canonicalString() + e.op.toString() + canonicalId(e.value);
  if (__PRIVATE_compositeFilterIsFlatConjunction(e))
    return e.filters.map((e2) => __PRIVATE_canonifyFilter(e2)).join(",");
  {
    const t = e.filters.map((e2) => __PRIVATE_canonifyFilter(e2)).join(",");
    return `${e.op}(${t})`;
  }
}
function __PRIVATE_filterEquals(e, t) {
  return e instanceof FieldFilter ? function __PRIVATE_fieldFilterEquals(e2, t2) {
    return t2 instanceof FieldFilter && e2.op === t2.op && e2.field.isEqual(t2.field) && __PRIVATE_valueEquals(e2.value, t2.value);
  }(e, t) : e instanceof CompositeFilter ? function __PRIVATE_compositeFilterEquals(e2, t2) {
    if (t2 instanceof CompositeFilter && e2.op === t2.op && e2.filters.length === t2.filters.length) {
      return e2.filters.reduce((e3, n, r) => e3 && __PRIVATE_filterEquals(n, t2.filters[r]), true);
    }
    return false;
  }(e, t) : void fail(19439);
}
function __PRIVATE_stringifyFilter(e) {
  return e instanceof FieldFilter ? function __PRIVATE_stringifyFieldFilter(e2) {
    return `${e2.field.canonicalString()} ${e2.op} ${canonicalId(e2.value)}`;
  }(e) : e instanceof CompositeFilter ? function __PRIVATE_stringifyCompositeFilter(e2) {
    return e2.op.toString() + " {" + e2.getFilters().map(__PRIVATE_stringifyFilter).join(" ,") + "}";
  }(e) : "Filter";
}

class __PRIVATE_KeyFieldFilter extends FieldFilter {
  constructor(e, t, n) {
    super(e, t, n), this.key = DocumentKey.fromName(n.referenceValue);
  }
  matches(e) {
    const t = DocumentKey.comparator(e.key, this.key);
    return this.matchesComparison(t);
  }
}

class __PRIVATE_KeyFieldInFilter extends FieldFilter {
  constructor(e, t) {
    super(e, "in", t), this.keys = __PRIVATE_extractDocumentKeysFromArrayValue("in", t);
  }
  matches(e) {
    return this.keys.some((t) => t.isEqual(e.key));
  }
}

class __PRIVATE_KeyFieldNotInFilter extends FieldFilter {
  constructor(e, t) {
    super(e, "not-in", t), this.keys = __PRIVATE_extractDocumentKeysFromArrayValue("not-in", t);
  }
  matches(e) {
    return !this.keys.some((t) => t.isEqual(e.key));
  }
}
function __PRIVATE_extractDocumentKeysFromArrayValue(e, t) {
  return (t.arrayValue?.values || []).map((e2) => DocumentKey.fromName(e2.referenceValue));
}

class __PRIVATE_ArrayContainsFilter extends FieldFilter {
  constructor(e, t) {
    super(e, "array-contains", t);
  }
  matches(e) {
    const t = e.data.field(this.field);
    return isArray(t) && __PRIVATE_arrayValueContains(t.arrayValue, this.value);
  }
}

class __PRIVATE_InFilter extends FieldFilter {
  constructor(e, t) {
    super(e, "in", t);
  }
  matches(e) {
    const t = e.data.field(this.field);
    return t !== null && __PRIVATE_arrayValueContains(this.value.arrayValue, t);
  }
}

class __PRIVATE_NotInFilter extends FieldFilter {
  constructor(e, t) {
    super(e, "not-in", t);
  }
  matches(e) {
    if (__PRIVATE_arrayValueContains(this.value.arrayValue, {
      nullValue: "NULL_VALUE"
    }))
      return false;
    const t = e.data.field(this.field);
    return t !== null && t.nullValue === undefined && !__PRIVATE_arrayValueContains(this.value.arrayValue, t);
  }
}

class __PRIVATE_ArrayContainsAnyFilter extends FieldFilter {
  constructor(e, t) {
    super(e, "array-contains-any", t);
  }
  matches(e) {
    const t = e.data.field(this.field);
    return !(!isArray(t) || !t.arrayValue.values) && t.arrayValue.values.some((e2) => __PRIVATE_arrayValueContains(this.value.arrayValue, e2));
  }
}

class __PRIVATE_TargetImpl {
  constructor(e, t = null, n = [], r = [], i = null, s = null, o = null) {
    this.path = e, this.collectionGroup = t, this.orderBy = n, this.filters = r, this.limit = i, this.startAt = s, this.endAt = o, this.Te = null;
  }
}
function __PRIVATE_newTarget(e, t = null, n = [], r = [], i = null, s = null, o = null) {
  return new __PRIVATE_TargetImpl(e, t, n, r, i, s, o);
}
function __PRIVATE_canonifyTarget(e) {
  const t = __PRIVATE_debugCast(e);
  if (t.Te === null) {
    let e2 = t.path.canonicalString();
    t.collectionGroup !== null && (e2 += "|cg:" + t.collectionGroup), e2 += "|f:", e2 += t.filters.map((e3) => __PRIVATE_canonifyFilter(e3)).join(","), e2 += "|ob:", e2 += t.orderBy.map((e3) => function __PRIVATE_canonifyOrderBy(e4) {
      return e4.field.canonicalString() + e4.dir;
    }(e3)).join(","), __PRIVATE_isNullOrUndefined(t.limit) || (e2 += "|l:", e2 += t.limit), t.startAt && (e2 += "|lb:", e2 += t.startAt.inclusive ? "b:" : "a:", e2 += t.startAt.position.map((e3) => canonicalId(e3)).join(",")), t.endAt && (e2 += "|ub:", e2 += t.endAt.inclusive ? "a:" : "b:", e2 += t.endAt.position.map((e3) => canonicalId(e3)).join(",")), t.Te = e2;
  }
  return t.Te;
}
function __PRIVATE_targetEquals(e, t) {
  if (e.limit !== t.limit)
    return false;
  if (e.orderBy.length !== t.orderBy.length)
    return false;
  for (let n = 0;n < e.orderBy.length; n++)
    if (!__PRIVATE_orderByEquals(e.orderBy[n], t.orderBy[n]))
      return false;
  if (e.filters.length !== t.filters.length)
    return false;
  for (let n = 0;n < e.filters.length; n++)
    if (!__PRIVATE_filterEquals(e.filters[n], t.filters[n]))
      return false;
  return e.collectionGroup === t.collectionGroup && (!!e.path.isEqual(t.path) && (!!__PRIVATE_boundEquals(e.startAt, t.startAt) && __PRIVATE_boundEquals(e.endAt, t.endAt)));
}
function __PRIVATE_targetIsDocumentTarget(e) {
  return DocumentKey.isDocumentKey(e.path) && e.collectionGroup === null && e.filters.length === 0;
}
class __PRIVATE_QueryImpl {
  constructor(e, t = null, n = [], r = [], i = null, s = "F", o = null, _ = null) {
    this.path = e, this.collectionGroup = t, this.explicitOrderBy = n, this.filters = r, this.limit = i, this.limitType = s, this.startAt = o, this.endAt = _, this.Ie = null, this.Ee = null, this.de = null, this.startAt, this.endAt;
  }
}
function __PRIVATE_newQuery(e, t, n, r, i, s, o, _) {
  return new __PRIVATE_QueryImpl(e, t, n, r, i, s, o, _);
}
function __PRIVATE_newQueryForPath(e) {
  return new __PRIVATE_QueryImpl(e);
}
function __PRIVATE_queryMatchesAllDocuments(e) {
  return e.filters.length === 0 && e.limit === null && e.startAt == null && e.endAt == null && (e.explicitOrderBy.length === 0 || e.explicitOrderBy.length === 1 && e.explicitOrderBy[0].field.isKeyField());
}
function __PRIVATE_isCollectionGroupQuery(e) {
  return e.collectionGroup !== null;
}
function __PRIVATE_queryNormalizedOrderBy(e) {
  const t = __PRIVATE_debugCast(e);
  if (t.Ie === null) {
    t.Ie = [];
    const e2 = new Set;
    for (const n2 of t.explicitOrderBy)
      t.Ie.push(n2), e2.add(n2.field.canonicalString());
    const n = t.explicitOrderBy.length > 0 ? t.explicitOrderBy[t.explicitOrderBy.length - 1].dir : "asc", r = function __PRIVATE_getInequalityFilterFields(e3) {
      let t2 = new SortedSet(FieldPath$1.comparator);
      return e3.filters.forEach((e4) => {
        e4.getFlattenedFilters().forEach((e5) => {
          e5.isInequality() && (t2 = t2.add(e5.field));
        });
      }), t2;
    }(t);
    r.forEach((r2) => {
      e2.has(r2.canonicalString()) || r2.isKeyField() || t.Ie.push(new OrderBy(r2, n));
    }), e2.has(FieldPath$1.keyField().canonicalString()) || t.Ie.push(new OrderBy(FieldPath$1.keyField(), n));
  }
  return t.Ie;
}
function __PRIVATE_queryToTarget(e) {
  const t = __PRIVATE_debugCast(e);
  return t.Ee || (t.Ee = __PRIVATE__queryToTarget(t, __PRIVATE_queryNormalizedOrderBy(e))), t.Ee;
}
function __PRIVATE__queryToTarget(e, t) {
  if (e.limitType === "F")
    return __PRIVATE_newTarget(e.path, e.collectionGroup, t, e.filters, e.limit, e.startAt, e.endAt);
  {
    t = t.map((e2) => {
      const t2 = e2.dir === "desc" ? "asc" : "desc";
      return new OrderBy(e2.field, t2);
    });
    const n = e.endAt ? new Bound(e.endAt.position, e.endAt.inclusive) : null, r = e.startAt ? new Bound(e.startAt.position, e.startAt.inclusive) : null;
    return __PRIVATE_newTarget(e.path, e.collectionGroup, t, e.filters, e.limit, n, r);
  }
}
function __PRIVATE_queryWithAddedFilter(e, t) {
  const n = e.filters.concat([t]);
  return new __PRIVATE_QueryImpl(e.path, e.collectionGroup, e.explicitOrderBy.slice(), n, e.limit, e.limitType, e.startAt, e.endAt);
}
function __PRIVATE_queryWithLimit(e, t, n) {
  return new __PRIVATE_QueryImpl(e.path, e.collectionGroup, e.explicitOrderBy.slice(), e.filters.slice(), t, n, e.startAt, e.endAt);
}
function __PRIVATE_queryEquals(e, t) {
  return __PRIVATE_targetEquals(__PRIVATE_queryToTarget(e), __PRIVATE_queryToTarget(t)) && e.limitType === t.limitType;
}
function __PRIVATE_canonifyQuery(e) {
  return `${__PRIVATE_canonifyTarget(__PRIVATE_queryToTarget(e))}|lt:${e.limitType}`;
}
function __PRIVATE_stringifyQuery(e) {
  return `Query(target=${function __PRIVATE_stringifyTarget(e2) {
    let t = e2.path.canonicalString();
    return e2.collectionGroup !== null && (t += " collectionGroup=" + e2.collectionGroup), e2.filters.length > 0 && (t += `, filters: [${e2.filters.map((e3) => __PRIVATE_stringifyFilter(e3)).join(", ")}]`), __PRIVATE_isNullOrUndefined(e2.limit) || (t += ", limit: " + e2.limit), e2.orderBy.length > 0 && (t += `, orderBy: [${e2.orderBy.map((e3) => function __PRIVATE_stringifyOrderBy(e4) {
      return `${e4.field.canonicalString()} (${e4.dir})`;
    }(e3)).join(", ")}]`), e2.startAt && (t += ", startAt: ", t += e2.startAt.inclusive ? "b:" : "a:", t += e2.startAt.position.map((e3) => canonicalId(e3)).join(",")), e2.endAt && (t += ", endAt: ", t += e2.endAt.inclusive ? "a:" : "b:", t += e2.endAt.position.map((e3) => canonicalId(e3)).join(",")), `Target(${t})`;
  }(__PRIVATE_queryToTarget(e))}; limitType=${e.limitType})`;
}
function __PRIVATE_queryMatches(e, t) {
  return t.isFoundDocument() && function __PRIVATE_queryMatchesPathAndCollectionGroup(e2, t2) {
    const n = t2.key.path;
    return e2.collectionGroup !== null ? t2.key.hasCollectionId(e2.collectionGroup) && e2.path.isPrefixOf(n) : DocumentKey.isDocumentKey(e2.path) ? e2.path.isEqual(n) : e2.path.isImmediateParentOf(n);
  }(e, t) && function __PRIVATE_queryMatchesOrderBy(e2, t2) {
    for (const n of __PRIVATE_queryNormalizedOrderBy(e2))
      if (!n.field.isKeyField() && t2.data.field(n.field) === null)
        return false;
    return true;
  }(e, t) && function __PRIVATE_queryMatchesFilters(e2, t2) {
    for (const n of e2.filters)
      if (!n.matches(t2))
        return false;
    return true;
  }(e, t) && function __PRIVATE_queryMatchesBounds(e2, t2) {
    if (e2.startAt && !function __PRIVATE_boundSortsBeforeDocument(e3, t3, n) {
      const r = __PRIVATE_boundCompareToDocument(e3, t3, n);
      return e3.inclusive ? r <= 0 : r < 0;
    }(e2.startAt, __PRIVATE_queryNormalizedOrderBy(e2), t2))
      return false;
    if (e2.endAt && !function __PRIVATE_boundSortsAfterDocument(e3, t3, n) {
      const r = __PRIVATE_boundCompareToDocument(e3, t3, n);
      return e3.inclusive ? r >= 0 : r > 0;
    }(e2.endAt, __PRIVATE_queryNormalizedOrderBy(e2), t2))
      return false;
    return true;
  }(e, t);
}
function __PRIVATE_queryCollectionGroup(e) {
  return e.collectionGroup || (e.path.length % 2 == 1 ? e.path.lastSegment() : e.path.get(e.path.length - 2));
}
function __PRIVATE_newQueryComparator(e) {
  return (t, n) => {
    let r = false;
    for (const i of __PRIVATE_queryNormalizedOrderBy(e)) {
      const e2 = __PRIVATE_compareDocs(i, t, n);
      if (e2 !== 0)
        return e2;
      r = r || i.field.isKeyField();
    }
    return 0;
  };
}
function __PRIVATE_compareDocs(e, t, n) {
  const r = e.field.isKeyField() ? DocumentKey.comparator(t.key, n.key) : function __PRIVATE_compareDocumentsByField(e2, t2, n2) {
    const r2 = t2.data.field(e2), i = n2.data.field(e2);
    return r2 !== null && i !== null ? __PRIVATE_valueCompare(r2, i) : fail(42886);
  }(e.field, t, n);
  switch (e.dir) {
    case "asc":
      return r;
    case "desc":
      return -1 * r;
    default:
      return fail(19790, {
        direction: e.dir
      });
  }
}

class ObjectMap {
  constructor(e, t) {
    this.mapKeyFn = e, this.equalsFn = t, this.inner = {}, this.innerSize = 0;
  }
  get(e) {
    const t = this.mapKeyFn(e), n = this.inner[t];
    if (n !== undefined) {
      for (const [t2, r] of n)
        if (this.equalsFn(t2, e))
          return r;
    }
  }
  has(e) {
    return this.get(e) !== undefined;
  }
  set(e, t) {
    const n = this.mapKeyFn(e), r = this.inner[n];
    if (r === undefined)
      return this.inner[n] = [[e, t]], void this.innerSize++;
    for (let n2 = 0;n2 < r.length; n2++)
      if (this.equalsFn(r[n2][0], e))
        return void (r[n2] = [e, t]);
    r.push([e, t]), this.innerSize++;
  }
  delete(e) {
    const t = this.mapKeyFn(e), n = this.inner[t];
    if (n === undefined)
      return false;
    for (let r = 0;r < n.length; r++)
      if (this.equalsFn(n[r][0], e))
        return n.length === 1 ? delete this.inner[t] : n.splice(r, 1), this.innerSize--, true;
    return false;
  }
  forEach(e) {
    forEach(this.inner, (t, n) => {
      for (const [t2, r] of n)
        e(t2, r);
    });
  }
  isEmpty() {
    return isEmpty(this.inner);
  }
  size() {
    return this.innerSize;
  }
}
var Rt = new SortedMap(DocumentKey.comparator);
function __PRIVATE_mutableDocumentMap() {
  return Rt;
}
var Vt = new SortedMap(DocumentKey.comparator);
function documentMap(...e) {
  let t = Vt;
  for (const n of e)
    t = t.insert(n.key, n);
  return t;
}
function __PRIVATE_convertOverlayedDocumentMapToDocumentMap(e) {
  let t = Vt;
  return e.forEach((e2, n) => t = t.insert(e2, n.overlayedDocument)), t;
}
function __PRIVATE_newOverlayMap() {
  return __PRIVATE_newDocumentKeyMap();
}
function __PRIVATE_newMutationMap() {
  return __PRIVATE_newDocumentKeyMap();
}
function __PRIVATE_newDocumentKeyMap() {
  return new ObjectMap((e) => e.toString(), (e, t) => e.isEqual(t));
}
var mt = new SortedMap(DocumentKey.comparator);
var ft = new SortedSet(DocumentKey.comparator);
function __PRIVATE_documentKeySet(...e) {
  let t = ft;
  for (const n of e)
    t = t.add(n);
  return t;
}
var gt = new SortedSet(__PRIVATE_primitiveComparator);
function __PRIVATE_targetIdSet() {
  return gt;
}
function __PRIVATE_toDouble(e, t) {
  if (e.useProto3Json) {
    if (isNaN(t))
      return {
        doubleValue: "NaN"
      };
    if (t === 1 / 0)
      return {
        doubleValue: "Infinity"
      };
    if (t === -1 / 0)
      return {
        doubleValue: "-Infinity"
      };
  }
  return {
    doubleValue: __PRIVATE_isNegativeZero(t) ? "-0" : t
  };
}
function __PRIVATE_toInteger(e) {
  return {
    integerValue: "" + e
  };
}
function toNumber(e, t) {
  return isSafeInteger(t) ? __PRIVATE_toInteger(t) : __PRIVATE_toDouble(e, t);
}

class TransformOperation {
  constructor() {
    this._ = undefined;
  }
}
function __PRIVATE_applyTransformOperationToLocalView(e, t, n) {
  return e instanceof __PRIVATE_ServerTimestampTransform ? function serverTimestamp$1(e2, t2) {
    const n2 = {
      fields: {
        [at]: {
          stringValue: _t
        },
        [ct]: {
          timestampValue: {
            seconds: e2.seconds,
            nanos: e2.nanoseconds
          }
        }
      }
    };
    return t2 && __PRIVATE_isServerTimestamp(t2) && (t2 = __PRIVATE_getPreviousValue(t2)), t2 && (n2.fields[ut] = t2), {
      mapValue: n2
    };
  }(n, t) : e instanceof __PRIVATE_ArrayUnionTransformOperation ? __PRIVATE_applyArrayUnionTransformOperation(e, t) : e instanceof __PRIVATE_ArrayRemoveTransformOperation ? __PRIVATE_applyArrayRemoveTransformOperation(e, t) : function __PRIVATE_applyNumericIncrementTransformOperationToLocalView(e2, t2) {
    const n2 = __PRIVATE_computeTransformOperationBaseValue(e2, t2), r = asNumber(n2) + asNumber(e2.Ae);
    return isInteger(n2) && isInteger(e2.Ae) ? __PRIVATE_toInteger(r) : __PRIVATE_toDouble(e2.serializer, r);
  }(e, t);
}
function __PRIVATE_applyTransformOperationToRemoteDocument(e, t, n) {
  return e instanceof __PRIVATE_ArrayUnionTransformOperation ? __PRIVATE_applyArrayUnionTransformOperation(e, t) : e instanceof __PRIVATE_ArrayRemoveTransformOperation ? __PRIVATE_applyArrayRemoveTransformOperation(e, t) : n;
}
function __PRIVATE_computeTransformOperationBaseValue(e, t) {
  return e instanceof __PRIVATE_NumericIncrementTransformOperation ? function __PRIVATE_isNumber(e2) {
    return isInteger(e2) || function __PRIVATE_isDouble(e3) {
      return !!e3 && "doubleValue" in e3;
    }(e2);
  }(t) ? t : {
    integerValue: 0
  } : null;
}

class __PRIVATE_ServerTimestampTransform extends TransformOperation {
}

class __PRIVATE_ArrayUnionTransformOperation extends TransformOperation {
  constructor(e) {
    super(), this.elements = e;
  }
}
function __PRIVATE_applyArrayUnionTransformOperation(e, t) {
  const n = __PRIVATE_coercedFieldValuesArray(t);
  for (const t2 of e.elements)
    n.some((e2) => __PRIVATE_valueEquals(e2, t2)) || n.push(t2);
  return {
    arrayValue: {
      values: n
    }
  };
}

class __PRIVATE_ArrayRemoveTransformOperation extends TransformOperation {
  constructor(e) {
    super(), this.elements = e;
  }
}
function __PRIVATE_applyArrayRemoveTransformOperation(e, t) {
  let n = __PRIVATE_coercedFieldValuesArray(t);
  for (const t2 of e.elements)
    n = n.filter((e2) => !__PRIVATE_valueEquals(e2, t2));
  return {
    arrayValue: {
      values: n
    }
  };
}

class __PRIVATE_NumericIncrementTransformOperation extends TransformOperation {
  constructor(e, t) {
    super(), this.serializer = e, this.Ae = t;
  }
}
function asNumber(e) {
  return __PRIVATE_normalizeNumber(e.integerValue || e.doubleValue);
}
function __PRIVATE_coercedFieldValuesArray(e) {
  return isArray(e) && e.arrayValue.values ? e.arrayValue.values.slice() : [];
}
function __PRIVATE_fieldTransformEquals(e, t) {
  return e.field.isEqual(t.field) && function __PRIVATE_transformOperationEquals(e2, t2) {
    return e2 instanceof __PRIVATE_ArrayUnionTransformOperation && t2 instanceof __PRIVATE_ArrayUnionTransformOperation || e2 instanceof __PRIVATE_ArrayRemoveTransformOperation && t2 instanceof __PRIVATE_ArrayRemoveTransformOperation ? __PRIVATE_arrayEquals(e2.elements, t2.elements, __PRIVATE_valueEquals) : e2 instanceof __PRIVATE_NumericIncrementTransformOperation && t2 instanceof __PRIVATE_NumericIncrementTransformOperation ? __PRIVATE_valueEquals(e2.Ae, t2.Ae) : e2 instanceof __PRIVATE_ServerTimestampTransform && t2 instanceof __PRIVATE_ServerTimestampTransform;
  }(e.transform, t.transform);
}

class MutationResult {
  constructor(e, t) {
    this.version = e, this.transformResults = t;
  }
}

class Precondition {
  constructor(e, t) {
    this.updateTime = e, this.exists = t;
  }
  static none() {
    return new Precondition;
  }
  static exists(e) {
    return new Precondition(undefined, e);
  }
  static updateTime(e) {
    return new Precondition(e);
  }
  get isNone() {
    return this.updateTime === undefined && this.exists === undefined;
  }
  isEqual(e) {
    return this.exists === e.exists && (this.updateTime ? !!e.updateTime && this.updateTime.isEqual(e.updateTime) : !e.updateTime);
  }
}
function __PRIVATE_preconditionIsValidForDocument(e, t) {
  return e.updateTime !== undefined ? t.isFoundDocument() && t.version.isEqual(e.updateTime) : e.exists === undefined || e.exists === t.isFoundDocument();
}

class Mutation {
}
function __PRIVATE_calculateOverlayMutation(e, t) {
  if (!e.hasLocalMutations || t && t.fields.length === 0)
    return null;
  if (t === null)
    return e.isNoDocument() ? new __PRIVATE_DeleteMutation(e.key, Precondition.none()) : new __PRIVATE_SetMutation(e.key, e.data, Precondition.none());
  {
    const n = e.data, r = ObjectValue.empty();
    let i = new SortedSet(FieldPath$1.comparator);
    for (let e2 of t.fields)
      if (!i.has(e2)) {
        let t2 = n.field(e2);
        t2 === null && e2.length > 1 && (e2 = e2.popLast(), t2 = n.field(e2)), t2 === null ? r.delete(e2) : r.set(e2, t2), i = i.add(e2);
      }
    return new __PRIVATE_PatchMutation(e.key, r, new FieldMask(i.toArray()), Precondition.none());
  }
}
function __PRIVATE_mutationApplyToRemoteDocument(e, t, n) {
  e instanceof __PRIVATE_SetMutation ? function __PRIVATE_setMutationApplyToRemoteDocument(e2, t2, n2) {
    const r = e2.value.clone(), i = __PRIVATE_serverTransformResults(e2.fieldTransforms, t2, n2.transformResults);
    r.setAll(i), t2.convertToFoundDocument(n2.version, r).setHasCommittedMutations();
  }(e, t, n) : e instanceof __PRIVATE_PatchMutation ? function __PRIVATE_patchMutationApplyToRemoteDocument(e2, t2, n2) {
    if (!__PRIVATE_preconditionIsValidForDocument(e2.precondition, t2))
      return void t2.convertToUnknownDocument(n2.version);
    const r = __PRIVATE_serverTransformResults(e2.fieldTransforms, t2, n2.transformResults), i = t2.data;
    i.setAll(__PRIVATE_getPatch(e2)), i.setAll(r), t2.convertToFoundDocument(n2.version, i).setHasCommittedMutations();
  }(e, t, n) : function __PRIVATE_deleteMutationApplyToRemoteDocument(e2, t2, n2) {
    t2.convertToNoDocument(n2.version).setHasCommittedMutations();
  }(0, t, n);
}
function __PRIVATE_mutationApplyToLocalView(e, t, n, r) {
  return e instanceof __PRIVATE_SetMutation ? function __PRIVATE_setMutationApplyToLocalView(e2, t2, n2, r2) {
    if (!__PRIVATE_preconditionIsValidForDocument(e2.precondition, t2))
      return n2;
    const i = e2.value.clone(), s = __PRIVATE_localTransformResults(e2.fieldTransforms, r2, t2);
    return i.setAll(s), t2.convertToFoundDocument(t2.version, i).setHasLocalMutations(), null;
  }(e, t, n, r) : e instanceof __PRIVATE_PatchMutation ? function __PRIVATE_patchMutationApplyToLocalView(e2, t2, n2, r2) {
    if (!__PRIVATE_preconditionIsValidForDocument(e2.precondition, t2))
      return n2;
    const i = __PRIVATE_localTransformResults(e2.fieldTransforms, r2, t2), s = t2.data;
    if (s.setAll(__PRIVATE_getPatch(e2)), s.setAll(i), t2.convertToFoundDocument(t2.version, s).setHasLocalMutations(), n2 === null)
      return null;
    return n2.unionWith(e2.fieldMask.fields).unionWith(e2.fieldTransforms.map((e3) => e3.field));
  }(e, t, n, r) : function __PRIVATE_deleteMutationApplyToLocalView(e2, t2, n2) {
    if (__PRIVATE_preconditionIsValidForDocument(e2.precondition, t2))
      return t2.convertToNoDocument(t2.version).setHasLocalMutations(), null;
    return n2;
  }(e, t, n);
}
function __PRIVATE_mutationExtractBaseValue(e, t) {
  let n = null;
  for (const r of e.fieldTransforms) {
    const e2 = t.data.field(r.field), i = __PRIVATE_computeTransformOperationBaseValue(r.transform, e2 || null);
    i != null && (n === null && (n = ObjectValue.empty()), n.set(r.field, i));
  }
  return n || null;
}
function __PRIVATE_mutationEquals(e, t) {
  return e.type === t.type && (!!e.key.isEqual(t.key) && (!!e.precondition.isEqual(t.precondition) && (!!function __PRIVATE_fieldTransformsAreEqual(e2, t2) {
    return e2 === undefined && t2 === undefined || !(!e2 || !t2) && __PRIVATE_arrayEquals(e2, t2, (e3, t3) => __PRIVATE_fieldTransformEquals(e3, t3));
  }(e.fieldTransforms, t.fieldTransforms) && (e.type === 0 ? e.value.isEqual(t.value) : e.type !== 1 || e.data.isEqual(t.data) && e.fieldMask.isEqual(t.fieldMask)))));
}

class __PRIVATE_SetMutation extends Mutation {
  constructor(e, t, n, r = []) {
    super(), this.key = e, this.value = t, this.precondition = n, this.fieldTransforms = r, this.type = 0;
  }
  getFieldMask() {
    return null;
  }
}

class __PRIVATE_PatchMutation extends Mutation {
  constructor(e, t, n, r, i = []) {
    super(), this.key = e, this.data = t, this.fieldMask = n, this.precondition = r, this.fieldTransforms = i, this.type = 1;
  }
  getFieldMask() {
    return this.fieldMask;
  }
}
function __PRIVATE_getPatch(e) {
  const t = new Map;
  return e.fieldMask.fields.forEach((n) => {
    if (!n.isEmpty()) {
      const r = e.data.field(n);
      t.set(n, r);
    }
  }), t;
}
function __PRIVATE_serverTransformResults(e, t, n) {
  const r = new Map;
  __PRIVATE_hardAssert(e.length === n.length, 32656, {
    Re: n.length,
    Ve: e.length
  });
  for (let i = 0;i < n.length; i++) {
    const s = e[i], o = s.transform, _ = t.data.field(s.field);
    r.set(s.field, __PRIVATE_applyTransformOperationToRemoteDocument(o, _, n[i]));
  }
  return r;
}
function __PRIVATE_localTransformResults(e, t, n) {
  const r = new Map;
  for (const i of e) {
    const e2 = i.transform, s = n.data.field(i.field);
    r.set(i.field, __PRIVATE_applyTransformOperationToLocalView(e2, s, t));
  }
  return r;
}

class __PRIVATE_DeleteMutation extends Mutation {
  constructor(e, t) {
    super(), this.key = e, this.precondition = t, this.type = 2, this.fieldTransforms = [];
  }
  getFieldMask() {
    return null;
  }
}

class __PRIVATE_VerifyMutation extends Mutation {
  constructor(e, t) {
    super(), this.key = e, this.precondition = t, this.type = 3, this.fieldTransforms = [];
  }
  getFieldMask() {
    return null;
  }
}

class MutationBatch {
  constructor(e, t, n, r) {
    this.batchId = e, this.localWriteTime = t, this.baseMutations = n, this.mutations = r;
  }
  applyToRemoteDocument(e, t) {
    const n = t.mutationResults;
    for (let t2 = 0;t2 < this.mutations.length; t2++) {
      const r = this.mutations[t2];
      if (r.key.isEqual(e.key)) {
        __PRIVATE_mutationApplyToRemoteDocument(r, e, n[t2]);
      }
    }
  }
  applyToLocalView(e, t) {
    for (const n of this.baseMutations)
      n.key.isEqual(e.key) && (t = __PRIVATE_mutationApplyToLocalView(n, e, t, this.localWriteTime));
    for (const n of this.mutations)
      n.key.isEqual(e.key) && (t = __PRIVATE_mutationApplyToLocalView(n, e, t, this.localWriteTime));
    return t;
  }
  applyToLocalDocumentSet(e, t) {
    const n = __PRIVATE_newMutationMap();
    return this.mutations.forEach((r) => {
      const i = e.get(r.key), s = i.overlayedDocument;
      let o = this.applyToLocalView(s, i.mutatedFields);
      o = t.has(r.key) ? null : o;
      const _ = __PRIVATE_calculateOverlayMutation(s, o);
      _ !== null && n.set(r.key, _), s.isValidDocument() || s.convertToNoDocument(SnapshotVersion.min());
    }), n;
  }
  keys() {
    return this.mutations.reduce((e, t) => e.add(t.key), __PRIVATE_documentKeySet());
  }
  isEqual(e) {
    return this.batchId === e.batchId && __PRIVATE_arrayEquals(this.mutations, e.mutations, (e2, t) => __PRIVATE_mutationEquals(e2, t)) && __PRIVATE_arrayEquals(this.baseMutations, e.baseMutations, (e2, t) => __PRIVATE_mutationEquals(e2, t));
  }
}

class MutationBatchResult {
  constructor(e, t, n, r) {
    this.batch = e, this.commitVersion = t, this.mutationResults = n, this.docVersions = r;
  }
  static from(e, t, n) {
    __PRIVATE_hardAssert(e.mutations.length === n.length, 58842, {
      me: e.mutations.length,
      fe: n.length
    });
    let r = function __PRIVATE_documentVersionMap() {
      return mt;
    }();
    const i = e.mutations;
    for (let e2 = 0;e2 < i.length; e2++)
      r = r.insert(i[e2].key, n[e2].version);
    return new MutationBatchResult(e, t, n, r);
  }
}

class Overlay {
  constructor(e, t) {
    this.largestBatchId = e, this.mutation = t;
  }
  getKey() {
    return this.mutation.key;
  }
  isEqual(e) {
    return e !== null && this.mutation === e.mutation;
  }
  toString() {
    return `Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`;
  }
}
class ExistenceFilter {
  constructor(e, t) {
    this.count = e, this.unchangedNames = t;
  }
}
var pt;
var yt;
function __PRIVATE_isPermanentError(e) {
  switch (e) {
    case N.OK:
      return fail(64938);
    case N.CANCELLED:
    case N.UNKNOWN:
    case N.DEADLINE_EXCEEDED:
    case N.RESOURCE_EXHAUSTED:
    case N.INTERNAL:
    case N.UNAVAILABLE:
    case N.UNAUTHENTICATED:
      return false;
    case N.INVALID_ARGUMENT:
    case N.NOT_FOUND:
    case N.ALREADY_EXISTS:
    case N.PERMISSION_DENIED:
    case N.FAILED_PRECONDITION:
    case N.ABORTED:
    case N.OUT_OF_RANGE:
    case N.UNIMPLEMENTED:
    case N.DATA_LOSS:
      return true;
    default:
      return fail(15467, {
        code: e
      });
  }
}
function __PRIVATE_mapCodeFromRpcCode(e) {
  if (e === undefined)
    return __PRIVATE_logError("GRPC error has no .code"), N.UNKNOWN;
  switch (e) {
    case pt.OK:
      return N.OK;
    case pt.CANCELLED:
      return N.CANCELLED;
    case pt.UNKNOWN:
      return N.UNKNOWN;
    case pt.DEADLINE_EXCEEDED:
      return N.DEADLINE_EXCEEDED;
    case pt.RESOURCE_EXHAUSTED:
      return N.RESOURCE_EXHAUSTED;
    case pt.INTERNAL:
      return N.INTERNAL;
    case pt.UNAVAILABLE:
      return N.UNAVAILABLE;
    case pt.UNAUTHENTICATED:
      return N.UNAUTHENTICATED;
    case pt.INVALID_ARGUMENT:
      return N.INVALID_ARGUMENT;
    case pt.NOT_FOUND:
      return N.NOT_FOUND;
    case pt.ALREADY_EXISTS:
      return N.ALREADY_EXISTS;
    case pt.PERMISSION_DENIED:
      return N.PERMISSION_DENIED;
    case pt.FAILED_PRECONDITION:
      return N.FAILED_PRECONDITION;
    case pt.ABORTED:
      return N.ABORTED;
    case pt.OUT_OF_RANGE:
      return N.OUT_OF_RANGE;
    case pt.UNIMPLEMENTED:
      return N.UNIMPLEMENTED;
    case pt.DATA_LOSS:
      return N.DATA_LOSS;
    default:
      return fail(39323, {
        code: e
      });
  }
}
(yt = pt || (pt = {}))[yt.OK = 0] = "OK", yt[yt.CANCELLED = 1] = "CANCELLED", yt[yt.UNKNOWN = 2] = "UNKNOWN", yt[yt.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", yt[yt.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", yt[yt.NOT_FOUND = 5] = "NOT_FOUND", yt[yt.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", yt[yt.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", yt[yt.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", yt[yt.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", yt[yt.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", yt[yt.ABORTED = 10] = "ABORTED", yt[yt.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", yt[yt.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", yt[yt.INTERNAL = 13] = "INTERNAL", yt[yt.UNAVAILABLE = 14] = "UNAVAILABLE", yt[yt.DATA_LOSS = 15] = "DATA_LOSS";
var wt = null;
function __PRIVATE_newTextEncoder() {
  return new TextEncoder;
}
var St = new Integer([4294967295, 4294967295], 0);
function __PRIVATE_getMd5HashValue(e) {
  const t = __PRIVATE_newTextEncoder().encode(e), n = new Md5;
  return n.update(t), new Uint8Array(n.digest());
}
function __PRIVATE_get64BitUints(e) {
  const t = new DataView(e.buffer), n = t.getUint32(0, true), r = t.getUint32(4, true), i = t.getUint32(8, true), s = t.getUint32(12, true);
  return [new Integer([n, r], 0), new Integer([i, s], 0)];
}

class BloomFilter {
  constructor(e, t, n) {
    if (this.bitmap = e, this.padding = t, this.hashCount = n, t < 0 || t >= 8)
      throw new __PRIVATE_BloomFilterError(`Invalid padding: ${t}`);
    if (n < 0)
      throw new __PRIVATE_BloomFilterError(`Invalid hash count: ${n}`);
    if (e.length > 0 && this.hashCount === 0)
      throw new __PRIVATE_BloomFilterError(`Invalid hash count: ${n}`);
    if (e.length === 0 && t !== 0)
      throw new __PRIVATE_BloomFilterError(`Invalid padding when bitmap length is 0: ${t}`);
    this.ge = 8 * e.length - t, this.pe = Integer.fromNumber(this.ge);
  }
  ye(e, t, n) {
    let r = e.add(t.multiply(Integer.fromNumber(n)));
    return r.compare(St) === 1 && (r = new Integer([r.getBits(0), r.getBits(1)], 0)), r.modulo(this.pe).toNumber();
  }
  we(e) {
    return !!(this.bitmap[Math.floor(e / 8)] & 1 << e % 8);
  }
  mightContain(e) {
    if (this.ge === 0)
      return false;
    const t = __PRIVATE_getMd5HashValue(e), [n, r] = __PRIVATE_get64BitUints(t);
    for (let e2 = 0;e2 < this.hashCount; e2++) {
      const t2 = this.ye(n, r, e2);
      if (!this.we(t2))
        return false;
    }
    return true;
  }
  static create(e, t, n) {
    const r = e % 8 == 0 ? 0 : 8 - e % 8, i = new Uint8Array(Math.ceil(e / 8)), s = new BloomFilter(i, r, t);
    return n.forEach((e2) => s.insert(e2)), s;
  }
  insert(e) {
    if (this.ge === 0)
      return;
    const t = __PRIVATE_getMd5HashValue(e), [n, r] = __PRIVATE_get64BitUints(t);
    for (let e2 = 0;e2 < this.hashCount; e2++) {
      const t2 = this.ye(n, r, e2);
      this.Se(t2);
    }
  }
  Se(e) {
    const t = Math.floor(e / 8), n = e % 8;
    this.bitmap[t] |= 1 << n;
  }
}

class __PRIVATE_BloomFilterError extends Error {
  constructor() {
    super(...arguments), this.name = "BloomFilterError";
  }
}

class RemoteEvent {
  constructor(e, t, n, r, i) {
    this.snapshotVersion = e, this.targetChanges = t, this.targetMismatches = n, this.documentUpdates = r, this.resolvedLimboDocuments = i;
  }
  static createSynthesizedRemoteEventForCurrentChange(e, t, n) {
    const r = new Map;
    return r.set(e, TargetChange.createSynthesizedTargetChangeForCurrentChange(e, t, n)), new RemoteEvent(SnapshotVersion.min(), r, new SortedMap(__PRIVATE_primitiveComparator), __PRIVATE_mutableDocumentMap(), __PRIVATE_documentKeySet());
  }
}

class TargetChange {
  constructor(e, t, n, r, i) {
    this.resumeToken = e, this.current = t, this.addedDocuments = n, this.modifiedDocuments = r, this.removedDocuments = i;
  }
  static createSynthesizedTargetChangeForCurrentChange(e, t, n) {
    return new TargetChange(n, t, __PRIVATE_documentKeySet(), __PRIVATE_documentKeySet(), __PRIVATE_documentKeySet());
  }
}

class __PRIVATE_DocumentWatchChange {
  constructor(e, t, n, r) {
    this.be = e, this.removedTargetIds = t, this.key = n, this.De = r;
  }
}

class __PRIVATE_ExistenceFilterChange {
  constructor(e, t) {
    this.targetId = e, this.Ce = t;
  }
}

class __PRIVATE_WatchTargetChange {
  constructor(e, t, n = ByteString.EMPTY_BYTE_STRING, r = null) {
    this.state = e, this.targetIds = t, this.resumeToken = n, this.cause = r;
  }
}

class __PRIVATE_TargetState {
  constructor() {
    this.ve = 0, this.Fe = __PRIVATE_snapshotChangesMap(), this.Me = ByteString.EMPTY_BYTE_STRING, this.xe = false, this.Oe = true;
  }
  get current() {
    return this.xe;
  }
  get resumeToken() {
    return this.Me;
  }
  get Ne() {
    return this.ve !== 0;
  }
  get Be() {
    return this.Oe;
  }
  Le(e) {
    e.approximateByteSize() > 0 && (this.Oe = true, this.Me = e);
  }
  ke() {
    let e = __PRIVATE_documentKeySet(), t = __PRIVATE_documentKeySet(), n = __PRIVATE_documentKeySet();
    return this.Fe.forEach((r, i) => {
      switch (i) {
        case 0:
          e = e.add(r);
          break;
        case 2:
          t = t.add(r);
          break;
        case 1:
          n = n.add(r);
          break;
        default:
          fail(38017, {
            changeType: i
          });
      }
    }), new TargetChange(this.Me, this.xe, e, t, n);
  }
  qe() {
    this.Oe = false, this.Fe = __PRIVATE_snapshotChangesMap();
  }
  Qe(e, t) {
    this.Oe = true, this.Fe = this.Fe.insert(e, t);
  }
  $e(e) {
    this.Oe = true, this.Fe = this.Fe.remove(e);
  }
  Ue() {
    this.ve += 1;
  }
  Ke() {
    this.ve -= 1, __PRIVATE_hardAssert(this.ve >= 0, 3241, {
      ve: this.ve
    });
  }
  We() {
    this.Oe = true, this.xe = true;
  }
}

class __PRIVATE_WatchChangeAggregator {
  constructor(e) {
    this.Ge = e, this.ze = new Map, this.je = __PRIVATE_mutableDocumentMap(), this.Je = __PRIVATE_documentTargetMap(), this.He = __PRIVATE_documentTargetMap(), this.Ye = new SortedMap(__PRIVATE_primitiveComparator);
  }
  Ze(e) {
    for (const t of e.be)
      e.De && e.De.isFoundDocument() ? this.Xe(t, e.De) : this.et(t, e.key, e.De);
    for (const t of e.removedTargetIds)
      this.et(t, e.key, e.De);
  }
  tt(e) {
    this.forEachTarget(e, (t) => {
      const n = this.nt(t);
      switch (e.state) {
        case 0:
          this.rt(t) && n.Le(e.resumeToken);
          break;
        case 1:
          n.Ke(), n.Ne || n.qe(), n.Le(e.resumeToken);
          break;
        case 2:
          n.Ke(), n.Ne || this.removeTarget(t);
          break;
        case 3:
          this.rt(t) && (n.We(), n.Le(e.resumeToken));
          break;
        case 4:
          this.rt(t) && (this.it(t), n.Le(e.resumeToken));
          break;
        default:
          fail(56790, {
            state: e.state
          });
      }
    });
  }
  forEachTarget(e, t) {
    e.targetIds.length > 0 ? e.targetIds.forEach(t) : this.ze.forEach((e2, n) => {
      this.rt(n) && t(n);
    });
  }
  st(e) {
    const t = e.targetId, n = e.Ce.count, r = this.ot(t);
    if (r) {
      const i = r.target;
      if (__PRIVATE_targetIsDocumentTarget(i))
        if (n === 0) {
          const e2 = new DocumentKey(i.path);
          this.et(t, e2, MutableDocument.newNoDocument(e2, SnapshotVersion.min()));
        } else
          __PRIVATE_hardAssert(n === 1, 20013, {
            expectedCount: n
          });
      else {
        const r2 = this._t(t);
        if (r2 !== n) {
          const n2 = this.ut(e), i2 = n2 ? this.ct(n2, e, r2) : 1;
          if (i2 !== 0) {
            this.it(t);
            const e2 = i2 === 2 ? "TargetPurposeExistenceFilterMismatchBloom" : "TargetPurposeExistenceFilterMismatch";
            this.Ye = this.Ye.insert(t, e2);
          }
          wt?.lt(function __PRIVATE_createExistenceFilterMismatchInfoForTestingHooks(e2, t2, n3, r3, i3) {
            const s = {
              localCacheCount: e2,
              existenceFilterCount: t2.count,
              databaseId: n3.database,
              projectId: n3.projectId
            }, o = t2.unchangedNames;
            o && (s.bloomFilter = {
              applied: i3 === 0,
              hashCount: o?.hashCount ?? 0,
              bitmapLength: o?.bits?.bitmap?.length ?? 0,
              padding: o?.bits?.padding ?? 0,
              mightContain: (e3) => r3?.mightContain(e3) ?? false
            });
            return s;
          }(r2, e.Ce, this.Ge.ht(), n2, i2));
        }
      }
    }
  }
  ut(e) {
    const t = e.Ce.unchangedNames;
    if (!t || !t.bits)
      return null;
    const { bits: { bitmap: n = "", padding: r = 0 }, hashCount: i = 0 } = t;
    let s, o;
    try {
      s = __PRIVATE_normalizeByteString(n).toUint8Array();
    } catch (e2) {
      if (e2 instanceof __PRIVATE_Base64DecodeError)
        return __PRIVATE_logWarn("Decoding the base64 bloom filter in existence filter failed (" + e2.message + "); ignoring the bloom filter and falling back to full re-query."), null;
      throw e2;
    }
    try {
      o = new BloomFilter(s, r, i);
    } catch (e2) {
      return __PRIVATE_logWarn(e2 instanceof __PRIVATE_BloomFilterError ? "BloomFilter error: " : "Applying bloom filter failed: ", e2), null;
    }
    return o.ge === 0 ? null : o;
  }
  ct(e, t, n) {
    return t.Ce.count === n - this.Pt(e, t.targetId) ? 0 : 2;
  }
  Pt(e, t) {
    const n = this.Ge.getRemoteKeysForTarget(t);
    let r = 0;
    return n.forEach((n2) => {
      const i = this.Ge.ht(), s = `projects/${i.projectId}/databases/${i.database}/documents/${n2.path.canonicalString()}`;
      e.mightContain(s) || (this.et(t, n2, null), r++);
    }), r;
  }
  Tt(e) {
    const t = new Map;
    this.ze.forEach((n2, r2) => {
      const i = this.ot(r2);
      if (i) {
        if (n2.current && __PRIVATE_targetIsDocumentTarget(i.target)) {
          const t2 = new DocumentKey(i.target.path);
          this.It(t2).has(r2) || this.Et(r2, t2) || this.et(r2, t2, MutableDocument.newNoDocument(t2, e));
        }
        n2.Be && (t.set(r2, n2.ke()), n2.qe());
      }
    });
    let n = __PRIVATE_documentKeySet();
    this.He.forEach((e2, t2) => {
      let r2 = true;
      t2.forEachWhile((e3) => {
        const t3 = this.ot(e3);
        return !t3 || t3.purpose === "TargetPurposeLimboResolution" || (r2 = false, false);
      }), r2 && (n = n.add(e2));
    }), this.je.forEach((t2, n2) => n2.setReadTime(e));
    const r = new RemoteEvent(e, t, this.Ye, this.je, n);
    return this.je = __PRIVATE_mutableDocumentMap(), this.Je = __PRIVATE_documentTargetMap(), this.He = __PRIVATE_documentTargetMap(), this.Ye = new SortedMap(__PRIVATE_primitiveComparator), r;
  }
  Xe(e, t) {
    if (!this.rt(e))
      return;
    const n = this.Et(e, t.key) ? 2 : 0;
    this.nt(e).Qe(t.key, n), this.je = this.je.insert(t.key, t), this.Je = this.Je.insert(t.key, this.It(t.key).add(e)), this.He = this.He.insert(t.key, this.dt(t.key).add(e));
  }
  et(e, t, n) {
    if (!this.rt(e))
      return;
    const r = this.nt(e);
    this.Et(e, t) ? r.Qe(t, 1) : r.$e(t), this.He = this.He.insert(t, this.dt(t).delete(e)), this.He = this.He.insert(t, this.dt(t).add(e)), n && (this.je = this.je.insert(t, n));
  }
  removeTarget(e) {
    this.ze.delete(e);
  }
  _t(e) {
    const t = this.nt(e).ke();
    return this.Ge.getRemoteKeysForTarget(e).size + t.addedDocuments.size - t.removedDocuments.size;
  }
  Ue(e) {
    this.nt(e).Ue();
  }
  nt(e) {
    let t = this.ze.get(e);
    return t || (t = new __PRIVATE_TargetState, this.ze.set(e, t)), t;
  }
  dt(e) {
    let t = this.He.get(e);
    return t || (t = new SortedSet(__PRIVATE_primitiveComparator), this.He = this.He.insert(e, t)), t;
  }
  It(e) {
    let t = this.Je.get(e);
    return t || (t = new SortedSet(__PRIVATE_primitiveComparator), this.Je = this.Je.insert(e, t)), t;
  }
  rt(e) {
    const t = this.ot(e) !== null;
    return t || __PRIVATE_logDebug("WatchChangeAggregator", "Detected inactive target", e), t;
  }
  ot(e) {
    const t = this.ze.get(e);
    return t && t.Ne ? null : this.Ge.At(e);
  }
  it(e) {
    this.ze.set(e, new __PRIVATE_TargetState);
    this.Ge.getRemoteKeysForTarget(e).forEach((t) => {
      this.et(e, t, null);
    });
  }
  Et(e, t) {
    return this.Ge.getRemoteKeysForTarget(e).has(t);
  }
}
function __PRIVATE_documentTargetMap() {
  return new SortedMap(DocumentKey.comparator);
}
function __PRIVATE_snapshotChangesMap() {
  return new SortedMap(DocumentKey.comparator);
}
var bt = (() => {
  const e = {
    asc: "ASCENDING",
    desc: "DESCENDING"
  };
  return e;
})();
var Dt = (() => {
  const e = {
    "<": "LESS_THAN",
    "<=": "LESS_THAN_OR_EQUAL",
    ">": "GREATER_THAN",
    ">=": "GREATER_THAN_OR_EQUAL",
    "==": "EQUAL",
    "!=": "NOT_EQUAL",
    "array-contains": "ARRAY_CONTAINS",
    in: "IN",
    "not-in": "NOT_IN",
    "array-contains-any": "ARRAY_CONTAINS_ANY"
  };
  return e;
})();
var Ct = (() => {
  const e = {
    and: "AND",
    or: "OR"
  };
  return e;
})();

class JsonProtoSerializer {
  constructor(e, t) {
    this.databaseId = e, this.useProto3Json = t;
  }
}
function __PRIVATE_toInt32Proto(e, t) {
  return e.useProto3Json || __PRIVATE_isNullOrUndefined(t) ? t : {
    value: t
  };
}
function toTimestamp(e, t) {
  if (e.useProto3Json) {
    return `${new Date(1000 * t.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "")}.${("000000000" + t.nanoseconds).slice(-9)}Z`;
  }
  return {
    seconds: "" + t.seconds,
    nanos: t.nanoseconds
  };
}
function __PRIVATE_toBytes(e, t) {
  return e.useProto3Json ? t.toBase64() : t.toUint8Array();
}
function __PRIVATE_toVersion(e, t) {
  return toTimestamp(e, t.toTimestamp());
}
function __PRIVATE_fromVersion(e) {
  return __PRIVATE_hardAssert(!!e, 49232), SnapshotVersion.fromTimestamp(function fromTimestamp(e2) {
    const t = __PRIVATE_normalizeTimestamp(e2);
    return new Timestamp(t.seconds, t.nanos);
  }(e));
}
function __PRIVATE_toResourceName(e, t) {
  return __PRIVATE_toResourcePath(e, t).canonicalString();
}
function __PRIVATE_toResourcePath(e, t) {
  const n = function __PRIVATE_fullyQualifiedPrefixPath(e2) {
    return new ResourcePath(["projects", e2.projectId, "databases", e2.database]);
  }(e).child("documents");
  return t === undefined ? n : n.child(t);
}
function __PRIVATE_fromResourceName(e) {
  const t = ResourcePath.fromString(e);
  return __PRIVATE_hardAssert(__PRIVATE_isValidResourceName(t), 10190, {
    key: t.toString()
  }), t;
}
function __PRIVATE_toName(e, t) {
  return __PRIVATE_toResourceName(e.databaseId, t.path);
}
function fromName(e, t) {
  const n = __PRIVATE_fromResourceName(t);
  if (n.get(1) !== e.databaseId.projectId)
    throw new FirestoreError(N.INVALID_ARGUMENT, "Tried to deserialize key from different project: " + n.get(1) + " vs " + e.databaseId.projectId);
  if (n.get(3) !== e.databaseId.database)
    throw new FirestoreError(N.INVALID_ARGUMENT, "Tried to deserialize key from different database: " + n.get(3) + " vs " + e.databaseId.database);
  return new DocumentKey(__PRIVATE_extractLocalPathFromResourceName(n));
}
function __PRIVATE_toQueryPath(e, t) {
  return __PRIVATE_toResourceName(e.databaseId, t);
}
function __PRIVATE_fromQueryPath(e) {
  const t = __PRIVATE_fromResourceName(e);
  return t.length === 4 ? ResourcePath.emptyPath() : __PRIVATE_extractLocalPathFromResourceName(t);
}
function __PRIVATE_getEncodedDatabaseId(e) {
  return new ResourcePath(["projects", e.databaseId.projectId, "databases", e.databaseId.database]).canonicalString();
}
function __PRIVATE_extractLocalPathFromResourceName(e) {
  return __PRIVATE_hardAssert(e.length > 4 && e.get(4) === "documents", 29091, {
    key: e.toString()
  }), e.popFirst(5);
}
function __PRIVATE_toMutationDocument(e, t, n) {
  return {
    name: __PRIVATE_toName(e, t),
    fields: n.value.mapValue.fields
  };
}
function __PRIVATE_fromWatchChange(e, t) {
  let n;
  if ("targetChange" in t) {
    t.targetChange;
    const r = function __PRIVATE_fromWatchTargetChangeState(e2) {
      return e2 === "NO_CHANGE" ? 0 : e2 === "ADD" ? 1 : e2 === "REMOVE" ? 2 : e2 === "CURRENT" ? 3 : e2 === "RESET" ? 4 : fail(39313, {
        state: e2
      });
    }(t.targetChange.targetChangeType || "NO_CHANGE"), i = t.targetChange.targetIds || [], s = function __PRIVATE_fromBytes(e2, t2) {
      return e2.useProto3Json ? (__PRIVATE_hardAssert(t2 === undefined || typeof t2 == "string", 58123), ByteString.fromBase64String(t2 || "")) : (__PRIVATE_hardAssert(t2 === undefined || t2 instanceof Buffer || t2 instanceof Uint8Array, 16193), ByteString.fromUint8Array(t2 || new Uint8Array));
    }(e, t.targetChange.resumeToken), o = t.targetChange.cause, _ = o && function __PRIVATE_fromRpcStatus(e2) {
      const t2 = e2.code === undefined ? N.UNKNOWN : __PRIVATE_mapCodeFromRpcCode(e2.code);
      return new FirestoreError(t2, e2.message || "");
    }(o);
    n = new __PRIVATE_WatchTargetChange(r, i, s, _ || null);
  } else if ("documentChange" in t) {
    t.documentChange;
    const r = t.documentChange;
    r.document, r.document.name, r.document.updateTime;
    const i = fromName(e, r.document.name), s = __PRIVATE_fromVersion(r.document.updateTime), o = r.document.createTime ? __PRIVATE_fromVersion(r.document.createTime) : SnapshotVersion.min(), _ = new ObjectValue({
      mapValue: {
        fields: r.document.fields
      }
    }), a = MutableDocument.newFoundDocument(i, s, o, _), u = r.targetIds || [], c = r.removedTargetIds || [];
    n = new __PRIVATE_DocumentWatchChange(u, c, a.key, a);
  } else if ("documentDelete" in t) {
    t.documentDelete;
    const r = t.documentDelete;
    r.document;
    const i = fromName(e, r.document), s = r.readTime ? __PRIVATE_fromVersion(r.readTime) : SnapshotVersion.min(), o = MutableDocument.newNoDocument(i, s), _ = r.removedTargetIds || [];
    n = new __PRIVATE_DocumentWatchChange([], _, o.key, o);
  } else if ("documentRemove" in t) {
    t.documentRemove;
    const r = t.documentRemove;
    r.document;
    const i = fromName(e, r.document), s = r.removedTargetIds || [];
    n = new __PRIVATE_DocumentWatchChange([], s, i, null);
  } else {
    if (!("filter" in t))
      return fail(11601, {
        Rt: t
      });
    {
      t.filter;
      const e2 = t.filter;
      e2.targetId;
      const { count: r = 0, unchangedNames: i } = e2, s = new ExistenceFilter(r, i), o = e2.targetId;
      n = new __PRIVATE_ExistenceFilterChange(o, s);
    }
  }
  return n;
}
function toMutation(e, t) {
  let n;
  if (t instanceof __PRIVATE_SetMutation)
    n = {
      update: __PRIVATE_toMutationDocument(e, t.key, t.value)
    };
  else if (t instanceof __PRIVATE_DeleteMutation)
    n = {
      delete: __PRIVATE_toName(e, t.key)
    };
  else if (t instanceof __PRIVATE_PatchMutation)
    n = {
      update: __PRIVATE_toMutationDocument(e, t.key, t.data),
      updateMask: __PRIVATE_toDocumentMask(t.fieldMask)
    };
  else {
    if (!(t instanceof __PRIVATE_VerifyMutation))
      return fail(16599, {
        Vt: t.type
      });
    n = {
      verify: __PRIVATE_toName(e, t.key)
    };
  }
  return t.fieldTransforms.length > 0 && (n.updateTransforms = t.fieldTransforms.map((e2) => function __PRIVATE_toFieldTransform(e3, t2) {
    const n2 = t2.transform;
    if (n2 instanceof __PRIVATE_ServerTimestampTransform)
      return {
        fieldPath: t2.field.canonicalString(),
        setToServerValue: "REQUEST_TIME"
      };
    if (n2 instanceof __PRIVATE_ArrayUnionTransformOperation)
      return {
        fieldPath: t2.field.canonicalString(),
        appendMissingElements: {
          values: n2.elements
        }
      };
    if (n2 instanceof __PRIVATE_ArrayRemoveTransformOperation)
      return {
        fieldPath: t2.field.canonicalString(),
        removeAllFromArray: {
          values: n2.elements
        }
      };
    if (n2 instanceof __PRIVATE_NumericIncrementTransformOperation)
      return {
        fieldPath: t2.field.canonicalString(),
        increment: n2.Ae
      };
    throw fail(20930, {
      transform: t2.transform
    });
  }(0, e2))), t.precondition.isNone || (n.currentDocument = function __PRIVATE_toPrecondition(e2, t2) {
    return t2.updateTime !== undefined ? {
      updateTime: __PRIVATE_toVersion(e2, t2.updateTime)
    } : t2.exists !== undefined ? {
      exists: t2.exists
    } : fail(27497);
  }(e, t.precondition)), n;
}
function __PRIVATE_fromWriteResults(e, t) {
  return e && e.length > 0 ? (__PRIVATE_hardAssert(t !== undefined, 14353), e.map((e2) => function __PRIVATE_fromWriteResult(e3, t2) {
    let n = e3.updateTime ? __PRIVATE_fromVersion(e3.updateTime) : __PRIVATE_fromVersion(t2);
    return n.isEqual(SnapshotVersion.min()) && (n = __PRIVATE_fromVersion(t2)), new MutationResult(n, e3.transformResults || []);
  }(e2, t))) : [];
}
function __PRIVATE_toDocumentsTarget(e, t) {
  return {
    documents: [__PRIVATE_toQueryPath(e, t.path)]
  };
}
function __PRIVATE_toQueryTarget(e, t) {
  const n = {
    structuredQuery: {}
  }, r = t.path;
  let i;
  t.collectionGroup !== null ? (i = r, n.structuredQuery.from = [{
    collectionId: t.collectionGroup,
    allDescendants: true
  }]) : (i = r.popLast(), n.structuredQuery.from = [{
    collectionId: r.lastSegment()
  }]), n.parent = __PRIVATE_toQueryPath(e, i);
  const s = function __PRIVATE_toFilters(e2) {
    if (e2.length === 0)
      return;
    return __PRIVATE_toFilter(CompositeFilter.create(e2, "and"));
  }(t.filters);
  s && (n.structuredQuery.where = s);
  const o = function __PRIVATE_toOrder(e2) {
    if (e2.length === 0)
      return;
    return e2.map((e3) => function __PRIVATE_toPropertyOrder(e4) {
      return {
        field: __PRIVATE_toFieldPathReference(e4.field),
        direction: __PRIVATE_toDirection(e4.dir)
      };
    }(e3));
  }(t.orderBy);
  o && (n.structuredQuery.orderBy = o);
  const _ = __PRIVATE_toInt32Proto(e, t.limit);
  return _ !== null && (n.structuredQuery.limit = _), t.startAt && (n.structuredQuery.startAt = function __PRIVATE_toStartAtCursor(e2) {
    return {
      before: e2.inclusive,
      values: e2.position
    };
  }(t.startAt)), t.endAt && (n.structuredQuery.endAt = function __PRIVATE_toEndAtCursor(e2) {
    return {
      before: !e2.inclusive,
      values: e2.position
    };
  }(t.endAt)), {
    ft: n,
    parent: i
  };
}
function __PRIVATE_convertQueryTargetToQuery(e) {
  let t = __PRIVATE_fromQueryPath(e.parent);
  const n = e.structuredQuery, r = n.from ? n.from.length : 0;
  let i = null;
  if (r > 0) {
    __PRIVATE_hardAssert(r === 1, 65062);
    const e2 = n.from[0];
    e2.allDescendants ? i = e2.collectionId : t = t.child(e2.collectionId);
  }
  let s = [];
  n.where && (s = function __PRIVATE_fromFilters(e2) {
    const t2 = __PRIVATE_fromFilter(e2);
    if (t2 instanceof CompositeFilter && __PRIVATE_compositeFilterIsFlatConjunction(t2))
      return t2.getFilters();
    return [t2];
  }(n.where));
  let o = [];
  n.orderBy && (o = function __PRIVATE_fromOrder(e2) {
    return e2.map((e3) => function __PRIVATE_fromPropertyOrder(e4) {
      return new OrderBy(__PRIVATE_fromFieldPathReference(e4.field), function __PRIVATE_fromDirection(e5) {
        switch (e5) {
          case "ASCENDING":
            return "asc";
          case "DESCENDING":
            return "desc";
          default:
            return;
        }
      }(e4.direction));
    }(e3));
  }(n.orderBy));
  let _ = null;
  n.limit && (_ = function __PRIVATE_fromInt32Proto(e2) {
    let t2;
    return t2 = typeof e2 == "object" ? e2.value : e2, __PRIVATE_isNullOrUndefined(t2) ? null : t2;
  }(n.limit));
  let a = null;
  n.startAt && (a = function __PRIVATE_fromStartAtCursor(e2) {
    const t2 = !!e2.before, n2 = e2.values || [];
    return new Bound(n2, t2);
  }(n.startAt));
  let u = null;
  return n.endAt && (u = function __PRIVATE_fromEndAtCursor(e2) {
    const t2 = !e2.before, n2 = e2.values || [];
    return new Bound(n2, t2);
  }(n.endAt)), __PRIVATE_newQuery(t, i, o, s, _, "F", a, u);
}
function __PRIVATE_toListenRequestLabels(e, t) {
  const n = function __PRIVATE_toLabel(e2) {
    switch (e2) {
      case "TargetPurposeListen":
        return null;
      case "TargetPurposeExistenceFilterMismatch":
        return "existence-filter-mismatch";
      case "TargetPurposeExistenceFilterMismatchBloom":
        return "existence-filter-mismatch-bloom";
      case "TargetPurposeLimboResolution":
        return "limbo-document";
      default:
        return fail(28987, {
          purpose: e2
        });
    }
  }(t.purpose);
  return n == null ? null : {
    "goog-listen-tags": n
  };
}
function __PRIVATE_fromFilter(e) {
  return e.unaryFilter !== undefined ? function __PRIVATE_fromUnaryFilter(e2) {
    switch (e2.unaryFilter.op) {
      case "IS_NAN":
        const t = __PRIVATE_fromFieldPathReference(e2.unaryFilter.field);
        return FieldFilter.create(t, "==", {
          doubleValue: NaN
        });
      case "IS_NULL":
        const n = __PRIVATE_fromFieldPathReference(e2.unaryFilter.field);
        return FieldFilter.create(n, "==", {
          nullValue: "NULL_VALUE"
        });
      case "IS_NOT_NAN":
        const r = __PRIVATE_fromFieldPathReference(e2.unaryFilter.field);
        return FieldFilter.create(r, "!=", {
          doubleValue: NaN
        });
      case "IS_NOT_NULL":
        const i = __PRIVATE_fromFieldPathReference(e2.unaryFilter.field);
        return FieldFilter.create(i, "!=", {
          nullValue: "NULL_VALUE"
        });
      case "OPERATOR_UNSPECIFIED":
        return fail(61313);
      default:
        return fail(60726);
    }
  }(e) : e.fieldFilter !== undefined ? function __PRIVATE_fromFieldFilter(e2) {
    return FieldFilter.create(__PRIVATE_fromFieldPathReference(e2.fieldFilter.field), function __PRIVATE_fromOperatorName(e3) {
      switch (e3) {
        case "EQUAL":
          return "==";
        case "NOT_EQUAL":
          return "!=";
        case "GREATER_THAN":
          return ">";
        case "GREATER_THAN_OR_EQUAL":
          return ">=";
        case "LESS_THAN":
          return "<";
        case "LESS_THAN_OR_EQUAL":
          return "<=";
        case "ARRAY_CONTAINS":
          return "array-contains";
        case "IN":
          return "in";
        case "NOT_IN":
          return "not-in";
        case "ARRAY_CONTAINS_ANY":
          return "array-contains-any";
        case "OPERATOR_UNSPECIFIED":
          return fail(58110);
        default:
          return fail(50506);
      }
    }(e2.fieldFilter.op), e2.fieldFilter.value);
  }(e) : e.compositeFilter !== undefined ? function __PRIVATE_fromCompositeFilter(e2) {
    return CompositeFilter.create(e2.compositeFilter.filters.map((e3) => __PRIVATE_fromFilter(e3)), function __PRIVATE_fromCompositeOperatorName(e3) {
      switch (e3) {
        case "AND":
          return "and";
        case "OR":
          return "or";
        default:
          return fail(1026);
      }
    }(e2.compositeFilter.op));
  }(e) : fail(30097, {
    filter: e
  });
}
function __PRIVATE_toDirection(e) {
  return bt[e];
}
function __PRIVATE_toOperatorName(e) {
  return Dt[e];
}
function __PRIVATE_toCompositeOperatorName(e) {
  return Ct[e];
}
function __PRIVATE_toFieldPathReference(e) {
  return {
    fieldPath: e.canonicalString()
  };
}
function __PRIVATE_fromFieldPathReference(e) {
  return FieldPath$1.fromServerFormat(e.fieldPath);
}
function __PRIVATE_toFilter(e) {
  return e instanceof FieldFilter ? function __PRIVATE_toUnaryOrFieldFilter(e2) {
    if (e2.op === "==") {
      if (__PRIVATE_isNanValue(e2.value))
        return {
          unaryFilter: {
            field: __PRIVATE_toFieldPathReference(e2.field),
            op: "IS_NAN"
          }
        };
      if (__PRIVATE_isNullValue(e2.value))
        return {
          unaryFilter: {
            field: __PRIVATE_toFieldPathReference(e2.field),
            op: "IS_NULL"
          }
        };
    } else if (e2.op === "!=") {
      if (__PRIVATE_isNanValue(e2.value))
        return {
          unaryFilter: {
            field: __PRIVATE_toFieldPathReference(e2.field),
            op: "IS_NOT_NAN"
          }
        };
      if (__PRIVATE_isNullValue(e2.value))
        return {
          unaryFilter: {
            field: __PRIVATE_toFieldPathReference(e2.field),
            op: "IS_NOT_NULL"
          }
        };
    }
    return {
      fieldFilter: {
        field: __PRIVATE_toFieldPathReference(e2.field),
        op: __PRIVATE_toOperatorName(e2.op),
        value: e2.value
      }
    };
  }(e) : e instanceof CompositeFilter ? function __PRIVATE_toCompositeFilter(e2) {
    const t = e2.getFilters().map((e3) => __PRIVATE_toFilter(e3));
    if (t.length === 1)
      return t[0];
    return {
      compositeFilter: {
        op: __PRIVATE_toCompositeOperatorName(e2.op),
        filters: t
      }
    };
  }(e) : fail(54877, {
    filter: e
  });
}
function __PRIVATE_toDocumentMask(e) {
  const t = [];
  return e.fields.forEach((e2) => t.push(e2.canonicalString())), {
    fieldPaths: t
  };
}
function __PRIVATE_isValidResourceName(e) {
  return e.length >= 4 && e.get(0) === "projects" && e.get(2) === "databases";
}

class TargetData {
  constructor(e, t, n, r, i = SnapshotVersion.min(), s = SnapshotVersion.min(), o = ByteString.EMPTY_BYTE_STRING, _ = null) {
    this.target = e, this.targetId = t, this.purpose = n, this.sequenceNumber = r, this.snapshotVersion = i, this.lastLimboFreeSnapshotVersion = s, this.resumeToken = o, this.expectedCount = _;
  }
  withSequenceNumber(e) {
    return new TargetData(this.target, this.targetId, this.purpose, e, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken, this.expectedCount);
  }
  withResumeToken(e, t) {
    return new TargetData(this.target, this.targetId, this.purpose, this.sequenceNumber, t, this.lastLimboFreeSnapshotVersion, e, null);
  }
  withExpectedCount(e) {
    return new TargetData(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken, e);
  }
  withLastLimboFreeSnapshotVersion(e) {
    return new TargetData(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, e, this.resumeToken, this.expectedCount);
  }
}

class __PRIVATE_LocalSerializer {
  constructor(e) {
    this.yt = e;
  }
}
function __PRIVATE_fromBundledQuery(e) {
  const t = __PRIVATE_convertQueryTargetToQuery({
    parent: e.parent,
    structuredQuery: e.structuredQuery
  });
  return e.limitType === "LAST" ? __PRIVATE_queryWithLimit(t, t.limit, "L") : t;
}
class __PRIVATE_FirestoreIndexValueWriter {
  constructor() {}
  Dt(e, t) {
    this.Ct(e, t), t.vt();
  }
  Ct(e, t) {
    if ("nullValue" in e)
      this.Ft(t, 5);
    else if ("booleanValue" in e)
      this.Ft(t, 10), t.Mt(e.booleanValue ? 1 : 0);
    else if ("integerValue" in e)
      this.Ft(t, 15), t.Mt(__PRIVATE_normalizeNumber(e.integerValue));
    else if ("doubleValue" in e) {
      const n = __PRIVATE_normalizeNumber(e.doubleValue);
      isNaN(n) ? this.Ft(t, 13) : (this.Ft(t, 15), __PRIVATE_isNegativeZero(n) ? t.Mt(0) : t.Mt(n));
    } else if ("timestampValue" in e) {
      let n = e.timestampValue;
      this.Ft(t, 20), typeof n == "string" && (n = __PRIVATE_normalizeTimestamp(n)), t.xt(`${n.seconds || ""}`), t.Mt(n.nanos || 0);
    } else if ("stringValue" in e)
      this.Ot(e.stringValue, t), this.Nt(t);
    else if ("bytesValue" in e)
      this.Ft(t, 30), t.Bt(__PRIVATE_normalizeByteString(e.bytesValue)), this.Nt(t);
    else if ("referenceValue" in e)
      this.Lt(e.referenceValue, t);
    else if ("geoPointValue" in e) {
      const n = e.geoPointValue;
      this.Ft(t, 45), t.Mt(n.latitude || 0), t.Mt(n.longitude || 0);
    } else
      "mapValue" in e ? __PRIVATE_isMaxValue(e) ? this.Ft(t, Number.MAX_SAFE_INTEGER) : __PRIVATE_isVectorValue(e) ? this.kt(e.mapValue, t) : (this.qt(e.mapValue, t), this.Nt(t)) : ("arrayValue" in e) ? (this.Qt(e.arrayValue, t), this.Nt(t)) : fail(19022, {
        $t: e
      });
  }
  Ot(e, t) {
    this.Ft(t, 25), this.Ut(e, t);
  }
  Ut(e, t) {
    t.xt(e);
  }
  qt(e, t) {
    const n = e.fields || {};
    this.Ft(t, 55);
    for (const e2 of Object.keys(n))
      this.Ot(e2, t), this.Ct(n[e2], t);
  }
  kt(e, t) {
    const n = e.fields || {};
    this.Ft(t, 53);
    const r = Et, i = n[r].arrayValue?.values?.length || 0;
    this.Ft(t, 15), t.Mt(__PRIVATE_normalizeNumber(i)), this.Ot(r, t), this.Ct(n[r], t);
  }
  Qt(e, t) {
    const n = e.values || [];
    this.Ft(t, 50);
    for (const e2 of n)
      this.Ct(e2, t);
  }
  Lt(e, t) {
    this.Ft(t, 37);
    DocumentKey.fromName(e).path.forEach((e2) => {
      this.Ft(t, 60), this.Ut(e2, t);
    });
  }
  Ft(e, t) {
    e.Mt(t);
  }
  Nt(e) {
    e.Mt(2);
  }
}
__PRIVATE_FirestoreIndexValueWriter.Kt = new __PRIVATE_FirestoreIndexValueWriter;
class __PRIVATE_MemoryIndexManager {
  constructor() {
    this.Cn = new __PRIVATE_MemoryCollectionParentIndex;
  }
  addToCollectionParentIndex(e, t) {
    return this.Cn.add(t), PersistencePromise.resolve();
  }
  getCollectionParents(e, t) {
    return PersistencePromise.resolve(this.Cn.getEntries(t));
  }
  addFieldIndex(e, t) {
    return PersistencePromise.resolve();
  }
  deleteFieldIndex(e, t) {
    return PersistencePromise.resolve();
  }
  deleteAllFieldIndexes(e) {
    return PersistencePromise.resolve();
  }
  createTargetIndexes(e, t) {
    return PersistencePromise.resolve();
  }
  getDocumentsMatchingTarget(e, t) {
    return PersistencePromise.resolve(null);
  }
  getIndexType(e, t) {
    return PersistencePromise.resolve(0);
  }
  getFieldIndexes(e, t) {
    return PersistencePromise.resolve([]);
  }
  getNextCollectionGroupToUpdate(e) {
    return PersistencePromise.resolve(null);
  }
  getMinOffset(e, t) {
    return PersistencePromise.resolve(IndexOffset.min());
  }
  getMinOffsetFromCollectionGroup(e, t) {
    return PersistencePromise.resolve(IndexOffset.min());
  }
  updateCollectionGroup(e, t, n) {
    return PersistencePromise.resolve();
  }
  updateIndexEntries(e, t) {
    return PersistencePromise.resolve();
  }
}

class __PRIVATE_MemoryCollectionParentIndex {
  constructor() {
    this.index = {};
  }
  add(e) {
    const t = e.lastSegment(), n = e.popLast(), r = this.index[t] || new SortedSet(ResourcePath.comparator), i = !r.has(n);
    return this.index[t] = r.add(n), i;
  }
  has(e) {
    const t = e.lastSegment(), n = e.popLast(), r = this.index[t];
    return r && r.has(n);
  }
  getEntries(e) {
    return (this.index[e] || new SortedSet(ResourcePath.comparator)).toArray();
  }
}
var Mt = new Uint8Array(0);
var xt = {
  didRun: false,
  sequenceNumbersCollected: 0,
  targetsRemoved: 0,
  documentsRemoved: 0
};
var Ot = 41943040;

class LruParams {
  static withCacheSize(e) {
    return new LruParams(e, LruParams.DEFAULT_COLLECTION_PERCENTILE, LruParams.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT);
  }
  constructor(e, t, n) {
    this.cacheSizeCollectionThreshold = e, this.percentileToCollect = t, this.maximumSequenceNumbersToCollect = n;
  }
}
LruParams.DEFAULT_COLLECTION_PERCENTILE = 10, LruParams.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1000, LruParams.DEFAULT = new LruParams(Ot, LruParams.DEFAULT_COLLECTION_PERCENTILE, LruParams.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT), LruParams.DISABLED = new LruParams(-1, 0, 0);
class __PRIVATE_TargetIdGenerator {
  constructor(e) {
    this.ar = e;
  }
  next() {
    return this.ar += 2, this.ar;
  }
  static ur() {
    return new __PRIVATE_TargetIdGenerator(0);
  }
  static cr() {
    return new __PRIVATE_TargetIdGenerator(-1);
  }
}
var Nt = "LruGarbageCollector";
var Bt = 1048576;
function __PRIVATE_bufferEntryComparator([e, t], [n, r]) {
  const i = __PRIVATE_primitiveComparator(e, n);
  return i === 0 ? __PRIVATE_primitiveComparator(t, r) : i;
}

class __PRIVATE_RollingSequenceNumberBuffer {
  constructor(e) {
    this.Ir = e, this.buffer = new SortedSet(__PRIVATE_bufferEntryComparator), this.Er = 0;
  }
  dr() {
    return ++this.Er;
  }
  Ar(e) {
    const t = [e, this.dr()];
    if (this.buffer.size < this.Ir)
      this.buffer = this.buffer.add(t);
    else {
      const e2 = this.buffer.last();
      __PRIVATE_bufferEntryComparator(t, e2) < 0 && (this.buffer = this.buffer.delete(e2).add(t));
    }
  }
  get maxValue() {
    return this.buffer.last()[0];
  }
}

class __PRIVATE_LruScheduler {
  constructor(e, t, n) {
    this.garbageCollector = e, this.asyncQueue = t, this.localStore = n, this.Rr = null;
  }
  start() {
    this.garbageCollector.params.cacheSizeCollectionThreshold !== -1 && this.Vr(60000);
  }
  stop() {
    this.Rr && (this.Rr.cancel(), this.Rr = null);
  }
  get started() {
    return this.Rr !== null;
  }
  Vr(e) {
    __PRIVATE_logDebug(Nt, `Garbage collection scheduled in ${e}ms`), this.Rr = this.asyncQueue.enqueueAfterDelay("lru_garbage_collection", e, async () => {
      this.Rr = null;
      try {
        await this.localStore.collectGarbage(this.garbageCollector);
      } catch (e2) {
        __PRIVATE_isIndexedDbTransactionError(e2) ? __PRIVATE_logDebug(Nt, "Ignoring IndexedDB error during garbage collection: ", e2) : await __PRIVATE_ignoreIfPrimaryLeaseLoss(e2);
      }
      await this.Vr(300000);
    });
  }
}

class __PRIVATE_LruGarbageCollectorImpl {
  constructor(e, t) {
    this.mr = e, this.params = t;
  }
  calculateTargetCount(e, t) {
    return this.mr.gr(e).next((e2) => Math.floor(t / 100 * e2));
  }
  nthSequenceNumber(e, t) {
    if (t === 0)
      return PersistencePromise.resolve(__PRIVATE_ListenSequence.ce);
    const n = new __PRIVATE_RollingSequenceNumberBuffer(t);
    return this.mr.forEachTarget(e, (e2) => n.Ar(e2.sequenceNumber)).next(() => this.mr.pr(e, (e2) => n.Ar(e2))).next(() => n.maxValue);
  }
  removeTargets(e, t, n) {
    return this.mr.removeTargets(e, t, n);
  }
  removeOrphanedDocuments(e, t) {
    return this.mr.removeOrphanedDocuments(e, t);
  }
  collect(e, t) {
    return this.params.cacheSizeCollectionThreshold === -1 ? (__PRIVATE_logDebug("LruGarbageCollector", "Garbage collection skipped; disabled"), PersistencePromise.resolve(xt)) : this.getCacheSize(e).next((n) => n < this.params.cacheSizeCollectionThreshold ? (__PRIVATE_logDebug("LruGarbageCollector", `Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`), xt) : this.yr(e, t));
  }
  getCacheSize(e) {
    return this.mr.getCacheSize(e);
  }
  yr(e, t) {
    let n, r, i, s, o, _, u;
    const c = Date.now();
    return this.calculateTargetCount(e, this.params.percentileToCollect).next((t2) => (t2 > this.params.maximumSequenceNumbersToCollect ? (__PRIVATE_logDebug("LruGarbageCollector", `Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t2}`), r = this.params.maximumSequenceNumbersToCollect) : r = t2, s = Date.now(), this.nthSequenceNumber(e, r))).next((r2) => (n = r2, o = Date.now(), this.removeTargets(e, n, t))).next((t2) => (i = t2, _ = Date.now(), this.removeOrphanedDocuments(e, n))).next((e2) => {
      if (u = Date.now(), __PRIVATE_getLogLevel() <= LogLevel.DEBUG) {
        __PRIVATE_logDebug("LruGarbageCollector", `LRU Garbage Collection
	Counted targets in ${s - c}ms
	Determined least recently used ${r} in ` + (o - s) + `ms
` + `	Removed ${i} targets in ` + (_ - o) + `ms
` + `	Removed ${e2} documents in ` + (u - _) + `ms
` + `Total Duration: ${u - c}ms`);
      }
      return PersistencePromise.resolve({
        didRun: true,
        sequenceNumbersCollected: r,
        targetsRemoved: i,
        documentsRemoved: e2
      });
    });
  }
}
function __PRIVATE_newLruGarbageCollector(e, t) {
  return new __PRIVATE_LruGarbageCollectorImpl(e, t);
}
class RemoteDocumentChangeBuffer {
  constructor() {
    this.changes = new ObjectMap((e) => e.toString(), (e, t) => e.isEqual(t)), this.changesApplied = false;
  }
  addEntry(e) {
    this.assertNotApplied(), this.changes.set(e.key, e);
  }
  removeEntry(e, t) {
    this.assertNotApplied(), this.changes.set(e, MutableDocument.newInvalidDocument(e).setReadTime(t));
  }
  getEntry(e, t) {
    this.assertNotApplied();
    const n = this.changes.get(t);
    return n !== undefined ? PersistencePromise.resolve(n) : this.getFromCache(e, t);
  }
  getEntries(e, t) {
    return this.getAllFromCache(e, t);
  }
  apply(e) {
    return this.assertNotApplied(), this.changesApplied = true, this.applyChanges(e);
  }
  assertNotApplied() {}
}
class OverlayedDocument {
  constructor(e, t) {
    this.overlayedDocument = e, this.mutatedFields = t;
  }
}

class LocalDocumentsView {
  constructor(e, t, n, r) {
    this.remoteDocumentCache = e, this.mutationQueue = t, this.documentOverlayCache = n, this.indexManager = r;
  }
  getDocument(e, t) {
    let n = null;
    return this.documentOverlayCache.getOverlay(e, t).next((r) => (n = r, this.remoteDocumentCache.getEntry(e, t))).next((e2) => (n !== null && __PRIVATE_mutationApplyToLocalView(n.mutation, e2, FieldMask.empty(), Timestamp.now()), e2));
  }
  getDocuments(e, t) {
    return this.remoteDocumentCache.getEntries(e, t).next((t2) => this.getLocalViewOfDocuments(e, t2, __PRIVATE_documentKeySet()).next(() => t2));
  }
  getLocalViewOfDocuments(e, t, n = __PRIVATE_documentKeySet()) {
    const r = __PRIVATE_newOverlayMap();
    return this.populateOverlays(e, r, t).next(() => this.computeViews(e, t, r, n).next((e2) => {
      let t2 = documentMap();
      return e2.forEach((e3, n2) => {
        t2 = t2.insert(e3, n2.overlayedDocument);
      }), t2;
    }));
  }
  getOverlayedDocuments(e, t) {
    const n = __PRIVATE_newOverlayMap();
    return this.populateOverlays(e, n, t).next(() => this.computeViews(e, t, n, __PRIVATE_documentKeySet()));
  }
  populateOverlays(e, t, n) {
    const r = [];
    return n.forEach((e2) => {
      t.has(e2) || r.push(e2);
    }), this.documentOverlayCache.getOverlays(e, r).next((e2) => {
      e2.forEach((e3, n2) => {
        t.set(e3, n2);
      });
    });
  }
  computeViews(e, t, n, r) {
    let i = __PRIVATE_mutableDocumentMap();
    const s = __PRIVATE_newDocumentKeyMap(), o = function __PRIVATE_newOverlayedDocumentMap() {
      return __PRIVATE_newDocumentKeyMap();
    }();
    return t.forEach((e2, t2) => {
      const o2 = n.get(t2.key);
      r.has(t2.key) && (o2 === undefined || o2.mutation instanceof __PRIVATE_PatchMutation) ? i = i.insert(t2.key, t2) : o2 !== undefined ? (s.set(t2.key, o2.mutation.getFieldMask()), __PRIVATE_mutationApplyToLocalView(o2.mutation, t2, o2.mutation.getFieldMask(), Timestamp.now())) : s.set(t2.key, FieldMask.empty());
    }), this.recalculateAndSaveOverlays(e, i).next((e2) => (e2.forEach((e3, t2) => s.set(e3, t2)), t.forEach((e3, t2) => o.set(e3, new OverlayedDocument(t2, s.get(e3) ?? null))), o));
  }
  recalculateAndSaveOverlays(e, t) {
    const n = __PRIVATE_newDocumentKeyMap();
    let r = new SortedMap((e2, t2) => e2 - t2), i = __PRIVATE_documentKeySet();
    return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e, t).next((e2) => {
      for (const i2 of e2)
        i2.keys().forEach((e3) => {
          const s = t.get(e3);
          if (s === null)
            return;
          let o = n.get(e3) || FieldMask.empty();
          o = i2.applyToLocalView(s, o), n.set(e3, o);
          const _ = (r.get(i2.batchId) || __PRIVATE_documentKeySet()).add(e3);
          r = r.insert(i2.batchId, _);
        });
    }).next(() => {
      const s = [], o = r.getReverseIterator();
      for (;o.hasNext(); ) {
        const r2 = o.getNext(), _ = r2.key, a = r2.value, u = __PRIVATE_newMutationMap();
        a.forEach((e2) => {
          if (!i.has(e2)) {
            const r3 = __PRIVATE_calculateOverlayMutation(t.get(e2), n.get(e2));
            r3 !== null && u.set(e2, r3), i = i.add(e2);
          }
        }), s.push(this.documentOverlayCache.saveOverlays(e, _, u));
      }
      return PersistencePromise.waitFor(s);
    }).next(() => n);
  }
  recalculateAndSaveOverlaysForDocumentKeys(e, t) {
    return this.remoteDocumentCache.getEntries(e, t).next((t2) => this.recalculateAndSaveOverlays(e, t2));
  }
  getDocumentsMatchingQuery(e, t, n, r) {
    return function __PRIVATE_isDocumentQuery$1(e2) {
      return DocumentKey.isDocumentKey(e2.path) && e2.collectionGroup === null && e2.filters.length === 0;
    }(t) ? this.getDocumentsMatchingDocumentQuery(e, t.path) : __PRIVATE_isCollectionGroupQuery(t) ? this.getDocumentsMatchingCollectionGroupQuery(e, t, n, r) : this.getDocumentsMatchingCollectionQuery(e, t, n, r);
  }
  getNextDocuments(e, t, n, r) {
    return this.remoteDocumentCache.getAllFromCollectionGroup(e, t, n, r).next((i) => {
      const s = r - i.size > 0 ? this.documentOverlayCache.getOverlaysForCollectionGroup(e, t, n.largestBatchId, r - i.size) : PersistencePromise.resolve(__PRIVATE_newOverlayMap());
      let o = U, _ = i;
      return s.next((t2) => PersistencePromise.forEach(t2, (t3, n2) => (o < n2.largestBatchId && (o = n2.largestBatchId), i.get(t3) ? PersistencePromise.resolve() : this.remoteDocumentCache.getEntry(e, t3).next((e2) => {
        _ = _.insert(t3, e2);
      }))).next(() => this.populateOverlays(e, t2, i)).next(() => this.computeViews(e, _, t2, __PRIVATE_documentKeySet())).next((e2) => ({
        batchId: o,
        changes: __PRIVATE_convertOverlayedDocumentMapToDocumentMap(e2)
      })));
    });
  }
  getDocumentsMatchingDocumentQuery(e, t) {
    return this.getDocument(e, new DocumentKey(t)).next((e2) => {
      let t2 = documentMap();
      return e2.isFoundDocument() && (t2 = t2.insert(e2.key, e2)), t2;
    });
  }
  getDocumentsMatchingCollectionGroupQuery(e, t, n, r) {
    const i = t.collectionGroup;
    let s = documentMap();
    return this.indexManager.getCollectionParents(e, i).next((o) => PersistencePromise.forEach(o, (o2) => {
      const _ = function __PRIVATE_asCollectionQueryAtPath(e2, t2) {
        return new __PRIVATE_QueryImpl(t2, null, e2.explicitOrderBy.slice(), e2.filters.slice(), e2.limit, e2.limitType, e2.startAt, e2.endAt);
      }(t, o2.child(i));
      return this.getDocumentsMatchingCollectionQuery(e, _, n, r).next((e2) => {
        e2.forEach((e3, t2) => {
          s = s.insert(e3, t2);
        });
      });
    }).next(() => s));
  }
  getDocumentsMatchingCollectionQuery(e, t, n, r) {
    let i;
    return this.documentOverlayCache.getOverlaysForCollection(e, t.path, n.largestBatchId).next((s) => (i = s, this.remoteDocumentCache.getDocumentsMatchingQuery(e, t, n, i, r))).next((e2) => {
      i.forEach((t2, n3) => {
        const r2 = n3.getKey();
        e2.get(r2) === null && (e2 = e2.insert(r2, MutableDocument.newInvalidDocument(r2)));
      });
      let n2 = documentMap();
      return e2.forEach((e3, r2) => {
        const s = i.get(e3);
        s !== undefined && __PRIVATE_mutationApplyToLocalView(s.mutation, r2, FieldMask.empty(), Timestamp.now()), __PRIVATE_queryMatches(t, r2) && (n2 = n2.insert(e3, r2));
      }), n2;
    });
  }
}

class __PRIVATE_MemoryBundleCache {
  constructor(e) {
    this.serializer = e, this.Lr = new Map, this.kr = new Map;
  }
  getBundleMetadata(e, t) {
    return PersistencePromise.resolve(this.Lr.get(t));
  }
  saveBundleMetadata(e, t) {
    return this.Lr.set(t.id, function __PRIVATE_fromBundleMetadata(e2) {
      return {
        id: e2.id,
        version: e2.version,
        createTime: __PRIVATE_fromVersion(e2.createTime)
      };
    }(t)), PersistencePromise.resolve();
  }
  getNamedQuery(e, t) {
    return PersistencePromise.resolve(this.kr.get(t));
  }
  saveNamedQuery(e, t) {
    return this.kr.set(t.name, function __PRIVATE_fromProtoNamedQuery(e2) {
      return {
        name: e2.name,
        query: __PRIVATE_fromBundledQuery(e2.bundledQuery),
        readTime: __PRIVATE_fromVersion(e2.readTime)
      };
    }(t)), PersistencePromise.resolve();
  }
}

class __PRIVATE_MemoryDocumentOverlayCache {
  constructor() {
    this.overlays = new SortedMap(DocumentKey.comparator), this.qr = new Map;
  }
  getOverlay(e, t) {
    return PersistencePromise.resolve(this.overlays.get(t));
  }
  getOverlays(e, t) {
    const n = __PRIVATE_newOverlayMap();
    return PersistencePromise.forEach(t, (t2) => this.getOverlay(e, t2).next((e2) => {
      e2 !== null && n.set(t2, e2);
    })).next(() => n);
  }
  saveOverlays(e, t, n) {
    return n.forEach((n2, r) => {
      this.St(e, t, r);
    }), PersistencePromise.resolve();
  }
  removeOverlaysForBatchId(e, t, n) {
    const r = this.qr.get(n);
    return r !== undefined && (r.forEach((e2) => this.overlays = this.overlays.remove(e2)), this.qr.delete(n)), PersistencePromise.resolve();
  }
  getOverlaysForCollection(e, t, n) {
    const r = __PRIVATE_newOverlayMap(), i = t.length + 1, s = new DocumentKey(t.child("")), o = this.overlays.getIteratorFrom(s);
    for (;o.hasNext(); ) {
      const e2 = o.getNext().value, s2 = e2.getKey();
      if (!t.isPrefixOf(s2.path))
        break;
      s2.path.length === i && (e2.largestBatchId > n && r.set(e2.getKey(), e2));
    }
    return PersistencePromise.resolve(r);
  }
  getOverlaysForCollectionGroup(e, t, n, r) {
    let i = new SortedMap((e2, t2) => e2 - t2);
    const s = this.overlays.getIterator();
    for (;s.hasNext(); ) {
      const e2 = s.getNext().value;
      if (e2.getKey().getCollectionGroup() === t && e2.largestBatchId > n) {
        let t2 = i.get(e2.largestBatchId);
        t2 === null && (t2 = __PRIVATE_newOverlayMap(), i = i.insert(e2.largestBatchId, t2)), t2.set(e2.getKey(), e2);
      }
    }
    const o = __PRIVATE_newOverlayMap(), _ = i.getIterator();
    for (;_.hasNext(); ) {
      if (_.getNext().value.forEach((e2, t2) => o.set(e2, t2)), o.size() >= r)
        break;
    }
    return PersistencePromise.resolve(o);
  }
  St(e, t, n) {
    const r = this.overlays.get(n.key);
    if (r !== null) {
      const e2 = this.qr.get(r.largestBatchId).delete(n.key);
      this.qr.set(r.largestBatchId, e2);
    }
    this.overlays = this.overlays.insert(n.key, new Overlay(t, n));
    let i = this.qr.get(t);
    i === undefined && (i = __PRIVATE_documentKeySet(), this.qr.set(t, i)), this.qr.set(t, i.add(n.key));
  }
}

class __PRIVATE_MemoryGlobalsCache {
  constructor() {
    this.sessionToken = ByteString.EMPTY_BYTE_STRING;
  }
  getSessionToken(e) {
    return PersistencePromise.resolve(this.sessionToken);
  }
  setSessionToken(e, t) {
    return this.sessionToken = t, PersistencePromise.resolve();
  }
}

class __PRIVATE_ReferenceSet {
  constructor() {
    this.Qr = new SortedSet(__PRIVATE_DocReference.$r), this.Ur = new SortedSet(__PRIVATE_DocReference.Kr);
  }
  isEmpty() {
    return this.Qr.isEmpty();
  }
  addReference(e, t) {
    const n = new __PRIVATE_DocReference(e, t);
    this.Qr = this.Qr.add(n), this.Ur = this.Ur.add(n);
  }
  Wr(e, t) {
    e.forEach((e2) => this.addReference(e2, t));
  }
  removeReference(e, t) {
    this.Gr(new __PRIVATE_DocReference(e, t));
  }
  zr(e, t) {
    e.forEach((e2) => this.removeReference(e2, t));
  }
  jr(e) {
    const t = new DocumentKey(new ResourcePath([])), n = new __PRIVATE_DocReference(t, e), r = new __PRIVATE_DocReference(t, e + 1), i = [];
    return this.Ur.forEachInRange([n, r], (e2) => {
      this.Gr(e2), i.push(e2.key);
    }), i;
  }
  Jr() {
    this.Qr.forEach((e) => this.Gr(e));
  }
  Gr(e) {
    this.Qr = this.Qr.delete(e), this.Ur = this.Ur.delete(e);
  }
  Hr(e) {
    const t = new DocumentKey(new ResourcePath([])), n = new __PRIVATE_DocReference(t, e), r = new __PRIVATE_DocReference(t, e + 1);
    let i = __PRIVATE_documentKeySet();
    return this.Ur.forEachInRange([n, r], (e2) => {
      i = i.add(e2.key);
    }), i;
  }
  containsKey(e) {
    const t = new __PRIVATE_DocReference(e, 0), n = this.Qr.firstAfterOrEqual(t);
    return n !== null && e.isEqual(n.key);
  }
}

class __PRIVATE_DocReference {
  constructor(e, t) {
    this.key = e, this.Yr = t;
  }
  static $r(e, t) {
    return DocumentKey.comparator(e.key, t.key) || __PRIVATE_primitiveComparator(e.Yr, t.Yr);
  }
  static Kr(e, t) {
    return __PRIVATE_primitiveComparator(e.Yr, t.Yr) || DocumentKey.comparator(e.key, t.key);
  }
}

class __PRIVATE_MemoryMutationQueue {
  constructor(e, t) {
    this.indexManager = e, this.referenceDelegate = t, this.mutationQueue = [], this.tr = 1, this.Zr = new SortedSet(__PRIVATE_DocReference.$r);
  }
  checkEmpty(e) {
    return PersistencePromise.resolve(this.mutationQueue.length === 0);
  }
  addMutationBatch(e, t, n, r) {
    const i = this.tr;
    this.tr++, this.mutationQueue.length > 0 && this.mutationQueue[this.mutationQueue.length - 1];
    const s = new MutationBatch(i, t, n, r);
    this.mutationQueue.push(s);
    for (const t2 of r)
      this.Zr = this.Zr.add(new __PRIVATE_DocReference(t2.key, i)), this.indexManager.addToCollectionParentIndex(e, t2.key.path.popLast());
    return PersistencePromise.resolve(s);
  }
  lookupMutationBatch(e, t) {
    return PersistencePromise.resolve(this.Xr(t));
  }
  getNextMutationBatchAfterBatchId(e, t) {
    const n = t + 1, r = this.ei(n), i = r < 0 ? 0 : r;
    return PersistencePromise.resolve(this.mutationQueue.length > i ? this.mutationQueue[i] : null);
  }
  getHighestUnacknowledgedBatchId() {
    return PersistencePromise.resolve(this.mutationQueue.length === 0 ? j : this.tr - 1);
  }
  getAllMutationBatches(e) {
    return PersistencePromise.resolve(this.mutationQueue.slice());
  }
  getAllMutationBatchesAffectingDocumentKey(e, t) {
    const n = new __PRIVATE_DocReference(t, 0), r = new __PRIVATE_DocReference(t, Number.POSITIVE_INFINITY), i = [];
    return this.Zr.forEachInRange([n, r], (e2) => {
      const t2 = this.Xr(e2.Yr);
      i.push(t2);
    }), PersistencePromise.resolve(i);
  }
  getAllMutationBatchesAffectingDocumentKeys(e, t) {
    let n = new SortedSet(__PRIVATE_primitiveComparator);
    return t.forEach((e2) => {
      const t2 = new __PRIVATE_DocReference(e2, 0), r = new __PRIVATE_DocReference(e2, Number.POSITIVE_INFINITY);
      this.Zr.forEachInRange([t2, r], (e3) => {
        n = n.add(e3.Yr);
      });
    }), PersistencePromise.resolve(this.ti(n));
  }
  getAllMutationBatchesAffectingQuery(e, t) {
    const n = t.path, r = n.length + 1;
    let i = n;
    DocumentKey.isDocumentKey(i) || (i = i.child(""));
    const s = new __PRIVATE_DocReference(new DocumentKey(i), 0);
    let o = new SortedSet(__PRIVATE_primitiveComparator);
    return this.Zr.forEachWhile((e2) => {
      const t2 = e2.key.path;
      return !!n.isPrefixOf(t2) && (t2.length === r && (o = o.add(e2.Yr)), true);
    }, s), PersistencePromise.resolve(this.ti(o));
  }
  ti(e) {
    const t = [];
    return e.forEach((e2) => {
      const n = this.Xr(e2);
      n !== null && t.push(n);
    }), t;
  }
  removeMutationBatch(e, t) {
    __PRIVATE_hardAssert(this.ni(t.batchId, "removed") === 0, 55003), this.mutationQueue.shift();
    let n = this.Zr;
    return PersistencePromise.forEach(t.mutations, (r) => {
      const i = new __PRIVATE_DocReference(r.key, t.batchId);
      return n = n.delete(i), this.referenceDelegate.markPotentiallyOrphaned(e, r.key);
    }).next(() => {
      this.Zr = n;
    });
  }
  ir(e) {}
  containsKey(e, t) {
    const n = new __PRIVATE_DocReference(t, 0), r = this.Zr.firstAfterOrEqual(n);
    return PersistencePromise.resolve(t.isEqual(r && r.key));
  }
  performConsistencyCheck(e) {
    return this.mutationQueue.length, PersistencePromise.resolve();
  }
  ni(e, t) {
    return this.ei(e);
  }
  ei(e) {
    if (this.mutationQueue.length === 0)
      return 0;
    return e - this.mutationQueue[0].batchId;
  }
  Xr(e) {
    const t = this.ei(e);
    if (t < 0 || t >= this.mutationQueue.length)
      return null;
    return this.mutationQueue[t];
  }
}

class __PRIVATE_MemoryRemoteDocumentCacheImpl {
  constructor(e) {
    this.ri = e, this.docs = function __PRIVATE_documentEntryMap() {
      return new SortedMap(DocumentKey.comparator);
    }(), this.size = 0;
  }
  setIndexManager(e) {
    this.indexManager = e;
  }
  addEntry(e, t) {
    const n = t.key, r = this.docs.get(n), i = r ? r.size : 0, s = this.ri(t);
    return this.docs = this.docs.insert(n, {
      document: t.mutableCopy(),
      size: s
    }), this.size += s - i, this.indexManager.addToCollectionParentIndex(e, n.path.popLast());
  }
  removeEntry(e) {
    const t = this.docs.get(e);
    t && (this.docs = this.docs.remove(e), this.size -= t.size);
  }
  getEntry(e, t) {
    const n = this.docs.get(t);
    return PersistencePromise.resolve(n ? n.document.mutableCopy() : MutableDocument.newInvalidDocument(t));
  }
  getEntries(e, t) {
    let n = __PRIVATE_mutableDocumentMap();
    return t.forEach((e2) => {
      const t2 = this.docs.get(e2);
      n = n.insert(e2, t2 ? t2.document.mutableCopy() : MutableDocument.newInvalidDocument(e2));
    }), PersistencePromise.resolve(n);
  }
  getDocumentsMatchingQuery(e, t, n, r) {
    let i = __PRIVATE_mutableDocumentMap();
    const s = t.path, o = new DocumentKey(s.child("__id-9223372036854775808__")), _ = this.docs.getIteratorFrom(o);
    for (;_.hasNext(); ) {
      const { key: e2, value: { document: o2 } } = _.getNext();
      if (!s.isPrefixOf(e2.path))
        break;
      e2.path.length > s.length + 1 || (__PRIVATE_indexOffsetComparator(__PRIVATE_newIndexOffsetFromDocument(o2), n) <= 0 || (r.has(o2.key) || __PRIVATE_queryMatches(t, o2)) && (i = i.insert(o2.key, o2.mutableCopy())));
    }
    return PersistencePromise.resolve(i);
  }
  getAllFromCollectionGroup(e, t, n, r) {
    fail(9500);
  }
  ii(e, t) {
    return PersistencePromise.forEach(this.docs, (e2) => t(e2));
  }
  newChangeBuffer(e) {
    return new __PRIVATE_MemoryRemoteDocumentChangeBuffer(this);
  }
  getSize(e) {
    return PersistencePromise.resolve(this.size);
  }
}

class __PRIVATE_MemoryRemoteDocumentChangeBuffer extends RemoteDocumentChangeBuffer {
  constructor(e) {
    super(), this.Nr = e;
  }
  applyChanges(e) {
    const t = [];
    return this.changes.forEach((n, r) => {
      r.isValidDocument() ? t.push(this.Nr.addEntry(e, r)) : this.Nr.removeEntry(n);
    }), PersistencePromise.waitFor(t);
  }
  getFromCache(e, t) {
    return this.Nr.getEntry(e, t);
  }
  getAllFromCache(e, t) {
    return this.Nr.getEntries(e, t);
  }
}

class __PRIVATE_MemoryTargetCache {
  constructor(e) {
    this.persistence = e, this.si = new ObjectMap((e2) => __PRIVATE_canonifyTarget(e2), __PRIVATE_targetEquals), this.lastRemoteSnapshotVersion = SnapshotVersion.min(), this.highestTargetId = 0, this.oi = 0, this._i = new __PRIVATE_ReferenceSet, this.targetCount = 0, this.ai = __PRIVATE_TargetIdGenerator.ur();
  }
  forEachTarget(e, t) {
    return this.si.forEach((e2, n) => t(n)), PersistencePromise.resolve();
  }
  getLastRemoteSnapshotVersion(e) {
    return PersistencePromise.resolve(this.lastRemoteSnapshotVersion);
  }
  getHighestSequenceNumber(e) {
    return PersistencePromise.resolve(this.oi);
  }
  allocateTargetId(e) {
    return this.highestTargetId = this.ai.next(), PersistencePromise.resolve(this.highestTargetId);
  }
  setTargetsMetadata(e, t, n) {
    return n && (this.lastRemoteSnapshotVersion = n), t > this.oi && (this.oi = t), PersistencePromise.resolve();
  }
  Pr(e) {
    this.si.set(e.target, e);
    const t = e.targetId;
    t > this.highestTargetId && (this.ai = new __PRIVATE_TargetIdGenerator(t), this.highestTargetId = t), e.sequenceNumber > this.oi && (this.oi = e.sequenceNumber);
  }
  addTargetData(e, t) {
    return this.Pr(t), this.targetCount += 1, PersistencePromise.resolve();
  }
  updateTargetData(e, t) {
    return this.Pr(t), PersistencePromise.resolve();
  }
  removeTargetData(e, t) {
    return this.si.delete(t.target), this._i.jr(t.targetId), this.targetCount -= 1, PersistencePromise.resolve();
  }
  removeTargets(e, t, n) {
    let r = 0;
    const i = [];
    return this.si.forEach((s, o) => {
      o.sequenceNumber <= t && n.get(o.targetId) === null && (this.si.delete(s), i.push(this.removeMatchingKeysForTargetId(e, o.targetId)), r++);
    }), PersistencePromise.waitFor(i).next(() => r);
  }
  getTargetCount(e) {
    return PersistencePromise.resolve(this.targetCount);
  }
  getTargetData(e, t) {
    const n = this.si.get(t) || null;
    return PersistencePromise.resolve(n);
  }
  addMatchingKeys(e, t, n) {
    return this._i.Wr(t, n), PersistencePromise.resolve();
  }
  removeMatchingKeys(e, t, n) {
    this._i.zr(t, n);
    const r = this.persistence.referenceDelegate, i = [];
    return r && t.forEach((t2) => {
      i.push(r.markPotentiallyOrphaned(e, t2));
    }), PersistencePromise.waitFor(i);
  }
  removeMatchingKeysForTargetId(e, t) {
    return this._i.jr(t), PersistencePromise.resolve();
  }
  getMatchingKeysForTargetId(e, t) {
    const n = this._i.Hr(t);
    return PersistencePromise.resolve(n);
  }
  containsKey(e, t) {
    return PersistencePromise.resolve(this._i.containsKey(t));
  }
}

class __PRIVATE_MemoryPersistence {
  constructor(e, t) {
    this.ui = {}, this.overlays = {}, this.ci = new __PRIVATE_ListenSequence(0), this.li = false, this.li = true, this.hi = new __PRIVATE_MemoryGlobalsCache, this.referenceDelegate = e(this), this.Pi = new __PRIVATE_MemoryTargetCache(this);
    this.indexManager = new __PRIVATE_MemoryIndexManager, this.remoteDocumentCache = function __PRIVATE_newMemoryRemoteDocumentCache(e2) {
      return new __PRIVATE_MemoryRemoteDocumentCacheImpl(e2);
    }((e2) => this.referenceDelegate.Ti(e2)), this.serializer = new __PRIVATE_LocalSerializer(t), this.Ii = new __PRIVATE_MemoryBundleCache(this.serializer);
  }
  start() {
    return Promise.resolve();
  }
  shutdown() {
    return this.li = false, Promise.resolve();
  }
  get started() {
    return this.li;
  }
  setDatabaseDeletedListener() {}
  setNetworkEnabled() {}
  getIndexManager(e) {
    return this.indexManager;
  }
  getDocumentOverlayCache(e) {
    let t = this.overlays[e.toKey()];
    return t || (t = new __PRIVATE_MemoryDocumentOverlayCache, this.overlays[e.toKey()] = t), t;
  }
  getMutationQueue(e, t) {
    let n = this.ui[e.toKey()];
    return n || (n = new __PRIVATE_MemoryMutationQueue(t, this.referenceDelegate), this.ui[e.toKey()] = n), n;
  }
  getGlobalsCache() {
    return this.hi;
  }
  getTargetCache() {
    return this.Pi;
  }
  getRemoteDocumentCache() {
    return this.remoteDocumentCache;
  }
  getBundleCache() {
    return this.Ii;
  }
  runTransaction(e, t, n) {
    __PRIVATE_logDebug("MemoryPersistence", "Starting transaction:", e);
    const r = new __PRIVATE_MemoryTransaction(this.ci.next());
    return this.referenceDelegate.Ei(), n(r).next((e2) => this.referenceDelegate.di(r).next(() => e2)).toPromise().then((e2) => (r.raiseOnCommittedEvent(), e2));
  }
  Ai(e, t) {
    return PersistencePromise.or(Object.values(this.ui).map((n) => () => n.containsKey(e, t)));
  }
}

class __PRIVATE_MemoryTransaction extends PersistenceTransaction {
  constructor(e) {
    super(), this.currentSequenceNumber = e;
  }
}

class __PRIVATE_MemoryEagerDelegate {
  constructor(e) {
    this.persistence = e, this.Ri = new __PRIVATE_ReferenceSet, this.Vi = null;
  }
  static mi(e) {
    return new __PRIVATE_MemoryEagerDelegate(e);
  }
  get fi() {
    if (this.Vi)
      return this.Vi;
    throw fail(60996);
  }
  addReference(e, t, n) {
    return this.Ri.addReference(n, t), this.fi.delete(n.toString()), PersistencePromise.resolve();
  }
  removeReference(e, t, n) {
    return this.Ri.removeReference(n, t), this.fi.add(n.toString()), PersistencePromise.resolve();
  }
  markPotentiallyOrphaned(e, t) {
    return this.fi.add(t.toString()), PersistencePromise.resolve();
  }
  removeTarget(e, t) {
    this.Ri.jr(t.targetId).forEach((e2) => this.fi.add(e2.toString()));
    const n = this.persistence.getTargetCache();
    return n.getMatchingKeysForTargetId(e, t.targetId).next((e2) => {
      e2.forEach((e3) => this.fi.add(e3.toString()));
    }).next(() => n.removeTargetData(e, t));
  }
  Ei() {
    this.Vi = new Set;
  }
  di(e) {
    const t = this.persistence.getRemoteDocumentCache().newChangeBuffer();
    return PersistencePromise.forEach(this.fi, (n) => {
      const r = DocumentKey.fromPath(n);
      return this.gi(e, r).next((e2) => {
        e2 || t.removeEntry(r, SnapshotVersion.min());
      });
    }).next(() => (this.Vi = null, t.apply(e)));
  }
  updateLimboDocument(e, t) {
    return this.gi(e, t).next((e2) => {
      e2 ? this.fi.delete(t.toString()) : this.fi.add(t.toString());
    });
  }
  Ti(e) {
    return 0;
  }
  gi(e, t) {
    return PersistencePromise.or([() => PersistencePromise.resolve(this.Ri.containsKey(t)), () => this.persistence.getTargetCache().containsKey(e, t), () => this.persistence.Ai(e, t)]);
  }
}

class __PRIVATE_MemoryLruDelegate {
  constructor(e, t) {
    this.persistence = e, this.pi = new ObjectMap((e2) => __PRIVATE_encodeResourcePath(e2.path), (e2, t2) => e2.isEqual(t2)), this.garbageCollector = __PRIVATE_newLruGarbageCollector(this, t);
  }
  static mi(e, t) {
    return new __PRIVATE_MemoryLruDelegate(e, t);
  }
  Ei() {}
  di(e) {
    return PersistencePromise.resolve();
  }
  forEachTarget(e, t) {
    return this.persistence.getTargetCache().forEachTarget(e, t);
  }
  gr(e) {
    const t = this.wr(e);
    return this.persistence.getTargetCache().getTargetCount(e).next((e2) => t.next((t2) => e2 + t2));
  }
  wr(e) {
    let t = 0;
    return this.pr(e, (e2) => {
      t++;
    }).next(() => t);
  }
  pr(e, t) {
    return PersistencePromise.forEach(this.pi, (n, r) => this.br(e, n, r).next((e2) => e2 ? PersistencePromise.resolve() : t(r)));
  }
  removeTargets(e, t, n) {
    return this.persistence.getTargetCache().removeTargets(e, t, n);
  }
  removeOrphanedDocuments(e, t) {
    let n = 0;
    const r = this.persistence.getRemoteDocumentCache(), i = r.newChangeBuffer();
    return r.ii(e, (r2) => this.br(e, r2, t).next((e2) => {
      e2 || (n++, i.removeEntry(r2, SnapshotVersion.min()));
    })).next(() => i.apply(e)).next(() => n);
  }
  markPotentiallyOrphaned(e, t) {
    return this.pi.set(t, e.currentSequenceNumber), PersistencePromise.resolve();
  }
  removeTarget(e, t) {
    const n = t.withSequenceNumber(e.currentSequenceNumber);
    return this.persistence.getTargetCache().updateTargetData(e, n);
  }
  addReference(e, t, n) {
    return this.pi.set(n, e.currentSequenceNumber), PersistencePromise.resolve();
  }
  removeReference(e, t, n) {
    return this.pi.set(n, e.currentSequenceNumber), PersistencePromise.resolve();
  }
  updateLimboDocument(e, t) {
    return this.pi.set(t, e.currentSequenceNumber), PersistencePromise.resolve();
  }
  Ti(e) {
    let t = e.key.toString().length;
    return e.isFoundDocument() && (t += __PRIVATE_estimateByteSize(e.data.value)), t;
  }
  br(e, t, n) {
    return PersistencePromise.or([() => this.persistence.Ai(e, t), () => this.persistence.getTargetCache().containsKey(e, t), () => {
      const e2 = this.pi.get(t);
      return PersistencePromise.resolve(e2 !== undefined && e2 > n);
    }]);
  }
  getCacheSize(e) {
    return this.persistence.getRemoteDocumentCache().getSize(e);
  }
}
class __PRIVATE_LocalViewChanges {
  constructor(e, t, n, r) {
    this.targetId = e, this.fromCache = t, this.Es = n, this.ds = r;
  }
  static As(e, t) {
    let n = __PRIVATE_documentKeySet(), r = __PRIVATE_documentKeySet();
    for (const e2 of t.docChanges)
      switch (e2.type) {
        case 0:
          n = n.add(e2.doc.key);
          break;
        case 1:
          r = r.add(e2.doc.key);
      }
    return new __PRIVATE_LocalViewChanges(e, t.fromCache, n, r);
  }
}

class QueryContext {
  constructor() {
    this._documentReadCount = 0;
  }
  get documentReadCount() {
    return this._documentReadCount;
  }
  incrementDocumentReadCount(e) {
    this._documentReadCount += e;
  }
}

class __PRIVATE_QueryEngine {
  constructor() {
    this.Rs = false, this.Vs = false, this.fs = 100, this.gs = function __PRIVATE_getDefaultRelativeIndexReadCostPerDocument() {
      return isSafari() ? 8 : __PRIVATE_getAndroidVersion(getUA()) > 0 ? 6 : 4;
    }();
  }
  initialize(e, t) {
    this.ps = e, this.indexManager = t, this.Rs = true;
  }
  getDocumentsMatchingQuery(e, t, n, r) {
    const i = {
      result: null
    };
    return this.ys(e, t).next((e2) => {
      i.result = e2;
    }).next(() => {
      if (!i.result)
        return this.ws(e, t, r, n).next((e2) => {
          i.result = e2;
        });
    }).next(() => {
      if (i.result)
        return;
      const n2 = new QueryContext;
      return this.Ss(e, t, n2).next((r2) => {
        if (i.result = r2, this.Vs)
          return this.bs(e, t, n2, r2.size);
      });
    }).next(() => i.result);
  }
  bs(e, t, n, r) {
    return n.documentReadCount < this.fs ? (__PRIVATE_getLogLevel() <= LogLevel.DEBUG && __PRIVATE_logDebug("QueryEngine", "SDK will not create cache indexes for query:", __PRIVATE_stringifyQuery(t), "since it only creates cache indexes for collection contains", "more than or equal to", this.fs, "documents"), PersistencePromise.resolve()) : (__PRIVATE_getLogLevel() <= LogLevel.DEBUG && __PRIVATE_logDebug("QueryEngine", "Query:", __PRIVATE_stringifyQuery(t), "scans", n.documentReadCount, "local documents and returns", r, "documents as results."), n.documentReadCount > this.gs * r ? (__PRIVATE_getLogLevel() <= LogLevel.DEBUG && __PRIVATE_logDebug("QueryEngine", "The SDK decides to create cache indexes for query:", __PRIVATE_stringifyQuery(t), "as using cache indexes may help improve performance."), this.indexManager.createTargetIndexes(e, __PRIVATE_queryToTarget(t))) : PersistencePromise.resolve());
  }
  ys(e, t) {
    if (__PRIVATE_queryMatchesAllDocuments(t))
      return PersistencePromise.resolve(null);
    let n = __PRIVATE_queryToTarget(t);
    return this.indexManager.getIndexType(e, n).next((r) => r === 0 ? null : (t.limit !== null && r === 1 && (t = __PRIVATE_queryWithLimit(t, null, "F"), n = __PRIVATE_queryToTarget(t)), this.indexManager.getDocumentsMatchingTarget(e, n).next((r2) => {
      const i = __PRIVATE_documentKeySet(...r2);
      return this.ps.getDocuments(e, i).next((r3) => this.indexManager.getMinOffset(e, n).next((n2) => {
        const s = this.Ds(t, r3);
        return this.Cs(t, s, i, n2.readTime) ? this.ys(e, __PRIVATE_queryWithLimit(t, null, "F")) : this.vs(e, s, t, n2);
      }));
    })));
  }
  ws(e, t, n, r) {
    return __PRIVATE_queryMatchesAllDocuments(t) || r.isEqual(SnapshotVersion.min()) ? PersistencePromise.resolve(null) : this.ps.getDocuments(e, n).next((i) => {
      const s = this.Ds(t, i);
      return this.Cs(t, s, n, r) ? PersistencePromise.resolve(null) : (__PRIVATE_getLogLevel() <= LogLevel.DEBUG && __PRIVATE_logDebug("QueryEngine", "Re-using previous result from %s to execute query: %s", r.toString(), __PRIVATE_stringifyQuery(t)), this.vs(e, s, t, __PRIVATE_newIndexOffsetSuccessorFromReadTime(r, U)).next((e2) => e2));
    });
  }
  Ds(e, t) {
    let n = new SortedSet(__PRIVATE_newQueryComparator(e));
    return t.forEach((t2, r) => {
      __PRIVATE_queryMatches(e, r) && (n = n.add(r));
    }), n;
  }
  Cs(e, t, n, r) {
    if (e.limit === null)
      return false;
    if (n.size !== t.size)
      return true;
    const i = e.limitType === "F" ? t.last() : t.first();
    return !!i && (i.hasPendingWrites || i.version.compareTo(r) > 0);
  }
  Ss(e, t, n) {
    return __PRIVATE_getLogLevel() <= LogLevel.DEBUG && __PRIVATE_logDebug("QueryEngine", "Using full collection scan to execute query:", __PRIVATE_stringifyQuery(t)), this.ps.getDocumentsMatchingQuery(e, t, IndexOffset.min(), n);
  }
  vs(e, t, n, r) {
    return this.ps.getDocumentsMatchingQuery(e, n, r).next((e2) => (t.forEach((t2) => {
      e2 = e2.insert(t2.key, t2);
    }), e2));
  }
}
var Ut = "LocalStore";
var Kt = 300000000;

class __PRIVATE_LocalStoreImpl {
  constructor(e, t, n, r) {
    this.persistence = e, this.Fs = t, this.serializer = r, this.Ms = new SortedMap(__PRIVATE_primitiveComparator), this.xs = new ObjectMap((e2) => __PRIVATE_canonifyTarget(e2), __PRIVATE_targetEquals), this.Os = new Map, this.Ns = e.getRemoteDocumentCache(), this.Pi = e.getTargetCache(), this.Ii = e.getBundleCache(), this.Bs(n);
  }
  Bs(e) {
    this.documentOverlayCache = this.persistence.getDocumentOverlayCache(e), this.indexManager = this.persistence.getIndexManager(e), this.mutationQueue = this.persistence.getMutationQueue(e, this.indexManager), this.localDocuments = new LocalDocumentsView(this.Ns, this.mutationQueue, this.documentOverlayCache, this.indexManager), this.Ns.setIndexManager(this.indexManager), this.Fs.initialize(this.localDocuments, this.indexManager);
  }
  collectGarbage(e) {
    return this.persistence.runTransaction("Collect garbage", "readwrite-primary", (t) => e.collect(t, this.Ms));
  }
}
function __PRIVATE_newLocalStore(e, t, n, r) {
  return new __PRIVATE_LocalStoreImpl(e, t, n, r);
}
async function __PRIVATE_localStoreHandleUserChange(e, t) {
  const n = __PRIVATE_debugCast(e);
  return await n.persistence.runTransaction("Handle user change", "readonly", (e2) => {
    let r;
    return n.mutationQueue.getAllMutationBatches(e2).next((i) => (r = i, n.Bs(t), n.mutationQueue.getAllMutationBatches(e2))).next((t2) => {
      const i = [], s = [];
      let o = __PRIVATE_documentKeySet();
      for (const e3 of r) {
        i.push(e3.batchId);
        for (const t3 of e3.mutations)
          o = o.add(t3.key);
      }
      for (const e3 of t2) {
        s.push(e3.batchId);
        for (const t3 of e3.mutations)
          o = o.add(t3.key);
      }
      return n.localDocuments.getDocuments(e2, o).next((e3) => ({
        Ls: e3,
        removedBatchIds: i,
        addedBatchIds: s
      }));
    });
  });
}
function __PRIVATE_localStoreAcknowledgeBatch(e, t) {
  const n = __PRIVATE_debugCast(e);
  return n.persistence.runTransaction("Acknowledge batch", "readwrite-primary", (e2) => {
    const r = t.batch.keys(), i = n.Ns.newChangeBuffer({
      trackRemovals: true
    });
    return function __PRIVATE_applyWriteToRemoteDocuments(e3, t2, n2, r2) {
      const i2 = n2.batch, s = i2.keys();
      let o = PersistencePromise.resolve();
      return s.forEach((e4) => {
        o = o.next(() => r2.getEntry(t2, e4)).next((t3) => {
          const s2 = n2.docVersions.get(e4);
          __PRIVATE_hardAssert(s2 !== null, 48541), t3.version.compareTo(s2) < 0 && (i2.applyToRemoteDocument(t3, n2), t3.isValidDocument() && (t3.setReadTime(n2.commitVersion), r2.addEntry(t3)));
        });
      }), o.next(() => e3.mutationQueue.removeMutationBatch(t2, i2));
    }(n, e2, t, i).next(() => i.apply(e2)).next(() => n.mutationQueue.performConsistencyCheck(e2)).next(() => n.documentOverlayCache.removeOverlaysForBatchId(e2, r, t.batch.batchId)).next(() => n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e2, function __PRIVATE_getKeysWithTransformResults(e3) {
      let t2 = __PRIVATE_documentKeySet();
      for (let n2 = 0;n2 < e3.mutationResults.length; ++n2) {
        e3.mutationResults[n2].transformResults.length > 0 && (t2 = t2.add(e3.batch.mutations[n2].key));
      }
      return t2;
    }(t))).next(() => n.localDocuments.getDocuments(e2, r));
  });
}
function __PRIVATE_localStoreGetLastRemoteSnapshotVersion(e) {
  const t = __PRIVATE_debugCast(e);
  return t.persistence.runTransaction("Get last remote snapshot version", "readonly", (e2) => t.Pi.getLastRemoteSnapshotVersion(e2));
}
function __PRIVATE_localStoreApplyRemoteEventToLocalCache(e, t) {
  const n = __PRIVATE_debugCast(e), r = t.snapshotVersion;
  let i = n.Ms;
  return n.persistence.runTransaction("Apply remote event", "readwrite-primary", (e2) => {
    const s = n.Ns.newChangeBuffer({
      trackRemovals: true
    });
    i = n.Ms;
    const o = [];
    t.targetChanges.forEach((s2, _2) => {
      const a2 = i.get(_2);
      if (!a2)
        return;
      o.push(n.Pi.removeMatchingKeys(e2, s2.removedDocuments, _2).next(() => n.Pi.addMatchingKeys(e2, s2.addedDocuments, _2)));
      let u = a2.withSequenceNumber(e2.currentSequenceNumber);
      t.targetMismatches.get(_2) !== null ? u = u.withResumeToken(ByteString.EMPTY_BYTE_STRING, SnapshotVersion.min()).withLastLimboFreeSnapshotVersion(SnapshotVersion.min()) : s2.resumeToken.approximateByteSize() > 0 && (u = u.withResumeToken(s2.resumeToken, r)), i = i.insert(_2, u), function __PRIVATE_shouldPersistTargetData(e3, t2, n2) {
        if (e3.resumeToken.approximateByteSize() === 0)
          return true;
        const r2 = t2.snapshotVersion.toMicroseconds() - e3.snapshotVersion.toMicroseconds();
        if (r2 >= Kt)
          return true;
        const i2 = n2.addedDocuments.size + n2.modifiedDocuments.size + n2.removedDocuments.size;
        return i2 > 0;
      }(a2, u, s2) && o.push(n.Pi.updateTargetData(e2, u));
    });
    let _ = __PRIVATE_mutableDocumentMap(), a = __PRIVATE_documentKeySet();
    if (t.documentUpdates.forEach((r2) => {
      t.resolvedLimboDocuments.has(r2) && o.push(n.persistence.referenceDelegate.updateLimboDocument(e2, r2));
    }), o.push(__PRIVATE_populateDocumentChangeBuffer(e2, s, t.documentUpdates).next((e3) => {
      _ = e3.ks, a = e3.qs;
    })), !r.isEqual(SnapshotVersion.min())) {
      const t2 = n.Pi.getLastRemoteSnapshotVersion(e2).next((t3) => n.Pi.setTargetsMetadata(e2, e2.currentSequenceNumber, r));
      o.push(t2);
    }
    return PersistencePromise.waitFor(o).next(() => s.apply(e2)).next(() => n.localDocuments.getLocalViewOfDocuments(e2, _, a)).next(() => _);
  }).then((e2) => (n.Ms = i, e2));
}
function __PRIVATE_populateDocumentChangeBuffer(e, t, n) {
  let r = __PRIVATE_documentKeySet(), i = __PRIVATE_documentKeySet();
  return n.forEach((e2) => r = r.add(e2)), t.getEntries(e, r).next((e2) => {
    let r2 = __PRIVATE_mutableDocumentMap();
    return n.forEach((n2, s) => {
      const o = e2.get(n2);
      s.isFoundDocument() !== o.isFoundDocument() && (i = i.add(n2)), s.isNoDocument() && s.version.isEqual(SnapshotVersion.min()) ? (t.removeEntry(n2, s.readTime), r2 = r2.insert(n2, s)) : !o.isValidDocument() || s.version.compareTo(o.version) > 0 || s.version.compareTo(o.version) === 0 && o.hasPendingWrites ? (t.addEntry(s), r2 = r2.insert(n2, s)) : __PRIVATE_logDebug(Ut, "Ignoring outdated watch update for ", n2, ". Current version:", o.version, " Watch version:", s.version);
    }), {
      ks: r2,
      qs: i
    };
  });
}
function __PRIVATE_localStoreGetNextMutationBatch(e, t) {
  const n = __PRIVATE_debugCast(e);
  return n.persistence.runTransaction("Get next mutation batch", "readonly", (e2) => (t === undefined && (t = j), n.mutationQueue.getNextMutationBatchAfterBatchId(e2, t)));
}
function __PRIVATE_localStoreAllocateTarget(e, t) {
  const n = __PRIVATE_debugCast(e);
  return n.persistence.runTransaction("Allocate target", "readwrite", (e2) => {
    let r;
    return n.Pi.getTargetData(e2, t).next((i) => i ? (r = i, PersistencePromise.resolve(r)) : n.Pi.allocateTargetId(e2).next((i2) => (r = new TargetData(t, i2, "TargetPurposeListen", e2.currentSequenceNumber), n.Pi.addTargetData(e2, r).next(() => r))));
  }).then((e2) => {
    const r = n.Ms.get(e2.targetId);
    return (r === null || e2.snapshotVersion.compareTo(r.snapshotVersion) > 0) && (n.Ms = n.Ms.insert(e2.targetId, e2), n.xs.set(t, e2.targetId)), e2;
  });
}
async function __PRIVATE_localStoreReleaseTarget(e, t, n) {
  const r = __PRIVATE_debugCast(e), i = r.Ms.get(t), s = n ? "readwrite" : "readwrite-primary";
  try {
    n || await r.persistence.runTransaction("Release target", s, (e2) => r.persistence.referenceDelegate.removeTarget(e2, i));
  } catch (e2) {
    if (!__PRIVATE_isIndexedDbTransactionError(e2))
      throw e2;
    __PRIVATE_logDebug(Ut, `Failed to update sequence numbers for target ${t}: ${e2}`);
  }
  r.Ms = r.Ms.remove(t), r.xs.delete(i.target);
}
function __PRIVATE_localStoreExecuteQuery(e, t, n) {
  const r = __PRIVATE_debugCast(e);
  let i = SnapshotVersion.min(), s = __PRIVATE_documentKeySet();
  return r.persistence.runTransaction("Execute query", "readwrite", (e2) => function __PRIVATE_localStoreGetTargetData(e3, t2, n2) {
    const r2 = __PRIVATE_debugCast(e3), i2 = r2.xs.get(n2);
    return i2 !== undefined ? PersistencePromise.resolve(r2.Ms.get(i2)) : r2.Pi.getTargetData(t2, n2);
  }(r, e2, __PRIVATE_queryToTarget(t)).next((t2) => {
    if (t2)
      return i = t2.lastLimboFreeSnapshotVersion, r.Pi.getMatchingKeysForTargetId(e2, t2.targetId).next((e3) => {
        s = e3;
      });
  }).next(() => r.Fs.getDocumentsMatchingQuery(e2, t, n ? i : SnapshotVersion.min(), n ? s : __PRIVATE_documentKeySet())).next((e3) => (__PRIVATE_setMaxReadTime(r, __PRIVATE_queryCollectionGroup(t), e3), {
    documents: e3,
    Qs: s
  })));
}
function __PRIVATE_setMaxReadTime(e, t, n) {
  let r = e.Os.get(t) || SnapshotVersion.min();
  n.forEach((e2, t2) => {
    t2.readTime.compareTo(r) > 0 && (r = t2.readTime);
  }), e.Os.set(t, r);
}
class __PRIVATE_LocalClientState {
  constructor() {
    this.activeTargetIds = __PRIVATE_targetIdSet();
  }
  zs(e) {
    this.activeTargetIds = this.activeTargetIds.add(e);
  }
  js(e) {
    this.activeTargetIds = this.activeTargetIds.delete(e);
  }
  Gs() {
    const e = {
      activeTargetIds: this.activeTargetIds.toArray(),
      updateTimeMs: Date.now()
    };
    return JSON.stringify(e);
  }
}
class __PRIVATE_MemorySharedClientState {
  constructor() {
    this.Mo = new __PRIVATE_LocalClientState, this.xo = {}, this.onlineStateHandler = null, this.sequenceNumberHandler = null;
  }
  addPendingMutation(e) {}
  updateMutationState(e, t, n) {}
  addLocalQueryTarget(e, t = true) {
    return t && this.Mo.zs(e), this.xo[e] || "not-current";
  }
  updateQueryState(e, t, n) {
    this.xo[e] = t;
  }
  removeLocalQueryTarget(e) {
    this.Mo.js(e);
  }
  isLocalQueryTarget(e) {
    return this.Mo.activeTargetIds.has(e);
  }
  clearQueryState(e) {
    delete this.xo[e];
  }
  getAllActiveQueryTargets() {
    return this.Mo.activeTargetIds;
  }
  isActiveQueryTarget(e) {
    return this.Mo.activeTargetIds.has(e);
  }
  start() {
    return this.Mo = new __PRIVATE_LocalClientState, Promise.resolve();
  }
  handleUserChange(e, t, n) {}
  setOnlineState(e) {}
  shutdown() {}
  writeSequenceNumber(e) {}
  notifyBundleLoaded(e) {}
}

class __PRIVATE_NoopConnectivityMonitor {
  Oo(e) {}
  shutdown() {}
}
var Jt = "ConnectivityMonitor";

class __PRIVATE_BrowserConnectivityMonitor {
  constructor() {
    this.No = () => this.Bo(), this.Lo = () => this.ko(), this.qo = [], this.Qo();
  }
  Oo(e) {
    this.qo.push(e);
  }
  shutdown() {
    window.removeEventListener("online", this.No), window.removeEventListener("offline", this.Lo);
  }
  Qo() {
    window.addEventListener("online", this.No), window.addEventListener("offline", this.Lo);
  }
  Bo() {
    __PRIVATE_logDebug(Jt, "Network connectivity changed: AVAILABLE");
    for (const e of this.qo)
      e(0);
  }
  ko() {
    __PRIVATE_logDebug(Jt, "Network connectivity changed: UNAVAILABLE");
    for (const e of this.qo)
      e(1);
  }
  static v() {
    return typeof window != "undefined" && window.addEventListener !== undefined && window.removeEventListener !== undefined;
  }
}
var Ht = null;
function __PRIVATE_generateUniqueDebugId() {
  return Ht === null ? Ht = function __PRIVATE_generateInitialUniqueDebugId() {
    return 268435456 + Math.round(2147483648 * Math.random());
  }() : Ht++, "0x" + Ht.toString(16);
}
var Yt = "RestConnection";
var Zt = {
  BatchGetDocuments: "batchGet",
  Commit: "commit",
  RunQuery: "runQuery",
  RunAggregationQuery: "runAggregationQuery"
};

class __PRIVATE_RestConnection {
  get $o() {
    return false;
  }
  constructor(e) {
    this.databaseInfo = e, this.databaseId = e.databaseId;
    const t = e.ssl ? "https" : "http", n = encodeURIComponent(this.databaseId.projectId), r = encodeURIComponent(this.databaseId.database);
    this.Uo = t + "://" + e.host, this.Ko = `projects/${n}/databases/${r}`, this.Wo = this.databaseId.database === lt ? `project_id=${n}` : `project_id=${n}&database_id=${r}`;
  }
  Go(e, t, n, r, i) {
    const s = __PRIVATE_generateUniqueDebugId(), o = this.zo(e, t.toUriEncodedString());
    __PRIVATE_logDebug(Yt, `Sending RPC '${e}' ${s}:`, o, n);
    const _ = {
      "google-cloud-resource-prefix": this.Ko,
      "x-goog-request-params": this.Wo
    };
    this.jo(_, r, i);
    const { host: a } = new URL(o), u = isCloudWorkstation(a);
    return this.Jo(e, o, _, n, u).then((t2) => (__PRIVATE_logDebug(Yt, `Received RPC '${e}' ${s}: `, t2), t2), (t2) => {
      throw __PRIVATE_logWarn(Yt, `RPC '${e}' ${s} failed with error: `, t2, "url: ", o, "request:", n), t2;
    });
  }
  Ho(e, t, n, r, i, s) {
    return this.Go(e, t, n, r, i);
  }
  jo(e, t, n) {
    e["X-Goog-Api-Client"] = function __PRIVATE_getGoogApiClientValue() {
      return "gl-js/ fire/" + x;
    }(), e["Content-Type"] = "text/plain", this.databaseInfo.appId && (e["X-Firebase-GMPID"] = this.databaseInfo.appId), t && t.headers.forEach((t2, n2) => e[n2] = t2), n && n.headers.forEach((t2, n2) => e[n2] = t2);
  }
  zo(e, t) {
    const n = Zt[e];
    return `${this.Uo}/v1/${t}:${n}`;
  }
  terminate() {}
}

class __PRIVATE_StreamBridge {
  constructor(e) {
    this.Yo = e.Yo, this.Zo = e.Zo;
  }
  Xo(e) {
    this.e_ = e;
  }
  t_(e) {
    this.n_ = e;
  }
  r_(e) {
    this.i_ = e;
  }
  onMessage(e) {
    this.s_ = e;
  }
  close() {
    this.Zo();
  }
  send(e) {
    this.Yo(e);
  }
  o_() {
    this.e_();
  }
  __() {
    this.n_();
  }
  a_(e) {
    this.i_(e);
  }
  u_(e) {
    this.s_(e);
  }
}
var Xt = "WebChannelConnection";

class __PRIVATE_WebChannelConnection extends __PRIVATE_RestConnection {
  constructor(e) {
    super(e), this.c_ = [], this.forceLongPolling = e.forceLongPolling, this.autoDetectLongPolling = e.autoDetectLongPolling, this.useFetchStreams = e.useFetchStreams, this.longPollingOptions = e.longPollingOptions;
  }
  Jo(e, t, n, r, i) {
    const s = __PRIVATE_generateUniqueDebugId();
    return new Promise((i2, o) => {
      const _ = new XhrIo;
      _.setWithCredentials(true), _.listenOnce(EventType.COMPLETE, () => {
        try {
          switch (_.getLastErrorCode()) {
            case ErrorCode.NO_ERROR:
              const t2 = _.getResponseJson();
              __PRIVATE_logDebug(Xt, `XHR for RPC '${e}' ${s} received:`, JSON.stringify(t2)), i2(t2);
              break;
            case ErrorCode.TIMEOUT:
              __PRIVATE_logDebug(Xt, `RPC '${e}' ${s} timed out`), o(new FirestoreError(N.DEADLINE_EXCEEDED, "Request time out"));
              break;
            case ErrorCode.HTTP_ERROR:
              const n2 = _.getStatus();
              if (__PRIVATE_logDebug(Xt, `RPC '${e}' ${s} failed with status:`, n2, "response text:", _.getResponseText()), n2 > 0) {
                let e2 = _.getResponseJson();
                Array.isArray(e2) && (e2 = e2[0]);
                const t3 = e2?.error;
                if (t3 && t3.status && t3.message) {
                  const e3 = function __PRIVATE_mapCodeFromHttpResponseErrorStatus(e4) {
                    const t4 = e4.toLowerCase().replace(/_/g, "-");
                    return Object.values(N).indexOf(t4) >= 0 ? t4 : N.UNKNOWN;
                  }(t3.status);
                  o(new FirestoreError(e3, t3.message));
                } else
                  o(new FirestoreError(N.UNKNOWN, "Server responded with status " + _.getStatus()));
              } else
                o(new FirestoreError(N.UNAVAILABLE, "Connection failed."));
              break;
            default:
              fail(9055, {
                l_: e,
                streamId: s,
                h_: _.getLastErrorCode(),
                P_: _.getLastError()
              });
          }
        } finally {
          __PRIVATE_logDebug(Xt, `RPC '${e}' ${s} completed.`);
        }
      });
      const a = JSON.stringify(r);
      __PRIVATE_logDebug(Xt, `RPC '${e}' ${s} sending request:`, r), _.send(t, "POST", a, n, 15);
    });
  }
  T_(e, t, n) {
    const r = __PRIVATE_generateUniqueDebugId(), i = [this.Uo, "/", "google.firestore.v1.Firestore", "/", e, "/channel"], s = createWebChannelTransport(), o = getStatEventTarget(), _ = {
      httpSessionIdParam: "gsessionid",
      initMessageHeaders: {},
      messageUrlParams: {
        database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`
      },
      sendRawJson: true,
      supportsCrossDomainXhr: true,
      internalChannelParams: {
        forwardChannelRequestTimeoutMs: 600000
      },
      forceLongPolling: this.forceLongPolling,
      detectBufferingProxy: this.autoDetectLongPolling
    }, a = this.longPollingOptions.timeoutSeconds;
    a !== undefined && (_.longPollingTimeout = Math.round(1000 * a)), this.useFetchStreams && (_.useFetchStreams = true), this.jo(_.initMessageHeaders, t, n), _.encodeInitMessageHeaders = true;
    const u = i.join("");
    __PRIVATE_logDebug(Xt, `Creating RPC '${e}' stream ${r}: ${u}`, _);
    const c = s.createWebChannel(u, _);
    this.I_(c);
    let l = false, h = false;
    const P = new __PRIVATE_StreamBridge({
      Yo: (t2) => {
        h ? __PRIVATE_logDebug(Xt, `Not sending because RPC '${e}' stream ${r} is closed:`, t2) : (l || (__PRIVATE_logDebug(Xt, `Opening RPC '${e}' stream ${r} transport.`), c.open(), l = true), __PRIVATE_logDebug(Xt, `RPC '${e}' stream ${r} sending:`, t2), c.send(t2));
      },
      Zo: () => c.close()
    }), __PRIVATE_unguardedEventListen = (e2, t2, n2) => {
      e2.listen(t2, (e3) => {
        try {
          n2(e3);
        } catch (e4) {
          setTimeout(() => {
            throw e4;
          }, 0);
        }
      });
    };
    return __PRIVATE_unguardedEventListen(c, WebChannel.EventType.OPEN, () => {
      h || (__PRIVATE_logDebug(Xt, `RPC '${e}' stream ${r} transport opened.`), P.o_());
    }), __PRIVATE_unguardedEventListen(c, WebChannel.EventType.CLOSE, () => {
      h || (h = true, __PRIVATE_logDebug(Xt, `RPC '${e}' stream ${r} transport closed`), P.a_(), this.E_(c));
    }), __PRIVATE_unguardedEventListen(c, WebChannel.EventType.ERROR, (t2) => {
      h || (h = true, __PRIVATE_logWarn(Xt, `RPC '${e}' stream ${r} transport errored. Name:`, t2.name, "Message:", t2.message), P.a_(new FirestoreError(N.UNAVAILABLE, "The operation could not be completed")));
    }), __PRIVATE_unguardedEventListen(c, WebChannel.EventType.MESSAGE, (t2) => {
      if (!h) {
        const n2 = t2.data[0];
        __PRIVATE_hardAssert(!!n2, 16349);
        const i2 = n2, s2 = i2?.error || i2[0]?.error;
        if (s2) {
          __PRIVATE_logDebug(Xt, `RPC '${e}' stream ${r} received error:`, s2);
          const t3 = s2.status;
          let n3 = function __PRIVATE_mapCodeFromRpcStatus(e2) {
            const t4 = pt[e2];
            if (t4 !== undefined)
              return __PRIVATE_mapCodeFromRpcCode(t4);
          }(t3), i3 = s2.message;
          n3 === undefined && (n3 = N.INTERNAL, i3 = "Unknown error status: " + t3 + " with message " + s2.message), h = true, P.a_(new FirestoreError(n3, i3)), c.close();
        } else
          __PRIVATE_logDebug(Xt, `RPC '${e}' stream ${r} received:`, n2), P.u_(n2);
      }
    }), __PRIVATE_unguardedEventListen(o, Event.STAT_EVENT, (t2) => {
      t2.stat === Stat.PROXY ? __PRIVATE_logDebug(Xt, `RPC '${e}' stream ${r} detected buffering proxy`) : t2.stat === Stat.NOPROXY && __PRIVATE_logDebug(Xt, `RPC '${e}' stream ${r} detected no buffering proxy`);
    }), setTimeout(() => {
      P.__();
    }, 0), P;
  }
  terminate() {
    this.c_.forEach((e) => e.close()), this.c_ = [];
  }
  I_(e) {
    this.c_.push(e);
  }
  E_(e) {
    this.c_ = this.c_.filter((t) => t === e);
  }
}
function getDocument() {
  return typeof document != "undefined" ? document : null;
}
function __PRIVATE_newSerializer(e) {
  return new JsonProtoSerializer(e, true);
}

class __PRIVATE_ExponentialBackoff {
  constructor(e, t, n = 1000, r = 1.5, i = 60000) {
    this.Mi = e, this.timerId = t, this.d_ = n, this.A_ = r, this.R_ = i, this.V_ = 0, this.m_ = null, this.f_ = Date.now(), this.reset();
  }
  reset() {
    this.V_ = 0;
  }
  g_() {
    this.V_ = this.R_;
  }
  p_(e) {
    this.cancel();
    const t = Math.floor(this.V_ + this.y_()), n = Math.max(0, Date.now() - this.f_), r = Math.max(0, t - n);
    r > 0 && __PRIVATE_logDebug("ExponentialBackoff", `Backing off for ${r} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`), this.m_ = this.Mi.enqueueAfterDelay(this.timerId, r, () => (this.f_ = Date.now(), e())), this.V_ *= this.A_, this.V_ < this.d_ && (this.V_ = this.d_), this.V_ > this.R_ && (this.V_ = this.R_);
  }
  w_() {
    this.m_ !== null && (this.m_.skipDelay(), this.m_ = null);
  }
  cancel() {
    this.m_ !== null && (this.m_.cancel(), this.m_ = null);
  }
  y_() {
    return (Math.random() - 0.5) * this.V_;
  }
}
var en = "PersistentStream";

class __PRIVATE_PersistentStream {
  constructor(e, t, n, r, i, s, o, _) {
    this.Mi = e, this.S_ = n, this.b_ = r, this.connection = i, this.authCredentialsProvider = s, this.appCheckCredentialsProvider = o, this.listener = _, this.state = 0, this.D_ = 0, this.C_ = null, this.v_ = null, this.stream = null, this.F_ = 0, this.M_ = new __PRIVATE_ExponentialBackoff(e, t);
  }
  x_() {
    return this.state === 1 || this.state === 5 || this.O_();
  }
  O_() {
    return this.state === 2 || this.state === 3;
  }
  start() {
    this.F_ = 0, this.state !== 4 ? this.auth() : this.N_();
  }
  async stop() {
    this.x_() && await this.close(0);
  }
  B_() {
    this.state = 0, this.M_.reset();
  }
  L_() {
    this.O_() && this.C_ === null && (this.C_ = this.Mi.enqueueAfterDelay(this.S_, 60000, () => this.k_()));
  }
  q_(e) {
    this.Q_(), this.stream.send(e);
  }
  async k_() {
    if (this.O_())
      return this.close(0);
  }
  Q_() {
    this.C_ && (this.C_.cancel(), this.C_ = null);
  }
  U_() {
    this.v_ && (this.v_.cancel(), this.v_ = null);
  }
  async close(e, t) {
    this.Q_(), this.U_(), this.M_.cancel(), this.D_++, e !== 4 ? this.M_.reset() : t && t.code === N.RESOURCE_EXHAUSTED ? (__PRIVATE_logError(t.toString()), __PRIVATE_logError("Using maximum backoff delay to prevent overloading the backend."), this.M_.g_()) : t && t.code === N.UNAUTHENTICATED && this.state !== 3 && (this.authCredentialsProvider.invalidateToken(), this.appCheckCredentialsProvider.invalidateToken()), this.stream !== null && (this.K_(), this.stream.close(), this.stream = null), this.state = e, await this.listener.r_(t);
  }
  K_() {}
  auth() {
    this.state = 1;
    const e = this.W_(this.D_), t = this.D_;
    Promise.all([this.authCredentialsProvider.getToken(), this.appCheckCredentialsProvider.getToken()]).then(([e2, n]) => {
      this.D_ === t && this.G_(e2, n);
    }, (t2) => {
      e(() => {
        const e2 = new FirestoreError(N.UNKNOWN, "Fetching auth token failed: " + t2.message);
        return this.z_(e2);
      });
    });
  }
  G_(e, t) {
    const n = this.W_(this.D_);
    this.stream = this.j_(e, t), this.stream.Xo(() => {
      n(() => this.listener.Xo());
    }), this.stream.t_(() => {
      n(() => (this.state = 2, this.v_ = this.Mi.enqueueAfterDelay(this.b_, 1e4, () => (this.O_() && (this.state = 3), Promise.resolve())), this.listener.t_()));
    }), this.stream.r_((e2) => {
      n(() => this.z_(e2));
    }), this.stream.onMessage((e2) => {
      n(() => ++this.F_ == 1 ? this.J_(e2) : this.onNext(e2));
    });
  }
  N_() {
    this.state = 5, this.M_.p_(async () => {
      this.state = 0, this.start();
    });
  }
  z_(e) {
    return __PRIVATE_logDebug(en, `close with error: ${e}`), this.stream = null, this.close(4, e);
  }
  W_(e) {
    return (t) => {
      this.Mi.enqueueAndForget(() => this.D_ === e ? t() : (__PRIVATE_logDebug(en, "stream callback skipped by getCloseGuardedDispatcher."), Promise.resolve()));
    };
  }
}

class __PRIVATE_PersistentListenStream extends __PRIVATE_PersistentStream {
  constructor(e, t, n, r, i, s) {
    super(e, "listen_stream_connection_backoff", "listen_stream_idle", "health_check_timeout", t, n, r, s), this.serializer = i;
  }
  j_(e, t) {
    return this.connection.T_("Listen", e, t);
  }
  J_(e) {
    return this.onNext(e);
  }
  onNext(e) {
    this.M_.reset();
    const t = __PRIVATE_fromWatchChange(this.serializer, e), n = function __PRIVATE_versionFromListenResponse(e2) {
      if (!("targetChange" in e2))
        return SnapshotVersion.min();
      const t2 = e2.targetChange;
      return t2.targetIds && t2.targetIds.length ? SnapshotVersion.min() : t2.readTime ? __PRIVATE_fromVersion(t2.readTime) : SnapshotVersion.min();
    }(e);
    return this.listener.H_(t, n);
  }
  Y_(e) {
    const t = {};
    t.database = __PRIVATE_getEncodedDatabaseId(this.serializer), t.addTarget = function __PRIVATE_toTarget(e2, t2) {
      let n2;
      const r = t2.target;
      if (n2 = __PRIVATE_targetIsDocumentTarget(r) ? {
        documents: __PRIVATE_toDocumentsTarget(e2, r)
      } : {
        query: __PRIVATE_toQueryTarget(e2, r).ft
      }, n2.targetId = t2.targetId, t2.resumeToken.approximateByteSize() > 0) {
        n2.resumeToken = __PRIVATE_toBytes(e2, t2.resumeToken);
        const r2 = __PRIVATE_toInt32Proto(e2, t2.expectedCount);
        r2 !== null && (n2.expectedCount = r2);
      } else if (t2.snapshotVersion.compareTo(SnapshotVersion.min()) > 0) {
        n2.readTime = toTimestamp(e2, t2.snapshotVersion.toTimestamp());
        const r2 = __PRIVATE_toInt32Proto(e2, t2.expectedCount);
        r2 !== null && (n2.expectedCount = r2);
      }
      return n2;
    }(this.serializer, e);
    const n = __PRIVATE_toListenRequestLabels(this.serializer, e);
    n && (t.labels = n), this.q_(t);
  }
  Z_(e) {
    const t = {};
    t.database = __PRIVATE_getEncodedDatabaseId(this.serializer), t.removeTarget = e, this.q_(t);
  }
}

class __PRIVATE_PersistentWriteStream extends __PRIVATE_PersistentStream {
  constructor(e, t, n, r, i, s) {
    super(e, "write_stream_connection_backoff", "write_stream_idle", "health_check_timeout", t, n, r, s), this.serializer = i;
  }
  get X_() {
    return this.F_ > 0;
  }
  start() {
    this.lastStreamToken = undefined, super.start();
  }
  K_() {
    this.X_ && this.ea([]);
  }
  j_(e, t) {
    return this.connection.T_("Write", e, t);
  }
  J_(e) {
    return __PRIVATE_hardAssert(!!e.streamToken, 31322), this.lastStreamToken = e.streamToken, __PRIVATE_hardAssert(!e.writeResults || e.writeResults.length === 0, 55816), this.listener.ta();
  }
  onNext(e) {
    __PRIVATE_hardAssert(!!e.streamToken, 12678), this.lastStreamToken = e.streamToken, this.M_.reset();
    const t = __PRIVATE_fromWriteResults(e.writeResults, e.commitTime), n = __PRIVATE_fromVersion(e.commitTime);
    return this.listener.na(n, t);
  }
  ra() {
    const e = {};
    e.database = __PRIVATE_getEncodedDatabaseId(this.serializer), this.q_(e);
  }
  ea(e) {
    const t = {
      streamToken: this.lastStreamToken,
      writes: e.map((e2) => toMutation(this.serializer, e2))
    };
    this.q_(t);
  }
}

class Datastore {
}

class __PRIVATE_DatastoreImpl extends Datastore {
  constructor(e, t, n, r) {
    super(), this.authCredentials = e, this.appCheckCredentials = t, this.connection = n, this.serializer = r, this.ia = false;
  }
  sa() {
    if (this.ia)
      throw new FirestoreError(N.FAILED_PRECONDITION, "The client has already been terminated.");
  }
  Go(e, t, n, r) {
    return this.sa(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then(([i, s]) => this.connection.Go(e, __PRIVATE_toResourcePath(t, n), r, i, s)).catch((e2) => {
      throw e2.name === "FirebaseError" ? (e2.code === N.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), e2) : new FirestoreError(N.UNKNOWN, e2.toString());
    });
  }
  Ho(e, t, n, r, i) {
    return this.sa(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then(([s, o]) => this.connection.Ho(e, __PRIVATE_toResourcePath(t, n), r, s, o, i)).catch((e2) => {
      throw e2.name === "FirebaseError" ? (e2.code === N.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), e2) : new FirestoreError(N.UNKNOWN, e2.toString());
    });
  }
  terminate() {
    this.ia = true, this.connection.terminate();
  }
}

class __PRIVATE_OnlineStateTracker {
  constructor(e, t) {
    this.asyncQueue = e, this.onlineStateHandler = t, this.state = "Unknown", this.oa = 0, this._a = null, this.aa = true;
  }
  ua() {
    this.oa === 0 && (this.ca("Unknown"), this._a = this.asyncQueue.enqueueAfterDelay("online_state_timeout", 1e4, () => (this._a = null, this.la("Backend didn't respond within 10 seconds."), this.ca("Offline"), Promise.resolve())));
  }
  ha(e) {
    this.state === "Online" ? this.ca("Unknown") : (this.oa++, this.oa >= 1 && (this.Pa(), this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`), this.ca("Offline")));
  }
  set(e) {
    this.Pa(), this.oa = 0, e === "Online" && (this.aa = false), this.ca(e);
  }
  ca(e) {
    e !== this.state && (this.state = e, this.onlineStateHandler(e));
  }
  la(e) {
    const t = `Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
    this.aa ? (__PRIVATE_logError(t), this.aa = false) : __PRIVATE_logDebug("OnlineStateTracker", t);
  }
  Pa() {
    this._a !== null && (this._a.cancel(), this._a = null);
  }
}
var tn = "RemoteStore";

class __PRIVATE_RemoteStoreImpl {
  constructor(e, t, n, r, i) {
    this.localStore = e, this.datastore = t, this.asyncQueue = n, this.remoteSyncer = {}, this.Ta = [], this.Ia = new Map, this.Ea = new Set, this.da = [], this.Aa = i, this.Aa.Oo((e2) => {
      n.enqueueAndForget(async () => {
        __PRIVATE_canUseNetwork(this) && (__PRIVATE_logDebug(tn, "Restarting streams for network reachability change."), await async function __PRIVATE_restartNetwork(e3) {
          const t2 = __PRIVATE_debugCast(e3);
          t2.Ea.add(4), await __PRIVATE_disableNetworkInternal(t2), t2.Ra.set("Unknown"), t2.Ea.delete(4), await __PRIVATE_enableNetworkInternal(t2);
        }(this));
      });
    }), this.Ra = new __PRIVATE_OnlineStateTracker(n, r);
  }
}
async function __PRIVATE_enableNetworkInternal(e) {
  if (__PRIVATE_canUseNetwork(e))
    for (const t of e.da)
      await t(true);
}
async function __PRIVATE_disableNetworkInternal(e) {
  for (const t of e.da)
    await t(false);
}
function __PRIVATE_remoteStoreListen(e, t) {
  const n = __PRIVATE_debugCast(e);
  n.Ia.has(t.targetId) || (n.Ia.set(t.targetId, t), __PRIVATE_shouldStartWatchStream(n) ? __PRIVATE_startWatchStream(n) : __PRIVATE_ensureWatchStream(n).O_() && __PRIVATE_sendWatchRequest(n, t));
}
function __PRIVATE_remoteStoreUnlisten(e, t) {
  const n = __PRIVATE_debugCast(e), r = __PRIVATE_ensureWatchStream(n);
  n.Ia.delete(t), r.O_() && __PRIVATE_sendUnwatchRequest(n, t), n.Ia.size === 0 && (r.O_() ? r.L_() : __PRIVATE_canUseNetwork(n) && n.Ra.set("Unknown"));
}
function __PRIVATE_sendWatchRequest(e, t) {
  if (e.Va.Ue(t.targetId), t.resumeToken.approximateByteSize() > 0 || t.snapshotVersion.compareTo(SnapshotVersion.min()) > 0) {
    const n = e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;
    t = t.withExpectedCount(n);
  }
  __PRIVATE_ensureWatchStream(e).Y_(t);
}
function __PRIVATE_sendUnwatchRequest(e, t) {
  e.Va.Ue(t), __PRIVATE_ensureWatchStream(e).Z_(t);
}
function __PRIVATE_startWatchStream(e) {
  e.Va = new __PRIVATE_WatchChangeAggregator({
    getRemoteKeysForTarget: (t) => e.remoteSyncer.getRemoteKeysForTarget(t),
    At: (t) => e.Ia.get(t) || null,
    ht: () => e.datastore.serializer.databaseId
  }), __PRIVATE_ensureWatchStream(e).start(), e.Ra.ua();
}
function __PRIVATE_shouldStartWatchStream(e) {
  return __PRIVATE_canUseNetwork(e) && !__PRIVATE_ensureWatchStream(e).x_() && e.Ia.size > 0;
}
function __PRIVATE_canUseNetwork(e) {
  return __PRIVATE_debugCast(e).Ea.size === 0;
}
function __PRIVATE_cleanUpWatchStreamState(e) {
  e.Va = undefined;
}
async function __PRIVATE_onWatchStreamConnected(e) {
  e.Ra.set("Online");
}
async function __PRIVATE_onWatchStreamOpen(e) {
  e.Ia.forEach((t, n) => {
    __PRIVATE_sendWatchRequest(e, t);
  });
}
async function __PRIVATE_onWatchStreamClose(e, t) {
  __PRIVATE_cleanUpWatchStreamState(e), __PRIVATE_shouldStartWatchStream(e) ? (e.Ra.ha(t), __PRIVATE_startWatchStream(e)) : e.Ra.set("Unknown");
}
async function __PRIVATE_onWatchStreamChange(e, t, n) {
  if (e.Ra.set("Online"), t instanceof __PRIVATE_WatchTargetChange && t.state === 2 && t.cause)
    try {
      await async function __PRIVATE_handleTargetError(e2, t2) {
        const n2 = t2.cause;
        for (const r of t2.targetIds)
          e2.Ia.has(r) && (await e2.remoteSyncer.rejectListen(r, n2), e2.Ia.delete(r), e2.Va.removeTarget(r));
      }(e, t);
    } catch (n2) {
      __PRIVATE_logDebug(tn, "Failed to remove targets %s: %s ", t.targetIds.join(","), n2), await __PRIVATE_disableNetworkUntilRecovery(e, n2);
    }
  else if (t instanceof __PRIVATE_DocumentWatchChange ? e.Va.Ze(t) : t instanceof __PRIVATE_ExistenceFilterChange ? e.Va.st(t) : e.Va.tt(t), !n.isEqual(SnapshotVersion.min()))
    try {
      const t2 = await __PRIVATE_localStoreGetLastRemoteSnapshotVersion(e.localStore);
      n.compareTo(t2) >= 0 && await function __PRIVATE_raiseWatchSnapshot(e2, t3) {
        const n2 = e2.Va.Tt(t3);
        return n2.targetChanges.forEach((n3, r) => {
          if (n3.resumeToken.approximateByteSize() > 0) {
            const i = e2.Ia.get(r);
            i && e2.Ia.set(r, i.withResumeToken(n3.resumeToken, t3));
          }
        }), n2.targetMismatches.forEach((t4, n3) => {
          const r = e2.Ia.get(t4);
          if (!r)
            return;
          e2.Ia.set(t4, r.withResumeToken(ByteString.EMPTY_BYTE_STRING, r.snapshotVersion)), __PRIVATE_sendUnwatchRequest(e2, t4);
          const i = new TargetData(r.target, t4, n3, r.sequenceNumber);
          __PRIVATE_sendWatchRequest(e2, i);
        }), e2.remoteSyncer.applyRemoteEvent(n2);
      }(e, n);
    } catch (t2) {
      __PRIVATE_logDebug(tn, "Failed to raise snapshot:", t2), await __PRIVATE_disableNetworkUntilRecovery(e, t2);
    }
}
async function __PRIVATE_disableNetworkUntilRecovery(e, t, n) {
  if (!__PRIVATE_isIndexedDbTransactionError(t))
    throw t;
  e.Ea.add(1), await __PRIVATE_disableNetworkInternal(e), e.Ra.set("Offline"), n || (n = () => __PRIVATE_localStoreGetLastRemoteSnapshotVersion(e.localStore)), e.asyncQueue.enqueueRetryable(async () => {
    __PRIVATE_logDebug(tn, "Retrying IndexedDB access"), await n(), e.Ea.delete(1), await __PRIVATE_enableNetworkInternal(e);
  });
}
function __PRIVATE_executeWithRecovery(e, t) {
  return t().catch((n) => __PRIVATE_disableNetworkUntilRecovery(e, n, t));
}
async function __PRIVATE_fillWritePipeline(e) {
  const t = __PRIVATE_debugCast(e), n = __PRIVATE_ensureWriteStream(t);
  let r = t.Ta.length > 0 ? t.Ta[t.Ta.length - 1].batchId : j;
  for (;__PRIVATE_canAddToWritePipeline(t); )
    try {
      const e2 = await __PRIVATE_localStoreGetNextMutationBatch(t.localStore, r);
      if (e2 === null) {
        t.Ta.length === 0 && n.L_();
        break;
      }
      r = e2.batchId, __PRIVATE_addToWritePipeline(t, e2);
    } catch (e2) {
      await __PRIVATE_disableNetworkUntilRecovery(t, e2);
    }
  __PRIVATE_shouldStartWriteStream(t) && __PRIVATE_startWriteStream(t);
}
function __PRIVATE_canAddToWritePipeline(e) {
  return __PRIVATE_canUseNetwork(e) && e.Ta.length < 10;
}
function __PRIVATE_addToWritePipeline(e, t) {
  e.Ta.push(t);
  const n = __PRIVATE_ensureWriteStream(e);
  n.O_() && n.X_ && n.ea(t.mutations);
}
function __PRIVATE_shouldStartWriteStream(e) {
  return __PRIVATE_canUseNetwork(e) && !__PRIVATE_ensureWriteStream(e).x_() && e.Ta.length > 0;
}
function __PRIVATE_startWriteStream(e) {
  __PRIVATE_ensureWriteStream(e).start();
}
async function __PRIVATE_onWriteStreamOpen(e) {
  __PRIVATE_ensureWriteStream(e).ra();
}
async function __PRIVATE_onWriteHandshakeComplete(e) {
  const t = __PRIVATE_ensureWriteStream(e);
  for (const n of e.Ta)
    t.ea(n.mutations);
}
async function __PRIVATE_onMutationResult(e, t, n) {
  const r = e.Ta.shift(), i = MutationBatchResult.from(r, t, n);
  await __PRIVATE_executeWithRecovery(e, () => e.remoteSyncer.applySuccessfulWrite(i)), await __PRIVATE_fillWritePipeline(e);
}
async function __PRIVATE_onWriteStreamClose(e, t) {
  t && __PRIVATE_ensureWriteStream(e).X_ && await async function __PRIVATE_handleWriteError(e2, t2) {
    if (function __PRIVATE_isPermanentWriteError(e3) {
      return __PRIVATE_isPermanentError(e3) && e3 !== N.ABORTED;
    }(t2.code)) {
      const n = e2.Ta.shift();
      __PRIVATE_ensureWriteStream(e2).B_(), await __PRIVATE_executeWithRecovery(e2, () => e2.remoteSyncer.rejectFailedWrite(n.batchId, t2)), await __PRIVATE_fillWritePipeline(e2);
    }
  }(e, t), __PRIVATE_shouldStartWriteStream(e) && __PRIVATE_startWriteStream(e);
}
async function __PRIVATE_remoteStoreHandleCredentialChange(e, t) {
  const n = __PRIVATE_debugCast(e);
  n.asyncQueue.verifyOperationInProgress(), __PRIVATE_logDebug(tn, "RemoteStore received new credentials");
  const r = __PRIVATE_canUseNetwork(n);
  n.Ea.add(3), await __PRIVATE_disableNetworkInternal(n), r && n.Ra.set("Unknown"), await n.remoteSyncer.handleCredentialChange(t), n.Ea.delete(3), await __PRIVATE_enableNetworkInternal(n);
}
async function __PRIVATE_remoteStoreApplyPrimaryState(e, t) {
  const n = __PRIVATE_debugCast(e);
  t ? (n.Ea.delete(2), await __PRIVATE_enableNetworkInternal(n)) : t || (n.Ea.add(2), await __PRIVATE_disableNetworkInternal(n), n.Ra.set("Unknown"));
}
function __PRIVATE_ensureWatchStream(e) {
  return e.ma || (e.ma = function __PRIVATE_newPersistentWatchStream(e2, t, n) {
    const r = __PRIVATE_debugCast(e2);
    return r.sa(), new __PRIVATE_PersistentListenStream(t, r.connection, r.authCredentials, r.appCheckCredentials, r.serializer, n);
  }(e.datastore, e.asyncQueue, {
    Xo: __PRIVATE_onWatchStreamConnected.bind(null, e),
    t_: __PRIVATE_onWatchStreamOpen.bind(null, e),
    r_: __PRIVATE_onWatchStreamClose.bind(null, e),
    H_: __PRIVATE_onWatchStreamChange.bind(null, e)
  }), e.da.push(async (t) => {
    t ? (e.ma.B_(), __PRIVATE_shouldStartWatchStream(e) ? __PRIVATE_startWatchStream(e) : e.Ra.set("Unknown")) : (await e.ma.stop(), __PRIVATE_cleanUpWatchStreamState(e));
  })), e.ma;
}
function __PRIVATE_ensureWriteStream(e) {
  return e.fa || (e.fa = function __PRIVATE_newPersistentWriteStream(e2, t, n) {
    const r = __PRIVATE_debugCast(e2);
    return r.sa(), new __PRIVATE_PersistentWriteStream(t, r.connection, r.authCredentials, r.appCheckCredentials, r.serializer, n);
  }(e.datastore, e.asyncQueue, {
    Xo: () => Promise.resolve(),
    t_: __PRIVATE_onWriteStreamOpen.bind(null, e),
    r_: __PRIVATE_onWriteStreamClose.bind(null, e),
    ta: __PRIVATE_onWriteHandshakeComplete.bind(null, e),
    na: __PRIVATE_onMutationResult.bind(null, e)
  }), e.da.push(async (t) => {
    t ? (e.fa.B_(), await __PRIVATE_fillWritePipeline(e)) : (await e.fa.stop(), e.Ta.length > 0 && (__PRIVATE_logDebug(tn, `Stopping write stream with ${e.Ta.length} pending writes`), e.Ta = []));
  })), e.fa;
}

class DelayedOperation {
  constructor(e, t, n, r, i) {
    this.asyncQueue = e, this.timerId = t, this.targetTimeMs = n, this.op = r, this.removalCallback = i, this.deferred = new __PRIVATE_Deferred, this.then = this.deferred.promise.then.bind(this.deferred.promise), this.deferred.promise.catch((e2) => {});
  }
  get promise() {
    return this.deferred.promise;
  }
  static createAndSchedule(e, t, n, r, i) {
    const s = Date.now() + n, o = new DelayedOperation(e, t, s, r, i);
    return o.start(n), o;
  }
  start(e) {
    this.timerHandle = setTimeout(() => this.handleDelayElapsed(), e);
  }
  skipDelay() {
    return this.handleDelayElapsed();
  }
  cancel(e) {
    this.timerHandle !== null && (this.clearTimeout(), this.deferred.reject(new FirestoreError(N.CANCELLED, "Operation cancelled" + (e ? ": " + e : ""))));
  }
  handleDelayElapsed() {
    this.asyncQueue.enqueueAndForget(() => this.timerHandle !== null ? (this.clearTimeout(), this.op().then((e) => this.deferred.resolve(e))) : Promise.resolve());
  }
  clearTimeout() {
    this.timerHandle !== null && (this.removalCallback(this), clearTimeout(this.timerHandle), this.timerHandle = null);
  }
}
function __PRIVATE_wrapInUserErrorIfRecoverable(e, t) {
  if (__PRIVATE_logError("AsyncQueue", `${t}: ${e}`), __PRIVATE_isIndexedDbTransactionError(e))
    return new FirestoreError(N.UNAVAILABLE, `${t}: ${e}`);
  throw e;
}

class DocumentSet {
  static emptySet(e) {
    return new DocumentSet(e.comparator);
  }
  constructor(e) {
    this.comparator = e ? (t, n) => e(t, n) || DocumentKey.comparator(t.key, n.key) : (e2, t) => DocumentKey.comparator(e2.key, t.key), this.keyedMap = documentMap(), this.sortedSet = new SortedMap(this.comparator);
  }
  has(e) {
    return this.keyedMap.get(e) != null;
  }
  get(e) {
    return this.keyedMap.get(e);
  }
  first() {
    return this.sortedSet.minKey();
  }
  last() {
    return this.sortedSet.maxKey();
  }
  isEmpty() {
    return this.sortedSet.isEmpty();
  }
  indexOf(e) {
    const t = this.keyedMap.get(e);
    return t ? this.sortedSet.indexOf(t) : -1;
  }
  get size() {
    return this.sortedSet.size;
  }
  forEach(e) {
    this.sortedSet.inorderTraversal((t, n) => (e(t), false));
  }
  add(e) {
    const t = this.delete(e.key);
    return t.copy(t.keyedMap.insert(e.key, e), t.sortedSet.insert(e, null));
  }
  delete(e) {
    const t = this.get(e);
    return t ? this.copy(this.keyedMap.remove(e), this.sortedSet.remove(t)) : this;
  }
  isEqual(e) {
    if (!(e instanceof DocumentSet))
      return false;
    if (this.size !== e.size)
      return false;
    const t = this.sortedSet.getIterator(), n = e.sortedSet.getIterator();
    for (;t.hasNext(); ) {
      const e2 = t.getNext().key, r = n.getNext().key;
      if (!e2.isEqual(r))
        return false;
    }
    return true;
  }
  toString() {
    const e = [];
    return this.forEach((t) => {
      e.push(t.toString());
    }), e.length === 0 ? "DocumentSet ()" : `DocumentSet (
  ` + e.join(`  
`) + `
)`;
  }
  copy(e, t) {
    const n = new DocumentSet;
    return n.comparator = this.comparator, n.keyedMap = e, n.sortedSet = t, n;
  }
}

class __PRIVATE_DocumentChangeSet {
  constructor() {
    this.ga = new SortedMap(DocumentKey.comparator);
  }
  track(e) {
    const t = e.doc.key, n = this.ga.get(t);
    n ? e.type !== 0 && n.type === 3 ? this.ga = this.ga.insert(t, e) : e.type === 3 && n.type !== 1 ? this.ga = this.ga.insert(t, {
      type: n.type,
      doc: e.doc
    }) : e.type === 2 && n.type === 2 ? this.ga = this.ga.insert(t, {
      type: 2,
      doc: e.doc
    }) : e.type === 2 && n.type === 0 ? this.ga = this.ga.insert(t, {
      type: 0,
      doc: e.doc
    }) : e.type === 1 && n.type === 0 ? this.ga = this.ga.remove(t) : e.type === 1 && n.type === 2 ? this.ga = this.ga.insert(t, {
      type: 1,
      doc: n.doc
    }) : e.type === 0 && n.type === 1 ? this.ga = this.ga.insert(t, {
      type: 2,
      doc: e.doc
    }) : fail(63341, {
      Rt: e,
      pa: n
    }) : this.ga = this.ga.insert(t, e);
  }
  ya() {
    const e = [];
    return this.ga.inorderTraversal((t, n) => {
      e.push(n);
    }), e;
  }
}

class ViewSnapshot {
  constructor(e, t, n, r, i, s, o, _, a) {
    this.query = e, this.docs = t, this.oldDocs = n, this.docChanges = r, this.mutatedKeys = i, this.fromCache = s, this.syncStateChanged = o, this.excludesMetadataChanges = _, this.hasCachedResults = a;
  }
  static fromInitialDocuments(e, t, n, r, i) {
    const s = [];
    return t.forEach((e2) => {
      s.push({
        type: 0,
        doc: e2
      });
    }), new ViewSnapshot(e, t, DocumentSet.emptySet(t), s, n, r, true, false, i);
  }
  get hasPendingWrites() {
    return !this.mutatedKeys.isEmpty();
  }
  isEqual(e) {
    if (!(this.fromCache === e.fromCache && this.hasCachedResults === e.hasCachedResults && this.syncStateChanged === e.syncStateChanged && this.mutatedKeys.isEqual(e.mutatedKeys) && __PRIVATE_queryEquals(this.query, e.query) && this.docs.isEqual(e.docs) && this.oldDocs.isEqual(e.oldDocs)))
      return false;
    const t = this.docChanges, n = e.docChanges;
    if (t.length !== n.length)
      return false;
    for (let e2 = 0;e2 < t.length; e2++)
      if (t[e2].type !== n[e2].type || !t[e2].doc.isEqual(n[e2].doc))
        return false;
    return true;
  }
}

class __PRIVATE_QueryListenersInfo {
  constructor() {
    this.wa = undefined, this.Sa = [];
  }
  ba() {
    return this.Sa.some((e) => e.Da());
  }
}

class __PRIVATE_EventManagerImpl {
  constructor() {
    this.queries = __PRIVATE_newQueriesObjectMap(), this.onlineState = "Unknown", this.Ca = new Set;
  }
  terminate() {
    (function __PRIVATE_errorAllTargets(e, t) {
      const n = __PRIVATE_debugCast(e), r = n.queries;
      n.queries = __PRIVATE_newQueriesObjectMap(), r.forEach((e2, n2) => {
        for (const e3 of n2.Sa)
          e3.onError(t);
      });
    })(this, new FirestoreError(N.ABORTED, "Firestore shutting down"));
  }
}
function __PRIVATE_newQueriesObjectMap() {
  return new ObjectMap((e) => __PRIVATE_canonifyQuery(e), __PRIVATE_queryEquals);
}
async function __PRIVATE_eventManagerListen(e, t) {
  const n = __PRIVATE_debugCast(e);
  let r = 3;
  const i = t.query;
  let s = n.queries.get(i);
  s ? !s.ba() && t.Da() && (r = 2) : (s = new __PRIVATE_QueryListenersInfo, r = t.Da() ? 0 : 1);
  try {
    switch (r) {
      case 0:
        s.wa = await n.onListen(i, true);
        break;
      case 1:
        s.wa = await n.onListen(i, false);
        break;
      case 2:
        await n.onFirstRemoteStoreListen(i);
    }
  } catch (e2) {
    const n2 = __PRIVATE_wrapInUserErrorIfRecoverable(e2, `Initialization of query '${__PRIVATE_stringifyQuery(t.query)}' failed`);
    return void t.onError(n2);
  }
  if (n.queries.set(i, s), s.Sa.push(t), t.va(n.onlineState), s.wa) {
    t.Fa(s.wa) && __PRIVATE_raiseSnapshotsInSyncEvent(n);
  }
}
async function __PRIVATE_eventManagerUnlisten(e, t) {
  const n = __PRIVATE_debugCast(e), r = t.query;
  let i = 3;
  const s = n.queries.get(r);
  if (s) {
    const e2 = s.Sa.indexOf(t);
    e2 >= 0 && (s.Sa.splice(e2, 1), s.Sa.length === 0 ? i = t.Da() ? 0 : 1 : !s.ba() && t.Da() && (i = 2));
  }
  switch (i) {
    case 0:
      return n.queries.delete(r), n.onUnlisten(r, true);
    case 1:
      return n.queries.delete(r), n.onUnlisten(r, false);
    case 2:
      return n.onLastRemoteStoreUnlisten(r);
    default:
      return;
  }
}
function __PRIVATE_eventManagerOnWatchChange(e, t) {
  const n = __PRIVATE_debugCast(e);
  let r = false;
  for (const e2 of t) {
    const t2 = e2.query, i = n.queries.get(t2);
    if (i) {
      for (const t3 of i.Sa)
        t3.Fa(e2) && (r = true);
      i.wa = e2;
    }
  }
  r && __PRIVATE_raiseSnapshotsInSyncEvent(n);
}
function __PRIVATE_eventManagerOnWatchError(e, t, n) {
  const r = __PRIVATE_debugCast(e), i = r.queries.get(t);
  if (i)
    for (const e2 of i.Sa)
      e2.onError(n);
  r.queries.delete(t);
}
function __PRIVATE_raiseSnapshotsInSyncEvent(e) {
  e.Ca.forEach((e2) => {
    e2.next();
  });
}
var nn;
var rn;
(rn = nn || (nn = {})).Ma = "default", rn.Cache = "cache";

class __PRIVATE_QueryListener {
  constructor(e, t, n) {
    this.query = e, this.xa = t, this.Oa = false, this.Na = null, this.onlineState = "Unknown", this.options = n || {};
  }
  Fa(e) {
    if (!this.options.includeMetadataChanges) {
      const t2 = [];
      for (const n of e.docChanges)
        n.type !== 3 && t2.push(n);
      e = new ViewSnapshot(e.query, e.docs, e.oldDocs, t2, e.mutatedKeys, e.fromCache, e.syncStateChanged, true, e.hasCachedResults);
    }
    let t = false;
    return this.Oa ? this.Ba(e) && (this.xa.next(e), t = true) : this.La(e, this.onlineState) && (this.ka(e), t = true), this.Na = e, t;
  }
  onError(e) {
    this.xa.error(e);
  }
  va(e) {
    this.onlineState = e;
    let t = false;
    return this.Na && !this.Oa && this.La(this.Na, e) && (this.ka(this.Na), t = true), t;
  }
  La(e, t) {
    if (!e.fromCache)
      return true;
    if (!this.Da())
      return true;
    const n = t !== "Offline";
    return (!this.options.qa || !n) && (!e.docs.isEmpty() || e.hasCachedResults || t === "Offline");
  }
  Ba(e) {
    if (e.docChanges.length > 0)
      return true;
    const t = this.Na && this.Na.hasPendingWrites !== e.hasPendingWrites;
    return !(!e.syncStateChanged && !t) && this.options.includeMetadataChanges === true;
  }
  ka(e) {
    e = ViewSnapshot.fromInitialDocuments(e.query, e.docs, e.mutatedKeys, e.fromCache, e.hasCachedResults), this.Oa = true, this.xa.next(e);
  }
  Da() {
    return this.options.source !== nn.Cache;
  }
}
class __PRIVATE_AddedLimboDocument {
  constructor(e) {
    this.key = e;
  }
}

class __PRIVATE_RemovedLimboDocument {
  constructor(e) {
    this.key = e;
  }
}

class __PRIVATE_View {
  constructor(e, t) {
    this.query = e, this.Ya = t, this.Za = null, this.hasCachedResults = false, this.current = false, this.Xa = __PRIVATE_documentKeySet(), this.mutatedKeys = __PRIVATE_documentKeySet(), this.eu = __PRIVATE_newQueryComparator(e), this.tu = new DocumentSet(this.eu);
  }
  get nu() {
    return this.Ya;
  }
  ru(e, t) {
    const n = t ? t.iu : new __PRIVATE_DocumentChangeSet, r = t ? t.tu : this.tu;
    let i = t ? t.mutatedKeys : this.mutatedKeys, s = r, o = false;
    const _ = this.query.limitType === "F" && r.size === this.query.limit ? r.last() : null, a = this.query.limitType === "L" && r.size === this.query.limit ? r.first() : null;
    if (e.inorderTraversal((e2, t2) => {
      const u = r.get(e2), c = __PRIVATE_queryMatches(this.query, t2) ? t2 : null, l = !!u && this.mutatedKeys.has(u.key), h = !!c && (c.hasLocalMutations || this.mutatedKeys.has(c.key) && c.hasCommittedMutations);
      let P = false;
      if (u && c) {
        u.data.isEqual(c.data) ? l !== h && (n.track({
          type: 3,
          doc: c
        }), P = true) : this.su(u, c) || (n.track({
          type: 2,
          doc: c
        }), P = true, (_ && this.eu(c, _) > 0 || a && this.eu(c, a) < 0) && (o = true));
      } else
        !u && c ? (n.track({
          type: 0,
          doc: c
        }), P = true) : u && !c && (n.track({
          type: 1,
          doc: u
        }), P = true, (_ || a) && (o = true));
      P && (c ? (s = s.add(c), i = h ? i.add(e2) : i.delete(e2)) : (s = s.delete(e2), i = i.delete(e2)));
    }), this.query.limit !== null)
      for (;s.size > this.query.limit; ) {
        const e2 = this.query.limitType === "F" ? s.last() : s.first();
        s = s.delete(e2.key), i = i.delete(e2.key), n.track({
          type: 1,
          doc: e2
        });
      }
    return {
      tu: s,
      iu: n,
      Cs: o,
      mutatedKeys: i
    };
  }
  su(e, t) {
    return e.hasLocalMutations && t.hasCommittedMutations && !t.hasLocalMutations;
  }
  applyChanges(e, t, n, r) {
    const i = this.tu;
    this.tu = e.tu, this.mutatedKeys = e.mutatedKeys;
    const s = e.iu.ya();
    s.sort((e2, t2) => function __PRIVATE_compareChangeType(e3, t3) {
      const order = (e4) => {
        switch (e4) {
          case 0:
            return 1;
          case 2:
          case 3:
            return 2;
          case 1:
            return 0;
          default:
            return fail(20277, {
              Rt: e4
            });
        }
      };
      return order(e3) - order(t3);
    }(e2.type, t2.type) || this.eu(e2.doc, t2.doc)), this.ou(n), r = r ?? false;
    const o = t && !r ? this._u() : [], _ = this.Xa.size === 0 && this.current && !r ? 1 : 0, a = _ !== this.Za;
    if (this.Za = _, s.length !== 0 || a) {
      return {
        snapshot: new ViewSnapshot(this.query, e.tu, i, s, e.mutatedKeys, _ === 0, a, false, !!n && n.resumeToken.approximateByteSize() > 0),
        au: o
      };
    }
    return {
      au: o
    };
  }
  va(e) {
    return this.current && e === "Offline" ? (this.current = false, this.applyChanges({
      tu: this.tu,
      iu: new __PRIVATE_DocumentChangeSet,
      mutatedKeys: this.mutatedKeys,
      Cs: false
    }, false)) : {
      au: []
    };
  }
  uu(e) {
    return !this.Ya.has(e) && (!!this.tu.has(e) && !this.tu.get(e).hasLocalMutations);
  }
  ou(e) {
    e && (e.addedDocuments.forEach((e2) => this.Ya = this.Ya.add(e2)), e.modifiedDocuments.forEach((e2) => {}), e.removedDocuments.forEach((e2) => this.Ya = this.Ya.delete(e2)), this.current = e.current);
  }
  _u() {
    if (!this.current)
      return [];
    const e = this.Xa;
    this.Xa = __PRIVATE_documentKeySet(), this.tu.forEach((e2) => {
      this.uu(e2.key) && (this.Xa = this.Xa.add(e2.key));
    });
    const t = [];
    return e.forEach((e2) => {
      this.Xa.has(e2) || t.push(new __PRIVATE_RemovedLimboDocument(e2));
    }), this.Xa.forEach((n) => {
      e.has(n) || t.push(new __PRIVATE_AddedLimboDocument(n));
    }), t;
  }
  cu(e) {
    this.Ya = e.Qs, this.Xa = __PRIVATE_documentKeySet();
    const t = this.ru(e.documents);
    return this.applyChanges(t, true);
  }
  lu() {
    return ViewSnapshot.fromInitialDocuments(this.query, this.tu, this.mutatedKeys, this.Za === 0, this.hasCachedResults);
  }
}
var sn = "SyncEngine";

class __PRIVATE_QueryView {
  constructor(e, t, n) {
    this.query = e, this.targetId = t, this.view = n;
  }
}

class LimboResolution {
  constructor(e) {
    this.key = e, this.hu = false;
  }
}

class __PRIVATE_SyncEngineImpl {
  constructor(e, t, n, r, i, s) {
    this.localStore = e, this.remoteStore = t, this.eventManager = n, this.sharedClientState = r, this.currentUser = i, this.maxConcurrentLimboResolutions = s, this.Pu = {}, this.Tu = new ObjectMap((e2) => __PRIVATE_canonifyQuery(e2), __PRIVATE_queryEquals), this.Iu = new Map, this.Eu = new Set, this.du = new SortedMap(DocumentKey.comparator), this.Au = new Map, this.Ru = new __PRIVATE_ReferenceSet, this.Vu = {}, this.mu = new Map, this.fu = __PRIVATE_TargetIdGenerator.cr(), this.onlineState = "Unknown", this.gu = undefined;
  }
  get isPrimaryClient() {
    return this.gu === true;
  }
}
async function __PRIVATE_syncEngineListen(e, t, n = true) {
  const r = __PRIVATE_ensureWatchCallbacks(e);
  let i;
  const s = r.Tu.get(t);
  return s ? (r.sharedClientState.addLocalQueryTarget(s.targetId), i = s.view.lu()) : i = await __PRIVATE_allocateTargetAndMaybeListen(r, t, n, true), i;
}
async function __PRIVATE_triggerRemoteStoreListen(e, t) {
  const n = __PRIVATE_ensureWatchCallbacks(e);
  await __PRIVATE_allocateTargetAndMaybeListen(n, t, true, false);
}
async function __PRIVATE_allocateTargetAndMaybeListen(e, t, n, r) {
  const i = await __PRIVATE_localStoreAllocateTarget(e.localStore, __PRIVATE_queryToTarget(t)), s = i.targetId, o = e.sharedClientState.addLocalQueryTarget(s, n);
  let _;
  return r && (_ = await __PRIVATE_initializeViewAndComputeSnapshot(e, t, s, o === "current", i.resumeToken)), e.isPrimaryClient && n && __PRIVATE_remoteStoreListen(e.remoteStore, i), _;
}
async function __PRIVATE_initializeViewAndComputeSnapshot(e, t, n, r, i) {
  e.pu = (t2, n2, r2) => async function __PRIVATE_applyDocChanges(e2, t3, n3, r3) {
    let i2 = t3.view.ru(n3);
    i2.Cs && (i2 = await __PRIVATE_localStoreExecuteQuery(e2.localStore, t3.query, false).then(({ documents: e3 }) => t3.view.ru(e3, i2)));
    const s2 = r3 && r3.targetChanges.get(t3.targetId), o2 = r3 && r3.targetMismatches.get(t3.targetId) != null, _2 = t3.view.applyChanges(i2, e2.isPrimaryClient, s2, o2);
    return __PRIVATE_updateTrackedLimbos(e2, t3.targetId, _2.au), _2.snapshot;
  }(e, t2, n2, r2);
  const s = await __PRIVATE_localStoreExecuteQuery(e.localStore, t, true), o = new __PRIVATE_View(t, s.Qs), _ = o.ru(s.documents), a = TargetChange.createSynthesizedTargetChangeForCurrentChange(n, r && e.onlineState !== "Offline", i), u = o.applyChanges(_, e.isPrimaryClient, a);
  __PRIVATE_updateTrackedLimbos(e, n, u.au);
  const c = new __PRIVATE_QueryView(t, n, o);
  return e.Tu.set(t, c), e.Iu.has(n) ? e.Iu.get(n).push(t) : e.Iu.set(n, [t]), u.snapshot;
}
async function __PRIVATE_syncEngineUnlisten(e, t, n) {
  const r = __PRIVATE_debugCast(e), i = r.Tu.get(t), s = r.Iu.get(i.targetId);
  if (s.length > 1)
    return r.Iu.set(i.targetId, s.filter((e2) => !__PRIVATE_queryEquals(e2, t))), void r.Tu.delete(t);
  if (r.isPrimaryClient) {
    r.sharedClientState.removeLocalQueryTarget(i.targetId);
    r.sharedClientState.isActiveQueryTarget(i.targetId) || await __PRIVATE_localStoreReleaseTarget(r.localStore, i.targetId, false).then(() => {
      r.sharedClientState.clearQueryState(i.targetId), n && __PRIVATE_remoteStoreUnlisten(r.remoteStore, i.targetId), __PRIVATE_removeAndCleanupTarget(r, i.targetId);
    }).catch(__PRIVATE_ignoreIfPrimaryLeaseLoss);
  } else
    __PRIVATE_removeAndCleanupTarget(r, i.targetId), await __PRIVATE_localStoreReleaseTarget(r.localStore, i.targetId, true);
}
async function __PRIVATE_triggerRemoteStoreUnlisten(e, t) {
  const n = __PRIVATE_debugCast(e), r = n.Tu.get(t), i = n.Iu.get(r.targetId);
  n.isPrimaryClient && i.length === 1 && (n.sharedClientState.removeLocalQueryTarget(r.targetId), __PRIVATE_remoteStoreUnlisten(n.remoteStore, r.targetId));
}
async function __PRIVATE_syncEngineWrite(e, t, n) {
  const r = __PRIVATE_syncEngineEnsureWriteCallbacks(e);
  try {
    const e2 = await function __PRIVATE_localStoreWriteLocally(e3, t2) {
      const n2 = __PRIVATE_debugCast(e3), r2 = Timestamp.now(), i = t2.reduce((e4, t3) => e4.add(t3.key), __PRIVATE_documentKeySet());
      let s, o;
      return n2.persistence.runTransaction("Locally write mutations", "readwrite", (e4) => {
        let _ = __PRIVATE_mutableDocumentMap(), a = __PRIVATE_documentKeySet();
        return n2.Ns.getEntries(e4, i).next((e5) => {
          _ = e5, _.forEach((e6, t3) => {
            t3.isValidDocument() || (a = a.add(e6));
          });
        }).next(() => n2.localDocuments.getOverlayedDocuments(e4, _)).next((i2) => {
          s = i2;
          const o2 = [];
          for (const e5 of t2) {
            const t3 = __PRIVATE_mutationExtractBaseValue(e5, s.get(e5.key).overlayedDocument);
            t3 != null && o2.push(new __PRIVATE_PatchMutation(e5.key, t3, __PRIVATE_extractFieldMask(t3.value.mapValue), Precondition.exists(true)));
          }
          return n2.mutationQueue.addMutationBatch(e4, r2, o2, t2);
        }).next((t3) => {
          o = t3;
          const r3 = t3.applyToLocalDocumentSet(s, a);
          return n2.documentOverlayCache.saveOverlays(e4, t3.batchId, r3);
        });
      }).then(() => ({
        batchId: o.batchId,
        changes: __PRIVATE_convertOverlayedDocumentMapToDocumentMap(s)
      }));
    }(r.localStore, t);
    r.sharedClientState.addPendingMutation(e2.batchId), function __PRIVATE_addMutationCallback(e3, t2, n2) {
      let r2 = e3.Vu[e3.currentUser.toKey()];
      r2 || (r2 = new SortedMap(__PRIVATE_primitiveComparator));
      r2 = r2.insert(t2, n2), e3.Vu[e3.currentUser.toKey()] = r2;
    }(r, e2.batchId, n), await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(r, e2.changes), await __PRIVATE_fillWritePipeline(r.remoteStore);
  } catch (e2) {
    const t2 = __PRIVATE_wrapInUserErrorIfRecoverable(e2, "Failed to persist write");
    n.reject(t2);
  }
}
async function __PRIVATE_syncEngineApplyRemoteEvent(e, t) {
  const n = __PRIVATE_debugCast(e);
  try {
    const e2 = await __PRIVATE_localStoreApplyRemoteEventToLocalCache(n.localStore, t);
    t.targetChanges.forEach((e3, t2) => {
      const r = n.Au.get(t2);
      r && (__PRIVATE_hardAssert(e3.addedDocuments.size + e3.modifiedDocuments.size + e3.removedDocuments.size <= 1, 22616), e3.addedDocuments.size > 0 ? r.hu = true : e3.modifiedDocuments.size > 0 ? __PRIVATE_hardAssert(r.hu, 14607) : e3.removedDocuments.size > 0 && (__PRIVATE_hardAssert(r.hu, 42227), r.hu = false));
    }), await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(n, e2, t);
  } catch (e2) {
    await __PRIVATE_ignoreIfPrimaryLeaseLoss(e2);
  }
}
function __PRIVATE_syncEngineApplyOnlineStateChange(e, t, n) {
  const r = __PRIVATE_debugCast(e);
  if (r.isPrimaryClient && n === 0 || !r.isPrimaryClient && n === 1) {
    const e2 = [];
    r.Tu.forEach((n2, r2) => {
      const i = r2.view.va(t);
      i.snapshot && e2.push(i.snapshot);
    }), function __PRIVATE_eventManagerOnOnlineStateChange(e3, t2) {
      const n2 = __PRIVATE_debugCast(e3);
      n2.onlineState = t2;
      let r2 = false;
      n2.queries.forEach((e4, n3) => {
        for (const e5 of n3.Sa)
          e5.va(t2) && (r2 = true);
      }), r2 && __PRIVATE_raiseSnapshotsInSyncEvent(n2);
    }(r.eventManager, t), e2.length && r.Pu.H_(e2), r.onlineState = t, r.isPrimaryClient && r.sharedClientState.setOnlineState(t);
  }
}
async function __PRIVATE_syncEngineRejectListen(e, t, n) {
  const r = __PRIVATE_debugCast(e);
  r.sharedClientState.updateQueryState(t, "rejected", n);
  const i = r.Au.get(t), s = i && i.key;
  if (s) {
    let e2 = new SortedMap(DocumentKey.comparator);
    e2 = e2.insert(s, MutableDocument.newNoDocument(s, SnapshotVersion.min()));
    const n2 = __PRIVATE_documentKeySet().add(s), i2 = new RemoteEvent(SnapshotVersion.min(), new Map, new SortedMap(__PRIVATE_primitiveComparator), e2, n2);
    await __PRIVATE_syncEngineApplyRemoteEvent(r, i2), r.du = r.du.remove(s), r.Au.delete(t), __PRIVATE_pumpEnqueuedLimboResolutions(r);
  } else
    await __PRIVATE_localStoreReleaseTarget(r.localStore, t, false).then(() => __PRIVATE_removeAndCleanupTarget(r, t, n)).catch(__PRIVATE_ignoreIfPrimaryLeaseLoss);
}
async function __PRIVATE_syncEngineApplySuccessfulWrite(e, t) {
  const n = __PRIVATE_debugCast(e), r = t.batch.batchId;
  try {
    const e2 = await __PRIVATE_localStoreAcknowledgeBatch(n.localStore, t);
    __PRIVATE_processUserCallback(n, r, null), __PRIVATE_triggerPendingWritesCallbacks(n, r), n.sharedClientState.updateMutationState(r, "acknowledged"), await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(n, e2);
  } catch (e2) {
    await __PRIVATE_ignoreIfPrimaryLeaseLoss(e2);
  }
}
async function __PRIVATE_syncEngineRejectFailedWrite(e, t, n) {
  const r = __PRIVATE_debugCast(e);
  try {
    const e2 = await function __PRIVATE_localStoreRejectBatch(e3, t2) {
      const n2 = __PRIVATE_debugCast(e3);
      return n2.persistence.runTransaction("Reject batch", "readwrite-primary", (e4) => {
        let r2;
        return n2.mutationQueue.lookupMutationBatch(e4, t2).next((t3) => (__PRIVATE_hardAssert(t3 !== null, 37113), r2 = t3.keys(), n2.mutationQueue.removeMutationBatch(e4, t3))).next(() => n2.mutationQueue.performConsistencyCheck(e4)).next(() => n2.documentOverlayCache.removeOverlaysForBatchId(e4, r2, t2)).next(() => n2.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e4, r2)).next(() => n2.localDocuments.getDocuments(e4, r2));
      });
    }(r.localStore, t);
    __PRIVATE_processUserCallback(r, t, n), __PRIVATE_triggerPendingWritesCallbacks(r, t), r.sharedClientState.updateMutationState(t, "rejected", n), await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(r, e2);
  } catch (n2) {
    await __PRIVATE_ignoreIfPrimaryLeaseLoss(n2);
  }
}
function __PRIVATE_triggerPendingWritesCallbacks(e, t) {
  (e.mu.get(t) || []).forEach((e2) => {
    e2.resolve();
  }), e.mu.delete(t);
}
function __PRIVATE_processUserCallback(e, t, n) {
  const r = __PRIVATE_debugCast(e);
  let i = r.Vu[r.currentUser.toKey()];
  if (i) {
    const e2 = i.get(t);
    e2 && (n ? e2.reject(n) : e2.resolve(), i = i.remove(t)), r.Vu[r.currentUser.toKey()] = i;
  }
}
function __PRIVATE_removeAndCleanupTarget(e, t, n = null) {
  e.sharedClientState.removeLocalQueryTarget(t);
  for (const r of e.Iu.get(t))
    e.Tu.delete(r), n && e.Pu.yu(r, n);
  if (e.Iu.delete(t), e.isPrimaryClient) {
    e.Ru.jr(t).forEach((t2) => {
      e.Ru.containsKey(t2) || __PRIVATE_removeLimboTarget(e, t2);
    });
  }
}
function __PRIVATE_removeLimboTarget(e, t) {
  e.Eu.delete(t.path.canonicalString());
  const n = e.du.get(t);
  n !== null && (__PRIVATE_remoteStoreUnlisten(e.remoteStore, n), e.du = e.du.remove(t), e.Au.delete(n), __PRIVATE_pumpEnqueuedLimboResolutions(e));
}
function __PRIVATE_updateTrackedLimbos(e, t, n) {
  for (const r of n)
    if (r instanceof __PRIVATE_AddedLimboDocument)
      e.Ru.addReference(r.key, t), __PRIVATE_trackLimboChange(e, r);
    else if (r instanceof __PRIVATE_RemovedLimboDocument) {
      __PRIVATE_logDebug(sn, "Document no longer in limbo: " + r.key), e.Ru.removeReference(r.key, t);
      e.Ru.containsKey(r.key) || __PRIVATE_removeLimboTarget(e, r.key);
    } else
      fail(19791, {
        wu: r
      });
}
function __PRIVATE_trackLimboChange(e, t) {
  const n = t.key, r = n.path.canonicalString();
  e.du.get(n) || e.Eu.has(r) || (__PRIVATE_logDebug(sn, "New document in limbo: " + n), e.Eu.add(r), __PRIVATE_pumpEnqueuedLimboResolutions(e));
}
function __PRIVATE_pumpEnqueuedLimboResolutions(e) {
  for (;e.Eu.size > 0 && e.du.size < e.maxConcurrentLimboResolutions; ) {
    const t = e.Eu.values().next().value;
    e.Eu.delete(t);
    const n = new DocumentKey(ResourcePath.fromString(t)), r = e.fu.next();
    e.Au.set(r, new LimboResolution(n)), e.du = e.du.insert(n, r), __PRIVATE_remoteStoreListen(e.remoteStore, new TargetData(__PRIVATE_queryToTarget(__PRIVATE_newQueryForPath(n.path)), r, "TargetPurposeLimboResolution", __PRIVATE_ListenSequence.ce));
  }
}
async function __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(e, t, n) {
  const r = __PRIVATE_debugCast(e), i = [], s = [], o = [];
  r.Tu.isEmpty() || (r.Tu.forEach((e2, _) => {
    o.push(r.pu(_, t, n).then((e3) => {
      if ((e3 || n) && r.isPrimaryClient) {
        const t2 = e3 ? !e3.fromCache : n?.targetChanges.get(_.targetId)?.current;
        r.sharedClientState.updateQueryState(_.targetId, t2 ? "current" : "not-current");
      }
      if (e3) {
        i.push(e3);
        const t2 = __PRIVATE_LocalViewChanges.As(_.targetId, e3);
        s.push(t2);
      }
    }));
  }), await Promise.all(o), r.Pu.H_(i), await async function __PRIVATE_localStoreNotifyLocalViewChanges(e2, t2) {
    const n2 = __PRIVATE_debugCast(e2);
    try {
      await n2.persistence.runTransaction("notifyLocalViewChanges", "readwrite", (e3) => PersistencePromise.forEach(t2, (t3) => PersistencePromise.forEach(t3.Es, (r2) => n2.persistence.referenceDelegate.addReference(e3, t3.targetId, r2)).next(() => PersistencePromise.forEach(t3.ds, (r2) => n2.persistence.referenceDelegate.removeReference(e3, t3.targetId, r2)))));
    } catch (e3) {
      if (!__PRIVATE_isIndexedDbTransactionError(e3))
        throw e3;
      __PRIVATE_logDebug(Ut, "Failed to update sequence numbers: " + e3);
    }
    for (const e3 of t2) {
      const t3 = e3.targetId;
      if (!e3.fromCache) {
        const e4 = n2.Ms.get(t3), r2 = e4.snapshotVersion, i2 = e4.withLastLimboFreeSnapshotVersion(r2);
        n2.Ms = n2.Ms.insert(t3, i2);
      }
    }
  }(r.localStore, s));
}
async function __PRIVATE_syncEngineHandleCredentialChange(e, t) {
  const n = __PRIVATE_debugCast(e);
  if (!n.currentUser.isEqual(t)) {
    __PRIVATE_logDebug(sn, "User change. New user:", t.toKey());
    const e2 = await __PRIVATE_localStoreHandleUserChange(n.localStore, t);
    n.currentUser = t, function __PRIVATE_rejectOutstandingPendingWritesCallbacks(e3, t2) {
      e3.mu.forEach((e4) => {
        e4.forEach((e5) => {
          e5.reject(new FirestoreError(N.CANCELLED, t2));
        });
      }), e3.mu.clear();
    }(n, "'waitForPendingWrites' promise is rejected due to a user change."), n.sharedClientState.handleUserChange(t, e2.removedBatchIds, e2.addedBatchIds), await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(n, e2.Ls);
  }
}
function __PRIVATE_syncEngineGetRemoteKeysForTarget(e, t) {
  const n = __PRIVATE_debugCast(e), r = n.Au.get(t);
  if (r && r.hu)
    return __PRIVATE_documentKeySet().add(r.key);
  {
    let e2 = __PRIVATE_documentKeySet();
    const r2 = n.Iu.get(t);
    if (!r2)
      return e2;
    for (const t2 of r2) {
      const r3 = n.Tu.get(t2);
      e2 = e2.unionWith(r3.view.nu);
    }
    return e2;
  }
}
function __PRIVATE_ensureWatchCallbacks(e) {
  const t = __PRIVATE_debugCast(e);
  return t.remoteStore.remoteSyncer.applyRemoteEvent = __PRIVATE_syncEngineApplyRemoteEvent.bind(null, t), t.remoteStore.remoteSyncer.getRemoteKeysForTarget = __PRIVATE_syncEngineGetRemoteKeysForTarget.bind(null, t), t.remoteStore.remoteSyncer.rejectListen = __PRIVATE_syncEngineRejectListen.bind(null, t), t.Pu.H_ = __PRIVATE_eventManagerOnWatchChange.bind(null, t.eventManager), t.Pu.yu = __PRIVATE_eventManagerOnWatchError.bind(null, t.eventManager), t;
}
function __PRIVATE_syncEngineEnsureWriteCallbacks(e) {
  const t = __PRIVATE_debugCast(e);
  return t.remoteStore.remoteSyncer.applySuccessfulWrite = __PRIVATE_syncEngineApplySuccessfulWrite.bind(null, t), t.remoteStore.remoteSyncer.rejectFailedWrite = __PRIVATE_syncEngineRejectFailedWrite.bind(null, t), t;
}
class __PRIVATE_MemoryOfflineComponentProvider {
  constructor() {
    this.kind = "memory", this.synchronizeTabs = false;
  }
  async initialize(e) {
    this.serializer = __PRIVATE_newSerializer(e.databaseInfo.databaseId), this.sharedClientState = this.Du(e), this.persistence = this.Cu(e), await this.persistence.start(), this.localStore = this.vu(e), this.gcScheduler = this.Fu(e, this.localStore), this.indexBackfillerScheduler = this.Mu(e, this.localStore);
  }
  Fu(e, t) {
    return null;
  }
  Mu(e, t) {
    return null;
  }
  vu(e) {
    return __PRIVATE_newLocalStore(this.persistence, new __PRIVATE_QueryEngine, e.initialUser, this.serializer);
  }
  Cu(e) {
    return new __PRIVATE_MemoryPersistence(__PRIVATE_MemoryEagerDelegate.mi, this.serializer);
  }
  Du(e) {
    return new __PRIVATE_MemorySharedClientState;
  }
  async terminate() {
    this.gcScheduler?.stop(), this.indexBackfillerScheduler?.stop(), this.sharedClientState.shutdown(), await this.persistence.shutdown();
  }
}
__PRIVATE_MemoryOfflineComponentProvider.provider = {
  build: () => new __PRIVATE_MemoryOfflineComponentProvider
};

class __PRIVATE_LruGcMemoryOfflineComponentProvider extends __PRIVATE_MemoryOfflineComponentProvider {
  constructor(e) {
    super(), this.cacheSizeBytes = e;
  }
  Fu(e, t) {
    __PRIVATE_hardAssert(this.persistence.referenceDelegate instanceof __PRIVATE_MemoryLruDelegate, 46915);
    const n = this.persistence.referenceDelegate.garbageCollector;
    return new __PRIVATE_LruScheduler(n, e.asyncQueue, t);
  }
  Cu(e) {
    const t = this.cacheSizeBytes !== undefined ? LruParams.withCacheSize(this.cacheSizeBytes) : LruParams.DEFAULT;
    return new __PRIVATE_MemoryPersistence((e2) => __PRIVATE_MemoryLruDelegate.mi(e2, t), this.serializer);
  }
}
class OnlineComponentProvider {
  async initialize(e, t) {
    this.localStore || (this.localStore = e.localStore, this.sharedClientState = e.sharedClientState, this.datastore = this.createDatastore(t), this.remoteStore = this.createRemoteStore(t), this.eventManager = this.createEventManager(t), this.syncEngine = this.createSyncEngine(t, !e.synchronizeTabs), this.sharedClientState.onlineStateHandler = (e2) => __PRIVATE_syncEngineApplyOnlineStateChange(this.syncEngine, e2, 1), this.remoteStore.remoteSyncer.handleCredentialChange = __PRIVATE_syncEngineHandleCredentialChange.bind(null, this.syncEngine), await __PRIVATE_remoteStoreApplyPrimaryState(this.remoteStore, this.syncEngine.isPrimaryClient));
  }
  createEventManager(e) {
    return function __PRIVATE_newEventManager() {
      return new __PRIVATE_EventManagerImpl;
    }();
  }
  createDatastore(e) {
    const t = __PRIVATE_newSerializer(e.databaseInfo.databaseId), n = function __PRIVATE_newConnection(e2) {
      return new __PRIVATE_WebChannelConnection(e2);
    }(e.databaseInfo);
    return function __PRIVATE_newDatastore(e2, t2, n2, r) {
      return new __PRIVATE_DatastoreImpl(e2, t2, n2, r);
    }(e.authCredentials, e.appCheckCredentials, n, t);
  }
  createRemoteStore(e) {
    return function __PRIVATE_newRemoteStore(e2, t, n, r, i) {
      return new __PRIVATE_RemoteStoreImpl(e2, t, n, r, i);
    }(this.localStore, this.datastore, e.asyncQueue, (e2) => __PRIVATE_syncEngineApplyOnlineStateChange(this.syncEngine, e2, 0), function __PRIVATE_newConnectivityMonitor() {
      return __PRIVATE_BrowserConnectivityMonitor.v() ? new __PRIVATE_BrowserConnectivityMonitor : new __PRIVATE_NoopConnectivityMonitor;
    }());
  }
  createSyncEngine(e, t) {
    return function __PRIVATE_newSyncEngine(e2, t2, n, r, i, s, o) {
      const _ = new __PRIVATE_SyncEngineImpl(e2, t2, n, r, i, s);
      return o && (_.gu = true), _;
    }(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, e.initialUser, e.maxConcurrentLimboResolutions, t);
  }
  async terminate() {
    await async function __PRIVATE_remoteStoreShutdown(e) {
      const t = __PRIVATE_debugCast(e);
      __PRIVATE_logDebug(tn, "RemoteStore shutting down."), t.Ea.add(5), await __PRIVATE_disableNetworkInternal(t), t.Aa.shutdown(), t.Ra.set("Unknown");
    }(this.remoteStore), this.datastore?.terminate(), this.eventManager?.terminate();
  }
}
OnlineComponentProvider.provider = {
  build: () => new OnlineComponentProvider
};
class __PRIVATE_AsyncObserver {
  constructor(e) {
    this.observer = e, this.muted = false;
  }
  next(e) {
    this.muted || this.observer.next && this.Ou(this.observer.next, e);
  }
  error(e) {
    this.muted || (this.observer.error ? this.Ou(this.observer.error, e) : __PRIVATE_logError("Uncaught Error in snapshot listener:", e.toString()));
  }
  Nu() {
    this.muted = true;
  }
  Ou(e, t) {
    setTimeout(() => {
      this.muted || e(t);
    }, 0);
  }
}
var on = "FirestoreClient";

class FirestoreClient {
  constructor(e, t, n, r, i) {
    this.authCredentials = e, this.appCheckCredentials = t, this.asyncQueue = n, this.databaseInfo = r, this.user = User.UNAUTHENTICATED, this.clientId = __PRIVATE_AutoId.newId(), this.authCredentialListener = () => Promise.resolve(), this.appCheckCredentialListener = () => Promise.resolve(), this._uninitializedComponentsProvider = i, this.authCredentials.start(n, async (e2) => {
      __PRIVATE_logDebug(on, "Received user=", e2.uid), await this.authCredentialListener(e2), this.user = e2;
    }), this.appCheckCredentials.start(n, (e2) => (__PRIVATE_logDebug(on, "Received new app check token=", e2), this.appCheckCredentialListener(e2, this.user)));
  }
  get configuration() {
    return {
      asyncQueue: this.asyncQueue,
      databaseInfo: this.databaseInfo,
      clientId: this.clientId,
      authCredentials: this.authCredentials,
      appCheckCredentials: this.appCheckCredentials,
      initialUser: this.user,
      maxConcurrentLimboResolutions: 100
    };
  }
  setCredentialChangeListener(e) {
    this.authCredentialListener = e;
  }
  setAppCheckTokenChangeListener(e) {
    this.appCheckCredentialListener = e;
  }
  terminate() {
    this.asyncQueue.enterRestrictedMode();
    const e = new __PRIVATE_Deferred;
    return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
      try {
        this._onlineComponents && await this._onlineComponents.terminate(), this._offlineComponents && await this._offlineComponents.terminate(), this.authCredentials.shutdown(), this.appCheckCredentials.shutdown(), e.resolve();
      } catch (t) {
        const n = __PRIVATE_wrapInUserErrorIfRecoverable(t, "Failed to shutdown persistence");
        e.reject(n);
      }
    }), e.promise;
  }
}
async function __PRIVATE_setOfflineComponentProvider(e, t) {
  e.asyncQueue.verifyOperationInProgress(), __PRIVATE_logDebug(on, "Initializing OfflineComponentProvider");
  const n = e.configuration;
  await t.initialize(n);
  let r = n.initialUser;
  e.setCredentialChangeListener(async (e2) => {
    r.isEqual(e2) || (await __PRIVATE_localStoreHandleUserChange(t.localStore, e2), r = e2);
  }), t.persistence.setDatabaseDeletedListener(() => e.terminate()), e._offlineComponents = t;
}
async function __PRIVATE_setOnlineComponentProvider(e, t) {
  e.asyncQueue.verifyOperationInProgress();
  const n = await __PRIVATE_ensureOfflineComponents(e);
  __PRIVATE_logDebug(on, "Initializing OnlineComponentProvider"), await t.initialize(n, e.configuration), e.setCredentialChangeListener((e2) => __PRIVATE_remoteStoreHandleCredentialChange(t.remoteStore, e2)), e.setAppCheckTokenChangeListener((e2, n2) => __PRIVATE_remoteStoreHandleCredentialChange(t.remoteStore, n2)), e._onlineComponents = t;
}
async function __PRIVATE_ensureOfflineComponents(e) {
  if (!e._offlineComponents)
    if (e._uninitializedComponentsProvider) {
      __PRIVATE_logDebug(on, "Using user provided OfflineComponentProvider");
      try {
        await __PRIVATE_setOfflineComponentProvider(e, e._uninitializedComponentsProvider._offline);
      } catch (t) {
        const n = t;
        if (!function __PRIVATE_canFallbackFromIndexedDbError(e2) {
          return e2.name === "FirebaseError" ? e2.code === N.FAILED_PRECONDITION || e2.code === N.UNIMPLEMENTED : !(typeof DOMException != "undefined" && e2 instanceof DOMException) || e2.code === 22 || e2.code === 20 || e2.code === 11;
        }(n))
          throw n;
        __PRIVATE_logWarn("Error using user provided cache. Falling back to memory cache: " + n), await __PRIVATE_setOfflineComponentProvider(e, new __PRIVATE_MemoryOfflineComponentProvider);
      }
    } else
      __PRIVATE_logDebug(on, "Using default OfflineComponentProvider"), await __PRIVATE_setOfflineComponentProvider(e, new __PRIVATE_LruGcMemoryOfflineComponentProvider(undefined));
  return e._offlineComponents;
}
async function __PRIVATE_ensureOnlineComponents(e) {
  return e._onlineComponents || (e._uninitializedComponentsProvider ? (__PRIVATE_logDebug(on, "Using user provided OnlineComponentProvider"), await __PRIVATE_setOnlineComponentProvider(e, e._uninitializedComponentsProvider._online)) : (__PRIVATE_logDebug(on, "Using default OnlineComponentProvider"), await __PRIVATE_setOnlineComponentProvider(e, new OnlineComponentProvider))), e._onlineComponents;
}
function __PRIVATE_getSyncEngine(e) {
  return __PRIVATE_ensureOnlineComponents(e).then((e2) => e2.syncEngine);
}
async function __PRIVATE_getEventManager(e) {
  const t = await __PRIVATE_ensureOnlineComponents(e), n = t.eventManager;
  return n.onListen = __PRIVATE_syncEngineListen.bind(null, t.syncEngine), n.onUnlisten = __PRIVATE_syncEngineUnlisten.bind(null, t.syncEngine), n.onFirstRemoteStoreListen = __PRIVATE_triggerRemoteStoreListen.bind(null, t.syncEngine), n.onLastRemoteStoreUnlisten = __PRIVATE_triggerRemoteStoreUnlisten.bind(null, t.syncEngine), n;
}
function __PRIVATE_firestoreClientGetDocumentsViaSnapshotListener(e, t, n = {}) {
  const r = new __PRIVATE_Deferred;
  return e.asyncQueue.enqueueAndForget(async () => function __PRIVATE_executeQueryViaSnapshotListener(e2, t2, n2, r2, i) {
    const s = new __PRIVATE_AsyncObserver({
      next: (n3) => {
        s.Nu(), t2.enqueueAndForget(() => __PRIVATE_eventManagerUnlisten(e2, o)), n3.fromCache && r2.source === "server" ? i.reject(new FirestoreError(N.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')) : i.resolve(n3);
      },
      error: (e3) => i.reject(e3)
    }), o = new __PRIVATE_QueryListener(n2, s, {
      includeMetadataChanges: true,
      qa: true
    });
    return __PRIVATE_eventManagerListen(e2, o);
  }(await __PRIVATE_getEventManager(e), e.asyncQueue, t, n, r)), r.promise;
}
function __PRIVATE_cloneLongPollingOptions(e) {
  const t = {};
  return e.timeoutSeconds !== undefined && (t.timeoutSeconds = e.timeoutSeconds), t;
}
var _n = new Map;
var an = "firestore.googleapis.com";
var un = true;

class FirestoreSettingsImpl {
  constructor(e) {
    if (e.host === undefined) {
      if (e.ssl !== undefined)
        throw new FirestoreError(N.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
      this.host = an, this.ssl = un;
    } else
      this.host = e.host, this.ssl = e.ssl ?? un;
    if (this.isUsingEmulator = e.emulatorOptions !== undefined, this.credentials = e.credentials, this.ignoreUndefinedProperties = !!e.ignoreUndefinedProperties, this.localCache = e.localCache, e.cacheSizeBytes === undefined)
      this.cacheSizeBytes = Ot;
    else {
      if (e.cacheSizeBytes !== -1 && e.cacheSizeBytes < Bt)
        throw new FirestoreError(N.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
      this.cacheSizeBytes = e.cacheSizeBytes;
    }
    __PRIVATE_validateIsNotUsedTogether("experimentalForceLongPolling", e.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", e.experimentalAutoDetectLongPolling), this.experimentalForceLongPolling = !!e.experimentalForceLongPolling, this.experimentalForceLongPolling ? this.experimentalAutoDetectLongPolling = false : e.experimentalAutoDetectLongPolling === undefined ? this.experimentalAutoDetectLongPolling = true : this.experimentalAutoDetectLongPolling = !!e.experimentalAutoDetectLongPolling, this.experimentalLongPollingOptions = __PRIVATE_cloneLongPollingOptions(e.experimentalLongPollingOptions ?? {}), function __PRIVATE_validateLongPollingOptions(e2) {
      if (e2.timeoutSeconds !== undefined) {
        if (isNaN(e2.timeoutSeconds))
          throw new FirestoreError(N.INVALID_ARGUMENT, `invalid long polling timeout: ${e2.timeoutSeconds} (must not be NaN)`);
        if (e2.timeoutSeconds < 5)
          throw new FirestoreError(N.INVALID_ARGUMENT, `invalid long polling timeout: ${e2.timeoutSeconds} (minimum allowed value is 5)`);
        if (e2.timeoutSeconds > 30)
          throw new FirestoreError(N.INVALID_ARGUMENT, `invalid long polling timeout: ${e2.timeoutSeconds} (maximum allowed value is 30)`);
      }
    }(this.experimentalLongPollingOptions), this.useFetchStreams = !!e.useFetchStreams;
  }
  isEqual(e) {
    return this.host === e.host && this.ssl === e.ssl && this.credentials === e.credentials && this.cacheSizeBytes === e.cacheSizeBytes && this.experimentalForceLongPolling === e.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === e.experimentalAutoDetectLongPolling && function __PRIVATE_longPollingOptionsEqual(e2, t) {
      return e2.timeoutSeconds === t.timeoutSeconds;
    }(this.experimentalLongPollingOptions, e.experimentalLongPollingOptions) && this.ignoreUndefinedProperties === e.ignoreUndefinedProperties && this.useFetchStreams === e.useFetchStreams;
  }
}

class Firestore$1 {
  constructor(e, t, n, r) {
    this._authCredentials = e, this._appCheckCredentials = t, this._databaseId = n, this._app = r, this.type = "firestore-lite", this._persistenceKey = "(lite)", this._settings = new FirestoreSettingsImpl({}), this._settingsFrozen = false, this._emulatorOptions = {}, this._terminateTask = "notTerminated";
  }
  get app() {
    if (!this._app)
      throw new FirestoreError(N.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
    return this._app;
  }
  get _initialized() {
    return this._settingsFrozen;
  }
  get _terminated() {
    return this._terminateTask !== "notTerminated";
  }
  _setSettings(e) {
    if (this._settingsFrozen)
      throw new FirestoreError(N.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
    this._settings = new FirestoreSettingsImpl(e), this._emulatorOptions = e.emulatorOptions || {}, e.credentials !== undefined && (this._authCredentials = function __PRIVATE_makeAuthCredentialsProvider(e2) {
      if (!e2)
        return new __PRIVATE_EmptyAuthCredentialsProvider;
      switch (e2.type) {
        case "firstParty":
          return new __PRIVATE_FirstPartyAuthCredentialsProvider(e2.sessionIndex || "0", e2.iamToken || null, e2.authTokenFactory || null);
        case "provider":
          return e2.client;
        default:
          throw new FirestoreError(N.INVALID_ARGUMENT, "makeAuthCredentialsProvider failed due to invalid credential type");
      }
    }(e.credentials));
  }
  _getSettings() {
    return this._settings;
  }
  _getEmulatorOptions() {
    return this._emulatorOptions;
  }
  _freezeSettings() {
    return this._settingsFrozen = true, this._settings;
  }
  _delete() {
    return this._terminateTask === "notTerminated" && (this._terminateTask = this._terminate()), this._terminateTask;
  }
  async _restart() {
    this._terminateTask === "notTerminated" ? await this._terminate() : this._terminateTask = "notTerminated";
  }
  toJSON() {
    return {
      app: this._app,
      databaseId: this._databaseId,
      settings: this._settings
    };
  }
  _terminate() {
    return function __PRIVATE_removeComponents(e) {
      const t = _n.get(e);
      t && (__PRIVATE_logDebug("ComponentProvider", "Removing Datastore"), _n.delete(e), t.terminate());
    }(this), Promise.resolve();
  }
}
function connectFirestoreEmulator(e, t, n, r = {}) {
  e = __PRIVATE_cast(e, Firestore$1);
  const i = isCloudWorkstation(t), s = e._getSettings(), o = {
    ...s,
    emulatorOptions: e._getEmulatorOptions()
  }, _ = `${t}:${n}`;
  i && (pingServer(`https://${_}`), updateEmulatorBanner("Firestore", true)), s.host !== an && s.host !== _ && __PRIVATE_logWarn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");
  const a = {
    ...s,
    host: _,
    ssl: i,
    emulatorOptions: r
  };
  if (!deepEqual(a, o) && (e._setSettings(a), r.mockUserToken)) {
    let t2, n2;
    if (typeof r.mockUserToken == "string")
      t2 = r.mockUserToken, n2 = User.MOCK_USER;
    else {
      t2 = createMockUserToken(r.mockUserToken, e._app?.options.projectId);
      const i2 = r.mockUserToken.sub || r.mockUserToken.user_id;
      if (!i2)
        throw new FirestoreError(N.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
      n2 = new User(i2);
    }
    e._authCredentials = new __PRIVATE_EmulatorAuthCredentialsProvider(new __PRIVATE_OAuthToken(t2, n2));
  }
}

class Query {
  constructor(e, t, n) {
    this.converter = t, this._query = n, this.type = "query", this.firestore = e;
  }
  withConverter(e) {
    return new Query(this.firestore, e, this._query);
  }
}

class DocumentReference {
  constructor(e, t, n) {
    this.converter = t, this._key = n, this.type = "document", this.firestore = e;
  }
  get _path() {
    return this._key.path;
  }
  get id() {
    return this._key.path.lastSegment();
  }
  get path() {
    return this._key.path.canonicalString();
  }
  get parent() {
    return new CollectionReference(this.firestore, this.converter, this._key.path.popLast());
  }
  withConverter(e) {
    return new DocumentReference(this.firestore, e, this._key);
  }
  toJSON() {
    return {
      type: DocumentReference._jsonSchemaVersion,
      referencePath: this._key.toString()
    };
  }
  static fromJSON(e, t, n) {
    if (__PRIVATE_validateJSON(t, DocumentReference._jsonSchema))
      return new DocumentReference(e, n || null, new DocumentKey(ResourcePath.fromString(t.referencePath)));
  }
}
DocumentReference._jsonSchemaVersion = "firestore/documentReference/1.0", DocumentReference._jsonSchema = {
  type: property("string", DocumentReference._jsonSchemaVersion),
  referencePath: property("string")
};

class CollectionReference extends Query {
  constructor(e, t, n) {
    super(e, t, __PRIVATE_newQueryForPath(n)), this._path = n, this.type = "collection";
  }
  get id() {
    return this._query.path.lastSegment();
  }
  get path() {
    return this._query.path.canonicalString();
  }
  get parent() {
    const e = this._path.popLast();
    return e.isEmpty() ? null : new DocumentReference(this.firestore, null, new DocumentKey(e));
  }
  withConverter(e) {
    return new CollectionReference(this.firestore, e, this._path);
  }
}
function collection(e, t, ...n) {
  if (e = getModularInstance(e), __PRIVATE_validateNonEmptyArgument("collection", "path", t), e instanceof Firestore$1) {
    const r = ResourcePath.fromString(t, ...n);
    return __PRIVATE_validateCollectionPath(r), new CollectionReference(e, null, r);
  }
  {
    if (!(e instanceof DocumentReference || e instanceof CollectionReference))
      throw new FirestoreError(N.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    const r = e._path.child(ResourcePath.fromString(t, ...n));
    return __PRIVATE_validateCollectionPath(r), new CollectionReference(e.firestore, null, r);
  }
}
function doc(e, t, ...n) {
  if (e = getModularInstance(e), arguments.length === 1 && (t = __PRIVATE_AutoId.newId()), __PRIVATE_validateNonEmptyArgument("doc", "path", t), e instanceof Firestore$1) {
    const r = ResourcePath.fromString(t, ...n);
    return __PRIVATE_validateDocumentPath(r), new DocumentReference(e, null, new DocumentKey(r));
  }
  {
    if (!(e instanceof DocumentReference || e instanceof CollectionReference))
      throw new FirestoreError(N.INVALID_ARGUMENT, "Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    const r = e._path.child(ResourcePath.fromString(t, ...n));
    return __PRIVATE_validateDocumentPath(r), new DocumentReference(e.firestore, e instanceof CollectionReference ? e.converter : null, new DocumentKey(r));
  }
}
var cn = "AsyncQueue";

class __PRIVATE_AsyncQueueImpl {
  constructor(e = Promise.resolve()) {
    this.Xu = [], this.ec = false, this.tc = [], this.nc = null, this.rc = false, this.sc = false, this.oc = [], this.M_ = new __PRIVATE_ExponentialBackoff(this, "async_queue_retry"), this._c = () => {
      const e2 = getDocument();
      e2 && __PRIVATE_logDebug(cn, "Visibility state changed to " + e2.visibilityState), this.M_.w_();
    }, this.ac = e;
    const t = getDocument();
    t && typeof t.addEventListener == "function" && t.addEventListener("visibilitychange", this._c);
  }
  get isShuttingDown() {
    return this.ec;
  }
  enqueueAndForget(e) {
    this.enqueue(e);
  }
  enqueueAndForgetEvenWhileRestricted(e) {
    this.uc(), this.cc(e);
  }
  enterRestrictedMode(e) {
    if (!this.ec) {
      this.ec = true, this.sc = e || false;
      const t = getDocument();
      t && typeof t.removeEventListener == "function" && t.removeEventListener("visibilitychange", this._c);
    }
  }
  enqueue(e) {
    if (this.uc(), this.ec)
      return new Promise(() => {});
    const t = new __PRIVATE_Deferred;
    return this.cc(() => this.ec && this.sc ? Promise.resolve() : (e().then(t.resolve, t.reject), t.promise)).then(() => t.promise);
  }
  enqueueRetryable(e) {
    this.enqueueAndForget(() => (this.Xu.push(e), this.lc()));
  }
  async lc() {
    if (this.Xu.length !== 0) {
      try {
        await this.Xu[0](), this.Xu.shift(), this.M_.reset();
      } catch (e) {
        if (!__PRIVATE_isIndexedDbTransactionError(e))
          throw e;
        __PRIVATE_logDebug(cn, "Operation failed with retryable error: " + e);
      }
      this.Xu.length > 0 && this.M_.p_(() => this.lc());
    }
  }
  cc(e) {
    const t = this.ac.then(() => (this.rc = true, e().catch((e2) => {
      this.nc = e2, this.rc = false;
      throw __PRIVATE_logError("INTERNAL UNHANDLED ERROR: ", __PRIVATE_getMessageOrStack(e2)), e2;
    }).then((e2) => (this.rc = false, e2))));
    return this.ac = t, t;
  }
  enqueueAfterDelay(e, t, n) {
    this.uc(), this.oc.indexOf(e) > -1 && (t = 0);
    const r = DelayedOperation.createAndSchedule(this, e, t, n, (e2) => this.hc(e2));
    return this.tc.push(r), r;
  }
  uc() {
    this.nc && fail(47125, {
      Pc: __PRIVATE_getMessageOrStack(this.nc)
    });
  }
  verifyOperationInProgress() {}
  async Tc() {
    let e;
    do {
      e = this.ac, await e;
    } while (e !== this.ac);
  }
  Ic(e) {
    for (const t of this.tc)
      if (t.timerId === e)
        return true;
    return false;
  }
  Ec(e) {
    return this.Tc().then(() => {
      this.tc.sort((e2, t) => e2.targetTimeMs - t.targetTimeMs);
      for (const t of this.tc)
        if (t.skipDelay(), e !== "all" && t.timerId === e)
          break;
      return this.Tc();
    });
  }
  dc(e) {
    this.oc.push(e);
  }
  hc(e) {
    const t = this.tc.indexOf(e);
    this.tc.splice(t, 1);
  }
}
function __PRIVATE_getMessageOrStack(e) {
  let t = e.message || "";
  return e.stack && (t = e.stack.includes(e.message) ? e.stack : e.message + `
` + e.stack), t;
}
class Firestore extends Firestore$1 {
  constructor(e, t, n, r) {
    super(e, t, n, r), this.type = "firestore", this._queue = new __PRIVATE_AsyncQueueImpl, this._persistenceKey = r?.name || "[DEFAULT]";
  }
  async _terminate() {
    if (this._firestoreClient) {
      const e = this._firestoreClient.terminate();
      this._queue = new __PRIVATE_AsyncQueueImpl(e), this._firestoreClient = undefined, await e;
    }
  }
}
function getFirestore(e, n) {
  const r = typeof e == "object" ? e : getApp(), i = typeof e == "string" ? e : n || lt, s = _getProvider(r, "firestore").getImmediate({
    identifier: i
  });
  if (!s._initialized) {
    const e2 = getDefaultEmulatorHostnameAndPort("firestore");
    e2 && connectFirestoreEmulator(s, ...e2);
  }
  return s;
}
function ensureFirestoreConfigured(e) {
  if (e._terminated)
    throw new FirestoreError(N.FAILED_PRECONDITION, "The client has already been terminated.");
  return e._firestoreClient || __PRIVATE_configureFirestore(e), e._firestoreClient;
}
function __PRIVATE_configureFirestore(e) {
  const t = e._freezeSettings(), n = function __PRIVATE_makeDatabaseInfo(e2, t2, n2, r) {
    return new DatabaseInfo(e2, t2, n2, r.host, r.ssl, r.experimentalForceLongPolling, r.experimentalAutoDetectLongPolling, __PRIVATE_cloneLongPollingOptions(r.experimentalLongPollingOptions), r.useFetchStreams, r.isUsingEmulator);
  }(e._databaseId, e._app?.options.appId || "", e._persistenceKey, t);
  e._componentsProvider || t.localCache?._offlineComponentProvider && t.localCache?._onlineComponentProvider && (e._componentsProvider = {
    _offline: t.localCache._offlineComponentProvider,
    _online: t.localCache._onlineComponentProvider
  }), e._firestoreClient = new FirestoreClient(e._authCredentials, e._appCheckCredentials, e._queue, n, e._componentsProvider && function __PRIVATE_buildComponentProvider(e2) {
    const t2 = e2?._online.build();
    return {
      _offline: e2?._offline.build(t2),
      _online: t2
    };
  }(e._componentsProvider));
}
class Bytes {
  constructor(e) {
    this._byteString = e;
  }
  static fromBase64String(e) {
    try {
      return new Bytes(ByteString.fromBase64String(e));
    } catch (e2) {
      throw new FirestoreError(N.INVALID_ARGUMENT, "Failed to construct data from Base64 string: " + e2);
    }
  }
  static fromUint8Array(e) {
    return new Bytes(ByteString.fromUint8Array(e));
  }
  toBase64() {
    return this._byteString.toBase64();
  }
  toUint8Array() {
    return this._byteString.toUint8Array();
  }
  toString() {
    return "Bytes(base64: " + this.toBase64() + ")";
  }
  isEqual(e) {
    return this._byteString.isEqual(e._byteString);
  }
  toJSON() {
    return {
      type: Bytes._jsonSchemaVersion,
      bytes: this.toBase64()
    };
  }
  static fromJSON(e) {
    if (__PRIVATE_validateJSON(e, Bytes._jsonSchema))
      return Bytes.fromBase64String(e.bytes);
  }
}
Bytes._jsonSchemaVersion = "firestore/bytes/1.0", Bytes._jsonSchema = {
  type: property("string", Bytes._jsonSchemaVersion),
  bytes: property("string")
};

class FieldPath {
  constructor(...e) {
    for (let t = 0;t < e.length; ++t)
      if (e[t].length === 0)
        throw new FirestoreError(N.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
    this._internalPath = new FieldPath$1(e);
  }
  isEqual(e) {
    return this._internalPath.isEqual(e._internalPath);
  }
}
class FieldValue {
  constructor(e) {
    this._methodName = e;
  }
}

class GeoPoint {
  constructor(e, t) {
    if (!isFinite(e) || e < -90 || e > 90)
      throw new FirestoreError(N.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + e);
    if (!isFinite(t) || t < -180 || t > 180)
      throw new FirestoreError(N.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + t);
    this._lat = e, this._long = t;
  }
  get latitude() {
    return this._lat;
  }
  get longitude() {
    return this._long;
  }
  isEqual(e) {
    return this._lat === e._lat && this._long === e._long;
  }
  _compareTo(e) {
    return __PRIVATE_primitiveComparator(this._lat, e._lat) || __PRIVATE_primitiveComparator(this._long, e._long);
  }
  toJSON() {
    return {
      latitude: this._lat,
      longitude: this._long,
      type: GeoPoint._jsonSchemaVersion
    };
  }
  static fromJSON(e) {
    if (__PRIVATE_validateJSON(e, GeoPoint._jsonSchema))
      return new GeoPoint(e.latitude, e.longitude);
  }
}
GeoPoint._jsonSchemaVersion = "firestore/geoPoint/1.0", GeoPoint._jsonSchema = {
  type: property("string", GeoPoint._jsonSchemaVersion),
  latitude: property("number"),
  longitude: property("number")
};

class VectorValue {
  constructor(e) {
    this._values = (e || []).map((e2) => e2);
  }
  toArray() {
    return this._values.map((e) => e);
  }
  isEqual(e) {
    return function __PRIVATE_isPrimitiveArrayEqual(e2, t) {
      if (e2.length !== t.length)
        return false;
      for (let n = 0;n < e2.length; ++n)
        if (e2[n] !== t[n])
          return false;
      return true;
    }(this._values, e._values);
  }
  toJSON() {
    return {
      type: VectorValue._jsonSchemaVersion,
      vectorValues: this._values
    };
  }
  static fromJSON(e) {
    if (__PRIVATE_validateJSON(e, VectorValue._jsonSchema)) {
      if (Array.isArray(e.vectorValues) && e.vectorValues.every((e2) => typeof e2 == "number"))
        return new VectorValue(e.vectorValues);
      throw new FirestoreError(N.INVALID_ARGUMENT, "Expected 'vectorValues' field to be a number array");
    }
  }
}
VectorValue._jsonSchemaVersion = "firestore/vectorValue/1.0", VectorValue._jsonSchema = {
  type: property("string", VectorValue._jsonSchemaVersion),
  vectorValues: property("object")
};
var hn = /^__.*__$/;

class ParsedSetData {
  constructor(e, t, n) {
    this.data = e, this.fieldMask = t, this.fieldTransforms = n;
  }
  toMutation(e, t) {
    return this.fieldMask !== null ? new __PRIVATE_PatchMutation(e, this.data, this.fieldMask, t, this.fieldTransforms) : new __PRIVATE_SetMutation(e, this.data, t, this.fieldTransforms);
  }
}

class ParsedUpdateData {
  constructor(e, t, n) {
    this.data = e, this.fieldMask = t, this.fieldTransforms = n;
  }
  toMutation(e, t) {
    return new __PRIVATE_PatchMutation(e, this.data, this.fieldMask, t, this.fieldTransforms);
  }
}
function __PRIVATE_isWrite(e) {
  switch (e) {
    case 0:
    case 2:
    case 1:
      return true;
    case 3:
    case 4:
      return false;
    default:
      throw fail(40011, {
        Ac: e
      });
  }
}

class __PRIVATE_ParseContextImpl {
  constructor(e, t, n, r, i, s) {
    this.settings = e, this.databaseId = t, this.serializer = n, this.ignoreUndefinedProperties = r, i === undefined && this.Rc(), this.fieldTransforms = i || [], this.fieldMask = s || [];
  }
  get path() {
    return this.settings.path;
  }
  get Ac() {
    return this.settings.Ac;
  }
  Vc(e) {
    return new __PRIVATE_ParseContextImpl({
      ...this.settings,
      ...e
    }, this.databaseId, this.serializer, this.ignoreUndefinedProperties, this.fieldTransforms, this.fieldMask);
  }
  mc(e) {
    const t = this.path?.child(e), n = this.Vc({
      path: t,
      fc: false
    });
    return n.gc(e), n;
  }
  yc(e) {
    const t = this.path?.child(e), n = this.Vc({
      path: t,
      fc: false
    });
    return n.Rc(), n;
  }
  wc(e) {
    return this.Vc({
      path: undefined,
      fc: true
    });
  }
  Sc(e) {
    return __PRIVATE_createError(e, this.settings.methodName, this.settings.bc || false, this.path, this.settings.Dc);
  }
  contains(e) {
    return this.fieldMask.find((t) => e.isPrefixOf(t)) !== undefined || this.fieldTransforms.find((t) => e.isPrefixOf(t.field)) !== undefined;
  }
  Rc() {
    if (this.path)
      for (let e = 0;e < this.path.length; e++)
        this.gc(this.path.get(e));
  }
  gc(e) {
    if (e.length === 0)
      throw this.Sc("Document fields must not be empty");
    if (__PRIVATE_isWrite(this.Ac) && hn.test(e))
      throw this.Sc('Document fields cannot begin and end with "__"');
  }
}

class __PRIVATE_UserDataReader {
  constructor(e, t, n) {
    this.databaseId = e, this.ignoreUndefinedProperties = t, this.serializer = n || __PRIVATE_newSerializer(e);
  }
  Cc(e, t, n, r = false) {
    return new __PRIVATE_ParseContextImpl({
      Ac: e,
      methodName: t,
      Dc: n,
      path: FieldPath$1.emptyPath(),
      fc: false,
      bc: r
    }, this.databaseId, this.serializer, this.ignoreUndefinedProperties);
  }
}
function __PRIVATE_newUserDataReader(e) {
  const t = e._freezeSettings(), n = __PRIVATE_newSerializer(e._databaseId);
  return new __PRIVATE_UserDataReader(e._databaseId, !!t.ignoreUndefinedProperties, n);
}
function __PRIVATE_parseSetData(e, t, n, r, i, s = {}) {
  const o = e.Cc(s.merge || s.mergeFields ? 2 : 0, t, n, i);
  __PRIVATE_validatePlainObject("Data must be an object, but it was:", o, r);
  const _ = __PRIVATE_parseObject(r, o);
  let a, u;
  if (s.merge)
    a = new FieldMask(o.fieldMask), u = o.fieldTransforms;
  else if (s.mergeFields) {
    const e2 = [];
    for (const r2 of s.mergeFields) {
      const i2 = __PRIVATE_fieldPathFromArgument$1(t, r2, n);
      if (!o.contains(i2))
        throw new FirestoreError(N.INVALID_ARGUMENT, `Field '${i2}' is specified in your field mask but missing from your input data.`);
      __PRIVATE_fieldMaskContains(e2, i2) || e2.push(i2);
    }
    a = new FieldMask(e2), u = o.fieldTransforms.filter((e3) => a.covers(e3.field));
  } else
    a = null, u = o.fieldTransforms;
  return new ParsedSetData(new ObjectValue(_), a, u);
}

class __PRIVATE_DeleteFieldValueImpl extends FieldValue {
  _toFieldTransform(e) {
    if (e.Ac !== 2)
      throw e.Ac === 1 ? e.Sc(`${this._methodName}() can only appear at the top level of your update data`) : e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);
    return e.fieldMask.push(e.path), null;
  }
  isEqual(e) {
    return e instanceof __PRIVATE_DeleteFieldValueImpl;
  }
}
function __PRIVATE_parseUpdateData(e, t, n, r) {
  const i = e.Cc(1, t, n);
  __PRIVATE_validatePlainObject("Data must be an object, but it was:", i, r);
  const s = [], o = ObjectValue.empty();
  forEach(r, (e2, r2) => {
    const _2 = __PRIVATE_fieldPathFromDotSeparatedString(t, e2, n);
    r2 = getModularInstance(r2);
    const a = i.yc(_2);
    if (r2 instanceof __PRIVATE_DeleteFieldValueImpl)
      s.push(_2);
    else {
      const e3 = __PRIVATE_parseData(r2, a);
      e3 != null && (s.push(_2), o.set(_2, e3));
    }
  });
  const _ = new FieldMask(s);
  return new ParsedUpdateData(o, _, i.fieldTransforms);
}
function __PRIVATE_parseUpdateVarargs(e, t, n, r, i, s) {
  const o = e.Cc(1, t, n), _ = [__PRIVATE_fieldPathFromArgument$1(t, r, n)], a = [i];
  if (s.length % 2 != 0)
    throw new FirestoreError(N.INVALID_ARGUMENT, `Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);
  for (let e2 = 0;e2 < s.length; e2 += 2)
    _.push(__PRIVATE_fieldPathFromArgument$1(t, s[e2])), a.push(s[e2 + 1]);
  const u = [], c = ObjectValue.empty();
  for (let e2 = _.length - 1;e2 >= 0; --e2)
    if (!__PRIVATE_fieldMaskContains(u, _[e2])) {
      const t2 = _[e2];
      let n2 = a[e2];
      n2 = getModularInstance(n2);
      const r2 = o.yc(t2);
      if (n2 instanceof __PRIVATE_DeleteFieldValueImpl)
        u.push(t2);
      else {
        const e3 = __PRIVATE_parseData(n2, r2);
        e3 != null && (u.push(t2), c.set(t2, e3));
      }
    }
  const l = new FieldMask(u);
  return new ParsedUpdateData(c, l, o.fieldTransforms);
}
function __PRIVATE_parseQueryValue(e, t, n, r = false) {
  return __PRIVATE_parseData(n, e.Cc(r ? 4 : 3, t));
}
function __PRIVATE_parseData(e, t) {
  if (__PRIVATE_looksLikeJsonObject(e = getModularInstance(e)))
    return __PRIVATE_validatePlainObject("Unsupported field value:", t, e), __PRIVATE_parseObject(e, t);
  if (e instanceof FieldValue)
    return function __PRIVATE_parseSentinelFieldValue(e2, t2) {
      if (!__PRIVATE_isWrite(t2.Ac))
        throw t2.Sc(`${e2._methodName}() can only be used with update() and set()`);
      if (!t2.path)
        throw t2.Sc(`${e2._methodName}() is not currently supported inside arrays`);
      const n = e2._toFieldTransform(t2);
      n && t2.fieldTransforms.push(n);
    }(e, t), null;
  if (e === undefined && t.ignoreUndefinedProperties)
    return null;
  if (t.path && t.fieldMask.push(t.path), e instanceof Array) {
    if (t.settings.fc && t.Ac !== 4)
      throw t.Sc("Nested arrays are not supported");
    return function __PRIVATE_parseArray(e2, t2) {
      const n = [];
      let r = 0;
      for (const i of e2) {
        let e3 = __PRIVATE_parseData(i, t2.wc(r));
        e3 == null && (e3 = {
          nullValue: "NULL_VALUE"
        }), n.push(e3), r++;
      }
      return {
        arrayValue: {
          values: n
        }
      };
    }(e, t);
  }
  return function __PRIVATE_parseScalarValue(e2, t2) {
    if ((e2 = getModularInstance(e2)) === null)
      return {
        nullValue: "NULL_VALUE"
      };
    if (typeof e2 == "number")
      return toNumber(t2.serializer, e2);
    if (typeof e2 == "boolean")
      return {
        booleanValue: e2
      };
    if (typeof e2 == "string")
      return {
        stringValue: e2
      };
    if (e2 instanceof Date) {
      const n = Timestamp.fromDate(e2);
      return {
        timestampValue: toTimestamp(t2.serializer, n)
      };
    }
    if (e2 instanceof Timestamp) {
      const n = new Timestamp(e2.seconds, 1000 * Math.floor(e2.nanoseconds / 1000));
      return {
        timestampValue: toTimestamp(t2.serializer, n)
      };
    }
    if (e2 instanceof GeoPoint)
      return {
        geoPointValue: {
          latitude: e2.latitude,
          longitude: e2.longitude
        }
      };
    if (e2 instanceof Bytes)
      return {
        bytesValue: __PRIVATE_toBytes(t2.serializer, e2._byteString)
      };
    if (e2 instanceof DocumentReference) {
      const n = t2.databaseId, r = e2.firestore._databaseId;
      if (!r.isEqual(n))
        throw t2.Sc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);
      return {
        referenceValue: __PRIVATE_toResourceName(e2.firestore._databaseId || t2.databaseId, e2._key.path)
      };
    }
    if (e2 instanceof VectorValue)
      return function __PRIVATE_parseVectorValue(e3, t3) {
        const n = {
          fields: {
            [ht]: {
              stringValue: It
            },
            [Et]: {
              arrayValue: {
                values: e3.toArray().map((e4) => {
                  if (typeof e4 != "number")
                    throw t3.Sc("VectorValues must only contain numeric values.");
                  return __PRIVATE_toDouble(t3.serializer, e4);
                })
              }
            }
          }
        };
        return {
          mapValue: n
        };
      }(e2, t2);
    throw t2.Sc(`Unsupported field value: ${__PRIVATE_valueDescription(e2)}`);
  }(e, t);
}
function __PRIVATE_parseObject(e, t) {
  const n = {};
  return isEmpty(e) ? t.path && t.path.length > 0 && t.fieldMask.push(t.path) : forEach(e, (e2, r) => {
    const i = __PRIVATE_parseData(r, t.mc(e2));
    i != null && (n[e2] = i);
  }), {
    mapValue: {
      fields: n
    }
  };
}
function __PRIVATE_looksLikeJsonObject(e) {
  return !(typeof e != "object" || e === null || e instanceof Array || e instanceof Date || e instanceof Timestamp || e instanceof GeoPoint || e instanceof Bytes || e instanceof DocumentReference || e instanceof FieldValue || e instanceof VectorValue);
}
function __PRIVATE_validatePlainObject(e, t, n) {
  if (!__PRIVATE_looksLikeJsonObject(n) || !__PRIVATE_isPlainObject(n)) {
    const r = __PRIVATE_valueDescription(n);
    throw r === "an object" ? t.Sc(e + " a custom object") : t.Sc(e + " " + r);
  }
}
function __PRIVATE_fieldPathFromArgument$1(e, t, n) {
  if ((t = getModularInstance(t)) instanceof FieldPath)
    return t._internalPath;
  if (typeof t == "string")
    return __PRIVATE_fieldPathFromDotSeparatedString(e, t);
  throw __PRIVATE_createError("Field path arguments must be of type string or ", e, false, undefined, n);
}
var Pn = new RegExp("[~\\*/\\[\\]]");
function __PRIVATE_fieldPathFromDotSeparatedString(e, t, n) {
  if (t.search(Pn) >= 0)
    throw __PRIVATE_createError(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`, e, false, undefined, n);
  try {
    return new FieldPath(...t.split("."))._internalPath;
  } catch (r) {
    throw __PRIVATE_createError(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`, e, false, undefined, n);
  }
}
function __PRIVATE_createError(e, t, n, r, i) {
  const s = r && !r.isEmpty(), o = i !== undefined;
  let _ = `Function ${t}() called with invalid data`;
  n && (_ += " (via `toFirestore()`)"), _ += ". ";
  let a = "";
  return (s || o) && (a += " (found", s && (a += ` in field ${r}`), o && (a += ` in document ${i}`), a += ")"), new FirestoreError(N.INVALID_ARGUMENT, _ + e + a);
}
function __PRIVATE_fieldMaskContains(e, t) {
  return e.some((e2) => e2.isEqual(t));
}

class DocumentSnapshot$1 {
  constructor(e, t, n, r, i) {
    this._firestore = e, this._userDataWriter = t, this._key = n, this._document = r, this._converter = i;
  }
  get id() {
    return this._key.path.lastSegment();
  }
  get ref() {
    return new DocumentReference(this._firestore, this._converter, this._key);
  }
  exists() {
    return this._document !== null;
  }
  data() {
    if (this._document) {
      if (this._converter) {
        const e = new QueryDocumentSnapshot$1(this._firestore, this._userDataWriter, this._key, this._document, null);
        return this._converter.fromFirestore(e);
      }
      return this._userDataWriter.convertValue(this._document.data.value);
    }
  }
  get(e) {
    if (this._document) {
      const t = this._document.data.field(__PRIVATE_fieldPathFromArgument("DocumentSnapshot.get", e));
      if (t !== null)
        return this._userDataWriter.convertValue(t);
    }
  }
}

class QueryDocumentSnapshot$1 extends DocumentSnapshot$1 {
  data() {
    return super.data();
  }
}
function __PRIVATE_fieldPathFromArgument(e, t) {
  return typeof t == "string" ? __PRIVATE_fieldPathFromDotSeparatedString(e, t) : t instanceof FieldPath ? t._internalPath : t._delegate._internalPath;
}
function __PRIVATE_validateHasExplicitOrderByForLimitToLast(e) {
  if (e.limitType === "L" && e.explicitOrderBy.length === 0)
    throw new FirestoreError(N.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
}

class AppliableConstraint {
}

class QueryConstraint extends AppliableConstraint {
}
function query(e, t, ...n) {
  let r = [];
  t instanceof AppliableConstraint && r.push(t), r = r.concat(n), function __PRIVATE_validateQueryConstraintArray(e2) {
    const t2 = e2.filter((e3) => e3 instanceof QueryCompositeFilterConstraint).length, n2 = e2.filter((e3) => e3 instanceof QueryFieldFilterConstraint).length;
    if (t2 > 1 || t2 > 0 && n2 > 0)
      throw new FirestoreError(N.INVALID_ARGUMENT, "InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.");
  }(r);
  for (const t2 of r)
    e = t2._apply(e);
  return e;
}

class QueryFieldFilterConstraint extends QueryConstraint {
  constructor(e, t, n) {
    super(), this._field = e, this._op = t, this._value = n, this.type = "where";
  }
  static _create(e, t, n) {
    return new QueryFieldFilterConstraint(e, t, n);
  }
  _apply(e) {
    const t = this._parse(e);
    return __PRIVATE_validateNewFieldFilter(e._query, t), new Query(e.firestore, e.converter, __PRIVATE_queryWithAddedFilter(e._query, t));
  }
  _parse(e) {
    const t = __PRIVATE_newUserDataReader(e.firestore), n = function __PRIVATE_newQueryFilter(e2, t2, n2, r, i, s, o) {
      let _;
      if (i.isKeyField()) {
        if (s === "array-contains" || s === "array-contains-any")
          throw new FirestoreError(N.INVALID_ARGUMENT, `Invalid Query. You can't perform '${s}' queries on documentId().`);
        if (s === "in" || s === "not-in") {
          __PRIVATE_validateDisjunctiveFilterElements(o, s);
          const t3 = [];
          for (const n3 of o)
            t3.push(__PRIVATE_parseDocumentIdValue(r, e2, n3));
          _ = {
            arrayValue: {
              values: t3
            }
          };
        } else
          _ = __PRIVATE_parseDocumentIdValue(r, e2, o);
      } else
        s !== "in" && s !== "not-in" && s !== "array-contains-any" || __PRIVATE_validateDisjunctiveFilterElements(o, s), _ = __PRIVATE_parseQueryValue(n2, t2, o, s === "in" || s === "not-in");
      const a = FieldFilter.create(i, s, _);
      return a;
    }(e._query, "where", t, e.firestore._databaseId, this._field, this._op, this._value);
    return n;
  }
}
class QueryCompositeFilterConstraint extends AppliableConstraint {
  constructor(e, t) {
    super(), this.type = e, this._queryConstraints = t;
  }
  static _create(e, t) {
    return new QueryCompositeFilterConstraint(e, t);
  }
  _parse(e) {
    const t = this._queryConstraints.map((t2) => t2._parse(e)).filter((e2) => e2.getFilters().length > 0);
    return t.length === 1 ? t[0] : CompositeFilter.create(t, this._getOperator());
  }
  _apply(e) {
    const t = this._parse(e);
    return t.getFilters().length === 0 ? e : (function __PRIVATE_validateNewFilter(e2, t2) {
      let n = e2;
      const r = t2.getFlattenedFilters();
      for (const e3 of r)
        __PRIVATE_validateNewFieldFilter(n, e3), n = __PRIVATE_queryWithAddedFilter(n, e3);
    }(e._query, t), new Query(e.firestore, e.converter, __PRIVATE_queryWithAddedFilter(e._query, t)));
  }
  _getQueryConstraints() {
    return this._queryConstraints;
  }
  _getOperator() {
    return this.type === "and" ? "and" : "or";
  }
}
class QueryOrderByConstraint extends QueryConstraint {
  constructor(e, t) {
    super(), this._field = e, this._direction = t, this.type = "orderBy";
  }
  static _create(e, t) {
    return new QueryOrderByConstraint(e, t);
  }
  _apply(e) {
    const t = function __PRIVATE_newQueryOrderBy(e2, t2, n) {
      if (e2.startAt !== null)
        throw new FirestoreError(N.INVALID_ARGUMENT, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
      if (e2.endAt !== null)
        throw new FirestoreError(N.INVALID_ARGUMENT, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
      const r = new OrderBy(t2, n);
      return r;
    }(e._query, this._field, this._direction);
    return new Query(e.firestore, e.converter, function __PRIVATE_queryWithAddedOrderBy(e2, t2) {
      const n = e2.explicitOrderBy.concat([t2]);
      return new __PRIVATE_QueryImpl(e2.path, e2.collectionGroup, n, e2.filters.slice(), e2.limit, e2.limitType, e2.startAt, e2.endAt);
    }(e._query, t));
  }
}
function orderBy(e, t = "asc") {
  const n = t, r = __PRIVATE_fieldPathFromArgument("orderBy", e);
  return QueryOrderByConstraint._create(r, n);
}

class QueryLimitConstraint extends QueryConstraint {
  constructor(e, t, n) {
    super(), this.type = e, this._limit = t, this._limitType = n;
  }
  static _create(e, t, n) {
    return new QueryLimitConstraint(e, t, n);
  }
  _apply(e) {
    return new Query(e.firestore, e.converter, __PRIVATE_queryWithLimit(e._query, this._limit, this._limitType));
  }
}
function limit(e) {
  return __PRIVATE_validatePositiveNumber("limit", e), QueryLimitConstraint._create("limit", e, "F");
}
function __PRIVATE_parseDocumentIdValue(e, t, n) {
  if (typeof (n = getModularInstance(n)) == "string") {
    if (n === "")
      throw new FirestoreError(N.INVALID_ARGUMENT, "Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");
    if (!__PRIVATE_isCollectionGroupQuery(t) && n.indexOf("/") !== -1)
      throw new FirestoreError(N.INVALID_ARGUMENT, `Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);
    const r = t.path.child(ResourcePath.fromString(n));
    if (!DocumentKey.isDocumentKey(r))
      throw new FirestoreError(N.INVALID_ARGUMENT, `Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);
    return __PRIVATE_refValue(e, new DocumentKey(r));
  }
  if (n instanceof DocumentReference)
    return __PRIVATE_refValue(e, n._key);
  throw new FirestoreError(N.INVALID_ARGUMENT, `Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${__PRIVATE_valueDescription(n)}.`);
}
function __PRIVATE_validateDisjunctiveFilterElements(e, t) {
  if (!Array.isArray(e) || e.length === 0)
    throw new FirestoreError(N.INVALID_ARGUMENT, `Invalid Query. A non-empty array is required for '${t.toString()}' filters.`);
}
function __PRIVATE_validateNewFieldFilter(e, t) {
  const n = function __PRIVATE_findOpInsideFilters(e2, t2) {
    for (const n2 of e2)
      for (const e3 of n2.getFlattenedFilters())
        if (t2.indexOf(e3.op) >= 0)
          return e3.op;
    return null;
  }(e.filters, function __PRIVATE_conflictingOps(e2) {
    switch (e2) {
      case "!=":
        return ["!=", "not-in"];
      case "array-contains-any":
      case "in":
        return ["not-in"];
      case "not-in":
        return ["array-contains-any", "in", "not-in", "!="];
      default:
        return [];
    }
  }(t.op));
  if (n !== null)
    throw n === t.op ? new FirestoreError(N.INVALID_ARGUMENT, `Invalid query. You cannot use more than one '${t.op.toString()}' filter.`) : new FirestoreError(N.INVALID_ARGUMENT, `Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`);
}
class AbstractUserDataWriter {
  convertValue(e, t = "none") {
    switch (__PRIVATE_typeOrder(e)) {
      case 0:
        return null;
      case 1:
        return e.booleanValue;
      case 2:
        return __PRIVATE_normalizeNumber(e.integerValue || e.doubleValue);
      case 3:
        return this.convertTimestamp(e.timestampValue);
      case 4:
        return this.convertServerTimestamp(e, t);
      case 5:
        return e.stringValue;
      case 6:
        return this.convertBytes(__PRIVATE_normalizeByteString(e.bytesValue));
      case 7:
        return this.convertReference(e.referenceValue);
      case 8:
        return this.convertGeoPoint(e.geoPointValue);
      case 9:
        return this.convertArray(e.arrayValue, t);
      case 11:
        return this.convertObject(e.mapValue, t);
      case 10:
        return this.convertVectorValue(e.mapValue);
      default:
        throw fail(62114, {
          value: e
        });
    }
  }
  convertObject(e, t) {
    return this.convertObjectMap(e.fields, t);
  }
  convertObjectMap(e, t = "none") {
    const n = {};
    return forEach(e, (e2, r) => {
      n[e2] = this.convertValue(r, t);
    }), n;
  }
  convertVectorValue(e) {
    const t = e.fields?.[Et].arrayValue?.values?.map((e2) => __PRIVATE_normalizeNumber(e2.doubleValue));
    return new VectorValue(t);
  }
  convertGeoPoint(e) {
    return new GeoPoint(__PRIVATE_normalizeNumber(e.latitude), __PRIVATE_normalizeNumber(e.longitude));
  }
  convertArray(e, t) {
    return (e.values || []).map((e2) => this.convertValue(e2, t));
  }
  convertServerTimestamp(e, t) {
    switch (t) {
      case "previous":
        const n = __PRIVATE_getPreviousValue(e);
        return n == null ? null : this.convertValue(n, t);
      case "estimate":
        return this.convertTimestamp(__PRIVATE_getLocalWriteTime(e));
      default:
        return null;
    }
  }
  convertTimestamp(e) {
    const t = __PRIVATE_normalizeTimestamp(e);
    return new Timestamp(t.seconds, t.nanos);
  }
  convertDocumentKey(e, t) {
    const n = ResourcePath.fromString(e);
    __PRIVATE_hardAssert(__PRIVATE_isValidResourceName(n), 9688, {
      name: e
    });
    const r = new DatabaseId(n.get(1), n.get(3)), i = new DocumentKey(n.popFirst(5));
    return r.isEqual(t) || __PRIVATE_logError(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`), i;
  }
}
function __PRIVATE_applyFirestoreDataConverter(e, t, n) {
  let r;
  return r = e ? n && (n.merge || n.mergeFields) ? e.toFirestore(t, n) : e.toFirestore(t) : t, r;
}
class SnapshotMetadata {
  constructor(e, t) {
    this.hasPendingWrites = e, this.fromCache = t;
  }
  isEqual(e) {
    return this.hasPendingWrites === e.hasPendingWrites && this.fromCache === e.fromCache;
  }
}

class DocumentSnapshot extends DocumentSnapshot$1 {
  constructor(e, t, n, r, i, s) {
    super(e, t, n, r, s), this._firestore = e, this._firestoreImpl = e, this.metadata = i;
  }
  exists() {
    return super.exists();
  }
  data(e = {}) {
    if (this._document) {
      if (this._converter) {
        const t = new QueryDocumentSnapshot(this._firestore, this._userDataWriter, this._key, this._document, this.metadata, null);
        return this._converter.fromFirestore(t, e);
      }
      return this._userDataWriter.convertValue(this._document.data.value, e.serverTimestamps);
    }
  }
  get(e, t = {}) {
    if (this._document) {
      const n = this._document.data.field(__PRIVATE_fieldPathFromArgument("DocumentSnapshot.get", e));
      if (n !== null)
        return this._userDataWriter.convertValue(n, t.serverTimestamps);
    }
  }
  toJSON() {
    if (this.metadata.hasPendingWrites)
      throw new FirestoreError(N.FAILED_PRECONDITION, "DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");
    const e = this._document, t = {};
    if (t.type = DocumentSnapshot._jsonSchemaVersion, t.bundle = "", t.bundleSource = "DocumentSnapshot", t.bundleName = this._key.toString(), !e || !e.isValidDocument() || !e.isFoundDocument())
      return t;
    this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields, "previous");
    return t.bundle = (this._firestore, this.ref.path, "NOT SUPPORTED"), t;
  }
}
DocumentSnapshot._jsonSchemaVersion = "firestore/documentSnapshot/1.0", DocumentSnapshot._jsonSchema = {
  type: property("string", DocumentSnapshot._jsonSchemaVersion),
  bundleSource: property("string", "DocumentSnapshot"),
  bundleName: property("string"),
  bundle: property("string")
};

class QueryDocumentSnapshot extends DocumentSnapshot {
  data(e = {}) {
    return super.data(e);
  }
}

class QuerySnapshot {
  constructor(e, t, n, r) {
    this._firestore = e, this._userDataWriter = t, this._snapshot = r, this.metadata = new SnapshotMetadata(r.hasPendingWrites, r.fromCache), this.query = n;
  }
  get docs() {
    const e = [];
    return this.forEach((t) => e.push(t)), e;
  }
  get size() {
    return this._snapshot.docs.size;
  }
  get empty() {
    return this.size === 0;
  }
  forEach(e, t) {
    this._snapshot.docs.forEach((n) => {
      e.call(t, new QueryDocumentSnapshot(this._firestore, this._userDataWriter, n.key, n, new SnapshotMetadata(this._snapshot.mutatedKeys.has(n.key), this._snapshot.fromCache), this.query.converter));
    });
  }
  docChanges(e = {}) {
    const t = !!e.includeMetadataChanges;
    if (t && this._snapshot.excludesMetadataChanges)
      throw new FirestoreError(N.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
    return this._cachedChanges && this._cachedChangesIncludeMetadataChanges === t || (this._cachedChanges = function __PRIVATE_changesFromSnapshot(e2, t2) {
      if (e2._snapshot.oldDocs.isEmpty()) {
        let t3 = 0;
        return e2._snapshot.docChanges.map((n) => {
          const r = new QueryDocumentSnapshot(e2._firestore, e2._userDataWriter, n.doc.key, n.doc, new SnapshotMetadata(e2._snapshot.mutatedKeys.has(n.doc.key), e2._snapshot.fromCache), e2.query.converter);
          return n.doc, {
            type: "added",
            doc: r,
            oldIndex: -1,
            newIndex: t3++
          };
        });
      }
      {
        let n = e2._snapshot.oldDocs;
        return e2._snapshot.docChanges.filter((e3) => t2 || e3.type !== 3).map((t3) => {
          const r = new QueryDocumentSnapshot(e2._firestore, e2._userDataWriter, t3.doc.key, t3.doc, new SnapshotMetadata(e2._snapshot.mutatedKeys.has(t3.doc.key), e2._snapshot.fromCache), e2.query.converter);
          let i = -1, s = -1;
          return t3.type !== 0 && (i = n.indexOf(t3.doc.key), n = n.delete(t3.doc.key)), t3.type !== 1 && (n = n.add(t3.doc), s = n.indexOf(t3.doc.key)), {
            type: __PRIVATE_resultChangeType(t3.type),
            doc: r,
            oldIndex: i,
            newIndex: s
          };
        });
      }
    }(this, t), this._cachedChangesIncludeMetadataChanges = t), this._cachedChanges;
  }
  toJSON() {
    if (this.metadata.hasPendingWrites)
      throw new FirestoreError(N.FAILED_PRECONDITION, "QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");
    const e = {};
    e.type = QuerySnapshot._jsonSchemaVersion, e.bundleSource = "QuerySnapshot", e.bundleName = __PRIVATE_AutoId.newId(), this._firestore._databaseId.database, this._firestore._databaseId.projectId;
    const t = [], n = [], r = [];
    return this.docs.forEach((e2) => {
      e2._document !== null && (t.push(e2._document), n.push(this._userDataWriter.convertObjectMap(e2._document.data.value.mapValue.fields, "previous")), r.push(e2.ref.path));
    }), e.bundle = (this._firestore, this.query._query, e.bundleName, "NOT SUPPORTED"), e;
  }
}
function __PRIVATE_resultChangeType(e) {
  switch (e) {
    case 0:
      return "added";
    case 2:
    case 3:
      return "modified";
    case 1:
      return "removed";
    default:
      return fail(61501, {
        type: e
      });
  }
}
QuerySnapshot._jsonSchemaVersion = "firestore/querySnapshot/1.0", QuerySnapshot._jsonSchema = {
  type: property("string", QuerySnapshot._jsonSchemaVersion),
  bundleSource: property("string", "QuerySnapshot"),
  bundleName: property("string"),
  bundle: property("string")
};

class __PRIVATE_ExpUserDataWriter extends AbstractUserDataWriter {
  constructor(e) {
    super(), this.firestore = e;
  }
  convertBytes(e) {
    return new Bytes(e);
  }
  convertReference(e) {
    const t = this.convertDocumentKey(e, this.firestore._databaseId);
    return new DocumentReference(this.firestore, null, t);
  }
}
function getDocs(e) {
  e = __PRIVATE_cast(e, Query);
  const t = __PRIVATE_cast(e.firestore, Firestore), n = ensureFirestoreConfigured(t), r = new __PRIVATE_ExpUserDataWriter(t);
  return __PRIVATE_validateHasExplicitOrderByForLimitToLast(e._query), __PRIVATE_firestoreClientGetDocumentsViaSnapshotListener(n, e._query).then((n2) => new QuerySnapshot(t, r, e, n2));
}
function updateDoc(e, t, n, ...r) {
  e = __PRIVATE_cast(e, DocumentReference);
  const i = __PRIVATE_cast(e.firestore, Firestore), s = __PRIVATE_newUserDataReader(i);
  let o;
  o = typeof (t = getModularInstance(t)) == "string" || t instanceof FieldPath ? __PRIVATE_parseUpdateVarargs(s, "updateDoc", e._key, t, n, r) : __PRIVATE_parseUpdateData(s, "updateDoc", e._key, t);
  return executeWrite(i, [o.toMutation(e._key, Precondition.exists(true))]);
}
function addDoc(e, t) {
  const n = __PRIVATE_cast(e.firestore, Firestore), r = doc(e), i = __PRIVATE_applyFirestoreDataConverter(e.converter, t);
  return executeWrite(n, [__PRIVATE_parseSetData(__PRIVATE_newUserDataReader(e.firestore), "addDoc", r._key, i, e.converter !== null, {}).toMutation(r._key, Precondition.exists(false))]).then(() => r);
}
function executeWrite(e, t) {
  return function __PRIVATE_firestoreClientWrite(e2, t2) {
    const n = new __PRIVATE_Deferred;
    return e2.asyncQueue.enqueueAndForget(async () => __PRIVATE_syncEngineWrite(await __PRIVATE_getSyncEngine(e2), t2, n)), n.promise;
  }(ensureFirestoreConfigured(e), t);
}
var En = new WeakMap;
(function __PRIVATE_registerFirestore(e, t = true) {
  (function __PRIVATE_setSDKVersion(e2) {
    x = e2;
  })(SDK_VERSION), _registerComponent(new Component("firestore", (e2, { instanceIdentifier: n, options: r }) => {
    const i = e2.getProvider("app").getImmediate(), s = new Firestore(new __PRIVATE_FirebaseAuthCredentialsProvider(e2.getProvider("auth-internal")), new __PRIVATE_FirebaseAppCheckTokenProvider(i, e2.getProvider("app-check-internal")), function __PRIVATE_databaseIdFromApp(e3, t2) {
      if (!Object.prototype.hasOwnProperty.apply(e3.options, ["projectId"]))
        throw new FirestoreError(N.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
      return new DatabaseId(e3.options.projectId, t2);
    }(i, n), i);
    return r = {
      useFetchStreams: t,
      ...r
    }, s._setSettings(r), s;
  }, "PUBLIC").setMultipleInstances(true)), registerVersion(F, M, e), registerVersion(F, M, "esm2020");
})();
// src/firebase/config.ts
var firebaseConfig = {
  apiKey: "__FIREBASE_API_KEY__",
  authDomain: "__FIREBASE_AUTH_DOMAIN__",
  projectId: "__FIREBASE_PROJECT_ID__",
  storageBucket: "__FIREBASE_STORAGE_BUCKET__",
  messagingSenderId: "__FIREBASE_MESSAGING_SENDER_ID__",
  appId: "__FIREBASE_APP_ID__",
  measurementId: "__FIREBASE_MEASUREMENT_ID__"
};

// src/firebase/leaderboard.ts
var app2 = initializeApp(firebaseConfig);
var db = getFirestore(app2);
function getDeviceId() {
  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    deviceId = "device_" + crypto.randomUUID();
    localStorage.setItem("deviceId", deviceId);
  }
  return deviceId;
}
var DEVICE_ID = getDeviceId();
async function fetchLeaderboard(difficulty) {
  const leaderboardList = document.getElementById("leaderboardList");
  if (!leaderboardList)
    return;
  leaderboardList.innerHTML = "<p>Loading...</p>";
  try {
    const scoresRef = collection(db, `leaderboard_${difficulty}`);
    const q2 = query(scoresRef, orderBy("time", "asc"), limit(10));
    const snapshot = await getDocs(q2);
    if (snapshot.empty) {
      leaderboardList.innerHTML = "<p>No scores yet. Be the first!</p>";
      return;
    }
    leaderboardList.innerHTML = "";
    let rank = 1;
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const item = document.createElement("div");
      item.className = "leaderboard-item";
      item.innerHTML = `
        <span class="rank">#${rank}</span>
        <span class="name">${data.name}</span>
        <span class="time">${data.time}s</span>
      `;
      leaderboardList.appendChild(item);
      rank++;
    });
  } catch (e) {
    console.error("Error fetching leaderboard:", e);
    leaderboardList.innerHTML = "<p>Error loading scores.</p>";
  }
}
async function submitScore(pendingScore, name3, onSuccess) {
  const collectionName = `leaderboard_${pendingScore.difficulty}`;
  try {
    const scoresRef = collection(db, collectionName);
    const q2 = query(scoresRef, orderBy("time", "asc"));
    const snapshot = await getDocs(q2);
    let existingDocId = null;
    let existingDocTime = Infinity;
    for (const docSnap of snapshot.docs) {
      if (docSnap.data().deviceId === DEVICE_ID) {
        existingDocId = docSnap.id;
        existingDocTime = docSnap.data().time;
        break;
      }
    }
    if (existingDocId) {
      if (pendingScore.time < existingDocTime) {
        const docToUpdate = doc(db, collectionName, existingDocId);
        await updateDoc(docToUpdate, {
          name: name3,
          time: pendingScore.time,
          timestamp: Date.now()
        });
      } else {
        const docToUpdate = doc(db, collectionName, existingDocId);
        await updateDoc(docToUpdate, { name: name3 });
      }
    } else {
      await addDoc(collection(db, collectionName), {
        deviceId: DEVICE_ID,
        name: name3,
        time: pendingScore.time,
        timestamp: Date.now()
      });
    }
    onSuccess();
  } catch (e) {
    console.error("Error submitting score:", e);
    alert("Failed to submit score. Please try again.");
  }
}

// src/game/SoundManager.ts
class SoundManager {
  ctx = null;
  enabled = true;
  constructor() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext;
    } catch (e) {
      console.warn("Web Audio API not supported");
    }
  }
  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
  isEnabled() {
    return this.enabled;
  }
  initCtx() {
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }
  playClick() {
    if (!this.enabled || !this.ctx)
      return;
    this.initCtx();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }
  playFlag() {
    if (!this.enabled || !this.ctx)
      return;
    this.initCtx();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.type = "triangle";
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }
  playExplosion() {
    if (!this.enabled || !this.ctx)
      return;
    this.initCtx();
    const duration = 0.5;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0;i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1000, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + duration);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();
  }
  playWin() {
    if (!this.enabled || !this.ctx)
      return;
    this.initCtx();
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      if (!this.ctx)
        return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = "sine";
      osc.frequency.value = freq;
      const startTime = now + i * 0.1;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);
      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  }
}

// src/game/Game.ts
class Game {
  levels = DIFFICULTY_LEVELS;
  gridEl;
  mineEl;
  hintEl;
  timerEl;
  diffSelect;
  customModal;
  customInputs;
  overlay;
  modal;
  modalTitle;
  modalText;
  bestEl;
  soundBtn;
  flagBtn;
  grid = [];
  R = 9;
  C = 9;
  M = 10;
  flags = 0;
  hints = HINTS_PER_GAME;
  started = false;
  gameOver = false;
  time = 0;
  timerInterval;
  startTime = 0;
  currentDiff = "easy";
  customConfig = null;
  isLeftDown = false;
  isRightDown = false;
  soundManager;
  flagMode = false;
  themeBtn;
  constructor() {
    this.soundManager = new SoundManager;
    this.gridEl = document.getElementById("grid");
    this.mineEl = document.getElementById("mineCount");
    this.hintEl = document.getElementById("hintBtn");
    this.timerEl = document.getElementById("timer");
    this.diffSelect = document.getElementById("difficulty");
    this.customModal = document.getElementById("customModalOverlay");
    this.customInputs = {
      r: document.getElementById("customR"),
      c: document.getElementById("customC"),
      m: document.getElementById("customM")
    };
    this.overlay = document.getElementById("overlay");
    this.modal = this.overlay.querySelector(".modal");
    this.modalTitle = document.getElementById("modalTitle");
    this.modalText = document.getElementById("modalText");
    this.bestEl = document.getElementById("best");
    this.soundBtn = document.getElementById("soundBtn");
    this.flagBtn = document.getElementById("flagBtn");
    this.themeBtn = document.getElementById("themeBtn");
    this.loadTheme();
    this.updateBest();
    this.restart();
    this.setupGlobalEvents();
  }
  toggleSound() {
    const enabled = this.soundManager.toggle();
    this.soundBtn.innerText = enabled ? "\uD83D\uDD0A" : "\uD83D\uDD07";
  }
  toggleFlagMode() {
    this.flagMode = !this.flagMode;
    this.flagBtn.classList.toggle("active", this.flagMode);
    this.soundManager.playClick();
  }
  setupGlobalEvents() {
    document.addEventListener("mousedown", (e) => {
      if (e.button === 0)
        this.isLeftDown = true;
      if (e.button === 2)
        this.isRightDown = true;
    });
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    document.addEventListener("mouseup", () => {
      this.isLeftDown = false;
      this.isRightDown = false;
    });
    document.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT")
        return;
      switch (e.key.toLowerCase()) {
        case "r":
          this.restart();
          break;
        case "h":
          this.useHint();
          break;
        case "t":
          this.handleTheme();
          break;
        case "m":
          this.toggleSound();
          break;
      }
    });
  }
  loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || !savedTheme) {
      document.body.classList.add("dark");
      if (!savedTheme)
        localStorage.setItem("theme", "dark");
    }
    this.updateThemeBtn();
  }
  handleTheme() {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    this.updateThemeBtn();
  }
  updateThemeBtn() {
    const isDark = document.body.classList.contains("dark");
    this.themeBtn.innerText = isDark ? "White \uD83C\uDF15" : "Dark \uD83C\uDF11";
  }
  restart() {
    this.stopTimer();
    this.overlay.style.display = "none";
    this.overlay.classList.remove("visible");
    this.modal.classList.remove("win", "lose");
    this.started = false;
    this.gameOver = false;
    this.time = 0;
    this.timerEl.innerText = "00:00";
    const diff = this.diffSelect.value;
    if (diff === "custom") {
      if (!this.customConfig) {
        this.customModal.classList.add("visible");
        this.customModal.style.display = "flex";
        return;
      }
      this.R = this.customConfig.r;
      this.C = this.customConfig.c;
      this.M = this.customConfig.m;
    } else {
      this.customConfig = null;
      this.currentDiff = diff;
      const level = this.levels[diff];
      this.R = level.r;
      this.C = level.c;
      this.M = level.m;
    }
    this.flags = 0;
    this.flagMode = false;
    this.flagBtn.classList.remove("active");
    this.hints = HINTS_PER_GAME;
    this.updateMineCount();
    this.updateHintCount();
    this.grid = [];
    this.gridEl.innerHTML = "";
    this.gridEl.style.gridTemplateColumns = `repeat(${this.C}, auto)`;
    for (let r = 0;r < this.R; r++) {
      this.grid[r] = [];
      for (let c = 0;c < this.C; c++) {
        const el = document.createElement("div");
        el.className = "cell";
        const cell = new Cell(r, c, el);
        el.addEventListener("mousedown", (e) => {
          if (e.button === 0) {
            if (this.flagMode) {
              this.toggleFlag(cell);
            } else {
              this.handleClick(cell);
            }
          } else if (e.button === 2) {
            e.preventDefault();
            this.toggleFlag(cell);
          }
        });
        el.addEventListener("mouseenter", () => {
          if (this.isLeftDown) {
            if (!this.flagMode)
              this.handleClick(cell);
          } else if (this.isRightDown) {
            if (!cell.revealed && !cell.flagged) {
              this.toggleFlag(cell);
            }
          }
        });
        let pressTimer;
        el.addEventListener("touchstart", (e) => {
          if (this.flagMode) {
            e.preventDefault();
            this.toggleFlag(cell);
            return;
          }
          pressTimer = setTimeout(() => {
            this.toggleFlag(cell);
            navigator.vibrate?.(50);
          }, 500);
        }, { passive: false });
        el.addEventListener("touchend", (e) => {
          clearTimeout(pressTimer);
          if (this.flagMode)
            return;
        });
        this.gridEl.appendChild(el);
        this.grid[r][c] = cell;
      }
    }
    this.updateBest();
  }
  updateMineCount() {
    this.mineEl.innerHTML = `\uD83D\uDCA3 ${this.M - this.flags}`;
  }
  updateHintCount() {
    this.hintEl.innerText = `\uD83D\uDCA1 ${this.hints}`;
    this.hintEl.disabled = this.hints === 0 || this.gameOver;
  }
  useHint() {
    if (this.gameOver || this.hints <= 0 || !this.started)
      return;
    const safeCells = [];
    for (let r = 0;r < this.R; r++) {
      for (let c = 0;c < this.C; c++) {
        const cell = this.grid[r][c];
        if (!cell.mine && !cell.revealed && !cell.flagged) {
          safeCells.push(cell);
        }
      }
    }
    if (safeCells.length > 0) {
      const randomCell = safeCells[Math.floor(Math.random() * safeCells.length)];
      this.reveal(randomCell);
      randomCell.el.style.transition = "background-color 0.5s";
      randomCell.el.style.backgroundColor = "#fbbf24";
      setTimeout(() => {
        randomCell.el.style.backgroundColor = "";
      }, 500);
      this.hints--;
      this.updateHintCount();
    }
  }
  applyCustom() {
    const r = parseInt(this.customInputs.r.value);
    const c = parseInt(this.customInputs.c.value);
    const m = parseInt(this.customInputs.m.value);
    if (r < 5 || c < 5 || m < 1)
      return;
    if (m >= r * c) {
      alert("Too many mines!");
      return;
    }
    this.customConfig = { r, c, m };
    this.customModal.style.display = "none";
    this.customModal.classList.remove("visible");
    this.restart();
  }
  cancelCustom() {
    this.customModal.style.display = "none";
    this.customModal.classList.remove("visible");
    this.diffSelect.value = this.currentDiff;
    this.restart();
  }
  startTimer() {
    this.startTime = Date.now();
    this.timerInterval = setInterval(() => {
      const delta = Math.floor((Date.now() - this.startTime) / 1000);
      this.time = delta;
      const m = Math.floor(delta / 60).toString().padStart(2, "0");
      const s = (delta % 60).toString().padStart(2, "0");
      this.timerEl.innerText = `${m}:${s}`;
    }, 1000);
  }
  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
  placeMines(safeCell) {
    let placed = 0;
    while (placed < this.M) {
      const r = Math.floor(Math.random() * this.R);
      const c = Math.floor(Math.random() * this.C);
      const cell = this.grid[r][c];
      const distR = Math.abs(r - safeCell.r);
      const distC = Math.abs(c - safeCell.c);
      const isSafeZone = distR <= 1 && distC <= 1;
      if (!cell.mine && !isSafeZone) {
        cell.mine = true;
        placed++;
      }
    }
  }
  handleClick(cell) {
    if (this.gameOver || cell.flagged)
      return;
    if (cell.revealed) {
      this.tryChord(cell);
      return;
    }
    if (!this.started) {
      this.started = true;
      this.placeMines(cell);
      this.startTimer();
    }
    this.reveal(cell);
    this.soundManager.playClick();
  }
  toggleFlag(cell) {
    if (this.gameOver || cell.revealed || !this.started)
      return;
    cell.flagged = !cell.flagged;
    cell.el.classList.toggle("flagged");
    cell.el.textContent = cell.flagged ? "\uD83D\uDEA9" : "";
    this.flags += cell.flagged ? 1 : -1;
    this.updateMineCount();
    this.soundManager.playFlag();
  }
  reveal(cell) {
    if (cell.revealed || cell.flagged)
      return;
    cell.revealed = true;
    cell.el.classList.add("revealed");
    if (cell.mine) {
      this.endGame(false, cell);
      return;
    }
    const count = this.countMines(cell);
    if (count > 0) {
      cell.el.textContent = count.toString();
      cell.el.classList.add(`n${count}`);
    } else {
      this.getNeighbors(cell).forEach((n) => this.reveal(n));
    }
    this.checkWin();
  }
  tryChord(cell) {
    if (!cell.revealed)
      return;
    const count = this.countMines(cell);
    const neighbors = this.getNeighbors(cell);
    const flaggedCount = neighbors.filter((n) => n.flagged).length;
    if (count === flaggedCount) {
      neighbors.forEach((n) => {
        if (!n.flagged && !n.revealed) {
          this.reveal(n);
        }
      });
    }
  }
  countMines(cell) {
    return this.getNeighbors(cell).filter((n) => n.mine).length;
  }
  getNeighbors(cell) {
    const neighbors = [];
    for (let dr = -1;dr <= 1; dr++) {
      for (let dc = -1;dc <= 1; dc++) {
        if (dr === 0 && dc === 0)
          continue;
        const r = cell.r + dr;
        const c = cell.c + dc;
        if (r >= 0 && r < this.R && c >= 0 && c < this.C) {
          neighbors.push(this.grid[r][c]);
        }
      }
    }
    return neighbors;
  }
  checkWin() {
    if (this.gameOver)
      return;
    const totalCells = this.R * this.C;
    const revealedCount = this.grid.flat().filter((c) => c.revealed).length;
    if (revealedCount === totalCells - this.M) {
      this.endGame(true);
    }
  }
  async endGame(win, triggerCell) {
    this.gameOver = true;
    this.stopTimer();
    if (win) {
      this.soundManager.playWin();
      await this.flagMinesCascade();
    } else {
      this.soundManager.playExplosion();
      await this.revealMinesCascade(triggerCell);
    }
    if (win) {
      const currentDiff = this.diffSelect.value;
      const savedBest = localStorage.getItem("best-" + currentDiff);
      if (!savedBest || this.time < parseInt(savedBest)) {
        localStorage.setItem("best-" + currentDiff, this.time.toString());
      }
      let submittedName;
      if (["easy", "medium", "hard"].includes(currentDiff)) {
        const savedName = localStorage.getItem("playerName");
        if (savedName) {
          this.autoSubmitScore(savedName);
          submittedName = savedName;
        } else {
          this.showNameModal();
          return;
        }
      }
      this.showModal(true, submittedName);
    } else {
      this.showModal(false);
    }
    this.updateBest();
  }
  autoSubmitScore(name3) {
    const pendingScore = {
      time: this.time,
      difficulty: this.diffSelect.value
    };
    submitScore(pendingScore, name3, () => {});
  }
  async revealMinesCascade(triggerCell) {
    if (triggerCell) {
      triggerCell.el.classList.add("mine", "mine-trigger", "pop");
      triggerCell.el.textContent = "\uD83D\uDCA3";
    }
    const mines = this.grid.flat().filter((c) => c.mine && c !== triggerCell && !c.flagged);
    const wrongFlags = this.grid.flat().filter((c) => !c.mine && c.flagged);
    if (mines.length > 0) {
      const delay = Math.min(50, 1000 / mines.length);
      for (const cell of mines) {
        await new Promise((r) => setTimeout(r, delay));
        cell.el.classList.add("mine", "pop");
        cell.el.textContent = "\uD83D\uDCA3";
      }
    }
    wrongFlags.forEach((c) => c.el.classList.add("wrong-flag"));
    await new Promise((r) => setTimeout(r, 500));
  }
  async flagMinesCascade() {
    const unflaggedMines = this.grid.flat().filter((c) => c.mine && !c.flagged);
    if (unflaggedMines.length > 0) {
      const delay = Math.min(50, 1000 / unflaggedMines.length);
      for (const cell of unflaggedMines) {
        await new Promise((r) => setTimeout(r, delay));
        cell.flagged = true;
        cell.el.classList.add("flagged", "pop");
        cell.el.textContent = "\uD83D\uDEA9";
        this.soundManager.playFlag();
      }
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  showModal(win, submittedName) {
    this.modalTitle.textContent = win ? "You Won! \uD83C\uDF89" : "Game Over \uD83D\uDCA5";
    if (win) {
      let text = `Completed in ${this.timerEl.innerText}`;
      if (submittedName) {
        text += `
(Score submitted as ${submittedName})`;
      }
      this.modalText.innerText = text;
    } else {
      this.modalText.textContent = "Better luck next time!";
    }
    this.modal.className = `modal ${win ? "win" : "lose"}`;
    this.overlay.style.display = "flex";
    this.overlay.offsetHeight;
    this.overlay.classList.add("visible");
  }
  showNameModal() {
    const overlay = document.getElementById("nameModalOverlay");
    overlay.style.display = "flex";
    overlay.classList.add("visible");
    const input = document.getElementById("playerName");
    input.value = localStorage.getItem("playerName") || "";
    input.focus();
  }
  submitScoreHandler() {
    const nameInput = document.getElementById("playerName");
    const name3 = nameInput.value.trim() || "Anonymous";
    localStorage.setItem("playerName", name3);
    const pendingScore = {
      time: this.time,
      difficulty: this.diffSelect.value
    };
    submitScore(pendingScore, name3, () => {
      this.closeNameModal();
      this.showModal(true, name3);
    });
  }
  closeNameModal() {
    const overlay = document.getElementById("nameModalOverlay");
    overlay.style.display = "none";
    overlay.classList.remove("visible");
  }
  showLeaderboardHandler() {
    const overlay = document.getElementById("leaderboardOverlay");
    overlay.style.display = "flex";
    overlay.classList.add("visible");
    fetchLeaderboard("easy");
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.onclick = () => {
        document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        fetchLeaderboard(btn.dataset.diff || "easy");
      };
    });
  }
  closeLeaderboard() {
    const overlay = document.getElementById("leaderboardOverlay");
    overlay.style.display = "none";
    overlay.classList.remove("visible");
  }
  closeModal() {
    this.overlay.style.display = "none";
    this.overlay.classList.remove("visible");
  }
  updateBest() {
    const diff = this.diffSelect.value;
    const best = localStorage.getItem("best-" + diff);
    this.bestEl.textContent = best ? `\uD83C\uDFC6 Best: ${best}s` : "";
  }
}

// src/main.ts
var game = new Game;
window.restartGame = () => game.restart();
window.toggleTheme = () => game.handleTheme();
window.useHint = () => game.useHint();
window.applyCustom = () => game.applyCustom();
window.cancelCustom = () => game.cancelCustom();
window.showLeaderboard = () => game.showLeaderboardHandler();
window.closeLeaderboard = () => game.closeLeaderboard();
window.submitScore = () => game.submitScoreHandler();
window.closeNameModal = () => game.closeNameModal();
window.closeModal = () => game.closeModal();
window.toggleSound = () => game.toggleSound();
window.toggleFlagMode = () => game.toggleFlagMode();
document.getElementById("difficulty")?.addEventListener("change", () => game.restart());
