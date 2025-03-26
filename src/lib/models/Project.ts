import { v4 as uuidv4 } from 'uuid';

export interface IProject {
  id: string;
  title: string;
  description: string;
  propertyAddress: string;
  propertyCity: string;
  propertyState: string;
  propertyZip: string;
  budget: number;
  timeline: string;
  projectType: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  owner: string; // User ID
  contractor?: string; // User ID
  createdAt: Date;
  updatedAt: Date;
}

// In-memory project storage
const projects: Record<string, IProject> = {};

// Class to handle project operations
class ProjectService {
  // Find projects with optional filters
  static async find(query: any = {}) {
    let filteredProjects = Object.values(projects);
    
    // Apply filters if provided
    if (query.status) {
      filteredProjects = filteredProjects.filter(project => project.status === query.status);
    }
    
    // Sort by createdAt (newest first)
    filteredProjects.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    return filteredProjects;
  }
  
  // Create a new project
  static async create(projectData: Omit<IProject, 'id' | 'createdAt' | 'updatedAt'>): Promise<IProject> {
    const id = uuidv4();
    const now = new Date();
    
    const newProject: IProject = {
      id,
      ...projectData,
      createdAt: now,
      updatedAt: now
    };
    
    projects[id] = newProject;
    return newProject;
  }
  
  // Find project by ID
  static async findById(id: string): Promise<IProject | null> {
    return projects[id] || null;
  }
  
  // Update a project
  static async findByIdAndUpdate(id: string, updateData: Partial<IProject>): Promise<IProject | null> {
    const project = projects[id];
    if (!project) return null;
    
    const updatedProject = {
      ...project,
      ...updateData,
      updatedAt: new Date()
    };
    
    projects[id] = updatedProject;
    return updatedProject;
  }
  
  // Delete a project
  static async findByIdAndDelete(id: string): Promise<boolean> {
    if (!projects[id]) return false;
    
    delete projects[id];
    return true;
  }
  
  // Count documents
  static async countDocuments(query: any = {}): Promise<number> {
    let count = Object.values(projects).length;
    
    if (query.status) {
      count = Object.values(projects).filter(project => project.status === query.status).length;
    }
    
    return count;
  }
}

export default ProjectService; 