export const getUniqueId = (function () {
  let id = 0;
  return () => {
    id++;
    return id;
  };
})();
