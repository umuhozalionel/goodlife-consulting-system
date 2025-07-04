import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Laptop, MessageCircle, Globe } from "lucide-react"

const programs = [
  {
    category: "Leadership & Management",
    icon: Users,
    color: "terracotta",
    programs: ["Business Management", "Project Management", "Leadership Skills", "Time Management"],
    badge: "Popular",
  },
  {
    category: "Corporate Trainings",
    icon: Users,
    color: "forest",
    programs: [
      "Human Resource Managment",
      "HR Strategy",
      "Talent Acquisition",
      "Performance Management",
      "Workplace Ethics",
    ],
    badge: "Growing",
  },
  {
    category: "Digital & Innovation",
    icon: Laptop,
    color: "forest",
    programs: [
      "AI & Report Writing",
      "Digital Literacy",
      "Website Development",
      "Data Analysis (SPSS)",
      "Cybersecurity",
    ],
    badge: "New",
  },
  {
    category: "Communication & Personal Growth",
    icon: MessageCircle,
    color: "terracotta",
    programs: ["Public Speaking", "Communication Skills", "Counseling"],
    badge: null,
  },
  {
    category: "Languages & Social Impact",
    icon: Globe,
    color: "forest",
    programs: ["English", "French", "Kiswahili", "Climate Change", "Financial Literacy"],
    badge: "Comprehensive",
  },
]

export default function TrainingPrograms() {
  return (
    <section id="programs" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Training Programs</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-terracotta-500 to-forest-500 mx-auto rounded-full mb-8" />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive training solutions designed to elevate your professional capabilities and unlock your
            potential in today's competitive landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => {
            const IconComponent = program.icon
            const colorClass = program.color === "terracotta" ? "terracotta" : "forest"

            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${
                      program.color === "terracotta"
                        ? "from-terracotta-500 to-terracotta-600"
                        : "from-forest-500 to-forest-600"
                    } flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CardTitle className="text-lg font-bold text-gray-900 text-center">{program.category}</CardTitle>
                    {program.badge && (
                      <Badge
                        variant="secondary"
                        className={`${
                          program.color === "terracotta"
                            ? "bg-terracotta-100 text-terracotta-800"
                            : "bg-forest-100 text-forest-800"
                        } text-xs`}
                      >
                        {program.badge}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {program.programs.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-gray-600 flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            program.color === "terracotta" ? "bg-terracotta-400" : "bg-forest-400"
                          } mr-3 flex-shrink-0`}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className={`w-full border-2 ${
                      program.color === "terracotta"
                        ? "border-terracotta-200 text-terracotta-700 hover:bg-terracotta-50"
                        : "border-forest-200 text-forest-700 hover:bg-forest-50"
                    } rounded-full font-semibold transition-all duration-300`}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}