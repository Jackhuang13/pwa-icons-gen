## 2025-02-27 - Sanitize user inputs in HTML Generation
**Vulnerability:** XSS vulnerability from user input (e.g. app name, theme color) interpolated directly into generated HTML snippets for manifest and export templates.
**Learning:** Tools that generate code or configuration snippets (like PWA manifest files or HTML meta tags) are just as susceptible to XSS if user input is not escaped before output.
**Prevention:** Ensure all user inputs are properly sanitized using an `escapeHtml` or similar function before being embedded into output strings intended for execution or HTML parsing.
