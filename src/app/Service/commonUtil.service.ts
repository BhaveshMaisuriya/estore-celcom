import { Injectable } from '@angular/core';
import * as crypto from 'asymmetric-crypto';

export interface iValidationError {
  error: boolean;
  message: string;
}

@Injectable({
  'providedIn': 'root'
})
export class CommonUtilService {
  public RoundingOff2Number(value: number): number {
    return parseFloat(this.RoundingOff2String(value));
  }

  public RoundingOff2String(value: number): string {
    let totalAmtinDecimal = 0;
    const factor = Math.pow(10, 2);
    let amount2RoundOff = (Math.round(value * factor) / factor).toString();

    amount2RoundOff = amount2RoundOff.indexOf(".") === -1 ? amount2RoundOff + ".00" : amount2RoundOff;
    amount2RoundOff = amount2RoundOff.split(".")[1].length === 1 ? amount2RoundOff + "0" : amount2RoundOff;

    /*

    rounding function enable and disable for decimal part

    switch (amount2RoundOff.toString().slice(-1)) {
      case '1':
      case '2':
        amount2RoundOff = amount2RoundOff.toString().slice(0, -1).concat('0');
        break;
      case '3':
      case '4':
      case '6':
      case '7':
        amount2RoundOff = amount2RoundOff.toString().slice(0, -1).concat('5');
        break;
      case '8':
        totalAmtinDecimal = parseFloat(amount2RoundOff) + 0.02;
        amount2RoundOff = (Math.round(totalAmtinDecimal * factor) / factor).toString();
        break;
      case '9':
        totalAmtinDecimal = parseFloat(amount2RoundOff) + 0.01;
        amount2RoundOff = (Math.round(totalAmtinDecimal * factor) / factor).toString();
        break;
      default:
        break;
    }

    */

    const amountchk = amount2RoundOff.split(".");

    if (amountchk.length === 1) {
      // No decimal point, need to add decimal point.
      amountchk.push("00");
    } else if (amountchk[1].length === 1) {
      // There is decimal point, but need to make sure the precision is proper.
      amountchk[1] = amountchk[1] + "0";
    }
    amount2RoundOff = amountchk.join(".");
    return amount2RoundOff;
  }

  getPadding(charToPad: string, numberOfPad: number) {
    let returnValue = "";
    let index = numberOfPad;
    while (index > 0) {
      returnValue += charToPad;
      index--;
    }
    return returnValue;
  }

  capturingDOBFromNRIC(NRIC) {
    let customerDOB = null;
    const DOB = NRIC.slice(0, 6);
    let birthYear = DOB.slice(0, 2);
    const currentYear = new Date().getFullYear().toString().slice(2, 4);
    if (birthYear > currentYear) {
      birthYear = "19" + birthYear;
    } else {
      birthYear = "20" + birthYear;
    }
    customerDOB = birthYear + DOB.slice(2, 6);
    return customerDOB;
  }
  getCurrentDateForOrderCreate() {
    const Dat = new Date();
    let dateToSend = "";
    const year = Dat.getFullYear().toString();
    const month = (((Dat.getMonth() + 1) < 10 ? "0" : "") + (Dat.getMonth() + 1)).toString();
    const day = ((Dat.getDate() < 10 ? "0" : "") + Dat.getDate()).toString();
    const hr = Dat.getHours().toString();
    const min = Dat.getMinutes().toString();
    const sec = Dat.getSeconds().toString();
    dateToSend = dateToSend.concat(year, month, day, "_", hr, min, sec);
    return dateToSend;
  }
  getDOBForOrderCreate(DOB: string) {
    DOB = DOB.substring(0, DOB.indexOf('_'));
    const year = DOB.slice(0, 4);
    const month = DOB.slice(4, 6).toString();
    const day = DOB.slice(6, 8).toString();
    let newDOB = "";
    newDOB = newDOB.concat(month, "/", day, "/", year);
    return newDOB;
  }
  getTransDateForOrderCreate() {
    const Dat = new Date();
    let dateToSend = "";
    const year = Dat.getFullYear().toString();
    const month = (((Dat.getMonth() + 1) < 10 ? "0" : "") + (Dat.getMonth() + 1)).toString();
    const day = ((Dat.getDate() < 10 ? "0" : "") + Dat.getDate()).toString();
    const hr = ((Dat.getHours() < 10 ? "0" : "") + Dat.getHours()).toString();
    const min = ((Dat.getMinutes() < 10 ? "0" : "") + Dat.getMinutes()).toString();
    const sec = ((Dat.getSeconds() < 10 ? "0" : "") + Dat.getSeconds()).toString();
    dateToSend = year + "-" + month + "-" + day + "T" + hr + ":" + min + ":" + sec;
    return dateToSend;
  }
  encrypter(valueToEncrypt) {
    return crypto.encrypt(valueToEncrypt, "zYjEPND9exnJ0syl5cSehM1Qx3jfg1NhGRE8adQ1VZk=" ,
    "bfQyuE1aNBXmJhgJWAvv21bye7Com1/12iIaB4wWU0O6FZg7TkSNE8CoFaEi9bXHjZLinkYSXC5turWBO8TnNw==");
  }
  public restrictOnlyNum = (ev, elem, testVal) => {
    const k = ev.keyCode || ev.which;
    const key = ev.key;
    const pattern = /^[0-9]*$/;
    const alphanumeric = /^[a-zA-Z0-9]*$/;
    const validPattern = pattern.test(key);
    const validAlphanumeric = alphanumeric.test(key);
    if (k === 8 || (k > 36 && k < 41) || k === 9) {
      return true;
    } else {
      switch (elem) {
        case "tentera":
          return validAlphanumeric
        case "alternateMsisdn":
        case "contactMobileNum":
        case "nric":
          return validPattern ? (testVal.length < 12) : false
          break;
        case "postalcode":
          return validPattern ? (testVal.length < 5) : false
          break;      
        default:
          break;
      }
    }
  }
  validationForIdType(identity_type, identity_value): iValidationError {
    let error = false;
    let message = "";
    let idValue = "";
    if (identity_value !== null) {
      idValue = identity_value.toString();
    }
    if (identity_type == "1") {
      if ((idValue + '').length < 1) {
        error = true;
        message = "Please enter a value";
        return {error, message}
      }

      let pattern = /^\d+$/;
      if (!pattern.test(idValue)) {
        message = "Please enter digits only";
        error = true;
        return {error, message}
      }

      pattern = /^[0-9]{12}$/;
      if (!pattern.test(idValue)) {
        error = true;
        message = "Please enter a valid New NRIC ID of 12 digit";
        return {error, message}
      }

      if (idValue.length === 12) {
        const DoB = idValue.slice(0, 6);
        const year: any = idValue.slice(0, 2);
        const month: any = idValue.slice(2, 4);
        const day: any = idValue.slice(4, 6);
        const fullDOB = new Date(year, month - 1, day);
        const monthTxtLength = ((fullDOB.getMonth() + 1).toString().length < 2);
        const dateTxtlength = (fullDOB.getDate().toString().length < 2);
        const convertedMonth = monthTxtLength ? ("0" + (fullDOB.getMonth() + 1).toString()) : (fullDOB.getMonth() + 1).toString();
        const convertedDay = dateTxtlength ? ("0" + fullDOB.getDate().toString()) : fullDOB.getDate().toString();
        const convertedDOB = "" + fullDOB.getFullYear().toString().slice(2, 4) + convertedMonth + convertedDay;
        if (DoB !== convertedDOB) {
          error = true;
          message = "Please enter a valid NRIC number";
          return {error, message}
        }
      }
    }
    return {error, message}
  }
}
