import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import deleteIcon from '../../assets/trash.svg'
import editIcon from '../../assets/pencil.svg'
import { ProductContext } from '../../contexts/ProductContext'
import {useContext} from 'react'

function AcctionButtons({_id}) {
    const {deleteProduct, setShowUpdateProductModal, findProduct} = useContext(ProductContext)
    const handlerUpdate = (_id) => {
      findProduct(_id)
      setShowUpdateProductModal(true)
    }
  return (
    <>
        <Button className="post-button" onClick={handlerUpdate.bind(this,_id)}>
          <img src={editIcon} alt="edit" width="24" height="24" />
        </Button>{" "}
        <Button style={{float:'right'}} onClick={deleteProduct.bind(this,_id)}>
            <img src={deleteIcon} alt="delete" width="24" height="24" />
        </Button>
    </>
  )
}

export default AcctionButtons