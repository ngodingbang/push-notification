import { parseArgs } from "util";

export default parseArgs({
  args: Bun.argv,
  options: {
    "experimental-https": {
      type: "boolean",
      default: false,
    },
  },
  strict: true,
  allowPositionals: true,
});
