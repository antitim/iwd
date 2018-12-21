export default (nodes, callback) => {
  for (let i = 0; i < nodes.length; i++) {
    callback(nodes[i], i);
  }
};
