"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import NetworkBackground from "@/components/network-background"
import Header from "@/components/header"
import ProjectCard from "@/components/project-card"
import { projects, type Project } from "@/lib/data"

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([])
  const [displayCount, setDisplayCount] = useState<number>(12)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Filter projects based on selected project and search query
  useEffect(() => {
    let filtered = [...projects]

    if (selectedProject !== "all") {
      filtered = filtered.filter((project) => project.category === selectedProject)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (project) => project.title.toLowerCase().includes(query) || project.description.toLowerCase().includes(query),
      )
    }

    setVisibleProjects(filtered)
  }, [selectedProject, searchQuery])

  // Handle infinite scroll
  const loadMoreProjects = () => {
    setIsLoading(true)
    // Simulate loading delay
    setTimeout(() => {
      setDisplayCount((prev) => prev + 8)
      setIsLoading(false)
    }, 800)
  }

  // Detect when user scrolls near bottom
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading) {
        loadMoreProjects()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isLoading])

  // Get unique project categories
  const categories = ["all", ...Array.from(new Set(projects.map((project) => project.category)))]

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a1a2f] via-[#0c2240] to-[#0a1a2f] relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 opacity-20">
        <NetworkBackground />
      </div>

      <div className="relative z-10">
        <Header />

        <div className="container mx-auto px-4 py-8">
          {/* Filters */}
          <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedProject(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedProject === category
                      ? "bg-[#2a9ed9] text-white"
                      : "bg-slate-800/50 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5bbddf]/50"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleProjects.slice(0, displayCount).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center mt-8">
              <div className="w-8 h-8 border-4 border-[#5bbddf] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* No results message */}
          {visibleProjects.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl text-white font-medium">No projects found</h3>
              <p className="text-slate-400 mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* End of results */}
          {!isLoading && visibleProjects.length <= displayCount && visibleProjects.length > 0 && (
            <div className="text-center text-slate-400 mt-12 pb-8">
              <p>You've reached the end of the projects</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
