export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            © 2025 Good life eHub. Powered by Bravonet Technologies. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="text-indigo-600 hover:text-indigo-700 transition-colors">
              Privacy Policy
            </a>
            <span className="text-gray-400">|</span>
            <a href="#" className="text-indigo-600 hover:text-indigo-700 transition-colors">
              Terms & Conditions
            </a>
            <span className="text-gray-400">|</span>
            <a href="#" className="text-indigo-600 hover:text-indigo-700 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
