import { useQuery } from "@vue/apollo-composable";
import defu from "defu";
import type { DocumentNode } from "graphql";

export function useApolloQuery(...params: Parameters<typeof useQuery>) {
    const cookieToken = useCookie('auth-token')
    if (cookieToken.value) {
        const options = defu(params[1], {
            context: {
                header: {
                    authorization: `Bearer ${cookieToken.value}`
                }
            }
        })
        return useQuery(params[0], options)
    }

}