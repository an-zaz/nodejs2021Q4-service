export interface IColumn {
  id: string;
  title: string;
  order: number;
}

export class CreateBoardDto {
  title: string;
  columns: Array<IColumn>;
}
