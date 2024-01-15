import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Snackbar,
  TextField,
  Grid,
  Modal,
} from "@mui/material";
import { ImSvg } from "react-icons/im";
import { IoIosCloseCircle } from "react-icons/io";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const SVGViewer: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
              accept="image/svg+xml"
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
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <IoIosCloseCircle
              size={24}
              onClick={handleClose}
              style={{ cursor: "pointer", color: "#1976d2" }}
            />

            {selectedFile && (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt={selectedFile?.name}
                style={{ width: "100%" }}
              />
            )}

            {selectedFile && (
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(selectedFile.name);
                  setSnackbarOpen(true);
                }}
                sx={{
                  marginTop: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                  borderRadius: "4px",
                  padding: "8px",
                  width: "100%",
                }}
              >
                {selectedFile?.name}
              </Button>
            )}
          </Box>
        </Modal>
      </div>
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
                setSelectedFile(file);

                handleOpen();
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
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </Box>
  );
};

export default SVGViewer;
