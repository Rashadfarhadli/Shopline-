export default function AuthButtons({ onLinkClick }) {
  return (
    <>
      <a
        href="/login"
        onClick={onLinkClick}
        className="block md:inline-block px-4 py-2 border border-indigo-600 text-indigo-900 rounded hover:bg-indigo-800 hover:text-white transition"
      >
        Login
      </a>
      <a
        href="/register"
        onClick={onLinkClick}
        className="block md:inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-900 transition"
      >
        Register
      </a>
    </>
  );
}
