'use client';

import { useState } from 'react';
import { useProject } from '@/lib/project-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { sampleBlogContent } from '@/lib/mock-data';

export function Step1Setup() {
  const { project, clients, selectClient, setBlogContent, setCurrentStep } = useProject();
  const [selectedClientId, setSelectedClientId] = useState('');
  const [title, setTitle] = useState('The Future of Remote Work in 2026');
  const [metaDescription, setMetaDescription] = useState('Explore the latest trends and innovations shaping remote work in 2026');
  const [body, setBody] = useState(sampleBlogContent);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const selectedClient = clients.find(c => c.id === selectedClientId);

  const handleClientSelect = (clientId: string) => {
    setSelectedClientId(clientId);
    selectClient(clientId);
  };

  const handleGetStarted = () => {
    setBlogContent({ title, metaDescription, body });
    setIsAnalyzing(true);

    // Wait for mock analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setCurrentStep(2);
    }, 1500);
  };

  const isFormValid = selectedClientId && title && body;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Design Project</h1>
        <p className="text-muted-foreground mt-2">
          Create a new project by selecting a client and uploading your blog content
        </p>
      </div>

      {/* Client Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Client</CardTitle>
          <CardDescription>
            Choose the client you're creating content for
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedClientId} onValueChange={handleClientSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select a client..." />
            </SelectTrigger>
            <SelectContent>
              {clients.map(client => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Brand Info Preview */}
          {selectedClient && (
            <div className="mt-6 p-4 bg-muted rounded-lg space-y-3">
              <div>
                <p className="text-sm font-medium mb-2">Brand Colors</p>
                <div className="flex gap-2">
                  {selectedClient.brandColors.map((color, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded border"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs text-muted-foreground">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Brand Style</p>
                <p className="text-sm text-muted-foreground">{selectedClient.brandStyle}</p>
              </div>
              <div>
                <Badge variant="outline" className="text-xs">
                  ✓ Brand guidelines loaded
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Blog Content */}
      <Card>
        <CardHeader>
          <CardTitle>Blog Content</CardTitle>
          <CardDescription>
            Enter the blog details below or paste your content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Blog Title</Label>
            <Input
              id="title"
              placeholder="Enter blog title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="meta">Meta Description (Optional)</Label>
            <Input
              id="meta"
              placeholder="Brief description for SEO..."
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Blog Body</Label>
            <Textarea
              id="body"
              placeholder="Paste your blog content here..."
              className="min-h-[300px] font-mono text-sm"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              {body.split(' ').filter(w => w).length} words
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" disabled>
          Cancel
        </Button>
        <Button
          onClick={handleGetStarted}
          disabled={!isFormValid || isAnalyzing}
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <span className="animate-pulse">Analyzing content...</span>
            </>
          ) : (
            'Get Started →'
          )}
        </Button>
      </div>
    </div>
  );
}
