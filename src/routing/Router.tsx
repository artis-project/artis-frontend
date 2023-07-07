import { Navigate, createBrowserRouter } from "react-router-dom";
import { api } from "../artis-api/api";
import ArtworkDetail from "../pages/ArtworkDetail";
import Artworks from "../pages/Artworks";
import Login from "../pages/Login";
import { HomeLayout } from "../routing/HomeLayout";
import { ProtectedLayout } from "../routing/ProtectedLayout";

export const router = createBrowserRouter([
    {
        element: <HomeLayout />,
        children: [{
            path: "login",
            element: <Login />
        }]
    },
    {
        path: "/",
        element: <ProtectedLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="artworks" />
            },
            {
                path: "artworks",
                element: <Artworks />,
                loader: api.getArtworkIds
            },
            {
                path: "artworks/:id",
                element: <ArtworkDetail />,
                loader: async ({params}) => {
                    return await api.getArtworkById(params.id!);
                }
            }
        ]
    }
  ])