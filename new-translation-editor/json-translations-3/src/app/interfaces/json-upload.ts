export enum PickFilesStatus {
  CANCELLED = 'CANCELLED',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}
export interface FilesUoplaodResult {
  status: PickFilesStatus;
  files: any[]
}