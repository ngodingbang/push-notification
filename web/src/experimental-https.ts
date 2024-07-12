import { $, TLSOptions } from "bun";
import { mkdir } from "fs/promises";

export const generateTls = async (): Promise<TLSOptions | undefined> => {
  try {
    await $`mkcert -install`.quiet().nothrow();

    await mkdir("./certificates", { recursive: true });
    await $`mkcert -key-file ./certificates/localhost-key.perm -cert-file ./certificates/localhost.perm localhost 127.0.0.1 ::1`.quiet();

    return {
      key: Bun.file("./certificates/localhost-key.perm"),
      cert: Bun.file("./certificates/localhost.perm"),
    };
  } catch (error) {
    if (error?.name === "ShellError") {
      console.error(
        `Failed with code ${error?.exitCode}. Do you already installed "mkcert"? https://mkcert.dev/`
      );
    }

    console.error(error);
  }
};
