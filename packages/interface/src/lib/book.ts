export enum IBookStatus {
  DOWNLOADING = 'downloading',
  ERROR = 'error',
  SUCCESS = 'success',
  SAVED = 'saved',
}

export interface IAddBookRequest {
  name: string;
}

export interface IAddBookResponse {
  id: string;
  name: string;
  status: IBookStatus;
}
