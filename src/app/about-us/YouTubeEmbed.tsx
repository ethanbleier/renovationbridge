import React from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  startTime?: number;
  'aria-label'?: string;
}

export default function YouTubeEmbed({ 
  videoId, 
  startTime = 0,
  'aria-label': ariaLabel = 'YouTube video player'
}: YouTubeEmbedProps) {
  return (
    <div className="relative w-full aspect-video" role="region" aria-label={ariaLabel}>
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${videoId}?controls=1&start=${startTime}&autoplay=1&mute=1&loop=1&playlist=${videoId}&cc_load_policy=1&cc_lang_pref=en`}
        title={ariaLabel}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
} 