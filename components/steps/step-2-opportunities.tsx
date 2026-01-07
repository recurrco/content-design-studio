'use client';

import { useState } from 'react';
import { useProject } from '@/lib/project-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Pencil, Check } from 'lucide-react';

export function Step2Opportunities() {
  const { project, updateOpportunity, generateImages, setCurrentStep } = useProject();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState('');

  if (!project) return null;

  const handleEditStart = (id: string, currentPrompt: string) => {
    setEditingId(id);
    setEditPrompt(currentPrompt);
  };

  const handleEditSave = (id: string) => {
    updateOpportunity(id, { prompt: editPrompt });
    setEditingId(null);
  };

  const handleGenerateImages = () => {
    generateImages();
    setCurrentStep(3);
  };

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
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Review Image Opportunities</h1>
        <p className="text-muted-foreground mt-2">
          AI has identified {project.opportunities.length} image opportunities. Review and edit the prompts before generating images.
        </p>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {project.opportunities.map((opportunity, index) => (
          <Card key={opportunity.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getTypeBadgeColor(opportunity.type)}>
                      {getTypeLabel(opportunity.type)}
                    </Badge>
                    <Badge variant="outline">{opportunity.aspectRatio}</Badge>
                  </div>
                  <CardTitle className="text-lg">
                    {opportunity.type === 'cover' && 'Cover Image'}
                    {opportunity.type === 'in-blog' && `In-Blog Image #${index}`}
                    {opportunity.type === 'og' && 'Open Graph Image'}
                  </CardTitle>
                  {opportunity.position && (
                    <CardDescription className="mt-1">
                      📍 {opportunity.position}
                    </CardDescription>
                  )}
                </div>
                <div>
                  {editingId === opportunity.id ? (
                    <Button
                      size="sm"
                      onClick={() => handleEditSave(opportunity.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditStart(opportunity.id, opportunity.prompt)}
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit Prompt
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {editingId === opportunity.id ? (
                <Textarea
                  value={editPrompt}
                  onChange={(e) => setEditPrompt(e.target.value)}
                  className="min-h-[120px] font-mono text-sm"
                  placeholder="Edit the image generation prompt..."
                />
              ) : (
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-mono">{opportunity.prompt}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div>
              <p className="font-medium">AI-Generated Prompts</p>
              <p className="text-sm text-muted-foreground mt-1">
                These prompts have been automatically generated based on your blog content and client brand guidelines.
                Feel free to edit them to better match your vision before generating images.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(1)}
        >
          ← Back
        </Button>
        <Button
          onClick={handleGenerateImages}
          size="lg"
        >
          Generate Images →
        </Button>
      </div>
    </div>
  );
}
