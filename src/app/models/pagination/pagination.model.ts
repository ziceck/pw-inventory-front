export interface Pagination {
  max?: number;
  offset?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export const paginationIdDesc: Pagination = {
  sort: 'id',
  order: 'desc'
};
