export interface MetaData {

    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
}

export class PaginatedResponse<Products> {

    items: Products;
    metaData: MetaData;

    constructor(items: Products, metaData: MetaData) {

       this.items = items;
       this.metaData = metaData;
    }
}