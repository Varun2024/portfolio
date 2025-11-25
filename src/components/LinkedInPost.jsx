import React, { useEffect, useRef } from "react";

/**
 * LinkedInProfilePostsWidget
 *
 * Props:
 *  - embedId (string) : the data-embed-id for the widget (default 25626202)
 *  - fileUrl  (string) : local path to uploaded file (used as data attribute)
 *
 * Note: the component injects the SociableKit widget script once.
 * The fileUrl is included as `data-file-url` on the container (per your request).
 */
export default function LinkedInProfilePostsWidget({
  embedId = "25626202",
  fileUrl = "/mnt/data/A_digital_illustration_features_a_portrait_of_a_yo.png",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    // If script already present, do nothing (SociableKit script loads once).
    const scriptSrc = "https://widgets.sociablekit.com/linkedin-profile-posts/widget.js";
    const existing = Array.from(document.querySelectorAll("script")).find(
      (s) => s.src === scriptSrc
    );

    if (!existing) {
      const s = document.createElement("script");
      s.src = scriptSrc;
      s.defer = true;
      s.async = true;
      // optional id so we can find/remove later if needed
      s.id = "sociablekit-linkedin-widget";
      document.body.appendChild(s);
    } else {
      // If the script is already loaded and the widget library exposes a re-render method,
      // you could call it here. Otherwise the widget should initialize automatically.
      // Example (if the widget library had a public init function):
      // if (window.SociableKit && typeof window.SociableKit.init === 'function') {
      //   window.SociableKit.init();
      // }
    }

    return () => {
      // We *don't* remove the script on unmount because other parts of the app
      // might rely on it; removing it could break other widgets.
      // If you truly want to remove the script on unmount, uncomment below:
      //
      // const injected = document.getElementById("sociablekit-linkedin-widget");
      // if (injected) injected.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="sk-ww-linkedin-profile-post bg-[var(--color-primary)] border border-gray-800 rounded-2xl p-6 shadow-sm mt-10 max-h-2xl overflow-hidden"
      data-embed-id={embedId}
      // <-- local file path included here as requested; will be used by your tooling
      data-file-url={fileUrl}
    />
  );
}
