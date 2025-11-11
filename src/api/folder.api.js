import axiosClient from "../services/axiosClient";

const bucketName = "default";

const folderAPI = {
  create: (name) =>
    axiosClient.post(`/objects/${bucketName}/create_folder/`, { name }),

  delete: (key) =>
    axiosClient.delete(`/objects/${bucketName}/delete/`, { data: { key } }),

  rename: (oldKey, newKey) =>
    axiosClient.post(`/objects/${bucketName}/rename_folder/`, {
      old_key: oldKey,
      new_key: newKey,
    }),

  restore: (key) =>
    axiosClient.post(`/objects/${bucketName}/restore_folder/`, { key }),
};

export default folderAPI;
