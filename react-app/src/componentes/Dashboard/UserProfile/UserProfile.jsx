import { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import './UserProfile.css';

export default function ProductProfile(props) {
  const history = useHistory();
  const [user, setUser] = useState();
  let { id } = useParams();

  useEffect(() => 
    axios.get(`/users/user/${id}`)
      .then( (res) => setUser(res.data) )
      .catch( (err) => console.log(err.response) ),
  [id])
  const handleDelete = (event) => {
    event.preventDefault();
    axios.delete(`/users/user/${id}`)
      .then( (res) => history.push('/dashboard/users') )
      .catch( (err) => console.log(err.response) );
  }

  const disableButton = () => ( (props.user.role !== 'admin') && (props.user.id !== (user ? user.id : null)) ) ? true : false;
  const disableDeleteButton = () => (props.user.role !== 'admin') ? true : false;
  return (
    <div className="UserProfile">
      <Card id="cartao" style={{ width: '50%'}}>
        <Card.Img id="image" variant="top" src={user ? user.image : ''} />
              <Card.Body>
                  <p className="type">Nome: <Card.Text className="data">{user ? user.name : ''}</Card.Text></p>
                  <p className="type">Email: <Card.Text className="data">{user ? user.email : ''}</Card.Text></p>
                  <p className="type">Telefone: <Card.Text className="data">{user ? user.phone : ''}</Card.Text></p>
                  <p className="type">Papel: <Card.Text className="data">{user ? user.role : ''}</Card.Text></p>
                  <Link style={disableButton() ? {pointerEvents: 'none'}:null } to={`/dashboard/users/edit/${id}`}>
                    <Button id="edit-but" disabled={disableButton() ? true : false} variant="outline-warning">
                      Editar Usuário
                    </Button>
                  </Link>
                  <Button id="delet-but" disabled={disableDeleteButton() ? true : false} onClick={handleDelete} variant="outline-danger">
                    Deletar Usuário
                  </Button>
            </Card.Body>
      </Card>
    </div>
  )
}