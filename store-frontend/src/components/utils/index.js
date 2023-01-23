import {
    useLocation,
    useNavigate,
} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';

  
export function linmap(min_val, max_val, divisions) {
    // Conditioning data
    min_val = Number(min_val);
    max_val = Number(max_val);
    divisions = Number(divisions);
    // Looping over!
    let temp = [min_val];
    let temp_val = min_val;
    for (let i = 0; i < divisions; i += 1) {
        temp_val = temp_val + ((max_val - min_val) / divisions);
        temp_val = Math.round(100 * temp_val) / 100;
        if (temp_val > max_val) {
            temp_val = max_val;
        }
        temp.push(temp_val);
    }
    return temp;
}


export const ModalRoute = ({ children }) => {
    const [opened, setOpened] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
  
    useEffect(() => {
        const id = location.pathname.split("/")[1]
        if (id) {
            setOpened(true)
        }
    }, [location.pathname])
  
    const handleClose = () => {
      navigate("/")
      setOpened(false)
    }
  
    return (
      <Modal size="xl" show={opened} onHide={handleClose}>
          {children}
      </Modal>
    )
}