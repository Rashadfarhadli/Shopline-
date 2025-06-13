import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";

export default function MobileMenu({ isOpen, closeMenu }) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white border-t border-gray-200">
      <nav className="flex flex-col space-y-1 p-2">
        <NavLinks onLinkClick={closeMenu} />
        <div className="border-t border-gray-200 mt-1"></div>
        <AuthButtons onLinkClick={closeMenu} />
      </nav>
    </div>
  );
}
