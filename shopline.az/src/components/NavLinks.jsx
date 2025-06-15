import { Link } from "react-router-dom";

export default function NavLinks({ onLinkClick }) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/products", label: "Products" },
    { href: "/admin", label: "Admin Panel" },
  ];

  return (
    <>
      {links.map(({ href, label }) => (
        <Link
          key={label}
          to={href}
          onClick={onLinkClick}
          className="block md:inline-block px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium"
        >
          {label}
        </Link>
      ))}
    </>
  );
}
