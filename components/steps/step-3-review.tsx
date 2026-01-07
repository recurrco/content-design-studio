'use client';

import { useProject } from '@/lib/project-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RefreshCw, Check, Loader2 } from 'lucide-react';
import Image from 'next/image';

export function Step3Review() {
  const { project, regenerateImage, setCurrentStep } = useProject();

  if (!project) return null;

  const completedCount = project.opportunities.filter(o => o.status === 'completed').length;
  const totalCount = project.opportunities.length;
  const progressPercent = (completedCount / totalCount) * 100;
  const allCompleted = completedCount === totalCount;

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'cover': return 'Cover Image';
      case 'in-blog': return 'In-Blog Image';
      case 'og': return 'OG Image';
      default: return type;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'cover': return 'bg-blue-500';
      case 'in-blog': return 'bg-green-500';
      case 'og': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Review Generated Images</h1>
        <p className="text-muted-foreground mt-2">
          AI has generated {totalCount} images for your blog. Review and regenerate if needed.
        </p>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Generation Progress</span>
              <span className="text-muted-foreground">{completedCount} of {totalCount} completed</span>
            </div>
            <Progress value={progressPercent} />
          </div>
        </CardContent>
      </Card>

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.opportunities.map((opportunity, index) => (
          <Card key={opportunity.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getTypeBadgeColor(opportunity.type)}>
                      {getTypeLabel(opportunity.type)}
                    </Badge>
                    {opportunity.iteration > 1 && (
                      <Badge variant="outline">
                        v{opportunity.iteration}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">
                    {opportunity.type === 'cover' && 'Cover Image'}
                    {opportunity.type === 'in-blog' && `In-Blog Image #${index}`}
                    {opportunity.type === 'og' && 'Open Graph Image'}
                  </CardTitle>
                  {opportunity.position && (
                    <CardDescription className="text-xs mt-1">
                      {opportunity.position}
                    </CardDescription>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Image Display */}
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                {opportunity.status === 'generating' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/80 backdrop-blur-sm">
                    <div className="text-center space-y-2">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                      <p className="text-sm font-medium">Generating...</p>
                    </div>
                  </div>
                )}
                {opportunity.status === 'completed' && opportunity.generatedUrl && (
                  <Image
                    src={opportunity.generatedUrl}
                    alt={`Generated ${opportunity.type}`}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Prompt Preview */}
              <div className="bg-muted p-3 rounded text-xs font-mono text-muted-foreground line-clamp-2">
                {opportunity.prompt}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => regenerateImage(opportunity.id)}
                  disabled={opportunity.status === 'generating'}
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Regenerate
                </Button>
                <Button
                  variant={opportunity.status === 'completed' ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1"
                  disabled={opportunity.status !== 'completed'}
                >
                  {opportunity.status === 'completed' ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Accept
                    </>
                  ) : (
                    'Pending'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(2)}
        >
          ← Back to Prompts
        </Button>
        <Button
          onClick={() => setCurrentStep(4)}
          size="lg"
          disabled={!allCompleted}
        >
          {allCompleted ? 'Continue to Social Media →' : 'Waiting for generation...'}
        </Button>
      </div>
    </div>
  );
}
