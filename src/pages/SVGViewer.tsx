import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Snackbar,
  TextField,
  Grid,
} from "@mui/material";
import { ImSvg } from "react-icons/im";

const SVGViewer: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Grid container>
        <Grid item alignItems="stretch" style={{ display: "flex" }}>
          <Button
            component="label"
            variant="contained"
            startIcon={<ImSvg />}
            sx={{ marginRight: "16px" }}
          >
            Upload SVG files
            <input
              type="file"
              multiple
              onChange={(e) => {
                const selectedFiles = e.target.files;
                if (selectedFiles) {
                  setFiles(Array.from(selectedFiles));
                }
              }}
              style={{ display: "none" }}
            />
          </Button>
        </Grid>
        <Grid item alignItems="stretch">
            <TextField
              label="Search"
              variant="outlined"
              disabled={!(files.length > 0)}
              
              sx={{ flexGrow: 1, minWidth: 0 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(calc(150px - 16px), 1fr))",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file) => (
            <div
              key={file.name}
              style={{
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ECECEC",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => {
                navigator.clipboard.writeText(file.name);
                setSnackbarOpen(true);
              }}
            >
              <div style={{ flex: 1, marginBottom: "8px" }}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <Typography
                variant="body2"
                sx={{ fontSize: 14, fontWeight: 500, textAlign: "center" }}
              >
                {file.name}
              </Typography>
            </div>
          ))
        ) : (
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              marginTop: "16px",
              gridColumn: "1 / -1",
            }}
          >
            No matching files found.
          </Typography>
        )}
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="File name copied to clipboard!"
      />
    </Box>
  );
};

export default SVGViewer;
