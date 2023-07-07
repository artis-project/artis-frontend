import { FormGroup, InputGroup, Switch } from '@blueprintjs/core';
import { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import '../styles/Home.css';
import { ArtworkData } from '../types/ArtworkData';

import '../styles/Home.css';

export default function ArtworkDetail() {
  const { id } = useParams<{ id: string }>();
  const [editMode, setEditMode] = useState(false);
  const artworkData = useLoaderData() as ArtworkData;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, defaultValue } = event.target;
    artworkData[name] = defaultValue;
  };

  return (
    <div>
      <h1 className="text-7xl pb-3">Artwork Nr. {id}</h1>
      <div>
        <Switch onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditMode(e.target.checked)}>edit?</Switch>
        <FormGroup label="Object ID">
          <InputGroup inputClassName="focus:border-transparent" readOnly={!editMode} defaultValue={artworkData.objectId} name="objectId" onChange={handleInputChange} />
        </FormGroup>
        <FormGroup label="Carrier">
          <InputGroup readOnly={!editMode} defaultValue={artworkData.carrier} name="carrier" onChange={handleInputChange} />
        </FormGroup>
        <FormGroup label="Owner">
          <InputGroup readOnly={!editMode} defaultValue={artworkData.owner} name="owner" onChange={handleInputChange} />
        </FormGroup>
        <FormGroup label="Recipient">
          <InputGroup
            readOnly={!editMode}
            defaultValue={artworkData.recipient}
            name="recipient"
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup label="Current Status">
          <InputGroup
            readOnly={!editMode}
            defaultValue={artworkData.status.currentStatus}
            name="status.currentStatus"
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup label="Requested Status">
          <InputGroup
            readOnly={!editMode}
            defaultValue={artworkData.status.requestedStatus}
            name="status.requestedStatus"
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup label="Carrier Approval">
          <InputGroup
            readOnly={!editMode}
            defaultValue={artworkData.status.approvals.carrier.toString()}
            name="status.approvals.carrier"
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup label="Owner Approval">
          <InputGroup
            readOnly={!editMode}
            defaultValue={artworkData.status.approvals.owner.toString()}
            name="status.approvals.owner"
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup label="Recipient Approval">
          <InputGroup
            readOnly={!editMode}
            defaultValue={artworkData.status.approvals.recipient.toString()}
            name="status.approvals.recipient"
            onChange={handleInputChange}
          />
        </FormGroup>
      </div>
    </div>
  );
}
