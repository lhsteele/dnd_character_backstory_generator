import { RefObject } from "react";

export const printText = (title: string, text: string) => {
  const printWindow = window.open("", "", "width=800,height=600");
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            pre { white-space: pre-wrap; word-wrap: break-word; }
          </style>
        </head>
        <body>
          <h2>${title}</h2>
          <pre>${text}</pre>
          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
};

export const copyTextToClipboard = (
  ref: RefObject<HTMLTextAreaElement>,
  textToCopy: string,
  setCopied: (_: boolean) => void
) => {
  if (ref.current) {
    ref.current.select();
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
  }
};

// Helper function to manage rate limiting
export const requestWithinLimitCount = (
  requestType: "character" | "monster"
): boolean => {
  const today = new Date().toISOString().split("T")[0];
  const rateLimitKey = `${requestType}-requests-${today}`;

  const cleanupOldEntries = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key &&
        key.startsWith(`${requestType}-requests-`) &&
        !key.includes(today)
      ) {
        localStorage.removeItem(key);
      }
    }
  };

  cleanupOldEntries();

  const currentCount = parseInt(localStorage.getItem(rateLimitKey) || "0");
  console.log(currentCount);
  if (currentCount > 5) {
    return false;
  }

  localStorage.setItem(rateLimitKey, (currentCount + 1).toString());
  return true;
};
