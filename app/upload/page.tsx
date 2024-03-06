"use client";
import React, { useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import dynamic from "next/dynamic";
import Loading from "../loading";

// Lazy loading heavy component (a client component)
const HeavyComponent = dynamic(() => import("../components/HeavyComponent"), {
  ssr: false, // disabling server side rendering when we need
  loading: () => <Loading />,
});

interface CloudinaryResult {
  public_id: string;
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState("");
  const [isVisible, setVisible] = useState(false);

  return (
    <>
      {publicId && (
        <CldImage
          src={publicId}
          width={270}
          height={180}
          alt="uploaded image"
        ></CldImage>
      )}
      <CldUploadWidget
        uploadPreset="xtqdtanu"
        options={{
          sources: ["local"],
          multiple: false,
        }}
        onSuccess={(result, options) => {
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
        }}
      >
        {({ open }) => (
          <button className="btn btn-primary" onClick={() => open()}>
            Upload
          </button>
        )}
      </CldUploadWidget>

      <div className="flex flex-col mt-3 space-y-3 w-32">
        <button onClick={() => setVisible(true)} className="btn btn-secondary">
          Show Heavy
        </button>
        <button
          onClick={async () => {
            // Lazy loading the lodash bundle to be imported
            const _ = (await import("lodash")).default;

            const users = [{ name: "c" }, { name: "b" }, { name: "a" }];

            const sorted = _.orderBy(users, ["name"]);
            console.log("🚀 ~ UploadPage ~ sorted:", sorted);
          }}
          className="btn btn-secondary"
        >
          Console Users
        </button>
      </div>
      {isVisible && <HeavyComponent />}
    </>
  );
};

export default UploadPage;
