"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Editor } from "@tiptap/react";
import React, { useState } from "react";

interface YouTubeModalProps {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
}

export const YouTubeModal = ({
  editor,
  isOpen,
  onClose,
}: YouTubeModalProps) => {
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (youtubeUrl.trim()) {
      editor.commands.setYoutubeVideo({ src: youtubeUrl.trim() });
    }
    handleClose();
  };

  const handleClose = () => {
    setYoutubeUrl("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>YouTube Videosu Ekle</DialogTitle>
          <DialogDescription>
            YouTube video linkini yapıştırarak içeriğe ekleyebilirsin.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="youtube-url">YouTube Video URL</Label>
            <Input
              id="youtube-url"
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              autoFocus
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              İptal
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Ekle
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
