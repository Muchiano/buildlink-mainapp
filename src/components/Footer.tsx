import { Building2, Mail, Linkedin, X, Instagram } from "lucide-react";
import buildlinkLogo from "@/assets/buildlink-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="z-50 relative bg-white text-primary-foreground py-12 border-t border-primary/20 pt-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-[200px_1fr_1fr] grid-cols-1 gap-8 mb-2">
          {/* Brand */}
           <div className="flex items-center space-x-2">
            <img 
              src={buildlinkLogo}
              alt="BuildLink Logo" 
              className="w-auto h-10"
            />
            <span className="text-xl font-bold text-primary">BuildLink</span>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <div className="flex md:justify-center justify-start space-x-6">
              <a href="#" className="text-primary hover:text-secondary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary hover:text-secondary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Contact Icons */}
          <div className="flex md:justify-center justify-start space-x-4">
            <a href="mailto:hello@buildlink.co.ke" className="text-primary/60 hover:text-secondary transition-colors">
              <Mail size={20} />
            </a>
            <a href="#" className="text-primary/60 hover:text-secondary transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-primary/60 hover:text-secondary transition-colors">
              <X size={20} />
            </a>
            <a href="#" className="text-primary/60 hover:text-secondary transition-colors">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-2">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary/60 text-sm">
              © {currentYear} BuildLink. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;