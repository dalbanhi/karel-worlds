import { UploadButton } from "@/utils/uploadthing/uploadthing";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useClerk } from "@clerk/nextjs";
import { buttonVariants } from "@/components/ui/button";

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
  const { toast } = useToast();
  const { redirectToSignIn } = useClerk();
  const [defaultImage, setDefaultImage] = useState("");

  useEffect(() => {
    //make sure that the default image is set correctly
    switch (nameOfElementCustomizing) {
      case "Karel":
        setDefaultImage("/images/pixi-js/classic-karel.png");
        break;
      case "Beepers":
        setDefaultImage("/images/pixi-js/classic-beeper.png");
        break;
      default:
        setDefaultImage("/images/pixi-js/classic-beeper.png");
    }
  }, [nameOfElementCustomizing]);

  return (
    <span className="flex items-center justify-start gap-2">
      {image !== "" && image !== undefined ? (
        <Image
          src={image}
          alt={`user uploaded image`}
          width={50}
          height={50}
          className="size-20 rounded-md"
        />
      ) : (
        defaultImage !== "" && (
          <Image
            src={defaultImage}
            alt={"default image"}
            width={50}
            height={50}
            className="size-20 rounded-md"
          />
        )
      )}
      <UploadButton
        endpoint="imageUploader"
        content={{
          button({ ready }) {
            if (ready)
              return (
                <span className="flex gap-1 p-2 ">
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
                </span>
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
          toast({
            variant: "warning",
            title: "Error Uploading Image",
            description: `${error.message}. Sign in and try again.`,
            action: (
              <ToastAction
                className={`text-ring ${buttonVariants({ variant: "outline" })}`}
                onClick={() => {
                  redirectToSignIn({ signInForceRedirectUrl: "/new-puzzle" });
                }}
                altText="Sign In"
              >
                Sign In
              </ToastAction>
            ),
          });
        }}
      />
    </span>
  );
};

export default ImageUploader;
