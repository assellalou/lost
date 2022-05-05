import { Heading, Text, Container } from '@chakra-ui/react';
import Head from 'next/head';
import getRawBody from 'raw-body';
import Item from '../models/Item';
import LostFoundTabs from '../components/LostFoundTabs';
import getUrlParams from '../helpers/urlParse';

export default function Home() {
  return (
    <>
      <Head>
        <title>Lost - Home </title>
      </Head>

      <Container mt={5} textAlign="center">
        <Heading mb={1} size="3xl">
          Lost is never lost
        </Heading>

        <Text fontSize="xl" mb={5}>
          A community to help you find your lost item and report it to the
          authorities.
        </Text>
        <LostFoundTabs />
      </Container>
    </>
  );
}

export async function getServerSideProps({ req }) {
  switch (req.method) {
    case 'POST':
      try {
        const body = await getRawBody(req);
        const {
          SerialNumber,
          Type,
          Category,
          Description,
          Latitude,
          Longitude,
        } = getUrlParams(body.toString());
        const item = new Item({
          SerialNumber,
          Type,
          Category,
          Description,
          Latitude,
          Longitude,
        });
        await item.save();
        return { props: { success: true } };
      } catch (e) {
        console.log(e);
        return { props: { success: false } };
      }
    default:
      return { props: { success: false } };
  }
}
