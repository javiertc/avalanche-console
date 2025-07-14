"use client"

import React, { useState, useCallback, useMemo, memo } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { navigationItems } from "@/constants/navigation";
import { ExternalLink, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeedbackModal } from "@/components/ui/feedback-modal";
import Image from 'next/image';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = memo(function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  // Memoize navigation items to prevent unnecessary re-renders
  const navigationItemsWithActiveState = useMemo(() => {
    return navigationItems.map(item => ({
      ...item,
      isActive: pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
    }))
  }, [pathname])

  // Memoize callback functions
  const handleFeedbackModalOpen = useCallback(() => {
    setIsFeedbackModalOpen(true)
  }, [])

  const handleFeedbackModalClose = useCallback(() => {
    setIsFeedbackModalOpen(false)
  }, [])

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full">
        {/* Mobile Header */}
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-background/80 backdrop-blur-sm border-b border-border md:hidden">
          <SidebarTrigger className="hover:bg-accent" />
          <ThemeToggle />
        </div>

        <Sidebar>
          <SidebarHeader className="p-6">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer">
              <div className="w-8 h-8 rounded overflow-hidden">
                <Image src="/avalanche-logo.png" alt="Avalanche" width={32} height={32} className="rounded" />
              </div>
              <div>
                <div className="text-label-16 font-semibold text-foreground">Avalanche</div>
                <div className="text-label-12 text-muted-foreground">Developer Console</div>
              </div>
            </Link>
          </SidebarHeader>
          <SidebarContent className="px-4 py-4">
            <SidebarMenu className="space-y-1">
              {navigationItemsWithActiveState.map((item, index) => {
                return (
                  <React.Fragment key={item.name}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          "w-full transition-all duration-200 ease-in-out px-3 py-2 rounded-md hover:bg-accent",
                          item.isActive && "bg-accent text-accent-foreground"
                        )}
                      >
                        <Link 
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 px-2 py-1.5 rounded-md w-full text-label-14 text-muted-foreground hover:text-foreground transition-colors",
                            item.isActive && "text-foreground font-medium"
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    {/* Add separator after API Keys */}
                    {item.name === "API Keys" && (
                      <SidebarSeparator className="my-2" />
                    )}
                  </React.Fragment>
                );
              })}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="px-4 py-4 border-t border-border">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="text-label-12 font-medium text-muted-foreground mb-2">Documentation</div>
                <div className="space-y-1">
                  <a
                    href="https://developers.avacloud.io/data-api/overview"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-2 py-1.5 text-label-12 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Data API
                  </a>
                  <a
                    href="https://developers.avacloud.io/webhooks-api/overview"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-2 py-1.5 text-label-12 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Webhooks API
                  </a>
                  <a
                    href="https://developers.avacloud.io/metrics-api/overview"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-2 py-1.5 text-label-12 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Metrics API
                  </a>
                </div>
              </div>
              
              {/* Share Feedback Button */}
              <Button
                onClick={handleFeedbackModalOpen}
                className="w-full justify-start gap-3 text-button-14 font-medium bg-foreground text-background hover:bg-foreground/90"
              >
                <MessageSquare className="h-4 w-4" />
                Share feedback
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col min-w-0 w-full">
          <div className="flex justify-end items-center px-6 py-4 border-b border-border">
            <ThemeToggle />
          </div>
          <div className="flex-1 flex flex-col w-full">
            <div className="flex-1 w-full">
              {children}
            </div>
          </div>
        </div>
      </div>
      
      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={handleFeedbackModalClose}
      />
    </SidebarProvider>
  );
}) 