import { useState, useEffect } from 'react';
import { VideoItem } from '../types';
import { YOUTUBE_CHANNEL } from '../constants';

const CACHE_KEY = 'youtube_videos_cache';
const CACHE_DURATION = 1000 * 60 * 60 * 6; // 6 hours

// Decode HTML entities from YouTube API responses
const decodeHtmlEntities = (text: string): string => {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#x27;': "'",
    '&apos;': "'",
  };
  return text.replace(/&(?:amp|lt|gt|quot|#39|#x27|apos);/g, match => entities[match] || match);
};

interface CacheData {
  data: VideoItem[];
  timestamp: number;
}

export const useYouTubeVideos = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      // Check cache first
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp }: CacheData = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setVideos(data);
            setLoading(false);
            return;
          }
        }
      } catch {
        // Cache read failed, continue to fetch
      }

      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
      const channelId = YOUTUBE_CHANNEL.channelId;

      if (!apiKey || !channelId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?` +
          `key=${apiKey}&channelId=${channelId}&part=snippet&type=video&` +
          `order=date&maxResults=20`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch videos from YouTube');
        }

        const data = await response.json();

        const fetchedVideos: VideoItem[] = data.items.map((item: {
          id: { videoId: string };
          snippet: {
            title: string;
            description: string;
            publishedAt: string;
            thumbnails: { medium: { url: string } };
          };
        }) => ({
          id: item.id.videoId,
          title: decodeHtmlEntities(item.snippet.title),
          description: decodeHtmlEntities(item.snippet.description),
          publishedAt: item.snippet.publishedAt,
          thumbnail: item.snippet.thumbnails.medium.url,
        }));

        // Sort by publish date, oldest first
        fetchedVideos.sort((a, b) =>
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        );

        // Cache the result
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: fetchedVideos,
          timestamp: Date.now(),
        }));

        setVideos(fetchedVideos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return { videos, loading, error };
};
