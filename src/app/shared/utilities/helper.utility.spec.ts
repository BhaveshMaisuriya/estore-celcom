import {
    msisdnHelper,
    detectQueryString,
    addressValidationHelper,
    postalCodeValidationHelper,
    cityValidationHelper,
    getCOBPErrorFromResponse,
    updateAnalytics,
    getPager,
    truncateString,
    getYearAndMonth,
    monthDiff,
    removeHTMLTags,
    CLMOmniDataSanitizer,
    formatPhoneNumber
} from "./helper.ultility";
import { isNullOrUndefined } from 'util';
import { iOmniCampaign } from '../models/plan.model';

describe("HelperUtility", () => {
    it("should remove the msisdn prefix, if starts with 6", () => {
        const msisdn = "62345603392";
        const updatedMSISDN = msisdnHelper(msisdn);
        expect(updatedMSISDN).toBe("2345603392");
    });

    it("should detect the url with query string and return true", () => {
        const url = "test/url/?id=1";
        const result = detectQueryString(url);
        expect(result).toBeTrue();
    });

    it("should detect the url without query string and return false", () => {
        const url = "test/url";
        const result = detectQueryString(url);
        expect(result).toBeFalse();
    });

    it("addressValidationHelper should return true", () => {
        let event = {
            which: 88,
            charCode: 0
        };
        let result = addressValidationHelper(event);
        expect(result).toBeTrue();

        event = {
            which: 92,
            charCode: 0
        };
        result = addressValidationHelper(event);
        expect(result).toBeTrue();


        event = {
            which: 50,
            charCode: 0
        };
        result = addressValidationHelper(event);
        expect(result).toBeTrue();

        event = {
            which: 100,
            charCode: 0
        };
        result = addressValidationHelper(event);
        expect(result).toBeTrue();

        event = {
            which: 8,
            charCode: 0
        };
        result = addressValidationHelper(event);
        expect(result).toBeTrue();

        event = {
            which: 16,
            charCode: 0
        };
        result = addressValidationHelper(event);
        expect(result).toBeTrue();

        event = {
            which: 13,
            charCode: 0
        };
        result = addressValidationHelper(event);
        expect(result).toBeTrue();

        event = {
            which: 17,
            charCode: 0
        };
        result = addressValidationHelper(event);
        expect(result).toBeTrue();

        event = {
            which: 32,
            charCode: 0
        };
        result = addressValidationHelper(event);
        expect(result).toBeTrue();

        event = {
            which: 0,
            charCode: 0
        };
        result = addressValidationHelper(event);
        expect(result).toBeTrue();
    });

    it("addressValidationHelper should return false", () => {
        const event = {
            which: 92,
            charCode: 1
        };
        const result = addressValidationHelper(event);
        expect(result).toBeFalse();
    });

    it("postalCodeValidationHelper should return true", () => {
        let event = {
            which: 48,
            charCode: 0
        };
        let result = postalCodeValidationHelper(event);
        expect(result).toBeTrue();

        event = {
            which: 8,
            charCode: 0
        };
        result = postalCodeValidationHelper(event);
        expect(result).toBeTrue();

        event = {
            which: 13,
            charCode: 0
        };
        result = postalCodeValidationHelper(event);
        expect(result).toBeTrue();

        event = {
            which: 16,
            charCode: 0
        };
        result = postalCodeValidationHelper(event);
        expect(result).toBeTrue();

        event = {
            which: 17,
            charCode: 0
        };
        result = postalCodeValidationHelper(event);
        expect(result).toBeTrue();

        event = {
            which: 0,
            charCode: 0
        };
        result = postalCodeValidationHelper(event);
        expect(result).toBeTrue();
    });

    it("postalCodeValidationHelper should return false #1", () => {
        const event = {
            which: 69,
            charCode: 0
        };
        const result = postalCodeValidationHelper(event);
        expect(result).toBeFalse();
    });


    it("postalCodeValidationHelper should return false #2", () => {
        const event = {
            which: 190,
            charCode: 0
        };
        const result = postalCodeValidationHelper(event);
        expect(result).toBeFalse();
    });

    it("cityValidationHelper should return true", () => {
        let event = {
            which: 16,
            charCode: 0
        };
        let result = cityValidationHelper(event);
        expect(result).toBeTrue();

        event = {
            which: 13,
            charCode: 0
        };
        result = cityValidationHelper(event);
        expect(result).toBeTrue();

        event = {
            which: 8,
            charCode: 0
        };
        result = cityValidationHelper(event);
        expect(result).toBeTrue();

        event = {
            which: 0,
            charCode: 0
        };
        result = cityValidationHelper(event);
        expect(result).toBeTrue();

        event = {
            which: 17,
            charCode: 0
        };
        result = cityValidationHelper(event);
        expect(result).toBeTrue();

        event = {
            which: 32,
            charCode: 0
        };
        result = cityValidationHelper(event);
        expect(result).toBeTrue();

        event = {
            which: 33,
            charCode: 0
        };
        result = cityValidationHelper(event);
        expect(result).toBeTrue();

        event = {
            which: 70,
            charCode: 0
        };
        result = cityValidationHelper(event);
        expect(result).toBeTrue();

        event = {
            which: 100,
            charCode: 0
        };
        result = cityValidationHelper(event);
        expect(result).toBeTrue();
    });

    it("cityValidationHelper should return false", () => {
        const event = {
            which: 20,
            charCode: 1
        };
        const result = cityValidationHelper(event);
        expect(result).toBeFalse();
    });

    it("getCOBPErrorFromResponse should validate and parse the response without exception", () => {
        const response = {
            status: false,
            response: "Unknown error",
            blackList: {
                status: false,
                message: "Unknown error"
            }
        };
        const msg = getCOBPErrorFromResponse(response);
        expect(msg).toEqual("Unknown error");
    });

    it("getCOBPErrorFromResponse should validate and parse the response with exception", () => {
        const response = {
            status: false,
            response: "Unknown exception",
            blackList: {
                status: false,
                message: "Unknown exception",
                exception: true
            },
            exception: true
        };
        const msg = getCOBPErrorFromResponse(response);
        expect(msg).toEqual("Unknown exception");
    });

    it("should validate null|unidendified and return appropriate value", () => {
        expect(isNullOrUndefined(null)).toBeTrue();
        expect(isNullOrUndefined(undefined)).toBeTrue();
    });

    it("should update the analytics data", () => {
        expect(updateAnalytics("test", "data")).toBeUndefined();
    });

    it("should pager be working", () => {
        const resp1 = getPager(200, 0);
        expect(resp1.currentPage).toBe(1);

        const resp2 = getPager(200, 40);
        expect(resp2.currentPage).toBe(25);

        const resp3 = getPager(16);
        expect(resp3.endPage).toBe(2);

        const resp4 = getPager(16, 0);
        expect(resp4.endPage).toBe(2);

        const resp5 = getPager(32, 0);
        expect(resp5.endPage).toBe(3);

        const resp6 = getPager(32, 4);
        expect(resp6.endPage).toBe(4);

        const resp7 = getPager(32, 2, 8);
        expect(resp7.endPage).toBe(3);
    });

    it("should truncate the string and append '...' at suffix", () => {
        expect(truncateString("abcdefghijklmnopqrstuv")).toEqual("abcdefghijklmnopqrst...");
    });

    it("should not truncate the string and return same string as input", () => {
        expect(truncateString("abcdefghijklmnopqrst")).toEqual("abcdefghijklmnopqrst");
    });

    it("should truncate the string and append '...' at suffix with custome length as 15", () => {
        expect(truncateString("abcdefghijklmnopqrstuv", 15)).toEqual("abcdefghijklmno...");
    });

    it("should get the year and month from date", () => {
        expect(getYearAndMonth("20200909")).toBeTruthy();
    });

    it("should get month difference from dates - 1", () => {
        expect(monthDiff(new Date("6/15/2020"), new Date("9/10/2020"))).toEqual(2);
    });

    it("should get month difference from dates - 2", () => {
        expect(monthDiff(new Date("6/15/2020"), new Date("9/20/2020"))).toEqual(3);
    });

    it("should format the given phone number", () => {
        expect(formatPhoneNumber("612345678")).toEqual("612345678");
        expect(formatPhoneNumber("012345678")).toEqual("6012345678");
        expect(formatPhoneNumber("12345678")).toEqual("6012345678");
    })

    it("should remove the html tags in the given string", () => {
        expect(removeHTMLTags("<p>Test Data</p>")).toEqual("Test Data");
    });

    it("should return empty string, if the given string is undefined", () => {
        expect(removeHTMLTags(undefined)).toEqual('');
    });

    it("should ensure CLMOmniDataSanitizer defined and works", () => {
        const data: iOmniCampaign = {
            device_sku: "test",
            campaign_title: "test",
            campaign_desc: "test",
            offer_category: "test",
            offer_desc: "test",
            device_retail_price: 1,
            device_disc_amt: 1,
            device_bundle_price: 1,
            plan_sku: "test",
            pass_sku: "test",
            rebate_amount: 1,
            rebate_frequency: 1,
            upfront_payment: true,
            banner_info: {
                promotion_text_banner: "test",
                planonly_inline_text: "test"
            },
            purchase_type: ["test", "data"]
        };
        expect(CLMOmniDataSanitizer(data).device_disc_amt).toBe(1);
    });

    it("should ensure CLMOmniDataSanitizer defined and works with default", () => {
        const data: iOmniCampaign = {
            device_sku: "test",
            campaign_title: "test",
            campaign_desc: "test",
            offer_category: "test",
            offer_desc: "test",
            device_retail_price: undefined,
            device_disc_amt: undefined,
            device_bundle_price: undefined,
            plan_sku: "test",
            pass_sku: "test",
            rebate_amount: undefined,
            rebate_frequency: undefined,
            upfront_payment: true,
            banner_info: {
                promotion_text_banner: "test",
                planonly_inline_text: "test"
            },
            purchase_type: ["test", "data"]
        };
        expect(CLMOmniDataSanitizer(data).device_disc_amt).toBe(0);
    });
});



