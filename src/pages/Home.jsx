import profilepic from "../assets/profilepic.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Mail,
  Linkedin,
  ExternalLink,
  Code,
  Briefcase,
  GraduationCap,
  User,
  Facebook,
  Github,
  ComputerIcon,
} from "lucide-react";

export const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ["home", "about", "internship", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: "Home", icon: User },
    { id: "about", label: "About Me", icon: GraduationCap },
    { id: "internship", label: "Internship", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Henry.
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Home Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center pt-20 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <img
              src={profilepic}
              alt="profile"
              className="w-70 h-70 rounded-full object-cover mx-auto border-8 border-blue-500 shadow-lg "
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4">
            Patrick Henry Maderazo
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-2">
            BSIT Student / IT HelpDesk
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            Behind every smooth-running system is someone who ensures problems
            never reach the user — that’s where I come in.
          </p>
          <button
            onClick={() => scrollToSection("contact")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Get In Touch
          </button>
        </div>
      </section>

      {/* About Me Section */}
      <section
        id="about"
        className="min-h-screen flex items-center justify-center py-20 px-4 bg-white/50"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <GraduationCap className="text-blue-600" />
                  Skills Summary
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Motivated IT student with strong communication,
                  problem-solving, and technical support skills. Proficient in
                  troubleshooting hardware and software issues, assisting users,
                  and maintaining reliable IT systems. Committed to delivering
                  efficient and professional support in dynamic environments.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Troubleshooting
                  </span>
                  <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                    Hardware and Software Installation/Configuration
                  </span>
                  <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    Tech Savvy
                  </span>
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Network Connectivity Support
                  </span>
                  <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                    PC Deployment and Maintenance
                  </span>
                  <span className="px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">
                    Remote Desktop Support
                  </span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    Ticketing Systems
                  </span>
                  <span className="px-4 py-2 bg-gray-100 text-red-500 rounded-full text-sm font-medium">
                    IT Asset Management
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 shadow-xl text-white">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <ComputerIcon className="text-white" />
                  Technical Proficiencies
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="mb-2 font-medium">Operating Systems</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white/20 rounded-lg text-sm font-bold">
                        Windows
                      </span>
                      <span className="px-3 py-1 bg-white/20 rounded-lg text-sm font-bold">
                        Linux
                      </span>
                      <span className="px-3 py-1 bg-white/20 rounded-lg text-sm font-bold">
                        MacOS
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 font-medium">Remote Support Tools</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white/20 rounded-lg text-sm font-bold">
                        TightVNC
                      </span>
                      <span className="px-3 py-1 bg-white/20 rounded-lg text-sm font-bold">
                        AnyDesk
                      </span>
                      <span className="px-3 py-1 bg-white/20 rounded-lg text-sm font-bold">
                        RustDesk
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 font-medium">Collaboration Tools</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white/20 rounded-lg text-sm font-bold">
                        Lark
                      </span>
                      <span className="px-3 py-1 bg-white/20 rounded-lg text-sm font-bold">
                        Microsoft Teams
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internship Section */}
      <section
        id="internship"
        className="min-h-screen flex items-center justify-center py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Internship Information
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Briefcase className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                S.P Madrid & Associates
              </h3>
              <p className="text-gray-600 text-sm">
                Organization details where you completed your internship
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl border border-indigo-100 hover:shadow-2xl transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                <ComputerIcon className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                IT Helpdesk
              </h3>
              <p className="text-gray-600 text-sm">
                Assisting users with technical issues.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 shadow-2xl text-white mb-12">
            <h3 className="text-2xl font-bold mb-6">Tasks & Accomplishments</h3>
            <div className="space-y-4">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <h4 className="font-semibold mb-2">Task Description</h4>
                <p className="text-white/90 text-sm">
                  Details about reports written, designs created, or systems
                  tested during your internship. Include any events you helped
                  organize or participated in.
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <h4 className="font-semibold mb-2">Note</h4>
                <p className="text-white/90 text-sm italic">
                  If permission was required from your HTE to showcase work
                  samples, mention that here. Otherwise, describe the tasks you
                  completed instead.
                </p>
              </div>
            </div>
          </div>

          {/* Sample Works Section */}
          <div className="mt-12">
            <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">
              Sample Works & Outputs
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample Work 1 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <Code size={64} className="text-white" />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Project Title 1
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Brief description of the project, system, or report you
                    created during your internship.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      HTML
                    </span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                      CSS
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      JavaScript
                    </span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
                    <ExternalLink size={16} />
                    View Details
                  </button>
                </div>
              </div>

              {/* Sample Work 2 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
                  <Briefcase size={64} className="text-white" />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Project Title 2
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Database design, system testing, or documentation project
                    completed during internship.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      SQL
                    </span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                      Database
                    </span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
                    <ExternalLink size={16} />
                    View Details
                  </button>
                </div>
              </div>

              {/* Sample Work 3 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <GraduationCap size={64} className="text-white" />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Project Title 3
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Event organization, presentation, or any other significant
                    contribution made during internship.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      Design
                    </span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                      Planning
                    </span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
                    <ExternalLink size={16} />
                    View Details
                  </button>
                </div>
              </div>

              {/* Sample Work 4 - Screenshot/Image Placeholder */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <ExternalLink size={64} className="mx-auto mb-2" />
                    <p className="text-sm font-medium">Screenshot/Image</p>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Project Title 4
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Add screenshots or images of your work outputs here. Can
                    include UI/UX designs or reports.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      UI/UX
                    </span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                      Design
                    </span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
                    <ExternalLink size={16} />
                    View Details
                  </button>
                </div>
              </div>

              {/* Sample Work 5 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                  <Code size={64} className="text-white" />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Project Title 5
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Additional sample work or contribution during your
                    internship period.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      React
                    </span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                      Web Dev
                    </span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
                    <ExternalLink size={16} />
                    View Details
                  </button>
                </div>
              </div>

              {/* Sample Work 6 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <Briefcase size={64} className="text-white" />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Project Title 6
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Final sample work showcasing your skills and accomplishments
                    during the internship.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      Testing
                    </span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                      QA
                    </span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
                    <ExternalLink size={16} />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center py-20 px-4 bg-white/50"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Contact Page
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-blue-100">
              <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                henrymaderazo19@gmail.com
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-blue-100">
              <Facebook className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Facebook</h3>
              <a
                href="https://www.facebook.com/phenry.maderazo"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Patrick Henry Maderazo
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-indigo-100">
              <Linkedin className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">LinkedIn</h3>
              <a
                href="https://www.linkedin.com/in/patrickhenrymaderazo/"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Patrick Henry Maderazo
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-indigo-100">
              <Github className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">GitHub</h3>
              <a
                href="https://github.com/henry2912v"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Patrick Henry Maderazo
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 shadow-2xl text-white">
            <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
            <div className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Email Address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Your message..."
                />
              </div>
              <button className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Patrick Henry Maderazo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
