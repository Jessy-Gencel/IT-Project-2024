import { Base64 } from "js-base64";

// TODO: DO NOT USE BASE64
function encrypt(password) {
  return Base64.encode(password);
}

export default encrypt;
