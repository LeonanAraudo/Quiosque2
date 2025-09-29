import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProdutos } from '../../../../../hook/Produtos/useProdutos';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import style from '../../../Telas/(Estoque)/Estoque/style.module.css'
import { createTheme, ThemeProvider } from "@mui/material";
import { roboto } from '../../../Fontes/fonts'
import Link from "next/link";

const columns = [
  { id: "nome", label: "Nome", minWidth: 90, align: "center" },
  { id: "categorias", label: "Categorias", minWidth: 80, align: "left" },
  { id: "quantidade_disponivel", label: "Quant. Disponível", minWidth: 70, align: "center" },
  { id: "data_vencimento", label: "Data Vencimento", minWidth: 80, align: "left" },
];

function createData(nome, data_vencimento, categorias, quantidade_disponivel, quantidade_minima, produto_id) {
  return { nome, data_vencimento, categorias, quantidade_disponivel, quantidade_minima, produto_id}; 
}

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily, 
  },
});

export default function ArrayProdutos() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [mud,setMud] = useState(true)
  const toggleMud = () => setMud((prevMud) => !prevMud);
  const router = useRouter();
  const { produtos, isLoading } = useProdutos();
  
  useEffect(() => {
    if (produtos.length > 0) {
      setPosts(produtos.map((item) => createData(item.nome, item.data_vencimento, item.categorias, item.quantidade_disponivel, item.quantidade_minima, item.produto_id)));
    }
  }, [produtos]);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredPosts = posts
  .filter((post) => post.nome.toLowerCase().includes(searchTerm.toLowerCase()))
  .sort((a, b) => {
    const prioridadeA = a.quantidade_disponivel < a.quantidade_minima ? 1 : a.quantidade_disponivel === a.quantidade_minima ? 2 : 3;
    const prioridadeB = b.quantidade_disponivel < b.quantidade_minima ? 1 : b.quantidade_disponivel === b.quantidade_minima ? 2 : 3;
    return prioridadeA - prioridadeB;
  });

  return (
    <>
     <div className='w-full flex items-center justify-center'>
                <input value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)} 
                 onBlur={toggleMud} 
                 onClick={toggleMud} 
                 type='text' placeholder='pesquise um produto' 
                 className={style.input}/>
                {mud && <img className={style.lupa} width="28" height="28" src="https://img.icons8.com/ios-filled/50/search--v1.png" alt="search--v1"/>
                }
    </div>
    <ThemeProvider theme={theme}>
      <Paper sx={{ width: "100%", overflow: "hidden", padding: 2 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead >
              <TableRow sx={{ height: "5px", minHeight: "5px"}}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} sx={{padding:"1px 8px" ,fontSize:"13px",backgroundColor:"#EAEAEA",fontWeight:"bold" }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPosts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={index}
                  sx={{
                    height:"50px",
                    backgroundColor:
                      row.quantidade_disponivel < row.quantidade_minima ? "#FF6347" :  
                      row.quantidade_disponivel == row.quantidade_minima ? "#fff94a" : 
                      "inherit",
                  }}
                >
                  {columns.map((column) => {
          const value = row[column.id];
          return (
              <TableCell key={column.id} align={column.align} sx={{fontSize:'13px',padding:"4px 8px"}} onClick={() => router.push(`/Telas/DadosProdutoTable/${row.produto_id}`)}>
                <span style={{ display: "flex", alignItems: "center",justifyContent:"center", gap: "4px" }}>
                    {column.id === "quantidade_disponivel"
                      ? row.quantidade_disponivel === row.quantidade_minima
                        ? <><span>⚠️</span> {row.quantidade_disponivel}</>
                        : row.quantidade_disponivel < row.quantidade_minima
                          ? <><span>🚨</span> {row.quantidade_disponivel}</>
                          : <><span className="ml-[24px]">{row.quantidade_disponivel}</span></>
                      : value}
                  </span>
              </TableCell>
          );
        })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={posts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </ThemeProvider>
    </>
  );
}
