'use client';

import { ProjectProvider, useProject } from '@/lib/project-context';
import { Step1Setup } from '@/components/steps/step-1-setup';
import { Step2Opportunities } from '@/components/steps/step-2-opportunities';
import { Step3Review } from '@/components/steps/step-3-review';
import { Step4Social } from '@/components/steps/step-4-social';
import { Separator } from '@/components/ui/separator';

function StepIndicator() {
  const { currentStep } = useProject();

  const steps = [
    { number: 1, label: 'Setup', description: 'Client & Content' },
    { number: 2, label: 'Review', description: 'Image Prompts' },
    { number: 3, label: 'Generate', description: 'Blog Images' },
    { number: 4, label: 'Social', description: 'Distribution' }
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  currentStep === step.number
                    ? 'bg-primary text-primary-foreground'
                    : currentStep > step.number
                    ? 'bg-green-500 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {currentStep > step.number ? '✓' : step.number}
              </div>
              <div className="mt-2 text-center">
                <p className="text-sm font-medium">{step.label}</p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-[2px] bg-muted -mt-8 mx-2">
                <div
                  className={`h-full transition-all ${
                    currentStep > step.number ? 'bg-green-500' : 'bg-muted'
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkflowContent() {
  const { currentStep } = useProject();

  return (
    <>
      <StepIndicator />
      {currentStep === 1 && <Step1Setup />}
      {currentStep === 2 && <Step2Opportunities />}
      {currentStep === 3 && <Step3Review />}
      {currentStep === 4 && <Step4Social />}
    </>
  );
}

export default function Home() {
  return (
    <ProjectProvider>
      <main className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Content Design Studio</h1>
                <p className="text-sm text-muted-foreground">
                  AI-Powered Blog & Social Media Image Generation
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-sm text-muted-foreground hover:text-foreground">
                  Projects
                </button>
                <button className="text-sm text-muted-foreground hover:text-foreground">
                  Settings
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <WorkflowContent />
        </div>

        {/* Footer */}
        <footer className="border-t mt-24">
          <div className="container mx-auto px-4 py-8">
            <p className="text-center text-sm text-muted-foreground">
              Powered by Google Gemini API & Imagen 4
            </p>
          </div>
        </footer>
      </main>
    </ProjectProvider>
  );
}
