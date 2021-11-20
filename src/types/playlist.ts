export type PlaylistData = {
  name: string;
  images: PlaylistImage[];
  public: boolean;
  tracks: PlaylistTracks;
};

export type PlaylistImage = {
  height: number;
  width: number;
  url: string;
};

export type PlaylistTracks = {
  items: Tracks[];
  total: number;
};

export type Tracks = {
  track: {
    album: {
      images: PlaylistImage[];
      name: string;
    };
    artists: {
      name: string;
    };
    duration_ms: string;
    name: string;
    preview_url: string;
  };
};
