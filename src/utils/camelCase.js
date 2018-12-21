export default name => (
  name.replace(
    /-([a-z])/g,
    g => (g[1].toUpperCase())
  )
);
