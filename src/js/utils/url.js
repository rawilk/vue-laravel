/**
 * Determine if the given url is the current page.
 *
 * @param {string} url
 * @returns {boolean}
 */
export const isUrlActive = url => {
    // Get the current pathname
    const path = window.location.pathname;

    if (path === '/' && (url === '/' || url === '')) {
        return true;
    }

    url = url.toString();
    if (! url.startsWith('/')) {
        url = `/${url}`;
    }

    return url.startsWith(path);
};