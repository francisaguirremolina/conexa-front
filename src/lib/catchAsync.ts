const catchAsync = (fn: any) => (params) => {
  Promise.resolve(fn({ ...params })).catch((err) => {
    const message = err?.response?.data?.message;
    const code = err?.response?.data?.code;

    throw message || code || err;
  });
};

export default catchAsync;
