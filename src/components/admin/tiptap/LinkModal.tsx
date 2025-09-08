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
import React, { useEffect, useState } from "react";

interface LinkModalProps {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
}

export const LinkModal = ({ editor, isOpen, onClose }: LinkModalProps) => {
  const [linkUrl, setLinkUrl] = useState("");

  useEffect(() => {
    if (isOpen) {
      // Get current link if exists
      const { href } = editor.getAttributes("link");
      if (href) {
        setLinkUrl(href);
      }
    }
  }, [isOpen, editor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (linkUrl.trim()) {
      editor.chain().focus().setLink({ href: linkUrl.trim() }).run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
    handleClose();
  };

  const handleClose = () => {
    setLinkUrl("");
    onClose();
  };

  const handleRemoveLink = () => {
    editor.chain().focus().unsetLink().run();
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Link Ekle/Düzenle</DialogTitle>
          <DialogDescription>
            Metne link ekleyebilir veya mevcut linki düzenleyebilirsin.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="link-url">URL</Label>
            <Input
              id="link-url"
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              autoFocus
            />
          </div>

          <DialogFooter className="flex justify-between">
            {editor.isActive("link") && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemoveLink}
              >
                Linki Kaldır
              </Button>
            )}
            <div className="flex gap-2 ml-auto">
              <Button type="button" variant="outline" onClick={handleClose}>
                İptal
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Kaydet
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
