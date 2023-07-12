import { Intent, OverlayToaster } from '@blueprintjs/core';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import { ArtworkData, ArtworkDataOutgoingDTO } from '../types/ArtworkData';

const basePath = process.env.ARTIS_SERVER_API;
const AUTH_TOKEN_STORAGE_KEY = 'auth_token_storage_key';

export const api = {
  getArtworkIds: async () =>
    (await axios.get(`${basePath}/artworks`)).data.artworks as {
      owner: number[];
      recipient: number[];
      carrier: number[];
      logger: number[];
    },
  mintArtwork: async (data: ArtworkDataOutgoingDTO) =>
    (await axios.post(`${basePath}/artworks`, JSON.stringify(data))).data as { tokenId: number },
  getArtworkById: async (artworkId: string): Promise<ArtworkData> =>
    new ArtworkData((await axios.get(`${basePath}/artworks/${artworkId}`)).data),
  updateArtworkById: async (artworkId: string, data: ArtworkDataOutgoingDTO): Promise<ArtworkData> =>
    new ArtworkData((await axios.patch(`${basePath}/artworks/${artworkId}`, JSON.stringify(data))).data),
};

axios.interceptors.request.use((config) => {
  const token = secureLocalStorage.getItem(AUTH_TOKEN_STORAGE_KEY) as string;
  config.headers.Authorization = token ? token : 'NO_TOKEN_FOUND';
  config.headers['Content-Type'] = 'application/json';
  return config;
});

/* axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorToast = OverlayToaster.create({ position: 'top' });
    console.error(error);
    errorToast.show({ message: error?.response?.data?.error || error.message, intent: Intent.DANGER });
    const currentRoute = window.location.pathname;
    if (currentRoute !== '/' && currentRoute !== '/artworks') {
      window.location.replace('/');
    }
  },
); */
