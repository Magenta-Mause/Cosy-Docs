interface YouTubeEmbedProps {
  videoId: string;
}

export function YouTubeEmbed({ videoId }: YouTubeEmbedProps) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}
