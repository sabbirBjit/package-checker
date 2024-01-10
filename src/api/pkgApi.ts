import axios from "axios";

const getPkgInfo = async (pkgName: string, pkgVersion: string) => {
  try {
    pkgVersion = pkgVersion.replace("^", "");
    const response = await axios.get(
      `https://registry.npmjs.org/${pkgName}/${pkgVersion}`
    );
    const latestVersion = await axios.get(
      `https://registry.npmjs.org/${pkgName}`
    );

    const packageInfo = response.data;

    if (packageInfo.dist) {
      console.log(`Package: ${pkgName}@${pkgVersion}`);

      const retrivedPkgData = {
        dependency: pkgName,
        version: pkgVersion,
        latestVersion: latestVersion.data["dist-tags"].latest,
        tarball: packageInfo.dist.tarball,
        unpackedSize: packageInfo.dist.unpackedSize,
      };
      return retrivedPkgData;
    } else {
      return null;
    }
  } catch {
    alert("Package not found");
    return null;
  }
};

export { getPkgInfo };
