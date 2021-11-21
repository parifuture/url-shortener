import React from "react";
import { usePagination, useTable } from "react-table";
import { format } from "date-fns";

import CssBaseline from "@material-ui/core/CssBaseline";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { getAllCodes, deleteCode } from "./api/codes";

function Table({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
}) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
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
      pageCount: controlledPageCount,
    },
    usePagination
  );

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  // Render the UI for your table
  return (
    <div>
      <div className="displayOption">
        <div className="selectDisplayContainer">
          Show
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          records per page
        </div>
        <div className="addActionContainer">
          <button type="button" onClick={() => alert()}>
            ADD{" "}
          </button>
        </div>
      </div>
      <MaUTable {...getTableProps()}>
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
        <TableBody>
          {page.map((row, i) => {
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
      </MaUTable>
      <div className="pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"Previous"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {"Next"}
        </button>{" "}
      </div>
    </div>
  );
}

function App() {
  const handleDelete = async (someId) => {
    console.log(`handleDelete`, someId.row.original.actions);
    const deleted = await deleteCode(someId.row.original.actions);
    console.log(`deleted: ${deleted}`);
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
          <button onClick={() => handleDelete(cell)}>Delete</button>
        ),
      },
    ],
    []
  );

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);

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
    console.log(`pageIndex: ${pageIndex}, pageSize: ${pageSize}`);
    const fetchedServerData = await getAllCodes(pageSize, pageIndex);
    const processedData = processData(fetchedServerData.data);

    setData(processedData);

    setPageCount(fetchedServerData.pageCount);

    setLoading(false);
  }, []);

  return (
    <div className="container">
      <div className="heading">
        <h1>URL Shortener</h1>
      </div>
      <div className="tableContainer">
        <CssBaseline />
        <Table
          columns={columns}
          data={data}
          fetchData={fetchData}
          loading={loading}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
}

export default App;
