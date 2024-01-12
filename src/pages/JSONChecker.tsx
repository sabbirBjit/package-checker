import useFileHandler from "../hooks/useFileHandler";
import { Box, Button, Typography } from "@mui/material";
import { IoMdCloudUpload } from "react-icons/io";
import { BsFiletypeJson } from "react-icons/bs";
import LinearProgressWithLabel from "../components/LinearProgressWithLabel";
import DependencyTable from "../components/DependencyTable";

const JSONChecker: React.FC = () => {
  const {
    file,
    pkgDepData,
    isLoading,
    handleChange,
    handleCheckDependencies,
    apiProgress,
  } = useFileHandler();
  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
    {!file ? (
      <Box
       sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        height: "100vh",
        
       }}

       
      >
        <BsFiletypeJson size={60} />
        <Button
          component="label"
          variant="contained"
          startIcon={<IoMdCloudUpload />}
        >
          Upload JSON file
          <input
            type="file"
            accept=".json"
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </Button>
      </Box>
    ) : (
      <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 2,
      }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >  
        <BsFiletypeJson size={30} />
          <Typography variant="h5" gutterBottom>
            {file.name}
          </Typography>
        </Box>
        <Button 
        disabled={isLoading || apiProgress>=100 } 
        variant="contained" onClick={handleCheckDependencies}>
          Check dependencies
        </Button>

        <LinearProgressWithLabel value={apiProgress} />
        {pkgDepData && (
          <DependencyTable dependencies={pkgDepData} isLoading={isLoading} />
        )}
      </Box>
    )}
  </Box>
  );
};

export default JSONChecker;
