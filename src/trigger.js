export default (target, eventName, detail) => {
  let event;

  try {
    event = new CustomEvent(eventName, {
      detail
    });
  } catch (e) {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, false, false, detail);
  }

  target.dispatchEvent(event);
};
