export interface ErrorDto {
  sql: string;
  message: string;
  stack: string;
  original: {
    code: string;
    errno: number;
    sql: string;
    sqlMessage: string;
    sqlState: string;
  };
}
