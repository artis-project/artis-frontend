import { useState } from 'react';

import { Button, FormGroup, HTMLSelect, InputGroup, Intent, Tag } from '@blueprintjs/core';
import { ArtworkData, ArtworkDataProperties } from '../types/ArtworkData';

export interface FormGroupProps {
  helperText: boolean;
  intent: Intent;
}

export enum ArtworkFormField {
  objectId = 'objectId',
  actors = 'actors',
  status = 'status',
}

interface ArtworkFormProps {
  title?: string;
  description?: string;
  visibleFields?: ArtworkFormField[];
  requiredFields?: ArtworkFormField[];
  readOnlyFields?: ArtworkFormField[];
  onSubmit: (artworkData: ArtworkData) => void;
  onCancel: () => void;
}

interface ActorFormProps {
  helperText: boolean;
  carrier: { [key: string]: boolean | Intent };
  logger: { [key: string]: boolean | Intent };
  recipient: { [key: string]: boolean | Intent };
  [key: string]: any;
}

export const ArtworkForm = (props: ArtworkFormProps) => {
  const [artworkData, setArtworkData] = useState<ArtworkDataProperties>({});

  const [objectIdProps, setObjectIdProps] = useState<FormGroupProps>({
    intent: Intent.NONE,
    helperText: false,
  });

  const [actorsProps, setActorsProps] = useState<ActorFormProps>({
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

  const handleObjectId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const objectIdRegex = /^[a-zA-Z]{2,5}-\d{1,6}$/;
    const objectId = e.target.value;
    if (objectId === '') {
      setObjectIdProps((prev) => ({ ...prev, helperText: false, intent: Intent.NONE }));
      setArtworkData((prev) => ({ ...prev, objectId: objectId }));
      return;
    }
    if (objectIdRegex.test(objectId)) {
      setObjectIdProps((prev) => ({ ...prev, helperText: false, intent: Intent.SUCCESS }));
      setArtworkData((prev) => ({ ...prev, objectId: objectId }));
    } else {
      setObjectIdProps((prev) => ({ ...prev, helperText: true, intent: Intent.DANGER }));
    }
  };
  const handleActor = (e: React.ChangeEvent<HTMLInputElement>, actor: string) => {
    const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    const address = e.target.value;
    if (address === '') {
      setActorsProps((prev) => ({ ...prev, helperText: false, [actor]: { intent: Intent.NONE } }));
      setArtworkData((prev) => ({ ...prev, [actor]: address }));
      return;
    }
    if (ethereumAddressRegex.test(address)) {
      setActorsProps((prev) => ({ ...prev, helperText: false, [actor]: { intent: Intent.SUCCESS } }));
      setArtworkData((prev) => ({ ...prev, [actor]: address }));
    } else {
      setActorsProps((prev) => ({
        ...prev,
        helperText: true,
        intent: Intent.DANGER,
        [actor]: { intent: Intent.DANGER },
      }));
    }
  };

  const handleSubmit = (): boolean => {
    const conditions = [];
    if (props.requiredFields?.includes(ArtworkFormField.status)) {
      conditions.push(Boolean(artworkData.status));
    }
    if (props.requiredFields?.includes(ArtworkFormField.actors)) {
      conditions.push(Boolean(artworkData.carrier), Boolean(artworkData.logger), Boolean(artworkData.recipient));
    }
    if (props.requiredFields?.includes(ArtworkFormField.objectId)) {
      conditions.push(Boolean(artworkData.objectId));
    }
    return !conditions.every((condition) => condition === true);
  };

  const checkVisible = (field: ArtworkFormField) => {
    if (props.visibleFields == undefined) {
      return true;
    }
    if (props.visibleFields.includes(field)) {
      return true;
    }
    return false;
  };
  const checkRequired = (field: ArtworkFormField): [string, boolean] => {
    if(props.readOnlyFields?.includes(field)){
      return ["", false]
    }
    if (props.requiredFields == undefined) {
      return ['(optional)', false];
    }
    if (props.requiredFields.includes(field)) {
      return ['(required)', true];
    }
    return ['(optional)', false];
  };

  const checkReadonly = (field: ArtworkFormField) => {
    if (props.readOnlyFields == undefined) {
      return false;
    }
    if (props.readOnlyFields.includes(field)) {
      return true;
    }
    return false;
  };

  return (
    <div>
      {props.title && <h2 className="text-lg font-medium pb-4">{props.title}</h2>}
      { props.description && <p className="font-light pb-3">{props.description}</p>}
      {/* Object ID Field */}
      {checkVisible(ArtworkFormField.objectId) && (
        <FormGroup
          helperText={objectIdProps.helperText && 'Must be a valid ICOM ObjectId (e.g. MET-1234)'}
          inline={false}
          intent={objectIdProps.intent}
          label="Object Id"
          labelFor="objectId"
          labelInfo={checkRequired(ArtworkFormField.objectId)[0]}
        >
          <InputGroup
            type="text"
            id="objectId"
            required={checkRequired(ArtworkFormField.objectId)[1]}
            intent={objectIdProps.intent}
            onChange={handleObjectId}
          />
        </FormGroup>
      )}
      {/* Actors Field */}
      {checkVisible(ArtworkFormField.actors) && (
        <FormGroup
          label="Actors"
          helperText={actorsProps.helperText && 'Must be a valid ethereum address 0x...'}
          intent={actorsProps.intent}
          labelFor="actors"
          labelInfo={checkRequired(ArtworkFormField.actors)[0]}
        >
          <div className="space-y-2">
            {['logger', 'recipient', 'carrier'].map((actor) => (
              <InputGroup
                key={actor}
                type="text"
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
      )}
      <div className="space-y-3">
        {/* Submit */}
        <Button
          minimal={false}
          intent={Intent.PRIMARY}
          fill={true}
          disabled={handleSubmit()}
          outlined={false}
          onClick={(e) => props.onSubmit(new ArtworkData(artworkData))}
        >
          Mint
        </Button>
        {/* Cancel */}
        <Button intent={Intent.DANGER} fill={true} minimal={true} outlined={true} onClick={(e) => props.onCancel()}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
