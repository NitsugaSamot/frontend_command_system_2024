import { useState, useEffect } from 'react';
import clienteAxios from '../../config/clienteAxios';

function Menu() {
    const [menuItems, setMenuItems] = useState([]);
  
    useEffect(() => {
      // Realizar una solicitud HTTP para obtener los datos del menú utilizando Axios
      clienteAxios(`/menu`)
        .then(response => setMenuItems(response.data))
        .catch(error => console.error('Error:', error));
    }, []);
  
    return (
      <div>
        <h1>Menu</h1>
        <ul>
          {menuItems.map(menuItem => (
              
            <ul key={menuItem._id}>
              {menuItem.name} - Price: {menuItem.price} - Category: {menuItem.category}
            </ul>
          ))}
        </ul>
      </div>
    );
  }

  export default Menu;