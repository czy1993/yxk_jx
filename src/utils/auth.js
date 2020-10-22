export function getToken() {
  return window.localStorage.getItem("token");
}

export function setToken(token) {
  window.localStorage.setItem("token", token);
}

export function removeToken() {
  return new Promise((resolve, reject) => {
    window.localStorage.removeItem("token");
    resolve();
  });
}

export function setAccountInfo(data) {
  window.localStorage.setItem(
    "accountInfo",
    JSON.stringify(data)
  );
}

export function getAccountInfo() {
  return JSON.parse(window.localStorage.getItem("accountInfo"));
}

export function removeAccountInfo(){
  return new Promise((resolve, reject) => {
    window.localStorage.removeItem("accountInfo");
    resolve();
  });
}
