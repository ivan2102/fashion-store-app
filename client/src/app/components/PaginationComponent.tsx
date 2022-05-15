import { Box, Typography, Pagination } from "@mui/material"
import { useState } from "react";
import { MetaData } from "../models/pagination";

interface Props {

    metaData: MetaData;
    onPageChange: (page: number) => void;
}


function PaginationComponent({metaData, onPageChange}: Props) {

  const {currentPage, totalCount, totalPages, pageSize} = metaData
  const [pageNumber, setPageNumber] = useState(currentPage)

  function handlePageChange(page: number) {

    setPageNumber(page);
    onPageChange(page);
  }

  return (
   
    <Box display='flex' justifyContent='space-between' alignItems='center'>
    <Typography>
      Displaying {(currentPage - 1) * pageSize + 1 } -
      {currentPage * pageSize > totalCount
       ? totalCount 
       : currentPage * pageSize} of {totalCount} items
    </Typography>

    <Pagination 
    color='standard'
     size='large' 
     count={totalPages}
      page={pageNumber}
      onChange={(event, page) => handlePageChange(page)}
       />
  </Box>
  )
}

export default PaginationComponent