import axiosClient from "../services/axiosClient";

const bucketName = "default";

const fileAPI = {
  list: () => axiosClient.get(`/objects/${bucketName}/list/`),

  upload: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return axiosClient.post(`/objects/${bucketName}/upload/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  delete: (key) =>
    axiosClient.delete(`/objects/${bucketName}/${key}/`),

  restore: (key) =>
    axiosClient.post(`/objects/${bucketName}/restore/`, { key }),

  rename: (oldKey, newKey) =>
    axiosClient.post(`/objects/${bucketName}/rename/`, {
      old_key: oldKey,
      new_key: newKey,
    }),
};

export default fileAPI;
