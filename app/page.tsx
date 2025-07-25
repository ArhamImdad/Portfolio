"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Download, Send, Linkedin, ExternalLink, Mail, Phone, MapPin, Menu, X } from "lucide-react"

export default function Home() {
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "work", "contact"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real implementation, you would send this data to your backend
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      })

      // Reset form
      setName("")
      setEmail("")
      setMessage("")
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your message couldn't be sent. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col dark">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold gradient-text">
            Arham Imdad
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "home" ? "text-primary" : "text-muted-foreground"}`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "about" ? "text-primary" : "text-muted-foreground"}`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("work")}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "work" ? "text-primary" : "text-muted-foreground"}`}
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "contact" ? "text-primary" : "text-muted-foreground"}`}
            >
              Contact
            </button>
            <Button asChild size="sm">
              <a href="/resume.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute w-full bg-background border-b border-border py-4 px-4 flex flex-col space-y-4">
            <button onClick={() => scrollToSection("home")} className="text-sm font-medium py-2 hover:text-primary">
              Home
            </button>
            <button onClick={() => scrollToSection("about")} className="text-sm font-medium py-2 hover:text-primary">
              About
            </button>
            <button onClick={() => scrollToSection("work")} className="text-sm font-medium py-2 hover:text-primary">
              Work
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-sm font-medium py-2 hover:text-primary">
              Contact
            </button>
            <Button asChild size="sm" className="w-full">
              <a href="/resume.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="flex-1 space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Hi, I'm <span className="gradient-text">Arham Imdad</span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">Software Engineer</h2>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Driven Software Engineer passionate about creating responsive, user-centered web applications that
                  deliver exceptional experiences with 2+ years of development expertise.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button onClick={() => scrollToSection("about")}>Learn More About Me</Button>
                  <Button variant="outline" onClick={() => scrollToSection("contact")}>
                    Get In Touch
                  </Button>
                </div>
              </div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20">
                <Image
                  src="/PIC.jpg"
                  alt="Arham Imdad"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>

              <div className="space-y-6">
                <p className="text-lg">
                  As a driven Software Engineer, I am passionate about creating responsive, user-centered web
                  applications that deliver exceptional experiences. Combining a strong academic foundation with
                  hands-on development expertise, I focus on building impactful, high-performance solutions.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="gradient-border p-6 bg-card">
                    <h3 className="text-xl font-semibold mb-4">Experience</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Junior Software Engineer</h4>
                        <p className="text-sm text-muted-foreground">Crective | 01/2025 - 04/2025</p>
                        <ul className="list-disc list-inside text-sm mt-2 text-muted-foreground">
                          <li>Developed and maintained projects using Next.js, React, and TypeScript</li>
                          <li>Designed responsive UIs with Tailwind CSS, Bootstrap, and ShadCN UI</li>
                          <li>Integrated RESTful APIs for dynamic data fetching and real-time updates</li>
                          <li>Worked on multiple dashboard-based applications with complex UI components</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">Trainee Software Engineer</h4>
                        <p className="text-sm text-muted-foreground">Programmer Force | 09/2024 - 11/2024</p>
                        <ul className="list-disc list-inside text-sm mt-2 text-muted-foreground">
                          <li>Developed projects using HTML & web semantics</li>
                          <li>Built adaptive, engaging layouts with CSS and Bootstrap</li>
                          <li>Advanced in Vue.js with component-based architecture and state management</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">Frontend Developer</h4>
                        <p className="text-sm text-muted-foreground">XStak | 09/2023 - 04/2024</p>
                        <ul className="list-disc list-inside text-sm mt-2 text-muted-foreground">
                          <li>Developed responsive and interactive user interfaces with React.js</li>
                          <li>Implemented project-specific features ensuring cross-platform compatibility</li>
                          <li>Streamlined development using Remix.js framework</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">MERN Developer Intern</h4>
                        <p className="text-sm text-muted-foreground">Ebryx | 07/2023 - 09/2023</p>
                        <ul className="list-disc list-inside text-sm mt-2 text-muted-foreground">
                          <li>Contributed to MERN stack web development projects</li>
                          <li>Gained hands-on experience with MongoDB, Express.js, React.js, and Node.js</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="gradient-border p-6 bg-card">
                    <h3 className="text-xl font-semibold mb-4">Skills & Education</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Technical Skills</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          HTML, CSS, JavaScript, TypeScript, React.js, Next.js, Vue.js, Node.js, Express.js, Python,
                          MongoDB, SQL
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Frameworks & Tools</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Tailwind CSS, Bootstrap, Semantic UI, Git, Visual Studio, VS Code, Google Colab, PyCharm
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Education</h4>
                        <p className="text-sm text-muted-foreground">Bachelor of Science in Computer Science</p>
                        <p className="text-xs text-muted-foreground">
                          National College of Business Administration & Economics, Lahore | 2019 - 2023
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-6">
                  <Button asChild>
                    <a href="/resume.pdf" download>
                      <Download className="mr-2 h-4 w-4" />
                      Download Full Resume
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="work" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">My Projects & Contributions</h2>
                <p className="text-lg text-muted-foreground">
                  Projects I've worked on during my professional journey and personal development.
                </p>
              </div>

              {/* Projects Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {/* Crective Company Project */}
                <div className="group relative overflow-hidden rounded-lg border bg-card">
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <Image
                      src="/ggp.jpg?height=300&width=480&text=Dashboard+Application"
                      alt="Crective Dashboard Project"
                      width={480}
                      height={300}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">Guest Post Application</h3>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 text-center font-medium bg-green-100 text-green-800 rounded-full">
                          Live
                        </span>
                        <Button asChild size="sm">
                          <a
                            href="https://germanguestpost.com/en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Visit
                          </a>
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Developed and maintained complex dashboard applications at Crective using Next.js, React, and
                      TypeScript. Implemented responsive UIs with Tailwind CSS and integrated RESTful APIs for real-time
                      data updates.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        Next.js
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        TypeScript
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        Tailwind CSS
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        ShadCN UI
                      </span>
                    </div>
                  </div>
                </div>

                {/* Programmer Force Training Project */}
                <div className="group relative overflow-hidden rounded-lg border bg-card">
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <Image
                      src="/vue.png?height=300&width=480&text=Vue.js+Application"
                      alt="Vue.js Training Project"
                      width={480}
                      height={300}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">Vue.js Web Application</h3>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          Project
                        </span>
                        <Button asChild variant="outline" size="sm">
                          <a
                            href="https://github.com/TalhahaRana/MI_HRM/tree/dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            Code
                          </a>
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Built responsive web applications during training at Programmer Force. Focused on Vue.js
                      component-based architecture, reactive data binding, and state management with semantic HTML and
                      CSS.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        Vue.js
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        HTML5
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        CSS3
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        Bootstrap
                      </span>
                    </div>
                  </div>
                </div>

                {/* XStak Company Project */}
                <div className="group relative overflow-hidden rounded-lg border bg-card">
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <Image
                      src="/xstak.png?height=300&width=480&text=React+Remix+App"
                      alt="XStak React Project"
                      width={480}
                      height={300}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">React.js Application</h3>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          Live
                        </span>
                        <Button asChild size="sm">
                          <a
                            href="https://apps.shopify.com/partners/xstak"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Visit
                          </a>
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Developed responsive and interactive user interfaces at XStak using React.js and Remix.js
                      framework. Ensured cross-platform compatibility and improved code maintainability through
                      collaborative development.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        React.js
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        Remix.js
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        JavaScript
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">CSS</span>
                    </div>
                  </div>
                </div>

                {/* Ebryx MERN Project */}
                <div className="group relative overflow-hidden rounded-lg border bg-card">
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <Image
                      src="/stack.webp?height=300&width=480&text=MERN+Stack+App"
                      alt="Ebryx MERN Project"
                      width={480}
                      height={300}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">MERN Stack Application</h3>
                      <div className="flex gap-2">
                        {/* <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                          Internship
                        </span> */}
                        <Button asChild size="sm">
                          <a
                            href="https://www.ebryx.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Company
                          </a>
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Contributed to full-stack web development projects during internship at Ebryx. Gained hands-on
                      experience with MongoDB, Express.js, React.js, and Node.js while building user-focused web
                      solutions.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        MongoDB
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        Express.js
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        React.js
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        Node.js
                      </span>
                    </div>
                  </div>
                </div>

                {/* Personal Learning Project */}
                <div className="group relative overflow-hidden rounded-lg border bg-card">
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <Image
                      src="/placeholder.svg?height=300&width=480&text=Personal+Project"
                      alt="Personal Learning Project"
                      width={480}
                      height={300}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">Portfolio Website</h3>
                      <div className="flex gap-2">
                        <Button asChild variant="outline" size="sm">
                          <a
                            href="https://github.com/arham-imdad"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            Code
                          </a>
                        </Button>
                        <Button asChild size="sm">
                          <a href="#" className="flex items-center">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Live
                          </a>
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Personal portfolio website built with Next.js and TypeScript. Showcases my skills, experience, and
                      projects with responsive design and modern UI components.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        Next.js
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        TypeScript
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        Tailwind CSS
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        ShadCN UI
                      </span>
                    </div>
                  </div>
                </div>

                {/* Future Projects Placeholder */}
                <div className="group relative overflow-hidden rounded-lg border bg-card border-dashed">
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted/50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-muted-foreground">More projects coming soon</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Upcoming Projects</h3>
                    <p className="text-muted-foreground mb-4">
                      Currently working on new exciting projects using modern technologies. Stay tuned for updates!
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                        In Development
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills & Technologies */}
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-8">Technologies I Work With</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-lg bg-card border border-border">
                    <h4 className="font-semibold mb-2">Frontend Development</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Building responsive and interactive user interfaces with modern frameworks.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">React.js</span>
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Next.js</span>
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Vue.js</span>
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">TypeScript</span>
                    </div>
                  </div>
                  <div className="p-6 rounded-lg bg-card border border-border">
                    <h4 className="font-semibold mb-2">Backend Development</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Developing robust server-side applications and APIs.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Node.js</span>
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Express.js</span>
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">MongoDB</span>
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">SQL</span>
                    </div>
                  </div>
                  <div className="p-6 rounded-lg bg-card border border-border">
                    <h4 className="font-semibold mb-2">Tools & Styling</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Using modern tools and frameworks for efficient development.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">Tailwind CSS</span>
                      <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">Git</span>
                      <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">VS Code</span>
                      <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">Bootstrap</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button asChild size="lg">
                    <a
                      href="https://github.com/arham-imdad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <ExternalLink className="mr-2 h-5 w-5" />
                      View All Projects on GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-3 text-primary" />
                      <a href="mailto:arham.imdad14@gmail.com" className="text-muted-foreground hover:text-primary">
                        arham.imdad14@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-3 text-primary" />
                      <a href="tel:+923364207476" className="text-muted-foreground hover:text-primary">
                        +92 336 420 7476
                      </a>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-3 text-primary" />
                      <span className="text-muted-foreground">Lahore, Pakistan</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mt-8 mb-6">Connect With Me</h3>
                  <div className="flex space-x-4">
                    <Button asChild variant="outline" size="icon">
                      <a
                        href="https://www.linkedin.com/in/arham-imdad-b1a799190"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn Profile"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="icon">
                      <a
                        href="https://github.com/arham-imdad"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Profile"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="icon">
                      <a href="mailto:arham.imdad14@gmail.com" aria-label="Email">
                        <Mail className="h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="gradient-border p-6 bg-card">
                  <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Name
                      </label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Your message"
                        rows={4}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Arham Imdad. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="https://www.linkedin.com/in/arham-imdad-b1a799190"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/arham-imdad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                GitHub
              </a>
              <a href="mailto:arham.imdad14@gmail.com" className="text-muted-foreground hover:text-primary">
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
