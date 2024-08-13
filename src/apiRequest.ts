export const apiRequest = async (url = "", optionsObj = {}) => {
  let errMsg = "";
  try {
    const res = await fetch(url, optionsObj);
    if (!res.ok) throw new Error("Please reload the app");
  } catch (error) {
    if (error instanceof Error) {
      errMsg = error.message;
    }
  }
  return errMsg;
};
