export const getPreSignedUrl = async () => {
    const res = await axios
      .post('/reviews/pre-signed-url')
      .then(({ data }) => data)
      .catch(handleNetworkError);
    return res;
  };

  export const getBlob = async fileUri => {
    const resp = await fetch(fileUri);
    const imageBody = await resp.blob();
    return imageBody;
  }
  
  export const uploadImage = async (presignedUrl, uri) => {
    const imageBody = await getBlob(uri);
    return fetch(presignedUrl, {method: "PUT", body: imageBody})
  };
  