import { useState } from "react";
import { Input } from "@achra/ui/input";
import { Link2, Plus, Check, X, Pencil, Trash2 } from "lucide-react";
import { generateId } from "document-model/core";
import type { BuilderLink } from "document-models/builder-profile";

interface LinksSectionProps {
  links: BuilderLink[];
  onAddLink: (link: { id: string; url: string; label?: string }) => void;
  onEditLink: (link: { id: string; url: string; label?: string }) => void;
  onRemoveLink: (id: string) => void;
}

// Helper to get favicon URL
const getFaviconUrl = (url: string) => {
  try {
    const hostname = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;
  } catch {
    return null;
  }
};

export function LinksSection({
  links,
  onAddLink,
  onEditLink,
  onRemoveLink,
}: LinksSectionProps) {
  const [newUrl, setNewUrl] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState("");
  const [editLabel, setEditLabel] = useState("");

  const handleAddLink = () => {
    if (newUrl.trim()) {
      onAddLink({
        id: generateId(),
        url: newUrl.trim(),
        label: newLabel.trim() || undefined,
      });
      setNewUrl("");
      setNewLabel("");
    }
  };

  const handleStartEdit = (link: BuilderLink) => {
    setEditingId(link.id);
    setEditUrl(link.url);
    setEditLabel(link.label || "");
  };

  const handleSaveEdit = () => {
    if (editingId && editUrl.trim()) {
      onEditLink({
        id: editingId,
        url: editUrl.trim(),
        label: editLabel.trim() || undefined,
      });
      setEditingId(null);
      setEditUrl("");
      setEditLabel("");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditUrl("");
    setEditLabel("");
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
          <Link2 size={18} className="text-muted-foreground" />
        </span>
        Links
      </h3>
      <p className="text-sm text-muted-foreground mb-5">
        Add links to your portfolio, social profiles, or other relevant pages
      </p>

      {/* Current Links */}
      {links.length > 0 && (
        <div className="space-y-2 mb-5">
          {links.map((link) => (
            <div
              key={link.id}
              className={`group flex items-center gap-3 p-3 rounded-xl border transition-all ${
                editingId === link.id
                  ? "bg-muted border-input"
                  : "bg-card border-border hover:border-input hover:shadow-sm"
              }`}
            >
              {editingId === link.id ? (
                <>
                  <div className="flex-1 space-y-2">
                    <Input
                      className="w-full bg-background"
                      value={editUrl}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEditUrl(e.target.value)
                      }
                      placeholder="https://example.com"
                    />
                    <Input
                      className="w-full bg-background"
                      value={editLabel}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEditLabel(e.target.value)
                      }
                      placeholder="Display label (optional)"
                    />
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={handleSaveEdit}
                      className="p-2.5 rounded-xl bg-status-success/20 hover:bg-status-success/30 text-status-success transition-colors"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="p-2.5 rounded-xl hover:bg-muted text-muted-foreground transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Favicon */}
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {getFaviconUrl(link.url) ? (
                      <img
                        src={getFaviconUrl(link.url) || ""}
                        alt=""
                        className="w-4 h-4"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <Link2 size={14} className="text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate text-sm">
                      {link.label ||
                        (() => {
                          try {
                            return new URL(link.url).hostname;
                          } catch {
                            return link.url;
                          }
                        })()}
                    </p>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-primary truncate block transition-colors"
                    >
                      {link.url}
                    </a>
                  </div>

                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(link)}
                      className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      title="Edit link"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveLink(link.id)}
                      className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      title="Remove link"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {links.length === 0 && (
        <div className="text-center py-8 mb-5 rounded-xl bg-muted border-2 border-dashed border-border">
          <Link2 size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground text-sm">No links added yet</p>
          <p className="text-muted-foreground text-xs mt-1">
            Add links to your portfolio, GitHub, or social profiles
          </p>
        </div>
      )}

      {/* Add Link Form */}
      <div className="bg-muted rounded-xl p-4 border border-border">
        <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
          <Plus size={14} className="text-muted-foreground" />
          Add New Link
        </p>
        <div className="space-y-3">
          <Input
            className="w-full bg-background"
            value={newUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewUrl(e.target.value)
            }
            placeholder="https://github.com/username"
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter" && newUrl.trim()) handleAddLink();
            }}
          />
          <div className="flex gap-2">
            <Input
              className="flex-1 bg-background"
              value={newLabel}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewLabel(e.target.value)
              }
              placeholder="Display label (optional)"
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter" && newUrl.trim()) handleAddLink();
              }}
            />
            <button
              type="button"
              onClick={handleAddLink}
              disabled={!newUrl.trim()}
              className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Plus size={14} />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
