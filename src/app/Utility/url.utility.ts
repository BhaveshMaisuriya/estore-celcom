/**
 * Method to remove "/" in the starting point of the url
 * @param urlData
 */
export let getCurrentBrowserUrlWithoutSlash = (urlData) => {
    if (urlData) {
    return urlData.slice(1);
    }
};
/**
 * Method to remove query string after ? in the url
 * @param urlData
 */
export let getCurrentBrowserUrlWithoutQueryString = (urlData) => {
    if (urlData) {
   return getCurrentBrowserUrlWithoutSlash(urlData).split("?")[0];
    }
};
