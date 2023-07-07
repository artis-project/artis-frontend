import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { ArtworkData } from "../types/ArtworkData";

const basePath = process.env.ARTIS_SERVER_API
const AUTH_TOKEN_STORAGE_KEY = "auth_token_storage_key";

export const api = {
    getArtworkIds: async () => (await axios.get(`${basePath}/artworks`)).data,
    mintArtwork: async (data: ArtworkData) => (await axios.post(`${basePath}/artworks`, JSON.stringify(data))).data as {tokenId: number},
    getArtworkById: async (artworkId: string) => (await axios.get(`${basePath}/artworks/${artworkId}`)).data as ArtworkData,
    updateArtworkById: async (artworkId: string, data: ArtworkData) => (await axios.patch(`${basePath}/artworks/${artworkId}`, JSON.stringify(data))).data as ArtworkData,
    
}

axios.interceptors.request.use(config => {
    const token = secureLocalStorage.getItem(AUTH_TOKEN_STORAGE_KEY) as string
    config.headers.Authorization = token ? token : "NO_TOKEN_FOUND"
    config.headers["Content-Type"] = "application/json"
    return config
})
