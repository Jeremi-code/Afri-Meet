import { useQuery } from "@vue/apollo-composable";
import defu from "defu";

export function useApolloQuery(...params: Parameters<typeof useQuery>) {
    const cookieToken = useCookie('auth-token')
    console.log("WOooooo", cookieToken.value)
    if (cookieToken.value) {
        const options = defu({
            context: {
                header: {
                    authorization: `Bearer ${cookieToken.value}`
                }
            }
        }, params[2])
        return useQuery(params[0], params[1], options)
    }
    return useQuery(...params)

}
// import type { DocumentNode } from "graphql"
// import defu from "defu"
// export function useApolloQuery<TData=any,TVariable=any>(query:DocumentNode,variables?:TVariable,options? : object ) {
//     const cookieToken = useCookie('auth-token')
//     if(cookieToken.value) {
//         const mergedOptions = defu(options , {
//             context : {
//                 header : {
//                     authorization :    `Bearer ${cookieToken.value}`
//                 }
//             }
//         })
//         if (variables !=undefined)
//         return useQuery(query,variables,mergedOptions)
//         else return useQuery(query,mergedOptions)
//     }
//     return useQuery(query)
// }