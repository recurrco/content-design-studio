'use client';

import React, { createContext, useContext, useState } from 'react';
import { Project, Client, BlogContent, ImageOpportunity, SocialStrategy } from './types';
import { mockClients, mockImageOpportunities, mockSocialStrategy } from './mock-data';

interface ProjectContextType {
  project: Project | null;
  clients: Client[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  selectClient: (clientId: string) => void;
  setBlogContent: (content: BlogContent) => void;
  updateOpportunities: (opportunities: ImageOpportunity[]) => void;
  updateOpportunity: (id: string, updates: Partial<ImageOpportunity>) => void;
  generateImages: () => void;
  setSocialStrategy: (strategy: SocialStrategy) => void;
  regenerateImage: (opportunityId: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [project, setProject] = useState<Project | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const clients = mockClients;

  const selectClient = (clientId: string) => {
    setProject({
      id: `project-${Date.now()}`,
      clientId,
      blogContent: { title: '', body: '' },
      opportunities: [],
      currentStep: 1,
      createdAt: new Date(),
      status: 'draft'
    });
  };

  const setBlogContent = (content: BlogContent) => {
    if (!project) return;
    setProject({
      ...project,
      blogContent: content,
      status: 'analyzing'
    });

    // Simulate AI analysis - in real app, this would call Gemini API
    setTimeout(() => {
      setProject(prev => prev ? {
        ...prev,
        opportunities: mockImageOpportunities,
        status: 'review'
      } : null);
    }, 1500);
  };

  const updateOpportunities = (opportunities: ImageOpportunity[]) => {
    if (!project) return;
    setProject({
      ...project,
      opportunities
    });
  };

  const updateOpportunity = (id: string, updates: Partial<ImageOpportunity>) => {
    if (!project) return;
    setProject({
      ...project,
      opportunities: project.opportunities.map(opp =>
        opp.id === id ? { ...opp, ...updates } : opp
      )
    });
  };

  const generateImages = () => {
    if (!project) return;

    // Update all opportunities to generating
    const updatedOpportunities = project.opportunities.map(opp => ({
      ...opp,
      status: 'generating' as const
    }));

    setProject({
      ...project,
      opportunities: updatedOpportunities,
      status: 'generating'
    });

    // Simulate image generation - in real app, this would call Imagen API
    project.opportunities.forEach((opp, index) => {
      setTimeout(() => {
        updateOpportunity(opp.id, {
          status: 'completed',
          generatedUrl: `https://picsum.photos/seed/${opp.id}/800/450`
        });
      }, 2000 + (index * 1000));
    });

    setTimeout(() => {
      setProject(prev => prev ? { ...prev, status: 'completed' } : null);
    }, 2000 + (project.opportunities.length * 1000));
  };

  const setSocialStrategy = (strategy: SocialStrategy) => {
    if (!project) return;
    setProject({
      ...project,
      socialStrategy: strategy
    });
  };

  const regenerateImage = (opportunityId: string) => {
    const opportunity = project?.opportunities.find(o => o.id === opportunityId);
    if (!opportunity) return;

    updateOpportunity(opportunityId, {
      status: 'generating',
      iteration: opportunity.iteration + 1
    });

    setTimeout(() => {
      updateOpportunity(opportunityId, {
        status: 'completed',
        generatedUrl: `https://picsum.photos/seed/${opportunityId}-${Date.now()}/800/450`
      });
    }, 2000);
  };

  return (
    <ProjectContext.Provider value={{
      project,
      clients,
      currentStep,
      setCurrentStep,
      selectClient,
      setBlogContent,
      updateOpportunities,
      updateOpportunity,
      generateImages,
      setSocialStrategy,
      regenerateImage
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within ProjectProvider');
  }
  return context;
}
