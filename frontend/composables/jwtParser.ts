import { importSPKI, jwtVerify } from "jose"

export function useJwtParser() {
    const runtimeConfig = useRuntimeConfig()


    return { 
        async parse(token?: string | null) {
            if (!token) {
                return null
            }
            const publicKey = await importSPKI(runtimeConfig.public.jwtKey, 'RS256')
            const result = await jwtVerify(token, publicKey, {algorithms: ['RS256']}).catch(error => {
                console.warn('Error parsing JWT Token', error)
                return null
            })
            return result;
        }
    }
}