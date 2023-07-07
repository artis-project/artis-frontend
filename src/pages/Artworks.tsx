import { createHash } from 'crypto';
import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { ArtworkForm, ArtworkFormField } from '../components/ArtworkForm';
import '../styles/Home.css';
import { ArtworkData } from '../types/ArtworkData';

export default function Artworks() {
  const artworkIds = useLoaderData() as number[];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  function getGradientColors(id: number) {
    const hue = (id * 137.5) % 360;
    const color1 = `hsl(${hue}, 70%, 50%)`;
    const color2 = `hsl(${hue + 180}, 70%, 50%)`;
    return `${color1}, ${color2}`;
  }

  function generateColorCode(input) {
    const hash = createHash('sha256').update(input.toString()).digest();
    const r = hash[0];
    const g = hash[1];
    const b = hash[2];
    const res = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
      .toString(16)
      .padStart(2, '0')}`;
    console.log(res);
    return res;
  }

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose(artworkData: ArtworkData) {
    console.log(artworkData);
    setIsModalOpen(false);
  }

  return (
    <div>
      <h1 className="text-7xl pb-3">Artwork Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {artworkIds.map((id) => (
          <div
            key={id}
            onClick={() => navigate('/artworks/' + id)}
            className="w-60 h-60 rounded-lg shadow-lg flex justify-center items-center border-0 border-blue-400 hover:border-4"
            style={{ background: `repeating-linear-gradient(to right, ${getGradientColors(id)})` }}
          >
            <span className="text-white text-6xl font-bold">{id}</span>
          </div>
        ))}
        <div
          className="group block w-60 h-60 rounded-lg shadow-lg flex justify-center items-center border border-4 border-blue-400 hover:bg-slate-200"
          onClick={handleModalOpen}
        >
          <span className="text-white text-6xl font-bold group-hover:text-dark">+</span>
        </div>
      </div>
      {isModalOpen && (
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
  );
}
