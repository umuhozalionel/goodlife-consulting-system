// components/AboutCharts.tsx
'use client'

import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

interface ChartGridProps {
  bizData: { year: number; investment: number }[]
  traineesData: { category: string; trainees: number; partners: number; impacted: number }[]
  tourismData: { name: string; value: number }[]
  ictData: { year: number; schools: number; internet: number; services: number; startups: number }[]
  COLORS: string[]
}

export default function AboutCharts({
  bizData,
  traineesData,
  tourismData,
  ictData,
  COLORS,
}: ChartGridProps): JSX.Element {
  return (
    <div className="mt-12 p-6 bg-white bg-opacity-10 backdrop-blur-md rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-2">Business Investment (2021–2024)</h4>
          <div role="img" aria-label="Bar chart showing business investments from 2021 to 2024">
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={bizData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis unit="B" />
                <Tooltip formatter={(val) => `${val}B USD`} />
                <Bar dataKey="investment" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-800 mt-2">USD 3.2B commitments in 2024, up 32% since 2023.</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Trainees & Partners Impact</h4>
          <div role="img" aria-label="Stacked bar chart showing trainees, partners, and impacted counts">
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={traineesData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="trainees" fill="#10b981" />
                <Bar dataKey="partners" fill="#f59e0b" />
                <Bar dataKey="impacted" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-800 mt-2">Shows trainees trained, partner orgs, and total impacted per category.</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Tourism Revenue (2024)</h4>
          <div role="img" aria-label="Pie chart showing tourism revenue breakdown">
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={tourismData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                  {tourismData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-800 mt-2">USD 647M total, led by Gorilla Tours at USD 200M.</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">ICT & Innovation (2021–2024)</h4>
          <div role="img" aria-label="Line chart tracking ICT & innovation metrics from 2021 to 2024">
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={ictData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="schools" stroke="#2563EB" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="internet" stroke="#059669" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="services" stroke="#D97706" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="startups" stroke="#B91C1C" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-800 mt-2">Tracks % schools connected, internet penetration, online services, & startups.</p>
        </div>
      </div>
    </div>
  )
}