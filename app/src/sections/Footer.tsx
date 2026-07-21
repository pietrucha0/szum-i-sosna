export default function Footer() {
  return (
    <footer
      style={{
        background: '#1f2421',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        className="mx-auto flex flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row lg:px-12"
        style={{ maxWidth: 1200 }}
      >
        <span
          className="font-display text-[16px] font-normal"
          style={{ color: '#ffffff' }}
        >
          Szum i Sosna
        </span>

        <span
          className="font-body text-[13px] font-normal"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          &copy; 2025 Szum i Sosna. Wszelkie prawa zastrzeżone.
        </span>

        <a
          href="#"
          className="font-body text-[13px] font-normal transition-colors duration-200"
          style={{ color: 'rgba(255,255,255,0.4)' }}
          onMouseEnter={(e) => {
            (e.target as HTMLAnchorElement).style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.4)';
          }}
        >
          Polityka prywatności
        </a>
      </div>
    </footer>
  );
}
