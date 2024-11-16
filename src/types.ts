export type Doctor = {
    id: number,
    name: string,
    department: string,
    isHead: boolean
}
export type Nurse = {
    id: number,
    name: string,
    department: string,
}

export enum SnackbarStatus {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
}

