import React, { useState } from 'react';
import { Video, ExternalLink, Play, Loader2 } from 'lucide-react';
import { useYouTubeVideos } from '../hooks/useYouTubeVideos';
import { YOUTUBE_CHANNEL } from '../constants';

const Videos: React.FC = () => {
  const { videos, loading, error } = useYouTubeVideos();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12 animate-fadeIn">
      {/* Header */}
      <header className="mb-8 md:mb-12 border-b border-red-200 pb-6 md:pb-8">
        <div className="flex items-center gap-3 mb-4">
          <Video size={32} className="text-red-500" />
          <h1 className="serif-font text-3xl md:text-4xl text-slate-900">Videos</h1>
        </div>
        <p className="text-lg md:text-xl text-slate-500 font-light italic">
          Visual explorations of the theory
        </p>
        <p className="text-sm md:text-base text-slate-400 mt-4 max-w-2xl leading-relaxed">
          Video presentations, lectures, and discussions exploring the Convergent Autophagic
          Collapse framework and its implications for understanding neurodegeneration.
        </p>
        <a
          href={YOUTUBE_CHANNEL.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-sm text-red-500 hover:text-red-600 transition-colors"
        >
          <span>View full channel on YouTube</span>
          <ExternalLink size={14} />
        </a>
      </header>

      {/* Content */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={32} className="text-slate-400 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <Video size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 italic">Unable to load videos</p>
            <a
              href={YOUTUBE_CHANNEL.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-red-500 hover:text-red-600 transition-colors"
            >
              <span>Visit our YouTube channel</span>
              <ExternalLink size={14} />
            </a>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <Video size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 italic">Videos coming soon...</p>
            <a
              href={YOUTUBE_CHANNEL.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-red-500 hover:text-red-600 transition-colors"
            >
              <span>Subscribe to our YouTube channel</span>
              <ExternalLink size={14} />
            </a>
          </div>
        ) : (
          videos.map((video) => (
            <div key={video.id} className="group">
              {selectedVideo === video.id ? (
                // Embedded YouTube player
                <div className="relative w-full aspect-video bg-slate-900 rounded-sm overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="absolute top-4 right-4 bg-slate-900/80 text-white px-3 py-1 rounded text-sm hover:bg-slate-800 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                // Video card with thumbnail
                <button
                  onClick={() => setSelectedVideo(video.id)}
                  className="w-full text-left p-4 md:p-6 border border-slate-200 bg-white hover:border-red-400 hover:shadow-lg transition-all duration-300 rounded-sm"
                >
                  <div className="flex gap-4 md:gap-6">
                    {/* Thumbnail */}
                    <div className="relative w-40 md:w-48 shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full aspect-video object-cover rounded-sm"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-900/30 group-hover:bg-slate-900/50 transition-colors">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play size={20} className="text-white ml-1" fill="white" />
                        </div>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-serif text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-500 mt-1">
                        {new Date(video.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-xs md:text-sm text-slate-400 mt-2 line-clamp-3 hidden sm:block">
                        {video.description}
                      </p>
                    </div>
                  </div>
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Videos;
