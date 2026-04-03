import Link from 'next/link';

export interface FooterProps {
  year?: number;
}

export default function Footer({ year = new Date().getFullYear() }: FooterProps) {
  const footerLinks = [
    { label: 'About', href: '#about' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-volcanic-black text-sand-white py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="mx-auto max-w-7xl">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-sand-white">Holoholo.ai LLC</h3>
            <div className="text-sm text-mist space-y-2">
              <p>1000 Bishop St, Suite 800</p>
              <p>Honolulu, HI 96813</p>
            </div>
            <p className="text-sm italic text-mist mt-4">
              "Experience Hawaiʻi. Give back to Hawaiʻi."
            </p>
          </div>

          {/* Links Section 1 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sand-white">Company</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-mist hover:text-bright-sea transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider for spacing on mobile */}
          <div className="sm:hidden border-t border-mist pt-4">
            <p className="text-sm text-mist">© {year} Holoholo.ai LLC. All rights reserved.</p>
          </div>

          {/* Hidden on mobile, shown on desktop */}
          <div className="hidden sm:block">
            <p className="text-sm text-mist">© {year} Holoholo.ai LLC. All rights reserved.</p>
          </div>
        </div>

        {/* Mobile copyright */}
        <div className="sm:hidden border-t border-mist pt-4">
          <p className="text-xs text-mist text-center">
            © {year} Holoholo.ai LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
