import React from 'react';
import { CopyButton } from './CopyButton';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from "next-themes";

// Import languages for CodeSnippet
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

// Custom themes matching CodeExampleTabs
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

interface CodeSnippetProps {
  code: string;
  language?: string;
  title?: string;
  description?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeSnippet({
  code,
  language = 'typescript',
  title,
  description,
  className = '',
  showLineNumbers = false
}: CodeSnippetProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Ensure component is mounted before using theme to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Use resolved theme to get actual theme value, fallback to light during SSR
  const syntaxTheme = mounted && resolvedTheme === 'dark' ? customDarkTheme : customLightTheme;

  return (
    <div className={`space-y-3 ${className}`}>
      {(title || description) && (
        <div className="space-y-1">
          {title && <h4 className="text-sm font-medium">{title}</h4>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      
      <div className="relative group">
        <div className="syntax-highlighter-wrapper">
          <SyntaxHighlighter
            language={language}
            style={syntaxTheme}
            customStyle={{
              margin: 0,
              padding: '1rem',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              backgroundColor: 'transparent',
            }}
            className="!bg-muted dark:!bg-muted/50"
            showLineNumbers={showLineNumbers}
            wrapLines={true}
            lineProps={{
              style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' }
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
        <CopyButton
          text={code}
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          successMessage="Code copied!"
          aria-label="Copy code to clipboard"
        />
      </div>
    </div>
  );
} 