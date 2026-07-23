import { useEffect, useRef, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

export default function ResponsiveGoogleButton({ onSuccess, onError }) {
  const containerRef = useRef(null);
  const [buttonWidth, setButtonWidth] = useState(240);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const updateWidth = () => {
      const availableWidth = Math.floor(container.getBoundingClientRect().width);
      setButtonWidth(Math.max(200, Math.min(400, availableWidth)));
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex w-full min-w-0 justify-center overflow-hidden">
      <GoogleLogin
        key={buttonWidth}
        onSuccess={onSuccess}
        onError={onError}
        theme="outline"
        size="large"
        width={buttonWidth}
      />
    </div>
  );
}
