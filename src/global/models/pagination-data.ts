export class PaginationData {
  totalRecords = 0;
  totalPages = 0;
  page = 1;
  limit = 10;
  offset = 0;

  setTotalRecords(totalRecords: number): this {
    this.totalRecords = totalRecords;
    return this;
  }

  setTotalPages(totalPages: number): this {
    this.totalPages = totalPages;
    return this;
  }

  setPage(page: number): this {
    this.page = page;
    return this;
  }

  setLimit(limit: number): this {
    this.limit = limit;
    return this;
  }

  onNextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  onPrevPage(): void {
    if (this.page > 1) {
      this.page--;
    }
  }
}
