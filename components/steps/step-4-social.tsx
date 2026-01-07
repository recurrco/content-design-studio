'use client';

import { useState, useEffect } from 'react';
import { useProject } from '@/lib/project-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Download, Loader2, Check } from 'lucide-react';
import { mockSocialStrategy } from '@/lib/mock-data';
import Image from 'next/image';

export function Step4Social() {
  const { project, setSocialStrategy, setCurrentStep } = useProject();
  const [selectedFormat, setSelectedFormat] = useState<'carousel' | 'infographic' | 'static'>('carousel');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSlides, setGeneratedSlides] = useState<any[]>([]);

  useEffect(() => {
    if (project && !project.socialStrategy) {
      setSocialStrategy(mockSocialStrategy);
    }
  }, [project, setSocialStrategy]);

  if (!project) return null;

  const handleGenerate = () => {
    setIsGenerating(true);

    // Simulate generation
    const strategy = selectedFormat === 'carousel' ? mockSocialStrategy : {
      ...mockSocialStrategy,
      format: selectedFormat,
      slides: selectedFormat === 'static' ? [mockSocialStrategy.slides![0]] : mockSocialStrategy.slides
    };

    setSocialStrategy(strategy);

    // Simulate image generation for social
    strategy.slides?.forEach((slide, index) => {
      setTimeout(() => {
        setGeneratedSlides(prev => [...prev, {
          ...slide,
          status: 'completed',
          generatedUrl: `https://picsum.photos/seed/social-${index}/1080/1080`
        }]);
      }, 1000 + (index * 800));
    });

    setTimeout(() => {
      setIsGenerating(false);
    }, 1000 + ((strategy.slides?.length || 0) * 800));
  };

  const allGenerated = generatedSlides.length === (mockSocialStrategy.slides?.length || 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Social Media Distribution</h1>
        <p className="text-muted-foreground mt-2">
          Choose the best format to distribute your content on social media
        </p>
      </div>

      {/* Format Selection */}
      {!isGenerating && generatedSlides.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recommended Format</CardTitle>
            <CardDescription>
              AI has analyzed your content and recommends the best social media format
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🎯</div>
                <div>
                  <p className="font-medium mb-1">AI Recommendation: Carousel</p>
                  <p className="text-sm text-muted-foreground">
                    {mockSocialStrategy.rationale}
                  </p>
                </div>
              </div>
            </div>

            <RadioGroup value={selectedFormat} onValueChange={(value: any) => setSelectedFormat(value)}>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                  <RadioGroupItem value="carousel" id="carousel" />
                  <Label htmlFor="carousel" className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">Carousel (6 slides)</p>
                      <p className="text-sm text-muted-foreground">Multiple slides for step-by-step content</p>
                    </div>
                  </Label>
                  <Badge>Recommended</Badge>
                </div>

                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                  <RadioGroupItem value="infographic" id="infographic" />
                  <Label htmlFor="infographic" className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">Infographic (single image)</p>
                      <p className="text-sm text-muted-foreground">All information in one visual</p>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                  <RadioGroupItem value="static" id="static" />
                  <Label htmlFor="static" className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">Static Post (single image)</p>
                      <p className="text-sm text-muted-foreground">Simple, eye-catching single image</p>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>

            <Button onClick={handleGenerate} size="lg" className="w-full">
              Generate Social Media Images
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Generating State */}
      {isGenerating && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
              <div>
                <p className="font-medium">Generating {selectedFormat} images...</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {generatedSlides.length} of {mockSocialStrategy.slides?.length} completed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generated Social Images */}
      {generatedSlides.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Social Media Images</CardTitle>
            <CardDescription>
              Review your {selectedFormat} images
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {generatedSlides.map((slide, index) => (
                <div key={slide.id} className="space-y-2">
                  <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                    {slide.generatedUrl && (
                      <Image
                        src={slide.generatedUrl}
                        alt={`Social slide ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    )}
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-black/60 text-white">
                        {index === 0 ? 'Cover' : `Slide ${index + 1}`}
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Check className="h-5 w-5 text-green-500 bg-white rounded-full p-0.5" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 font-mono">
                    {slide.prompt}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Card */}
      {allGenerated && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl">✅</div>
              <div className="flex-1">
                <p className="font-medium">All Images Generated Successfully!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your blog is ready with {project.opportunities.length} in-blog images and {generatedSlides.length} social media images.
                </p>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download All
                  </Button>
                  <Button variant="outline" size="sm">
                    Save Project
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(3)}
        >
          ← Back to Blog Images
        </Button>
        <Button
          size="lg"
          disabled={!allGenerated}
        >
          {allGenerated ? 'Finish Project ✓' : 'Generating...'}
        </Button>
      </div>
    </div>
  );
}
