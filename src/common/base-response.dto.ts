export class BaseMeta {
  page: number;
  totalRecord: number;
}

export class BaseResponse<T> {
  data: T | T[];
  meta: BaseMeta;
  isSuccess: boolean;

  constructor(data: T | T[], meta: BaseMeta, isSuccess = true) {
    this.data = data;
    this.meta = meta;
    this.isSuccess = isSuccess;
  }
}
