import CategoryContextProvider from "./CategoryContext"

export const ContextProvider = ({ children }) => {
    return (
        <CategoryContextProvider>
            {children}
        </CategoryContextProvider>
    )
}