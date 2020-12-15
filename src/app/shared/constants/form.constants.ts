// messages
export const PRODUCT_CHECKING_STOCK_MSG = 'Checking stock...';
export const PRODUCT_IN_STOCK_MSG = "In Stock";
export const PRODUCT_OUT_OF_STOCK_MSG = "Out of Stock";
// Shipping address
export const RESIDENCE_TYPE_MSG = "Please select residence type";
export const ADDRESS_MSG = "Please enter address";
export const VALID_ADDRESS_MSG = "Please enter valid address";
export const STREET_MSG = "Please enter address details";
export const VALID_STREET_MSG = "Please enter valid address details";
export const POSTAL_MSG = "Please enter postcode";
export const VALID_POSTAL_MSG = "Please enter valid postcode";
export const CITY_MSG = "Please enter city";
export const VALID_CITY_MSG = "Please enter valid city";
export const STATE_MSG = "Please select state";

export const OTP_RESEND_MSG = "Please enter valid OTP or click Resend OTP";
export const ENTER_VALUE_MSG = "Please enter a value";
export const VALID_MOBILE_NUM_MSG = "Please enter a valid Mobile Number";
export const LOCATION_TYPE = [
    { display: "Landed", value: "Landed" },
    { display: "Highrise", value: "High-Rise" }
  ];

export const ITEM_ALREADY_IN_CART = "Note: You can only add another item after you have checked out with your existing items in the cart.";

// ! Also sync the changes in
// ! choose-address.component.ts:498 and helper.utility.ts:21
export const FORM_VALIDATION_PATTERN = {
  name: /^[a-zA-Z0-9@'/]+(\s+[a-zA-Z0-9@'/-]+)+$/,
  address: /^[ A-Za-z0-9#&/,.-]*$/,
  addressLine: /^[ A-Za-z0-9-/@#,.]*$/,
  phone: /[0-9]{10}/,
  nric: /^\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])\d{6}$/
} as const;


export const FORM_VALIDATION_ERROR = {
  name: `Special characters are not allowed except for /, ' and @`,
  address: `Special characters are not allowed except for &, /, #, ., - and ,`,
  addressLine: `Special characters are not allowed except for -, /, @, and #`,
} as const;

export const FORM_REQUIRED_ERROR = {
  name: `Please enter your name`,
  address: `Please enter address`,
  addressLine: `Please enter address`,
} as const;

export const DEFAULT_SIEBEL_ADDRESS = `82, Jalan Raja Muda Abdul Aziz`;
