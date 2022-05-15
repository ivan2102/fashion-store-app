import { Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Pagination } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { currencyFormat } from "../../app/util/util";
import useProducts from "../../app/hooks/useProducts";
import PaginationComponent from "../../app/components/PaginationComponent";
import { useAppDispatch } from "../../app/store/configureStore";
import { removeProduct, setPageNumber } from "../catalog/catalogSlice";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import  { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import ProductForm from "./ProductForm";
import { useState } from "react";
import { Product } from "../../app/models/product";
import fetch from '../../app/api/fetch';
import { LoadingButton } from "@mui/lab";

const theme = createTheme({
    palette: {
      primary: {
        main: '#111',
      },
      secondary: {
        main: purple[500],
      },
    },
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

export default function Inventory() {

    const dispatch = useAppDispatch();

    const {products, metaData} = useProducts();
    const [editMode, setEditMode] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [target, setTarget] = useState(0);

    function handleEditProduct(product: Product) {

        setSelectedProduct(product);
        setEditMode(true);
    }

    function cancelEdit() {

        if(selectedProduct) setSelectedProduct(undefined)
        setEditMode(false)
    }

    function handleDeleteProduct(id: number) {

        setLoading(true)
        setTarget(id)
        fetch.Admin.deleteProduct(id)
        .then(() => dispatch(removeProduct(id)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }

    if(editMode) return <ProductForm product={selectedProduct} cancelEdit={cancelEdit}/>

    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>Products</Typography>
                <Button onClick={() => setEditMode(true)} sx={{ m: 2 }} size='large' variant='contained'>Create</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <ThemeProvider theme={theme}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell align="left">Product</StyledTableCell>
                            <StyledTableCell align="right">Price</StyledTableCell>
                            <StyledTableCell align="center">Type</StyledTableCell>
                            <StyledTableCell align="center">Brand</StyledTableCell>
                            <StyledTableCell align="center">Quantity</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    </ThemeProvider>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.id}
                                </TableCell>
                                <TableCell align="left">
                                    <Box display='flex' alignItems='center'>
                                        <img src={product.pictureUrl} alt={product.name} style={{ height: 50, marginRight: 20 }} />
                                        <span>{product.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(product.price)}</TableCell>
                                <TableCell align="center">{product.type}</TableCell>
                                <TableCell align="center">{product.brand}</TableCell>
                                <TableCell align="center">{product.quantityInStock}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleEditProduct(product)} startIcon={<Edit />} />
                                    <LoadingButton onClick={() => handleDeleteProduct(product.id)} loading={loading && target === product.id} startIcon={<Delete />} color='error' />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {metaData && 
            <Box sx={{pt: 2}}>
                <PaginationComponent metaData={metaData} onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))} />
            </Box>
            }
        </>
    )
}