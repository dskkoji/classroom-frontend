import { Subject } from '@/types'

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    department: "CS",
    description: "An introduction cource cover",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    code: "MATH201",
    name: "Calculus II",
    department: "Math",
    description: "Advanced study of integration, sequences, series, and power...",
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    code: "ENG102",
    name: "Literature anc Composition",
    department: "English",
    description: "A cource focused on critical reading and writing through...",
    createdAt: new Date().toISOString()
  }
]