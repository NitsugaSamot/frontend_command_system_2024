import ReactModal from "react-modal";
import { useState, useEffect } from "react"
import clienteAxios from "../../config/clienteAxios"
import Alert from "../alert/Alert"

function ModalMenu({ closeMenuModal }) {

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [stock, setStock] = useState('')
  // const [image, setImage] = useState('')
  const [categories, setCategories] = useState([])
  const [alert, setAlert] = useState('')

  useEffect(() => {
      // Realizar una solicitud HTTP para obtener las categorías disponibles
      clienteAxios('/api/menu/categories')
        .then(response => {
          // Transforma las categorías para que la primera letra esté en mayúscula
          const formattedCategories = response.data.map(category => capitalizeFirstLetter(category));
          setCategories(formattedCategories);
        })
        .catch(error => console.error('Error:', error));
    }, []);


    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const handleCategoryChange = (e) => {
      setCategory(e.target.value); // Establece la categoría seleccionada
  };

  const handleSubmit = async e => {
      e.preventDefault()

      if([name, category, price].includes('')){
          setAlert({
              msg: 'Todos los campos son obligatorios',
              error: true
          })
      }

      setAlert({})

      try {
          const {data} = await clienteAxios.post('/menu', {name, price, category, stock})

          setAlert({
              msg: data.msg,
              error: false
             })

          setName('')
          setPrice('')
          setCategory('')
          setStock('')
          
      } catch (error) {
          setAlert({
              msg: error.response.data.msg,
              error: true
          })
      }
  }

  const { msg } = alert

  return (
    <ReactModal
      isOpen={true}
      onRequestClose={closeMenuModal}
      className="modal mx-auto max-w-3xl bg-gray-200 rounded-lg p-8 mt-10"
      overlayClassName="overlay"
    >
        <button className="close-button p-5" onClick={closeMenuModal}>
          X
        </button>
      { msg && <Alert alert={alert}/> }
      <div className="modal-content">


        <form
            className=""
            onSubmit={handleSubmit}
        >
            <div className="my-5">
                <label 
                className="uppercase text-gray-700 block text-xl font-bold"
                htmlFor="nombres">
                    Nombre
                </label>
                
                <input 
                    id="nombre"
                    type="text"
                    placeholder="Nombre"
                    className="w-full mt-3 p-3 border rounded bg-gray-50"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label 
                className="uppercase text-gray-700 block text-xl font-bold"
                htmlFor="precio">
                    Price
                </label>
                
                <input 
                    id="precio"
                    type="number"
                    placeholder="Precio"
                    className="w-full mt-3 p-3 border rounded bg-gray-50"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label 
                className="uppercase text-gray-700 block text-xl font-bold"
                htmlFor="stock">
                    Stock
                </label>
                
                <input 
                    id="stock"
                    type="number"
                    placeholder="stock"
                    className="w-full mt-3 p-3 border rounded bg-gray-50"
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label 
                className="uppercase text-gray-700 block text-xl font-bold"
                htmlFor="categoria">
                    Categoria
                </label>

                <select
                        id="categoria"
                        className="w-full mt-3 p-3 border rounded bg-gray-50"
                        value={category}
                        onChange={handleCategoryChange}
                    >
                        <option value="">Selecciona una categoría</option>
                        {categories.map((categoryItem, index) => (
                            <option key={index} value={categoryItem}>
                                {categoryItem}
                            </option>
                        ))}
                    </select>
                
                <input 
                    id="nombre"
                    type="text"
                    placeholder="Categoria"
                    className="w-full mt-3 p-3 border rounded bg-gray-50"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                />
            </div>

            <input 
            type="submit" 
            value="Crear Nuevo Plato"
            className="bg-orange-500 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer transition-colors hover:bg-orange-600"    
        />

        </form>
        
      </div>
    </ReactModal>
  );
}

export default ModalMenu;
