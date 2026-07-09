import React from "react";
import { LAYOUT } from "../../lib/constants";
import { FaGlobe, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa6";

export function Footer() {
  const footerLinks = [
    {
      title: "Support",
      links: ["Help Centre", "AirCover", "Anti-discrimination", "Disability support", "Cancellation options", "Report neighbourhood concern"],
    },
    {
      title: "Hosting",
      links: ["Airbnb your home", "AirCover for Hosts", "Hosting resources", "Community forum", "Hosting responsibly", "Airbnb-friendly apartments"],
    },
    {
      title: "Airbnb",
      links: ["Newsroom", "New features", "Careers", "Investors", "Gift cards", "Airbnb.org emergency stays"],
    },
  ];

  return (
    <footer className="bg-airbnb-light-gray border-t border-airbnb-border mt-12 py-12 text-sm text-airbnb-ink select-none">
      <div className={`${LAYOUT.CONTAINER_MAX_WIDTH} mx-auto px-6 md:px-10`}>
        {/* Link Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-airbnb-border">
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="font-semibold text-airbnb-ink">{section.title}</h4>
              <ul className="space-y-3 font-normal text-airbnb-gray">
                {section.links.map((link) => (
                  <li key={link}>
                    <button type="button" className="hover:underline text-left">{link}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-airbnb-ink">
          {/* Left copyright and standard links */}
          <div className="flex items-center space-x-2 flex-wrap justify-center md:justify-start font-normal text-airbnb-gray">
            <span>© 2026 Airbnb, Inc.</span>
            <span>·</span>
            <button type="button" className="hover:underline">Privacy</button>
            <span>·</span>
            <button type="button" className="hover:underline">Terms</button>
            <span>·</span>
            <button type="button" className="hover:underline">Sitemap</button>
            <span>·</span>
            <button type="button" className="hover:underline">UK Modern Slavery Act</button>
          </div>

          {/* Right Language, Currency & Social actions */}
          <div className="flex items-center space-x-6 font-semibold">
            <button type="button" className="flex items-center space-x-2 hover:underline">
              <FaGlobe className="w-4 h-4" />
              <span>English (GB)</span>
            </button>
            <button type="button" className="hover:underline">
              <span>GBP (£)</span>
            </button>
            
            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <button type="button" className="hover:text-black transition-colors" aria-label="Facebook">
                <FaFacebookF className="w-4 h-4" />
              </button>
              <button type="button" className="hover:text-black transition-colors" aria-label="Twitter">
                <FaTwitter className="w-4 h-4" />
              </button>
              <button type="button" className="hover:text-black transition-colors" aria-label="Instagram">
                <FaInstagram className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
