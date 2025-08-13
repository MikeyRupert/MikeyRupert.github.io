"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import GoogleMap from "@/components/google-map"
import {
  Star,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Award,
  Users,
  Clock,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState("All Projects")
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.",
        })
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          projectType: "",
          message: "",
        })
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to send message. Please try again.",
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById("portfolio")
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const portfolioProjects = [
    {
      title: "Modern Family Home",
      category: "Residential",
      image: "modern luxury house with large windows and landscaping",
    },
    {
      title: "Corporate Office Complex",
      category: "Commercial",
      image: "sleek modern office building with glass facade",
    },
    {
      title: "Kitchen Renovation",
      category: "Renovations",
      image: "beautiful modern kitchen with marble countertops",
    },
    {
      title: "Luxury Apartment Building",
      category: "Residential",
      image: "elegant apartment building with balconies",
    },
    {
      title: "Retail Shopping Center",
      category: "Commercial",
      image: "modern shopping center with outdoor plaza",
    },
    {
      title: "Bathroom Remodel",
      category: "Renovations",
      image: "luxurious bathroom with modern fixtures",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      image: "professional woman smiling",
      rating: 5,
      text: "BuildCraft Pro transformed our vision into reality. The attention to detail and professionalism throughout the entire process was exceptional. Our new home exceeded all expectations!",
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      image: "professional man in business attire",
      rating: 5,
      text: "The commercial renovation of our office space was completed on time and within budget. The team was professional, clean, and minimized disruption to our business operations.",
    },
    {
      name: "Emily Rodriguez",
      role: "Property Developer",
      image: "professional woman with hard hat",
      rating: 5,
      text: "I've worked with many contractors over the years, but BuildCraft Pro stands out for their quality workmanship and reliable communication. Highly recommended!",
    },
    {
      name: "David Thompson",
      role: "Restaurant Owner",
      image: "professional man smiling in restaurant",
      rating: 5,
      text: "The restaurant renovation was flawless. They understood our vision and delivered beyond expectations. The craftsmanship is outstanding and our customers love the new space!",
    },
    {
      name: "Lisa Martinez",
      role: "Homeowner",
      image: "happy woman in front of house",
      rating: 5,
      text: "From foundation to finish, BuildCraft Pro handled our custom home build with incredible expertise. Every detail was perfect and they kept us informed throughout the process.",
    },
    {
      name: "Robert Kim",
      role: "Retail Manager",
      image: "professional man in retail environment",
      rating: 5,
      text: "Our store renovation was completed ahead of schedule with minimal disruption to our business. The quality of work and attention to detail was exceptional. Highly professional team!",
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const getVisibleTestimonials = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      const index = (currentTestimonial + i) % testimonials.length
      visible.push(testimonials[index])
    }
    return visible
  }

  const filteredProjects =
    activeFilter === "All Projects"
      ? portfolioProjects
      : portfolioProjects.filter((project) => project.category === activeFilter)

  const filterCategories = ["All Projects", "Residential", "Commercial", "Renovations"]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-slate-800 text-white py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-amber-400">BuildCraft Pro</div>
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="hover:text-amber-400 transition-colors">
              Home
            </a>
            <a href="#portfolio" className="hover:text-amber-400 transition-colors">
              Portfolio
            </a>
            <a href="#about" className="hover:text-amber-400 transition-colors">
              About
            </a>
            <a href="#testimonials" className="hover:text-amber-400 transition-colors">
              Testimonials
            </a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">
              Contact
            </a>
          </div>
          <Button onClick={scrollToContact} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
            Request Quote
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          }}
        />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Building Your <span className="text-amber-400">Dreams</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Professional construction services with 25+ years of excellence in residential and commercial projects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 py-4 text-lg"
            >
              Request a Quote
            </Button>
            <Button
              onClick={scrollToPortfolio}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg bg-transparent"
            >
              View Our Work
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-slate-800 mb-2">500+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-800 mb-2">25+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-800 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-800 mb-2">50+</div>
              <div className="text-gray-600">Team Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio/Gallery Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Our Portfolio</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our diverse range of construction projects, from residential homes to commercial complexes
            </p>
          </div>

          <div className="mb-16">
            <h3 className="text-3xl font-bold text-slate-800 mb-8 text-center">Our Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-amber-600" size={32} />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 mb-2">Residential Construction</h4>
                  <p className="text-gray-600">Custom homes, additions, and residential projects built to perfection</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="text-amber-600" size={32} />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 mb-2">Commercial Construction</h4>
                  <p className="text-gray-600">Office buildings, retail spaces, and commercial developments</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-amber-600" size={32} />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 mb-2">Renovations</h4>
                  <p className="text-gray-600">Kitchen, bathroom, and whole-home renovation services</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="text-amber-600" size={32} />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 mb-2">Project Management</h4>
                  <p className="text-gray-600">End-to-end project coordination and management services</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filterCategories.map((category) => (
              <Badge
                key={category}
                variant={activeFilter === category ? "secondary" : "outline"}
                className={`cursor-pointer px-4 py-2 transition-colors ${
                  activeFilter === category ? "bg-amber-100 text-amber-800 hover:bg-amber-200" : "hover:bg-slate-100"
                }`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <img
                    src={`/placeholder.svg?height=256&width=400&query=${project.image}`}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-amber-500 text-slate-900">{project.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{project.title}</h3>
                  <p className="text-gray-600">
                    Professional construction with attention to detail and quality craftsmanship.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">About BuildCraft Pro</h2>
              <p className="text-lg text-gray-600 mb-6">
                With over 25 years of experience in the construction industry, BuildCraft Pro has established itself as
                a trusted name in both residential and commercial construction. Our commitment to quality, safety, and
                customer satisfaction has made us the preferred choice for hundreds of clients.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We believe in building more than just structures – we build relationships, communities, and dreams. Our
                team of skilled professionals brings expertise, innovation, and dedication to every project, ensuring
                exceptional results that stand the test of time.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-amber-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-slate-800">Licensed & Insured</h4>
                    <p className="text-gray-600 text-sm">Fully licensed and insured for your peace of mind</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="text-amber-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-slate-800">Award Winning</h4>
                    <p className="text-gray-600 text-sm">Recognized for excellence in construction</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="text-amber-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-slate-800">Expert Team</h4>
                    <p className="text-gray-600 text-sm">Skilled professionals with decades of experience</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="text-amber-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-slate-800">On-Time Delivery</h4>
                    <p className="text-gray-600 text-sm">Projects completed on schedule and within budget</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=600&width=500"
                alt="Our construction team"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>

          <div className="mt-16 bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Our Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="John Smith"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-xl font-semibold text-slate-800">John Smith</h4>
                <p className="text-amber-600 font-medium">Project Manager</p>
                <p className="text-gray-600 mt-2">25+ years of construction experience</p>
              </div>
              <div className="text-center">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Sarah Johnson"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-xl font-semibold text-slate-800">Sarah Johnson</h4>
                <p className="text-amber-600 font-medium">Lead Engineer</p>
                <p className="text-gray-600 mt-2">Structural engineering specialist</p>
              </div>
              <div className="text-center">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Mike Rodriguez"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-xl font-semibold text-slate-800">Mike Rodriguez</h4>
                <p className="text-amber-600 font-medium">Site Foreman</p>
                <p className="text-gray-600 mt-2">Quality control and safety expert</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it – hear from our satisfied clients about their experience with BuildCraft
              Pro
            </p>
          </div>

          <div className="relative">
            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              <Button
                onClick={prevTestimonial}
                variant="outline"
                size="sm"
                className="border-amber-500 text-amber-600 hover:bg-amber-50 bg-transparent"
              >
                <ChevronLeft size={16} />
                Previous
              </Button>
              <Button
                onClick={nextTestimonial}
                variant="outline"
                size="sm"
                className="border-amber-500 text-amber-600 hover:bg-amber-50 bg-transparent"
              >
                Next
                <ChevronRight size={16} />
              </Button>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500">
              {getVisibleTestimonials().map((testimonial, index) => (
                <Card
                  key={`${currentTestimonial}-${index}`}
                  className="p-6 transform transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <img
                        src={`/placeholder.svg?height=60&width=60&query=${testimonial.image}`}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="text-amber-400 fill-current" size={16} />
                      ))}
                    </div>
                    <p className="text-gray-600 italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-amber-500" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            {/* Testimonial Counter */}
            <div className="text-center mt-4 text-gray-600">
              {currentTestimonial + 1} of {testimonials.length}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 bg-slate-800 text-white overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-1/3 h-1/2">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Construction background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-1/2">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Construction background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2">
            <img
              src="/placeholder.svg?height=400&width=800"
              alt="Construction background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content overlay */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to start your construction project? Contact us today for a free consultation and quote
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>

              {submitStatus.type && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-green-900/50 border border-green-500 text-green-200"
                      : "bg-red-900/50 border border-red-500 text-red-200"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name *"
                    required
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                  />
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name *"
                    required
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address *"
                  type="email"
                  required
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                />
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  type="tel"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                />
                <Input
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  placeholder="Project Type (e.g., Residential, Commercial, Renovation)"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                />
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project... *"
                  rows={4}
                  required
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="text-amber-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-gray-300">(555) 123-4567</p>
                    <p className="text-gray-300">(555) 987-6543</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="text-amber-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-300">info@buildcraftpro.com</p>
                    <p className="text-gray-300">quotes@buildcraftpro.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="text-amber-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="text-gray-300">
                      123 Construction Ave
                      <br />
                      Building City, BC 12345
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8">
                <GoogleMap />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="text-2xl font-bold text-amber-400 mb-4">BuildCraft Pro</div>
              <p className="text-gray-400 mb-4">
                Building excellence since 1998. Your trusted partner for all construction needs.
              </p>
              <div className="flex space-x-4">
                <Facebook className="text-gray-400 hover:text-amber-400 cursor-pointer" size={20} />
                <Twitter className="text-gray-400 hover:text-amber-400 cursor-pointer" size={20} />
                <Instagram className="text-gray-400 hover:text-amber-400 cursor-pointer" size={20} />
                <Linkedin className="text-gray-400 hover:text-amber-400 cursor-pointer" size={20} />
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">License & Insurance Information</h4>
              <div className="space-y-3 text-gray-400">
                <div>
                  <p className="font-medium text-white">General Contractor License</p>
                  <p>License #: GC-123456789</p>
                  <p>State of California</p>
                </div>
                <div>
                  <p className="font-medium text-white">Insurance Coverage</p>
                  <p>Fully Licensed & Insured</p>
                  <p>Comprehensive Coverage Available</p>
                </div>
                <div>
                  <p className="font-medium text-white">Certifications</p>
                  <p>OSHA 30-Hour Certified</p>
                  <p>EPA RRP Certified</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BuildCraft Pro. All rights reserved. Licensed & Insured Construction Company.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
