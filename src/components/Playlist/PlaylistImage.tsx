import { styled } from "../../../stitches.config";
import Image from "next/image";
import { PlaylistImage } from "types/playlist";

interface Props {
  images: PlaylistImage[];
}

const Avatar = styled(Image, {
  borderRadius: "3px",
});

const PlaylistImage: React.FC<Props> = (props: Props) => {
  const { images } = props;

  return (
    <Avatar
      src={images[1]?.url}
      height={images[1].height}
      width={images[1].width}
    />
  );
};

export default PlaylistImage;
