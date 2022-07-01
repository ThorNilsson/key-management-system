function isLocalhost(url) {
    return url.includes('localhost') || url.includes('127.0.0.1');
}

export const ADMIN_URL = isLocalhost( window.location.href) ? "https://localhost.app/" : "https://kms-admin.netlify.app/";

export const USER_URL = isLocalhost( window.location.href) ? "https://localhost.app/" : "https://kms-get-my-key.netlify.app/";


