import {
    getCurrentBrowserUrlWithoutSlash,
    getCurrentBrowserUrlWithoutQueryString
  } from "./url.utility";
  
  describe("Validate Utility functions ", () => {
    it("should get Current Browser Url Without Slash", () => {
      const urlData = "/plans/xp-lite/";
      const result = getCurrentBrowserUrlWithoutSlash(urlData);
      expect(result).toBe("plans/xp-lite/");
    });
  
    it("should get Current Browser Url Without QueryString", () => {
      const urlData = "/plans/xp-lite/?test=1234";
      const result = getCurrentBrowserUrlWithoutQueryString(urlData);
      expect(result).toBe("plans/xp-lite/");
    });
  });
  