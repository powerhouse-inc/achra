import { TextInput, Icon } from "@powerhousedao/document-engineering";
import { useState, useEffect } from "react";

// Image Modal Component
function ImageModal({
  isOpen,
  onClose,
  imageUrl,
  imageAlt,
}: {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageAlt: string;
}) {
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
        className="relative rounded-lg border-2 border-gray-700 bg-gray-900 shadow-2xl"
        style={getModalSize()}
      >
        <button
          onClick={onClose}
          className="absolute -right-3 -top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white shadow-lg transition-all duration-200 hover:bg-gray-900"
        >
          <Icon name="ArrowLeft" size={16} />
        </button>
        <div className="flex h-full w-full items-center justify-center p-8">
          <img
            src={imageUrl}
            alt={imageAlt}
            className={`max-h-full max-w-full rounded-lg object-contain ${
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

function isUrl(value: string): boolean {
  return value.startsWith("http://") || value.startsWith("https://");
}

// Image URL input component with preview — shows only the loaded image, not the URL text
export function ImageUrlInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fileSize?: string;
}) {
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [value]);

  const hasValidImage = value && !imageError && isUrl(value);

  const handleImageClick = () => {
    if (hasValidImage) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="rounded-lg border border-gray-300 p-4">
          <div className="flex items-center space-x-3">
            <div
              className={`flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded border bg-gray-100 ${
                hasValidImage
                  ? "cursor-pointer transition-opacity duration-200 hover:opacity-80"
                  : ""
              }`}
              onClick={handleImageClick}
            >
              {hasValidImage ? (
                <img
                  key={value}
                  src={value}
                  alt={`${label} preview`}
                  className="h-full w-full object-cover"
                  onError={() => setImageError(true)}
                  onLoad={() => setImageError(false)}
                />
              ) : (
                <Icon name="Image" size={24} className="text-gray-400" />
              )}
            </div>
            <div className="min-w-0 flex-1 text-xs text-gray-500">
              {imageError && value && (
                <span className="text-red-500">Failed to load image</span>
              )}
              {hasValidImage && (
                <span className="text-blue-600">
                  Click image to view full size
                </span>
              )}
            </div>
          </div>
          <div className="mt-3">
            <TextInput
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
