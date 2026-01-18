import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  HoverCard,
  ScrollArea,
  SimpleGrid,
  Text,
  UnstyledButton,
  useMantineTheme,
  Image
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import logo from "../public/logo-orange.png";
import classes from './menu.module.css';

const mockdata = [
  {
    title: 'Open source',
    description: 'This Pokémon’s cry is very loud and distracting',
  },
  {
    title: 'Free for everyone',
    description: 'The fluid of Smeargle’s tail secretions changes',
  },
  {
    title: 'Documentation',
    description: 'Yanma is capable of seeing 360 degrees without',
  },
  {
    title: 'Security',
    description: 'The shell’s rounded shape and the grooves on its.',
  },
  {
    title: 'Analytics',
    description: 'This Pokémon uses its flying ability to quickly chase',
  },
  {
    title: 'Notifications',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
];

export function Menu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box pb={20}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group>
          <Image src={logo} h={50} w="auto" />
            <Group visibleFrom="sm">
              <Button variant="default">
                My Raids
              </Button>
              <Button>
                Create Raid
              </Button>
            </Group>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Group justify="center" grow pb="xl" px="md">
              <Button variant="default">
                My Raids
              </Button>
              <Button>
                Create Raid
              </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
/* <IconChevronDown size={16} color={theme.colors.blue[6]} /> */
