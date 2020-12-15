import { AbstractControl } from '@angular/forms';
import { SYS_DOWN_MSG } from '../constants/error.constants';
import { FORM_VALIDATION_ERROR, FORM_VALIDATION_PATTERN } from '../constants/form.constants';
import { iOmniCampaign } from '../models/plan.model';

export const msisdnHelper = (msisdn) => {
  while (msisdn.charAt(0) === '6') {
    msisdn = msisdn.substr(1);
  }
  return msisdn;
};

export const detectQueryString = (url) => {
  const pattern = new RegExp(/\?.+=.*/g);
  return pattern.test(url);
}

export const addressValidationHelper = (event) => {
  const k = event.keyCode || event.which;
  const z = event.charCode;
  const charStr = String.fromCharCode(k);
  if ((k > 64 && k < 91) || (k >= 48 && k <= 57) || (k > 96 && k < 123) ||
    charStr === "-" || charStr === "#" || charStr === "/" || charStr === "@" || charStr === "," ||charStr === "." ||
    k === 8 || k === 16 || k === 13 || k === 17 || k === 32 || k === 0 || z === 0) {
    return true;
  } else {
    return false;
  }
}

export const postalCodeValidationHelper = (event) => {
  const key = event.keyCode || event.which;
  const z = event.charCode;
  if ((key > 47 && key < 58) || key === 8 || key === 0 || key === 13 || key === 16 || key === 17 || (z === 0 && key !== 69 && key !== 190)) {
    return true;
  } else {
    return false;
  }
}

export const cityValidationHelper = (event) => {
  const citykey = event.keyCode || event.which;
  const z = event.charCode;
  if ((citykey > 64 && citykey < 91) || (citykey > 96 && citykey < 123) ||
    citykey === 8 || citykey === 0 || citykey === 13 || citykey === 16 ||
    citykey === 17 || citykey === 32 || z === 0) {
    return true;
  } else {
    return false;
  }
}

export const getCOBPErrorFromResponse = (response) => {
  let message = null;
  try {
    if (!response?.status) {
      message = response['status']['response'] | response['status']['message'];
    }
  } catch (_error) {

  }

  try {
    for (let key of Object.keys(response)) {
      const item = response[key];
      console.log({ key, item })
      if (item) {
        if (key != 'upfront_payment' && key != 'penaltyCheck') {
          // This list is item with exception = true
          const exception_list = [
            'callBaring',
            'whitelist',
            'blackList',
            'openOrder',
            'productEligibility',
          ];
          // This list is item with exception = false
          const status_list = [
            'openOrder',
            'blackList',
            'productEligibility',
            'customer_eligibility',
            'account_validation',
            'contract_check',
            'prepost_check',
            'duration_check',
            'moon_eligibility',
            'star_eligibility',
          ];
          if (exception_list.includes(key) && typeof item['exception'] !== undefined && item['exception'] + '' === 'true') {
            message = item['message'];
            break;
          }
          if (status_list.includes(key) && typeof item['status'] !== undefined && item['status'] + '' === 'false') {
            if (key == 'blackList')
              message = SYS_DOWN_MSG;
            message = item['message'];
            break;
          }
        }
      }
    }
  } catch (_error) {

  }

  return message;
}

export function isNullOrUndefined<T>(obj: T | null | undefined): obj is null | undefined {
  return typeof obj === "undefined" || obj === null;
}

export function updateAnalytics(key, value) {
  try {
    (<any>window).digitalData = {
      ...(<any>window).digitalData,
      [key]: value
    }
  } catch (_error) {
  }
}

export function getPager(totalItems: number, currentPage: number = 1, pageSize: number = 8) {
  const totalPages = Math.ceil(totalItems / pageSize);
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }
  let startPage: number, endPage: number;
  if (totalPages <= 3) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 1) {
      startPage = 1;
      endPage = 3;
    } else if (currentPage + 1 >= totalPages) {
      startPage = totalPages - 2;
      endPage = totalPages;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }
  }
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
  return {
    totalItems: totalItems,
    currentPage: currentPage,
    pageSize: pageSize,
    totalPages: totalPages,
    startPage: startPage,
    endPage: endPage,
    startIndex: startIndex,
    endIndex: endIndex,
    pages: pages
  };
}

export function truncateString(input, length = 20) {
  if (input.length > length)
     return input.substring(0,length) + '...';
  else
     return input;
}

export function getYearAndMonth(strEffectiveEndDate: string) {
  const dtEffectiveEndDate = new Date(parseInt(strEffectiveEndDate.slice(0, 4), 10),
    parseInt(strEffectiveEndDate.slice(4, 6), 10) - 1, parseInt(strEffectiveEndDate.slice(6), 10));
  let months = monthDiff(new Date(), dtEffectiveEndDate);
  const noOfYears = parseInt('' + (months / 12), 10);
  months -= noOfYears * 12;
  return [noOfYears, months];
}

export function monthDiff(d1, d2): number {
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth() + 1;
  months += d2.getMonth();
  months += (d2.getDate() < d1.getDate() ? 0 : 1);
  return months <= 0 ? 0 : months;
}

export function formatPhoneNumber(val) {
  let value = val;
  const resultData = value.toString().charAt(0);
  // value = (resultData !== '6') ? ("60" + value).substring(0,3) === "600" ? "6" + value : "60" + value : value;
  if (resultData !== '6') {
    if (("60" + value).substring(0,3) === "600") {
      value = "6" + value;
    } else {
      value = "60" + value;
    }
  }
  return value;
}

export function removeHTMLTags(input: string): string {
  return input?.replace(/(<([^>]+)>)/gi, "").trim() ?? "";
}

export function CLMOmniDataSanitizer(data: iOmniCampaign) {
  let newData = {
    ...data
  };

  if (newData) {
    newData = {
      ...newData,
      device_bundle_price: +newData.device_bundle_price || 0,
      device_retail_price: +newData.device_retail_price || 0,
      device_disc_amt: +newData.device_disc_amt || 0,
      rebate_amount: +newData.rebate_amount || 0,
      rebate_frequency: +newData.rebate_frequency || 0,
    };
  }
  return newData;
}


export function createHTMLFromText(str) {
  return new DOMParser().parseFromString(str, "text/html");
}

export function isHTML(str) {
  const doc = createHTMLFromText(str);
  return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
}

export function appendPlanTitle(str, new_text) {
  if (isHTML(str)) {
    try {
      const doc = createHTMLFromText(str);
      const original_title = doc.querySelector('.col').innerHTML;
      doc.querySelector('.col').innerHTML = `${new_text} ${original_title}`;
      return doc.body.innerHTML;
    } catch (_error) {
    }
  }
  return `${new_text} ${str}`;
}

export function customValidatorAddress(control: AbstractControl): { [key: string]: string } | null {
  if (!control.value) { return; }
  if (!control.value.match(FORM_VALIDATION_PATTERN.address)) {
    return { 'custom': FORM_VALIDATION_ERROR.address };
  }
  return null;
}

export function customValidatorAddressLine(control: AbstractControl): { [key: string]: string } | null {
  if (!control.value) { return; }
  if (!control.value.match(FORM_VALIDATION_PATTERN.addressLine)) {
    return { 'custom': FORM_VALIDATION_ERROR.addressLine };
  }
  return null;
}

export function generateNumberRange(min = 0, max = 10) {
  let numbers = [];
  if (min < max) {
    for(let i = min; i <= max; i++) {
      numbers.push(i);
    }
    return numbers;
  }
  return [min, max];
}