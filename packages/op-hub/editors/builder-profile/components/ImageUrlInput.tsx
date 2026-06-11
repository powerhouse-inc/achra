import { useState, useEffect } from "react";
import { Image as ImageIcon, X } from "lucide-react";
import { Input } from "@achra/ui/input";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageAlt: string;
}

function ImageModal({ isOpen, onClose, imageUrl, imageAlt }: ImageModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  if (!isOpen) return null;

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    setImageLoaded(true);
  };

  const getModalSize = () => {
    if (!imageLoaded) return { width: "auto", height: "auto" };

    const maxWidth = Math.min(
      imageDimensions.width + 100,
      window.innerWidth * 0.8,
    );
    const maxHeight = Math.min(
      imageDimensions.height + 100,
      window.innerHeight * 0.8,
    );

    return {
      width: `${maxWidth}px`,
      height: `${maxHeight}px`,
    };
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-popover rounded-lg shadow-2xl border-2 border-border"
        style={getModalSize()}
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 w-8 h-8 bg-secondary hover:bg-secondary/80 rounded-full flex items-center justify-center text-secondary-foreground transition-all duration-200 shadow-lg"
        >
          <X size={16} />
        </button>
        <div className="w-full h-full flex items-center justify-center p-8">
          <img
            src={imageUrl}
            alt={imageAlt}
            className={`max-w-full max-h-full object-contain rounded-lg ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } transition-opacity duration-200`}
            onClick={(e) => e.stopPropagation()}
            onLoad={handleImageLoad}
          />
        </div>
      </div>
    </div>
  );
}

interface ImageUrlInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ImageUrlInput({
  label,
  value,
  onChange,
  placeholder,
}: ImageUrlInputProps) {
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [value]);

  const handleImageClick = () => {
    if (
      value &&
      !imageError &&
      (value.startsWith("http://") || value.startsWith("https://"))
    ) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`flex-shrink-0 w-12 h-12 bg-muted rounded border flex items-center justify-center overflow-hidden ${
                  value &&
                  !imageError &&
                  (value.startsWith("http://") || value.startsWith("https://"))
                    ? "cursor-pointer hover:opacity-80 transition-opacity duration-200"
                    : ""
                }`}
                onClick={handleImageClick}
              >
                {value &&
                !imageError &&
                (value.startsWith("http://") ||
                  value.startsWith("https://")) ? (
                  <img
                    src={value}
                    alt={`${label} preview`}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                    onLoad={() => setImageError(false)}
                  />
                ) : (
                  <ImageIcon size={24} className="text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground">
                  {imageError && value && (
                    <div className="text-destructive">Failed to load image</div>
                  )}
                  {value &&
                    !imageError &&
                    (value.startsWith("http://") ||
                      value.startsWith("https://")) && (
                      <div className="text-primary">
                        Click image to view full size
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <Input
              className="w-full"
              defaultValue={value || ""}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                if (e.target.value !== value) {
                  onChange(e.target.value);
                }
              }}
              placeholder={placeholder || "Enter image URL"}
            />
          </div>
        </div>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={value}
        imageAlt={`${label} full size`}
      />
    </>
  );
}
