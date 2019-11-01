import React, { useState, useCallback } from "react";
import { Pane, Button, Heading, TextInput} from "evergreen-ui";
import Layout from "../components/Layout";
import DropZone from "../components/Dropzone";

const UploadFormField = () => {
    return (
        <Pane>
            <Heading size={800} marginBottom={20}>Upload Photo(s)</Heading>
            <TextInput width="100%" placeholder="Primary Tag (e.g. 'Camping 2007')" />
        </Pane>
    );
}
const UploadPage = () => {
  const [pictures, setPictures] = useState([]);

  const onDrop = (pictureFiles, pictureDataURLs) => {
    console.log(pictureFiles);
    setPictures(pictures.concat(pictureFiles));
  };

  return (
    <Layout backgroundColor="white">
      <Pane is="form" display="block" width="100%">
        <Pane display="flex" flexDirection="row" flexShrink={0}>
          <DropZone />
          <Pane flexGrow={1} maxWidth={555}>
              <UploadFormField />
          </Pane>
        </Pane>
      </Pane>
    </Layout>
  );
};

export default UploadPage;
