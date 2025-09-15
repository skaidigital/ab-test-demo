import { serialize } from "flags/next";

export const getDefaultCode = async () => {
  const emptyCode = await serialize([], []);
  return emptyCode;
};
