import { UploadButton } from "@/utils/uploadthing/uploadthing";
import Image from "next/image";
import React from "react";

interface ImageUploaderProps {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  nameOfElementCustomizing: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  image,
  setImage,
  nameOfElementCustomizing,
}) => {
  let defaultImage = "";
  switch (nameOfElementCustomizing) {
    case "Karel":
      defaultImage = "/images/pixi-js/classic-karel.png";
      break;
    case "Beepers":
      defaultImage = "/images/pixi-js/classic-beeper.png";
      break;
    default:
      defaultImage = "";
  }

  return (
    <div className="flex items-center justify-start gap-2">
      {image !== "" ? (
        <Image
          src={image}
          alt={`user uploaded image`}
          width={50}
          height={50}
          className="size-20 rounded-md"
        ></Image>
      ) : (
        <Image
          src={defaultImage}
          alt={"default image"}
          width={50}
          height={50}
          className="size-20 rounded-md"
        ></Image>
      )}
      <UploadButton
        endpoint="imageUploader"
        content={{
          button({ ready }) {
            if (ready)
              return (
                <div className="flex gap-1 p-2 ">
                  <Image
                    src="/icons/cloud-upload.svg"
                    alt="upload"
                    className="text-ring"
                    width={16}
                    height={16}
                  />
                  <span className="text-ring">
                    {image === undefined || image === ""
                      ? `Upload ${nameOfElementCustomizing} Image`
                      : `Change ${nameOfElementCustomizing} Image`}
                  </span>
                </div>
              );

            return "Loading...";
          },
          allowedContent({
            ready,
            fileTypes,
            isUploading,
          }: {
            ready: boolean;
            fileTypes: string[];
            isUploading: boolean;
          }) {
            if (!ready) return "Getting server info...";
            if (isUploading) return "Uploading...";
            return `Only upload ${fileTypes.join(", ")} files.`;
          },
        }}
        appearance={{
          button: "bg-primary w-full text-ring",
          container: "w-full h-full",
          allowedContent: "h-0",
        }}
        onClientUploadComplete={(res) => {
          // Do something with the response
          setImage(res[0].url);
        }}
        onUploadBegin={() => {}}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default ImageUploader;
