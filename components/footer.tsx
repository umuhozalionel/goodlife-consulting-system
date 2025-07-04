import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-terracotta-500 to-forest-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Goodlife Consulting</h3>
                <p className="text-sm text-gray-400">Partners</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering Rwanda's future leaders through expert-led training programs and professional development solutions.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/goodlifeconsultingrwanda"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-terracotta-600 rounded-full flex items-center justify-center hover:bg-terracotta-700 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/goodlifeconsultingrwanda"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-forest-600 rounded-full flex items-center justify-center hover:bg-forest-700 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/in/goodlifeconsultingrwanda"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-terracotta-600 rounded-full flex items-center justify-center hover:bg-terracotta-700 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/goodlifeconsultingrwanda"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-forest-600 rounded-full flex items-center justify-center hover:bg-forest-700 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="text-gray-400 hover:text-terracotta-400 transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-terracotta-400 transition-colors">About</a></li>
              <li><a href="#programs" className="text-gray-400 hover:text-terracotta-400 transition-colors">Training Programs</a></li>
              <li><a href="#calendar" className="text-gray-400 hover:text-terracotta-400 transition-colors">Calendar</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-terracotta-400 transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-terracotta-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Training Programs */}
          <div>
            <h4 className="font-bold text-lg mb-4">Training Programs</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#programs" className="text-gray-400 hover:text-forest-400 transition-colors">Leadership & Management</a></li>
              <li><a href="#programs" className="text-gray-400 hover:text-forest-400 transition-colors">Corporate Trainings</a></li>
              <li><a href="#programs" className="text-gray-400 hover:text-forest-400 transition-colors">Human Resource</a></li>
              <li><a href="#programs" className="text-gray-400 hover:text-forest-400 transition-colors">Digital & Innovation</a></li>
              <li><a href="#programs" className="text-gray-400 hover:text-forest-400 transition-colors">Communication Skills</a></li>
              <li><a href="#programs" className="text-gray-400 hover:text-forest-400 transition-colors">Languages</a></li>
              <li><a href="#programs" className="text-gray-400 hover:text-forest-400 transition-colors">Financial Literacy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-terracotta-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">PO Box 6061, Kicukiro Kagarama, Kigali</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-forest-500 flex-shrink-0" />
                <span className="text-gray-400">+250 790 363 700</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-terracotta-500 flex-shrink-0" />
                <span className="text-gray-400">gcp@goodlifeconsultingpartners.org</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">© 2025 Goodlife Consulting Partners. All rights reserved.</p>
            <p className="text-gray-500 text-sm">Powered by Bravonet Technologies Ltd</p>
          </div>
        </div>
      </div>
    </footer>
  )
}