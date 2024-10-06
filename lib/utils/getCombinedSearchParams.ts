// export const getBaseStringForNewRouteFromSearchParams = (
//   baseRoute: string,
//   searchParams: { [key: string]: string | string[] | undefined },
//   desiredParamToAdd: "sort" | "tag" | "search" | "view"
// ) => {
//   const currentSort = searchParams.sort as string;
//   const currentTag = searchParams.tag as string;
//   const currentSearchTerm = searchParams.search as string;
//   const currentView = searchParams.view as string;
//   const currRoute = `/${baseRoute}?`;

//   const isStillBaseRoute = (updatedRoute: string) => {
//     return updatedRoute === currRoute;
//   };

//   if (desiredParamToAdd === "sort") {
//     const currRouteAndTag = currentTag
//       ? `${currRoute}tag=${currentTag}`
//       : currRoute;
//     const currRouteTagAndSearch = currentSearchTerm
//       ? `${currRouteAndTag}${isStillBaseRoute(currRouteAndTag) ? "" : "&"}search=${currentSearchTerm}`
//       : currRouteAndTag;
//     const currRouteTagSearchAndView = currentView
//       ? `${currRouteTagAndSearch}${isStillBaseRoute(currRouteTagAndSearch) ? "" : "&"}view=${currentView}`
//       : currRouteTagAndSearch;
//     return currRouteTagSearchAndView;
//   } else if (desiredParamToAdd === "tag") {
//     const currRouteAndSort = currentSort
//       ? `${currRoute}sort=${currentSort}`
//       : currRoute;
//     const currRouteSortSearch = currentSearchTerm
//       ? `${currRouteAndSort}${isStillBaseRoute(currRouteAndSort) ? "" : "&"}search=${currentSearchTerm}`
//       : currRouteAndSort;
//     const currRouteSortSearchAndView = currentView
//       ? `${currRouteSortSearch}${isStillBaseRoute(currRouteSortSearch) ? "" : "&"}view=${currentView}`
//       : currRouteSortSearch;
//     return currRouteSortSearchAndView;
//   } else if (desiredParamToAdd === "search") {
//     const currRouteAndSort = currentSort
//       ? `${currRoute}sort=${currentSort}`
//       : currRoute;
//     const currRouteSortAndTag = currentTag
//       ? `${currRouteAndSort}${isStillBaseRoute(currRouteAndSort) ? "" : "&"}tag=${currentTag}`
//       : currRouteAndSort;
//     const currRouteSortTagAndView = currentView
//       ? `${currRouteSortAndTag}${isStillBaseRoute(currRouteSortAndTag) ? "" : "&"}view=${currentView}`
//       : currRouteSortAndTag;
//     return currRouteSortTagAndView;
//   } else if (desiredParamToAdd === "view") {
//     const currRouteAndSort = currentSort
//       ? `${currRoute}sort=${currentSort}`
//       : currRoute;
//     const currRouteSortAndTag = currentTag
//       ? `${currRouteAndSort}${isStillBaseRoute(currRouteAndSort) ? "" : "&"}tag=${currentTag}`
//       : currRouteAndSort;
//     const currRouteSortTagAndSearch = currentSearchTerm
//       ? `${currRouteSortAndTag}${isStillBaseRoute(currRouteSortAndTag) ? "" : "&"}search=${currentSearchTerm}`
//       : currRouteSortAndTag;
//     return currRouteSortTagAndSearch;
//   } else {
//     return currRoute;
//   }
// };

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
