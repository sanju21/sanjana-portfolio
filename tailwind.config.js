/** @type {import('tailwindcss').Config} */
export default {
  // Scan the source files the design export writes, so the built stylesheet
  // contains exactly the utilities actually used.
  content: ["./index.html", "./*.jsx"],
  theme: { extend: {} },
  plugins: [],
};
