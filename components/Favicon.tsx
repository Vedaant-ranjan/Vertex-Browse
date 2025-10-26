import React from 'react';

interface FaviconProps {
  uri: string;
}

const Favicon: React.FC<FaviconProps> = ({ uri }) => {
    let hostname: string;
    try {
        hostname = new URL(uri).hostname;
    } catch (e) {
        try {
            // Attempt to fix URLs that are missing a protocol
            hostname = new URL(`https://${uri}`).hostname;
        } catch (e2) {
            console.warn(`Could not parse URL for favicon: ${uri}`);
            // Fallback to a generic icon if URL parsing fails completely
            const genericFaviconUrl = "http://upload.wikimedia.org/wikipedia/commons/c/c5/Favicon-16x16.png";
            return (
                <img
                    src={genericFaviconUrl}
                    alt=""
                    aria-hidden="true"
                    className="w-4 h-4 mr-2 rounded-sm"
                    loading="lazy"
                />
            );
        }
    }

    // Use Google's public favicon service for reliability and to avoid cross-origin issues.
    // Request a 16x16px icon to match the display size.
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${hostname}&sz=16`;
    const genericFaviconUrl = "http://upload.wikimedia.org/wikipedia/commons/c/c5/Favicon-16x16.png";

    return (
        <img
            src={faviconUrl}
            alt=""
            aria-hidden="true"
            className="w-4 h-4 mr-2 rounded-sm"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loops in case the fallback also fails
              target.src = genericFaviconUrl;
            }}
        />
    );
};

export default Favicon;
