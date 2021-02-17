import Head from 'next/head'
import React, {useState} from 'react'
import { useForm, Controller } from 'react-hook-form';
import {Container, 
        TextField, 
        Button, 
        Grid, 
        Typography, 
        CssBaseline,
} from '@material-ui/core'

export default function Home() {
  const [info, setInfo] = useState();
  const [state, setState] = useState();
  const { control, errors, handleSubmit } = useForm();
  const onSubmit = data => postDID(data);
  
  const api = 'https://server.uat.didi.atixlabs.com/api/1.0/didi/';
  const issuer = 'issuer/';
  

  const postDID = async value => {
    console.log(value)
    setState({did: value.did});

    await fetch(api + issuer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      mode: "no-cors",
      body: JSON.stringify({
        did: value.did
      })
    })
      .then(res => console.log(res))
      .then(data => setInfo(data));
    console.log(info)
  };

  const requestDID = async () => {
    await fetch(api + issuer + ':' + state.did ,{
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
          <Grid item md={0}>
            <div >
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                Prueba de concepto - DIDI
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                  <Controller
                    name="did"
                    as={
                      <TextField
                        fullWidth
                        id="did"
                        labelWidth={40}
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
                  <Grid  item xs={12}>
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
                <Grid  item xs={12}>
                  {console.log(did)}
                  <Typography component="h1" variant="h6" color="inherit">
                    Verificar Existencia del DID: {state.did}
                  </Typography>
                  <Button
                    onClick={() => requestDID()}
                    variant="contained"
                    color="secondary"  
                  >
                    Verificar
                  </Button>
                </Grid> : null}

            </div>
          </Grid>
        </main>
      </Container>
    </>
  )
}
