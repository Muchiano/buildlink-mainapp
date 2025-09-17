import { Building2, Mail, Linkedin, X, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-[200px_1fr_1fr] grid-cols-1 gap-8 mb-8">
          {/* Brand */}
           <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/61381431-b6bc-4161-afb6-ae3b78b1e4bb.png" 
              alt="BuildLink Logo" 
              className="w-auto h-10"
            />
            <span className="text-xl font-bold text-primary text-white">BuildLink</span>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <div className="flex md:justify-center justify-start space-x-6">
              <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Contact Icons */}
          <div className="flex md:justify-center justify-start space-x-4">
            <a href="mailto:hello@buildlink.co.ke" className="text-primary-foreground/60 hover:text-secondary transition-colors">
              <Mail size={20} />
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors">
              <X size={20} />
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/60 text-sm">
              © {currentYear} BuildLink. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;