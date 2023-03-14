import AuthContextProvider from "./AuthContext"
import CartContextProvider from "./CartContext"
import CategoryContextProvider from "./CategoryContext"
import DonHangContextProvider from "./DonHangContext"
import KhuyenMaiContextProvider from "./KhuyenMaiContext"
import MuaVuContextProvider from "./MuaVuContext"
import ProductContextProvider from "./ProductContext"

export const ContextProvider = ({ children }) => {
    return (
        <AuthContextProvider>
        <ProductContextProvider>
          <CategoryContextProvider>
            <KhuyenMaiContextProvider>
              <CartContextProvider>
                <MuaVuContextProvider>
                  <DonHangContextProvider>
                    {children}
                  </DonHangContextProvider>
                </MuaVuContextProvider>
              </CartContextProvider>
            </KhuyenMaiContextProvider>
          </CategoryContextProvider>
        </ProductContextProvider>
      </AuthContextProvider>
    )
}