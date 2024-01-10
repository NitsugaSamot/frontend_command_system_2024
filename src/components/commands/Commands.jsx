import { useState, useEffect } from 'react';
import clienteAxios from '../../config/clienteAxios';
import Header from '../header/Header';


// ... (imports y código anterior)

function Commands() {
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    clienteAxios.get('/command')
      .then(response => {
        setCommands(response.data);
      })
      .catch(error => {
        console.error("Error al obtener los comandos:", error);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-wrap">
        {commands.map(command => (
          <div key={command._id} className="p-5 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <div className="bg-gray-200 p-4 rounded mb-4">
              <p className="font-bold">Mesera(o): {command.waiter}</p>
              <p>Mesa: {command.table}</p>
              <p>Comensales: {command.diners}</p>
              <p className='bg-red-400 p-2 m-3 text-white rounded'>{command.state}</p>

              <h3 className="font-bold mt-2">Elementos de la Comanda:</h3>
              <ul>
                {command.command.map((item, index) => (
                  <li key={index}>
                    {item.quantity} {item.name} - ${item.subtotal}
                  </li>
                ))}
              </ul>

              <p className="font-bold mt-2">Total: ${command.command.reduce((acc, item) => acc + item.subtotal, 0)}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Commands;

// function Commands() {
//   const [commands, setCommands] = useState([]);

//   useEffect(() => {
//     clienteAxios.get('/command')
//       .then(response => {
//         setCommands(response.data);
//       })
//       .catch(error => {
//         console.error("Error al obtener los comandos:", error);
//       });
//   }, []);

//   return (
//     <>
//       <Header />
//       <div className="flex flex-wrap">
//         {commands.map(command => (
//           <div key={command._id} className="p-5 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
//             {/* Asegúrate de usar la propiedad única del objeto */}
//             { /* Aquí puedes mostrar detalles de cada comanda, por ejemplo: */ }
//             <div className="bg-gray-200 p-4 rounded mb-4">
//               <p className="font-bold">Mesera(o): {command.waiter}</p>
//               <p>Mesa: {command.table}</p>
//               <p>Comensales: {command.diners}</p>
//               <p className='bg-red-400 p-2 m-3 text-white rounded'>{command.state}</p>

//               {/* <p className=''>Estado: {command.state}</p> */}
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default Commands;

// import { useState, useEffect } from 'react';
// import clienteAxios from '../../config/clienteAxios';
// import Header from '../header/Header';

// function Commands() {
//   const [commands, setCommands] = useState([]);

//   useEffect(() => {
//     clienteAxios.get('/command')
//       .then(response => {
//         setCommands(response.data);
//       })
//       .catch(error => {
//         console.error("Error al obtener los comandos:", error);
//       });
//   }, []);

//   return (
//     <>
//       <Header />
//       <div>
//         <h1>Commands</h1>
//         <div className='p-5'>
//           {commands.map(command => (
//             <div key={command._id}>{/* Asegúrate de usar la propiedad única del objeto */}
//               { /* Aquí puedes mostrar detalles de cada comanda, por ejemplo: */ }
//               <p>Waiter: {command.waiter}</p>
//               <p>Table: {command.table}</p>
//               <p>Diners: {command.diners}</p>
//               <p>State: {command.state}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Commands;
