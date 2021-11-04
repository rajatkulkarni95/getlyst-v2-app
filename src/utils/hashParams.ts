// To be called only in useEffect or by checking if typeof window !== 'undefined' since Next.js
// won't allow window to be defined as its client side while the framework renders stuff on the server
// So only can be executed when the code hydrates the client
export const getHashParams = () => {
  // Client-side-only code
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce(function (initial: { [key: string]: any }, item) {
      if (item) {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
};

export const removeHashParamsFromUrl = () => {
  window.history.pushState(
    "",
    document.title,
    window.location.pathname + window.location.search
  );
};
