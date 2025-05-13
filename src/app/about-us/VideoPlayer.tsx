import React, { VideoHTMLAttributes } from 'react';

interface VideoPlayerProps extends VideoHTMLAttributes<HTMLVideoElement> {
  captionsSrc?: string;
  captionsLabel?: string;
}

export default function VideoPlayer({ 
  captionsSrc,
  captionsLabel = 'English captions',
  ...props 
}: VideoPlayerProps) {
  return (
    <div className="relative w-full h-full">
      <video
        {...props}
        preload="metadata"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        aria-label={props['aria-label'] || 'Featured video about Renovation Bridge'}
      >
        {captionsSrc && (
          <track
            kind="captions"
            src={captionsSrc}
            srcLang="en"
            label={captionsLabel}
            default
          />
        )}
        {props.children}
      </video>
    </div>
  );
}