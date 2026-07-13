// Floating WhatsApp chat button shown on every page. It is a plain link, so it
// can render on the server — no client-side JavaScript required.
const WA_NUMBER = "358406643530"; // +358 40 6643530, international format for wa.me
const WA_MESSAGE = "Hi Nordic Ceylonians, I'd like to know more about your services.";

export default function WhatsAppChat() {
  const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

  return (
    <a
      className="wa-chat"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="wa-label">Chat with us</span>
      <span className="wa-ico">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16.04 3.2c-7.1 0-12.86 5.76-12.86 12.86 0 2.27.6 4.49 1.73 6.44L3.2 28.8l6.48-1.7a12.8 12.8 0 0 0 6.35 1.62h.01c7.1 0 12.86-5.76 12.86-12.86 0-3.44-1.34-6.67-3.77-9.1a12.78 12.78 0 0 0-9.09-3.76zm0 23.34h-.01a10.66 10.66 0 0 1-5.43-1.49l-.39-.23-4.05 1.06 1.08-3.95-.25-.4a10.65 10.65 0 0 1-1.63-5.68c0-5.9 4.8-10.7 10.7-10.7 2.86 0 5.54 1.11 7.56 3.14a10.62 10.62 0 0 1 3.13 7.57c0 5.9-4.8 10.7-10.7 10.7zm5.87-8.02c-.32-.16-1.9-.94-2.2-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.36-.5-2.59-1.6-.96-.85-1.6-1.91-1.79-2.23-.19-.32-.02-.5.14-.66.15-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.14 3.08 1.3 3.29.16.21 2.25 3.43 5.45 4.81.76.33 1.35.53 1.82.68.76.24 1.46.21 2.01.13.61-.09 1.9-.78 2.16-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37z"/>
        </svg>
      </span>
    </a>
  );
}
