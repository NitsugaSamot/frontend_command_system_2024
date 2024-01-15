import ReactModal from "react-modal";
import { useState } from "react";
import clienteAxios from "../../config/clienteAxios";
import Alert from "../alert/Alert";
import { useNavigate } from "react-router-dom";
import "./new-command.css"

function ModalCommand({closeCreateCommandModal, commandItems}) {
  const [waiter, setWaiter] = useState('');
  const [table, setTable] = useState('');
  const [diners, setDinners] = useState('');
  const [alert, setAlert] = useState('');

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([table, diners, waiter].includes('')) {
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
    }

    setAlert({});

    try {
      const { data } = await clienteAxios.post('/api/command', { table, diners, waiter, command: Object.values(commandItems) });

      setAlert({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlert({}); // Limpiar el mensaje después de 5 segundos
        navigate('/app/commands')
      }, 5000); // 5000 milisegundos = 5 segundos

      setWaiter('');
      setDinners('');
      setTable('');

      

      
      // Call the callback function to update the state in the Home component
      // onAddCommand({ waiter, table, diners });
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }

  const { msg } = alert;

  return (
    <ReactModal
      isOpen={true}
      onRequestClose={closeCreateCommandModal}
      className="modal text-center mx-auto max-w-3xl bg-gray-200 rounded-lg p-8 mt-10"
      overlayClassName="overlay"
    >
      <button className="p-3 close-button" onClick={closeCreateCommandModal}>
        X
      </button>

      <div className="div-command">
              <h2 className="text-xl font-bold mb-4">Comanda</h2>
                <div>
                {Object.values(commandItems).map((commandItem, index) => (
                  <p className="text-lg" key={index}>
                    {commandItem.quantity} {commandItem.name} 
                  </p>
                ))}
              </div>
            </div>

     
      <form
            className=""
            onSubmit={handleSubmit}
        >


            <div className="my-5">
                <label 
                className="uppercase text-gray-700 block text-xl font-bold"
                htmlFor="mozo-a">
                    Mozo(a)
                </label>
                
                <input 
                    id="mozo-a"
                    type="text"
                    placeholder="Mozo"
                    className="w-full mt-3 p-3 border rounded bg-gray-50"
                    value={waiter}
                    onChange={e => setWaiter(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label 
                className="uppercase text-gray-700 block text-xl font-bold"
                htmlFor="mesa">
                    Mesa
                </label>
                
                <input 
                    id="mesa"
                    type="number"
                    placeholder="Mesa"
                    className="w-full mt-3 p-3 border rounded bg-gray-50"
                    value={table}
                    onChange={e => setTable(e.target.value)}
                />
            </div>

            <div className="my-5">
                <label 
                className="uppercase text-gray-700 block text-xl font-bold"
                htmlFor="comensales">
                    Comensales
                </label>
                
                <input 
                    id="comensales"
                    type="number"
                    placeholder="Comensales"
                    className="w-full mt-3 p-3 border rounded bg-gray-50"
                    value={diners}
                    onChange={e => setDinners(e.target.value)}
                />
            </div>
            {msg && <Alert alert={alert} />}
            <input 
            type="submit" 
            value="Crear nueva comanda"
            className="bg-orange-500 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer transition-colors hover:bg-orange-600"    
        />

      </form>




    
    </ReactModal>
  );
}

export default ModalCommand;
