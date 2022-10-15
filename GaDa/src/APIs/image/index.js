import defaultURL from "../URL";

export const getPreSignedUrl = async () => {
    const res = await axios
      .post('/reviews/pre-signed-url')
      .then(({ data }) => data)
      .catch(handleNetworkError);
    return res;
  };

  export const getBlob = async (fileUri) => {
    const resp = await fetch(fileUri);
    const imageBody = await resp.blob();
    return imageBody;
  };
  
  export const uploadImage = async (uploadUrl, data) => {
    const imageBody = await getBlob(data);
  
    return fetch(uploadUrl, {
      method: "PUT",
      body: imageBody,
    });
  };
  
  const requestUpload = async () => {
    return fetch(defaultURL); 
  };
  