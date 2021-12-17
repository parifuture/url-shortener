import React from "react";
import { usePagination, useTable } from "react-table";
import { format } from "date-fns";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddLinkIcon from "@mui/icons-material/AddLink";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";

import { getAllCodes, generateUrlForVisit, deleteCode } from "../../api/codes";
import { FormDialog } from "../FormDialog";

export const URLTable = () => {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const [formDialogState, setFormDialogState] = React.useState(false);

  const handleDelete = async (someId) => {
    await deleteCode(someId.row.original.actions);
    fetchData({ pageIndex, pageSize });
  };

  const handleVisit = async (rowData) => {
    const shortCode = rowData.row.original.shortCode;
    const url = await generateUrlForVisit(shortCode);
    console.log(url);
    window.open(url, "_blank").focus();
  };

  const handleFormDialogClickOpen = () => {
    setFormDialogState(true);
  };

  const handleFormDialogClickClose = () => {
    setFormDialogState(false);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "URL",
        accessor: "url",
      },
      {
        Header: "Code",
        accessor: "shortCode",
      },
      {
        Header: "Created At",
        accessor: "createdAt",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ cell }) => (
          <Stack direction="row" spacing={1}>
            <Button
              onClick={() => handleVisit(cell)}
              variant="contained"
              color="primary"
            >
              Visit
            </Button>
            <Button
              onClick={() => handleDelete(cell)}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </Stack>
        ),
      },
    ],
    []
  );

  const processData = (data) => {
    const processedData = data.map((item) => {
      return {
        url: item.longUrl,
        shortCode: item.shortCode,
        createdAt: format(new Date(item.createdAt), "MMMM d, yyyy"),
        actions: item.id,
      };
    });
    return processedData;
  };

  const fetchData = React.useCallback(async ({ pageIndex, pageSize }) => {
    setLoading(true);
    const fetchedServerData = await getAllCodes(pageSize, pageIndex);
    const processedData = processData(fetchedServerData.data);

    setData(processedData);

    setPageCount(fetchedServerData.pageCount);

    setLoading(false);
  }, []);

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount,
    },
    usePagination
  );

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  const renderHeader = () => {
    return (
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()}>
                {column.render("Header")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
    );
  };

  const renderBody = () => {
    return (
      <TableBody>
        {page.map((row) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
        <TableRow>
          {loading ? (
            // Use our custom loading state to show a loading indicator
            <td colSpan="10000">Loading...</td>
          ) : (
            <td colSpan="10000"></td>
          )}
        </TableRow>
      </TableBody>
    );
  };

  const renderTableOptions = () => {
    return (
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          md={8}
          sx={{ ml: 5 }}
        >
          <Grid item>
            <span>Show </span>
          </Grid>
          <Grid item>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <InputLabel id="select-records-per-page">Records</InputLabel>
              <Select
                labelId="select-records-per-page"
                id="demo-simple-select-helper"
                value={pageSize}
                label="Records"
                autoWidth
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <span>per page</span>
          </Grid>
        </Grid>
        <Grid item md={3} sx={{ mr: 5 }}>
          <Stack>
            <Button
              onClick={() => handleFormDialogClickOpen()}
              variant="contained"
              startIcon={<AddLinkIcon />}
            >
              Add
            </Button>
          </Stack>
        </Grid>
      </Grid>
    );
  };

  const renderPagination = () => {
    return (
      <Grid
        sx={{ mt: 5, mb: 5 }}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid sx={{ mr: 3 }}>
          <Button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            variant="contained"
          >
            Previous
          </Button>
        </Grid>
        <Grid sx={{ mr: 3 }}>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
        </Grid>
        <Grid sx={{ mr: 1 }}>
          <Button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            variant="contained"
          >
            Next
          </Button>
        </Grid>
      </Grid>
    );
  };

  // Render the UI for your table
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Grid container>
        <Grid item xs={12}>
          {renderTableOptions()}
        </Grid>
        <Grid item xs={12}>
          <Table {...getTableProps()}>
            {renderHeader()}
            {renderBody()}
          </Table>
        </Grid>
        <Grid item xs={12}>
          {renderPagination()}
        </Grid>
      </Grid>
      <FormDialog
        isOpen={formDialogState}
        handleClose={handleFormDialogClickClose}
      />
    </Paper>
  );
};
