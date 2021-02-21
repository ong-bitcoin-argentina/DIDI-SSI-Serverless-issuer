import Head from 'next/head'
import React, {useState} from 'react'
import { useForm, Controller } from 'react-hook-form';
import {Container, 
        TextField, 
        Button, 
        Grid, 
        Typography, 
        CssBaseline,
} from '@material-ui/core';

export default function Home() {
  const [state, setState] = useState();
  const { control, errors, handleSubmit } = useForm();
  const onSubmit = data => postDID(data);
  
  const issuer = '/issuer/';

  const postDID = async value => {
    const { did, url, name, callbackUrl, token } = value;
    setState({ did, url });

    var data = {
        "did": did,
        "name": name,
        "callbackUrl": callbackUrl,
        "token": token
    };
    
    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    await fetch(url + issuer, {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      mode: "no-cors",
      body: formBody
      })
    .then(res => { 
      console.log(res)
    })
    .then(data => data)
    .catch(err => {
      console.error(err);
    });

  };

  const requestDID = async () => {
    await fetch(state.url + issuer + ':' + state.did ,{
      method: "GET",      
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      mode: "no-cors",
    })
      .then(res => console.log(res))
      .then(data => console.log(data));
  }

  return (
    <>
      <Head>
        <title>PoC - DIDI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Grid item>
            <div >
              <Typography component="h1" variant="h3" color="inherit" margin={5} gutterBottom>
                Prueba de concepto - DIDI
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Controller
                      name="url"
                      as={
                        <TextField
                          fullWidth
                          id="url"
                          helperText={errors.url ? errors.url.message : null}
                          label="Url del Servidor"
                          errors={errors.url}
                        />
                      }
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                        pattern: {
                          value: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
                          message: 'Ingrese un url valido'
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="did"
                      as={
                        <TextField
                          fullWidth
                          id="did"
                          helperText={errors.did ? errors.did.message : null}
                          label="DID"
                          errors={errors.did}
                        />
                      }
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                        pattern: {
                          value: /did:ethr:0x[0-9A-Fa-f]{40}/,
                          message: 'Ingrese un DID valido'
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="name"
                      as={
                        <TextField
                          fullWidth
                          id="name"
                          helperText={errors.name ? errors.name.message : null}
                          label="Nombre"
                          errors={errors.name}
                        />
                      }
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                        maxLength: {
                          value: 25,
                          message: 'Como maximo 25 caracteres.',
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="token"
                      as={
                        <TextField
                          fullWidth
                          id="token"
                          helperText={errors.token ? errors.token.message : null}
                          label="Token (opcional)"
                          errors={errors.token}
                        />
                      }
                      control={control}
                      defaultValue=""
                      rules={{
                        pattern: {
                          value: /did:ethr:0x[0-9A-Fa-f]{40}/,
                          message: 'Ingrese un DID valido'
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="callbackUrl"
                      as={
                        <TextField
                          fullWidth
                          id="callbackUrl"
                          helperText={errors.callbackUrl ? errors.callbackUrl.message : null}
                          label="Callback Url (opcional)"
                          errors={errors.callbackUrl}
                        />
                      }
                      control={control}
                      defaultValue=""
                      rules={{
                        pattern: {
                          value: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
                          message: 'Ingrese un Url valido'
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"  
                    >
                      Ingresar
                    </Button>
                  </Grid>
                </Grid>
                  
              </form>

              {state ? 
                <Grid container spacing={2}>
                  <Grid  item xs={12}>
                    <Typography component="h1" variant="h6" color="inherit" margin={3} gutterBottom>
                      Verificar Existencia del DID: {state.did}
                    </Typography>
                    <Button
                      onClick={() => requestDID()}
                      variant="contained"
                      color="secondary"  
                    >
                      Verificar
                    </Button>
                  </Grid> 
                </Grid>
              : null}

            </div>
          </Grid>
        </main>
      </Container>
    </>
  )
}
