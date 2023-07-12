import { Alignment, Button, FormGroup, HTMLSelect, InputGroup, Intent, Switch, Tag } from '@blueprintjs/core';
import { useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { api } from '../artis-api/api';
import { ArtworkData, ArtworkDataIncomingDTO } from '../types/ArtworkData';

export default function ArtworkDetail() {
  const { id } = useParams<{ id: string }>();
  const [editMode, setEditMode] = useState(false);
  const [statusApproval, setStatusApproval] = useState(false);
  const loaderArtworkData = useLoaderData() as ArtworkData;
  const [loading, setLoading] = useState(false);
  const [artworkData, setArtworkData] = useState(loaderArtworkData);
  const [newArtworkData, setNewArtworkData] = useState(artworkData);
  const navigate = useNavigate();
  const [actorsProps, setActorsProps] = useState<{[key:string]: any}>({
    helperText: false,
    intent: Intent.NONE,
    carrier: {
      intent: Intent.NONE,
    },
    logger: {
      intent: Intent.NONE,
    },
    recipient: {
      intent: Intent.NONE,
    },
  });
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewArtworkData((prev) => (new ArtworkData({ ...prev, [name]: value })));
  };

  const toggleEditMode = (toggle: boolean) => {
    setActorsProps((prev) => ({
      ...prev,
      helperText: false,
      carrier: { intent: Intent.NONE },
      logger: { intent: Intent.NONE },
      recipient: { intent: Intent.NONE },
    }));
    setNewArtworkData(artworkData);
    setEditMode(toggle);
  };

  const handleActor = (e: React.ChangeEvent<HTMLInputElement>, actor: string) => {
    const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    const address = e.target.value;
    if (address === '') {
      setActorsProps((prev) => ({ ...prev, helperText: false, [actor]: { intent: Intent.NONE } }));
      setNewArtworkData((prev) => (new ArtworkData({ ...prev, [actor]: address })));
      return;
    }
    if (ethereumAddressRegex.test(address)) {
      setActorsProps((prev) => ({ ...prev, helperText: false, [actor]: { intent: Intent.SUCCESS } }));
    } else {
      setActorsProps((prev) => ({
        ...prev,
        helperText: true,
        intent: Intent.DANGER,
        [actor]: { intent: Intent.DANGER },
      }));
    }
    setNewArtworkData((prev) => (new ArtworkData({ ...prev, [actor]: address })));
  };

  const handleSubmit = async () => {
    //add check that either approve status or status change is set
    const unChangedProperties = Object.keys(newArtworkData).filter((key) => newArtworkData[key] === artworkData[key]);
    unChangedProperties.forEach(key => {
      delete newArtworkData[key]
    })
    console.log(newArtworkData);
    setLoading(true);
    setArtworkData(await api.updateArtworkById(id!, newArtworkData.toDTO()));
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-7xl pb-3">Artwork Nr. {id}</h1>
      <div className="columns-1 space-y-3">
        <Tag intent={Intent.PRIMARY} fill={true} round={true}>
          {artworkData.status?.currentStatus}
        </Tag>
        {artworkData.violationTimestamp ? (
          <Tag fill={true} round={true} intent={Intent.DANGER}>
            Violation Timestap: {new Date(artworkData.violationTimestamp * 1000).toISOString()}
          </Tag>
        ) : (
          <Tag fill={true} round={true} intent={Intent.SUCCESS}>
            No Violation
          </Tag>
        )}
        <Switch
          large={true}
          checked={editMode}
          className="text-white"
          innerLabel="edit"
          alignIndicator={Alignment.RIGHT}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => toggleEditMode(e.target.checked)}
        />
      </div>
      <div>
        <FormGroup label="Owner">
          <Tag
            //intent={Intent.PRIMARY}
            large={true}
            fill={true}
          >
            {artworkData.owner}
          </Tag>
        </FormGroup>
        <FormGroup label="Object ID">
          <InputGroup
            inputClassName={editMode ? '' : 'bg-gray-400'}
            readOnly={!editMode}
            value={editMode ? newArtworkData.objectId : artworkData.objectId}
            name="objectId"
            onChange={handleInputChange}
          />
        </FormGroup>
        {/* Actors Field */}
        <FormGroup
          label="Actors"
          helperText={actorsProps.helperText && 'Must be a valid ethereum address 0x...'}
          intent={actorsProps.intent}
          labelFor="actors"
        >
          <div className="space-y-2">
            {['logger', 'recipient', 'carrier'].map((actor) => (
              <InputGroup
                readOnly={!editMode}
                inputClassName={editMode ? '' : 'bg-gray-400'}
                key={actor}
                type="text"
                value={editMode ? newArtworkData[actor] : artworkData[actor]}
                leftElement={
                  <Tag round={true} minimal={true} intent={actorsProps[actor].intent}>
                    {actor}
                  </Tag>
                }
                id={actor}
                onChange={(e) => handleActor(e, actor)}
              />
            ))}
          </div>
        </FormGroup>
        <div className="flex space-x-4">
          <FormGroup label={editMode ? 'Approve Status' : 'Requested Status'} labelFor="status">
            {!editMode ? (
              <Tag intent={Intent.WARNING} large={true}>
                {artworkData.status?.requestedStatus}
              </Tag>
            ) : (
              <div className="flex space-x-3 justify-center items-center">
                {artworkData.status?.requestedStatus !== 'NONE' && (
                  <div>
                    <Switch
                      large={true}
                      onChange={(e) => setStatusApproval((e.target as HTMLInputElement).checked)}
                      labelElement={
                        <Tag intent={statusApproval ? Intent.SUCCESS : Intent.WARNING} large={false}>
                          {artworkData.status?.requestedStatus}
                        </Tag>
                      }
                    />
                    <p>or</p>
                  </div>
                )}
                <HTMLSelect
                  id="status"
                  options={['change requested status', 'IN_TRANSIT', 'TO_BE_DELIVERED', 'DELIVERED'].filter((e) => {
                    return e !== artworkData.status?.requestedStatus;
                  })}
                  onChange={(e) =>
                    setNewArtworkData((prev) => (new ArtworkData({
                      ...prev,
                      status: { ...prev.status, requestedStatus: e.target.value },
                    })))
                  }
                />
              </div>
            )}
          </FormGroup>
          {!editMode && !Object.values(artworkData.status!.approvals!).every((value) => !value) && (
            <FormGroup label="Approved By">
              <div className="space-x-2">
                {Object.entries(artworkData.status!.approvals!).map(([key, value]) => {
                  if (value) {
                    return (
                      <Tag intent={Intent.SUCCESS} key={key}>
                        {key}
                      </Tag>
                    );
                  }
                })}
              </div>
            </FormGroup>
          )}
        </div>
        {editMode && (
          <div className="space-y-3">
            <Button intent={Intent.PRIMARY} fill={true} onClick={handleSubmit}>
              Submit
            </Button>
            <Button intent={Intent.DANGER} fill={true} outlined={true} onClick={() => toggleEditMode(false)}>
              Cancel
            </Button>
          </div>
        )}
      </div>
      <Button
        className="mt-5"
        style={{ color: 'white' }}
        icon="arrow-left"
        minimal={true}
        onClick={() => navigate('/artworks')}
      >
        Back
      </Button>
    </div>
  );
}
