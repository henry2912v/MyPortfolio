import profilepic from "../assets/profilepic.jpg";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import AOS from "aos";
import "aos/dist/aos.css";
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
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const form = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    // Simulate sending (shows "Sending..." for 1 second)
    setTimeout(() => {
      setSubmitStatus({
        type: "success",
        message: "✅ Message sent successfully! I will get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);

      // Auto-clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: "", message: "" });
      }, 5000);
    }, 1000);
  };

  // Mock images data
  const carouselImages = [
    {
      src: "https://picsum.photos/800/400?random=1",
      title: "Hardware Troubleshooting",
      description: "Diagnosing and resolving PC hardware issues",
    },
    {
      src: "https://picsum.photos/800/400?random=2",
      title: "Network Setup",
      description: "Configuring and maintaining network infrastructure",
    },
    {
      src: "https://picsum.photos/800/400?random=3",
      title: "User Support",
      description: "Providing technical assistance to office staff",
    },
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
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
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                      : isScrolled
                      ? "text-gray-700 hover:bg-orange-400"
                      : "text-white hover:bg-orange/10"
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
                className={`${
                  isScrolled ? "text-gray-700" : "text-white"
                } hover:text-blue-600 p-2`}
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
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
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
        className="min-h-screen flex items-center justify-center pt-20 px-4 bg-gradient-to-br from-black via-orange-900 to-black"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8" data-aos="zoom-in">
            <img
              src={profilepic}
              alt="profile"
              className="w-70 h-70 rounded-full object-cover mx-auto border-8 border-orange-500 shadow-lg"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-4">
            Patrick Henry Maderazo
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">
            BSIT Student / IT HelpDesk
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Behind every smooth-running system is someone who ensures problems
            never reach the user — that’s where I come in.
          </p>
          <button
            onClick={() => scrollToSection("contact")}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Get In Touch
          </button>
        </div>
      </section>

      {/* About Me Section */}
      <section
        id="about"
        className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-br from-black via-orange-900 to-black"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <GraduationCap className="text-orange-500" />
                  Skills Summary
                </h3>
                <p className="text-white leading-relaxed mb-4">
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
              <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700 text-white">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <ComputerIcon className="text-orange-500" />
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
        className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-br from-black via-orange-900 to-black"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
            Internship Information
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center mb-4">
                <Briefcase className="text-orange-500" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                S.P Madrid & Associates
              </h3>
              <p className="text-gray-300 text-sm">
                Organization details where you completed your internship
              </p>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-900 rounded-xl flex items-center justify-center mb-4">
                <ComputerIcon className="text-orange-500" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">IT Helpdesk</h3>
              <p className="text-gray-300 text-sm">
                Assisting users with technical issues.
              </p>
            </div>
          </div>

          {/* Sample Works Section */}
          <div className="mt-12">
            <h3 className="text-3xl font-bold text-center mb-8 text-white">
              OJT Documentation & Activities
            </h3>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">
              <div className="relative">
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out transform"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {carouselImages.map((image, index) => (
                      <div key={index} className="w-full flex-shrink-0">
                        <img
                          src={image.src}
                          alt={`OJT Activity ${index + 1}`}
                          className="w-full h-[400px] object-cover rounded-xl"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200"
                  onClick={handlePrevSlide}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200"
                  onClick={handleNextSlide}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <div className="flex gap-2">
                    {carouselImages.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          currentSlide === index ? "bg-blue-600" : "bg-blue-300"
                        }`}
                        onClick={() => setCurrentSlide(index)}
                        style={{ cursor: "pointer" }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="mt-6 text-center">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {carouselImages[currentSlide].title}
                </h4>
                <p className="text-gray-600">
                  {carouselImages[currentSlide].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-br from-black via-orange-900 to-black"
        data-aos="fade-up"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Contact Page
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div
              className="bg-white rounded-2xl p-8 shadow-xl border border-blue-100 hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() =>
                (window.location.href = "mailto:henrymaderazo19@gmail.com")
              }
            >
              <Mail className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-blue-600 font-medium">
                henrymaderazo19@gmail.com
              </p>
            </div>

            <div
              className="bg-white rounded-2xl p-8 shadow-xl border border-blue-100 hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() =>
                window.open(
                  "https://www.facebook.com/phenry.maderazo",
                  "_blank"
                )
              }
            >
              <Facebook className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Facebook</h3>
              <p className="text-blue-600 font-medium">
                Patrick Henry Maderazo
              </p>
            </div>

            <div
              className="bg-white rounded-2xl p-8 shadow-xl border border-indigo-100 hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/patrickhenrymaderazo/",
                  "_blank"
                )
              }
            >
              <Linkedin className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">LinkedIn</h3>
              <p className="text-indigo-600 font-medium">
                Patrick Henry Maderazo
              </p>
            </div>

            <div
              className="bg-white rounded-2xl p-8 shadow-xl border border-indigo-100 hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() =>
                window.open("https://github.com/henry2912v", "_blank")
              }
            >
              <Github className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">GitHub</h3>
              <p className="text-indigo-600 font-medium">
                Patrick Henry Maderazo
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-600 to-orange-800 text-white rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>

            {/* Success/Error Message Display */}
            {submitStatus.message && (
              <div
                className={`mb-6 p-4 rounded-lg text-left font-medium animate-fadeIn ${
                  submitStatus.type === "success"
                    ? "bg-green-500/20 border-2 border-green-400 text-green-100"
                    : "bg-red-500/20 border-2 border-red-400 text-red-100"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form
              ref={form}
              onSubmit={handleSubmit}
              className="space-y-4 text-left"
            >
              <div>
                <label className="block text-sm font-medium mb-2 text-white">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-transparent text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Your name"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-transparent text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="your.email@example.com"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-transparent text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Your message..."
                  required
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
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
