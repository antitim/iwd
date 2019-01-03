declare module "init-with-dom" {
  const middleware = function (node: Element, attrs: object): object {};
  const handler = function (attrs: object): void {};

  const iwd = {
    add: function (
      name: string,
      handler: handler,
    ): void {},
    replace: function (
      name: string,
      handler: handler,
    ): void {},
    remove: function (
      name: string,
    ): void {},
    removeAll: function (): void {},
  }

  export = iwd;
}
