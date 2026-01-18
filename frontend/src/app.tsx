import { useState } from 'preact/hooks'
import { Grid, Paper, Title, Textarea, Select, useMantineTheme, Box, Button, Switch, PasswordInput } from '@mantine/core';
import './app.css'
import logo from '../public/logo-black.png';
import { Menu } from './menu.tsx'

export function App() {
  const [count, setCount] = useState(5)
  const theme = useMantineTheme(); 

  const [instance, setInstance] = useState("")
  const [description, setDescription] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [useSRPlus, setUseSRPlus] = useState(false)

  function createRaid() {
    console.log(
      {
        instance,
        description,
        useSRPlus,
        adminPassword
      }
    )
  }

  return (
    <>
      <Box style={{backgroundColor: theme.colors.dark[8], height: "100vh"}}>
        <Menu/>
        <Grid justify="center">
          <Grid.Col span={{ base: 11, md:6 }}>
            <Paper shadow="md" p="xl">
              <Title pb={10} order={1}>Create a new raid</Title>
              <Select
                pb={20}
                withAsterisk={instance == ""}
                label="Instance"
                placeholder="Select instance"
                data={["The Blackwing Lair", "Naxxramas", "The Molten Core" ]}
                value={instance}
                onChange={setInstance}
              />
              <Textarea
                pb={20}
                label="Description"
                value={description}
                onChange={(event: any) => setDescription(event.currentTarget.value)}
              />
              <PasswordInput
                pb={20}
                withAsterisk
                label="Admin password"
                value={adminPassword}
                withAsterisk={adminPassword == ""}
                onChange={(event: any) => setAdminPassword(event.currentTarget.value)}
                description="Anyone with the admin password can become admin of the raid"
              />
              <Switch
                pb={40}
                value={useSRPlus}
                onChange={(event: any) => setUseSRPlus(event.currentTarget.value)}
                label="Use SR+"
              />
              <Button onClick={createRaid} disabled={!instance || !adminPassword}>
                Create Raid
              </Button>
            </Paper>
          </Grid.Col>
        </Grid>
      </Box>
    </>
  )
}
