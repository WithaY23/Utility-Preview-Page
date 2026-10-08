import { useSearchParams } from "react-router-dom"

// Find css id's in this format Lowercase slug
export function tagAnchorId(name: string) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

type AuthUrlValue = "signin" | "signup"


function parseAuthValue(value : string | null) : AuthUrlValue | null
{
    return value === 'signin' || value === 'signup' ? value : null
}
export function useAuthModal()
{
    const [urlParams, setUrlParams] = useSearchParams()
    const authParamValue : AuthUrlValue | null = parseAuthValue(urlParams.get('auth'))
    const setAuthParam = (value : AuthUrlValue) =>
    {
        setUrlParams((prev) => {
        const addedParam = new URLSearchParams(prev)
        addedParam.set('auth', value)
        return addedParam
        }, {replace: true})
    }

    const deleteAuthParam = () =>
    {
        setUrlParams((prev) => {
        const removedParam = new URLSearchParams(prev)
        // console.log('inside deleteAuthParam, removedParam', removedParam, "prev", prev)
        removedParam.delete('auth')
        // console.log('removedParam', removedParam)
        return removedParam
        }, {replace: true})
        
    }
    return {isOpen: authParamValue !== null, authParamValue, setAuthParam, deleteAuthParam}
}