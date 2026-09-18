import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "qkmsxhv6",
    dataset: "production",
  },
  // The hostname the Studio is deployed to: https://zerotheory.sanity.studio
  studioHost: "zerotheory",
  autoUpdates: true,
});
