import React, { useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { KeyboardDatePicker } from '@material-ui/pickers';

/************ API PARA CONSULTA DE CEP ***********************/
const apiCep = "https://webmaniabr.com/api/1/cep/";
const app_key = "M32cx3uqBa27prh5vcY3Svv5etC8cGZR";
const app_secret = "U8Ea0RwqJRr1brWl0ydJQmJzl0UWuk4FTvBxtP9vLaJYzTLa";

const CadCliente = props => {
  const [values, setValues] = useState({
    nome: "",
    tipo: "",
    sexo: "",
    phone: "",
    cpfoucnpj: "",
    rgouie: "",
    aniversario: new Date("2014-08-18T21:11:54"),
    cep: "",
    endereco: "",
    numero: "",
    uf: "CE",
    bairro: "",
    cidade: "",
    complemento: "",
    tipoContato: "",
    contato: "",
    contatos: []
  });

  const stateTipoContato = [
    {
      value: "tel_fixo",
      label: "Telefone fixo"
    },
    {
      value: "tel_celular",
      label: "Telefone Celular"
    },
    {
      value: "whatsapp",
      label: "Whatsapp"
    },
    {
      value: "email",
      label: "E-mail"
    },
    {
      value: "familiar",
      label: "Telefone Familiar"
    }
  ];

  const stateSexo = [
    {
      label: "Masculino"
    },
    {
      label: "Feminino"
    },
    {
      label: "Outros"
    }
  ];

  const stateTipo = [
    {
      value: "F",
      label: "Pessoa Fisica"
    },
    {
      value: "J",
      label: "Pessoa Juridica"
    }
  ];

  const estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    console.log(values.tipo);
  };

  const hanlerClickContato = () => {
    if (values.tipoContato && values.contato) {
      let contatos = values.contatos;
      contatos.push({ tipo: values.tipoContato, contato: values.contato });
      setValues({
        ...values,
        contatos: contatos,
        tipo: "",
        contato: ""
      });
    }
  };

  const handleChangeCep = event => {
    let vlr = event.target.value;
    let vlrFormatado = vlr.replace(/^(\d{5})(\d{3}).*/, "$1-$2");
    setValues({
      ...values,
      cep: vlrFormatado
    });
  };

  const handleChangeCpfCnpj = event => {
    let vlr = event.target.value;
    let vlrFormatado = values.cpfoucnpj;
    if ((values.tipo === "J")) {
      vlrFormatado = vlr
        .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{2})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1"); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    } else {
      vlrFormatado = vlr
        .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1"); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    }
    setValues({
      ...values,
      cpfoucnpj: vlrFormatado
    });
  };

  const buscaCep = event => {
    event.preventDefault();
    axios
      .get(
        `${apiCep}${values.cep}/?app_key=${app_key}&app_secret=${app_secret}`
      )
      .then(res => {
        if (!res.data.error) {
          console.log(res.data);
          setValues({
            ...values,
            endereco: res.data.endereco,
            bairro: res.data.bairro,
            cidade: res.data.cidade,
            uf: res.data.uf
          });
        } else {
          console.log(res.data.error);
        }
      });
  };

  const useStyles = makeStyles(() => ({
    root: {},
    divider: {
      margin: "15px 0"
    }
  }));

  return (
    <div>
      <Card className={clsx(useStyles.root)}>
        <form autoComplete="off" noValidate>
          <CardHeader subheader="Cadastro de cliente" title="Cliente" />
          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Nome"
                  margin="dense"
                  name="nome"
                  id="nome"
                  required
                  value={values.nome}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={3} xs={12}>
                <TextField
                  fullWidth
                  label="Tipo"
                  margin="dense"
                  name="tipo"
                  required
                  value={values.tipo}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                  select
                  variant="outlined"
                  SelectProps={{ native: true }}
                >
                  {stateTipo.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={3} xs={12}>
                <TextField
                  fullWidth
                  label="Sexo"
                  margin="dense"
                  name="sexo"
                  required
                  value={values.sexo}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                  select
                  variant="outlined"
                  SelectProps={{ native: true }}
                >
                  {stateSexo.map(option => (
                    <option key={option.label} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={3} xs={12}>
                <TextField
                  fullWidth
                  label={values.tipo === 'J' ? "CNPJ" : "CPF"}
                  margin="dense"
                  name="cpfoucnpj"
                  required
                  value={values.cpfoucnpj}
                  onChange={handleChangeCpfCnpj}
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={3} xs={12}>
                <TextField
                  fullWidth
                  label={values.tipo === 'J' ? "IE" : "RG"}
                  margin="dense"
                  name="rgouie"
                  required
                  value={values.rgouie}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                ></TextField>
              </Grid>
              <Grid item md={3} xs={12}>
                <KeyboardDatePicker
                  fullWidth
                  label="Aniversário"
                  margin="dense"
                  name="aniversario"
                  type="date"
                  format="dd/MM/yyyy"
                  value={values.aniversario}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={3} xs={12}>
                <TextField
                  fullWidth
                  label="Cep"
                  margin="dense"
                  name="cep"
                  value={values.cep}
                  onChange={handleChangeCep}
                  onBlur={buscaCep}
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Endereço"
                  margin="dense"
                  name="endereco"
                  value={values.endereco}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={1} xs={12}>
                <TextField
                  fullWidth
                  label="N°"
                  margin="dense"
                  name="numero"
                  value={values.numero}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <TextField
                  fullWidth
                  label="Uf"
                  margin="dense"
                  name="uf"
                  value={values.uf}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                  select
                  SelectProps={{ native: true }}
                >
                  {estados.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={3} xs={12}>
                <TextField
                  fullWidth
                  label="Bairro"
                  margin="dense"
                  name="bairro"
                  value={values.bairro}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={3} xs={12}>
                <TextField
                  fullWidth
                  label="Cidade"
                  margin="dense"
                  name="cidade"
                  value={values.cidade}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Complemento"
                  margin="dense"
                  name="complemento"
                  value={values.complemento}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Divider className={useStyles.divider} />
            <Grid container spacing={3}>
              {" "}
              <Grid item md={12} xs={12}>
                <Typography>Contatos</Typography>
              </Grid>
              <Grid item md={3} xs={12}>
                <TextField
                  fullWidth
                  label="Tipo de Contato"
                  margin="dense"
                  name="tipoContato"
                  value={values.tipoContato}
                  onChange={handleChange}
                  select
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                  SelectProps={{ native: true }}
                >
                  {stateTipoContato.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Contato"
                  margin="dense"
                  name="contato"
                  value={values.contato}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={1} xs={12}>
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={hanlerClickContato}
                >
                  <AddIcon />
                </Fab>
              </Grid>
              {values.contatos.map((cont, i) => {
                return (
                  <Grid item md={6} xs={12} key={i}>
                    <Card>
                      <CardContent>
                        <List>
                          <ListItem alignItems="center">
                            <ListItemText>
                              <label>{cont.tipo}</label>
                            </ListItemText>
                            <ListItemText>
                              <label>{cont.contato}</label>
                            </ListItemText>
                            <ListItemText>
                              <IconButton aria-label="delete">
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </ListItemText>
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button color="primary" variant="contained">
              Cadastrar
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};

export default CadCliente;
