import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CopyButton } from './CopyButton';

export interface ApiKey {
  key: string;
  requests: string;
  created: string;
  // Add specific optional properties as needed instead of using index signature
  id?: string;
  name?: string;
  lastUsed?: string;
  status?: 'active' | 'inactive' | 'revoked';
}

interface ApiKeyTableProps {
  keys: ApiKey[];
  className?: string;
  loading?: boolean;
}

export function ApiKeyTable({ keys, className, loading = false }: ApiKeyTableProps) {
  return (
    <div className={`rounded-md border ${className || ''}`}>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[40%] font-medium">Key</TableHead>
            <TableHead className="w-[30%] font-medium">Requests (24h)</TableHead>
            <TableHead className="w-[20%] font-medium">Created</TableHead>
            <TableHead className="w-[10%]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            // Loading skeleton rows
            Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={`loading-${index}`} className="hover:bg-muted/50">
                <TableCell>
                  <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-muted animate-pulse rounded w-1/2"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-muted animate-pulse rounded w-1/3"></div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="h-8 w-8 bg-muted animate-pulse rounded"></div>
                </TableCell>
              </TableRow>
            ))
          ) : keys.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                No API keys found. Create your first API key to get started.
              </TableCell>
            </TableRow>
          ) : (
            keys.map((key, index) => (
              <TableRow key={key.id || index} className="hover:bg-muted/50">
                <TableCell className="font-mono">{key.key}</TableCell>
                <TableCell>{key.requests}</TableCell>
                <TableCell>{key.created}</TableCell>
                <TableCell className="text-right">
                  <CopyButton
                    text={key.key}
                    variant="ghost"
                    size="icon"
                    successMessage={`API key copied!`}
                    aria-label={`Copy API key ${key.key}`}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
} 