"use client";

const BlockSpotify = ({ id }: { id: string }) => {
  return (
    <div className="h-[352px] md:h-[152px]">
      <iframe
        data-testid="embed-iframe"
        style={{ borderRadius: "12px" }}
        src={`https://open.spotify.com/embed/album/${id}?utm_source=generator&theme=0`}
        width="100%"
        height="100%"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        data-lenis-prevent
      ></iframe>
    </div>
  );
};

export default BlockSpotify;
