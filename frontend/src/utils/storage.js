// const nulla = {
//   employee_name: "",
//   employee_last_name: "",
//   garage_name: ""
// };

export function getFromStorage(key) {
  if (!key) {
    return null;
  }

  try {
    const valueStr = localStorage.getItem(key);

    if (valueStr) {
      return JSON.parse(valueStr);
    }
    return { success: false };
  } catch (err) {
    console.log("error on getFromStorage", err);
    return null;
  }
}

export function setInStorage(key, obj) {
  if (!key) {
    console.log("Error: Key is missing");
  }

  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    console.error(err);
  }
}

export function removeInStorage(key) {
  console.log("entro al removeKey");
  if (!key) return false;

  try {
    const success = localStorage.removeItem(key);

    if (success) return true;
    return false;
  } catch (err) {
    console.err(err);
    return false;
  }
}
