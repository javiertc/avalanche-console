"use client"

import React, { memo, useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { copyToClipboard } from '@/lib/utils';
import { CopyButton } from './CopyButton';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from "next-themes";

// Import only the languages we need for better performance
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import go from 'react-syntax-highlighter/dist/esm/languages/prism/go';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';

// Register languages
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('go', go);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('json', json);

// Custom theme that adapts to light/dark mode
const customDarkTheme = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: 'transparent',
  },
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    background: 'transparent',
  }
};

const customLightTheme = {
  ...oneLight,
  'pre[class*="language-"]': {
    ...oneLight['pre[class*="language-"]'],
    background: 'transparent',
  },
  'code[class*="language-"]': {
    ...oneLight['code[class*="language-"]'],
    background: 'transparent',
  }
};

export interface CodeExample {
  title: string;
  install?: string;
  installDescription?: string;
  code: string;
  description?: string;
  language?: string;
}

export interface CodeExampleTabsProps {
  title?: string;
  subtitle?: string;
  examples: Record<string, CodeExample>;
  defaultTab?: string;
  className?: string;
  showCard?: boolean;
  onTabChange?: (tab: string) => void;
}

/**
 * Reusable component for displaying code examples in tabs
 * Based on the Data API page design pattern
 */
export const CodeExampleTabs = memo(function CodeExampleTabs({
  title,
  subtitle,
  examples,
  defaultTab,
  className = '',
  showCard = false,
  onTabChange
}: CodeExampleTabsProps) {
  const tabs = Object.keys(examples);
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before using theme to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use resolved theme to get actual theme value, fallback to light during SSR
  const syntaxTheme = mounted && resolvedTheme === 'dark' ? customDarkTheme : customLightTheme;

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onTabChange?.(value);
  };

  const content = (
    <>
      {/* Header - only if title provided and not using card wrapper */}
      {!showCard && (title || subtitle) && (
        <div className="space-y-1 mb-4">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      )}

      {/* Tabs Container */}
      <div className="rounded-md border overflow-hidden">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          {/* Tab List with Data API styling */}
          <TabsList className="w-full justify-start rounded-none border-b bg-muted/50 p-0">
            {tabs.map((key) => (
              <TabsTrigger
                key={key}
                value={key}
                className="rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-muted-foreground hover:text-foreground data-[state=active]:bg-background data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                {examples[key].title}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Content */}
          {tabs.map((key) => {
            const example = examples[key];
            return (
              <TabsContent key={key} value={key} className="p-4">
                <div className="space-y-4">
                  {/* Installation Command */}
                  {example.install && (
                    <div>
                      {example.installDescription && (
                        <p className="mb-2 text-sm text-muted-foreground">
                          {example.installDescription}
                        </p>
                      )}
                      <div className="relative">
                        <SyntaxHighlighter
                          language="bash"
                          style={syntaxTheme}
                          customStyle={{
                            margin: 0,
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                          }}
                          className="!bg-muted"
                        >
                          {example.install}
                        </SyntaxHighlighter>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 hover:bg-background/80"
                          onClick={() => copyToClipboard(example.install!)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Code Example */}
                  <div>
                    {example.description && (
                      <p className="mb-2 text-sm text-muted-foreground">
                        {example.description}
                      </p>
                    )}
                    <div className="relative group">
                      <div className="syntax-highlighter-wrapper">
                        <SyntaxHighlighter
                          language={example.language || 'javascript'}
                          style={syntaxTheme}
                          customStyle={{
                            margin: 0,
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                            backgroundColor: 'transparent',
                          }}
                          className="!bg-muted dark:!bg-muted/50"
                          showLineNumbers={false}
                          wrapLines={true}
                          lineProps={{
                            style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' }
                          }}
                        >
                          {example.code}
                        </SyntaxHighlighter>
                      </div>
                      <CopyButton
                        text={example.code}
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background/80"
                        successMessage="Code copied!"
                        aria-label={`Copy ${example.title} code to clipboard`}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </>
  );

  // Optionally wrap in a card
  if (showCard) {
    return (
      <Card className={className}>
        {(title || subtitle) && (
          <CardHeader className="pb-3">
            {title && <CardTitle className="text-base">{title}</CardTitle>}
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
          </CardHeader>
        )}
        <CardContent>{content}</CardContent>
      </Card>
    );
  }

  return <div className={className}>{content}</div>;
});

/**
 * Preset configurations for common use cases
 */
export const codeExamplePresets = {
  // Convert existing code examples to the new format
  dataApi: (examples: any) => ({
    javascript: {
      title: "Javascript SDK",
      install: "npm install @avalanche-sdk/sdk",
      installDescription: "First, initialize a Node.js project, then install the Avalanche SDK.",
      code: examples.javascript?.code || '',
      description: "Add the following code to a JavaScript file in your project. Execute it in your terminal with 'node yourFile.js' to retrieve the balance.",
      language: 'javascript'
    },
    python: {
      title: "Python SDK",
      install: "pip install avalanche-sdk-python",
      installDescription: "First, install the Avalanche SDK using pip.",
      code: examples.python?.code || '',
      description: "Add the following code to a Python file and run it to retrieve the balance.",
      language: 'python'
    },
    go: {
      title: "Go SDK",
      install: "go get github.com/ava-labs/avalanchego/sdk",
      installDescription: "First, initialize a Go module and install the Avalanche SDK.",
      code: examples.go?.code || '',
      description: "Create a new Go file with the following code to retrieve the balance.",
      language: 'go'
    },
    curl: {
      title: "Curl",
      code: examples.curl?.code || '',
      description: "Use curl to directly interact with the API endpoints. Remember to replace YOUR_API_KEY with your actual API key.",
      language: 'bash'
    }
  }),

  metricsApi: (examples: any) => {
    const result: Record<string, CodeExample> = {};
    Object.entries(examples).forEach(([key, value]: [string, any]) => {
      // Use the language from the example if provided, otherwise map based on key
      let language = value.language || key;
      
      // Map common key names to proper language identifiers
      if (key === 'curl') language = 'bash';
      if (key === 'node' || key === 'nodejs') language = 'javascript';
      
      result[key] = {
        title: value.title,
        code: value.code,
        language
      };
    });
    return result;
  },

  faucet: (snippets: any) => {
    const result: Record<string, CodeExample> = {};
    Object.entries(snippets).forEach(([key, value]: [string, any]) => {
      result[key] = {
        title: key,
        install: value.install,
        installDescription: "First, initialize a Node.js project, then install the Avalanche SDK.",
        code: value.code,
        description: "Add the following code to a JavaScript file in your project. Execute it in your terminal with 'node yourFile.js' to retrieve the balance.",
        language: 'javascript'
      };
    });
    return result;
  }
}; 