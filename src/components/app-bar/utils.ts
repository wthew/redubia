export function mustRenderAppBar(path: string) {
  switch (path) {
    case "/":
    case "/sign-in":
    case "/sign-up":
      return false

    default:
      return true
  }
}
