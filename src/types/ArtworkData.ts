export type ArtworkData = {
  id: number;
  carrier?: string;
  logger?: string;
  objectId: string;
  owner: string;
  recipient?: string;
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
};
