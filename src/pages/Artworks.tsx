import {
  Alignment,
  Button,
  Intent,
  Navbar,
  NonIdealState,
  OverlayToaster,
  Spinner,
  Tab,
  Tabs,
  Tooltip,
} from '@blueprintjs/core';
import { useLogout } from '@thirdweb-dev/react';
import { createHash } from 'crypto';
import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { api } from '../artis-api/api';
import { ArtworkForm, ArtworkFormField } from '../components/ArtworkForm';
import { ArtworkData } from '../types/ArtworkData';

export default function Artworks() {
  const artworkIds = useLoaderData() as { owner: number[]; recipient: number[]; carrier: number[]; logger: number[] };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [artworksByRole, setArtworksByRole] = useState(artworkIds);
  const [loading, setLoading] = useState(false);
  const { logout } = useLogout();

  function generateColorCode(input: number) {
    const hash = createHash('sha256').update(input.toString()).digest();
    const r = hash[0];
    const g = hash[1];
    const b = hash[2];
    const res = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
      .toString(16)
      .padStart(2, '0')}`;
    return res;
  }

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  async function handleModalClose(artworkData: ArtworkData) {
    console.log(artworkData.toDTO());
    setLoading(true);
    try {
      const newTokenId = (await api.mintArtwork(artworkData.toDTO())).tokenId;
      setArtworksByRole((prev) => ({ ...prev, owner: [...prev.owner, newTokenId] }));
    } catch (e: any) {
      setLoading(false);
      const errorToast = OverlayToaster.create({ position: 'top' });
      errorToast.show({ timeout: 0, message: e?.response?.data?.error || e.message, intent: Intent.DANGER });
      console.log(e);
    }
    setLoading(false);
    setIsModalOpen(false);
  }

  return (
    <div className="">
      <div className="">
        <Navbar className="bg-transparent p-0 shadow-none">
          <Navbar.Group align={Alignment.RIGHT}>
            <Tooltip position="top" content={'logout'} minimal={false}>
              <Button
                onClick={() => logout()}
                className="w-16 h-16"
                intent={Intent.DANGER}
                large={true}
                icon="log-out"
                minimal={true}
              />
            </Tooltip>
          </Navbar.Group>
        </Navbar>
      </div>
      <h1 className="text-7xl pb-3">Artwork Overview</h1>
      <Tabs id="RoleTabs" large={true}>
        {Object.entries(artworksByRole).map(([role, ids]) => (
          <Tab
            className='text-slate-100'
            id={role}
            key={role}
            title={role}
            panel={
              <div className="">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {ids.length !== 0 ? (
                    ids.map((id) => (
                      <div
                        key={id}
                        onClick={() => navigate('/artworks/' + id)}
                        className="w-60 h-60 rounded-lg shadow-lg flex justify-center items-center border-0 border-blue-400 hover:bg-gradient-to-tr from-amber-600 via-rose-600 to-violet-600"
                        style={{ backgroundColor: generateColorCode(id) }}
                      >
                        <span className="text-white text-6xl font-bold">{id}</span>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full row-span-full">
                      <NonIdealState
                        className="mt-3"
                        icon="info-sign"
                        title="Nothing Here"
                        description={`You have not yet been registered as a ${role}`}
                      />
                    </div>
                  )}
                  {role === 'owner' && (
                    <div
                      className="group block w-60 h-60 rounded-lg shadow-lg flex justify-center items-center border border-4 border-blue-400 hover:bg-slate-200"
                      onClick={handleModalOpen}
                    >
                      <span className="text-white text-6xl font-bold group-hover:text-dark">+</span>
                    </div>
                  )}
                </div>
                {isModalOpen && (
                  <div className="fixed top-0 left-0 w-full h-full bg-sky-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-slate-800 rounded-lg p-8">
                      {loading ? (
                        <Spinner />
                      ) : (
                        <ArtworkForm
                          title="Mint a new artwork NFT"
                          description="Enter some details about your artwork:"
                          visibleFields={[ArtworkFormField.objectId, ArtworkFormField.actors]}
                          requiredFields={[ArtworkFormField.objectId]}
                          onSubmit={handleModalClose}
                          onCancel={() => setIsModalOpen(false)}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            }
          />
        ))}
      </Tabs>
    </div>
  );
}
