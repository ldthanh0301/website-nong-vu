import React, { useContext } from 'react'
import Button from 'react-bootstrap/esm/Button'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { CategoryContext } from '../../contexts/CategoryContext'

function Actionbuttons({_id}) {
  const {deleteCategory, setShowUpdateCategoryModal,findCategory} = useContext(CategoryContext)
  const chooseCategory = (_id) => {
    findCategory(_id)
    setShowUpdateCategoryModal(true)
  }
  return (
    <>
    <Button className="post-button" onClick={chooseCategory.bind(this, _id)}>
      <img src={editIcon} alt="edit" width="24" height="24" />
    </Button>{" "}
    <Button style={{float:'right'}} onClick={deleteCategory.bind(this,_id)}>
        <img src={deleteIcon} alt="delete" width="24" height="24" />
    </Button>
</>
  )
}

export default Actionbuttons