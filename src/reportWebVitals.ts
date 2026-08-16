import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";

type ReportHandler = (metric: unknown) => void;

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (!onPerfEntry) {
    return;
  }

  onCLS(onPerfEntry);
  onFCP(onPerfEntry);
  onLCP(onPerfEntry);
  onTTFB(onPerfEntry);
  onINP(onPerfEntry);
};

export default reportWebVitals;
