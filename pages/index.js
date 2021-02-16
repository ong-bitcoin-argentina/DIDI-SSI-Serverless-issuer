import Head from 'next/head'
import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import {Container, 
        TextField, 
        Button, 
        Grid, 
        Typography, 
        CssBaseline,
} from '@material-ui/core'

export default function Home() {
  const { control, errors, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
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

            </div>
          </Grid>
        </main>
      </Container>
    </>
  )
}
