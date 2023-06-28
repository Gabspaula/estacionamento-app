import Head from 'next/head'
import Layout from '../components/layout';
import ToDoList from '../components/estacionamento';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Estacionamento San Rock</title>
        <meta name="description" content="Estacionamento San Rock" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <ToDoList />
      </Layout>
    </div>
  )
}