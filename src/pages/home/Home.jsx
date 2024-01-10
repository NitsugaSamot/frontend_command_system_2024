import { useState, useEffect } from 'react';
import clienteAxios from '../../config/clienteAxios';
import Header from '../../components/header/Header';
import ModalCommand from '../../components/new-command/ModalCommand';
import ModalMenu from '../../components/create-menu/ModalMenu';
import './styles-home.css'

function Home() {
  const [categoryItems, setCategoryItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [commandItems, setCommandItems] = useState([]);
  const [total, setTotal] = useState(0);

    // Nuevo estado para el modal

    const [isModalMenuOpen, setIsModalMenuOpen] = useState(false);

    const [isCreateCommandModalOpen, setIsCreateCommandModalOpen] = useState(false);

// ...

// Función para abrir el modal de creación de comanda
const openCreateCommandModal = () => {
  setIsCreateCommandModalOpen(true);
};

// Función para cerrar el modal de creación de comanda
const closeCreateCommandModal = () => {
  setIsCreateCommandModalOpen(false);
};

    // Función para abrir el modal
    const openMenuModal = () => {
      setIsModalMenuOpen(true);
    };
  
    // Función para cerrar el modal
    const closeMenuModal = () => {
      setIsModalMenuOpen(false);
    };
  
    


  useEffect(() => {
    clienteAxios('/menu/categories')
      .then(response => {
        const formattedCategories = response.data.map(category => capitalizeFirstLetter(category));
        setCategoryItems(formattedCategories);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      clienteAxios(`/menu/categories/${selectedCategory}`)
        .then(response => setMenuItems(response.data))
        .catch(error => console.error('Error:', error));
    }
  }, [selectedCategory]);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCommand = (menuItem) => {
    const updatedCommandItems = { ...commandItems };
    if (updatedCommandItems[menuItem._id]) {
      updatedCommandItems[menuItem._id].quantity += 1;
      updatedCommandItems[menuItem._id].subtotal += menuItem.price;
    } else {
      updatedCommandItems[menuItem._id] = { ...menuItem, quantity: 1, subtotal: menuItem.price };
    }
    setCommandItems(updatedCommandItems);
  };

  const handleRemoveFromCommand = (menuItem) => {
    const updatedCommandItems = { ...commandItems };
    if (updatedCommandItems[menuItem._id]) {
      if (updatedCommandItems[menuItem._id].quantity === 1) {
        delete updatedCommandItems[menuItem._id];
      } else {
        updatedCommandItems[menuItem._id].quantity -= 1;
        updatedCommandItems[menuItem._id].subtotal -= menuItem.price;
      }
    }
    setCommandItems(updatedCommandItems);
  };

  useEffect(() => {
    let newTotal = 0;
    for (const itemId in commandItems) {
      const item = commandItems[itemId];
      newTotal += item.subtotal;
    }
    setTotal(newTotal);
  }, [commandItems]);

  return (
    <>

      <Header />

       {/* <div className="command mt-8">
          <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={openMenuModal}>
              Nuevo Menú
          </button>

          {isModalMenuOpen && (
               <ModalMenu closeMenuModal={closeMenuModal} />
          )}
       </div> */}
 
            <div className="flex flex-wrap categories-div">
              {categoryItems.map((categoryItem, index) => (
                <div className="categories" key={index}>
                  <button
                    className="button-category"
                    onClick={() => handleCategoryClick(categoryItem)}
                  >
                    {categoryItem}
                  </button>
                </div>
              ))}
            </div>
 

      <div className="container-command">
        <div className="menu-by-category">
          {/* <div className="md:w-3/4 md:pl-4"> */}
          <div className="">

            <h2 className="text-xl font-bold mb-4">{selectedCategory}</h2>
            <div className="container-items grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

              {menuItems.map((menuItem, index) => (
                <div className="border p-2 menu-item" key={index}>


                  <div className="p-item border p-4 mb-4">
                    <p className="font-bold">{menuItem.name}</p>
                    <p className="text-sm">${menuItem.price}</p>
                  </div>

                  <div className="div-buttons flex gap-2 justify-center">
                    <button
                      className="button-menu bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleRemoveFromCommand(menuItem)}
                    >
                      -
                    </button>
                    <button
                      className="button-menu bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleAddToCommand(menuItem)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="command mt-8">
          <h2 className="text-xl font-bold mb-4">Comanda</h2>
          <div className="container-items-command">
            {Object.values(commandItems).map((commandItem, index) => (
              <div className="command-item border p-4 mb-4" key={index}>
                <p className="font-bold">
                  {commandItem.quantity} {commandItem.name} - ${commandItem.subtotal}
                </p>
                <div className="div-buttons mt-4 flex gap-2 justify-center">
                  <button
                    className="button-menu bg-black text-white px-2 py-1 rounded"
                    onClick={() => handleRemoveFromCommand(commandItem)}
                  >
                    -
                  </button>
                  <button
                    className="button-menu bg-black text-white px-2 py-1 rounded"
                    onClick={() => handleAddToCommand(commandItem)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="total mt-4 border p-4 text-center">
            <p className="font-bold">Total: ${total}</p>
          </div>

          <div className="command mt-8">
            <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={openCreateCommandModal}>
              Crear Comanda
            </button>
          </div>

            {isCreateCommandModalOpen && (
              <ModalCommand closeCreateCommandModal={closeCreateCommandModal} commandItems={commandItems} />
            )}

        </div>
      </div>
    </>
  );
}

export default Home;


