import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Skeleton,
} from "@mui/material";

interface Dependency {
  dependency: string;
  version: string;
  latestVersion?: string;
  tarball?: string;
  unpackedSize?: string;
}

interface DependencyTableProps {
  dependencies: Dependency[];
  isLoading?: boolean;
}

// ... (imports and interfaces remain the same)

const DependencyTable: React.FC<DependencyTableProps> = ({
  dependencies,
  isLoading,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function compareVersions(version1 : string, version2 : string) {
    const v1Components = version1.split('.').map(Number);
    const v2Components = version2.split('.').map(Number);

    console.log({ v1Components, v2Components });

    for (let i = 0; i < Math.max(v1Components.length, v2Components.length); i++) {
        const v1Component = v1Components[i] || 0;
        const v2Component = v2Components[i] || 0;

        if (v1Component < v2Component) {
            console.log("v1 < v2");
            return -1; 
        } else if (v1Component > v2Component) {
            console.log("v1 > v2");
            return 1;  

        }
    }

    return 0; // versions are equal
}

  const displayedDependencies = dependencies.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Calculate total unpackedSize
  const totalUnpackedSize = dependencies.reduce(
    (total, dependency) =>
      total + (dependency.unpackedSize ? parseInt(dependency.unpackedSize) : 0),
    0
  );

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                fontWeight: "bold",
                backgroundColor: "#f0f0f0",
              }}
            >
              <TableCell>#</TableCell>
              <TableCell>Dependency</TableCell>
              <TableCell>Version</TableCell>
              <TableCell align="center">Latest Version</TableCell>
              <TableCell align="center">Unpacked Size</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedDependencies.map((dependency, index) => (
              <TableRow
                key={dependency.dependency}
                sx={
                  dependency.latestVersion &&
                  dependency.version &&
                  compareVersions(dependency.latestVersion, dependency.version) > 0
                    ? { backgroundColor: "#FFEBEE" } // Red background for outdated versions
                    : {}
                }
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{dependency.dependency}</TableCell>
                <TableCell>{dependency.version}</TableCell>
                {!isLoading ? (
                  <TableCell align="center">
                    {dependency.latestVersion ? dependency.latestVersion : "-"}
                  </TableCell>
                ) : (
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                )}
                {!isLoading ? (
                  <TableCell align="center">
                    {dependency.unpackedSize
                      ? (
                          parseInt(dependency.unpackedSize) /
                          1024 /
                          1024
                        ).toFixed(2) + " MB"
                      : "-"}
                  </TableCell>
                ) : (
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                )}
              </TableRow>
            ))}
            {/* Total unpackedSize row */}
            <TableRow>
              <TableCell colSpan={3} />
              <TableCell align="right">Total Unpacked Size : </TableCell>
              <TableCell align="center">
                {totalUnpackedSize
                  ? (totalUnpackedSize / 1024 / 1024).toFixed(2) + " MB"
                  : "-"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={dependencies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default DependencyTable;
