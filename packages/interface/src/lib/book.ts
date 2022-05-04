export enum IBookStatus {
  DOWNLOADING = 'downloading',
  ERROR = 'error',
  SUCCESS = 'success',
  SAVED = 'saved',
}

export interface IAddBookRequest {
  name: string;
}

// export interface IAddBookResponse {
//   id: string;
//   name: string;
//   status: IBookStatus;
// }

export interface IBook {
  id: string;
  name: string;
  status: IBookStatus;
  src?: string;
  user: string;
  created_at: string;
  updated_at: string;
}
