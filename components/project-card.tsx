"use client"

import Image from "next/image"
import { useState } from "react"
import { ExternalLink } from "lucide-react"
import type { Project } from "@/lib/data"

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative bg-slate-800/30 rounded-xl overflow-hidden border border-slate-700/50 transition-all duration-300 hover:border-[#5bbddf]/30 hover:shadow-lg hover:shadow-[#5bbddf]/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={600}
          height={340}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        ></div>

        <div
          className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 ${isHovered ? "translate-y-0" : "translate-y-full"}`}
        >
          <h3 className="text-lg font-bold text-white">{project.title}</h3>
          <p className="text-sm text-slate-300 mt-1 line-clamp-2">{project.description}</p>

          <div className="flex items-center justify-between mt-3">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#2a9ed9]/20 text-[#5bbddf]">
              {project.category}
            </span>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-medium text-white bg-[#2a9ed9] hover:bg-[#0055a4] px-3 py-1 rounded-full transition-colors"
            >
              View <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
