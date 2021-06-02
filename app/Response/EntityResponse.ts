export class EntityResponse<T> {
  public success: boolean;
  public data: T | null;

  constructor(data: T | null, success = true) {
    this.data = data;
    this.success = success;
  }
}