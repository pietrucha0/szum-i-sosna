export default function Footer() {
  return (
    <footer
      style={{
        background: '#1a1e1b',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        className="mx-auto flex flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row lg:px-12"
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
          &copy; {new Date().getFullYear()} Szum i Sosna. Wszelkie prawa zastrzeżone.
        </span>
      </div>
    </footer>
  );
}
