declare module "init-with-dom" {
  const iwd = {
    add: function (
      name: string,
      handler: (attrs: object) => void
    ): void {},
    replace: function (
      name: string,
      handler: (attrs: object) => void
    ): void {},
    remove: function (
      name: string
    ): void {},
    removeAll: function (): void {},
  };

  export = iwd;
}
