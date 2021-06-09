export class EntityResponse<T> {
  public success: boolean;
  public data: T | null;
  public message?: string;

  constructor(data: T | null, success = true, message?: string) {
    this.data = data;
    this.success = success;
    this.message = message;
  }
}