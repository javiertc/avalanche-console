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
  status?: 'active' | 'inactive';
}

interface ApiKeyTableProps {
  keys: ApiKey[];
  className?: string;
}

export function ApiKeyTable({ keys, className }: ApiKeyTableProps) {
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
          {keys.map((key, index) => (
            <TableRow key={index} className="hover:bg-muted/50">
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 