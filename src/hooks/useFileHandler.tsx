import { useState, ChangeEvent, useCallback } from "react";
import { getPkgInfo } from "../api/pkgApi";

interface FileHandlerProps {
  file: File | null;
  pkgDepData: any[];
  isLoading: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCheckDependencies: () => void;
  apiProgress: number;
}

const useFileHandler = (): FileHandlerProps => {
  const [file, setFile] = useState<File | null>(null);
  const [pkgDepData, setPkgDepData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiProgress, setApiProgress] = useState(0);

  const handleChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];

      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const content = e.target?.result as string;
          const packageJson = JSON.parse(content);

          const dependencies = packageJson.dependencies;
          const dependenciesArray = Object.entries(dependencies).map(([name, key]) => ({
            dependency: name,
            version: key,
            latestVersion: "",
            tarball: "",
            unpackedSize: "",
          }));

          console.log(dependenciesArray);
          setPkgDepData(dependenciesArray);
          setFile(selectedFile);
        } catch (error) {
          console.error("Error reading package.json file:", error);
        }
      };

      reader.readAsText(selectedFile);
    }
  }, []);

  const handleCheckDependencies = useCallback(async () => {
    if (pkgDepData) {
        setApiProgress(1)
        const totalData = pkgDepData.length;
        let progress = 0;
    

      try {
        setIsLoading(true);
        const updatedPkgDepData = await Promise.all(
          pkgDepData.map(async (pkg) => {
            const response = await getPkgInfo(pkg.dependency, pkg.version);
          
            progress += 1;
            setApiProgress((progress / totalData) * 100);
            return response;
          })
        );
   


        console.log(updatedPkgDepData);
        setPkgDepData(updatedPkgDepData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error checking dependencies:", error);
        setIsLoading(false);
      }
    }
  }, [pkgDepData]);

  return { file, pkgDepData, isLoading, handleChange, handleCheckDependencies ,apiProgress };
};

export default useFileHandler;
