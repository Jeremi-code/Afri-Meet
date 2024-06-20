import defu from "defu";

export function useApolloMutation(...params: Parameters<typeof useMutation>) {
  const cookieToken = useCookie('auth-token')
  if (cookieToken.value) {
    const options = defu(params[1], {
      context: {
        headers: {
          Authorization: `Bearer ${cookieToken.value}`,
        }
      }
    })
    return useMutation(params[0], options)

  }

  return useMutation(params[0])
}