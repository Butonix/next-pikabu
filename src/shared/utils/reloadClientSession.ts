export const reloadClientSession = () => {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
};
