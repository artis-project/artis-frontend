/* export type ArtworkData = {
  id?: number;
  carrier?: string;
  logger?: string;
  objectId?: string;
  owner?: string;
  recipient?: string;
  status?: {
    approvals: {
      carrier: boolean;
      owner: boolean;
      recipient: boolean;
    };
    currentStatus: string;
    requestedStatus: string;
  };
  violationTimestamp?: number;
  [key: string]: any;
}; */

export interface ArtworkDataIncomingDTO {
  id: number;
  objectId: string;
  owner: string;
  recipient: string | null;
  carrier: string | null;
  logger: string | null;
  status: {
    approvals: {
      carrier: boolean;
      owner: boolean;
      recipient: boolean;
    };
    currentStatus: string;
    requestedStatus: string;
  };
  violationTimestamp: number;
  [key: string]: any;
}

export interface ArtworkDataOutgoingDTO {
  objectId?: string;
  recipient?: string;
  carrier?: string;
  logger?: string;
  status?: {
    requestedStatus: string;
  };
}

export interface ArtworkDataProperties {
  id?: number;
  carrier?: string | null;
  logger?: string | null;
  objectId?: string;
  owner?: string;
  recipient?: string | null;
  status?: {
    approvals?: {
      carrier: boolean;
      owner: boolean;
      recipient: boolean;
    };
    currentStatus?: string;
    requestedStatus?: string;
  };
  violationTimestamp?: number;
}

export class ArtworkData implements ArtworkDataProperties {
  id?: number;
  carrier?: string;
  logger?: string;
  objectId?: string;
  owner?: string;
  recipient?: string;
  status?: {
    approvals?: {
      carrier: boolean;
      owner: boolean;
      recipient: boolean;
    };
    currentStatus?: string;
    requestedStatus?: string;
  };
  violationTimestamp?: number;
  [key:string]: any;

  constructor(dto: ArtworkDataIncomingDTO | ArtworkDataProperties) {
    this.id = dto.id;
    this.carrier = dto.carrier || '';
    this.logger = dto.logger || '';
    this.objectId = dto.objectId;
    this.owner = dto.owner;
    this.recipient = dto.recipient || '';
    this.status = dto.status;
    this.violationTimestamp = dto.violationTimestamp;
  }

  toDTO(): ArtworkDataOutgoingDTO {
    const dto: ArtworkDataOutgoingDTO = {};
    if (this.objectId) {
      dto.objectId = this.objectId;
    }
    if (this.recipient) {
      dto.recipient = this.recipient;
    }
    if (this.carrier) {
      dto.carrier = this.carrier;
    }
    if (this.logger) {
      dto.logger = this.logger;
    }
    if (this.status && this.status.requestedStatus) {
      dto.status = {
        requestedStatus: this.status.requestedStatus,
      };
    }
    console.log(dto)
    return dto;
  }
}
