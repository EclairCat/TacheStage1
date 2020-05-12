import React from 'react';
import axios from "axios";

import { Button, Form, Container, Table } from 'react-bootstrap';


export class App extends React.Component {

  constructor(prop) {
    super(prop);


    this.state = {

      produits: [

      ],
      code: 0,
      designation: "",
      famille: "",
      prix: 0,
    };

    this.addProduit = this.addProduit.bind(this);
    this.delproduit = this.delproduit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getAllProduit = this.getAllProduit.bind(this);
    this.renderTableData = this.renderTableData.bind(this);
    this.updateProduit = this.updateProduit.bind(this);

  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  addProduit(event) {

    event.preventDefault();

    const { code, designation, famille, prix } = this.state;

    console.log(this.state);

    axios.post('http://localhost:4000/api/addProduit',
      {
        designation: designation,
        famille: famille,
        prix: prix,
      },
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(res => {

        if (res.status = 200) {


          window.confirm("Produit Ajouter!")
          //this.getAllProduit();
        }
        console.log(res);
        console.log(this.state);
      })
      .catch(error => {
        window.confirm("Erreur veuillez reessayer");
        console.log(this.state);
      })

  }

  delproduit(event) {

    event.preventDefault();

    const { code } = this.state;

    console.log(this.state);

    axios.delete('http://localhost:4000/api/delProduit',
      {
        headers: { 'Content-Type': 'application/json' },
        data: { code: code }
      },
    )
      .then(res => {

        if (res.status = 200) {

          window.confirm("Produit Suprimmer!")
        }
        console.log(res);
        console.log(this.state);
      })
      .catch(error => {
        window.confirm("Erreur veuillez reessayer");
        console.log(this.state);
      })

  }

  getAllProduit(event) {

    event.preventDefault();

    axios.get('http://localhost:4000/api/showProduit',
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(res => {
        console.log(res);
        if (res.status = 200) {
          this.setState({
            produits: res.data
          })
        }
        console.log(this.state);
      })
      .catch(error => {
        window.confirm("Erreur veuillez reessayer");
        console.log(this.state);
      })
  }

  updateProduit(event){
    event.preventDefault();

    const { code, designation, famille, prix } = this.state;

    console.log(this.state);

    axios.post('http://localhost:4000/api/updateProduit',
      {
        code:code,
        designation: designation,
        famille: famille,
        prix: prix,
      },
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(res => {

        if (res.status = 200) {


          window.confirm("Produit Modifier!")
          //this.getAllProduit();
        }
        console.log(res);
        console.log(this.state);
      })
      .catch(error => {
        window.confirm("Erreur veuillez reessayer");
        console.log(this.state);
      })
  }

  renderTableData() {
    return this.state.produits.map((produit, index) => {
      const { code, designation, famille, prix } = produit
      return (
        <tr key={code}>
          <td>{code}</td>
          <td>{designation}</td>
          <td>{famille}</td>
          <td>{prix}</td>
        </tr>
      )
    })
  }

  render() {

    return (
      <>
      <h1> CRUD Produit </h1>
        <Container>
          <Button variant="success" onClick={this.getAllProduit}>Get les Produits</Button>
          <Table striped bordered hover id='produits'>
            <thead>
              <tr>
                <th>Code</th>
                <th>Designation</th>
                <th>Famille</th>
                <th>Prix</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTableData()}
            </tbody>
          </Table>
        </Container>   
        <hr></hr>
        <Container>
          <h4>Ajout produit</h4>
          <Form onSubmit={this.handleSubmit} className="mr-4">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Designation</Form.Label>
              <Form.Control name="designation" value={this.state.designation} onChange={this.handleChange} type="text" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Famille</Form.Label>
              <Form.Control name="famille" value={this.state.famille} onChange={this.handleChange} type="text" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Prix</Form.Label>
              <Form.Control name="prix" value={this.state.prix} onChange={this.handleChange} type="text" />
            </Form.Group>

            <Button variant="primary" onClick={this.addProduit}>
              Ajouter Produit
          </Button>
          </Form>
        </Container>
        <hr></hr>

        <Container>
          <h4>Supprimer un Produit</h4>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Code</Form.Label>
            <Form.Control name="code" value={this.state.code} onChange={this.handleChange} type="text" />
          </Form.Group>
          <Button variant="danger" onClick={this.delproduit}>
            Supprimer Produit
          </Button>
        </Container>
        <hr></hr>        

        <Container>
          <h4>Modifier un Produit</h4>
          <Form onSubmit={this.handleSubmit} className="mr-4">
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Code</Form.Label>
            <Form.Control name="code" value={this.state.code} onChange={this.handleChange} type="text" />
          </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Designation</Form.Label>
              <Form.Control name="designation" value={this.state.designation} onChange={this.handleChange} type="text" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Famille</Form.Label>
              <Form.Control name="famille" value={this.state.famille} onChange={this.handleChange} type="text" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Prix</Form.Label>
              <Form.Control name="prix" value={this.state.prix} onChange={this.handleChange} type="text" />
            </Form.Group>

            <Button variant="primary" onClick={this.updateProduit}>
              Modifier
          </Button>
          </Form>
        </Container>        

      </>
    )
  }
}