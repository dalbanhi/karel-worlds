export const buildRouteWithUpdatedParams = (
  baseRoute: string,
  searchParams: { [key: string]: string | string[] | undefined },
  paramsToUpdate: { [key: string]: string | undefined }
) => {
  const urlParams = new URLSearchParams(searchParams as Record<string, string>);

  // Update or remove parameters as necessary
  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === undefined) {
      urlParams.delete(key);
    } else {
      if (key === "search") {
        value = encodeURIComponent(value);
      }
      urlParams.set(key, value);
    }
  });

  return `/${baseRoute}?${urlParams.toString()}`;
};
